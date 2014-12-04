'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    md2html: {
      options: {
        layout: 'layout.html',
        markedOptions: {
          breaks: true,
          smartypants: true
        }
      },
      multiple_files: {
        options: {},
        files: [{
          expand: true,
          cwd: 'doc',
          src: ['**/*.md'],
          dest: 'build',
          ext: '.html'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-md2html');

  grunt.registerTask('build', ['md2html']);

  grunt.registerTask('default', ['build']);
};