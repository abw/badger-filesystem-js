# Path Base Class

The [`File`](files) and [`Directory`](directories) objects are subclasses of
the `Path` base class which implements some common functionality.

## path(name) {#path}

When called without arguments it returns the current value for the path.

When passed one or more arguments it constructs a path relative to the current
one.

## type() {#type}

Returns the type of file that the path represents: `file`, `directory` or
`path`.

This is set by the constructors for the [`File`](files)
and [`Directory`](directories) objects and only represents
the type of subclass object that was created.

There is no guarantee that the actual file or directory represented by the
path exists in the filesystem and has the same type.  Use the
[`isFile()`](#isFile) and [`isDirectory()`](#isDirectory) methods if you want
to check the filesystem to be sure.

## parse() {#parse}

Parses the path using [Path.parse()](https://nodejs.org/api/path.html#pathparsepath)
to return the constituent parts.  This is cached internally.  You can call
[`unparse()`](#unparse) to clear the cache.

## unparse() {#unparse}

Deletes any cache results from [`parse()`](#parse).

## dirname() {#dirname}

Returns the name of the directory.

## base() {#base}

Returns the complete file or directory name, including any extension.

## name() {#name}

Returns the name of the directory or file without any extension.

## ext() {#ext}

Returns the filename extension including the period.

## relativePath(name) {#relativePath}

Returns a path relative to the current one.

## exists() {#exists}

Asynchronous method to test if the path exists.

## stat() {#stat}

Asynchronous method to fetch stats for the path.  By calling
[fsPromises.stat()](https://nodejs.org/api/fs.html#fspromisesstatpath-options).

Stats are cached internally.  You can call [unstat()](#unstat) to clear
the cache.

## unstat() {#unstat}

Deletes any cached results from [`stat()`](#stat).

## isFile() {#isFile}

Asynchronous method which resolves to a boolean flag to indicate if the item is
a file.

## isDirectory() {#isDirectory}

Asynchronous method which resolves to a boolean flag to indicate if the item is
a directory.

## mode() {#mode}

Asynchronous method which resolves to the file mode.

## size() {#size}

Asynchronous method which resolves to the file size in bytes.

## accessed() {#accessed}

Asynchronous method which resolves to a Date representing the time the file
was last accessed.

## modified() {#modified}

Asynchronous method which resolves to a Date representing the time the file
content was last modified.

## changed() {#changed}

Asynchronous method which resolves to a Date representing the time the file
status (e.g. mode, owner, etc) was last changed.

## created() {#created}

Asynchronous method which resolves to a Date representing the time the file
was created.

