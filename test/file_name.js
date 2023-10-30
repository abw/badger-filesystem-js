import test from 'ava';
import { bin } from '../src/index.js'

// current directory where this script is located
const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test_files');
const hello = testFiles.file('hello.txt');

test(
  'hello.txt exists',
  async t => t.is( await hello.exists(), true )
);

test(
  'hello.txt dirname',
  t => t.is( hello.dirname(), testFiles.path() )
);

test(
  'hello.txt base',
  t => t.is( hello.base(), 'hello.txt' )
);

test(
  'hello.txt name',
  t => t.is( hello.name(), 'hello' )
);

test(
  'hello.txt ext',
  t => t.is( hello.ext(), '.txt' )
);
