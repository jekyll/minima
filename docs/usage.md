# Usage
> How to adjust your project to use this theme

You'll also have to setup your config, content and ignore file as with any Jekyll project.

And use the `layout: listing` frontmatter for any index pages besides the homepage.

See for example this repo:

[![MichaelCurrin - dev-cheatsheets](https://img.shields.io/static/v1?label=MichaelCurrin&message=dev-cheatsheets&color=blue&logo=github)](https://github.com/MichaelCurrin/dev-cheatsheets)

In particular, see the structure below. This gives you an idea of the pattern for your project.

| Description                       | Path                                     | Layout    |
| --------------------------------- | ---------------------------------------- | --------- |
| Homepage                          | [index.md][0]                            | `home`    |
| Top-level list of topics          | [cheatsheets/index.md][1]                | `listing` |
| Topic - one level down            | [cheatsheets/jekyll/index.md][2]         | `listing` |
| A sibling page of the topic index | [cheatsheets/jekyll/permalinks.md][3]    | `page`    |
| Topic - two levels down           | [cheatsheets/jekyll/configuration.md][4] | `listing` |

The `page` layout is set using config defaults. The `listing` layout must be set in place where needed.

[0]: https://github.com/MichaelCurrin/dev-cheatsheets/blob/master//index.md
[1]: https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/cheatsheets/index.md
[2]: https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/cheatsheets/jekyll/index.md
[3]: https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/cheatsheets/jekyll/permalinks.md
[4]: https://github.com/MichaelCurrin/dev-cheatsheets/tree/master/cheatsheets/jekyll/configuration
