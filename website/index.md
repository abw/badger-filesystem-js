---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Badger Filesystem"
  tagline: Javascript Filesystem Utilities
  image:
    src: images/badger3.svg
    alt: Badger
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: Documentation
      link: /directories
    - theme: alt
      text: Reference
      link: /reference
---
## Who Ordered This?

This module implements objects to simplify the process of working with
files and directories using Node.js.

## Examples

### Working With Files

```js
import { file } from '@abw/badger-filesystem'

// create a JSON file
const hello = file('hello.json', { codec: 'json' });

// write some data to it
await hello.write({ message: 'Hello World!' });

// read data from it
const data = await hello.read();
```

### Working With Directories

```js
import { dir } from '@abw/badger-filesystem'

// a config directory
const config = dir('config');

// check it exists and create it if not
await config.mustExist({ create: true });

// create a JSON file in the directory
const hello = config.file('hello.json', { codec: 'json' });

// write some data to it
await hello.write({ message: 'Hello World!' });

// read data from it
const data = await hello.read();
```

