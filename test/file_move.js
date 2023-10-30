import test from 'ava';
import { bin } from '../src/index.js'

// current directory where this script is located
const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test_files/tmp');
const before = testFiles.file('before.txt');
const after = testFiles.file('after.txt');
const final = testFiles.file('final.txt');
let destFile

test.serial(
  'delete after.txt if it exists',
  async t => {
    if (await after.exists()) {
      await after.delete()
    }
    t.is( await after.exists(), false )
  }
);

test.serial(
  'write before.txt',
  async t => {
    await before.write('Hello World!\n')
    t.is( await before.exists(), true )
  }
);

test.serial(
  'move before.txt to after.txt',
  async t => {
    await before.moveTo('after.txt')
    t.is( await before.exists(), false )
    t.is( await after.exists(), true )
  }
);

test.serial(
  'moveTo non-existing directory with create option',
  async t => {
    const destDir = testFiles.dir('final-destination')
    // make sure the directory doesn't exist to check the create option works
    if (await destDir.exists()) {
      await destDir.destroy()
    }
    t.false( await destDir.exists() )
    destFile = destDir.file('final.txt')
    await after.copyTo(destFile, { create: true })
    t.truthy( destFile )
    t.true( await destFile.exists() )
    // t.is( destFile.path(), destPath )
    const text = await destFile.read()
    t.is(text, 'Hello World!\n')
  }
);

test.serial(
  'moveFrom',
  async t => {
    await final.moveFrom(destFile)
    t.true( await final.exists() )
    t.false( await destFile.exists() )
    const text = await final.read()
    t.is(text, 'Hello World!\n')
  }
);


