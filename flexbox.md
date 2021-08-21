---
title: Flexbox
---

You can use the [page.html](/_layouts/page.html) layout which uses the flexbox pattern already.

Or use custom HTML as below, which will work because of the project's CSS added to the base Minima CSS styles.


## Code

{% raw %}
```html
<div class="flex-container">
    <a href="#">
        <div>
            {% include logo.html name="python" %}
            <span>Python</span>
        </div>
    </a>
    <a href="#">
        <div>
            {% include logo.html name="javascript" %}
            <span>JavaScript</span>
        </div>
    </a>
</div>
```
{% endraw %}


## Result

<div class="flex-container">
    <a href="#">
        <div>
            {% include logo.html name="python" %}
            <span>Python</span>
        </div>
    </a>
    <a href="#">
        <div>
            {% include logo.html name="javascript" %}
            <span>JavaScript</span>
        </div>
    </a>
</div>
