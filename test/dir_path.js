import test from 'ava';
import { dir } from '../src/index.js'

test(
  'dir path',
  t => t.is( dir('foo').path(), 'foo' )
);

test(
  'dir sub path',
  t => t.is( dir('foo').dir('bar').path(), 'foo/bar' )
);

test(
  'dir path with argument',
  t => t.is( dir('foo').path('bar'), 'foo/bar' )
);

test(
  'dir path with arguments',
  t => t.is( dir('foo').path('bar', 'baz'), 'foo/bar/baz' )
);

