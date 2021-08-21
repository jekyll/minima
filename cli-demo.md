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

## CLI

{% include cli.html cli=page.cli %}
