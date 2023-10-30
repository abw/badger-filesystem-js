import path from 'node:path'
import Path from './Path.js'
import { dir } from './Directory.js'
import { codec } from '@abw/badger-codecs'
import { readFile, writeFile, copyFile, rename, rm } from 'node:fs/promises'
import { AUTO, FILE } from './Constants.js'

/**
 * The File class implements a wrapper around a filesystem
 * file.
 */
export class File extends Path {
  constructor(path, options={}) {
    super(path, options);
    this.state.type = FILE;
  }

  /**
   * Returns a new {@link Directory} object for the parent directory of the file
   * @param {Object} [options] - directory configuration options
   * @param {String} [options.codec] - codec for encoding/decoding file data
   * @param {String} [options.encoding=utf8] - character encoding
   * @return {Object} a {@link Directory} object for the parent
   */
  directory(options) {
    return dir(path.dirname(this.state.path), options);
  }

  /**
   * An alias for the {@link directory} method for lazy people
   * @return {Object} the parent {@link Directory} object
   */
  dir(...args) {
    return this.directory(...args);
  }

  /**
   * Reads the file content.  If a `codec` has been specified then the content is decoded.
   * @param {Object} [options] - directory configuration options
   * @param {String} [options.codec] - codec for encoding/decoding file data
   * @param {String} [options.encoding=utf8] - character encoding
   * @return {Promise} fulfills with the file content
   * @example
   * file('myfile.txt').read().then( text => console.log(text) );
   * @example
   * file('myfile.json', { codec: 'json' }).read().( data => console.log(data) );
   * @example
   * file('myfile.json').read({ codec: 'json' }).then( data => console.log(data) );
   */
  async read(options) {
    const opts = this.options(options);
    const text = await readFile(this.state.path, opts);
    return opts.codec
      ? this.getCodec(opts.codec).decode(text)
      : text;
  }

  /**
   * Writes the file content.  If a `codec` has been specified then the content will be encoded.
   * @param {String|Object} data - directory configuration options
   * @param {Object} [options] - directory configuration options
   * @param {String} [options.codec] - codec for encoding/decoding file data
   * @param {String} [options.encoding=utf8] - character encoding
   * @return {Promise} fulfills with the file object
   * @example
   * file('myfile.txt').write('Hello World');
   * @example
   * file('myfile.json', { codec: 'json' }).write({ message: 'Hello World' });
   * @example
   * file('myfile.json').write({ message: 'Hello World' }, { codec: 'json' });
   */
  async write(data, options) {
    const opts = this.options(options);
    const text = opts.codec
      ? this.getCodec(opts.codec).encode(data)
      : data;
    await writeFile(this.state.path, text, opts);
    return this;
  }

  /**
   * Delete the file content.
   * @param {Object} [options] - directory configuration options
   * @param {Boolean} [options.force=false] - when true, exceptions will be ignored if path does not exist
   * @return {Promise} fulfills with the file object
   */
  async delete(options) {
    await rm(this.state.path, options);
    return this;
  }

  /**
   * Copy the file to a new destination.
   * @param {string} destination - destination file path
   * @param {Object} [options] - directory configuration options
   * @param {Boolean} [options.create=false] - create the directory and any intermediate directories if it doesn't exist - equivalent to adding `mkdir` and `recursive` options
   * @param {Boolean} [options.mkdir=false] - create the directory, add the `recursive` option to create intermediate directories
   * @param {Boolean} [options.recursive=false] - when used with `mkdir`, creates any intermediate directories
   * @return {Promise} fulfills with the destination file object
   */
  async copyTo(destination, options) {
    const destFile = this.dir().file(destination)
    const destDir  = destFile.dir()
    await destDir.mustExist(options)
    await copyFile(this.path(), destFile.path())
    return destFile;
  }

  /**
   * Copy the file from a source file.
   * @param {string} source - source file path
   * @param {Object} [options] - directory configuration options
   * @param {Boolean} [options.create=false] - create the directory and any intermediate directories if it doesn't exist - equivalent to adding `mkdir` and `recursive` options
   * @param {Boolean} [options.mkdir=false] - create the directory, add the `recursive` option to create intermediate directories
   * @param {Boolean} [options.recursive=false] - when used with `mkdir`, creates any intermediate directories
   * @return {Promise} fulfills with the file object
   */
  async copyFrom(source, options) {
    const srcFile = this.dir().file(source)
    const destDir = this.dir()
    await destDir.mustExist(options)
    await copyFile(srcFile.path(), this.path())
    return this;
  }

  /**
   * Move the file to a new location.
   * @param {string} destination - new file path
   * @param {Object} [options] - directory configuration options
   * @param {Boolean} [options.create=false] - create the directory and any intermediate directories if it doesn't exist - equivalent to adding `mkdir` and `recursive` options
   * @param {Boolean} [options.mkdir=false] - create the directory, add the `recursive` option to create intermediate directories
   * @param {Boolean} [options.recursive=false] - when used with `mkdir`, creates any intermediate directories
   * @return {Promise} fulfills with the file object
   */
  async moveTo(destination, options) {
    const destFile = this.dir().file(destination)
    const destDir = destFile.dir()
    await destDir.mustExist(options)
    await rename(this.path(), destFile.path())
    return this;
  }

  /**
   * Copy the file from a source file.
   * @param {string} source - source file path
   * @param {Object} [options] - directory configuration options
   * @param {Boolean} [options.create=false] - create the directory and any intermediate directories if it doesn't exist - equivalent to adding `mkdir` and `recursive` options
   * @param {Boolean} [options.mkdir=false] - create the directory, add the `recursive` option to create intermediate directories
   * @param {Boolean} [options.recursive=false] - when used with `mkdir`, creates any intermediate directories
   * @return {Promise} fulfills with the file object
   */
  async moveFrom(source, options) {
    const srcFile = this.dir().file(source)
    const destDir = this.dir()
    await destDir.mustExist(options)
    await rename(srcFile.path(), this.path())
    return this;
  }


  getCodec(type) {
    if (type === AUTO) {
      type = this.ext().replace('.', '');
    }
    return codec(type)
  }
}

/**
 * Function to create a new {@link File} object for a file
 * @param {String} path - file path
 * @param {Object} [options] - configuration options
 * @param {Boolean} [options.codec] - a codec for encoding/decoding files
 * @param {String} [options.encoding=utf8] - character encoding
 * @return {Object} the {@link File} object
 */
export const file = (path, options) => {
  return new File(path, options);
}

export default File
