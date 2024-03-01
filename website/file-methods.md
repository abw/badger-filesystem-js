# File Methods

## read(options) {#read}

Asynchronous method to read the file contents.

```js
import { file } from '@abw/badger-filesystem'

const text = await file('hello.txt').read();
```

If a [`codec`](codecs) was specified as an option when the file
object was created, or if one is specified in the options passed to this
method then the contents will be decoded using the appropriate codec.

```js
import { file } from '@abw/badger-filesystem'

// either...
const data = await file('hello.json', { codec: 'json' }).read();

// ...or
const data = await file('hello.json').read({ codec: 'json' });
```

## write(data, options) {#write}

Asynchronous method to write the file contents.

```js
import { file } from '@abw/badger-filesystem'

await file('hello.txt').write('Hello World!');
```

If a [`codec`](codecs) was specified as an option when the file
object was created, or if one is specified in the options passed to this
method then the contents will be encoded using the appropriate codec.

```js
import { file } from '@abw/badger-filesystem'

// either...
await file('hello.json', { codec: 'json' }).write({ message: 'Hello World!' });

// ...or
await file('hello.json').write({ message: 'Hello World!' }), { codec: 'json' });
```

## delete(options) {#delete}

Asynchronous method to delete the file.

## directory() {#directory}

Method to return an object for the directory in which the file is located.

```js
import { file } from '@abw/badger-filesystem'

const f = file('hello.txt')
const d = f.directory()
```

## dir() {#dir}

An alias for the [`directory()`](#directory) method.

## copyTo(destination, options) {#copyTo}

Asynchronous method to copy the file to a new location.  The `destination`
can be a file object or filesystem path.  If it is a relative path then it
will be resolved relative to the current directory of the file.

The `mkdir` option can be set to have the parent directory created if it
doesn't already exist.  The `recursive` option will also tell it to create
any intermediate directories. The `create` option is a short-hand for setting
both.  If the directory already exists then you don't need to pass any options.

The newly created destination file object is returned.

```js
import { file } from '@abw/badger-filesystem'

const f = file('hello.txt')
const n = await f.copyTo('/some/other/place', { create: true })
```

In this example the `/some` and `/some/other` directories would be created
if they don't already exist.

## copyFrom(source, options) {#copyFrom}

Asynchronous method to copy the file from another file location.
The `source` can be a file object or filesystem path.  If it is a relative
path then it will be resolved relative to the current directory of the file.

The `mkdir` option can be set to have the parent directory created if it
doesn't already exist.  The `recursive` option will also tell it to create
any intermediate directories. The `create` option is a short-hand for setting
both.  If the directory already exists then you don't need to pass any options.

The file object is returned.

```js
import { file } from '@abw/badger-filesystem'

const f = await file('hello.txt').copyFrom('/some/other/place')
```

## moveTo(destination, options) {#moveTo}

Asynchronous method to move the file to a new location.  The `destination`
can be a file object or filesystem path.  If it is a relative path then it
will be resolved relative to the current directory of the file.

The `mkdir` option can be set to have the parent directory created if it
doesn't already exist.  The `recursive` option will also tell it to create
any intermediate directories. The `create` option is a short-hand for setting
both.  If the directory already exists then you don't need to pass any options.

The newly created destination file object is returned.

```js
import { file } from '@abw/badger-filesystem'

const f = file('hello.txt')
const n = await f.moveTo('/some/other/place', { create: true })
```

In this example the `/some` and `/some/other` directories would be created
if they don't already exist.

## moveFrom(source, options) {#moveFrom}

Asynchronous method to move the file from another file location.
The `source` can be a file object or filesystem path.  If it is a relative
path then it will be resolved relative to the current directory of the file.

The `mkdir` option can be set to have the parent directory created if it
doesn't already exist.  The `recursive` option will also tell it to create
any intermediate directories. The `create` option is a short-hand for setting
both.  If the directory already exists then you don't need to pass any options.

The file object is returned.

```js
import { file } from '@abw/badger-filesystem'

const f = await file('hello.txt').moveFrom('/some/other/place')
```
