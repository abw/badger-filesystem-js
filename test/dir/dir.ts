import { test, expect } from 'vitest'
import { bin, dir } from '../../src/index'

const thisDir = bin(import.meta.url)
const testFiles = thisDir.dir('test-files')
const foo = testFiles.dir('foo')

test(
  'create a directory using dir() with path',
  async () => {
    const foo2 = dir(foo.path())
    expect( await foo2.exists() ).toBe( true )
    expect( foo2.path() ).toBe( foo.path() )
  }
)

test(
  'create a directory using dir() with dir',
  async () => {
    const foo2 = dir(foo)
    expect( await foo2.exists() ).toBe( true )
    expect( foo2.path() ).toBe( foo.path() )
  }
)
