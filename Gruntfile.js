module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      server: {
        tasks:['watch','connect'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    browserify:{
      dev: {
        options: {
          broweserifyOptions:{
            debug: true
          }
        },
        files:{
          './dev/js/index.js': '<%= pkg.main %>.js',
          './dev/js/editor.js': './js/views/editor.js'
        }
      },
      prod: {
        files:{
          './prod/js/index.js': '<%= pkg.main %>.js',
          './prod/js/editor.js': './js/views/editor.js'
        }
      }
    },
    uglify: {
      prod: {
        options:{
          mangle: false
        },
        files: {
          'prod/js/index.js':['prod/js/index.js'],
          'prod/js/editor.js':['prod/js/editor.js']
        }
      },
    },
    copy: {
      prod: {
        images:{
          files:[{
              expand: true,
              cwd: './',
              src:['assets/*','!assets/*.psd'],
              dest: 'prod/'
          }]
        },
        html:{
          files:[{
            expand: true,
            cwd: './html/',
            src:['*'],
            dest:'./prod/'
          }
          ]
        },
        fonts: {
          files: [{
            expand: true,
            cwd: './',
            src: ['assets/fonts/*'],
            dest: 'prod/'
          }]
        }
      },
      dev:{
        images:{
          files:[{
              expand: true,
              cwd: './',
              src:['assets/*','!assets/*.psd'],
              dest: 'dev/'
          }]
        },
        html:{
          files:[{
            expand: true,
            cwd: './html/',
            src:['*'],
            dest:'./dev/'
          }
          ]
        },
        fonts: {
          files: [{
            expand: true,
            cwd: './',
            src: ['assets/fonts/*'],
            dest: 'dev/'
          }]
        }
      }
    },
    sass:{
      dev: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: './sass',
          src:['main.scss'],
          dest: 'dev/css/',
          ext: '.css'
        }]
      },
      prod: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: './sass',
          src:['main.scss'],
          dest: 'prod/css/',
          ext: '.css'
        }]
      }
    },
    autoprefixer:{
      options: {
        browsers: ['last 2 version']
      },
      dev: {
        src: 'dev/css/main.css',
        dest: 'dev/css/main.css'
      },
      prod: {
        src: 'prod/css/main.css',
        dest: 'prod/css/main.css'
      }
    },
    jshint: {
      options:{
        debug: true
      },
      main: ['./js/**/*.js', '!./js/support/keypress.js', '!./js/support/SAT.min.js']
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'dev',
          keepalive: true
        }
      }
    },
    watch: {
      scripts: {
        files:'./js/**/*.js',
        tasks: ['jshint','browserify:dev']
      },
      sass: {
        files: './sass/**/*.scss',
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      html: {
        files: './html/*',
        tasks: ['copy:dev:html']
      },
      images: {
        files: ['assets/*','!assets/*.psd'],
        tasks: ['copy:dev:images']
      }
      }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('builddev', ['jshint','browserify', 'copy:dev', 'sass:dev', 'autoprefixer:dev']);
  grunt.registerTask('buildprod', ['jshint','browserify:prod', 'copy:prod', 'sass:prod', 'autoprefixer:prod', 'uglify:prod']);
  grunt.registerTask('devserve', ['concurrent:server']);

};
