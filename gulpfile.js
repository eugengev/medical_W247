var gulp = require ('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    beml  = require('gulp-beml'),
    pngquant = require('imagemin-pngquant'),
    replace = require('gulp-replace');

gulp.task('default',['concat','sass','scss','fileinclude','connect','imagemin','watch']);

gulp.task('make-sprite',['sprite','replace']);

gulp.task('replace', ['sprite'] ,function(){
  gulp.src(['dev/scss/temp/sprite.sass'])
    .pipe(replace('url(#{$sprite-image})', 'url(../images/#{$sprite-image})'))
    .pipe(gulp.dest('dev/scss/abstracts'));
    setTimeout(function(){
        return gulp.src('dev/scss/temp', {
        read: false
    })
    .pipe(clean());
    },1000)
});

gulp.task('scss', function () {
  gulp.src('./dev/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
        // errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass', function () {
  gulp.src('./dev/scss/style.sass')
    .pipe(sourcemaps.init())
    .pipe(plumber({
        // errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      outputStyle: 'compact'
    }))
    .pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('connect',function(){
  connect.server({
    port: 1337,
    livereload: true
  });
});

//Optimize Images
gulp.task('imagemin', () => {
  return gulp.src('dev/images/**/*')
      .pipe(newer('images/'))
      .pipe(imagemin({
        svgoPlugins: [{removeViewBox: false}, {removeUselessStrokeAndFill:false}],
        progressive: true,
        interlaced: true,
        use: [pngquant()]
      }))
      .pipe(gulp.dest('images/'));
});

//Sprite Generator

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.sass',
    algorithm: 'binary-tree',
  }));
  spriteData.img.pipe(gulp.dest('images/'));
  spriteData.css.pipe(gulp.dest('dev/scss/temp/'));
});

gulp.task('fileinclude', function() {
  gulp.src(['./dev/templates/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(beml({
      elemPrefix: '__',
      modPrefix: '_',
      modDlmtr: '_'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('html', function () {
    gulp.src('*.html')
    .pipe(connect.reload());
});
gulp.task('css', function () {
    gulp.src('css/*.css')
    .pipe(connect.reload());
});

gulp.task('concat', function() {
  return gulp.src(['./dev/js/jquery-1.11.1.min.js','./dev/js/lib/*.js'])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('watch',function(){
  gulp.watch('dev/images/**/*', ['imagemin']);
  gulp.watch('dev/scss/*.scss',['sass']);
  gulp.watch('dev/scss/*.sass',['sass']);
  gulp.watch('dev/scss/pages/*.sass',['sass']);
  gulp.watch('dev/scss/layout/*.sass',['sass']);
  gulp.watch('dev/scss/abstracts/*.scss',['sass']);
  gulp.watch('dev/scss/abstracts/*.sass',['sass']);
  gulp.watch('dev/scss/base/*.scss',['sass']);
  gulp.watch('dev/scss/base/*.sass',['sass']);
  gulp.watch('dev/chunks/*.html',['fileinclude']);
  gulp.watch('dev/templates/*.html',['fileinclude']);
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['css/*.css'], ['css']);
});
