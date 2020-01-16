---
layout: post
title: "PS626: AI, Data & Policy"
tags: idc
permalink: ai
---

These are my notes from PS:626 AI, Data & Policy, an elective offered by Prof. Anupam Guha of the Centre for Policy Studies at IIT Bombay.

## Why did I take this elective?
The fourth and last semester of the IDC M.Des. program has a research project and a design project, but no lectures. Masters students at IIT, however, can choose to take one of a [set of electives](http://www.iitb.ac.in/newacadhome/Instituteelectivelist2019.pdf). I thought it would be interesting to make the most of being a design school in IIT Bombay, and take a course offerred by another department. I took the AI, Data and Policy partly because I follow [Prof. Guha on Twitter](https://twitter.com/anupam_guha) and I happened to see his tweet about the course, and partly because my internship at Microsoft in Summer 2019 involved working with AI, and I felt a little crippled by my inability to actually prototype anything as a designer and wanted to learn more.

### Initial impressions
I was especially interested in how the course was pitched - over the past year I've realised my limitations as a designer being able to create any real impact in social problems without significant policy intervention, and I wanted to see what looking at AI through such a lens could look like. There are two classes a week (Monday and Thursday from 2pm - 3:30pm) and classes alternate between theory classes discussing the socio-political aspect of AI, and coding classes that cover Machine Learning in Python. I thought this was a very interesting approach to the problem, since understanding AI requires both an understanding of the technical aspect and the social, political, ethical and economic impact of AI.

## Advice for IDC Students
IDC courseload is heavy as it is, and so I checked with my faculty advisor and project guide before taking this course. They said it was a good idea to be exposed to courses outside IDC, but warned me about the courseload and suggested that I could take it as an audit course. DRS and P3 are 12 and 30 credits respectively, and the elective is 6, which adds up to a 48 credit semester. It is possible to take courses as audit courses or as additional learning courses, which do not impact your CPI. I have currently taken the course as an additional learning course.

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


### Tuple v/s List v/s Set v/s Dictionary
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
