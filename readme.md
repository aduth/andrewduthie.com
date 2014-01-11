# AndrewDuthie.com Source

This repository contains the source for my personal blog site. It uses [Assemble](http://assemble.io/) to compile Markdown blog posts into static HTML using Handlebars templates.

## Installation

Requirements: You must have [Node.js](nodejs.org) installed. Clone and install using npm:

    git clone git://github.com/aduth/andrewduthie.com.git
    cd andrewduthie.com
    npm install

## Compilation

To generate the site, use the `generate` Grunt task:

    grunt generate

## Development

The Gruntfile provides the following public tasks:

- `generate` (default): Copy static assets from public directory, generate site using Assemble, and compile LESS stylesheets to CSS
- `dev` : Runs `generate` task then watch for changes, running `generate` again whenever changes occur

## License

Copyright 2014 Andrew Duthie.

Blog post content licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/deed.en_US). Blog post content includes all files within the `content/` directory.

Source code licensed under the MIT license, included below. Source code includes all files with exception of files within the `content/` directory.

```
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```