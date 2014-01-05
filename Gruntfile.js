module.exports = function(grunt) {
  var homePath = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

  grunt.initConfig({
    siteConfig: grunt.file.readJSON('config.json'),
    remote: {
      host: 'andrewduthie.com',
      username: 'deploy',
      sitePath: '/home/deploy/andrewduthie.com',
      privateKey: grunt.file.read(homePath + '/.ssh/id_rsa')
    },

    less: {
      dist: {
        files: {
          'public/css/main.css': ['public/css/less/main.less']
        },
        options: {
          compress: true
        }
      }
    },

    shell: {
      generate: {
        command: 'node build.js'
      }
    },

    watch: {
      less: {
        files: ['public/css/less/**/*.less'],
        tasks: ['less', 'shell:generate']
      },

      blog: {
        files: ['post/*'],
        tasks: ['shell:generate']
      }
    },

    compress: {
      deploy: {
        options: {
          archive: 'output.tar.gz'
        },
        mode: 'tgz',
        files: [{
          expand: true,
          cwd: '<%= siteConfig.output %>/',
          src: ['**'],
          dest: './'
        }]
      }
    },

    sftp: {
      deploy: {
        files: {
          './': 'output.tar.gz'
        },
        options: {
          path: '<%= remote.sitePath %>/',
          host: '<%= remote.host %>',
          username: '<%= remote.username %>',
          privateKey: '<%= remote.privateKey %>',
          srcBasePath: '<%= siteConfig.output %>/'
        }
      }
    },

    sshexec: {
      decompress: {
        command: 'tar -xzf <%= remote.sitePath %>/output.tar.gz -C <%= remote.sitePath %>/public_html/',
        options: {
          host: '<%= remote.host %>',
          username: '<%= remote.username %>',
          privateKey: '<%= remote.privateKey %>'
        }
      },

      removePackage: {
        command: 'rm <%= remote.sitePath %>/output.tar.gz',
        options: {
          host: '<%= remote.host %>',
          username: '<%= remote.username %>',
          privateKey: '<%= remote.privateKey %>'
        }
      }
    },

    clean: {
      'post-deploy': ['output.tar.gz']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-ssh');

  grunt.registerTask('default', ['less']);
  grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('deploy', ['shell:generate', 'compress', 'sftp', 'sshexec:decompress', 'sshexec:removePackage', 'clean:post-deploy']);
};
