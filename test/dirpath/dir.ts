import { test, expect } from 'vitest'
import { bin, dirPath } from '../../src/index'

const thisDir = bin(import.meta.url)
const testDir = thisDir.dir('test-files')
const fooDir = testDir.dir('foo')
const barDir = testDir.dir('bar')
const bazDir = testDir.dir('baz')

test(
  'find dir dir1 in foo',
  async () => {
    const dp = dirPath([fooDir, barDir.path(), bazDir])
    const dir1 = await dp.dir('dir1')
    const wibble = dir1?.file('wibble.txt')
    const wibbleText = await wibble?.read()
    expect(wibbleText).toBe('frusset pouch from foo/dir1')
  }
)

test(
  'find dir dir2 in bar',
  async () => {
    const dp = dirPath([fooDir, barDir.path(), bazDir])
    const dir2 = await dp.dir('dir2')
    const wibble = dir2?.file('wibble.txt')
    const wibbleText = await wibble?.read()
    expect(wibbleText).toBe('frusset pouch from bar/dir2')
  }
)
