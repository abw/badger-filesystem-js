# Reference

## Constructor Functions

Functions to create [`Directory`](directories) and [`File`](files) objects.

| Function | Description |
|-|-|
|[`dir(path)`](directories#dir)|Create a directory object from a filesytem path|
|[`bin()`](directories#bin)|Create a directory object for the parent of the executing script|
|[`cwd()`](directories#cwd)|Create a directory object for the current working directory|
|[`file(path)`](files#file)|Create a file object from a filesystem path|

## Directory Methods

| Method | Description |
|-|-|
|[`file(name)`](directory-methods#file)|Return a file object for a file in the directory|
|[`dir(name)`](directory-methods#dir)|Return a directory object for a sub-directory of the directory|
|[`parent()`](directory-methods#parent)|Return a directory object for the parent directory|
|[`up(n)`](directory-methods#up)|Return a directory object for a parent `n` levels up|
|[`path()`](directory-methods#path)|Return the filesystem path for the directory|
|[`exists()`](directory-methods#exists)|Determine if the directory exists|
|[`mustExist(options)`](directory-methods#mustExist)|Assert that the directory exists and optionally create it|
|[`isEmpty()`](directory-methods#isEmpty)|Determine if the directory is empty|
|[`notEmpty()`](directory-methods#notEmpty)|Determine if the directory is not empty|
|[`mkdir(options)`](directory-methods#mkdir)|Create the directory|
|[`create()`](directory-methods#create)|Create the directory and any intermediate directories|
|[`rmdir(options)`](directory-methods#rmdir)|Delete the directory|
|[`destroy()`](directory-methods#destroy)|Delete the directory and anything it contains|
|[`empty(options)`](directory-methods#empty)|Delete any files or sub-directories in the directory|
|[`read()`](directory-methods#read)|Read the contents of the directory|
|[`entries()`](directory-methods#entries)|Return file/directory objects for the contents of the directory|
|[`files()`](directory-methods#files)|Return file objects for each file in the directory|
|[`directories()`](directory-methods#directories)|Return directory objects for each sub-directory of the directory|

## File Methods

| Method | Description |
|-|-|
|[`read(options)`](file-methods#read)|Read the contents of the file|
|[`write(data, options)`](file-methods#write)|Write the data to the file|
|[`delete(options)`](file-methods#delete)|Delete the file|
|[`directory()`](file-methods#directory)|Return a directory object for the parent directory|
|[`dir()`](file-methods#dir)|Alias for `directory()`|
|[`copyTo(destination, options)`](file-methods#copyTo)|Copy the file to a new location|
|[`copyFrom(source, options)`](file-methods#copyFrom)|Copy the file from another location|
|[`moveTo(destination, options)`](file-methods#moveTo)|Move the file to a new location|
|[`moveFrom(source, options)`](file-methods#moveFrom)|Move the file from another location|

## Path Methods

| Method | Description |
|-|-|
|[`path(name)`](path#path)|Return the current path or a relative path|
|[`type()`](path#type)|Return the type of object: `file` or `directory`|
|[`parse()`](path#parse)|Parse the path to extract filename, extension, etc.|
|[`unparse()`](path#unparse)|Delete the cached parse data|
|[`dirname()`](path#dirname)|Return the directory name|
|[`base()`](path#base)|Return the complete file or directory name|
|[`name()`](path#name)|Return the file or directory name without any extension|
|[`ext()`](path#ext)|Return the file extension|
|[`relativePath(name)`](path#relativePath)|Return a path relative to the current one|
|[`exists()`](path#exists)|Determine if the file or directory exists|
|[`stat()`](path#stat)|Fetch the `stat` data for the filesystem entry|
|[`unstat()`](path#unstat)|Delete any cached `stat` data|
|[`isFile()`](path#isFile)|Determine (from the filesystem) if this is a file|
|[`isDirectory()`](path#isDirectory)|Determine (from the filesystem) if this is a directory|
|[`mode()`](path#mode)|Return the file mode|
|[`size()`](path#size)|Return the size in bytes|
|[`accessed()`](path#accessed)|Return the last accessed time|
|[`modified()`](path#modified)|Return the modified time|
|[`changed()`](path#changed)|Return the changed time|
|[`created()`](path#created)|Return the created time|
