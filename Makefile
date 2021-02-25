default: install

h help:
	@grep '^[a-z]' Makefile

all: install build gem


install:
	bundle config set --local path vendor/bundle
	bundle install

.PHONY: hooks
hooks:
	cd .git/hooks && ln -s -f ../../hooks/pre-push pre-push


logos:
	bin/install_logos.sh

gem:
	gem build fractal.gemspec


s serve:
	bundle exec jekyll serve --trace --livereload

build:
	JEKYLL_ENV=production bundle exec jekyll build --trace
