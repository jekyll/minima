# Usage
> How to configure your project to use this theme

Use this theme's layouts, includes files, SVG icons and dependencies by configuring this theme for your project. No forking needed.

The approach here works on GH Pages through the Remote Theme plugin.

**Warning** - this setup does not pin a tag version of the theme. You just get the latest changes that are on `master`.


1. Setup `Gemfile`. Versions should match [GH Pages dependency versions](https://pages.github.com/versions/) but marked as dots for placeholders.
    ```ruby
    source "https://rubygems.org"

    gem "jekyll", "..."
    gem "kramdown-parser-gfm", "..."

    # Used locally to pull in subdependencies.
    gem 'minima', git: 'https://github.com/MichaelCurrin/minima'

    group :jekyll_plugins do
      gem "jekyll-remote-theme", "..."
    end
    ```
2. Setup `_config.yml` with theme, plugins and layout settings. Note that you do not need to add `plugins` key to use Remote Theme plugin.
    ```yaml
    ### Theme boilerplate

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
6. Serve your site locally with Jekyll.


You can push your site to GitHub and setup a deploy to GitHub Pages.

### Note

Regarding default layout:

Warning - there are memory issues when using a pattern to define listing
layout for `cheatsheets/**/index.md` or even `cheatsheets/*/index.md`.

And you can only use path (and type) and not name.
Therefore it is best to be explicit in each index file to set its layout.
