import path from "path";
import glob from "glob";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const getRollupPluginsConfig = (compilerOptions) => {
  return [
    typescript({
      tsconfigOverride: { compilerOptions }
    }),
    terser({
      ecma: 5,
      module: true,
      toplevel: true,
      compress: { pure_getters: true },
      format: { wrap_func_args: false }
    })
  ];
};

const files = glob
  .sync("./src/*.ts")
  .filter((file) => !file.includes("src/index.ts"));

export default [
  {
    input: "src/index.ts",
    external: (id) => !/^[./]/.test(id),
    output: {
      file: "dist/index.mjs",
      format: "es"
    },
    plugins: getRollupPluginsConfig({ declaration: true })
  },
  {
    input: "src/index.ts",
    external: (id) => !/^[./]/.test(id),
    output: {
      file: "dist/index.js",
      format: "cjs"
    },
    plugins: getRollupPluginsConfig({ declaration: false })
  },
  ...files.map((input) => ({
    input,
    external: (id) => !/^[./]/.test(id),
    output: {
      file: `dist/${path.parse(input).name}.mjs`,
      format: "es"
    },
    plugins: getRollupPluginsConfig({ declaration: false })
  })),
  ...files.map((input) => ({
    input,
    external: (id) => !/^[./]/.test(id),
    output: {
      file: `dist/${path.parse(input).name}.js`,
      format: "cjs"
    },
    plugins: getRollupPluginsConfig({ declaration: false })
  }))
];
