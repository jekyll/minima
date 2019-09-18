---
layout: post
title: Making chord diagrams with Circos
---

## What is Circos?
Circos is a free and open source software package for visualizing data in a circular layout i.e. as chord diagrams. It has been featured in many scientific and other publications (including the covers of both Science and Nature), so it's safe to say science people really like it.

#### Why Circos?
- It looks pretty.
- Circular layouts are great for exploring relationships between objects or positions.
- Highly customizable.
- High data-to-ink ratio.
- .svg or .png output, can be used for print.
- Scriptable, can be made part of an automated data pipeline.
- Did I mention it looks pretty?

Circos is ideal for creating publication-quality infographics and illustrations with a high data-to-ink ratio, richly layered data and pleasant symmetries. You have fine control each element in the figure to tailor its focus points and detail to your audience.

#### Use in Genomics
Circos is used extensively for the analysis of genomic alterations over time, or differences between two or more genomes. You can take a look [here](http://circos.ca/intro/genomic_data/).


#### How can I use Circos?
Circos Words that describe the Circos install page.


## Let's use Circos!
Now that we know what Circos can do, let's try and use it!

#### Formatting the data
Circos uses :  
- A matrix of data
- With headers for both rows and coloumns
- Formatted as tab separated values

#### Putting tables into Circos

![Screenshot of spreadsheet on Google Sheets](https://gyanl.com/blog/assets/circos-raw-keys.png)

But wait! Circos can't technically represent tables, it can represent *matrices.* What's the difference? In mathematics, a matrix is a rectangular array of numbers, whereas a table can have any kinds of values.

#### Turning tables into matrices
![Screenshot of matrix on Google Sheets](https://gyanl.com/blog/assets/circos-matrix.png)

#### The result
![Chord diagram of key issues](https://gyanl.com/blog/assets/circos-keys.png)
