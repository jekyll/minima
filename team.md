---
layout: page
title: Team
permalink: /team/
description: People and contributors building the DigiMic platform.
---

DigiMic is an open collaboration across microbial ecology, mathematical
modelling, bioinformatics, and research software. Repository histories preserve
the full record of code-level contributions.

## Platform contributors

<div class="team-grid">
{% for person in site.data.team.team %}
<article class="team-card">
  <div class="team-avatar" aria-hidden="true">{{ person.name | slice: 0 }}</div>
  <div>
    <h2>{{ person.name }}</h2>
    <p>{{ person.role }}</p>
    {% if person.github %}
      <a href="{{ person.github }}">GitHub profile <span aria-hidden="true">↗</span></a>
    {% endif %}
  </div>
</article>
{% endfor %}
</div>

## DigiMicPy contributors

These accounts are credited by the
[DigiMicPy repository history](https://github.com/DigiMicOrg/DigiMicPy/graphs/contributors).
GitHub handles are shown when a contributor has not published a display name.

<div class="team-grid">
{% for person in site.data.team.digimicpy_contributors %}
<article class="team-card">
  <div class="team-avatar" aria-hidden="true">{{ person.name | remove: '@' | slice: 0 | upcase }}</div>
  <div>
    <h2>{{ person.name }}</h2>
    <p>DigiMicPy contributor</p>
    <a href="{{ person.github }}">GitHub profile <span aria-hidden="true">↗</span></a>
  </div>
</article>
{% endfor %}
</div>

<section class="contributor-note" aria-labelledby="contributors-heading">
  <h2 id="contributors-heading">Open collaboration</h2>
  <p>DigiMic is developed across independent repositories. Their contributor
  histories are the source of truth for software contributions and preserve
  credit as the community grows.</p>
  <ul>
    <li><a href="https://github.com/DigiMicOrg/DigiMic/graphs/contributors">DigiMic.jl contributors</a></li>
    <li><a href="https://github.com/DigiMicOrg/DigiMicOrg.github.io/graphs/contributors">Platform website contributors</a></li>
  </ul>
</section>
