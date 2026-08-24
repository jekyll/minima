---
layout: home
title: Digital microbiome modelling
description: Explore DigiMic packages, research workflows, and training materials.
---

<section class="hero" aria-labelledby="hero-title">
  <p class="eyebrow">The Digital Microbiome Platform</p>
  <h1 id="hero-title">Mechanistic tools for understanding microbial communities</h1>
  <p class="hero-lead">DigiMic connects microbial metabolism, community dynamics,
  and environmental observations through open models, reproducible workflows,
  and practical learning resources.</p>
  <div class="action-row">
    <a class="button button-primary" href="{{ '/resources/' | relative_url }}">Explore the platform</a>
    <a class="button button-secondary" href="{{ '/about/' | relative_url }}">Read the project overview</a>
  </div>
</section>

<section class="section-block" aria-labelledby="start-heading">
  <p class="eyebrow">Start here</p>
  <h2 id="start-heading">One platform, two modelling implementations</h2>
  <p class="section-intro">Choose the language and workflow that fits your
  research. The Python and Julia packages share scientific aims, while retaining
  independent APIs and validation.</p>

  <div class="gateway-grid">
    <article class="gateway-card gateway-card-featured">
      <span class="status-pill">Python · active development</span>
      <h3>DigiMicPy</h3>
      <p>Build and simulate microbial consumer-resource models, including
      temperature scaling and spatial coupling.</p>
      <div class="card-links">
        <a href="https://digimic.org/DigiMicPy/">Documentation <span aria-hidden="true">→</span></a>
        <a href="https://github.com/DigiMicOrg/DigiMicPy">Source code <span aria-hidden="true">↗</span></a>
      </div>
    </article>

    <article class="gateway-card">
      <span class="status-pill">Julia · early stage</span>
      <h3>DigiMic.jl</h3>
      <p>Generate model parameters, run SciML-based simulations, and explore
      stability and environmental-stressor utilities.</p>
      <div class="card-links">
        <a href="https://github.com/DigiMicOrg/DigiMic">Source and setup <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  </div>
</section>

<section class="section-block section-tinted" aria-labelledby="pathways-heading">
  <p class="eyebrow">Research pathways</p>
  <h2 id="pathways-heading">From first simulation to advanced workflows</h2>
  <div class="pathway-grid">
    <article>
      <span class="pathway-number" aria-hidden="true">01</span>
      <h3>Learn the model</h3>
      <p>Start with consumer-resource theory, model assumptions, and executable examples.</p>
      <a href="https://digimic.org/DigiMicPy/content/useinfo.html">Training and usage <span aria-hidden="true">→</span></a>
    </article>
    <article>
      <span class="pathway-number" aria-hidden="true">02</span>
      <h3>Build a workflow</h3>
      <p>Explore community coalescence, carbon-use efficiency, temperature, space, and resource flux.</p>
      <a href="https://digimic.org/DigiMicPy/content/advanced_usage.html">Advanced workflows <span aria-hidden="true">→</span></a>
    </article>
    <article>
      <span class="pathway-number" aria-hidden="true">03</span>
      <h3>Contribute</h3>
      <p>Bring a research question, dataset, example, or model extension to the open project.</p>
      <a href="https://github.com/orgs/DigiMicOrg/repositories">DigiMic repositories <span aria-hidden="true">↗</span></a>
    </article>
  </div>
</section>

<section class="section-block project-vision" aria-labelledby="vision-heading">
  <div>
    <p class="eyebrow">Project vision</p>
    <h2 id="vision-heading">A bridge from metabolism to microbiome prediction</h2>
    <p>DigiMic is developing the modelling layer needed to connect biological
    parameterisation with community-scale predictions and experimental validation.</p>
    <a class="text-link" href="{{ '/about/' | relative_url }}">See what exists today and what comes next <span aria-hidden="true">→</span></a>
  </div>
  <img src="{{ '/assets/img/digimic-workflow.jpg' | relative_url }}"
       alt="DigiMic workflow from metabolic parameterisation through microbiome modelling to experimental validation"
       width="1800" height="1045" loading="lazy">
</section>
