---
title: the Eminsoys
---
### The Eminsoy's in *Graphviz*
a graphviz family tree of my family tree... 😃

{% capture eminsoy_familyTree %}
{% include /charts/eminsoy_familyTree.dot %}
{% endcapture %}

```dot
{{- eminsoy_familyTree -}}
```

#### The Eminsoy's in Graphviz *using quickchart.io*
Over here, trying to render it using quickchart.io...
not working at the moment 😬

<img id="eminsoy_familyTree" alt="eminsoy_familyTree" src="https://quickchart.io/graphviz?graph={{- eminsoy_familyTree | strip_newlines | url_encode -}}"><!--liquid filters are applied left to right-->

<!--
![complex_chart](https://quickchart.io/graphviz?graph={{ eminsoy_familyTree | url_encode }})
-->

### Using only D3

Can we do it using purely D3, *without D3-Graphviz*? Sure must be the answer. The graph below is a stab at that effort with fake names but we can see how it could be scaled to bigger/real families.

{% include js/eminsoyFamTreeD3.html %}

*to be continued...*

