---
---
I've come across yet another graphing engine this morning... introducing [*Dracula.js*](https://www.graphdracula.net/)

It kept giving me `'connection' not defined` errors at first, but **ALAS**, after a [bit of digging](https://github.com/strathausen/dracula/issues/53) I found out that you needed to load [*raphael*](http://raphaeljs.com/) –the rendering engine for Dracula.js– *before* the Dracula library, like so;

```html
<!-- Fetch raphael renderer js library -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>

<!-- Fetch graphdracula js library -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/graphdracula/1.0.3/dracula.min.js"></script>
```

Also [this SO question](https://stackoverflow.com/questions/58545014/what-can-i-do-about-this-error-with-dracula-graph-library-svg-container-not-fou) was helpful in putting the GraphDracula svg into the intended container, as well as [this codepen](https://codepen.io/mauriciom/pen/ZbXmYb?editors=1010). So I get the graph below but still broken ☹️... can't be perfect right...

<!--style="text-align:center; width:100%; height:500px;"-->
<div id="canvas" class="dracula-svg" style="height:500px;">
</div>
<div>
  <button id="redraw" onclick="redraw();">redraw</button>
</div>
{% include /charts/draculaTest.html %}

<!--
<iframe id="canvas" style="text-align:center; width:100%; height:500px;">
  <div id="canvas" style="text-align:center; width:100%; height:500px;"></div>
</iframe>
-->

<!--<div id="canvas" style="text-align: center;"></div>-->

*to be continued...*

