import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test-files')
const hello = testFiles.file('hello.txt')

test(
  'hello.txt exists',
  async () => expect( await hello.exists() ).toBe( true )
)

test(
  'hello.txt dirname',
  () => expect( hello.dirname() ).toBe( testFiles.path() )
)

test(
  'hello.txt base',
  () => expect( hello.base() ).toBe( 'hello.txt' )
)

test(
  'hello.txt name',
  () => expect( hello.name() ).toBe( 'hello' )
)

test(
  'hello.txt ext',
  () => expect( hello.ext() ).toBe( '.txt' )
);
