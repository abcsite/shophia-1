"use strict";
/****************************************************************************************************/
//MODULES REQUIRE
/****************************************************************************************************/
const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    // csso = require('postcss-csso'),
    // customProperties = require('postcss-custom-properties'),
    // apply = require('postcss-apply'),
    // postcssNesting = require('postcss-nesting'),
    // postcssNested = require('postcss-nested'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    newer = require('gulp-newer'),
    debug = require('gulp-debug'),
    mmq = require('gulp-merge-media-queries'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    svgSymbols = require('gulp-svg-symbols'),
    smushit = require('gulp-smushit'),
    del = require('del'),
    mainBowerFiles = require('main-bower-files'),
    flatten = require('gulp-flatten'),
    browserSync = require('browser-sync').create(),
    remember = require('gulp-remember'),
    cached = require('gulp-cached'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    order = require("gulp-order"),
    cssmin = require('gulp-cssmin'),
    path = require('path');

/****************************************************************************************************/
//DEV OR PRODUCTION
/****************************************************************************************************/
// let isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const isDevelopment = true;    // DEV
// const isDevelopment = false;    // PRODUCTION

/****************************************************************************************************/
//PATHS
/****************************************************************************************************/
const cms = {
    modx: {
        html: 'build',
        css: 'build/assets/css',
        js: 'build/assets/js',
        img: 'build/assets',
        libs: 'build/assets/libs',
        fonts: 'build/assets/fonts',
    }
};
/****************************************************************************************************/
//HTML task
/****************************************************************************************************/
gulp.task('html', () => {
    return gulp.src('src/*.html', {since: gulp.lastRun('html')})
        .pipe(rigger())
        .pipe(gulp.dest(cms.modx.html))
});

/****************************************************************************************************/
//HTML templates task
/****************************************************************************************************/
gulp.task('html:templates', () => {
    return gulp.src('src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest(cms.modx.html))
});
/****************************************************************************************************/
//CSS task
/****************************************************************************************************/
gulp.task('style', () => {
    let processors = [
        autoprefixer({
            browsers: ['last 10 versions']
        })
    ];
    return gulp.src('src/css/style.scss')
        // .pipe(cached('style'))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        // .pipe(remember('style'))
        // .pipe(order([
        //     "src/css/normalize.css",
        //     "src/css/vars.css",
        //     "src/css/style.css"
        // ], {base: './'}))
        // .pipe(concat("style.css"))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(mmq({log: true}))
        .pipe(gulpIf(!isDevelopment, cssmin({keepSpecialComments: 0})))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest(cms.modx.css))
        .pipe(browserSync.stream())
});
/****************************************************************************************************/
//JS task
/****************************************************************************************************/
gulp.task('js', () => {
    return gulp.src('src/js/main.js')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(rigger())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest(cms.modx.js))
        .pipe(browserSync.stream())
});
/****************************************************************************************************/
//LIBS task
/****************************************************************************************************/
gulp.task('libs', () => {
    return gulp.src( mainBowerFiles(
        {
            "overrides": {
                "jquery": {
                    "main": "dist/jquery.min.js"
                },
                "svg4everybody": {
                    "main": "dist/svg4everybody.min.js"
                },
                "slick-carousel": {
                    "main": [
                        "slick/slick.js",
                        "slick/slick.css",
                        "slick/slick-theme.css"
                    ]
                }
            }
        }
    ),
        {base: "./src/libs"})
        .pipe(flatten({includeParents: 1}))
        .pipe(newer(cms.modx.libs))
        .pipe(gulp.dest(cms.modx.libs))
});
/****************************************************************************************************/
//FONTS task
/****************************************************************************************************/
gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*.*')
        .pipe(newer(cms.modx.fonts))
        .pipe(gulpIf(isDevelopment, gulp.symlink(cms.modx.fonts), gulp.dest(cms.modx.fonts)))
});
/****************************************************************************************************/
//IMG task (jpg,png,gif)
/****************************************************************************************************/
gulp.task('img', () => {
    return gulp.src(['src/img/**/*.{jpg,png,gif}', 'src/images/**/*.{jpg,png,gif}'], {base: "src"})
        .pipe(newer(cms.modx.img))
        // .pipe(gulpIf(!isDevelopment, imagemin({progressive: true})))
        // .pipe(gulpIf(!isDevelopment, smushit({verbose: true})))
        .pipe(gulpIf(isDevelopment, gulp.symlink(cms.modx.img), gulp.dest(cms.modx.img)))
});
/****************************************************************************************************/
//SVG task
/****************************************************************************************************/
gulp.task('svg', () => {
    return gulp.src('src/img/svg/*.svg', {base: 'src'})
        .pipe(newer(cms.modx.img))
        .pipe(gulpIf(!isDevelopment, gulp.dest(cms.modx.img), gulp.symlink(cms.modx.img)))
});
/****************************************************************************************************/
//SVG sprite icons
/****************************************************************************************************/
gulp.task('svg:icons', () => {
    return gulp.src('src/img/svg/icons/*.svg')
        .pipe(cached('svg:icons'))
        .pipe(svgmin({
            plugins: [
                {removeEditorsNSData: true},
                {removeTitle: true}
            ]
        }))
        .pipe(remember('svg:icons'))
        .pipe(svgSymbols({
            title: '%f icon',
            svgClassname: 'svg-icon-lib',
            templates: [
                'default-svg','default-css','default-demo'
            ]
        }))
        .pipe(gulp.dest('src/img/svg'))
});
/****************************************************************************************************/
//DEL build directory
/****************************************************************************************************/
gulp.task('clean', () => del('build'));
/****************************************************************************************************/
//WATCHERS
/****************************************************************************************************/
gulp.task('watch', done => {
    gulp.watch('src/*.html', gulp.series('html')).on('unlink', function (filepath) {
        let filePathFromSrc = path.relative(path.resolve('src/'), filepath);
        let destFilePath = path.resolve(cms.modx.html, filePathFromSrc);
        del.sync(destFilePath);
    });
    gulp.watch('src/templates/*.html', gulp.series('html:templates'));
    gulp.watch('build/*.html').on('change', browserSync.reload);

    // gulp.watch('src/css/*.css', gulp.series('style')).on('unlink', function (filepath) {
    //     remember.forget('css', path.resolve(filepath));
    //     delete cached.caches.css[path.resolve(filepath)];
    // });

    gulp.watch('src/css/**/*.scss', gulp.series('style'));

    gulp.watch('src/js/*.js', gulp.series('js'));

    gulp.watch('src/**/*.{jpg,png,gif}', gulp.series('img')).on('unlink', function (filepath) {
        let filePathFromSrc = path.relative(path.resolve('src/'), filepath);
        let destFilePath = path.resolve(cms.modx.img, filePathFromSrc);
        del.sync(destFilePath);
    });

    gulp.watch('src/img/svg/*.svg', gulp.series('svg')).on('unlink', function (filepath) {
        let filePathFromSrc = path.relative(path.resolve('src/'), filepath);
        let destFilePath = path.resolve(cms.modx.img, filePathFromSrc);
        del.sync(destFilePath);
    });

    gulp.watch('src/img/svg/icons/*.svg', gulp.series('svg:icons')).on('unlink', function (filepath) {
        remember.forget('svg:icons', path.resolve(filepath));
        delete cached.caches['svg:icons'][path.resolve(filepath)];
    });

    gulp.watch('src/fonts/**/*.*', gulp.series('fonts')).on('unlink', function (filepath) {
        let filePathFromSrc = path.relative(path.resolve('src/fonts'), filepath);
        let destFilePath = path.resolve(cms.modx.fonts, filePathFromSrc);
        del.sync(destFilePath);
    });
    done();
});
/****************************************************************************************************/
//BROWSER-SYNC task
/****************************************************************************************************/
gulp.task('serve', done => {
    browserSync.init({
        // server: true,
        proxy: "shophia-1",
        tunnel: "mysite",
        browser: "chrome",
        startPath: '/build',
        open: false
    });
    done();
});
/****************************************************************************************************/
//GLOBAL TASKS
/****************************************************************************************************/
gulp.task('build', gulp.series('clean', gulp.parallel('html', 'style', 'js', 'libs', 'fonts', 'img', 'svg:icons'), 'svg'));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
//isDevelopment = false;
//gulp.task('build:NODE_ENV', gulp.series('clean', gulp.parallel('html', 'style', 'js', 'libs', 'fonts', 'img', 'svg:icons'), 'svg'));

