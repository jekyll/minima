---
title: CLI demo

cli:
  usage: |
    curl [OPTIONS...] URL
  flags:
    - flag: |
        `-I, --head`
      description: |
        Show headers only

        "Show document info only"
    - flag: |
        `-v`
      description: Verbose
---

## About

This page demonstrates basic use a Jekyll includes file to turn YAML frontmatter into a table of CLI commands.

See [HTML table][] recipe for Jekyll for more info on table rendering.

See [curl][] cheatsheet for a fuller example.


[HTML table]: https://michaelcurrin.github.io/code-cookbook/recipes/jekyll/snippets/html-table.html
[curl]: https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/shell/commands/curl.html


## CLI table

See on GitHub:

- [cli.html][] - includes file with Liquid templating.
- [cli-demo.md][] - this page, with frontmatter.

[cli.html]: https://github.com/{{ site.github_username }}{{ site.baseurl }}/blob/master/_includes/cli.html
[cli-demo.md]: https://github.com/{{ site.github_username }}{{ site.baseurl }}/blob/master/{{ page.path }}

**Code:**

{% raw %}

```liquid
{% include cli.html cli=page.cli %}
```

{% endraw %}

**Result:**

{% include cli.html cli=page.cli %}
