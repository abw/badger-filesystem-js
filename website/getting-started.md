# Getting Started

## Installation

Use your favourite package manager to install the module
from `@abw/badger-filesystem`.

::: code-group
```shell [npm]
npm add @abw/badger-filesystem
```
```shell [pnpm]
pnpm add @abw/badger-filesystem
```
```shell [yarn]
yarn add @abw/badger-filesystem
```
:::

## Basic Use

Import the `file()` and/or `dir()` functions using ESM syntax.

```js
import { file, dir } from '@abw/badger-filesystem'
```

Or via `require()` if you're still using Common JS format.

```js
const { file, dir } = require('@abw/badger-filesystem')
```

Create a [`Directory`](directories) object using the [`dir()`](directories#dir)
function.

```js
const config = dir('config')
```

Create a [`File`](files) object using the [`file()`](files#file) function.

```js
const hello = file('config/hello.txt')
// write to the file
await hello.write('Hello World!')
// read from the file
const message = await hello.read()
```

## Do the Happy Badger Dance

You are now all set to do the Happy Badger Dance

<img src="/images/happy_badger_dance.gif" width="100%"/>