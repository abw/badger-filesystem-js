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
features:
  - title: Directories
    details: Working with filesystem directories
    link: /directories
  - title: Files
    details: Working with files
    link: /files
  - title: Codecs
    details: Reading and writing JSON and YAML files
    link: /codecs

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

## Opinionated and Selfish Software

::: warning WARNING - People Who Share Their Source Code Do Not Owe You Anything!
This is OSS: **Open Source Software** that you can freely download, use and adapt
if you want to. But here OSS also stands for **Opinionated and Selfish Software**.

It doesn't set out to please all the people, all the time. On the contrary,
it is designed to please one person (me) most of the time. I wrote it to help
me get my job done.  If it helps you get your job done then great.  But please
don't complain if it doesn't do what you want.  It's not my job to help you
do your job.

https://freeasinweekend.org/open-source-open-mind
:::

<center>
<img src="/images/oss.svg" width="150" height="150" style="margin-top: 4rem">
</center>
