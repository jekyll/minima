# Development
> Notes for developers working on this project

If you just want to use this theme in your project, see [Usage](usage.md) doc.

Note that adding the config file to the `.gemspec` list did not let the values be used in a downstream site.


## Versioning

When creating a release:

- Increment the version in `.gemspec` file.
- Create a tag.


## Logos

The SVG icons or logos are stored in the [\_includes/logos](/_includes/logos/) directory as includes files. This is easier to manage than assets as it allows the content of the file to be inserted inline in HTML, rather than referencing a path to an asset which has to be fetched on the frontend.

You could use the You can use the includes files in your project directly. But the intention is to set `logo: vue-dot-js` for example on a page, then this theme will find the appropriate includes file and use it. It will give an error a file is missing or referenced incorrectly, so you can find out at build time if you need to change your logo parameter or need to add a new logo file to this theme so you can use it.

### How to update logos

The list of supported logos in this project is maintained in [bin/install_logos.sh](/bin/install_logos.sh). More logos are available, but that covers the logos that I want to use. The names of the logos are kept as they are on the SimpleIcons site. e.g. `vue-dot-js` or `gnu-bash`.

You can add a new logo name to that script. Then run it.

Here is the shorthand.

```sh
$ make logos
```

That will also _update_ an existing logos in version control to match the latest content in the logo provider.

Then commit any changes and push your commits. When you rebuild a site that uses this theme, you'll get the updates.

If you want to add a new logo from the SimpleIcons repo, add the name to the `LOGOS` variable in the script in [bin](/bin/). Then run the command above.


## Setup dev server
> How to setup this theme as a standalone project

Clone and install with Bundle.

Start a server.

```sh
make serve
```


## Plugins

Here are the plugins used in the `.gemspec` file. They don't have to be enabled in the config though for the theme or another project. They all work by just being installed.

1. `jekyll-feed`
2. `jekyll-seo-tag`
3. [jekyll-optional-front-matter](https://rubygems.org/gems/jekyll-optional-front-matter)
    - Process a page without frontmatter.
4. [jekyll-title-from-headings](https://rubygems.org/gems/jekyll-titles-from-headings/versions/0.5.3)
    - To turn the first line of the page into `page.title`. This is setup in the config to hide the title, as there is a layout to take care that of that already.
5. `jekyll-sitemap`

The first two come from the base Minima theme.

The next two allow use of H1 titles without frontmatter.

To help with that, the `titles_from_headings` should be set in the config as per the [Usage](usage.md) doc.


## Editing

Recommended tool for markdown editing of content in projects that use this theme:

- [stackedit.io](https://stackedit.io/)

Warning: Adjust the autosave to be say every 5 or 10 minutes so it doesn't trigger a site rebuild every 2 minutes.


## Structure

The menus are auto-generated at each level to make it easy to nest content several layers down and not change a menu manually each time. The approach is in this project comes from this prototype project:

- [github.com/MichaelCurrin/nested-jekyll-menus](https://github.com/MichaelCurrin/nested-jekyll-menus/)

Put content in the `cheatsheets` or `recipes` directory of the downstream project.

This helps when iterating over `site.pages` to separate unrelated page which do not have a prefix - see for example:

- `cheatsheets/base64.md`
- `sitemap.xml`
- `feed.xml`
- `assets/main.scss`
- `cheatsheets/shell/zsh.md`


## Find files with bad layout

Each `index.md` file needs to have `layout: listing` set manually but this can be forgotten. And setting is programmatically has a serious negative impact on memory and therefore build time.

Find all `index.md` files which do not match the layout.

```sh
$ grep -L listing $(find . -type f -name index.md )
```

Sample output before these were fixed:

```
cheatsheets/python/configs/index.md
cheatsheets/javascript/linting/index.md
cheatsheets/javascript/general/index.md
```


## Breadcrumbs

Note on [breadcrumbs.html](/_includes/breadcrumbs.html) and the [path-to-link](/_includes/path-to-link.html).

Split the current path then build up breadcrumbs using home up to
a point and turn that into a link.

Note first two pieces of crumbs are ["", "cheatsheets"].

The outer if statement is to hide entire breadcrumbs section on Home and Cheatsheets pages.

Use the range of `2` to the number of crumbs with `crumbs.size` so that the Home page gets excluded. The value of `2` is used because we slice from `0` (Home) to `1` (Cheatsheets) and so need `2` as one value higher to be inclusive of the `1`.

A naïve approach for breadcrumbs just splits the URL and uses capitalize on the pieces, but that does not work for abbreviations ("NPM Command" -> "Npm Command").

So instead we look up the relevant index.md page and use its title.
But we can't just use the first page we find as there could be duplicate folder names.

Therefore rather than using split pieces, we use the full path (a, then a/b then a/b/c) to find the index files.

Each piece of the breadcrumb pieces needs a bigger slice to build a URL and then find the path. So we use `slice: 0, forloop.index` to get the URL for the first breadcrumb (slice 0 and 1), then the second (slice 0 and 2).