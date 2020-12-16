# Gyan's website

Welcome to Gyan's website. This website runs on [Jekyll](https://jekyllrb.com/) and is hosted using [GitHub Pages](https://pages.github.com/). 

## What is Jekyll?

Jekyll is a static site generator. You write posts using Markdown, and Jekyll automatically compiles these posts into web pages. It's great if you don't want to use something like Medium to host your blog. It's not very complicated, but you might need to go through some documentation to set it up for the first time. 

## Jekyll themes

Jekyll themes can change the appearance of a Jekyll website without impacting the content. My website uses a heavily edited version of the default "minima" theme with some additional code for adding tags.

[Minima Theme preview](https://jekyll.github.io/minima/)

# I want to use this theme
You are free to fork this repository and use my theme, but I wrote it for my own use so it comes with very little documentation. I will hopefully clean it up at some point (but the chances of that happening are low).

Layouts
Refers to files within the _layouts directory, that define the markup for your theme.

default.html — The base layout that lays the foundation for subsequent layouts. The derived layouts inject their contents into this file at the line that says {{ content }} and are linked to this file via FrontMatter declaration layout: default.
home.html — The layout for your landing-page / home-page / index-page. [More Info.]
page.html — The layout for your documents that contain FrontMatter, but are not posts.
post.html — The layout for your posts.
Home Layout
home.html is a flexible HTML layout for the site's landing-page / home-page / index-page.

## License

The Jekyll theme for this website is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT). The content is not. Please don't steal my work.
