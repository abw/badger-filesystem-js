import { test, expect } from 'vitest'
import { cwd } from '../src/index.js'

const c = cwd()

test(
  'cwd() returns a directory',
  async () => expect( await c.isDirectory() ).toBe(true)
)
