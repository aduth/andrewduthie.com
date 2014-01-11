module.exports = function(grunt) {
  var homePath = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

  grunt.initConfig({
    //---------------------------
    // Configuration
    //---------------------------

    site: {
      output: './output'
    },

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
        helpers: ['./helpers/**/*.js'],
        data: 'data/*.json'
      },
      home: {
        options: {
          ext: '.html',
          helpers: ['helper-compose', './helpers/**/*.js'],
          compose: {
            compare: function(a, b) {
              return b.context.date - a.context.date;
            }
          }
        },
        files: {
          'output/': ['templates/pages/index.hbs']
        }
      },
      feed: {
        options: {
          ext: '.xml',
          layout: 'atom.hbs',
          helpers: ['helper-compose', './helpers/**/*.js'],
          compose: {
            compare: function(a, b) {
              return b.context.date - a.context.date;
            }
          },
          marked: {
            sanitize: true
          }
        },
        files: {
          'output': ['templates/pages/feed.hbs']
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
        tasks: ['less']
      },

      site: {
        files: ['public/css/less/**/*.less', 'templates/**/*.hbs'],
        tasks: ['generate']
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
          cwd: '<%= site.output %>/',
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
          srcBasePath: '<%= site.output %>/'
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
  grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('deploy', ['generate', 'compress', 'sftp', 'sshexec:decompress', 'sshexec:removePackage', 'clean:post-deploy']);
};
