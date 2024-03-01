# Directories

The `Directory` object and helper functions
simplify the process of working with directories.

## dir(path) {#dir}

The `dir()` function can be used to create a `Directory` object which represents a
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

This function is a short cut for creating a `Directory` object, but you can do
that yourself if you prefer.

```js
import { Directory } from '@abw/badger-filesystem'

const images = new Directory('web/images');
```

Note that the directory does not have to exist at the time you create the
object.  It might be that you want to check if a directory exists and create
it if it doesn't (or perhaps delete it if it does).

## bin() {#bin}

The `bin()` function returns a `Directory` object
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

## cwd() {#cwd}

The `cwd()` function returns a `Directory` object
representing the current working directory.

```js
import { cwd } from '@abw/badger-filesystem'

// current directory where the main execution script is located
const currentDir = cwd();
```

