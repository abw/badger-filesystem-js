import test from 'ava';
import { file, bin } from '../src/index.js'

// current directory where this script is located
const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test_files');

test(
  'the test_files directory exists',
  async t => t.is( await testFiles.exists(), true)
);

// read YAML
test(
  'read data from YAML file with pre-defined codec',
  t => testFiles.file('hello.yaml', { codec: 'yaml' }).read().then(
    data => t.is(data.msg, "Hello World")
  )
)
test(
  'read data from YAML file with codec defined in read() options',
  t => testFiles.file('hello.yaml').read({ codec: 'yaml' }).then(
    data => t.is(data.msg, "Hello World")
  )
)
test(
  'await read data from YAML file with codec defined in read() options',
  async t => t.is((await testFiles.file('hello.yaml').read({ codec: 'yaml' })).msg, "Hello World")
)

test(
  'read data from YAML file with codec defined in file() options',
  async t => t.is(
    (await file(testFiles.path('hello.yaml'), { codec: 'yaml'}).read()).msg, "Hello World")
)

test(
  'read data from YAML file with pre-defined auto codec',
  t => testFiles.file('hello.yaml', { codec: 'auto' }).read().then(
    data => t.is(data.msg, "Hello World")
  )
)
test(
  'read data from YAML file with auto codec defined in read() options',
  t => testFiles.file('hello.yaml').read({ codec: 'auto' }).then(
    data => t.is(data.msg, "Hello World")
  )
)
test(
  'await read data from YAML file with auto codec defined in read() options',
  async t => t.is((await testFiles.file('hello.yaml').read({ codec: 'auto' })).msg, "Hello World")
)

test(
  'read data from YAML file with auto codec defined in file() options',
  async t => t.is(
    (await file(testFiles.path('hello.yaml'), { codec: 'auto'}).read()).msg, "Hello World")
)
test(
  'read data from .yml file with pre-defined auto codec',
  t => testFiles.file('hello.yml', { codec: 'auto' }).read().then(
    data => t.is(data.msg, "Hello World")
  )
)

// read JSON
test(
  'read data from JSON file with pre-defined codec',
  t => testFiles.file('hello.json', { codec: 'json' }).read().then(
    data => t.is(data.msg, "Hello World")
  )
)
test(
  'read data from JSON file with codec defined in read() options',
  t => testFiles.file('hello.json').read({ codec: 'json' }).then(
    data => t.is(data.msg, "Hello World")
  )
)
test(
  'await read data from JSON file with codec defined in read() options',
  async t => t.is((await testFiles.file('hello.json').read({ codec: 'json' })).msg, "Hello World")
)

test(
  'read data from JSON file with pre-defined auto codec',
  t => testFiles.file('hello.json', { codec: 'auto' }).read().then(
    data => t.is(data.msg, "Hello World")
  )
)
test(
  'read data from JSON file with auto codec defined in read() options',
  t => testFiles.file('hello.json').read({ codec: 'auto' }).then(
    data => t.is(data.msg, "Hello World")
  )
)
test(
  'await read data from JSON file with auto codec defined in read() options',
  async t => t.is((await testFiles.file('hello.json').read({ codec: 'auto' })).msg, "Hello World")
)

test(
  'read data from .json file with pre-defined auto codec',
  t => testFiles.file('hello.jsn', { codec: 'auto' }).read().then(
    data => t.is(data.msg, "Hello World")
  )
)
