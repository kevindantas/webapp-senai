var gulp      = require('gulp');
var gutil     = require('gulp-util');
var concat    = require('gulp-concat');
var sass      = require('gulp-sass');
var rename    = require('gulp-rename');

var paths = {
  sass: ['./app/scss/**/*.scss'],
  js: ['./app/js/components/*.js', './app/js/*.js'],
  files: ['./app/index.html', './app/**/*.html', './app/apresentacao1Dia.pdf', './app/apresentacao2Dia.pdf'],
  images: ['./app/images/**/**']
};

gulp.task('default', ['sass', 'js', 'watch', 'copyFiles', 'copyImages']);


/**
 * Convert scss to CSS
 */
gulp.task('sass', done => {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./build/css/'))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./build/css/'))
    .on('end', done);
});


/**
 * Generate the .js files used by the application
 */
gulp.task('js', done => {
  gulp.src(paths.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/js/'))
    .on('end', done);
});



/**
 * Copy the HTML files
 */
gulp.task('copyFiles', done => {
  gulp.src(paths.files)
    .pipe(gulp.dest('./build/'))
    .on('end', done);
});


/**
 * Copy the HTML files
 */
gulp.task('copyImages', done => {
  gulp.src(paths.images)
    .pipe(gulp.dest('./build/images'));
});



/**
 * Watch for file changes
 */
gulp.task('watch', _ =>  {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.files, ['copyFiles']);
});




gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', done => {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});