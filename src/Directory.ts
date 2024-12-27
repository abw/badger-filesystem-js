import process from 'node:process'
import path from 'node:path'
import Path from './Path.js'
import File, { file } from './File.js'
import { fail } from '@abw/badger-utils'
import { rm, mkdir, rmdir, readdir, stat } from 'node:fs/promises'
import { CreateOptions, EmptyOptions, MkdirOptions, PathOptions, PathSource, PathType, RmdirOptions } from './types.js'

/**
 * The Directory class implements a wrapper around a filesystem
 * directory.
 */
export class Directory extends Path {
  constructor(path, options={}) {
    super(path, options)
    this.state.type = PathType.directory
  }

  /**
   * Fetch a new {@link File} object for a file in the directory.
   * @param {string} path - file path
   * @param {Object} [options] - file configuration options
   * @param {String} [options.codec] - codec for encoding/decoding file data
   * @param {String} [options.encoding=utf8] - character encoding
   * @return {Object} the {@link File} object
   */
  file(path: PathSource, options?: PathOptions): File {
    this.debug('file(%s, %o)', path, options)
    return file(this.relativePath(path), this.options(options))
  }

  /**
   * Fetch a new {@link Directory} object for a sub-directory in the directory.
   * @param {string} path - directory path
   * @param {Object} [options] - directory configuration options
   * @param {String} [options.codec] - default codec for encoding/decoding files
   * @param {String} [options.encoding=utf8] - default character encoding for files
   * @return {Object} the {@link Directory} object
   */
  directory(path: PathSource, options?: PathOptions): Directory {
    this.debug('directory(%s, %o)', path, options)
    return dir(this.relativePath(path), this.options(options))
  }

  /**
   * An alias for the {@link directory} method for lazy people
   * @return {Object} the {@link Directory} object
   */
  dir(path: PathSource, options?: PathOptions): Directory {
    this.debug('dir(%s, %o)', path, options)
    return this.directory(path, options)
  }

  /**
   * Returns a new {@link Directory} object for the parent directory
   * @param {Object} [options] - directory configuration options
   * @param {String} [options.codec] - default codec for encoding/decoding files
   * @param {String} [options.encoding=utf8] - default character encoding for files
   * @return {Object} a {@link Directory} object for the parent
   */
  parent(options?: PathOptions): Directory {
    this.debug('parent()')
    return this.up(1, options)
  }

  /**
   * Returns a new {@link Directory} object for the parent directory up one or more levels.
   * @param {number} [n] - how many levels up
   * @param {PathOptions} [options] - directory configuration options
   * @param {string} [options.codec] - default codec for encoding/decoding files
   * @param {string} [options.encoding=utf8] - default character encoding for files
   * @return {Directory} a {@link Directory} object for the parent
   */
  up(n: number = 1, options?: PathOptions): Directory {
    this.debug(`up(${n})`)
    return this.directory(
      Array(n).fill('..').join('/'),
      options
    )
  }

  /**
   * Returns the names of the files and sub-directories in the directory
   * @return {Promise} fulfills with an array of the file and directory names
   */
  async read(): Promise<string[]> {
    this.debug('read()')
    return await readdir(this.path())
  }

  /**
   * Returns an array of {@link File} and {@link Directory} objects for the
   * contents of the directory.
   * @return {Promise} fulfills with an array of {@link File} and {@link Directory} objects
   */
  async entries(): Promise<Path[]> {
    this.debug('entries()')
    const names = await this.read()
    const entries = [ ]

    for (const name of names) {
      const relpath = this.path(name)
      const stats = await stat(relpath)
      if (stats.isFile()) {
        entries.push(this.file(name))
      }
      else if (stats.isDirectory()) {
        entries.push(this.dir(name))
      }
      // ignore anything that isn't a file or directory
    }
    return entries
  }
  /**
   * Returns an array of {@link File} objects for the files in the directory.
   * @return {Promise} fulfills with an array of {@link File} objects
   */
  async files(): Promise<Path[]> {
    const entries = await this.entries()
    return entries.filter( entry => entry.type() === PathType.file )
  }
  /**
   * Returns an array of {@link Directory} objects for the directories in the directory.
   * @return {Promise} fulfills with an array of {@link Directory} objects
   */
  async directories(): Promise<Path[]> {
    const entries = await this.entries()
    return entries.filter( entry => entry.type() === PathType.directory )
  }
  /**
   * An alias for the {@link directories} method.
   * @return {Promise} fulfills with an array of {@link Directory} objects
   */
  async dirs(): Promise<Path[]> {
    return this.directories()
  }

  /**
   * Determines if the directory is empty.
   * @return {Promise<boolean>} fulfills with a boolean value true (empty) or false (not empty).
   */
  async isEmpty(): Promise<boolean> {
    this.debug('isEmpty()')
    const entries = await this.read()
    return entries.length === 0
  }

