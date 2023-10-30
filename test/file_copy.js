import test from 'ava';
import { bin } from '../src/index.js'

// current directory where this script is located
const thisDir = bin(import.meta.url);
const testFiles = thisDir.dir('test_files');
const hello = testFiles.file('hello.txt');
const tmpDir = testFiles.dir('tmp');

test(
  'hello.txt exists',
  async t => t.is( await hello.exists(), true )
);

test(
  'copyTo existing directory',
  async t => {
    await tmpDir.mustExist({ create: true })
    const destPath = tmpDir.file('hello.txt').path()
    const destFile = await hello.copyTo(destPath)
    t.truthy( destFile )
    t.true( await destFile.exists() )
    t.is( destFile.path(), destPath )
    const text = await destFile.read()
    t.is(text, 'Hello World!\n')
  }
);

test(
  'copyTo non-existing directory with create option',
  async t => {
    const destDir = tmpDir.dir('non-existant')
    // make sure the directory doesn't exist to check the create option works
    if (await destDir.exists()) {
      await destDir.destroy()
    }
    t.false( await destDir.exists() )
    const destPath = destDir.file('hello.txt').path()
    const destFile = await hello.copyTo(destPath, { create: true })
    t.truthy( destFile )
    t.true( await destFile.exists() )
    t.is( destFile.path(), destPath )
    const text = await destFile.read()
    t.is(text, 'Hello World!\n')
  }
);

test(
  'copyFrom to existing directory',
  async t => {
    await tmpDir.mustExist({ create: true })
    const destFile = await tmpDir.file('hello.txt').copyFrom(hello)
    t.truthy( destFile )
    t.true( await destFile.exists() )
    const text = await destFile.read()
    t.is(text, 'Hello World!\n')
  }
);

test(
  'copyFrom to non-existant directory',
  async t => {
    const destDir = tmpDir.dir('non-existant')
    // make sure the directory doesn't exist to check the create option works
    if (await destDir.exists()) {
      await destDir.destroy()
    }
    t.false( await destDir.exists() )
    const srcPath = hello.path()
    const destFile = await destDir.file('hello.txt').copyFrom(srcPath, { create: true })
    t.truthy( destFile )
    t.true( await destFile.exists() )
    const text = await destFile.read()
    t.is(text, 'Hello World!\n')
  }
);

test(
  'copyTo to local name',
  async t => {
    // delete any destination file
    const oldFile = tmpDir.file('goodbye.txt')
    if (await oldFile.exists()) {
      await oldFile.delete()
    }
    t.false( await oldFile.exists() )
    await oldFile.copyFrom(hello)
    t.true( await oldFile.exists() )
    const goodbye = await oldFile.copyTo('goodbye.txt')
    t.true( await goodbye.exists() )
    const text = await goodbye.read()
    t.is(text, 'Hello World!\n')
  }
);

