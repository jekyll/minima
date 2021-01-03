# Flexbox

You can use the `listing.html` layout which uses the flexbox pattern already.

Or you custom HTML as below, which works because of the project's CSS added to the base Minima CSS styles.


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
