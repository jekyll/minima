---
layout: base
---
<article class="post h-entry" itemscope itemtype="http://schema.org/BlogPosting">

  <header class="post-header">
    <h1 class="post-title p-name" itemprop="name headline">{{ page.title | escape }}</h1>
    <div class="post-meta">
      {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
      {% assign pdate = page.date | date_to_xmlschema %}
      {%- if page.modified_date %}<span class="meta-label">Published:</span>{% endif %}
      <time class="dt-published" datetime="{{ pdate }}" itemprop="datePublished">
        {{ pdate | date: date_format }}
      </time>
      {%- if page.modified_date -%}
        <span class="bullet-divider">•</span>
        <span class="meta-label">Updated:</span>
        {%- assign mdate = page.modified_date | date_to_xmlschema %}
        <time class="dt-modified" datetime="{{ mdate }}" itemprop="dateModified">
          {{ mdate | date: date_format }}
        </time>
      {%- endif -%}
      {%- if page.author %}
      <div class="{% unless page.modified_date %}force-inline {% endunless %}post-authors">
        {%- for author in page.author %}
          <span itemprop="author" itemscope itemtype="http://schema.org/Person">
            <span class="p-author h-card" itemprop="name">{{ author }}</span></span>
          {%- if forloop.last == false %}, {% endif -%}
        {% endfor %}
      </div>
      {%- endif %}
    </div>
  </header>

  <div class="post-content e-content" itemprop="articleBody">
    {{ content }}
  </div>

  {% if jekyll.environment == 'production' -%}
    {% if page.comments == false -%}
    <div class="comments-disabled-message">
      Comments have been disabled for this post.
    </div>
    {% else -%}
      {%- include comments.html -%}
    {% endif -%}
  {% endif -%}

  <a class="u-url" href="{{ page.url | relative_url }}" hidden></a>
</article>
