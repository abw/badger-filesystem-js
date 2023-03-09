import test from 'ava';
import { file, bin } from '../src/index.js'

// current directory where this script is located
const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test_files');
const tmpFiles = testFiles.dir('tmp');

test(
  'the test_files directory exists',
  async t => t.is( await testFiles.exists(), true)
);
test(
  'create the tmp sub-directory',
  async t => t.is( await tmpFiles.mustExist({ create: true }), tmpFiles )
);

// simple text file accessed using file() method of directory
const hello = testFiles.file('hello.txt');
test(
  'accessed the hello.txt file via the directory.file() method',
  async t => t.is( await hello.exists(), true )
);

// same file accessed using standalone file() function
const hello2 = file(hello.path());
test(
  'accessed the hello.txt file using the file() function',
  async t => t.is( await hello2.exists(), true )
);

// file directory() method
test(
  'the hello.txt directory should be the test_files directory',
  t => t.is( hello2.directory().path(), testFiles.path() )
)

// file encoding option
test(
  'default file encoding should be utf8',
  t => t.is( hello2.options().encoding, 'utf8' )
)
test(
  'can override the file encoding',
  t => t.is( hello2.options({ encoding: 'utf11' }).encoding, 'utf11' ) // one louder
)
test(
  'encoding can be set when file is created',
  t => t.is( file(hello.path(), { encoding: 'utf11' }).options().encoding, 'utf11' )
)

// file read()
test(
  'can read text from file',
  t => hello.read().then(
    text => t.is(text, "Hello World!\n")
  )
)
test(
  'can read text from file with explicit encoding',
  t => hello.read({ encoding: 'utf8' }).then(
    text => t.is(text, "Hello World!\n")
  )
)
test(
  'await read text from file',
  async t => t.is(await hello.read(), "Hello World!\n")
)

