## HEAD

### Bug Fixes

  * Footer overlapping issue (Support Microsoft Explorer 11) (#248)

## 2.5.0

### Bug Fixes

  * Add `jekyll-feed` plugin in config (#228)

### Minor Enhancements

  * Stick footer for short posts (#223)
  * Consolidate trigger SVG paths (#148)

## 2.4.1

### Bug Fixes

  * Reintroduce removed social includes for backwards compatibility (#217)

## 2.4.0

### Minor Enhancements

  * Add better system fonts (#205)
  * Remove whitespace due to Liquid tags in generated HTML (#202)
  * Adding Mastodon to the social networks (#198)

### Bug Fixes

  * social icons should resolve baseurl properly (#201)
  * fix: styling main element in IE 11 (#199)

### Documentation

  * Improve thw wording in index.md (#175)
  * Update config description comment (#203)

## 2.3.0

  * Add option to show excerpts on the homepage (#90)
  * Handle RSS feed with jekyll-feed (#183)
  * Test build with Ruby 2.4 on CI (#184)
  * Document how to customize navigation links (#192)

## 2.2.1

  * Revert social_sites hash for retrocompatibility (#190)

## 2.2.0

### Minor Enhancements

  * handling content outside of posts (#88)
  * Add default table styles (#144)
  * Add `jekyll-seo-tag` dependency (#139)
  * Add Microformats markup (#160)
  * Add more social links (#141)

### Documentation

  * Docs: clarification about page title (#142)

## 2.1.1 / 2017-04-13

### Minor Enhancements

  * Close #55: Improve mobile user experience (#62)
  * Remove incomplete status from spec summary (#63)
  * Use date_format if set in configuration (#70)
  * Corrected misspelled word (#72)
  * Scale headings relative to base-font-size (#78)
  * Remove 2.0 post-install message (#82)
  * Fixes #115 - Only include the nav tag if there are pages to be displayed in the menu (#116)
  * Fixes #80, #106. Make the hamburger work with pure CSS. (#111)
  * add `header_pages` config to link only specific files in header (#52)
  * More easily customizable CSS (#117)
  * Use relative size for fonts and line-height (#103)
  * Add 404 page from jekyll `master` (#121)

### Development Fixes

  * Remove duplicate .sass-cache  (#71)
  * Demo minima on GitHub Pages (#76)
  * Remove the Rakefile (#118)

### Documentation

  * Update README with theme content description (#91)
  * Update default local URL (#120)

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
