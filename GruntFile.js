let grunt = require('grunt');
let path = require('path');
let gruntOptions = {
    watch: {
        css: {
            files: [__dirname+'/client/src/**/*.css'],
            tasks: ['cssmin']
        },
        js: {
            files: [__dirname+'/client/src/**/*.js'],
            tasks: ['uglify']
        }
    },
    uglify: {
        options: {},
        dist: {
          src: __dirname+'/client/src/**/*.js',
          dest: __dirname+'/public/js/app.min.js'  
        }
    },
    cssmin: {
        options: {},
        target: {
            files: [
                {
                    src: [__dirname+'/client/src/**/*.css'],
                    dest: __dirname+'/public/css/app.min.css',
                }
            ]
        }
    }
};

grunt.initConfig(gruntOptions);
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.registerTask('default', ['uglify', 'cssmin']);