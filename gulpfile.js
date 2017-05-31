var gulp = require('gulp');
var path = require('path');
var merge = require('event-stream').merge;
var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
plugins.bower = require('main-bower-files');

var ROOT_DIR = './';
var BOWER_DIR = './bower_components/';
var DIST_DIR = './dist/';
var MEDIA_DIR= './media/';
var SCRIPTS_DIR = './scripts/';
var IMAGES_DIR = './images/';

var src = {
    styles: [
        ROOT_DIR + 'styles/app/**/*.css'
    ],
    scripts: [
        ROOT_DIR + 'scripts/app/**/*.js'
    ],
    templates: [
        ROOT_DIR + 'scripts/app/**/*.html'
    ],
    stylesjobs: [
        ROOT_DIR + 'styles/jobBoards/**/*.css'
    ],
    scriptsjobs: [
        ROOT_DIR + 'scripts/jobBoards/**/*.js'
    ],
    templatesjobs: [
        ROOT_DIR + 'scripts/jobBoards/**/*.html'
    ],
    stylesgeneral: [
        ROOT_DIR + 'styles/general/**/*.css'
    ],
    json: [
        ROOT_DIR + 'json/*.json'
    ],
    assets: [
        ROOT_DIR + 'assets/**/*'
    ],
    unlisted: [
        BOWER_DIR + 'kurento-utils/js/kurento-utils.js'
    ]
};

var dest = {
    img: DIST_DIR + 'img/',
    js: DIST_DIR + 'scripts/',
    css: DIST_DIR + 'styles/',
    fonts: DIST_DIR + 'fonts/',
    vfonts: DIST_DIR + 'styles/fonts/',
    json: DIST_DIR + 'json/',
    assets: DIST_DIR + 'assets/',
    audio: MEDIA_DIR + 'audio/',
    video: DIST_DIR+'video/'
};

var config = {
    bootstrapDir: './bower_components/bootstrap/dist/css',
};

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('scripts-vendor', function () {
    var jsFilter = plugins.filter('**/*.js');
    var unlisted = gulp.src(src.unlisted)
        .pipe(plugins.print(function(filepath) {
            return "script: " + filepath;
        }));
    var listed = gulp.src(plugins.bower(), { base: BOWER_DIR })
        .pipe(jsFilter)
        .pipe(plugins.print(function(filepath) {
            return "script: " + filepath;
        }));

    return merge(listed, unlisted)
        .pipe(plugins.order([
            'bower_components/jquery/**/*.js',
            'bower_components/angular/**/*.js',
            'bower_components/**/*.js'
         ], { base: ROOT_DIR }))
        .pipe(plugins.concat('vendor.js'))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.if(args.production, plugins.uglify({mangle: true})))
        .pipe(gulp.dest(dest.js))
});

gulp.task('scripts', function () {
    var jsFilter = plugins.filter('**/*.js');
    return gulp.src(src.scripts)
        .pipe(jsFilter)
        .pipe(plugins.if(!args.production, plugins.sourcemaps.init()))
        .pipe(plugins.ngAnnotate({
            add: true
        }))
        .on('error', swallowError)
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.if(args.production, plugins.uglify({mangle: true})))
        .pipe(plugins.if(!args.production, plugins.sourcemaps.write()))
        .pipe(gulp.dest(dest.js));
});

gulp.task('scripts-jobs', function () {
    var jsFilter = plugins.filter('**/*.js');
    return gulp.src(src.scriptsjobs)
        .pipe(jsFilter)
        .pipe(plugins.if(!args.production, plugins.sourcemaps.init()))
        .pipe(plugins.ngAnnotate({
            add: true
        }))
        .on('error', swallowError)
        .pipe(plugins.concat('scripts_jobs.js'))
        .pipe(plugins.if(args.production, plugins.uglify({mangle: true})))
        .pipe(plugins.if(!args.production, plugins.sourcemaps.write()))
        .pipe(gulp.dest(dest.js));
});

