var gulp = require('gulp'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS = require('gulp-clean-css'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
notify = require('gulp-notify'),
plumber = require('gulp-plumber'),
browserSync = require('browser-sync').create(),
reload= browserSync.reload,
fileinclude = require('gulp-file-include'),
spritesmith = require("gulp.spritesmith"),
inlinesource = require('gulp-inline-source'),
sourcemaps = require('gulp-sourcemaps'),
babel = require("gulp-babel");
//当前开发目录
var nowPath = '/zhuanti/0312poes3/';// /others/queryArticle/
//var nowPath = '/gswap/';
//根目录
var rootpath = 'projects' + nowPath;
//其他目录
var myroot = rootpath,
	mypath = {		
		'css':       myroot + 'css',            //css输出目录		
		'sass':      myroot + 'sass/*.scss',    //sass目录		
		'js':        myroot + 'js/',            //js目录		
		'jsout':     myroot + 'jsmin/',         //js输出目录		
		'html':      myroot + 'tpl/',           //html目录
		'imgs':      myroot + 'ztimages/',      //图片目录
        'csp':       myroot + 'csp/'            //雪碧图 图片目录
	};
//sprites
gulp.task('csprite',function(){
	var stream = gulp.src(mypath.csp + '*.png')
		.pipe(spritesmith({
			imgName:'csprite.png',
			cssName:'../sass/_csprite.scss',
			cssFormat:'scss',
			padding:8,
			imgPath :'../ztimages/csprite.png'
		}))
		.pipe(gulp.dest(mypath.imgs))
		.pipe(reload({stream: true}));
	return stream;
});
gulp.task('cspritewap',function(){//cssTemplate:'cssTemp.scss',
    var stream = gulp.src(mypath.csp + '*.png')
        .pipe(spritesmith({
            imgName:'csprite.png',
            cssName:'../sass/_csprite.scss',
            cssFormat:'scss',
            cssTemplate:'cssTemp.scss',
            padding:10,
            imgPath :'../ztimages/csprite.png'
        }))
        .pipe(gulp.dest(mypath.imgs))
        .pipe(reload({stream: true}));
    return stream;
});
//include html
gulp.task('fileinclude', function() {
    gulp.src(mypath.html + '*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest(myroot));
});
//css
gulp.task('dosass',function(){
    return gulp.src(mypath.sass)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sass({outputStyle: 'compact'}).on('error',sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5%','ios >= 5','Firefox >= 20','android >= 2.3','opera >= 23','ie >= 7','ie_mob >= 10','safari >= 6','chrome >= 30','opera >= 23','ff >= 30','bb >= 10'],
            cascade: true,
            remove:false
        }))
        .pipe(cleanCSS({compatibility: 'ie8',format: 'keep-breaks'}))
        .pipe(gulp.dest(mypath.css))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(mypath.css))
        .pipe(reload({stream: true}));
});
//js
gulp.task('jsmin', function() {
  return gulp.src(mypath.js+'*.js')
	  .pipe(sourcemaps.init())
      .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
      .pipe(concat('main.js'))
      .pipe(gulp.dest(mypath.jsout))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(mypath.jsout));
});
gulp.task('auto', function() {
	browserSync.init({
        server: myroot,
        open:'external'
    });
	gulp.watch([mypath.csp + '*.png'],['csprite','dosass']);
	gulp.watch([mypath.sass], ['dosass']);
	gulp.watch([mypath.js + '*.js'], ['jsmin']);
	gulp.watch([mypath.html + "*.html",mypath.html + "*/*.html"], ['fileinclude']);
	gulp.watch([mypath.jsout + "*.js"]).on('change', reload);
	gulp.watch([myroot + "*.html"]).on('change', reload);
});
gulp.task('autowap', function() {
    browserSync.init({
        server: myroot,
        open:'external'
    });
    gulp.watch([mypath.csp + '*.png'],['cspritewap','dosass']);
    gulp.watch([mypath.sass], ['dosass']);
    gulp.watch([mypath.js + '*.js'], ['jsmin']);
    gulp.watch([mypath.html + "*.html",mypath.html + "*/*.html"], ['fileinclude']);
    gulp.watch([mypath.jsout + "*.js"]).on('change', reload);
    gulp.watch([myroot + "*.html"]).on('change', reload);
});
gulp.task('small', function() {
    browserSync.init({
        server: myroot,
        open:'external'
    });
    gulp.watch([mypath.sass], ['dosass']);
    gulp.watch([mypath.js + '*.js'], ['jsmin']);
    gulp.watch([mypath.html + "*.html",mypath.html + "*/*.html"], ['fileinclude']);
    gulp.watch([mypath.jsout + "*.js"]).on('change', reload);
    gulp.watch([myroot + "*.html"]).on('change', reload);
});
gulp.task('smallpic', function() {
    browserSync.init({
        server: myroot,
        open:'external'
    });
    gulp.watch([mypath.csp + '*.png'],['csprite','dosass']);
    gulp.watch([mypath.sass], ['dosass']);
    gulp.watch([mypath.js + '*.js'], ['jsmin']);
    gulp.watch([mypath.jsout + "*.js"]).on('change', reload);
    gulp.watch([myroot + "*.html"]).on('change', reload);
});
gulp.task('build',function(){
	var options = {
        compress: true
    };
	return gulp.src(myroot + "*.html")
		.pipe(inlinesource(options))
		.pipe(rename({extname:".shtml"}))
		.pipe(gulp.dest(myroot + 'build'));
});
gulp.task('pc',['auto']);
gulp.task('wap',['autowap']);
gulp.task('other',['small']);
gulp.task('othercsp',['smallpic']);
gulp.task('pub',['build']);