---
title: graphviz graphs w/ jekyll
---
Hello and welcome, to another one of my posts geared towards amateurs with a head-first mentality to website development.
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
{% include /charts/digraph_eg.dot %}
{% endcapture %}
{% endraw %}
{% endhighlight %}

{% capture my_graph%}
{% include /charts/digraph_eg.dot %}
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

This method is... I would say, is a bit more complex but does not rely on a 3rd-party service such as quickcharts. It uses d3 & d3-graphviz & d3-graphviz libraries –which are all open source– to render the graphviz chart.

#### a tester using magjac's bl.ocks.org example
To test out the method we head over to [magjac's](https://github.com/magjac/d3-graphviz) and check-out [this example](https://bl.ocks.org/magjac/a23d1f1405c2334f288a9cca4c0ef05b)

<div class="graphviz-svg" style="text-align: center;"></div>
<script>
d3.select(".graphviz-svg").graphviz()
  .renderDot('digraph { graph [bgcolor=transparent;] a -> b}');
</script>

As you may have noticed, the svg is clipped within the div and  I haven't delved too deeply into the code (because I don't want to, and I can't... since I've decided to take a head-first approach to all of this 😬) to figure out a way to properly display it within the parent `<div>`, but fear not, we haven't ran out of ammo...

#### [Jacob Okamoto](https://oko.io/)'s snippet to the rescue
I've found out about [okamoto's](https://oko.io/howto/graphviz-in-markdown/) way of doing graphviz in markdown while cruising the interwebs. My first attempt at adopting his code worked pretty well except for the fact that the `D3ize` function would append all the rendered `graphviz-svg` divs to the bottom of the post, since `post-content` is the parent-element to our `.dot` code snippet highlight.

To get around this issue, I've taken a different route. I insert the `graphviz-div` inside the div created by the markdown code-block, and once the for-loop *D3izes* over each of the elements, I hide the `highlight` div of the `language-dot` code-block div. It's not prettiest, but it gets the job done.

Let's see a few examples of how the charts actually look like down 👇.

**A graphviz chart example**
```
digraph G {
  bgcolor="transparent"
  rankdir = LR;
  a -> b
  b -> c
}
```

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

This method works too I guess 😃 I'm using viz.js locally and have to serve to the website, which is a heavy thing to do... so this would not be my go to method for serving graphviz.

Here is the code for the graph below, and of course, I'm loading viz.js locally with a liquid link tag in the `<head>` section.

```html
<div id="vizJS-graph"></div>

<script>
var viz = new Viz();

viz.renderSVGElement('digraph { a -> b; b -> c }')
.then(function(element) {
  document.getElementById('vizJS-graph').appendChild(element);
})
.catch(error => {
  // Create a new Viz instance (@see Caveats page for more info)
  viz = new Viz();

  // Possibly display the error
  console.error(error);
});
</script>
```

<div id="vizJS-graph"></div>

<script>
var viz = new Viz();

viz.renderSVGElement('digraph { a -> b; b -> c }')
.then(function(element) {
  document.getElementById('vizJS-graph').appendChild(element);
})
.catch(error => {
  // Create a new Viz instance (@see Caveats page for more info)
  viz = new Viz();

  // Possibly display the error
  console.error(error);
});
</script>

### IV. Using Dagre?

{% include /charts/dagreGraph.html %}

Haven't looking into yet, and don't think I will soon. 😄