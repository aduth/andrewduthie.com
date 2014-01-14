module.exports = function(grunt) {
  var homePath = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

  grunt.initConfig({
    //---------------------------
    // Configuration
    //---------------------------

    remote: {
      host: 'andrewduthie.com',
      username: 'deploy',
      sitePath: '/home/deploy/andrewduthie.com',
      privateKey: grunt.file.read(homePath + '/.ssh/id_rsa')
    },

    //---------------------------
    // Tasks
    //---------------------------

    assemble: {
      options: {
        flatten: true,
        assets: 'output/assets/',
        partials: 'templates/partials/*.hbs',
        layoutdir: 'templates/layouts',
        layout: 'master.hbs',
        data: 'data/*.json',
        helpers: ['helper-compose', 'handlebars-helper-filehash', './helpers/**/*.js'],
        compose: {
          compare: function(a, b) {
            return b.context.date - a.context.date;
          }
        }
      },
      home: {
        options: {
          ext: '.html'
        },
        files: {
          'output/': ['templates/pages/index.hbs']
        }
      },
      feed: {
        options: {
          ext: '.xml',
          layout: 'atom.hbs'
        },
        files: {
          'output/': ['templates/pages/feed.hbs']
        }
      },
      posts: {
        options: {
          plugins: ['assemble-contrib-permalinks', 'other/plugins/*'],
          ext: '.html',
          layout: 'post.hbs',
          permalinks: {
            structure: ':slug/index.html'
          }
        },
        files: {
          'output/post/': ['content/post/*.md']
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 0,
          base: 'output',
          open: true
        }
      }
    },

    copy: {
      assets: {
        expand: true,
        cwd: 'public/',
        src: '**',
        dest: 'output/'
      }
    },

    less: {
      dist: {
        files: {
          'public/assets/css/main.css': ['public/assets/css/less/main.less']
        },
        options: {
          compress: true
        }
      }
    },

    watch: {
      less: {
        files: ['public/css/less/**/*.less'],
        tasks: ['less', 'copy:assets']
      },

      site: {
        files: ['templates/**/*.hbs'],
        tasks: ['assemble']
      },

      blog: {
        files: ['content/post/*.md'],
        tasks: ['assemble:posts']
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
          cwd: process.cwd() + '/output',
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
          srcBasePath: 'output/'
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
      'pre-generate': ['output/*'],
      'post-deploy': ['output.tar.gz']
    }
  });

  //---------------------------
  // Load module tasks
  //---------------------------

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('assemble');

  //---------------------------
  // Register tasks
  //---------------------------

  grunt.registerTask('generate', ['clean:pre-generate', 'less', 'copy:assets', 'assemble']);
  grunt.registerTask('default', ['generate']);
  grunt.registerTask('dev', ['default', 'connect', 'watch']);
  grunt.registerTask('deploy', ['generate', 'compress', 'sftp', 'sshexec:decompress', 'sshexec:removePackage', 'clean:post-deploy']);
};
