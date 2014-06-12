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
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['browserify', 'copy', 'sass']);

};
