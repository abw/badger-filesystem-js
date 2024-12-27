import { test, expect } from 'vitest'
import { file, bin } from '../../src/index'

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
const hello = testFiles.file('hello.txt')
test(
  'accessed the hello.txt file via the directory.file() method',
  async () => expect( await hello.exists() ).toBe(true)
)

// same file accessed using standalone file() function
const hello2 = file(hello.path())
test(
  'accessed the hello.txt file using the file() function',
  async () => expect( await hello2.exists() ).toBe(true)
)

// file directory() method
test(
  'the hello.txt directory should be the test_files directory',
  () => expect(
    hello2.directory().path()
  ).toBe(
    testFiles.path()
  )
)

// file encoding option
test(
  'default file encoding should be utf8',
  () => expect(
    hello2.options().encoding
  ).toBe(
    'utf8'
  )
)

test(
  'can override the file encoding',
  () => expect(
    hello2.options({ encoding: 'utf11' }).encoding
  ).toBe(
    'utf11' // one louder
  )
)

test(
  'encoding can be set when file is created',
  () => expect(
    file(hello.path(), { encoding: 'utf11' }).options().encoding
  ).toBe(
    'utf11'
  )
)

// file read()
test(
  'can read text from file',
  async () => await hello
    .read()
    .then(
      text => expect( text ).toBe( 'Hello World!\n' )
    )
)

test(
  'can read text from file with explicit encoding',
  async () => await hello
    .read({ encoding: 'utf8' })
    .then(
      text => expect(text).toBe('Hello World!\n')
    )
)

test(
  'await read text from file',
  async () => expect(
    await hello.read()
  ).toBe(
    'Hello World!\n'
  )
)

