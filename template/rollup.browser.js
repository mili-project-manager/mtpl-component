import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import autoExternal from 'rollup-plugin-auto-external'

export const plugins = [
  autoExternal(),
  tsPath(),
  json(),
  typescript(),
  resolve(),
  commonjs({
    include: 'node_modules/**',
  }),
]

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.js',
      format: 'umd',
      sourcemap: process.env.NODE_ENV === 'development',
    },
    plugins,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'es/index.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
]
