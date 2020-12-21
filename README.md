# Gyan's website

Welcome to Gyan's website. This website runs on [Jekyll](https://jekyllrb.com/) and is hosted using [GitHub Pages](https://pages.github.com/). 

## What is Jekyll?

Jekyll is a static site generator. You write posts using Markdown, and Jekyll automatically compiles these posts into web pages. It's great if you don't want to use something like Medium to host your blog. It's not very complicated, but you might need to go through some documentation to set it up for the first time. 

## Jekyll themes

Jekyll themes can change the appearance of a Jekyll website without impacting the content. My website uses a heavily edited version of the default "minima" theme with some additional code for adding tags.

[Minima Theme preview](https://jekyll.github.io/minima/)

# I want to use this theme
You are free to fork this repository and use my theme, but I wrote it for my own use so it comes with very little documentation. I will hopefully clean it up at some point (but the chances of that happening are low). Here's some information about how the directories are set up. 

## Layouts
Each layout file defines a specific type of page. They are .html files within the _layouts directory.

#### Home Layout
home.html — A flexible HTML layout for the site's landing-page / home-page / index-page.

#### Archive Layout
archive.html — An HTML layout that lists all posts on the blog in a reverse-chronological order.

#### Post Layout
post.html — The layout for your posts.

#### Tag Page Layout
tagpage.html — The layout for a page that shows every post with a given tag, and some information about the tag.

#### Page Layout
page.html — The layout for your documents that contain FrontMatter, but are not posts.

#### Default layout
default.html — The base layout that lays the foundation for subsequent layouts. The derived layouts inject their contents into this file at the line that says {{ content }} and are linked to this file via FrontMatter declaration layout: default.

## Posts
The blog posts go in the _posts directory. Each post is a .md file named using the yyyy-mm-dd-url-here convention. You can add some metadata like the title, subtitle, tags, custom permalink and a thumbnail. 

```
---
layout: post
title: "Stats for Research Methods"
subtitle: Research for <del>dummies</del> designers
tags: slides
permalink: /drm-cheatsheet
thumbnail: https://gyanl.com/assets/thumbs/drm.png
---
```
## SASS
Jekyll uses [SASS](https://sass-lang.com/) to allow for some extra functionality over raw CSS, like the ability to define color variables. The SASS files gets automatically compiled to a single CSS when you run Jekyll, and get stored in the /assets/css folder.


## Assets
All your images and other assets go here.


## License

The Jekyll theme for this website is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT). The content is not. Please don't steal my work.
