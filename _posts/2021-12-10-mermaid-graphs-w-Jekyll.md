---
title: mermaid graphs w/ jekyll
---
Hello and welcome to another one of my blabbering posts.
In this post, I will be describing how to use [mermaid graphs](https://mermaid-js.github.io/mermaid/#/) w/ jekyll, or any static-site-generator (SSG) for that matter.

This post is a simple markdown file with `div`s that hold mermaid graphs. They are tagged with `mermaid` class to set them apart and the javascript `mermaid.initialize()` function is called if there is a page with `<div class="mermaid">` 

Things are actually quite explicit on [their README page](https://mermaid-js.github.io/mermaid/#/README).

Let's see a few examples of how the charts actually look like down 👇.

**A top-down (TD, same as bottom-up) flowchart example**
<div class="mermaid">
graph TD
  A(Start) --> B{Is it?};
  B -- Yes --> C[OK];
  C --> D(Rethink);
  D --> B;
  B -- No ----> E[(End)];
</div>