# DirPath

The `DirPath` object and helper function simplify the process of working with
a path of multiple directories.

## dirPath([path1, path2, ...], options) {#dirPath}

The `dirPath()` function can be used to create a `DirPath` object which
represents a path of directories in your file system.

```js
import { dirPath } from '@abw/badger-filesystem'

const searchPath = dirPath([
  'web/images',
  'web/media'
]);
```

If you specify a directory path (i.e. not starting with a leading slash) then
it is assumed to be relative to the current working directory.

You can also provide absolute paths to directories.

```js
const tmpPath = dirPath([
  '/home/abw/project123/tmp',
  '/usr/local/tmp',
  '/tmp',
]
```

This function is a short cut for creating a `DirPath` object, but you can do
that yourself if you prefer.

```js
import { DirPath } from '@abw/badger-filesystem'

const tmpPath = new DirPath([
  '/home/abw/project123/tmp',
  '/usr/local/tmp',
  '/tmp',
]
```

## file(name, options) {#dirPath-file}

Searches for a file in any of the directory paths.  It returns a
[File](files) object for the first file that exists in the search path
or `undefined` if the file does not exist.

Note that this is an asynchronous method.

```js
const cachedData = await tmpPath.file('saved.txt')
```

The optional second parameter can be used to specify file options.  For
example, the `codec` option to read a JSON or YAML file.

```js
const cachedFile = await tmpPath.file('saved.json', { codec: 'json' })
const cachedData = await cachedFile?.read()
```

## dir(name, options) {#dirPath-file}

Searches for a sub-directory in any of the directory paths.  It returns a
[Directory](directories) object for the first file that exists in the search
path or `undefined` if the sub-directory does not exist.

Note that this is an asynchronous method.

```js
const cacheDir = await tmpPath.dir('my-cache-data')
```

The optional second parameter can be used to specify directory options.  For
example, the `codec` option to read JSON or YAML files in the directory.

```js
const cacheDir = await tmpPath.dir('my-cache-data', { codec: 'json' })
const cacheFile = await cacheDir?.file('badger.json')
const fileExists = await cachedFile?.exists()
const fileData = fileExists
    ? await cacheFile.read()        // decodes JSON
    : { }
```

