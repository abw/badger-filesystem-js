/* v8 ignore start */
import { splitList } from '@abw/badger-utils'
import Directory, { dir as fsDir } from '../src/Directory.js'
import { DirPathSource, DirPathState, PathOptions, PathSource } from './types.js'
import File from './File.js'

/**
 * The DirPath class implements a base class for objects that
 * can search one or more directories.
 */
export class DirPath {
  state: DirPathState

  /**
   * Constructor for filesystem paths.
   * @param {String|Array} dir - comma/whitespace delimited string containing directories, or a {@link Directory} object or Array of {@link Directory} objects
   * @param {Object} [options] - file configuration options
   * @param {String} [options.codec] - codec for encoding/decoding file data
   * @param {String} [options.encoding=utf8] - character encoding
   * @return {Object} the {@link DirPath} object
   */
  constructor(dir: DirPathSource, options: PathOptions = { }) {
    const dirs = this.initDirs(dir)
    this.state = {
      dirs,
      options
    }
  }

  /**
   * Internal method to initialise the directories.  If the `dir` argument is a string then it will be split on
   * commas and/or whitespace and converted to an array of {@link Directory} objects.  If the `dir` is a
   * {@link Directory} object then it will be wrapped in an array.  If the `dir` argument is already an array
   * (presumably of {@link Directory} objects) then no further processing is required.
   * @param {String|Array} dir - comma/whitespace delimited string containing directories, or a {@link Directory} object or Array of {@link Directory} objects
   * @return {Array} an array of {@link Directory} objects
   */
  initDirs(dir: DirPathSource) {
    return splitList(dir).map( dir => fsDir(dir) )
  }

  /**
   * Internal method to return an array of the directories in the `dirs` argument passed to the constructor that
   * actually exist in the filesystem.  The checks to determine if the directories exists are only carried
   * out the first time the method is called.  Subsequent calls will return the cached value stored in
   * `this.state.dirsExist`.
   * @return {Array} an array of {@link Directory} objects that exist
   */
  async dirs() {
    return this.state.dirsExist
      || ( this.state.dirsExist = await this.dirsExist() )
  }

  /**
   * Internal method to determine which of the directories in the `dirs` argument passed to the constructor
   * actually exist in the filesystem.
   * @return {Array} an array of {@link Directory} objects that exist
   */
  async dirsExist() {
    const dirs = this.state.dirs
    const exists = await Promise.all(
      dirs.map( d => d.exists() )
    )
    return dirs.filter(
      (_value, index) => exists[index]
    )
  }

  /**
   * Fetch a new {@link File} object for the first existing file in one of the directories.
   * @param {string} path - file path
   * @param {Object} [options] - file configuration options
   * @param {String} [options.codec] - codec for encoding/decoding file data
   * @param {String} [options.encoding=utf8] - character encoding
   * @return {Object} the {@link File} object
   */
  async file(path: PathSource, options: PathOptions = { }): Promise<File|undefined> {
    const dirs = await this.dirs()

    for (const dir of dirs) {
      const file = dir.file(path, { ...this.state.options, ...options })
      if (await file.exists()) {
        return file
      }
    }
    return undefined
  }

  /**
   * Fetch a new {@link Directory} object for the first existing directory in one of the path directories.
   * @param {string} path - directory path
   * @param {Object} [options] - directory configuration options
   * @param {String} [options.codec] - codec for encoding/decoding file data
   * @param {String} [options.encoding=utf8] - character encoding
   * @return {Object} the {@link Directory} object
   */
  async dir(path: PathSource, options: PathOptions = { }): Promise<Directory|undefined> {
    const dirs = await this.dirs()

    for (const dir of dirs) {
      const subdir = dir.dir(path, { ...this.state.options, ...options })
      if (await subdir.exists()) {
        return subdir
      }
    }
    return undefined
  }
}

/**
 * Function to create a new {@link DirPath} object for multiple directories
 * @param {DirPathSource} path - directory paths
 * @param {PathOptions} [options] - configuration options
 * @param {string} [options.codec] - a codec for encoding/decoding files
 * @param {string} [options.encoding=utf8] - character encoding
 * @return {File} the {@link File} object
 */
export const dirPath = (dirs: DirPathSource, options?: PathOptions): DirPath => {
  return new DirPath(dirs, options)
}

export default DirPath
