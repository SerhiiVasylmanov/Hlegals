const gulp = require('gulp'),
    sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync');
replace = require('gulp-replace');

gulp.task('copy:images', function () {
    return gulp.src('./src/assets/icons/*')
        .pipe(gulp.dest('./dist/assets/icons'))
});

gulp.task('copy:images', function () {
    return gulp.src('./src/assets/img/*')
        .pipe(gulp.dest('./dist/assets/img'))
});

gulp.task('copy:js', function () {
    return gulp.src('./src/js/*')
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('sass', function () {
    return gulp.src("./src/assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./dist/css', [1]))
        .pipe(browserSync.stream());
});

gulp.task('fileinclude', function () {
    return gulp.src([
        './src/pages/contact/contact.html',
        './src/pages/about_us/about_us.html',
        './src/pages/homepage/index.html',
        './src/pages/publications/publications.html',
        './src/pages/publications_page/publications_page.html',
        './src/pages/services/services.html',
        './src/pages/service_page/service_page.html',
        './src/pages/team/team.html',
        './src/pages/team_page/team_page.html'
    ]).pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task("watch", function (done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        }
    })

    gulp.watch("./src/**/*.scss", gulp.series('sass'));
    gulp.watch("./src/pages/**/*.html").on('change', gulp.series('fileinclude', browserSync.reload));
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['sass', 'fileinclude', 'watch', 'copy:images', 'copy:js']));
