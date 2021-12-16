---
title: the Eminsoys
---
a graphviz family tree of my family tree...

{% capture eminsoy_familyTree %}
{% include /charts/eminsoy_familyTree.dot %}
{% endcapture %}

<img id="eminsoy_familyTree" alt="eminsoy_familyTree" src="https://quickchart.io/graphviz?graph={{ eminsoy_familyTree | url_encode }}">

![complex_chart](https://quickchart.io/graphviz?graph={{ eminsoy_familyTree | url_encode }})

<div id="eminsoy_familyTreeDiv" style="text-align: center;"></div>

<!--this method uses the d3-graphviz library
-->
<script type="text/javascript">
d3.select("#eminsoy_familyTreeDiv").graphviz().renderDot('{{- eminsoy_familyTree | remove:" " | strip_newlines -}}');
</script>

does it stay in order as well?

## Can we do it w/ D3? Sure must be te answer;

{% include js/eminsoyFamTreeD3.html %}

last sentence in the post.

