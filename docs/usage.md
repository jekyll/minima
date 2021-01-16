# Usage
> How to adjust your project to use this theme

This section follows from the [Installation](installation.md) doc.


## Start dev server

How to serve your Jekyll server locally. The flag below is for more verbose errors.

```sh
$ bundle exec jekyll serve --trace
```

To adapt your project to use this theme structure and styling properly, continue below.


## Nested structure

To make the post of this theme, you'll want to make sure you have nested directories and  `index.md` files at each level.

See this theme's own demo files for a reference on minimal content for your project.

| Description                       | Path                                          | Layout |
| --------------------------------- | --------------------------------------------- | ------ |
| Homepage                          | [index.md](/index.md)                         | `home` |
| Top-level list of topics          | [demo/index.md](/demo/index.md)               | `page` |
| Topic - one level down            | [demo/python/index.md](/demo/python/index.md) | `page` |
| A sibling page of the topic index | [demo/python/pypi.md](/demo/python/pypi.md)   | `page` |
| 404 Not Found                     | [404.html](/404.html)                         | `404`  |

For more real-world use, see Dev Cheatsheets:

| Description                       | Path                                     | Layout |
| --------------------------------- | ---------------------------------------- | ------ |
| Homepage                          | [index.md][0]                            | `home` |
| Top-level list of topics          | [cheatsheets/index.md][1]                | `page` |
| Topic - one level down            | [cheatsheets/jekyll/index.md][2]         | `page` |
| A sibling page of the topic index | [cheatsheets/jekyll/permalinks.md][3]    | `page` |
| Topic - two levels down           | [cheatsheets/jekyll/configuration.md][4] | `page` |
| 404 Not Found                     | [404.html][5]                            | `404`  |

[0]: https://github.com/MichaelCurrin/dev-cheatsheets/blob/master//index.md
[1]: https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/cheatsheets/index.md
[2]: https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/cheatsheets/jekyll/index.md
[3]: https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/cheatsheets/jekyll/permalinks.md
[4]: https://github.com/MichaelCurrin/dev-cheatsheets/tree/master/cheatsheets/jekyll/configuration
[5]: https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/404.html


## What you don't need

You do not need to make any collections.

You do not need to set the `layout` field on any pages besides your homepage as `layout: home`, since the `page` was setup in your config file.

As with other Jekyll themes, the idea is to keep your project content-focused and let the theme handle the styling. You not need any `_includes` or `_layout` files. You can always add to or overwrite them.
