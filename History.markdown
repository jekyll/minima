## 2.1.0 / 2016-11-15

### Minor Enhancements

  * Update gemspec to require at least Jekyll 3.3 (#59)
  * Use `absolute_url` filter for disqus (#66)
  * replace `example/index.html` with `example/index.md` (#58)

### Development Fixes

  * Example should require Jekyll 3.3 (#61)

## 2.0.0 / 2016-10-06

### Minor Enhancements

  * priority to site.url when site.github.url is available (#46)
  * Move contents of the index.html page to the 'home' layout (#48)
  * Use  new `absolute_url` and `relative_url` filters in minima (#57)

### Development Fixes

  * Use standardized tab size of 2 spaces (#44)

### Major Enhancements

  * move `css/` directory from jekyll into `assets/` (#43)

### Bug Fixes

  * Fix html proofer errors (#49)
  * Update gem regex to include new `assets` directory (#54)

## 1.2.0 / 2016-09-12

### Minor Enhancements

  * Look to site.url when available (#35)

### Documentation

  * Move instruction for CSS in install section (#37)

## 1.1.0 / 2016-09-07

### Major Enhancements

  * Add support to Disqus (#21)
  * Google analytics support (#26)
  * Look for `site.github.url` if it exists (#25)

### Minor Enhancements

  * Fixed Flash Of Unstyled SVG (#12)
  * Added "author" in footer instead of double title (#22)

### Documentation

  * Document how to link to the theme styles (#18)
  * Update Example to resemble Default site (#24)

### Development Enhancements

  * Use upstream gemspec file matcher (#9)
  * Fix gemspec regex (#31)
  * Add Travis and a basic smoke test (#33)

## 1.0.1 / 2016-07-28

  * include `_layouts`, `_includes`, and `_sass` dir in gem (#6)

## 1.0.0 / 2016-07-27

  * default layout: html `lang` attribute should allow user customization (#3)
  * Use `normalize_whitespace` filter for meta description (#4)
  * Fix repo's URL in contributing (#5)
