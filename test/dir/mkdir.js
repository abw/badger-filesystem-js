import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url)
const testFiles = thisDir.dir('test-files')
const testDir = testFiles.dir('test-dir')
const subDir = testDir.dir('sub-directory')

test(
  'the test_files directory exists',
  async () => expect( await testFiles.exists() ).toBe( true )
)

test(
  'make the test-dir directory using mkdir()',
  async () => {
    const exists = await testDir.exists()
    if (exists) {
      await testDir.destroy()
    }
    expect( await testDir.exists() ).toBe( false )
    await testDir.mkdir()
    expect( await testDir.exists() ).toBe( true )
  }
)

test(
  'make the sub-directory directory using mkdir()',
  async () => {
    await subDir.mkdir()
    expect( await subDir.exists() ).toBe( true )
  }
)

test(
  'delete the test directory recursively using rmdir() with options',
  async () => {
    await testDir.rmdir({ empty: true, recursive: true, force: true })
    expect( await testDir.exists() ).toBe( false )
  }
)

test(
  'make the sub_directory directory recursively with mkdir() and recursive option',
  async () => {
    await subDir.mkdir({ recursive: true });
    expect( await testDir.exists() ).toBe( true )
    expect( await subDir.exists() ).toBe( true )
  }
)

test(
  'sub_directory should be empty',
  async () => expect( await subDir.isEmpty() ).toBe( true )
)

test(
  'delete the test directory once more using rmdir() and all options',
  async () => {
    await testDir.rmdir({ empty: true, recursive: true, force: true })
    expect( await testDir.exists() ).toBe( false )
  }
)

test(
  'create the sub-directory recursively using create()',
  async () => {
    await subDir.create()
    expect( await testDir.exists() ).toBe( true )
    expect( await subDir.exists() ).toBe( true )
  }
)
