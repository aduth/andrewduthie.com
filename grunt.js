module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-s3');

    var config = {
        aws: '<json:config-aws.json>',
        siteConfig: '<json:config.json>',

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
        },

        s3: {
            key: '<%= aws.key %>',
            secret: '<%= aws.secret %>',
            bucket: '<%= aws.bucket %>',
            access: 'public-read',
            upload: [
                {
                    rel: '<%= siteConfig.output %>',
                    src: '<%= siteConfig.output %>/**/*.*',
                    dest: '/',
                    gzip: true
                },
                {
                    rel: '<%= siteConfig.output %>',
                    src: '<%= siteConfig.output %>/**/*.css',
                    dest: '/',
                    gzip: true,
                    headers: { 'Cache-Control': 'public, max-age=' + (60 * 60 * 24 * 365) }
                },
                {
                    rel: '<%= siteConfig.output %>',
                    src: '<%= siteConfig.output %>/**/*.js',
                    dest: '/',
                    gzip: true,
                    headers: { 'Cache-Control': 'public, max-age=' + (60 * 60 * 24 * 365) }
                }
            ]
        }
    };

    grunt.initConfig(config);

    grunt.registerTask('default', 'sass');
    grunt.registerTask('start', 'default watch');
    grunt.registerTask('publish', 's3')
};
