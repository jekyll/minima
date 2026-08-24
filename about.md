---
layout: page
title: Project overview
permalink: /about/
---

**DigiMic (Digital Microbiome)** is an open modelling framework for exploring
how microbial communities assemble, respond to environmental change, and
process carbon. It connects mechanistic models of microbial metabolism with
community dynamics and, ultimately, observations from laboratory and natural
ecosystems.

## Why model resources?

Microbes do not interact in isolation. They consume shared resources, retain
some of that material for growth, and release metabolic by-products that other
organisms may use. These flows create competition when organisms require the
same resources and cross-feeding when the products of one organism support
another.

DigiMic represents these processes with microbial consumer-resource models
(MiCRMs). Uptake parameters describe resource consumption, leakage parameters
describe the release of metabolic by-products, and retained uptake contributes
to growth. Resource supply, environmental loss, and microbial mortality
complete the community dynamics. This mechanistic structure lets researchers
ask how traits, metabolism, and environmental conditions shape whole-community
behaviour.

[![Conceptual DigiMic workflow linking metabolic parameterisation, predictive microbiome modelling, and validation against laboratory and real-world microbiome data.]({{ '/assets/img/digimic-workflow.jpg' | relative_url }}){: width="1800" height="1045" loading="lazy" }]({{ '/assets/img/digimic-workflow.jpg' | relative_url }}){: aria-label="Open the DigiMic workflow figure at full size" }

*The DigiMic vision connects metabolic parameterisation to predictive community
models and validation against laboratory and field observations. Metabolic-model
interfaces and automated omics-based parameterisation are development goals
rather than current package features. Figure reproduced from the
[DigiMicPy documentation](https://github.com/DigiMicOrg/DigiMicPy/blob/main/docs/content/figures/DigiMic.jpg)
(MIT Licence, Copyright 2025 EcoEng Lab).*

## From omics to community dynamics

The long-term DigiMic workflow connects three layers:

1. **Metabolic parameterisation:** use strain-level measurements, traits, taxonomic information, omics data, and genome-scale metabolic models to derive biologically grounded uptake, secretion, and biomass-production parameters.
2. **Microbiome modelling:** use those parameters in consumer-resource models to predict changes in community composition, resource chemistry, and carbon processing under different environmental conditions.
3. **Data and validation:** compare predictions with laboratory experiments and observations from real microbial communities, then use discrepancies to refine model assumptions and parameterisation.

The modelling layer is available today. Automated interfaces that translate
omics data or genome-scale metabolic models into MiCRM parameters are not yet
implemented; current simulations use synthetic parameter generators or
parameters supplied by the researcher. Building this bridge is a central
development direction for the project.

## What is available today?

DigiMic currently has independent Python and Julia implementations that share
scientific aims. Numerical and API parity between them has not been established.

### DigiMicPy

The tested Python package supports:

- synthetic microbial communities with modular resource preferences;
- simulation of consumer and resource trajectories;
- configurable uptake, leakage, mortality, resource supply, and loss;
- fixed-temperature scaling of uptake and mortality; and
- conservative coupling between spatial patches.

The DigiMicPy documentation also develops manual workflows for community
coalescence, carbon-use efficiency, and resource-flux summaries. Effective
generalised Lotka-Volterra conversion and analysis are currently theory only,
with a package API planned.

[Read the DigiMicPy documentation](https://digimic.org/DigiMicPy/){: .button .button-primary }
[View the Python source](https://github.com/DigiMicOrg/DigiMicPy){: .button .button-secondary }

### DigiMic.jl

The Julia implementation provides parameter generation, SciML-based
consumer-resource simulations, local stability analysis, and experimental
stressor utilities. The repository is branded DigiMic.jl, while the package
name used in Julia imports (`using MiCRM`) and its UUID remain `MiCRM` for
compatibility with existing users.

[Explore DigiMic.jl](https://github.com/DigiMicOrg/DigiMic){: .button .button-secondary }

## An open framework

DigiMic is intended as a transparent foundation for collaboration across
microbiology, ecology, metabolic modelling, bioinformatics, and environmental
science. Planned extensions include metabolic-model interfaces, new
parameterisation methods, inference tools, experimental-design workflows, and
validation against measurements of community composition, resource chemistry,
and carbon fluxes.

Contributions can take the form of code, independently developed extensions,
examples, datasets, or feature requests motivated by concrete research
questions. The project will keep implemented capabilities and research
directions clearly distinguished as the framework develops.