  /**
   * Determines if the directory is not empty.
   * @return {Promise<boolean>} fulfills with a boolean value true (not empty) or false (empty).
   */
  async notEmpty(): Promise<boolean> {
    this.debug('notEmpty()')
    const empty = await this.isEmpty()
    return !empty
  }

  /**
   * Empty the directory.
   * @param {EmptyOptions} [options] - configuration options
   * @param {boolean} [options.force] - force removal of files and directories
   * @param {boolean} [options.recursive] - recursively empty and delete sub-directories
   * @return {Promise<Directory>} fulfills to the {@link Directory} object
   */
  async empty(options: EmptyOptions = { }): Promise<Directory> {
    this.debug('empty(%o)', options)
    if (await this.exists() && await this.notEmpty()) {
      await rm(this.path(), options)
    }
    return this
  }

  /**
   * Make the directory.
   * @param {MkdirOptions} [options] - configuration options
   * @param {boolean} [options.recursive] - create intermediate directories
   * @return {Promise<Directory>} fulfills to the {@link Directory} object
   */
  async mkdir(options: MkdirOptions = {}): Promise<Directory> {
    this.debug('mkdir(%o)', options)
    const exists = await this.exists()
    if (! exists) {
      await mkdir(this.path(), options)
    }
    return this
  }

  /**
   * Remove the directory.
   * @param {Object} [options] - configuration options
   * @param {Boolean} [options.empty] - delete items in directory
   * @param {Boolean} [options.force] - force delete files and directories
   * @param {Boolean} [options.recursive] - recursively delete sub-directories
   * @return {Promise} fulfills to the {@link Directory} object
   */
  async rmdir(options: RmdirOptions={}): Promise<Directory> {
    this.debug('rmdir(%o)', options)
    if (options.empty) {
      await this.empty(options)
    }
    if (await this.exists()) {
      await rmdir(this.path())
    }
    return this
  }

  /**
   * Create the directory and any intermediate directories.
   * @param {MkdirOptions} [options] - configuration options
   * @param {boolean} [options.recursive=true] - recursively create intermediate directories
   * @return {Promise<Directory>} fulfills to the {@link Directory} object
   */
  async create(options: MkdirOptions = { recursive: true }): Promise<Directory> {
    this.debug('create(%o)', options)
    return await this.mkdir(options)
  }

  /**
   * Empty and delete the directory.
   * @param {RmdirOptions} [options] - configuration options
   * @param {boolean} [options.empty=true] - empty directory of any files and sub-directories
   * @param {boolean} [options.recursive=true] - recursively delete sub-directories
   * @param {boolean} [options.force=true] - force deletion of files and sub-directories
   * @return {Promise<Directory>} fulfills to the {@link Directory} object
   */
  async destroy(options: RmdirOptions = { empty: true, recursive: true, force: true }): Promise<Directory> {
    this.debug('destroy(%o)', options)
    return await this.rmdir(options)
  }

  /**
   * Assert that a directory exists and optionally create it
   * @param {CreateOptions} [options] - configuration options
   * @param {boolean} [options.create] - create the directory and any intermediate directories if it doesn't exist - equivalent to adding `mkdir` and `recursive` options or calling {@link create}
   * @param {boolean} [options.mkdir] - create the directory, add the `recursive` option to create intermediate directories - equivalent to calling {@link mkdir}
   * @param {boolean} [options.recursive] - when used with `mkdir`, creates any intermediate directories
   * @return {Promise<Directory>} fulfills to the {@link Directory} object
   */
  async mustExist(options: CreateOptions = {}): Promise<Directory> {
    this.debug('mustExist(%o)', options)
    if (await this.exists()) {
      return this
    }
    if (options.mkdir) {
      return this.mkdir(options)
    }
    if (options.create) {
      return this.create()
    }
    fail('Directory does not exist: ', this.path())
  }
}

/**
 * Function to create a new {@link Directory} object
 * @param {string} path - directory path
 * @param {Object} [options] - configuration options
 * @param {Boolean} [options.codec] - a codec for encoding/decoding files
 * @return {Object} the {@link Directory} object
 */
export const dir = (path: PathSource, options?: PathOptions): Directory => {
  return new Directory(path, options)
}

/**
 * Function to create a new {@link Directory} object for the current working directory
 * @param {Object} [options] - configuration options
 * @param {Boolean} [options.codec] - a codec for encoding/decoding files
 * @return {Object} the {@link Directory} object
 */
export const cwd = (options?: PathOptions): Directory => {
  return dir(process.cwd(), options)
}

/**
 * Function to create a new {@link Directory} object for the directory of a JS source file
 * @param {string} url - module url - from `import.meta.url`
 * @param {Object} [options] - configuration options
 * @param {Boolean} [options.codec] - a codec for encoding/decoding files
 * @return {Object} the {@link Directory} object
 */
export const bin = (url=process.argv[1], options?: PathOptions): Directory => {
  return dir(
    path.dirname(url.replace(/^file:\/\//, '')),
    options
  )
}

export default Directory
