module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    secret: grunt.file.readJSON('secrets.json'),
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
          './dev/js/editor.js': './app/js/bin/editor.js'
        }
      },
      prod: {
        files:{
          './prod/app/js/index.js': '<%= pkg.main %>.js',
          './prod/app/js/editor.js': './app/js/bin/editor.js'
        }
      }
    },
    uglify: {
      prod: {
        options:{
          mangle: false
        },
        files: {
          'prod/app/js/index.js':['prod/app/js/index.js'],
          'prod/app/js/editor.js':['prod/app/js/editor.js']
        }
      },
    },
    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files:{
          'prod/app/index.html':'prod/app/index.html',
          'prod/app/editor.html':'prod/app/editor.html'
        }
      }
    },
    copy: {
      prod: {
          files:[{
              expand: true,
              cwd: './app',
              src:['assets/*','!assets/*.psd'],
              dest: 'prod/app/'
          },{
            expand: true,
            cwd: './app/html/',
            src:['*.html'],
            dest:'./prod/app/'
          },{
            expand: true,
            cwd: './app',
            src: ['assets/fonts/*'],
            dest: 'prod/app/'
          }]
      },
      dev:{
          files:[{
              expand: true,
              cwd: './app',
              src:['assets/*','!assets/*.psd'],
              dest: 'dev/'
          },{
            expand: true,
            cwd: './app/html/',
            src:['*'],
            dest:'./dev/'
          },{
            expand: true,
            cwd: './app',
            src: ['assets/fonts/*'],
            dest: 'dev/'
          }]
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
          cwd: './app/sass',
          src:['main.scss'],
          dest: '.dev/css/',
          ext: '.css'
        }]
      },
      prod: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: './app/sass',
          src:['main.scss'],
          dest: 'prod/app/css/',
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
        src: 'prod/app/css/main.css',
        dest: 'prod/app/css/main.css'
      }
    },
    jshint: {
      options:{
        debug: true
      },
      main: ['./app/js/**/*.js', '!./app/js/support/keypress.js', '!./app/js/support/SAT.min.js']
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
        files:'./app/js/**/*.js',
        tasks: ['jshint','browserify:dev']
      },
      sass: {
        files: './app/sass/**/*.scss',
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      html: {
        files: './app/html/*',
        tasks: ['copy:dev']
      },
      images: {
        files: ['./app.assets/*','!./app/assets/*.psd'],
        tasks: ['copy:dev']
      }
    },
    environments: {
      production:{
        options:{
          password: '<%= secret.production.password %>',
          host:'<%= secret.production.host %>',
          username: '<%= secret.production.username %>',
          debug: true,
          deploy_path: '<%= secret.production.deploy_path %>',
          local_path: '<%= secret.production.local_path %>',
          current_symlink: 'current',
          before_deploy: 'cd <%= secret.production.deploy_path %>/current && bash ./stop',
          after_deploy: 'cd <%= secret.production.deploy_path %>/current && bash ./start',
          port: 22
        }
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
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-ssh-deploy');

  grunt.registerTask('builddev', ['jshint','browserify:dev', 'copy:dev', 'sass:dev', 'autoprefixer:dev']);
  grunt.registerTask('buildprod', ['jshint','browserify:prod', 'copy:prod', 'sass:prod', 'autoprefixer:prod', 'uglify:prod', 'htmlmin:prod']);
  grunt.registerTask('devserve', ['concurrent:server']);

};
