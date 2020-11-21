# Usage
> How to configure your project to use this theme

This works on GH Pages through the Remote Theme plugin.


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
2. Setup `_config.yml`:
    ```yaml
    plugins:
      - jekyll-feed
      - jekyll-sitemap
      - jekyll-titles-from-headings
      - jekyll-optional-front-matter
      - jekyll-remote-theme

    remote_theme: MichaelCurrin/minima

    titles_from_headings:
      strip_title: true
    ```
3. Install project dependencies with Bundle.
4. Serve your site locally with Jekyll.
5. Deploy to GitHub Pages.


**Warning** - this setup does not choose tag version. You just get the latest changes on `master`.
