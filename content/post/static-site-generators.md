---
title: Static Site Generators
template: post
date: 2013-01-03 00:00:00 -5
description: An overview of static site generators, including purpose, benefits, and popular options.
---

As web developers, we most often work with dynamic web content. These days, it's rare to come in contact with plain old HTML files. That said, there are a growing number of tools which assist in the creation of static sites, aptly named _static site generators_. To cite a recent example, Kyle Rush [published an article](http://kylerush.net/blog/meet-the-obama-campaigns-250-million-fundraising-platform/) explaining how Obama's campaign team used Jekyll, arguably the most popular static site generator, to improve the performance of their $250 million fundraising platform. In this article, I will discuss the purpose of these tools, the benefits they provide, and several popular options to choose from.

## An overview

For a simple site or blog, it is not uncommon to create a basic web application consisting of two primary components: (1) a page layout (i.e. header and footer), and (2) a small collection of database tables to manage content. There really isn't a whole lot going on here, and the whole application server + database + hosting solution can become a real pain for such a simple project. If the goal is to simply wrap written content within the context of a master layout, this is hardly the simplest solution.

Static site generators are able to satisfy the same needs without the unnecessary complexity. As part of the build process, layouts are combined with content to generate simple HTML files. Layouts are likely to have some variation of a templating syntax, and content files can be written in Markdown or other familiar writing formats. As a result, you avoid the headache of the overhead which can accompany dynamic sites.

## Primary benefits

- __Fast__: Because the generated files are simple HTML files, they can be served directly rather than being processed by an application server.
- __Affordable__: There are several options to host your static sites *for free*. For example, you could store the files in a simple Dropbox folder, and use a service like [site44](http://www.site44.com/) to serve them from a custom domain. You can also serve a static site directly from a GitHub repository using  [these instructions](https://help.github.com/articles/setting-up-a-custom-domain-with-pages). For a more sturdy hosting solution, Amazon offers their [Simple Storage Service (S3)](http://aws.amazon.com/s3/) at a very affordable price for most sites.
- __Simple__: Most static site generators require a layout, some content, and a basic understanding of the syntax used to link them together. Jekyll uses Ruby, but you won't need to know much about Ruby in order to use it for your own sites.
- __Secure__: Because your site is simple HTML, there's significantly fewer security risks. As a result, you can concentrate on what really matters: the content itself.

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

## Conclusion

This blog itself is maintained using a custom static site generator. It's fairly basic, but the source code is available at the [GitHub repository](https://github.com/aduth/andrewduthie.com) in case you're curious about the project structure of a simple static site. Since this is a custom generator, it may be more relevant to refer to the source of some of the [many sites which use Jekyll](https://github.com/mojombo/jekyll/wiki/Sites).
