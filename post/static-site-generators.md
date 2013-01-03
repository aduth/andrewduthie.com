---
title: Static Site Generators
template: post
date: 2012-01-03 00:00:00 -5
description: An overview of static site generators, including purpose, benefits, and example web stacks. 
---

As web developers, we often concern ourselves mostly with dynamic web content. However, there is a growing collection of utilities to help in the creation of static sites. For example, GitHub uses [Jekyll](http://jekyllrb.com/) for its [GitHub Pages](http://pages.github.com/) offering. Jekyll uses 

## An overview

For many simple sites and blogs, its typical to create a web application which consists of two primary components: [1] a page layout (i.e. header and footer), and [2] a small collection of database tables to manage content.

Static site generators use layout files including some variety of template syntax, combines them with content files, usually with special syntax (e.g. [Markdown](http://daringfireball.net/projects/markdown/)), and generates simple HTML files. Because of this, you need not concern yourself with maintaining a database and, depending on your hosting solution, an application server. 

## Primary benefits

- __Fast__: Because the generated files are simple HTML files, they can be served directly rather than being processed by an application server.
- __Affordable__: There are several options to host your static sites *for free*. For example, you could store the files in a simple Dropbox folder, and use a service like [site44](http://www.site44.com/) to serve them from a custom domain. You can also serve a static site directly from a GitHub repository using  [these instructions](https://help.github.com/articles/setting-up-a-custom-domain-with-pages). My personal favorite solution, used for this blog, is [Amazon S3](http://aws.amazon.com/s3/), which is free for the first year, and pennies per month for smaller sites afterwards. Configuring a site on Amazon S3 is outside the scope of this article, and is something I'd like to write on later.
- __Simple__: Most static site generators require a layout, some content, and a basic understanding of the syntax used to link them. Jekyll uses Ruby, but you won't need to know much about Ruby in order to use it for your own sites.
- __Secure__: Because your site is simple HTML, there's significantly fewer points of potential malice. If you use a cloud hosting solution such as Amazon S3, server security is also a non-issue. As a result, you can concentrate on what really matters: the content itself.

## AndrewDuthie.com

For this blog, I created a custom static site generator as a learning experiment, code-named "Poole". The source code of the project is available at the [GitHub repository](https://github.com/aduth/andrewduthie.com). Feel free to use it as reference for a simple static site project structure. If you're interested in working with Jekyll, check the source of some of the [many sites which use it](https://github.com/mojombo/jekyll/wiki/Sites).