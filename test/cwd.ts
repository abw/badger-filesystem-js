import { test, expect } from 'vitest'
import { cwd } from '../src/index'

const c = cwd()

test(
  'cwd() returns a directory',
  async () => expect( await c.isDirectory() ).toBe(true)
)
