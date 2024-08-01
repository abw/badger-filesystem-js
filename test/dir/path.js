import { test, expect } from 'vitest'
import { dir } from '../../src/index.js'

test(
  'dir path',
  () => expect( dir('foo').path() ).toBe( 'foo' )
)

test(
  'dir sub path',
  () => expect( dir('foo').dir('bar').path() ).toBe( 'foo/bar' )
);

test(
  'dir path with argument',
  () => expect( dir('foo').path('bar') ).toBe( 'foo/bar' )
)

test(
  'dir path with arguments',
  () => expect( dir('foo').path('bar', 'baz') ).toBe( 'foo/bar/baz' )
)

