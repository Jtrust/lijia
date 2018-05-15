var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
// var less = require('gulp-less');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
//var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');
var spriter = require('gulp-css-spriter');


gulp.task('default', ['watch', 'server']);

gulp.task('server', function () {
    connect.server({
        //root: 'newfolder',
        root: './',
        port: '8080',
        livereload: true
    });
});

gulp.task('reload', function () {
    gulp.src('./*.html').pipe(connect.reload());
    gulp.src('about/*.html').pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('./*.html', ['fileinclude', 'reload']);
    gulp.watch('about/*.html', ['fileinclude', 'reload']);
    gulp.watch('css/*.{css,less,scss}', ['sassTocss', 'reload']);
    //gulp.watch('css/main/*.{scss}', ['sassTocss']);

    gulp.watch('css/main/*.css', ['reload']);
    gulp.watch('js/*.js', ['concat', 'reload']);
    gulp.watch('images/*.{jpg,png,gif}', ['imagemin', 'reload']);
    // gulp.watch('images/sprites/*.{jpg,png,gif}', ['imagemin_spr', 'reload']);

});

//gulp.task('concat', function () {
//    //给合并后的文件取名target.js
//    gulp.src('js/*.js')
//        //.pipe(concat('target.js'))
//        .pipe(rename({suffix: '.min'})).pipe(uglify()).pipe(gulp.dest('tar/js'));
//});

//gulp.task('htmlmin', function () {
//    gulp.src('html/*.html').pipe(htmlmin()).pipe(gulp.dest('disthtml'));
//});
gulp.task('cssmin', function () {
    gulp.src('css/*.css').pipe(cssmin()).pipe(gulp.dest('tar/css'));
});
gulp.task('imagemin', function () {
    gulp.src('IMG/*.{jpg,png,gif}').pipe(imagemin()).pipe(gulp.dest('tar/IMG'));
});
// gulp.task('imagemin_spr', function () {
//     gulp.src('images/sprites/*.{jpg,png,gif}').pipe(imagemin()).pipe(gulp.dest('css/main/sprites'));
// });
// gulp.task('lessTocss', function () {
//     gulp.src('css/*.less')
//         .pipe(less())   //转成css文件
//         .pipe(cssmin())
//         .pipe(gulp.dest('tar/css'))
//     //.pipe(rename({suffix: '.min'}))
// });

gulp.task('sassTocss', function () {
    // 嵌套输出方式 nested
    // 展开输出方式 expanded
    // 紧凑输出方式 compact
    // 压缩输出方式 compressed
    gulp.src('css/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove: true
        }))
        //.pipe(sass())
        .pipe(gulp.dest('css/'));
    //.pipe(rename({suffix: '.min'}))
});

gulp.task('fileinclude', function () {
    gulp.src('html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            // basepath: '@file'
            basepath: './src/include',//引用文件路径
            indent:true//保留文件的缩进
        }))
        .pipe(gulp.dest('./dist'));
});

