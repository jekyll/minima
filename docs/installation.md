# Installation
> How to configure your project to use this theme

Use this theme's layouts, includes files, SVG icons and dependencies by configuring this theme for your project. No forking needed.


## Install gems

The approach here works on GH Pages through the _Remote Theme_ plugin.

### Add to Gemfile

Set up your gems:

- `Gemfile` for Jekyll 4 and GH Actions.
    ```ruby
    source "https://rubygems.org"

    gem "jekyll", "~> 4.2"
    gem "webrick", "~> 1.7"

    gem "fractal", "~> 4", git: "https://github.com/MichaelCurrin/fractal"
    ```
- `Gemfile` for Jekyll 3 and GH Pages. The theme
    ```ruby
    source "https://rubygems.org"

    gem "jekyll", "~> 3.9"
    gem "kramdown-parser-gfm", "~> 1.1.0"
    gem "webrick", "~> 1.7"

    gem "fractal", git: "https://github.com/MichaelCurrin/fractal"
    ```
    - **Warning** - that setup does **not** pin a tag version of the theme. You just get the latest changes that are on `master`. You can look the version in Gemfile but then also need to lock Remote Theme theme with `@4` or similar.


e.g. [Gemfile](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/Gemfile) in Dev Cheatsheets.

### Add Remote theme

You can also add this if you want to use the Remote Theme plugin, to match the GitHub Pages flow closely. This step is optional, even if using Jekyll 3 and GH Pages.

```ruby
group :jekyll_plugins do
  gem "jekyll-remote-theme", "~> 0.4.3"
end
```

But you'll still want to keep the `fractal` line above to get the theme's dependencies (Remote Theme does not do that).

Note GitHub Pages ignores the contents of your Gemfile and uses locked depenencies.

### Install with Bundler

Then install project dependencies with Bundler:

```sh
$ bundle install
```


## Set up config files

This Dev Cheatsheets project is my Jekyll site that uses this theme and is a great example of how to setup your site.

- [![MichaelCurrin - dev-cheatsheets](https://img.shields.io/static/v1?label=MichaelCurrin&message=dev-cheatsheets&color=blue&logo=github)](https://github.com/MichaelCurrin/dev-cheatsheets)

Copy these files to your project and then adapt them as needed.

- [.gitignore](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/.gitignore)
- [\_config.yml](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/_config.yml) - Note the `Theme boilerplate` section
- [.editorconfig](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/.editorconfig) (optional)
- [Makefile](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/Makefile) (optional)

Notes on config file:

- Using Jekyll 4 and GH Actions.
    ```yaml
    theme: fractal
    ```
- Using Jekyll 3 and GH Pages - configure Remote Theme plugin and tell the theme you are using Jekyll 3.
    ```yaml
    remote_theme: MichaelCurrin/fractal
    ```
- You do **not** need to add the `plugins` key to use Remote Theme plugin. As it is already in the plugins group in `Gemfile` and GH Pages is able to pick up that gem and the theme's gems.

---

Go to the [Usage](usage.md) doc next.
