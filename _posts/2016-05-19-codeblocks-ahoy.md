---
layout: post
---

An article with various blocks of highlighted code snippets.

```ruby
=begin
  Dummy class nested inside a dummy module
  Private API
=end
```
```diff
- This line is redacted
- This line has been deleted
+ This line is visible
+ This line has been inserted
This line has not been changed
```
```sass
@import "base"

.card
  display: inline-block
  margin: 0
  padding: 0

  &:hover
    color: #ab45ef;
```
```ruby
21 + 54 = 0
foo ||= bar
foo / bar

24
45.75
0x2C716
\x0A
01010

/ya?ml/
"yaml"
```
```ruby
include Enumerable

module Foo
  class Bar
    LIPSUM = "lorem ipsum dolor sit"

    attr_reader :layout

    def initialize
      @layout = Layout.new
    end

    # instance method
    def profile
      measure_time do
        compile layout
        layout.render_with Bar::LIPSUM
      end
    rescue ArgumentError
      false
    end
  end
end

# Execute code
Foo::Bar.new.profile
```

{% raw %}
```liquid
{% assign foo = page.foo | bar: 'baz' %}
{{ foo }}
```
{% endraw %}

```yaml
author:
  admin: true
  name: John Doe
  email: johndoe@example.com
  id: 75636474
```

{% highlight html linenos %}
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello World</title>
  </head>
  <body>
    <p>Hello, World!</p>
  </body>
</html>
{% endhighlight %}
