---
layout: post
title: "PS626: AI, Data & Policy"
tags: idc
permalink: ai
---



These are my notes from PS:626 AI, Data & Policy, an elective offered by Prof. Anupam Guha of the Centre for Policy Studies at IIT Bombay.

## Why did I take this elective?
The fourth and last semester of the IDC M.Des. program has a research project and a design project, but no lectures. Masters students at IIT, however, can choose to take one of a [set of electives](http://www.iitb.ac.in/newacadhome/Instituteelectivelist2019.pdf). I thought it would be interesting to make the most of being a design school in IIT Bombay, and take a course offerred by another department. I took the AI, Data and Policy partly because I follow [Prof. Guha on Twitter](https://twitter.com/anupam_guha) and I happened to see his tweet about the course, and partly because my internship at Microsoft in Summer 2019 involved working with AI, and I felt a little crippled by my inability to actually prototype anything as a designer and wanted to learn more. I was especially interested in how the course was pitched - over the past year I've realised my limitations as a designer being able to create any real impact in social problems without significant policy intervention, and I wanted to see what looking at AI through such a lens could look like.

## Advice for IDC Students
IDC courseload is heavy as it is, and I checked with my faculty advisor and project guide before taking this course.

# Useful stuff in Python

### Pick substring from string
```
a = "dsajdshfdskufadlfdl"
a[2:4] //2nd to 4th char
'ajd'

a = "dsajdshfdskufadlfdl"
a[2:-5] //2nd to 5th last char
'ajdshfdskufa'
```

### Generate random number in range
```
//Using randrange() to generate numbers from 50-100
import random
print (random.randrange(50,100))
```


### Tuple v/s List
```
//Tuple - ordered, unchangeable
a = ('x','y','z')

//List - ordered, changeable
b = ['x','y','z']

//Set - unordered, changeable
c = {'x','y','z'}

//Dictionary - like a set, but key-value pairs. Each value can be accessed using key.
d = {"first":"Gyan","second":"Rishi","third":"Aisha"}
d[first]
'Gyan'
```
