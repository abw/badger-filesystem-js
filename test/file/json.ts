import { test, expect } from 'vitest'
import { file, bin } from '../../src/index'

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

//--------------------------------------------------------------------------
// Read
//--------------------------------------------------------------------------
test(
  'read data from file with pre-defined json codec',
  async () => await testFiles
    .file('hello.json', { codec: 'json' })
    .read()
    .then(
      data => expect(data.msg).toBe('Hello World')
    )
)

test(
  'read data from file with json codec defined in read() options',
  async () => await testFiles
    .file('hello.json')
    .read({ codec: 'json' })
    .then(
      data => expect(data.msg).toBe('Hello World')
    )
)

test(
  'await read data from file with json codec defined in read() options',
  async () => {
    const data = await testFiles
      .file('hello.json')
      .read({ codec: 'json' })
    expect(data.msg).toBe('Hello World')
  }
)

test(
  'read data from .json file with pre-defined auto codec',
  async () => await testFiles
    .file('hello.json', { codec: 'auto' })
    .read()
    .then(
      data => expect(data.msg).toBe('Hello World')
    )
)

test(
  'read data from .json file with auto codec defined in read() options',
  async () => await testFiles
    .file('hello.json')
    .read({ codec: 'auto' })
    .then(
      data => expect(data.msg).toBe('Hello World')
    )
)
test(
  'await read data from .json file with auto codec defined in read() options',
  async () => {
    const data = await testFiles
      .file('hello.json')
      .read({ codec: 'auto' })
    expect(data.msg).toBe('Hello World')
  }
)

test(
  'read data from .json file with auto codec defined in file() options',
  async () => {
    const data = await file(
      testFiles.path('hello.yaml'),
      { codec: 'auto'}
    ).read()
    expect(data.msg).toBe('Hello World')
  }
)

test(
  'read data from .jsn file with pre-defined auto codec',
  async () => await testFiles
    .file('hello.jsn', { codec: 'auto' })
    .read()
    .then(
      data => expect(data.msg).toBe('Hello World')
    )
)

//--------------------------------------------------------------------------
// Write
//--------------------------------------------------------------------------
const rnum   = Math.floor(Math.random() * 1000)
const string = 'I Wrote This!'

test(
  'write and read data with pre-defined json codec',
  async () => await tmpFiles
    .file('readwrite.json', { codec: 'json' })
    .write({ msg: string, random: rnum })
    .then( file => file.read() )
    .then(
      data => {
        expect(data.msg).toBe(string)
        expect(data.random).toBe(rnum)
      }
    )
)

test(
  'write and read data with pre-defined auto codec',
  async () => await tmpFiles
    .file('readwrite.json', { codec: 'auto' })
    .write({ msg: string, random: rnum })
    .then( file => file.read() )
    .then(
      data => {
        expect(data.msg).toBe(string)
        expect(data.random).toBe(rnum)
      }
    )
)

test(
  'write and read data with json codec in read and write options',
  async () => await tmpFiles
    .file('readwrite.json')
    .write({ msg: string, random: rnum }, { codec: 'json' })
    .then( file => file.read({ codec: 'json' }) )
    .then(
      data => {
        expect(data.msg).toBe(string)
        expect(data.random).toBe(rnum)
      }
    )
)
