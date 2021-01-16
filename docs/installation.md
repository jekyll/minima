# Installation
> How to configure your project to use this theme

Use this theme's layouts, includes files, SVG icons and dependencies by configuring this theme for your project. No forking needed.


## Install gems

The approach here works on GH Pages through the _Remote Theme_ plugin.


Setup up your Gemfile based on this file:

- [Gemfile](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/Gemfile)

**Warning** - that setup does **not** pin a tag version of the theme. You just get the latest changes that are on `master`.

Install project dependencies with Bundler:

```sh
$ bundle install
```


## Setup config files

This Dev Cheatsheets project is my Jekyll site that uses this theme and is a great example of how to setup your site.

[![MichaelCurrin - dev-cheatsheets](https://img.shields.io/static/v1?label=MichaelCurrin&message=dev-cheatsheets&color=blue&logo=github)](https://github.com/MichaelCurrin/dev-cheatsheets)

Copy these files to your project and then adapt them as needed.

- [.gitignore](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/.gitignore)
- [\_config.yml](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/_config.yml)
- [.editorconfig](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/.editorconfig) (optional)
- [Makefile](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/Makefile) (optional)

For the config file, note that you do **not** need to add the `plugins` key to use Remote Theme plugin. As it is already in the plugins group in `Gemfile` and GH Pages is able to pick up that gem and the theme's gems.

---

Go to the [Usage](usage.md) doc next.
