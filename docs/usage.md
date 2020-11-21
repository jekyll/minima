# Usage
> Configure your project to use this theme

This works on GH Pages through the Remote Theme plugin.


- Setup `_config.yml`:
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
- Setup `Gemfile`
    ```ruby
    source "https://rubygems.org"

    gem "jekyll", "..."
    gem "kramdown-parser-gfm", "..."

    # Used locally to pull in subdependencies.
    gem 'minima', git: 'https://github.com/MichaelCurrin/minima'

    group :jekyll_plugins do
      gem "jekyll-remote-theme", "0.4.2"
    end
    ```
