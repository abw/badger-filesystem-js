import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url)
const testFiles = thisDir.dir('test-files')
const foo = testFiles.dir('foo')
const bar = testFiles.dir('foo/bar')

test(
  'the test-files/foo/bar directory exists',
  async () => {
    expect( await bar.exists() ).toBe( true )
  }
);

test(
  'bar parent is foo',
  async () => {
    expect( bar.parent().path() ).toBe( foo.path() )
  }
);

test(
  'bar up(1) is foo',
  async () => {
    expect( bar.up(1).path() ).toBe( foo.path() )
  }
);

test(
  'bar up(2) is test_files',
  async () => {
    expect( bar.up(2).path() ).toBe( testFiles.path() )
  }
);
