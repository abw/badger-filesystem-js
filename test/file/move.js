import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test-files/tmp')
const before = testFiles.file('before.txt')
const after = testFiles.file('after.txt')
const final = testFiles.file('final.txt')
let destFile

test(
  'delete after.txt if it exists',
  async () => {
    if (await after.exists()) {
      await after.delete()
    }
    expect( await after.exists() ).toBe(false)
  }
)

test(
  'write before.txt',
  async () => {
    await before.write('Hello World!\n')
    expect( await before.exists() ).toBe(true)
  }
)

test(
  'move before.txt to after.txt',
  async () => {
    await before.moveTo('after.txt')
    expect( await before.exists() ).toBe(false)
    expect( await after.exists() ).toBe(true)
  }
)

test(
  'moveTo non-existing directory with create option',
  async () => {
    const destDir = testFiles.dir('final-destination')
    // make sure the directory doesn't exist to check the create option works
    if (await destDir.exists()) {
      await destDir.destroy()
    }
    expect( await destDir.exists() ).toBe(false)
    destFile = destDir.file('final.txt')
    await after.copyTo(destFile, { create: true })
    expect(destFile).toBeTruthy()
    expect( await destFile.exists() ).toBe(true)
    // expect( destFile.path(), destPath )
    const text = await destFile.read()
    expect(text).toBe('Hello World!\n')
  }
)

test(
  'moveFrom',
  async () => {
    await final.moveFrom(destFile)
    expect( await final.exists() ).toBe(true)
    expect( await destFile.exists() ).toBe(false)
    const text = await final.read()
    expect(text).toBe('Hello World!\n')
  }
)
