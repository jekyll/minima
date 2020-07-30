---
layout: post
title: "Font Resources"
subtitle: I worked on a tool to search and browse for fonts in my third semester at IDC. I'm documenting some interesting things I found here.
tags: misc
---

With an explosion in high quality open source fonts, there are more options available for designers and novices alike, and the aim was to create an interface that used a more ‘natural’ classification of fonts than the default classification of serif, sans-serif, display, handwritten/script and monospace used by most font sites like Google Fonts.

I used a classification created by [O'Donovan et al](http://www.dgp.toronto.edu/~donovan/font/) as the basis for my tool. The paper provided ratings from 0-100 for 200 fonts on 37 attributes (like "warm", "legible", "attention-grabbing"). I utilised a subset of these fonts available on Google Fonts, and removed some of the parameters to create [Font Finder](https://fontfinder.tech/).

The results were a bit iffy—not all participants agreed that they were getting the results they hoped for, and some of the attributes (like "artistic", "fresh") were confusing because people did not know what an "artistic" or "fresh" font should look like. In retrospect it would have been a better idea to create my own classification by conducting card sorting activities with participants and creating fewer categories that were more meaningful.

#### Things I didn't address

The experience of browsing indic fonts and variable fonts is still not very smooth, and there is scope for designing a simple way to browse character sets and previewing the full design space of variable fonts.

## Some interesting examples

#### Font Collections

[Ideo Fontmap](http://fontmap.ideo.com/)  
Ideo creates a 2 dimensional map of fonts by using dimensionality reduction. It's a bit slow to load, but an interesting way to see a very large number of fonts at once and stumble upon something new.

[Fontjoy Projector](https://fontjoy.com/projector/)  
Like Fontmap, but on steroids. Uses 3 dimensions instead of 2, and lets you pick different mappings.

[Google Fonts Korean](https://googlefonts.github.io/korean/)  
More form than function, but this is a beautiful website created to show off support for Chinese, Japanese and Korean (CJK) font files on Google fonts.

[The anatomy of a thousand typefaces](https://medium.com/@getflourish/the-anatomy-of-a-thousand-typefaces-f7b9088eed1)  
A really good article about the challenges of classifying fonts, and how the author came up with a system to do it.

[Fontbase SuperSearch](https://fontba.se/blog/super-search)  
Find Fonts by Contrast, X-Height, Weight and More! Cites The anatomy of a thousand typefaces as an influence.

[Beautiful Web Type](https://beautifulwebtype.com)  
Website that lists a number of high quality open source fonts, and shows pairings with other fonts. Beautiful, responsive previews.

[TypeSource](https://tobiasahlin.com/typesource/)  
Google Web Font inspiration in HTML & CSS. Somewhat similiar to Beautiful Web Type.

[Moving Letters](https://tobiasahlin.com/moving-letters/)  
Motion typography using anime.js.

#### Code Tools

[Web Font Loader](https://github.com/typekit/webfontloader)  
Load fonts from Google Fonts, Typekit, Fonts.com, and Fontdeck, as well as self-hosted web fonts.

[opentype.js](https://opentype.js.org/)  
I don't understand what this does, but it looks like more complex web font tasks can be achieved with this library.

#### Websites for a single font

[Universal Sans](https://universalsans.com/)  
A variable sans serif that can be tweaked to match user's needs.

[Hellvetica](https://hellveticafont.com/)  
A really badly kerned version of Helvetica.

[Comic Neue](http://comicneue.com/)  
Comic Sans, but a little less wonky.
