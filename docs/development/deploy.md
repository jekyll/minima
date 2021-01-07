# Deploy


## GitHub Pages

Go to Settings of the repo.

Enable GitHub Pages.

Push to `master` and the site will build to GitHub Pages.


## Release

When creating a release:

- Increment the version in `.gemspec` file.
- Create a tag.


## Build gem

```sh
$ make build
```

That will create a file at the root like:

- `minima-3.3.0.gem`
