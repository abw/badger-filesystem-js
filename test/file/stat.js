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
  'hello.txt isFile()',
  async () => expect( await hello.isFile() ).toBe( true )
)

test(
  'hello.txt isDirectory()',
  async () => expect( await hello.isDirectory() ).toBe( false )
)

test(
  'hello.txt mode()',
  async () => expect( await hello.mode() ).toBeTruthy()
)

test(
  'hello.txt size()',
  async () => expect( await hello.size() ).toBe( 13 )
)

test(
  'hello.txt accessed()',
  async () => expect( await hello.accessed() ).toBeTruthy()
)

test(
  'hello.txt modified()',
  async () => expect( await hello.modified() ).toBeTruthy()
)

test(
  'hello.txt changed()',
  async () => expect( await hello.changed() ).toBeTruthy()
)

test(
  'hello.txt created()',
  async () => expect( await hello.created() ).toBeTruthy()
)

