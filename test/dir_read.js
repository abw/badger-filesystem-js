import test from 'ava';
import { dir, bin } from '../src/index.js'

// current directory where this script is located
const thisDir = bin(import.meta.url);

test.serial(
  'read directory',
  async t => {
    const contents = await thisDir.dir('test_files/foo').read()
    t.is( contents[0], 'bar' );
    t.is( contents[1], 'wibble.txt' )
  }
);

test.serial(
  'read entries',
  async t => {
    const entries = await thisDir.dir('test_files/foo').entries()
    t.is( entries[0].type(), 'directory' );
    t.is( entries[0].base(), 'bar' );
    t.is( entries[1].type(), 'file' );
    t.is( entries[1].base(), 'wibble.txt' );
  }
);
