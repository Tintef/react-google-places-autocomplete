import path from 'path';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import bundleSize from "rollup-plugin-bundle-size";
import { terser } from "rollup-plugin-terser";
import autoExternal from 'rollup-plugin-auto-external';
import { visualizer } from "rollup-plugin-visualizer";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    autoExternal({
      builtins: false,
      dependencies: true,
      packagePath: path.resolve('./package.json'),
      peerDependencies: false,
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      clean: true,
      abortOnError: true,
    }),
    terser({}),
    bundleSize(),
    visualizer(),
  ],
};

// Before externals
// Created bundle index.es.js: 140.41 kB → 44.99 kB (gzip)
// Created bundle index.js: 141.26 kB → 45.11 kB (gzip)
//
// After externals
// Created bundle index.js: 136.59 kB → 43.54 kB (gzip)
// Created bundle index.es.js: 135.84 kB → 43.44 kB (gzip)
//
// After externals with some config
// Created bundle index.js: 136.59 kB → 43.54 kB (gzip)
// Created bundle index.es.js: 135.84 kB → 43.44 kB (gzip)
