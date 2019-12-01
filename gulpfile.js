var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  pugInheritance = require('gulp-pug-inheritance'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  pug = require('gulp-pug'),
  sourcemaps = require('gulp-sourcemaps'),
  gcmq = require('gulp-group-css-media-queries'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cached = require('gulp-cached'),
  changed = require('gulp-changed'),
  filter = require('gulp-filter'),
  plumber = require('gulp-plumber');

gulp.task('sass', function(){
  return gulp.src(['dev/sass/*.*'])
    .pipe(sourcemaps.init())
    // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    // .pipe(gcmq())
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function(){
  return gulp.src('dev/pug/*.pug')
    // .pipe(pugInheritance({basedir: '/dev/'}))
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dev/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug-pages', function() {
  return gulp.src([
    // '!dev/pug/partials/*.pug',
    'dev/pug/**/*.pug'
  ])
    .pipe(plumber())
    .pipe(changed('./', {
      extension: '.html'
    }))
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
      }))
    .pipe(pug({
      locals: {},
      pretty: true
    }))
    .pipe(gulp.dest('dev/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src('dev/js/**/*')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dev/jsdist'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'dev'
    },
    notify: false,
    open: false,
    ghostMode: false,
  });
});


gulp.task('watch', function (){
  global.watch = true;
  gulp.watch('dev/sass/**/*.*', gulp.parallel('sass'));
  gulp.watch('dev/pug/**/*.pug', gulp.parallel('pug-pages'));
  gulp.watch('dev/js/**/*.js', gulp.parallel('js'));
});


gulp.task('default', gulp.parallel('watch', 'sass', 'pug-pages', 'js', 'browser-sync'));
