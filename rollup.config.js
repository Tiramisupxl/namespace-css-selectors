import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

export default {
  entry: './index.js',
  dest: 'dist/namespace-css-selectors.js',
  format: 'es',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'stage-3'],
      plugins: [
        'transform-export-extensions',
      ]
    }),
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'namespaceCssSelectors',
      sourceMap: true,
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true,
    },
  ],
};