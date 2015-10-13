var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-minify-css'),
    pngquant = require('imagemin-pngquant'),
    notify = require("gulp-notify");
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        assets:'build/assets/',
        image: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/styles/main.scss',
        assets:'src/assets/**/*.*',
        image: 'src/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        assets: 'src/assets/**/*.*',
        style: 'src/styles/**/*.scss',
        image: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
};
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000
};
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true}));
});
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(notify({ message: 'style task complete' }))
        .pipe(reload({stream: true}));
        
});
gulp.task('image:build', function () {
    gulp.src(path.src.image) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.image)) //И бросим в build
        .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('assets:build', function() {
    gulp.src(path.src.assets)
        .pipe(gulp.dest(path.build.assets))
});
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'assets:build',
]);
gulp.task('watch', function(){
    gulp.watch([path.watch.html], ['html:build']);
    gulp.watch([path.watch.style],['style:build']);
    gulp.watch([path.watch.js], ['js:build']);
    gulp.watch([path.watch.image], ['image:build']);
    gulp.watch([path.watch.assets], ['assets:build']);
    gulp.watch([path.watch.fonts], ['fonts:build']);
});
gulp.task('webserver', function () {
    browserSync(config);
});
gulp.task('default', ['build','webserver','watch']);