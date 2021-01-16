# Usage
> How to adjust your project to use this theme


## Configuration

This Jekyll site uses this theme and is a great example of how to setup your site.

[![MichaelCurrin - dev-cheatsheets](https://img.shields.io/static/v1?label=MichaelCurrin&message=dev-cheatsheets&color=blue&logo=github)](https://github.com/MichaelCurrin/dev-cheatsheets)

Its config files are linked below:

- [.gitignore](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/.gitignore)
- [Gemfile](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/Gemfile)
- [\_config.yml](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/_config.yml)
- [.editorconfig](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/.editorconfig) (optional)
- [Makefile](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/Makefile) (optional)

You can start by copying the whole `_config.yml` file to your project and then adjust it. That is preferable to using this theme's own config, which has some parts you won't need.


## Nested structure

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

You can keep your project content-focused. Rely on the theme - you not need any `_includes` or `_layout` files. You can always add to or overwrite them.
