const path = require('path');

const { dest, series, src, task, watch } = require('gulp');
const webpack = require('webpack-stream');

const mode = process.env.NODE_ENV || 'development';

const JS_OUTPUT_DIR = 'build';
const JS_OUTPUT_FILE = 'index.js';

// >>> TS to JS
task('ts', async () =>
  src(path.resolve(__dirname, 'src', 'index.ts'))
    .pipe(
      webpack({
        devtool: 'source-map',
        output: {
          filename: JS_OUTPUT_FILE
        },
        mode,
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: {
                loader: 'ts-loader'
              }
            }
          ]
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js']
        }
      }).on('error', err => console.log('WEBPACK ERROR:', err))
    )
    .pipe(dest(path.resolve(__dirname, JS_OUTPUT_DIR)))
);
// Watch TS
task('ts:w', () => {
  watch(path.resolve(__dirname, 'src'), series('ts'));
});
