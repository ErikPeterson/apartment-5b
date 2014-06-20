module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify:{
      iso: {
        src: ['<%= pkg.main %>.js'],
        dest: './dist/js/index.js'
      },
      editor: {
        src: ['./js/editor.js'],
        dest: './dist/js/editor.js'
      }
    },
    copy: {
      images:{
        files:[{
            expand: true,
            cwd: './',
            src:['assets/*','!assets/*.psd'],
            dest: 'dist/'
        }]
      },
      html:{
        files:[{
          expand: true,
          cwd: './html/',
          src:['*'],
          dest:'./dist/'
        }
        ]
      }
    },
    sass:{
      main: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: './sass',
          src:['main.scss'],
          dest: 'dist/css/',
          ext: '.css'
        }]
      }
    },
    autoprefixer:{
      options: {
        browsers: ['last 2 version']
      },
      main: {
        src: 'dist/css/main.css',
        dest: 'dist/css/main.css'
      }
    },
    jshint: {
      options:{
        debug: true
      },
      main: ['./js/*.js', '!./js/keypress.js', '!./js/SAT.min.js']
    },
    watch: {
      scripts: {
        files:'./js/*.js',
        tasks: ['jshint','browserify']
      },
      sass: {
        files: './sass/*.scss',
        tasks: ['sass', 'autoprefixer']
      },
      html: {
        files: './html/*',
        tasks: ['copy:html']
      },
      images: {
        files: ['assets/*','!assets/*.psd'],
        tasks: ['copy:images']
      }
      }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint','browserify', 'copy:images','copy:html', 'sass']);

};
