# Files

TODO: the file() function

## Reading Files

Once you have a directory object you can then access the `hello.txt` file in
that directory and read the file content using the `read()` method.  This
returns a Promise which will fulfull with the file content.  Add a
`.then()` handler to do something with the content.

```js
dataDir.file('hello.txt').read().then(
  text => console.log(text)
)
```

You can chain all those function/method calls together like so:

```js
import { bin } from '@abw/badger-filesystem'

bin(import.meta.url)
  .parent()
  .dir('data')
  .file('hello.txt')
  .read()
  .then( text => console.log(text) )
```

## Writing Files
Writing files is just as easy:

```js
import { bin } from '@abw/badger-filesystem'

bin(import.meta.url)
  .parent()
  .dir('data')
  .file('goodbye.txt')
  .write('K thx bye');
```

For further information see the documentation for the
[Directory](class/src/Badger/Filesystem/Directory.js~Directory) and
[File](class/src/Badger/Filesystem/File.js~File) modules.

## File Objects

You can also create a [File](class/src/Badger/Filesystem/File.js~File) object directly.

```js
import { File } from '@abw/badger-filesystem'

const file = new File('data/goodbye.txt')

file
  .write('K thx bye');
```

Or as a shortcut you can use the [file](function#static-function-file) function.

```js
import { file } from '@abw/badger-filesystem'

file('data/goodbye.txt')
  .write('K thx bye');
```
