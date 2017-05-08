'use strict';

const gulp = require('gulp');
const jeet = require('jeet');
const rupture = require('rupture');
const browserSync = require('browser-sync');
const pl = require('gulp-load-plugins')();
const childProcess = require('child_process');
const env = require('minimist')(process.argv.slice(2));

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> jekyll build',
};

function jumpError(error) {
  console.log(error.toString());
  this.emit('end');
}

/* =============================================================
 Browser Sync
 */
gulp.task('browser-sync', ['jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: ['_site', './'],
    },
    notify: false,
  });
});

/* =============================================================
 Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
  browserSync.reload();
});

/* =============================================================
 Style
 */
gulp.task('stylus', () => {
  return gulp.src('./assets/_styl/main.styl')
             .on('error', jumpError)
             .pipe(pl.sourcemaps.init())
             .pipe(pl.stylus({
               compress: true,
               use: [jeet(), rupture()],
             }))
             .on('error', jumpError)
             .pipe(pl.autoprefixer('last 2 versions'))
             .pipe(pl.sourcemaps.write('.'))
             .on('error', jumpError)
             .pipe(gulp.dest('_site/assets/css/'))
             .pipe(browserSync.reload({
               stream: true,
             }))
             .pipe(gulp.dest('./assets/css/'));
});

/* =============================================================
 Javascript
 */
gulp.task('js', () => {
  return gulp.src(env.prod ? ['assets/js/*.js', '!assets/js/main.js'] : ['!assets/js/analytics.js', 'assets/js/*.js', '!assets/js/analytics.js', '!assets/js/main.js'])
             .on('error', jumpError)
             .pipe(pl.sourcemaps.init())
             .pipe(pl.concat('main.js'))
             .pipe(pl.uglify())
             .pipe(pl.sourcemaps.write('.'))
             .pipe(gulp.dest('assets/js/'));
});

/* =============================================================
 Watcher
 */
gulp.task('watch', () => {
  gulp.watch('assets/_styl/**/*.styl', ['stylus', 'jekyll-rebuild']);
  gulp.watch(['assets/js/**/*.js', '!assets/js/main.js'], ['js', 'jekyll-rebuild']);
  gulp.watch([
    '**/*.md',
    '**/*.markdown',
    '_posts/**/*.*',
    '**/*.html',
    'index.html',
    '_includes/*.html',
    '_layouts/*.html',
    '!_site/**/*.html',
  ], ['jekyll-rebuild']);
});

/* =============================================================
 Build the Jekyll Site
 */
gulp.task('jekyll-build', ['js'], (done) => {
  browserSync.notify(messages.jekyllBuild);
  return childProcess.spawn('jekyll', ['build', '--drafts'], {
    stdio: 'inherit',
  }).on('close', done);
});

gulp.task('default', ['stylus', 'js', 'browser-sync', 'watch', 'jekyll-build']);
gulp.task('production', ['stylus', 'js', 'jekyll-build']);
