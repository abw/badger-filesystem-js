import path from 'node:path';
import { stat } from 'node:fs/promises'
import { rethrow, doNothing } from '@abw/badger-utils';
import { PATH } from './Constants.js';

/**
 * Default configuration options.
 */
const defaults = {
  encoding: 'utf8'
}

/**
 * The Path class implements a base class for the {@link File} and {@link Directory}
 * classes.  It implements the common functionality for representing a filesystem path.
 */
export class Path {
  /**
   * Constructor for filesystem paths.
   * @param {string} path - file path
   * @param {Object} [options] - configuration options
   * @param {String} [options.encoding=utf8] - file encoding
   * @param {String} [options.codec] - codec for encoding/decoding file data
   * @return {Object} the {@link Path} object
   */
  constructor(path, options={}) {
    // allow path/file/directory to be constructed from an existing object
    if (path instanceof Path) {
      path = path.path();
    }
    this.state = { path, options: { ...defaults, ...options } };
    this.state.type = PATH;
    this.debug = options.debug
      ? console.log.bind(console)
      : doNothing
  }

  /**
   * Accessor method to return the filesystem path.
   * @return {String} the filesystem path
   */
  path(...args) {
    return args.length
      ? this.relativePath(...args)
      : this.state.path;
  }

  /**
   * Accessor method to return the path type: `path`, `file` or `directory`.
   * @return {String} the path type
   */
  type() {
    return this.state.type;
  }

  /**
   * Parse the full path.  Data is cached until {@link uparse()} is called.
   * @external {path.parse(path)} https://nodejs.org/api/path.html#pathparsepath
   * @return {Object} the parsed path data
   */
  parse() {
    return this.state.parse ||= path.parse(this.state.path);
  }
  /**
   * Method to clear internal cache of parsed path data.
   */
  unparse() {
    delete this.state.parse;
  }
  /**
   * Returns the name of the directory - `dir` returned by {@link parse()}.
   */
  dirname() {
    return this.parse().dir;
  }
  /**
   * Returns the complete file name for the path - `base` returned by {@link parse()}.
   * @return {String} the complete file name.
   */
  base() {
    return this.parse().base;
  }
  /**
   * Returns the file name for the path without extension - `name` returned by {@link parse()}.
   * @return {String} the file name without extension.
   */
  name() {
    return this.parse().name;
  }
  /**
   * Returns the file name extension - `ext` returned by {@link parse()}.
   * @return {String} the file name extension.
   */
  ext() {
    return this.parse().ext;
  }

  /**
   * Create a path relative to the current path.
   * @param {String[]} parts - part(s) of the filesystem path
   * @return {String} the new path
   * @example
   * const p = new Path('/path/to/here')
   * const q = p.relativePath('there')          // -> /path/to/here/there
   * const r = p.relativePath('and', 'there')   // -> /path/to/here/and/there
   */
  relativePath(...parts) {
    if (parts.length === 1 && parts[0] instanceof Path) {
      return parts[0].path();
    }
    if (path.isAbsolute(parts[0])) {
      return path.join(...parts);
    }
    return path.join(this.state.path, ...parts);
  }

  /**
   * Internal method to merge any options with the pre-defined options passed to the
   * constructor.  Options passed as arguments will take precedence.
   * @param {Object} options - new options
   * @return {Object} the merged options
   * @example
   * const p = new Path('/path/to/here', { option1: 'hello' })
   * const q = p.options({ option2: 'world' })  // -> { option1: 'hello', options2: 'world' }
   */
  options(options={}) {
    return { ...this.state.options, ...options };
  }

  /**
   * Method to assert that the path exists.
   * @return {Promise} fulfills with `true` if the path exists or rejects if the path doesn't
   * @example
   * const p = new Path('/path/to/here')
   * p.exists()
   *   .then( console.log('path exists') )
   *   .catch( console.log('path does not exist') )
   */
  async exists() {
    try {
      this.unstat();
      await this.stat();
      return true;
    }
    catch (error) {
      return error.code === 'ENOENT'
        ? false
        : rethrow(error);
    }
  }

  /**
   * Method to fetch stats for the path.  Uses the `stat` function from `node:fs/promises`.
   * Stats are cached internally (subject to change)
   * @return {Promise} fulfills with path stats returned from the `stat` function
   * @example
   * const p = new Path('/path/to/here')
   * p.stat()
   *   .then( stats => console.log('path stats:', stats) )
   *   .catch( console.log('path does not exist') )
   */
  async stat() {
    const stats = this.state.stats ||= await stat(this.state.path);
    return stats;
  }

  /**
   * Method to clear internal cache of path stats (subject to change)
   */
  unstat() {
    this.state.stats = undefined;
    return this;
  }

  /**
   * Returns a boolean flag to indicate if the item is a file.
   */
  async isFile() {
    const stats = await this.stat();
    return stats.isFile();
  }

  /**
   * Returns a boolean flag to indicate if the item is a directory.
   */
  async isDirectory() {
    const stats = await this.stat();
    return stats.isDirectory();
  }

  /**
   * Returns the file mode.
   */
  async mode() {
    const stats = await this.stat();
    return stats.mode;
  }

  /**
   * Returns the size of the file in bytes.
   */
  async size() {
    const stats = await this.stat();
    return stats.size;
  }

  /**
   * Returns a date for when the file was last accessed.
   */
  async accessed() {
    const stats = await this.stat();
    return stats.atime;
  }

  /**
   * Returns a date for when the file content was last modified.
   */
  async modified() {
    const stats = await this.stat();
    return stats.mtime;
  }

  /**
   * Returns a date for when the file status was last changed.
   */
  async changed() {
    const stats = await this.stat();
    return stats.ctime;
  }

  /**
   * Returns a date for when the file was created.
   */
  async created() {
    const stats = await this.stat();
    return stats.birthtime;
  }

  /**
   * Stringification method.
   */
  toString() {
    return this.path();
  }
}

export default Path
