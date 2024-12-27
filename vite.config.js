import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts()
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: '@abw/badger-filesystem',
      fileName: 'badger-filesystem'
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
