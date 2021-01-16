# Installation
> How to configure your project to use this theme

Use this theme's layouts, includes files, SVG icons and dependencies by configuring this theme for your project. No forking needed.

The approach here works on GH Pages through the Remote Theme plugin.

**Warning** - this setup below does **not** pin a tag version of the theme. You just get the latest changes that are on `master`.


## Config files



## Configuration

This Dev Cheatsheets project is my Jekyll site that uses this theme and is a great example of how to setup your site.

[![MichaelCurrin - dev-cheatsheets](https://img.shields.io/static/v1?label=MichaelCurrin&message=dev-cheatsheets&color=blue&logo=github)](https://github.com/MichaelCurrin/dev-cheatsheets)

Its config files are linked below:

- [.gitignore](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/.gitignore)
- [Gemfile](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/Gemfile)
- [\_config.yml](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/_config.yml)
- [.editorconfig](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/.editorconfig) (optional)
- [Makefile](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/Makefile) (optional)

You can start by copying the whole `_config.yml` file to your project and then adjust it. That is preferable to using this theme's own config, which has some parts you won't need.

This covers theme, plugin configs and default values. Note that you do **not** need to add the `plugins` key to use Remote Theme plugin as it is already in the plugins group above and GH Pages it able to pick it up.


## Install gems

Install project dependencies with Bundle.
```sh
$ bundle install
```

Go to the [Usage](usage.md) doc next.
