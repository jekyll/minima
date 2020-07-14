---
layout: post
title: Lettuce Party
subtitle: An open source handwritten display font
tags: fonts
thumbnail: https://gyanl.com/assets/thumbs/lettuce.png
---

While [interning at Zomato](/zomato) last winter, I worked on some illustrations for a Zomato iMessage sticker pack. I wanted a hand-made look for the stickers, so I was manually doing the lettering using a Wacom graphics tablet. I really liked how it turned out — and wondered if I could turn it into a font for use in future projects.

![The Birdfont interface.](https://gyanl.com/assets/stickers.png)

###### Graphics from the Sticker pack.

I looked up softwares for creating fonts, and came across [BirdFont](https://birdfont.org/) — a free, open source font editor. BirdFont has a lot of weird quirks, but it has some documentation so it wasn’t too hard to play around with it to figure it out. It was great for a beginner like me, but the interface (like many open source software) leaves a lot to be desired. If you are seriously considering getting into type design, I’d recommend looking into other commercial options.

![The Birdfont interface.](https://gyanl.com/assets/birdfont-interface.png)

###### The Birdfont interface.

### The Process

Birdfont supports copy-pasting from Illustrator, so I took my existing vectors from Illustrator and simply pasted them into Birdfont. I tweaked some of the shapes directly in Birdfont to fix scaling/rotation issues — but it’s a lot more complicated to do this in Birdfont (and it took me a while to even figure out how) so I’d recommend getting your shapes as clean as possible within Illustrator.

I first worked only on the capital letters, and tested out the resulting font file. It was a lot better than I expected, and so I decided to complete the default unicode glyphs — uppercase, lowercase, numbers and some punctuation as a side project. Here’s what that looked like after a weekend of work:

![My boss Ashish Goel sketch-noted my final presentation to the team.](https://gyanl.com/assets/lettuce-party-sample.png)

###### I remember my early days as a design enthusiast on the internet — the free fonts on Dafont.com never came with any punctuation marks. I made sure to support at least the basics.

### What I learned

I wish I’d read up a little more about things I needed to keep in mind before I got started, because I created all my letters a lot smaller than I should have. This means the default line height is way too much. It can be fixed by using custom line heights, but it’s still not ideal. Line height can’t be directly changed in Birdfont, and I’d have to individually scale up each character and then fix the kerning to fix the issue. This didn’t seem worth the time, so it’s an open issue for now.

![Line height issues in Lettuce Party.](https://gyanl.com/assets/lettuce-party-line.png)

###### Line height issues in Lettuce Party.

### Download

Lettuce Party is free and open source. If you have any suggestions, you can [file an issue](https://github.com/gyanl/Lettuce-Party/issues) on GitHub or write to me at feedback@gyanl.com. You can also check out the BirdFont project on the [GitHub repo](https://github.com/gyanl/Lettuce-Party).

If you just want the font files, you can [download v0.1 here](https://github.com/gyanl/Lettuce-Party/raw/master/Lettuce%20Party%20Regular.zip)! It’s free for personal and commercial use.

![Lettuce Party is also great for emoticons](https://gyanl.com/assets/lettuce-party-emote.png)

###### Lettuce Party is also great for emoticons ^\_\_^
