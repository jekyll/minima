---
layout: projectpost
title: "LosPinos Jekylliis"
school: uiuc
categories: retail
team:
  - Berkhan Eminsoy
  - Goose McGoose 
image_sliders:
  - losPinos_slider
#image_sliders_load_all: true
---
### slider w/ includes
<p>link + collection file dir =  {% link _projects/2021-11-25-losPinos-jekylliis.md %}</p>
<p>site.url | relative_url = {{ site.url | relative_url }}</p>
<p>page.url | relative_url = {{ page.url | relative_url }}</p>
<p>page.path = {{ page.path }}</p>
<p>page.path split+slice+join = {{ page.path | split: "/" | slice: 0, 2 | join: "/" }}</p>
<p>page.relative_path = {{ page.relative_path }}</p>
<p>page.title = {{ page.title }}</p>
<p>page.dir = {{ site.projects.directory }}</p>
<p>page.relative_dir = {{ site.projects.relative_directory }}</p>
{% comment %}{% endcomment %}<p>link + page.path = {% link {{ page.path | split: "/" | slice: 0, 2 | join: "/" }} %}</p>
{% comment %}<p>link + page.relative_path = {% link {{ page.relative_path }} %}</p>{% endcomment %}
{% comment %}
this is a piece of code that could work with Jeklly ~> 4.0
{%- if "link page.relative_path" != "link _projects/2021-11-25-losPinos-jekylliis.md" -%}
  {%- include slider.html selector="losPinos_slider" -%}
{%- endif -%}
{% endcomment %}
{% comment %}
{%- if page.path contains "excerpt" -%}
  {%- include slider.html selector="losPinos_slider" -%}
{%- endif -%}
{% endcomment %}
{% comment %}{% endcomment %}{%- include slider.html selector="losPinos_slider" -%}
Within the heavily embargoed context of modern day Cuba, it is not surprising to see housing shortages, especially where it is high in need –neighborhoods where working Cuban families live. Although being responsible for the upkeep and maintenance of the historic Havana neighborhoods such as La Habana Vieja, Centro Habana or El Vedado, they are not the major shareholders when it comes to splitting the spoils from the precipitously rising tourism revenues. Besides the profit, these neighborhoods are last in line when it comes to municipal hierarchy. Additionally, given the stringent conditions of the real estate/housing market, the best way to upgrade is to expand your unit with materials gathered slowly over time or wait years for a matching apartment swap to turn up. This situation engenders shoddy informal additions to pop up around the city with no stop in sight.

Consolidating building materials already committed to a local public housing project by the Housing and Savings Ministry of Cuba (INAV) into adaptable novel panels that are lightweight and easily navigable, this project aims to bring a formal and institutional approach to past and ongoing rogue expansions happening within the existing housing stock to meet the dire need of housing.