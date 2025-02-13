# frozen_string_literal: true

source "https://rubygems.org"
gemspec

gem "jekyll", ENV["JEKYLL_VERSION"] if ENV["JEKYLL_VERSION"]
gem "kramdown-parser-gfm" if ENV["JEKYLL_VERSION"] == "~> 3.9"

# Include logger (no-longer included by default from Ruby 3.5.0 onward).
# WARNING: logger was loaded from the standard library, but will no longer be
# part of the default gems starting from Ruby 3.5.0.
# You can add logger to your Gemfile or gemspec to silence this warning.
gem 'logger', '~> 1.6', '>= 1.6.5'