gulp.task('styles-vendor', function () {
    var relative_img_path = path.relative(dest.css, dest.img)
           .replace(path.sep, '/'),
        vendor = gulp.src(BOWER_DIR + '**/*.css')
            .pipe(plugins.filter([
                '**/*.css', '!**/*.min.css'
            ]))
            .pipe(plugins.print(function (filepath) {
                return "stylesheet: " + filepath;
            }))
            .pipe(plugins.replace(
                /url\((["']?)(?:\\?(?:[^\)]+\/)?([^\/\)]+\.(?:gif|jpe?g|png)))*?\1\)/g,
                'url($1' + relative_img_path + '/vendor/$2$1)'
            ));
    return vendor.pipe(plugins.concat('vendor.css'))
        .pipe(plugins.if(args.production, plugins.cleanCss()))
        .pipe(gulp.dest(dest.css));
});

gulp.task('styles', function () {
    var localApp = gulp.src(src.styles)
            .pipe(plugins.filter('**/*.{scss,css}')),
        localComponents = gulp.src('scripts/app/kroudy_components/**/*.css')
                .pipe(plugins.filter('**/*.{scss,css}'));
    return merge(localApp, localComponents)
        .pipe(plugins.concat('base.css'))
        .pipe(plugins.if(args.production, plugins.cleanCss()))
        .pipe(gulp.dest(dest.css));
});

gulp.task('styles-jobs', function () {
    var localApp = gulp.src(src.stylesjobs)
            .pipe(plugins.filter('**/*.{scss,css}')),
        localComponents = gulp.src('scripts/app/kroudy_components/**/*.css')
                .pipe(plugins.filter('**/*.{scss,css}'));
    return merge(localApp, localComponents)
        .pipe(plugins.concat('style_jobs.css'))
        .pipe(plugins.if(args.production, plugins.cleanCss()))
        .pipe(gulp.dest(dest.css));
});

gulp.task('styles-general', function () {
    var localApp = gulp.src(src.stylesgeneral)
            .pipe(plugins.filter('**/*.{scss,css}')),
        localComponents = gulp.src('scripts/app/kroudy_components/**/*.css')
                .pipe(plugins.filter('**/*.{scss,css}'));
    return merge(localApp, localComponents)
        .pipe(plugins.concat('general.css'))
        .pipe(plugins.if(args.production, plugins.cleanCss()))
        .pipe(gulp.dest(dest.css));
});

gulp.task('bootstrap-fonts', function () {
  return gulp.src(BOWER_DIR + '/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(dest.fonts));
});

gulp.task('fonts', function () {
    return gulp.src(plugins.bower(), { base: BOWER_DIR })
        .pipe(plugins.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(plugins.print(function (filepath) {
          // console.log('filepathFonts',filepath);
            return "font: " + filepath;
        }))
        .pipe(plugins.flatten())
        .pipe(gulp.dest(dest.fonts));
});

gulp.task('templates', function () {
    gulp.src(src.templates)
        .pipe(plugins.angularTemplatecache({
            module: 'krowdy-positions'
        }))
        .pipe(plugins.concat('templates.js'))
        .pipe(gulp.dest(dest.js));
});

gulp.task('templates-jobs', function () {
    gulp.src(src.templatesjobs)
        .pipe(plugins.angularTemplatecache({
            module: 'krowdy-joboards'
        }))
        .pipe(plugins.concat('templates-jobs.js'))
        .pipe(gulp.dest(dest.js));
});

gulp.task('images', function () {
    return gulp.src(IMAGES_DIR + '**/*.{gif,jpeg,jpg,png,svg}')
        .pipe(plugins.filter('**/*.{gif,jpeg,jpg,png,svg}'))
        .pipe(plugins.print(function (filepath) {
            return "image: " + filepath;
        }))
        .pipe(plugins.flatten())
        .pipe(gulp.dest(dest.img));
});

gulp.task('json',function () {
  return gulp.src(src.json)
  .pipe(gulp.dest(dest.json));
});

gulp.task('assets', function () {
  return gulp.src(src.assets)
  .pipe(gulp.dest(dest.assets));
});

gulp.task('watch', function () {
    gulp.watch(src.scripts, ['scripts']);
});

gulp.task('compile', function (done) {
    runSequence(
        ['images', 'scripts','scripts-jobs', 'bootstrap-fonts', 'templates','templates-jobs', 'fonts','json', 'assets'],
        'scripts-vendor',
        ['styles-vendor','styles-general','styles','styles-jobs'],
        done
    );
});

gulp.task('default', function () {
    console.log('test');
});
