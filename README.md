# Badger Filesystem

This provides a number of utility modules to make it easier working with
directories and files in a node.js project.

## Installation

Install `badger-filesystem` using your favourite package manager.

### npm

    npm add @abw/badger-filesystem

### pnpm

    pnpm add @abw/badger-filesystem

### yarn

    yarn add @abw/badger-filesystem

## Example

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

## Manual

Read the [Manual](https://abw.github.io/badger-filesystem-js/docs/manual/)
for an introduction to the utilities and examples of use.

## API Documentation

Read the [API documentation](https://abw.github.io/badger-filesystem-js/docs/)
for further information about the classes, methods and utility functions provided.

## Author

Andy Wardley https://github.com/abw