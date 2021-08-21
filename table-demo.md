---
title: Table demo

authors:
  - 'First name': John
    'Last name': Doe
    Age: 35
    Location: United States
  - 'First name': Jane
    'Last name': Doe
    Age: 29
    Location: France
  - 'First name': Jack
    'Last name': Hill
    Age: 25
    Location: Australia
---

Showcase of using Liquid to render data as an [HTML table][].

Here using data set in the frontmatter, but you could reference the config or a data file instead.

{% include table.html table_rows = page.authors %}


[HTML table]: https://michaelcurrin.github.io/code-cookbook/recipes/jekyll/snippets/html-table.html
