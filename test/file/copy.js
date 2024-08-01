import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test-files')
const hello = testFiles.file('hello.txt')
const tmpDir = testFiles.dir('tmp')

test(
  'hello.txt exists',
  async () => expect( await hello.exists() ).toBe( true )
)

test(
  'copyTo existing directory',
  async () => {
    await tmpDir.mustExist({ create: true })
    const destPath = tmpDir.file('hello.txt').path()
    const destFile = await hello.copyTo(destPath)
    expect( destFile ).toBeTruthy()
    expect( await destFile.exists() ).toBe(true)
    expect( destFile.path() ).toBe( destPath )
    const text = await destFile.read()
    expect(text).toBe('Hello World!\n')
  }
)

test(
  'copyTo non-existing directory with create option',
  async () => {
    const destDir = tmpDir.dir('non-existent')
    // make sure the directory doesn't exist to check the create option works
    if (await destDir.exists()) {
      await destDir.destroy()
    }
    expect( await destDir.exists() ).toBe(false)
    const destPath = destDir.file('hello.txt').path()
    const destFile = await hello.copyTo(destPath, { create: true })
    expect(destFile).toBeTruthy()
    expect( await destFile.exists() ).toBe(true)
    expect( destFile.path() ).toBe(destPath)
    const text = await destFile.read()
    expect(text).toBe('Hello World!\n')
  }
)

test(
  'copyFrom to existing directory',
  async () => {
    await tmpDir.mustExist({ create: true })
    const destFile = await tmpDir.file('hello.txt').copyFrom(hello)
    expect(destFile).toBeTruthy()
    expect( await destFile.exists() ).toBe(true)
    const text = await destFile.read()
    expect(text).toBe('Hello World!\n')
  }
)

test(
  'copyFrom to non-existent directory',
  async () => {
    const destDir = tmpDir.dir('non-existent')
    // make sure the directory doesn't exist to check the create option works
    if (await destDir.exists()) {
      await destDir.destroy()
    }
    expect( await destDir.exists() ).toBe(false)
    const srcPath = hello.path()
    const destFile = await destDir.file('hello.txt').copyFrom(srcPath, { create: true })
    expect(destFile).toBeTruthy()
    expect( await destFile.exists() ).toBe(true)
    const text = await destFile.read()
    expect(text, 'Hello World!\n')
  }
);

test(
  'copyTo to local name',
  async () => {
    // delete any destination file
    const oldFile = tmpDir.file('goodbye.txt')
    if (await oldFile.exists()) {
      await oldFile.delete()
    }
    expect( await oldFile.exists() ).toBe(false)
    await oldFile.copyFrom(hello)
    expect( await oldFile.exists() ).toBe(true)
    const goodbye = await oldFile.copyTo('goodbye.txt')
    expect( await goodbye.exists() ).toBe(true)
    const text = await goodbye.read()
    expect(text).toBe('Hello World!\n')
  }
);
