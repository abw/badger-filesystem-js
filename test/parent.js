import test from 'ava';
import { bin } from '../src/index.js'

// current directory where this script is located
const thisDir = bin(import.meta.url);
const test_files = thisDir.dir('test_files');
const foo = test_files.dir('foo');

test.serial(
  'the test_files/foo/bar directory exists',
  async t => {
    const bar = thisDir.dir('test_files/foo/bar');
    t.is( await bar.exists(), true)
  }
);

test.serial(
  'bar parent is foo',
  async t => {
    const bar = thisDir.dir('test_files/foo/bar');
    t.is( bar.parent().path(), foo.path())
  }
);

test.serial(
  'bar up(1) is foo',
  async t => {
    const bar = thisDir.dir('test_files/foo/bar');
    t.is( bar.up(1).path(), foo.path())
  }
);

test.serial(
  'bar up(2) is test_files',
  async t => {
    const bar = thisDir.dir('test_files/foo/bar');
    t.is( bar.up(2).path(), test_files.path())
  }
);
