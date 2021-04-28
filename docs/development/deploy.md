# Deploy


## Build site

```sh
$ make build
```


## Release

When creating a release:

- Increment the version in the `.gemspec` file.
- Create a tag.


## GitHub Pages

Go to Settings of the repo.

Enable GitHub Pages.

Push to `master` and the site will build to GitHub Pages.


## Build gem

_If using the Remote Theme plugin to install this theme from a GitHub URL and not RubyGems, then you can skip this section._

Create a gem file for the theme to be installed from.

```sh
$ make build-gem
```

That will create a file at the root like:

- `fractal-3.3.0.gem`
