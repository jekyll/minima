---
title: graphviz graphs w/ jekyll
---
Hello and welcome, to yet another one of my blabbering posts.
In this post, I will try to implement, explain and illustrate how to display a graphviz graph on your very own website... using jekyll and liquid ofcourse... 😬

### I. Using quickchart.io
Down below, is an non-interactive graphviz graph from quickcharts.io.

I simply embedded the graph into my markdown file as shown below;

```markdown
![quickchart.io graph](https://quickchart.io/graphviz?graph=graph{a--b})
```
Here we can see the result;

![quickchart.io graph](https://quickchart.io/graphviz?graph=graph{a--b})

For more complex charts –or rather all charts– (better safe than sorry) we should adopt a more distributed approach where our .dot graph file lives outside the bounds of our markdown file.

Here I've placed my `digraph_eg.dot` file under the `_posts>graphs` directory. Using the liquid `capture` tag I stored the graph in `my_graph` variable, like so;

{% highlight liquid %}
{% raw %}
{% capture my_graph%}
{% include_relative /graphs/digraph_eg.dot %}
{% endcapture %}
{% endraw %}
{% endhighlight %}

{% capture my_graph%}
{% include_relative /graphs/digraph_eg.dot %}
{% endcapture %}

if I print out `my_graph` here is what I get; 
{% highlight liquid %}
{{ my_graph }}
{% endhighlight liquid %}

and since quickcharts.io asks for a url encoded link, I use jekyll's `uri_escape` filter to encode it. Could have used liquid's `encode_url` filter as well, I guess... *idk*, **idc** 😁 but here's `my_graph` in url encoded version;
```
{{ my_graph | uri_escape }}
```

and here is the result once we tie it all together;

![complex_chart](https://quickchart.io/graphviz?graph={{ my_graph }})

At this point, we could also get rid of our external graphviz graph and simply capture it in a liquid variable as such;

{% highlight liquid %}
{% raw %}
{% capture dot_graph %} 
digraph {
  bgcolor="transparent"
  main->parse->execute;
  main->init;
  main->cleanup;
  execute->make_string;
  execute->printf;
  init->make_string;
  main->printf;
  execute->compare;
}
{% endcapture %}
{% endraw %}
{% endhighlight %}

and it will still render;

{% capture dot_graph %} 
digraph {
  bgcolor="transparent"
  main->parse->execute;
  main->init;
  main->cleanup;
  execute->make_string;
  execute->printf;
  init->make_string;
  main->printf;
  execute->compare;
}
{% endcapture %}

![complex_chart](https://quickchart.io/graphviz?graph={{ dot_graph }})

### II. Using [d3.js](https://github.com/d3/d3) & [d3-graphviz](https://github.com/magjac/d3-graphviz) & [hpcc-js/wasm](https://github.com/hpcc-systems/hpcc-js-wasm) libraries

#### a tester using magjac's bl.ocks.org example
taken from; <https://github.com/magjac/d3-graphviz>

<div id="graph" style="text-align: center;"></div>
<script>
d3.select("#graph").graphviz()
  .renderDot('digraph { graph [bgcolor=transparent;] a -> b}');
</script>

I've also tried to adopt [okamoto's](https://oko.io/howto/graphviz-in-markdown/) way of doing graphviz. Let's see a few examples of how the charts actually look like down 👇. The issue with these is that they sink all the way to the bottom of the markdown file organization... and I don't know how to fix them now...

**A graphviz chart example**
```dot
digraph G {
  bgcolor="transparent"
  rankdir = LR;
  a -> b
}
```

```dot
digraph G {
  bgcolor="transparent"
  b -> c 
}
```

credit : <https://oko.io/howto/graphviz-in-markdown/>



### III. Using viz.js modules

<!-- error : ends up, at the bottom of the page
<script>
var viz = new Viz();

viz.renderSVGElement('digraph { a -> b; b -> c }')
.then(function(element) {
  document.body.appendChild(element);
})
.catch(error => {
  // Create a new Viz instance (@see Caveats page for more info)
  viz = new Viz();

  // Possibly display the error
  console.error(error);
});
</script>
-->

### IV. Using Dagre?

