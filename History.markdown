## HEAD

### Documentation

  * Forward port v2.5.1 release (#399)
  * Docs: remove Google+ (#373)
  * Update README section on adding favicons to site (#438)
  * Fix custom-styles.scss name in README (#610)
  * Improve the msg to enable disqus in README (#627)
  * Make docs consistent with code (#657)
  * Highlight that the base branch is v3 (#719)
  * Improve documentation for config options (#760)
  * Add platform X supporting in README (#780)
  * Update readme_banner.svg to support dark mode (#813)
  * Add a warning regarding HEAD commit of `master` (#861)
  * Update google analytics README regarding G- and UA- tags (#689)
  * Fix typo in README (#895)

### Minor Enhancements

  * Add Keybase to social links (#400)
  * Solarized skins (#404)
  * Add a placeholder of favicons (#433)
  * fix: make page.list_title optional (#303)
  * Add stackoverflow to social media list (#443)
  * Add social support for dev.to (#410)
  * Add GitLab to social (#352)
  * Support mutiple authors on post layout (#348)
  * Re-implement site footer markup and styles (#448)
  * Support pagination through posts in home layout (#450)
  * Show the last modified date of posts (#432)
  * Set margins of hr to improve readability (#461)
  * Export a variable to let users to custom the font family of code (#462)
  * Set margin-bottom of pagination (#458)
  * Adjust margins of headings to make sections clear (#467)
  * Rename favicons.html to custom-head.html (#468)
  * Remove RSS icon from the social media list (#470)
  * Improve the readablility of blockquotes (#481)
  * Extract more color rules into skins (#452)
  * Introduce &#34;Dark Minima&#34; skin (#335)
  * Reduce spacing in the three largest headers (#538)
  * Add `auto` skin which honors the `prefers-color-scheme` media query (#634)
  * Add google scholar. (#673)
  * Add `x` social icon (#756)
  * Add Codeberg icon and update list of supported social links (#788)
  * Added whatsapp social icon. (#781)
  * Update GitLab icon (#765)
  * Add Bluesky to social media platforms (#799)
  * Simplify inserting markup before closing body tag (#854)
  * Render headings and text in different colors (#866)
  * Refresh styling of highlighted code snippet blocks (#875)
  * Adapt styles for GFM task-lists (#882)
  * Render link to feed as last item of social-links list (#888)
  * Adjust colors based on WCAG contrast criterion (#891)
  * Add styles to be in sync with Jekyll&#39;s `mark_lines` feature (#892)
  * Improve rendering of pagination pagers (#893)

### Major Enhancements

  * Allow skins to be defined and customized easily (#336)
  * Drop support for scalar &#39;author&#39; configuration (#384)
  * Place skins in `minima/skins` to clarify purpose (#479)
  * Add adaptive skin: `solarized` (#594)
  * Generate social iconsheet during build (#686)
  * Rename `default` layout to `base` (#690)
  * Render social platform icons via Font Awesome library (#839)
  * Move `show_excerpts` setting to be under `minima` namespace (#841)
  * Simplify `.wrapper` style definition (#852)
  * Improve navigation styling and experience (#856)
  * Set default `font-weight` of headings to `500` (#868)
  * Render comments via platform-agnostic inclusion (#886)

### Bug Fixes

  * Add missing rel=me attributes to social links (#386)
  * Set the border radius of highlight (#426)
  * Removed unnecessary whitespace-controls (#390)
  * fix: overflow auto for tables (#296)
  *  Add `overflow-wrap: break-word` to body tag (#321)
  * Use &#34;rem&#34; unit in relative-font-size mixin (#436)
  * Assign static value to variable outside forloop (#437)
  * Add font-size styles for elements h5 and h6 (#441)
  * Stop prefixing CSS calc with `-webkit-` (#445)
  * Improve readability of post titles with diacritics (#449)
  * Fix a bug of incorrect parsing of page.modified_date (#455)
  * Specify the font size of the root element (#485)
  * Fix script used for Google Analytics (#596)
  * Open social links in new tabs (#625)
  * change base-font-family sequence (#654)
  * Fix responsiveness of social SVG sprites (#677)
  * Improve &#34;Subscribe&#34; link in footer (#698)
  * Fix deprecation warnings from Dart Sass (#700)
  * Fix reference to base layout in `404.html` (#713)
  * Minimal fixes for Disqus (#775)
  * Fix deprecation warnings (#796) (#797)
  * Avoid clipping responsive social SVG icons (#808)
  * Update google-analytics.html (#824)
  * Fix Google Analytics script (#825)
  * Use single-quotes when nested within double-quoted attributes (#840)
  * Improve rendering of post header (#855)
  * Improve link underline styling (#857)
  * Replace `page.date` with `pdate` consistently in `post` layout (#859)
  * Reduce wrapper padding on small screens (#865)
  * Adjust the font size of blockquotes (#492)
  * Adjust table-text color based on heading-color (#869)
  * Adjust table border contrast (#872)
  * Toggle icons based on `#nav-trigger` state (#878)
  * Re-establish compatibility with legacy Sass engine (#880)
  * Delay loading font-awesome stylesheet from CDN (#883)
  * Undo fixed header (#884)
  * Render minimal site-nav on small screens (#885)
  * Fix invalid HTML (#330)

### Development Fixes

  * Ignore .jekyll-cache (#439)
  * Clean up and optimize .gitignore (#475)
  * [chore] Normalize Travis CI builds (#480)
  * chore(deps): bump Ruby version (#510)
  * Conditionally load GFM-parser gem in CI builds (#535)
  * Improve CI workflow configuration (#609)
  * Migrate from TravisCI to GitHub Actions (#633)
  * Build and deploy demo site via GH Action workflow (#636)
  * Improve readability of config file (#703)
  * Trigger demo-site build manually (#714)
  * Update History document for v2.5.2 (#803)
  * Move development config to a separate config file (#879)

## 2.5.2

### Bug Fixes

  * Fix deprecation warnings from Dart Sass (#801)

### Development Fixes

  * Set up CI for `2.5-stable` branch (#800)
  * Release gem from 2.5-stable via GitHub Actions (#802)

## 2.5.1

### Minor Enhancements

  * Allow use and testing with Jekyll 4.x (#398)

### Bug Fixes

  * Footer overlapping issue (Support Microsoft Explorer 11) (#248)
  * Update multiline config comment. (#346)

### Development Fixes

  * remove deprecated `sudo: false` in .travis.yml (#347)

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
