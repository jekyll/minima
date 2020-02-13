---
layout: post
title: "Lab Notes - PS626: AI, Data & Policy"
tags: idc
permalink: nltk
---

>These are my lab notes from PS:626 AI, Data & Policy, an elective offered by Prof. Anupam Guha of the Centre for Policy Studies at IIT Bombay.

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

# nltk  
Python Natural Language Tool Kit library  

### install
If you have pip installed, use this command to install nltk.
```
pip install nltk
```

### [NLTK Book](https://www.nltk.org/book/)
Tutorial for nltk

### concordance("word")
Returns all occurrences of word. with some surrounding words.
```
>>> text1.concordance('flowers')
Displaying 4 of 4 matches:
has superinduced bright terraces of flowers upon the barren refuse rocks thrown
he green grass ; who standing among flowers can say -- here , HERE lies my belo
 the warp and woof , and the living flowers the figures . All the trees , with
 in some glad May - time , when the flowers of the woods are plucked . And all
```

### similar("word")
Returns other words appear in a similar range of contexts.
```
>>> text1.similar('flowers')
hands blue act lines school in heart body world hand name whale tongue
signification word from roll english will whales
```

### common_contexts(["word1","word2"]
```
>>> text1.common_contexts(["very","so"])
is_often ye_much not_often not_much is_much was_far been_long
```

### FreqDist(text)
Returns frequency of most common words. Can be used for n most common words as shown.
```
>>> FreqDist(text1).most_common(50)
[(',', 18713), ('the', 13721), ('.', 6862), ('of', 6536), ('and', 6024), ('a', 4569), ('to', 4542), (';', 4072), ('in', 3916), ('that', 2982), ("'", 2684), ('-', 2552), ('his', 2459), ('it', 2209), ('I', 2124), ('s', 1739), ('is', 1695), ('he', 1661), ('with', 1659), ('was', 1632), ('as', 1620), ('"', 1478), ('all', 1462), ('for', 1414), ('this', 1280), ('!', 1269), ('at', 1231), ('by', 1137), ('but', 1113), ('not', 1103), ('--', 1070), ('him', 1058), ('from', 1052), ('be', 1030), ('on', 1005), ('so', 918), ('whale', 906), ('one', 889), ('you', 841), ('had', 767), ('have', 760), ('there', 715), ('But', 705), ('or', 697), ('were', 680), ('now', 646), ('which', 640), ('?', 637), ('me', 627), ('like', 624)]

```

### matplotlib
Install using ```pip install matplotlib```

### Plot Graph of frequency dist
```
>>> fdist = FreqDist(text2)
>>> fdist1.plot(50,cumulative="True")
```

### get all words over 15 char in Moby Dick
```
>>> V = set(text1)
>>> longs = [w for w in V if len(w) > 15]
>>> sorted(longs)
['CIRCUMNAVIGATION', 'Physiognomically', 'apprehensiveness', 'cannibalistically', 'characteristically', 'circumnavigating', 'circumnavigation', 'circumnavigations', 'comprehensiveness', 'hermaphroditical', 'indiscriminately', 'indispensableness', 'irresistibleness', 'physiognomically', 'preternaturalness', 'responsibilities', 'simultaneousness', 'subterraneousness', 'supernaturalness', 'superstitiousness', 'uncomfortableness', 'uncompromisedness', 'undiscriminating', 'uninterpenetratingly']
```

### Collocations
Words that occur together. Eg. red wine.

***bigrams***
2 words that occur together

***ngrams***
n words that occur together

### Homework
Find all bigrams in Moby Dick that occur more than 10 times without using inbuilt nltk code.


# Lab 3
30 Jan 2020

### regex
Regular expression
Finding a pattern of characters in regex.

### Chatter text
People talking to each other online (For eg. Reddit)

Organisations can use chattertext to run sentiment analysis and figure out who thinks what about what.

Possible project idea: understanding chattertext

### Write and read a .txt file 
```
text = "Hello\nMy name is Gyan\nI like rusty spoons\n"

f = open('hello.txt', 'a')
f.write(text)
f.close()

f = open('hello.txt', 'r')
for line in f:
	print len(line), line
f.close()

## Output

## 6 Hello

## 16 My name is Gyan

## 20 I like rusty spoons

```


# Lab 4
30 Jan 2020

### Supervised Machine Learning
Training data has explicit labels.

### Unsupervised Machine Learning
Training data does not have explicit words.

### Dictionary
List of all unique words

# Lab 5
6 Feb 2020

## Topic model

### Non-parametric topic modelling
You don't give the number of topics. More sophisticated.

### Parametric topic modelling
You give number of topics. 

### tf-idf
Stands for term frequency–inverse document frequency [Wikipedia](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)
Way of figuring out what words define the 'topic' of the document.

# Lab 6
13 Feb 2020

## Vowpal Wabbit
[Website](https://vowpalwabbit.org/)  | [Recommended Tutorial](https://github.com/hal3/vwnlp)
Very fast way to do ML. Takes one data point, creates model. Then adjusts model for next data point and so on. Thus RAM requirement is low.
