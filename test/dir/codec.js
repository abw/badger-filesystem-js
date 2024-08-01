import { test, expect } from 'vitest'
import { bin } from '../../src/index.js'

const thisDir = bin(import.meta.url);
const testDir = thisDir.dir('test-files')

test(
  'read files from json dir',
  async () => {
    const jsonDir = testDir.dir('json-files', { codec: 'json' })
    await jsonDir
      .file('hello.json')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello.json')
      )
    await jsonDir
      .file('hello.jsn')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello.jsn')
      )
    await jsonDir
      .file('hello')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello')
      )
  }
)

test(
  'read files from yaml dir',
  async () => {
    const yamlDir = testDir.dir('yaml-files', { codec: 'yaml' })
    await yamlDir
      .file('hello.yaml')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello.yaml')
      )
    await yamlDir
      .file('hello.yml')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello.yml')
      )
    await yamlDir
      .file('hello')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello')
      )
  }
)

test(
  'read files from auto dir',
  async () => {
    const autoDir = testDir.dir('auto-files', { codec: 'auto' })
    await autoDir
      .file('hello.yaml')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello.yaml')
      )
    await autoDir
      .file('hello.yml')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello.yml')
      )
    await autoDir
      .file('hello.json')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello.json')
      )
    await autoDir
      .file('hello.jsn')
      .read()
      .then(
        data => expect(data.msg).toBe('This is hello.jsn')
      )
  }
)
