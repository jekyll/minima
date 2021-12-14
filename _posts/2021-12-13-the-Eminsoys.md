---
title: the Eminsoys
---
a graphviz family tree of my family tree...

{% capture eminsoy_familyTree %}
{% include_relative /graphs/eminsoy_familyTree.dot %}
{% endcapture %}

<img id="eminsoy_familyTree" alt="eminsoy_familyTree" src="https://quickchart.io/graphviz?graph={{ eminsoy_familyTree | url_encode }}">

![complex_chart](https://quickchart.io/graphviz?graph={{ eminsoy_familyTree | url_encode }})

<div id="eminsoy_familyTreeDiv" style="text-align: center;"></div>

does it stay in order as well?