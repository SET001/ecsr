/* eslint-disable no-console */
const {
  task, src, dest, lastRun, parallel, series, watch,
} = require('gulp')
const source = require('vinyl-source-stream')
// const sass = require('gulp-sass')
const del = require('del')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')

const tsProject = ts.createProject('tsconfig.json')

const browserify = require('browserify')

// task('styles', () => src('styles/index.sass')
//   .pipe(sass().on('error', sass.logError))
//   .pipe(dest('./public')))


task('compile', () => src('src/**/!(*.spec).{ts,tsx}', { since: lastRun('compile') })
  .pipe(sourcemaps.init())
  .pipe(tsProject())
  .on('error', function onError(error) {
    console.error(error.toString())
    this.emit('end')
  })
  .pipe(sourcemaps.write())
  .pipe(dest('dist')))

task('bundle', () => browserify()
  .add('dist/example/index.js')
  .bundle()
  .pipe(source('index.js'))
  .pipe(dest('./public')))

task('copyAssets', () => src(['assets/**/*.*']).pipe(dest('public')))

task('prepare', () => del(['public/**/*']))

task('watchers', () => {
  // watch('styles/', series('styles'))
  watch('src/**/!(*.spec).{ts,tsx}', series('compile', 'bundle'))
  watch('assets/', series('copyAssets'))
})

task('watch', series(
  'prepare',
  parallel(
    series('compile', 'bundle'),
    // 'styles',
    'copyAssets',
  ),
  'watchers',
))

task('default', series('prepare', parallel(
  'compile',
  // 'styles',
  'copyAssets',
)))
