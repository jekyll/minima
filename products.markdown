---
title: Products
date: 2020-10-08 09:51:00 Z
welsh: https://jnx.cymru/cynhyrchion
---
{% for product in site.products %}
  <div class="w3-container w3-cell w3-mobile w3-third" style="max-width: 500px; min-width: 400px;">
    <a href="{{ product.url }}" style="text-decoration: none;">
    <div class="w3-card-4">
        <img src="/uploads/img/thumb/{{ product.image }}" alt="Alps" class="w3-image" style="min-height: 350px;">
        <div class="w3-container w3-center">
          <h3>{{ product.title }}</h3>
        </div>
      </div></a>
  </div>
  {% endfor %}
<p>&nbsp;</p>
<div class="w3-container">
  <p>&nbsp;</p>