---
title: Static Site Generators
template: post
date: 2012-01-03 00:00:00 -5
description: An overview of static site generators, including purpose, benefits, and example web stacks. 
---

As web developers, we most often work with dynamic web content. Whether it's PHP, Ruby on Rails, or otherwise, it's rare that we come in contact with plain old HTML files. However, a lesser known alternative is the growing collection of utilities to help in the creation of static sites. In this article, I will discuss the purpose of these tools, what benefits they provide, and some example web stacks where they're used.

## An overview

For many simple sites and blogs, its typical to create a web application which consists of two primary components: [1] a page layout (i.e. header and footer), and [2] a small collection of database tables to manage content.

Static site generators use layout files which include some variety of a template syntax, combines them with content files, and generates simple HTML files. Because of this, you need not concern yourself with maintaining a database and, depending on your hosting solution, an application server. 

## Primary benefits

- __Fast__: Because the generated files are simple HTML files, they can be served directly rather than being processed by an application server.
- __Affordable__: There are several options to host your static sites *for free*. For example, you could store the files in a simple Dropbox folder, and use a service like [site44](http://www.site44.com/) to serve them from a custom domain. You can also serve a static site directly from a GitHub repository using  [these instructions](https://help.github.com/articles/setting-up-a-custom-domain-with-pages). My personal favorite solution, used for this blog, is [Amazon S3](http://aws.amazon.com/s3/), which is free for the first year, and pennies per month for smaller sites afterwards. Configuring a site on Amazon S3 is outside the scope of this article, and is something I'd like to write on later.
- __Simple__: Most static site generators require a layout, some content, and a basic understanding of the syntax used to link them. Jekyll uses Ruby, but you won't need to know much about Ruby in order to use it for your own sites.
- __Secure__: Because your site is simple HTML, there's significantly fewer points of potential malice. If you use a cloud hosting solution such as Amazon S3, server security is also a non-issue. As a result, you can concentrate on what really matters: the content itself.

## Popular Static Site Generators

Depending on your development environment, you may want to choose from one of the popular options below:

- Ruby
 - Jekyll: http://jekyllrb.com/
 - Middleman: http://middlemanapp.com/
- Python
 - Hyde: http://ringce.com/hyde
 - Pelican: http://docs.getpelican.com/en/3.1.1/
- Node.js
 - DocPad: http://docpad.org/docs/intro
 - Wintersmith: http://jnordberg.github.com/wintersmith/

## My blog

At this very moment, you are reading a site which has been generated using a custom static site generator. Code-named "Poole", it is a tool which I created primarily as a learning experiment. The source code of the project is available at the [GitHub repository](https://github.com/aduth/andrewduthie.com). Feel free to use it as reference for a simple static site project structure. If you're interested in working with Jekyll, check the source of some of the [many sites which use it](https://github.com/mojombo/jekyll/wiki/Sites).