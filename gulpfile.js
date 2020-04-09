const gulp = require('gulp')
const { sync } = require('del')
const $ = require('gulp-load-plugins')()
const include = require('gulp-file-include')
const browserSync = require('browser-sync').create()

const { routes, tasks } = require('./config')

const dev = $.environments.development
const prod = $.environments.production

const errorMessage = (err) => console.log(err.message)

gulp.task('views', (done) => {
  gulp
    .src(`${routes.src.views}/*.html`)
    .pipe($.plumber({ errorHandler: errorMessage }))
    .pipe(
      include({
        prefix: '@',
        basepath: routes.src.views
      })
    )
    .pipe(
      $.htmlBeautify({
        indent_with_tabs: true,
        indent_size: 2
      })
    )
    .pipe(gulp.dest(routes.dist.views))
    .pipe(browserSync.reload({ stream: true }))

  done()
})

gulp.task('styles', (done) => {
  gulp
    .src(`${routes.src.styles}/app.+(sass|scss)`)
    .pipe($.plumber({ errorHandler: errorMessage }))
    .pipe(dev($.sourcemaps.init()))
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe(prod($.cssnano()))
    .pipe(dev($.sourcemaps.write('.')))
    .pipe(gulp.dest(routes.dist.styles))
    .pipe(browserSync.stream())

  done()
})

gulp.task('scripts', (done) => {
  gulp
    .src(`${routes.src.scripts}/**/*.js`)
    .pipe($.plumber({ errorHandler: errorMessage }))
    .pipe(dev($.sourcemaps.init()))
    // .pipe($.uglify())
    // .pipe($.concat('app.js'))
    .pipe(dev($.sourcemaps.write('.')))
    .pipe(gulp.dest(routes.dist.scripts))
    .pipe(browserSync.reload({ stream: true }))

  done()
})

gulp.task('images', (done) => {
  gulp
    .src(`${routes.src.img}/**/*.*`)
    .pipe($.plumber({ errorHandler: errorMessage }))
    .pipe(
      $.imagemin([
        $.imagemin.gifsicle({ interlaced: true }),
        $.imagemin.optipng({ optimizationLevel: 5 }),
        $.imagemin.svgo({
          plugins: [{ removeViewBox: true }]
        })
      ])
    )
    .pipe(gulp.dest(routes.dist.img))
    .pipe(browserSync.reload({ stream: true }))

  done()
})

gulp.task('server', (done) => {
  browserSync.init({
    notify: false,
    open: false,
    port: 4000,
    ui: false,
    server: {
      baseDir: routes.dist
    }
  })

  done()
})

gulp.task('clean', (done) => {
  sync(routes.dist.views)
  done()
})

gulp.task('watch', () => {
  gulp.watch(`${routes.watch.views}`, gulp.series('views'))
  gulp.watch(`${routes.watch.styles}`, gulp.series('styles'))
  gulp.watch(`${routes.watch.scripts}`, gulp.series('scripts'))
  gulp.watch(`${routes.watch.images}`, gulp.series('images'))
})

exports.dev = gulp.series('clean', tasks.dev)
exports.build = gulp.series('clean', tasks.build)
