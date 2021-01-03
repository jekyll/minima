# Installation
> How to configure your project to use this theme

Use this theme's layouts, includes files, SVG icons and dependencies by configuring this theme for your project. No forking needed.

The approach here works on GH Pages through the Remote Theme plugin.

**Warning** - this setup does not pin a tag version of the theme. You just get the latest changes that are on `master`.

1. Setup `Gemfile`. Versions should match [GH Pages dependency versions](https://pages.github.com/versions/) but marked as dots for placeholders.
    ```ruby
    source "https://rubygems.org"

    gem "jekyll", "~> 3.9"
    gem "kramdown-parser-gfm", "~> 1.1.0"

    gem 'minima', git: 'https://github.com/MichaelCurrin/minima'

    group :jekyll_plugins do
      gem "jekyll-remote-theme", "~> 0.4.2"
    end
    ```
2. Add a section to your `_config.yml` file. This covers theme use, plugin configs and default values. Note that you do **not** need to add `plugins` key to use Remote Theme plugin as it is already in the plugins group above.
    ```yaml
    ### Theme boilerplate ###

    remote_theme: MichaelCurrin/minima

    titles_from_headings:
      strip_title: true

    defaults:
      - scope:
          path: ""
        values:
          layout: "page"
    ```
5. Install project dependencies with Bundle.
    ```sh
    $ bundle install
    ```

Now you can serve your site locally.

```sh
$ bundle exec jekyll serve
```

Go to [Usage](usage.md) doc next.

### Note

Regarding default layout:

Warning - there are memory issues when using a pattern to define listing layout for `cheatsheets/**/index.md` or even `cheatsheets/*/index.md`.

And you can use path (and type) but not name. Therefore it is best to be explicit in each index file to set its layout.
