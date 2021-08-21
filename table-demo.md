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

[HTML table]: https://michaelcurrin.github.io/code-cookbook/recipes/jekyll/snippets/html-table.html

{{ site.header_pages }}

{% include table.html table_rows = page.authors %}
