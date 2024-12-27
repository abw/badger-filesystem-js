import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    dts()
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: '@abw/badger-filesystem',
      fileName: 'badger-filesystem',
      formats: [ 'es', 'cjs']
    },
    rollupOptions: {
      external: [
        "node:fs",
        "node:buffer",
        "node:path",
        "node:process",
        "node:fs/promises",
      ],
    }
  },
  test: {
    include: ['test/**/*.[jt]s'],
    exclude: ['test/**/test-files/**', 'test/library/*.[jt]s'],
    reporters: ['html'],
    outputFile: './tmp/test/index.html',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.[tj]s'],
      reportsDirectory: './tmp/coverage'
    },
  },
})
