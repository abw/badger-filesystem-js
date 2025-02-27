import Path from './Path'
import path from 'node:path'
import { Stats } from 'node:fs'
import { DIRECTORY, FILE, PATH } from './Constants'
import Directory from './Directory'

export type PathSource = string | Path

export const enum PathType {
  path = PATH,
  file = FILE,
  directory = DIRECTORY
}

export type PathState = {
  path: string,
  options: PathOptions,
  type: PathType,
  parse?: path.ParsedPath,
  stats?: Stats
}

export type PathOptions = {
  encoding?: string,
  codec?: string,
  debug?: boolean
}

export type DeleteOptions = {
  force?: boolean
}

export type MkdirOptions = {
  recursive?: boolean,
}

export type EmptyOptions = {
  force?: boolean,
  recursive?: boolean,
}

export type RmdirOptions = {
  empty?: boolean,
  force?: boolean,
  recursive?: boolean,
}

export type CreateOptions = {
  create?: boolean,
  mkdir?: boolean,
  recursive?: boolean,
}

export type DirPathState = {
  dirs: Directory[],
  dirsExist?: Directory[],
  options?: PathOptions
}
export type DirPathSource = string | PathSource[]

export type Logger = (...args: unknown[]) => void