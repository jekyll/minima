default: install

h help:
	@grep '^[a-z]' Makefile

install:
	bundle config set --local path vendor/bundle
	bundle install

.PHONY: hooks
hooks:
	cd .git/hooks && ln -s -f ../../hooks/pre-push pre-push


build:
	gem build minima.gemspec

logos:
	bin/install_logos.sh


s serve:
	bundle exec jekyll serve --trace --livereload
