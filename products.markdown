---
title: Products
date: 2020-10-08 10:51:00 +01:00
---

{% for product in products %} 
<h2>{{product.title}}</h2>
<p>{{product.details}}
{% endfor %}