# Files

The `File` object and helper functions simplify the process of working with
files.

## file(path) {#file}

The `file()` function can be used to create a `File` object which represents
a file in your file system.

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

This function is a short cut for creating a `File` object, but you can do
that yourself if you prefer.

```js
import { File } from '@abw/badger-filesystem'

const hello = new File('hello.txt');
```

Note that the file does not have to exist at the time you create the
object.  It might be that you want to check if a file exists and write
it if it doesn't (or perhaps delete it if it does).

You can also use the [`file()`](directory-methods#file)
method on a [`Directory`](directories) object to create
a file.

```js
import { dir } from '@abw/badger-filesystem'

const images = dir('web/images');
const logo = images.file('logo.png');
```
