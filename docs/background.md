# Background

This project is forked from [minima](https://github.com/jekyll/minima) repo for the styling and layouts.

With my own changes as:

- Added to [\_layouts](/_layouts/) and [\_includes](/_includes/) which allow **nesting** of my content.
- Added SVGs **logos** from the SimpleIcons site or repo to this project, so they get added to project's assets.
- Add **dependencies** to the `.gemspec` file which suit my sites, to save having them in downstream project.
- Removed **unneeded** pieces, like Travis config and shell scripts and some social icons.
- Added a `404.html` layout.

Specifically I started my fork from tag `2.5.1`, since there are major changes after that. When using `master` of `minima` as a remote theme, I get this error:

```
  Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss':
                    Undefined variable: "$grey-color". on line 132

bundler: failed to load command: jekyll (/Users/mcurrin/repos/_static-sites/dev-cheatsheets/vendor/bundle/ruby/2.7.0/bin/jekyll)

  /Users/mcurrin/repos/_static-sites/dev-cheatsheets/vendor/bundle/ruby/2.7.0/gems/jekyll-sass-converter-1.5.2/lib/jekyll/converters/scss.rb:123:in `rescue in convert'
```

Maybe it is because there is a newer version of the SASS converter needed or things are loaded in the wrong order for the color to be picked up. Or the original `minima` theme was still installed locally and conflicting.
