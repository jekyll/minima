# Flexbox

Use a the flexbox pattern using custom HTML like, or use the `listing.html` layout which uses it already.


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
