# Directories

The [Directory](class/src/Directory.js~Directory) object and helper functions
simplify the process of working with directories.

```js
import { dir } from '@abw/badger-filesystem'

// a config directory
const config = dir('config');

// check it exists and create it if not
await config.mustExist({ create: true });

// create a JSON file in the directory
const hello = config.file('hello.json', { codec: 'json' });

// write some data to it
await hello.write({ message: 'Hello World!' });

// read data from it
const data = await hello.read();
```

- [Directory Functions](#directory-functions)
- [Directory Methods](#directory-methods)

## Directory Functions

### dir(path)

The [dir](function#static-function-dir) function can be used to create a
[Directory](class/src/Directory.js~Directory) object which represents a
directory in your file system.

```js
import { dir } from '@abw/badger-filesystem'

const images = dir('web/images');
```

If you specify a relative path (i.e. not starting with a leading slash) then
it is assumed to be relative to the current working directory.

You can also provide an absolute path to a directory.

```js
const images = dir('/home/abw/project123/web/images');
```

This function is a short cut for creating a
[Directory](class/src/Directory.js~Directory) object, but you can do
that yourself if you prefer.

```js
import { Directory } from '@abw/badger-filesystem'

const images = new Directory('web/images');
```

Note that the directory does not have to exist at the time you create the
object.  It might be that you want to check if a directory exists and create
it if it doesn't (or perhaps delete it if it does).

### bin()

The [bin](function#static-function-bin) function returns a
[Directory](class/src/Directory.js~Directory) object
representing the directory of the script you're running (`process.argv[1]`).
This is useful when you want to access files relative to the script
location, regardless of where you run the script from.  The function
is so named because the traditional location for executable files in
Unix systems is the `bin` directory.

```js
import { bin } from '@abw/badger-filesystem'

// current directory where the main execution script is located
const thisDir = bin();
```

You can also use it to access the directory of the current source file,
even if it's not the main script you're running.  In this case pass
`import.meta.url` as an argument.

```js
import { bin } from '@abw/badger-filesystem'

// current directory where the current source file is located
const thisDir = bin(import.meta.url);
```

### cwd()

The [cwd](function#static-function-cwd) function returns a
[Directory](class/src/Directory.js~Directory) object
representing the current working directory.

```js
import { cwd } from '@abw/badger-filesystem'

// current directory where the main execution script is located
const currentDir = cwd();
```

## Directory methods

### file(name)

The [file()](class/src/Directory.js~Directory#instance-method-file)
method returns a [File](class/src/File.js~File) object for a file in or under to it.

```js
const web = dir('web');
const logo = web.file('images/logo.png');   // => web/images/logo.png
```

### dir(name)

The [dir()](class/src/Directory.js~Directory#instance-method-dir)
method returns a [Directory](class/src/Directory.js~Directory)
object for a directory in or under it.

```js
const web = dir('web');
const images = web.dir('images');   // => web/images
```

### parent()

The [parent()](class/src/Directory.js~Directory#instance-method-parent)
method returns a [Directory](class/src/Directory.js~Directory) object
representing the parent directory of a directory.

For example, you might have a script in a `bin` directory in your project
and you want to resolve some directories or files relative to the parent
directory, i.e. the project base directory.

```js
import { bin } from '@abw/badger-filesystem'

const root = bin().parent();
```

### up(n)

The [up(n)](class/src/Directory.js~Directory#instance-method-up) method returns a
[Directory](class/src/Directory.js~Directory) object
representing the directory one or more levels above it.

The default value for `n` is `1`, meaning that it does the same thing as
the [parent()](#parent--) method.

Folling on from the previous example, if you have a script in the `bin/foo`
directory and you want to go two levels up to get to the project base directory:

```js
import { bin } from '@abw/badger-filesystem'
const root = bin().up(2);
```

### path()

The [path()](/class/src/Path.js~Path#instance-method-path) method
returns the current path to the directory.

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

### exists()

This asynchronous method checks if the directory exists.

```js
const web = dir('web');
const exists = await web.exists();
```

### mustExist(options)

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

### isEmpty()

Asynchronous method to test if the directory is empty.

```js
const empty = await dir('foo/bar').isEmpty()
```

### notEmpty()

Asynchronous method to test if the directory is NOT empty.

```js
const full = await dir('foo/bar').notEmpty()
```

### mkdir(options)

Asynchronous method to create the directory.

The `recursive` option can be specified to have it recursively create any
intermediate directories.

```js
await dir('foo/bar').mkdir({ recursive: true })
```

### create()

Asynchronous method to create the directory.  It is a wrapper around
[mkdir()](#mkdir-options-) which defaults the `recursive` flag to `true`.

### rmdir(options)

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

### destroy()

Asynchronous method to empty and delete the directory.  It is a wrapper
around [rmdir()](#emdir-options-) which defaults the `empty`, `force` and
`recursive` flag to all be `true`.

### empty(options)

Asynchronous method to empty the directory of any files and directories.

The `force` option can be specified to force the removal of files and
directories.

The `recursive` can be specified to recursively empty and delete
sub-directories

```js
await dir('foo/bar').empty({ recursive: true, force: true })
```

### read()

Asynchronous method to read the directory and return an array of the names of
files and directories in it.

```js
const contents = await dir('foo/bar').read()
```

### entries()

Asynchronous method to read the directory and return an array of
[File](class/src/File.js~File) and [Directory](class/src/Directory.js~Directory)
object representing the contents.  Only files and directories will be returned.
Devices, FIFOs and sockets will be ignored.

```js
const entries = await dir('foo/bar').entries()
```

### files()

Asynchronous method to read the directory and return an array of any
[File](class/src/File.js~File) objects.

```js
const files = await dir('foo/bar').files()
```

### directories()

Asynchronous method to read the directory and return an array of any
[Directory](class/src/Directory.js~Directory) objects.  The `dirs()` method
is an alias for this method.

```js
const dirs = await dir('foo/bar').directories()
```
