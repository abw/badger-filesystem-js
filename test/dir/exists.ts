import { test, expect } from 'vitest'
import { bin } from '../../src/index'

const thisDir = bin(import.meta.url)
const testFiles = thisDir.dir('test-files')
const testDir = testFiles.dir('test-dir')
const subDir = testDir.dir('sub-directory')
const tmpDir = testFiles.dir('tmp')

test(
  'the test_files directory exists',
  async () => expect( await testFiles.exists() ).toBe( true )
)

test(
  'the no-such-dir directory does not exist',
  async () => expect(
    await thisDir.dir('no-such-dir').exists()
  ).toBe(
    false
  )
)

test(
  'destroy the test-dir directory if it exists',
  async () => {
    if (await testDir.exists()) {
      await testDir.destroy()
    }
    expect( await testDir.exists() ).toBe( false )
  }
)

test(
  'create the test-dir directory',
  async () => {
    await testDir.mkdir()
    expect( await testDir.exists() ).toBe( true )
  }
)


test(
  'the test-dir directory must exist',
  async () => expect( await testDir.mustExist() ).toBe( testDir )
)

test(
  'the test-dir directory must exist again',
  async () => expect( await testDir.mustExist() ).toBe( testDir )
)

test(
  'delete the test-dir directory',
  async () => {
    await testDir.rmdir()
    expect( await testDir.exists() ).toBe( false )
  }
)

test(
  "mustExist throws error if directory doesn't exist",
  async () => {
    expect(
      () => testDir.mustExist()
    ).rejects.toThrowError(
      'Directory does not exist: ' + testDir.path()
    )
  }
)

test(
  'mustExist creates directory with mkdir option',
  async () => {
    const result = await testDir.mustExist({ mkdir: true })
    expect( result ).toBe( testDir )
    expect( await testDir.exists() ).toBe( true )
  }
)

test(
  'delete the test-dir directory again',
  async () => {
    await testDir.rmdir()
    expect( await testDir.exists() ).toBe( false )
  }
)

test(
  'mustExist creates sub-directory with mkdir and recurse option',
  async () => {
    const result = await subDir.mustExist({ mkdir: true, recursive: true })
    expect( result ).toBe( subDir )
    expect( await subDir.exists() ).toBe( true )
  }
)

test(
  'mustExist returns object when directory exists',
  async () => {
    const result = await subDir.mustExist()
    expect( result ).toBe( subDir )
    expect( await subDir.exists() ).toBe( true )
  }
)

test(
  'delete the test-dir and sub-directory directories once more',
  async () => {
    await testDir.destroy()
    expect( await subDir.exists() ).toBe( false )
    expect( await testDir.exists() ).toBe( false )
  }
)

test(
  'mustExist creates sub-directory with create option',
  async () => {
    await subDir.mustExist({ create: true })
    expect( await subDir.exists() ).toBe( true )
  }
)

test(
  'destroy the test-dir directory',
  async () => {
    await testDir.destroy()
    expect( await testDir.exists() ).toBe( false )
  }
)

test(
  'destroy the tmp directory',
  async () => {
    await tmpDir.destroy()
    expect( await tmpDir.exists() ).toBe( false )
  }
)
