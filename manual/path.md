# Path Base Class

The [File](class/src/File.js~File) and
[Directory](class/src/Directory.js~Directory) objects are subclasses of
the [Path](class/src/Path.js~Path) base class which implements some common
functionality.

- [Path Methods](#path-methods)

## Path Methods

### path(name)

When called without arguments it returns the current value for the path.

When passed one or more arguments it constructs a path relative to the current
one.

### type()

Returns the type of file that the path represents: `file`, `directory` or
`path`.

This is set by the constructors for the [File](class/src/File.js~File)
and [Directory](class/src/Directory.js~Directory) objects and only represents
the type of subclass object that was created.

There is no guarantee that the actual file or directory represented by the
path exists in the filesystem and has the same type.  Use the
[isFile()](#isfile--) and [isDirectory()](#isdirectory--) methods if you want
to check the filesystem to be sure.

### parse()

Parses the path using [Path.parse()](https://nodejs.org/api/path.html#pathparsepath)
to return the constituent parts.  This is cached internally.  You can call
[unparse()](#unparse--) to clear the cache.

### unparse()

Deletes any cache results from [parse()](#parse--).

### dirname()

Returns the name of the directory.

### base()

Returns the complete file or directory name, including any extension.

### name()

Returns the name of the directory or file without any extension.

### ext()

Returns the filename extension including the period.

### relativePath(name)

Returns a path relative to the current one.

### exists()

Asynchronous method to test if the path exists.

### stat()

Asynchronous method to fetch stats for the path.  By calling
[fsPromises.stat()](https://nodejs.org/api/fs.html#fspromisesstatpath-options).

Stats are cached internally.  You can call [unstat()](#unstat--) to clear
the cache.

### unstat()

Deletes any cached results from [stat()](#stat--).

### isFile()

Asynchronous method which resolves to a boolean flag to indicate if the item is
a file.

### isDirectory()

Asynchronous method which resolves to a boolean flag to indicate if the item is
a directory.

### mode()

Asynchronous method which resolves to the file mode.

### size()

Asynchronous method which resolves to the file size in bytes.

### accessed()

Asynchronous method which resolves to a Date representing the time the file
was last accessed.


### modified()

Asynchronous method which resolves to a Date representing the time the file
content was last modified.

### changed()

Asynchronous method which resolves to a Date representing the time the file
status (e.g. mode, owner, etc) was last changed.

### created()

Asynchronous method which resolves to a Date representing the time the file
was created.

