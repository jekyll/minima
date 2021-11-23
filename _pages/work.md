---
layout: projectpost
title: work
#permalink: /about/
---
<h3>architectural works</h3>
<ul>
  {%- for project in site.projects -%}
    <li>
      <h4>{{ project.title}}</h4>
      <h4>{{ project.school}}</h4>
      <p>{{ project.content | markdownify }}</p>
    </li>
  {%- endfor -%}
</ul>