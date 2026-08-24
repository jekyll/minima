---
layout: page
title: Resources
permalink: /resources/
description: DigiMic packages, documentation, research workflows, and training materials.
---

DigiMic is a gateway to independently maintained modelling packages and the
resources around them. Package documentation is versioned and validated in the
repository that owns each implementation.

## Packages and documentation

<div class="gateway-grid resource-grid">
  <article class="gateway-card gateway-card-featured">
    <span class="status-pill">Python 3.11+</span>
    <h3>DigiMicPy</h3>
    <p>The tested Python implementation, with core MiCRM simulation,
    temperature scaling, spatial coupling, examples, and a Jupyter Book.</p>
    <div class="card-links">
      <a href="https://digimic.org/DigiMicPy/">Read the documentation <span aria-hidden="true">→</span></a>
      <a href="https://github.com/DigiMicOrg/DigiMicPy">Browse the source <span aria-hidden="true">↗</span></a>
    </div>
  </article>

  <article class="gateway-card">
    <span class="status-pill">Julia 1.8+</span>
    <h3>DigiMic.jl</h3>
    <p>The Julia implementation, distributed from source and imported as
    <code>MiCRM</code> for compatibility with existing users.</p>
    <div class="card-links">
      <a href="https://github.com/DigiMicOrg/DigiMic">Setup and source <span aria-hidden="true">↗</span></a>
    </div>
  </article>
</div>

## Workflows

The DigiMicPy book currently provides the broadest set of worked research
pathways. Some pages document supported APIs; others are explicitly marked as
theory or manual workflows where a packaged helper is not yet available.

- [Community coalescence](https://digimic.org/DigiMicPy/content/coalescence.html)
- [Carbon-use efficiency](https://digimic.org/DigiMicPy/content/cue.html)
- [Temperature scaling](https://digimic.org/DigiMicPy/content/temperature.html)
- [Spatial coupling](https://digimic.org/DigiMicPy/content/spatial.html)
- [Resource-flux summaries](https://digimic.org/DigiMicPy/content/resource_flux.html)
- [Analysis and stability](https://digimic.org/DigiMicPy/content/analysis.html)

## Training and support

- [Installation and first simulation](https://digimic.org/DigiMicPy/content/useinfo.html)
- [Model theory](https://digimic.org/DigiMicPy/content/theo.html)
- [Python API reference](https://digimic.org/DigiMicPy/content/api.html)
- [Examples in the DigiMicPy repository](https://github.com/DigiMicOrg/DigiMicPy/tree/main/examples)
- [Questions and feature requests](https://github.com/DigiMicOrg/DigiMicPy/issues)

The packages are early-stage research software. Check each repository's README
and release history before depending on an API for a long-lived workflow.
