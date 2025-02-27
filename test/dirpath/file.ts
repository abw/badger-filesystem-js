import { test, expect } from 'vitest'
import { bin, dirPath } from '../../src/index'

const thisDir = bin(import.meta.url)
const testDir = thisDir.dir('test-files')
const fooDir = testDir.dir('foo')
const barDir = testDir.dir('bar')
const bazDir = testDir.dir('baz')

test(
  'find file one.txt in foo',
  async () => {
    const dp = dirPath([fooDir, barDir.path(), bazDir])
    const one = await dp.file('one.txt')
    const oneText = await one?.read()
    expect(oneText).toBe('This is foo/one.txt')
  }
)

test(
  'find file two.txt in bar',
  async () => {
    const dp = dirPath([fooDir, barDir.path(), bazDir])
    const two = await dp.file('two.txt')
    const twoText = await two?.read()
    expect(twoText).toBe('This is bar/two.txt')
  }
)

test(
  'missing file eleven.txt',
  async () => {
    const dp = dirPath([fooDir, barDir.path(), bazDir])
    const eleven = await dp.file('eleven.txt')
    expect(eleven).toBe(undefined)
  }
)

test(
  'file four.json from foo',
  async () => {
    const dp = dirPath([fooDir, barDir.path(), bazDir], { codec: 'json' })
    const four = await dp.file('four.json')
    const fourData = await four?.read() as { message: string }
    expect(fourData.message).toBe('foo/four.json')
  }
)

test(
  'file five.json from bar',
  async () => {
    const dp = dirPath([fooDir, barDir.path(), bazDir], { codec: 'json' })
    const five = await dp.file('five.json')
    const fiveData = await five?.read() as { message: string }
    expect(fiveData.message).toBe('bar/five.json')
  }
)
