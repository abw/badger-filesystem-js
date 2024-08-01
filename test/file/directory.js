import { test, expect } from 'vitest'
import { file, bin } from '../../src/index.js'

// current directory where this script is located
const thisDir = bin(import.meta.url)
const testFiles = thisDir.dir('test-files')
const tmpFiles = testFiles.dir('tmp')

test(
  'the test_files directory exists',
  async () => expect( await testFiles.exists() ).toBe(true)
)

test(
  'create the tmp sub-directory',
  async () => expect( await tmpFiles.mustExist({ create: true }) ).toBeTruthy()
)

// simple text file accessed using file() method of directory
const hello = testFiles.file('hello.txt');
test(
  'accessed the hello.txt file via the directory.file() method',
  async () => expect( await hello.exists() ).toBe(true)
);

// same file accessed using standalone file() function
const hello2 = file(hello.path())
test(
  'accessed the hello.txt file using the file() function',
  async () => expect( await hello2.exists() ).toBe(true)
);

// file directory() method
test(
  'the hello.txt directory should be the test-files directory',
  () => expect(
    hello2.directory().path()
  ).toBe(
    testFiles.path()
  )
)

// file dir() method
test(
  'the hello.txt dir should be the test-files directory',
  () => expect(
    hello2.dir().path()
  ).toBe(
    testFiles.path()
  )
)

