module.exports = function(grunt) {
    grunt.initConfig({
        siteConfig: grunt.file.readJSON('config.json'),

        sass: {
            dist: {
                files: {
                    'public/css/main.css': ['public/css/sass/main.scss']
                },
                options: {
                    style: 'compressed'
                }
            }
        },

        watch: {
            sass: {
                files: ['public/css/sass/main.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch')

    grunt.registerTask('default', ['sass']);
    grunt.registerTask('start', ['default', 'watch']);
};
