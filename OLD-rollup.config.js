import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };

// Silence circular dependency warnings
const ignoreWarnings = {
  'Circular dependency: src/File.js -> src/Directory.js -> src/File.js': true,
  'Circular dependency: src/Directory.js -> src/File.js -> src/Directory.js': true,
};

const onwarn = (warning, warn) => {
  if (
    warning.code === 'CIRCULAR_DEPENDENCY'
    && ignoreWarnings[warning.message]
  ) {
    return
  }
  warn(warning);
}

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        plugins: [terser()]
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        exports: 'named',
        plugins: [terser()]
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs()
    ],
    external: [
      "@abw/badger-codecs",
      "@abw/badger-utils",
      "node:fs",
      "node:path",
      "node:process",
      "node:fs/promises",
    ],
    onwarn,
  }
];

