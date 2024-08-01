import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url);
const testDir = thisDir.dir('test-files/foo')

test(
  'read directory',
  async () => {
    const contents = await testDir.read()
    expect( contents[0] ).toBe( 'bar' )
    expect( contents[1] ).toBe( 'wibble.txt' )
  }
)

test(
  'read entries',
  async () => {
    const entries = await testDir.entries()
    expect( entries[0].type() ).toBe( 'directory' )
    expect( entries[0].base() ).toBe( 'bar' )
    expect( entries[1].type() ).toBe( 'file' )
    expect( entries[1].base() ).toBe( 'wibble.txt' )
  }
)
