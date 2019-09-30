---
layout: page
title: Categories
---

Tag name
--------
*Tiny details*
  {% for post in site.posts %}
  {% for tag in post.tags %}
  {% if tag == 'your_tag_here' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})  
	
  {% endif %}
  {% endfor %}
  {% endfor %}
