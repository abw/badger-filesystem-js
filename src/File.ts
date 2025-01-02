import path from 'node:path'
import Path from './Path.js'
import { AUTO } from './Constants.js'
import { codec } from '@abw/badger-codecs'
import Directory, { dir } from './Directory.js'
import { readFile, writeFile, copyFile, rename, rm } from 'node:fs/promises'
import { CreateOptions, DeleteOptions, PathOptions, PathSource, PathType } from './types.js'
import { ObjectEncodingOptions, PathLike } from 'node:fs'

/**
 * The File class implements a wrapper around a filesystem
 * file.
 */
export class File extends Path {
  constructor(path: PathSource, options: PathOptions = {}) {
    super(path, options)
    this.state.type = PathType.file
  }

  /**
   * Returns a new {@link Directory} object for the parent directory of the file
   * @param {PathOptions} [options] - directory configuration options
   * @param {string} [options.codec] - codec for encoding/decoding file data
   * @param {string} [options.encoding=utf8] - character encoding
   * @return {Directory} a {@link Directory} object for the parent
   */
  directory(options?: PathOptions): Directory {
    return dir(path.dirname(this.state.path), options)
  }

  /**
   * An alias for the directory() method for lazy people
   * @param {PathOptions} [options] - directory configuration options
   * @param {string} [options.codec] - codec for encoding/decoding file data
   * @param {string} [options.encoding=utf8] - character encoding
   * @return {Directory} the parent {@link Directory} object
   */
  dir(options?: PathOptions): Directory {
    return this.directory(options)
  }

  /**
   * Reads the file content.  If a `codec` has been specified then the content is decoded.
   * @param {PathOptions} [options] - file configuration options
   * @param {string} [options.codec] - codec for encoding/decoding file data
   * @param {string} [options.encoding=utf8] - character encoding
   * @return {Promise<string|unknown>} fulfills with the file content
   * @example
   * file('myfile.txt').read().then( text => console.log(text) );
   * @example
   * file('myfile.json', { codec: 'json' }).read().( data => console.log(data) );
   * @example
   * file('myfile.json').read({ codec: 'json' }).then( data => console.log(data) );
   */
  async read(options?: PathOptions): Promise<string|unknown> {
    const { encoding, codec } = this.options(options)
    const text = await readFile(
      this.state.path as PathLike,
      { encoding } as ObjectEncodingOptions
    )
    return codec
      ? this.getCodec(codec).decode(text as string)
      : text
  }

  /**
   * Writes the file content.  If a `codec` has been specified then the content will be encoded.
   * @param {string|object} data - string or data to write
   * @param {PathOptions} [options] - file configuration options
   * @param {string} [options.codec] - codec for encoding/decoding file data
   * @param {string} [options.encoding=utf8] - character encoding
   * @return {Promise<File>} fulfills with the File object
   * @example
   * file('myfile.txt').write('Hello World');
   * @example
   * file('myfile.json', { codec: 'json' }).write({ message: 'Hello World' });
   * @example
   * file('myfile.json').write({ message: 'Hello World' }, { codec: 'json' });
   */
  async write(data: unknown, options?: PathOptions): Promise<File> {
    const { encoding, codec } = this.options(options)
    const text = codec
      ? this.getCodec(codec).encode(data)
      : data as string
    await writeFile(
      this.state.path, text,
      { encoding } as ObjectEncodingOptions
    )
    return this
  }

  /**
   * Delete the file content.
   * @param {DeleteOptions} [options] - delete configuration options
   * @param {boolean} [options.force=false] - when true, exceptions will be ignored if path does not exist
   * @return {Promise<File>} fulfills with the file object
   */
  async delete(options?: DeleteOptions): Promise<File> {
    await rm(this.state.path, options)
    return this
  }

  /**
   * Copy the file to a new destination.
   * @param {PathSource} destination - destination file path
   * @param {CreateOptions} [options] - directory configuration options
   * @param {boolean} [options.create=false] - create the directory and any intermediate directories if it doesn't exist - equivalent to adding `mkdir` and `recursive` options
   * @param {boolean} [options.mkdir=false] - create the directory, add the `recursive` option to create intermediate directories
   * @param {boolean} [options.recursive=false] - when used with `mkdir`, creates any intermediate directories
   * @return {Promise<File>} fulfills with the destination file object
   */
  async copyTo(destination: PathSource, options?: CreateOptions): Promise<File> {
    const destFile = this.dir().file(destination)
    const destDir  = destFile.dir()
    await destDir.mustExist(options)
    await copyFile(this.path(), destFile.path())
    return destFile
  }

  /**
   * Copy the file from a source file.
   * @param {PathSource} source - source file path
   * @param {CreateOptions} [options] - directory configuration options
   * @param {boolean} [options.create=false] - create the directory and any intermediate directories if it doesn't exist - equivalent to adding `mkdir` and `recursive` options
   * @param {boolean} [options.mkdir=false] - create the directory, add the `recursive` option to create intermediate directories
   * @param {boolean} [options.recursive=false] - when used with `mkdir`, creates any intermediate directories
   * @return {Promise<File>} fulfills with the file object
   */
  async copyFrom(source: PathSource, options?: CreateOptions): Promise<File> {
    const srcFile = this.dir().file(source)
    const destDir = this.dir()
    await destDir.mustExist(options)
    await copyFile(srcFile.path(), this.path())
    return this
  }

  /**
   * Move the file to a new location.
   * @param {PathSource} destination - new file path
   * @param {CreateOptions} [options] - directory configuration options
   * @param {boolean} [options.create=false] - create the directory and any intermediate directories if it doesn't exist - equivalent to adding `mkdir` and `recursive` options
   * @param {boolean} [options.mkdir=false] - create the directory, add the `recursive` option to create intermediate directories
   * @param {boolean} [options.recursive=false] - when used with `mkdir`, creates any intermediate directories
   * @return {Promise<File>} fulfills with the file object
   */
  async moveTo(destination: PathSource, options?: CreateOptions): Promise<File> {
    const destFile = this.dir().file(destination)
    const destDir = destFile.dir()
    await destDir.mustExist(options)
    await rename(this.path(), destFile.path())
    return this
  }

  /**
   * Copy the file from a source file.
   * @param {PathSource} source - source file path
   * @param {CreateOptions} [options] - directory configuration options
   * @param {boolean} [options.create=false] - create the directory and any intermediate directories if it doesn't exist - equivalent to adding `mkdir` and `recursive` options
   * @param {boolean} [options.mkdir=false] - create the directory, add the `recursive` option to create intermediate directories
   * @param {boolean} [options.recursive=false] - when used with `mkdir`, creates any intermediate directories
   * @return {Promise<File>} fulfills with the file object
   */
  async moveFrom(source: PathSource, options: CreateOptions): Promise<File> {
    const srcFile = this.dir().file(source)
    const destDir = this.dir()
    await destDir.mustExist(options)
    await rename(srcFile.path(), this.path())
    return this
  }

  getCodec(type: string) {
    if (type === AUTO) {
      type = this.ext().replace('.', '')
    }
    return codec(type)
  }
}

/**
 * Function to create a new {@link File} object for a file
 * @param {PathSource} path - file path
 * @param {PathOptions} [options] - configuration options
 * @param {string} [options.codec] - a codec for encoding/decoding files
 * @param {string} [options.encoding=utf8] - character encoding
 * @return {File} the {@link File} object
 */
export const file = (path: PathSource, options?: PathOptions): File => {
  return new File(path, options)
}

export default File
