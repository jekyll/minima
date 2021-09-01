default: install

all: hooks install build build-gem

h help:
	@grep '^[a-z]' Makefile


.PHONY: hooks
hooks:
	cd .git/hooks && ln -s -f ../../hooks/pre-push pre-push

install:
	bundle config set --local path vendor/bundle
	bundle install

upgrade:
	bundle update


logos:
	bin/install_logos.sh

logos-commit:
	git add _includes/logos
	git commit -m "feat: update logos"


build-gem:
	gem build fractal.gemspec


# Demo site.

s serve:
	bundle exec jekyll serve --trace --livereload

build:
	JEKYLL_ENV=production bundle exec jekyll build --trace
