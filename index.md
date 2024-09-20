---
layout: page
title: About
permalink: /
---

<div class="about-wrapper">
  <div class="about-content">
    <p>I'm Samagra, a machine learning engineer and founder of <a href="https://tensorfuse.io/">Tensorfuse</a>, a YC-backed startup building infrastructure for scalable ML. My work focuses on making Machine Learning more accessible and efficient for researchers and engineers.</p>

    <p>Previously, I worked on distributed systems and networking at <a href="https://research.adobe.com/">Adobe Research</a> and <a href="https://snl.cs.ucsb.edu/">UCSB</a>. I hold a degree in Computer Science from <a href="https://iitr.ac.in/">IIT Roorkee</a>, where I developed a passion for the intersection of mathematics and technology.</p>

    <p>When I'm not programming or writing, you'll find me playing chess, exploring <a href="https://en.wikipedia.org/wiki/Sanskrit_literature">Sanskrit literature</a>, or experimenting with <a href="https://en.wikipedia.org/wiki/Indian_cuisine">Indian cuisine</a>. I'm always eager to connect with others passionate about technology and its potential to shape our future.</p>

    <p>Feel free to reach out if you'd like to discuss AI, startups, or exchange book recommendations!</p>
  </div>

  <div class="about-image-container">
    <div class="about-image">
      <img src="/assets/images/test.jpg" alt="Samagra" class="img-responsive">
    </div>
    <div class="image-caption">
      <p>"Mathematics, computer science, and the arts are insanely related. They're all creative expressions." - Sebastian Thrun</p>
    </div>
  </div>
</div>

<style>
  .about-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 2rem;
  }
  .about-content {
    flex: 1 1 300px;
  }
  .about-image-container {
    flex: 0 0 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .about-image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
  }
  .about-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image-caption {
    margin-top: 15px;
    font-style: italic;
    text-align: center;
    font-size: 0.9em;
    max-width: 300px;
  }
  @media screen and (max-width: 768px) {
    .about-wrapper {
      flex-direction: column-reverse;
    }
    .about-image-container {
      margin-bottom: 1rem;
    }
  }
</style>
