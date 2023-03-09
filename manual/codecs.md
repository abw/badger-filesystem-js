# Data Codecs

Codecs are used to encode and decode data to and from serialised text.
They are imported from the [@abw/badger-codecs](https://github.com/abw/badger-codecs-js)
modulee.

There are two codecs commonly used for `json` and `yaml` files.

- [Read Data File](#read-data-files)
- [Write Data Files](#write-data-files)
- [Directory Codec](#directory-codec)
- [Auto Codec](#auto-codec)

## Read Data Files

Suppose that you have a `badger.yaml` file that you want to read.

```yaml
name:   Brian
animal: Badger
```

All you have to do is add the `{ codec: 'yaml' }`
option to the `file()` function.  The `read()`
method will then automatically decode the YAML text.

```js
import { file } from '@abw/badger'

file('badger.yaml', { codec: 'yaml' })
  .read()
  .then(
    data => console.log(data.name, 'is a', data.animal)
  )
```

This prints the string "Brian is a Badger" to the console.

You can also do the same thing using the `file()` method on a directory
object.

```js
import { dir } from '@abw/badger'

dir('data')
  .file('badger.yaml', { codec: 'yaml' })
  .read()
  .then(
    data => console.log(data.name, 'is a', data.animal)
  )
```

You can also pass the `codec` option to the `read()` method.

```js
file('badger.yaml')
  .read({ codec: 'yaml' })
  .then(
    data => console.log(data.name, 'is a', data.animal)
  )
```

## Write Data Files

The `codec` option also works when writing data.

```js
import { file } from '@abw/badger'

file('giraffe.yaml', { codec: 'yaml' })
  .write({
    name:   "Gerald",
    animal: "Giraffe",
  })
```

You should now have a `giraffe.yaml` file containing the following:

```yaml
name: Gerald
animal: Giraffe
```

You can also pass the `codec` option to the `write()` method.

```js
file('giraffe.yaml')
  .write(
    {
      name:   "Gerald",
      animal: "Giraffe",
    },
    { codec: 'yaml' }
  )
```

## Directory Codec

You can specify the `codec` option for a directory.  Any files created by
that directory object will automatically use that codec.

```js
import { dir } from '@abw/badger'

dir('data', { codec: 'yaml' })
  .file('badger.yaml')
  .read()
  .then(
    data => console.log(data.name, 'is a', data.animal)
  )
```

## Auto Codec

If you specify the `codec` as `auto` on either a file or directory then it
will determine the codec from the file extension.  The extension must be
`json` or `yaml` but can be in any case, e.g `yaml`, `YAML`,
`Yaml`.

```js
const data   = dir('data', { codec: 'auto' });
const badger = await data.file('badger.yaml').read(); // uses yaml codec
const ferret = await data.file('ferret.json').read(); // uses json codec
```
