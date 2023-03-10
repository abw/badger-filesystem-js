# Files

The [File](class/src/File.js~File) object and helper functions
simplify the process of working with files.

```js
import { file } from '@abw/badger-filesystem'

// create a JSON file
const hello = file('hello.json', { codec: 'json' });

// write some data to it
await hello.write({ message: 'Hello World!' });

// read data from it
const data = await hello.read();
```

- [File Functions](#file-functions)
- [File Methods](#file-methods)

## File Functions

### file(path)

The [file](function#static-function-file) function can be used to create a
[File](class/src/File.js~File) object which represents a file in your file
system.

```js
import { file } from '@abw/badger-filesystem'

const hello = file('hello.txt');
```

If you specify a relative path (i.e. not starting with a leading slash) then
it is assumed to be relative to the current working directory.

You can also provide an absolute path to a file.

```js
const hello = dir('/home/abw/project123/hello.txt');
```

This function is a short cut for creating a
[File](class/src/File.js~File) object, but you can do
that yourself if you prefer.

```js
import { File } from '@abw/badger-filesystem'

const hello = new File('hello.txt');
```

Note that the file does not have to exist at the time you create the
object.  It might be that you want to check if a file exists and write
it if it doesn't (or perhaps delete it if it does).

You can also use the [file()](class/src/Directory.js~Directory#instance-method-file)
method on a [Directory](class/src/Directory.js~Directory) object to create
a file.

```js
import { dir } from '@abw/badger-filesystem'

const images = dir('web/images');
const logo = images.file('logo.png');
```

## File Methods

## read(options)

Asynchronous method to read the file contents.

```js
import { file } from '@abw/badger-filesystem'

const text = await file('hello.txt').read();
```

If a [codec](manual/codecs.html) was specified as an option when the file
object was created, or if one is specified in the options passed to this
method then the contents will be decoded using the appropriate codec.

```js
import { file } from '@abw/badger-filesystem'

// either...
const data = await file('hello.json', { codec: 'json' }).read();

// ...or
const data = await file('hello.json').read({ codec: 'json' });
```

## write(options)

Asynchronous method to write the file contents.

```js
import { file } from '@abw/badger-filesystem'

await file('hello.txt').write('Hello World!');
```

If a [codec](manual/codecs.html) was specified as an option when the file
object was created, or if one is specified in the options passed to this
method then the contents will be encoded using the appropriate codec.

```js
import { file } from '@abw/badger-filesystem'

// either...
await file('hello.json', { codec: 'json' }).write({ message: 'Hello World!' });

// ...or
await file('hello.json').write({ message: 'Hello World!' }), { codec: 'json' });
```

## delete(options)

Asynchronous method to delete the file.

