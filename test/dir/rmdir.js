import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test-files');
const testDir = testFiles.dir('test-dir');
const subDir = testDir.dir('sub-directory');

test(
  'the test_files directory exists',
  async () => expect( await testFiles.exists() ).toBe( true )
)

test(
  'create the test_dir directory using mkdir()',
  async () => {
    if (await testDir.exists()) {
      await testDir.destroy()
    }
    expect( await testDir.exists() ).toBe( false )
    await testDir.mkdir()
    expect( await testDir.exists() ).toBe( true )
  }
)

test(
  'create the sub_directory directory using mkdir()',
  async () => {
    if (await subDir.exists()) {
      await subDir.destroy()
    }
    expect( await subDir.exists() ).toBe( false )
    await subDir.mkdir()
    expect( await subDir.exists() ).toBe( true )
  }
)

test(
  'delete the sub-directory directory using rmdir()',
  async () => {
    await subDir.rmdir()
    expect( await subDir.exists() ).toBe( false )
  }
)

test(
  'delete the test-dir directory using rmdir()',
  async () => {
    await testDir.rmdir()
    expect( await testDir.exists() ).toBe( false )
  }
)

test(
  'create the sub_directory directory recursively using mkdir() with recursive option',
  async () => {
    await subDir.mkdir({ recursive: true })
    expect( await subDir.exists() ).toBe( true )
  }
)

test(
  'delete the test_dir directory recursively using rmdir() and all options',
  async () => {
    await testDir.rmdir({ empty: true, force: true, recursive: true })
    expect( await subDir.exists() ).toBe( false )
    expect( await testDir.exists() ).toBe( false )
  }
)

test(
  'create the sub_directory directory once more',
  async () => {
    await subDir.mkdir({ recursive: true })
    expect( await subDir.exists() ).toBe( true )
  }
)

test(
  'delete the test_dir directory recursively using destroy()',
  async () => {
    await testDir.destroy();
    expect( await subDir.exists() ).toBe( false )
    expect( await testDir.exists() ).toBe( false )
  }
)
