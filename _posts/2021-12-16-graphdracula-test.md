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

<div id="canvas" style="text-align: center;" width="100%" height="500px"></div>
{% include /charts/draculaTest.html %}

<!--
<iframe style="text-align: center;" width="100%" height="500">
<div id="canvas" style="text-align: center;" width="100%" height="500px"></div>
</iframe>
-->

<!--<div id="canvas" style="text-align: center;"></div>-->

post last sentence.

