import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url);
const testDir = thisDir.dir('test-files/bar')

test(
  'read dirs',
  async () => {
    const dirs = await testDir.dirs()
    expect( dirs[0].base() ).toBe( 'waz' )
    expect( await dirs[0].isDirectory() ).toBe( true )
    expect( dirs[1].base() ).toBe( 'wiz' )
    expect( await dirs[1].isDirectory() ).toBe( true )
  }
)

test(
  'read directories',
  async () => {
    const dirs = await testDir.directories()
    expect( dirs[0].base() ).toBe( 'waz' )
    expect( await dirs[0].isDirectory() ).toBe( true )
    expect( dirs[1].base() ).toBe( 'wiz' )
    expect( await dirs[1].isDirectory() ).toBe( true )
  }
)
