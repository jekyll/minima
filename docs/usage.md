# Usage
> How to configure your project to use this theme

This works on GH Pages through the Remote Theme plugin.

**Warning** - this setup does not choose a tag version for the theme. You just get the latest changes on `master`.


1. Setup `Gemfile`. Version should match GH Pages dependencies.
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
2. Setup `_config.yml` with plugins.
    ```yaml
    plugins:
      - jekyll-remote-theme

    remote_theme: MichaelCurrin/minima

    titles_from_headings:
      strip_title: true
    ```
4. Add default layout.
    ```yaml
    # Warning - there are memory issues when using a pattern to define listing
    # layout for `cheatsheets/**/index.md` or even `cheatsheets/*/index.md`.
    # And you can only use path (and type) and not name.
    # Therefore it is best to be explicit in each index file to set its layout.
    defaults:
      - scope:
          path: ""
        values:
          layout: "page"
    ```
5. Install project dependencies with Bundle.
6. Serve your site locally with Jekyll.


You can push your site to GitHub and setup a deploy to GitHub Pages.
