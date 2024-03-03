# Directory Methods

## file(name) {#file}

The `file()` method returns a [`File`](files) object for a file in or
under to it.

```js
const web = dir('web');
const logo = web.file('images/logo.png');   // => web/images/logo.png
```

## dir(name) {#dir}

The `dir()` method returns a `Directory` object for a directory in or
under it.

```js
const web = dir('web');
const images = web.dir('images');   // => web/images
```

## parent() {#parent}

The `parent()` method returns a `Directory` object
representing the parent directory of a directory.

For example, you might have a script in a `bin` directory in your project
and you want to resolve some directories or files relative to the parent
directory, i.e. the project base directory.

```js
import { bin } from '@abw/badger-filesystem'

const root = bin().parent();
```

## up(n) {#up}

The `up(n)` method returns a `Directory` object representing the directory
one or more levels above it.

The default value for `n` is `1`, meaning that it does the same thing as
the [`parent()`](#parent) method.

Following on from the previous example, if you have a script in the `bin/foo`
directory and you want to go two levels up to get to the project base directory:

```js
import { bin } from '@abw/badger-filesystem'
const root = bin().up(2);
```

## path() {#path}

The `path()` method returns the current path to the directory.

```js
const web = dir('web');
console.log(web.path());      // => web

const path = web.dir('images');
console.log(images.path());   // => web/images
```

You can pass an argument to the method to get a path relative to the
directory.

```js
const web = dir('web');
const logo = web.path('images/logo.png');   // => web/images/logo.png
```

Multiple arguments are assumed to be separate path elements.

```js
const web = dir('web');
const logo = web.path('images', 'logo.png');   // => web/images/logo.png
```

## exists() {#exists}

This asynchronous method checks if the directory exists.

```js
const web = dir('web');
const exists = await web.exists();
```

## mustExist(options) {#mustExist}

Asynchronous method to test if the directory exists.  If no options are
specified then it will return `true` if the directory exists or throw an
error if not.

The `mkdir` and optionally `recursive` options can be set to instead have
it make the directory (and any intermediate directories when `recursive` is
set).  The `create` option is a short-hand for setting both.

```js
// create the tmp/output directory if it doesn't already exists
const output = await dir('tmp/output').mustExist({ create: true });
```

## isEmpty() {#isEmpty}

Asynchronous method to test if the directory is empty.

```js
const empty = await dir('foo/bar').isEmpty()
```

## notEmpty() {#notEmpty}

Asynchronous method to test if the directory is NOT empty.

```js
const full = await dir('foo/bar').notEmpty()
```

## mkdir(options) {#mkdir}

Asynchronous method to create the directory.

The `recursive` option can be specified to have it recursively create any
intermediate directories.

```js
await dir('foo/bar').mkdir({ recursive: true })
```

## create() {#create}

Asynchronous method to create the directory.  It is a wrapper around
[`mkdir()`](#mkdir) which defaults the `recursive` flag to `true`.

## rmdir(options) {#rmdir}

Asynchronous method to delete the directory.

The `empty` option can be specified to have it first empty the directory of
any files and directories.

The `force` option can be specified to force the removal of files and
directories.

The `recursive` can be specified to recursively empty and delete
sub-directories

```js
await dir('foo/bar').rmdir({ empty: true, recursive: true, force: true })
```

## destroy() {#destroy}

Asynchronous method to empty and delete the directory.  It is a wrapper
around [`rmdir()`](#rmdir) which defaults the `empty`, `force` and
`recursive` flag to all be `true`.

## empty(options) {#empty}

Asynchronous method to empty the directory of any files and directories.

The `force` option can be specified to force the removal of files and
directories.

The `recursive` can be specified to recursively empty and delete
sub-directories

```js
await dir('foo/bar').empty({ recursive: true, force: true })
```

## read() {#read}

Asynchronous method to read the directory and return an array of the names of
files and directories in it.

```js
const contents = await dir('foo/bar').read()
```

## entries() {#entries}

Asynchronous method to read the directory and return an array of
[`File`](files) and [`Directory`](directories) objects representing the
contents.  Only regular files and directories will be returned. Devices,
FIFOs and sockets will be ignored.

```js
const entries = await dir('foo/bar').entries()
```

## files() {#files}

Asynchronous method to read the directory and return an array of any
[`File`](files) objects.

```js
const files = await dir('foo/bar').files()
```

## directories() {#directories}

Asynchronous method to read the directory and return an array of any
`Directory` objects.  The `dirs()` method
is an alias for this method.

```js
const dirs = await dir('foo/bar').directories()
```
