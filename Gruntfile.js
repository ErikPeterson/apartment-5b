module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify:{
      standalone: {
        src: ['<%= pkg.main %>.js'],
        dest: './dist/js/index.js',
        options: {
          standalone: 'Iso'
        }
      }
    },
    copy: {
      main:{
        files:[{
            expand: true,
            cwd: './',
            src:['assets/*','!assets/*.psd'],
            dest: 'dist/'
        }]
      }
    },
    sass:{
      dist: {
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
    watch: {
      scripts: {
        files:'./js/*.js',
        tasks: ['browserify']
      },
      css: {
        files: './sass/*.scss',
        tasks: ['sass']
      }
      }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify', 'copy', 'sass']);

};
