## AndrewDuthie.com Source

This repository contains the source for my personal blog site. It includes my custom static site generator, code-named "Poole" (found in lib/poole/).

To install, you must have Node.js with npm. Then clone and install using npm:

    git clone git://github.com/aduth/andrewduthie.com.git
    cd andrewduthie.com
    npm install

To generate the site, first change the `output` directory in config.json, then run the `build.js` file using Node.js:

    node build.js

The gruntfile provides the following tasks:

- __start__ : Generate CSS from SCSS files and watch for changes
- __publish__ : Publish to Amazon S3 using configuration values found in config-aws.json

To use the grunt tasks, first install grunt, then run one of the above tasks:

    npm install -g grunt
    grunt start
