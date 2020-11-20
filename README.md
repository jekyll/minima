# Minima
> Jekyll theme to support my sites containing writing about code


## Forking

Forked from [minima](https://github.com/jekyll/minima) repo for the styling and layouts.

With my own changes as:

- Additions to [\_layouts](/_layouts/) and [\_includes](/_includes/) which allow nesting of my content.
- Added SVGs logos from the SimpleIcons site or repo to this project, so they get added to project's assets.
- Removing unneeded pieces, like Travis config and shell scripts and some social icons.

Specifically I start my fork from tag `2.5.1`, since there are major changes after that. When using `master` of `minima` as a remote theme, I get this error:

```
  Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss':
                    Undefined variable: "$grey-color". on line 132

bundler: failed to load command: jekyll (/Users/mcurrin/repos/_static-sites/dev-cheatsheets/vendor/bundle/ruby/2.7.0/bin/jekyll)

  /Users/mcurrin/repos/_static-sites/dev-cheatsheets/vendor/bundle/ruby/2.7.0/gems/jekyll-sass-converter-1.5.2/lib/jekyll/converters/scss.rb:123:in `rescue in convert'
```

Maybe it is because there is a newer version of the SASS converter needed or things are loaded in the wrong order for the color to be picked up.


## License

The theme is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

See the base [LICENSE-source](/LICENSE-source).

See my own [LICENSE](/LICENSE) file.
