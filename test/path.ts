import { test, expect } from 'vitest'
import { file } from '../src/index'

const p1 = file('/foo/bar')

test(
  'file() creates a path object',
  () => expect( p1.path() ).toBe( '/foo/bar' )
)

test(
  'relative path down',
  () => expect( p1.relativePath('baz') ).toBe( '/foo/bar/baz' )
)

test(
  'relative path up',
  () => expect( p1.relativePath('..') ).toBe( '/foo' )
)

test(
  'relative path up and down',
  () => expect( p1.relativePath('../wiz/bang') ).toBe( '/foo/wiz/bang' )
)

test(
  'stringification',
  () => expect( `FILE: ${p1}` ).toBe( 'FILE: /foo/bar' )
)

test(
  'parse()',
  () => expect( p1.parse() ).toBeTruthy()
)

test(
  'unparse()',
  () => expect( p1.unparse() ).toBeUndefined()
)
