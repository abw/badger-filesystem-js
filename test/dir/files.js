import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url);
const testDir = thisDir.dir('test-files/bar')

test(
  'read files',
  async () => {
    const files = await testDir.files()
    expect( files[0].base() ).toBe( 'badger.txt' )
    expect( await files[0].isFile() ).toBe( true )
    expect( files[1].base() ).toBe( 'wibble.txt' )
    expect( await files[1].isFile() ).toBe( true )
  }
)
