import { test, expect } from 'vitest'
import { bin } from '../../src/index'

const thisDir = bin(import.meta.url)
const testFiles = thisDir.dir('test-files')

test(
  'the test_files directory exists',
  async () => expect( await testFiles.exists() ).toBe(true)
)

test(
  'existing file exists()',
  async () => await testFiles
    .file('hello.txt')
    .exists()
    .then(
      exists => expect(exists).toBe(true)
    )
)

test(
  'non-existing file exists()',
  async () => await testFiles
    .file('no-such-file.txt')
    .exists()
    .then(
      exists => expect(exists).toBe(false)
    )
)

test(
  'await existing file exists()',
  async () =>
    expect(
      await testFiles.file('hello.txt').exists()
    ).toBe(
      true
    )
)

test(
  'await non-existing file exists()',
  async () =>
    expect(
      await testFiles.file('no-such-file.txt').exists()
    ).toBe(
      false
    )
)

