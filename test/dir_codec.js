import test from 'ava';
import { AUTO } from '../src/Constants.js';
import { bin } from '../src/index.js'

// current directory where this script is located
const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test_files', { codec: AUTO });

// read YAML
test(
  'read data from YAML file',
  t => testFiles.file('hello.yaml').read().then(
    data => t.is(data.msg, "Hello World")
  )
)

// read JSON
test(
  'read data from JSON file',
  t => testFiles.file('hello.json').read().then(
    data => t.is(data.msg, "Hello World")
  )
)
