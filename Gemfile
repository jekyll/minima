# frozen_string_literal: true

source 'https://rubygems.org'

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

gem 'jekyll', '~> 4.2'
# If you want to use GitHub Pages, remove the 'gem 'jekyll'' above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem 'github-pages', '~> 219', group: :jekyll_plugins
gem 'jekyll-include-cache', group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem 'kramdown-parser-gfm' if ENV['JEKYLL_VERSION'] == '~> 3.9'
# gem 'asciidoctor'
  gem 'asciidoctor-diagram', '~> 2.2'
# gem 'jekyll-asciidoc', '~> 3.0'
  gem 'jekyll-asciidoc', github: 'asciidoctor/jekyll-asciidoc'
  gem 'minitest', '~> 5.14', '>= 5.14.4'
  gem 'rake', '~> 13.0', '>= 13.0.6'
  gem 'minima', '~> 2.5'
  gem 'jemoji', '~> 0.12.0'
  gem 'titleize', '~> 1.4', '>= 1.4.1'
  gem 'jekyll-remote-theme', '~> 0.4.3'
  gem 'jekyll-timeago', '~> 0.13.1'
  gem 'jekyll-feed', '~> 0.12'
  gem 'jekyll-sitemap', '~>1.4'
  gem 'jekyll-archives', '~> 2.2', '>= 2.2.1'
  gem 'jekyll-scholar', '~> 7.0'
  gem 'jekyll-webp', '~> 1.0'
  gem 'jekyll-loading-lazy', '~> 0.1.1'
# gem 'jekyll-latex', '~> 1.1'
# gem 'jekyll-spaceship', '~> 0.10.2'
  gem 'jekyll_figure', '~> 0.0.3'
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem 'tzinfo', '~> 1.2'
  gem 'tzinfo-data'
end

# Performance-booster for watching directories on Windows
gem 'wdm', '~> 0.1.1', :platforms => [:mingw, :x64_mingw, :mswin]
gem 'eventmachine', '1.2.7', git: 'https://github.com/eventmachine/eventmachine.git', tag: 'v1.2.7'