---
layout: post
title: "PS626: AI, Data & Policy"
tags: idc
permalink: ai
---

>These are my notes from PS:626 AI, Data & Policy, an elective offered by Prof. Anupam Guha of the Centre for Policy Studies at IIT Bombay.

### Why did I take this elective?
The fourth and last semester of the IDC M.Des. program has a research project and a design project, but no lectures. Masters students at IIT, however, can choose to take one of a [set of electives](http://www.iitb.ac.in/newacadhome/Instituteelectivelist2019.pdf). I thought it would be interesting to make the most of being a design school in IIT Bombay, and take a course offerred by another department. I took the AI, Data and Policy partly because I follow [Prof. Guha on Twitter](https://twitter.com/anupam_guha) and I happened to see his tweet about the course, and partly because my internship at Microsoft in Summer 2019 involved working with AI, and I felt a little crippled by my inability to actually prototype anything as a designer and wanted to learn more.

### Initial impressions
I was especially interested in how the course was pitched - over the past year I've realised my limitations as a designer being able to create any real impact in social problems without significant policy intervention, and I wanted to see what looking at AI through such a lens could look like. There are two classes a week (Monday and Thursday from 2pm - 3:30pm) and classes alternate between theory classes discussing the socio-political aspect of AI, and coding classes that cover Machine Learning in Python. I thought this was a very interesting approach to the problem, since understanding AI requires both an understanding of the technical aspect and the social, political, ethical and economic impact of AI.

### Managing courseload (IDC M.Des)
IDC courseload is heavy as it is, and so I checked with my faculty advisor and project guide before taking this course. They said it was a good idea to be exposed to courses outside IDC, but warned me about the courseload and suggested that I could take it as an audit course. DRS and P3 are 12 and 30 credits respectively, and the elective is 6, which adds up to a 48 credit semester. It is possible to take courses as audit courses or as additional learning courses, which do not impact your CPI. I have currently taken the course as an additional learning course.

### Some thoughts about the first class and [this paper](https://royalsocietypublishing.org/doi/full/10.1098/rsta.2018.0087)

About two years ago, I read a Twitter thread [[1]](https://twitter.com/yonatanzunger/status/975545004205654016) that said the field of Computer Science has not had it’s reckoning yet. It said that unlike Chemistry that had seen dynamite and chemical weapons, and Physics that had seen the atom bomb, the field of Computer Science had not yet had a moment that ‘seared the importance of ethics and consequences’ into the minds of everyone in the field.

This has stayed with me as an IT engineer turned into an Interaction Designer. The road to hell is paved with good intentions, and the first time Google Photos let me search through my photos with words felt like magic, but I also read about the app labelling black people as gorillas [[2]](https://www.theverge.com/2018/1/12/16882408/google-racist-gorillas-photo-recognition-algorithm-ai). This made me wonder about all the trust we put in what is essentially a black box for decision making. AI systems could be mostly useful, but every now and then spit out wrong or biased results, with no way of understanding why. Data collection and algorithmic curation of everything we do online has become so normalised that the constant surveillance has become implicitly accepted as we use identities controlled by corporations to manage our entire identities online.

My summer internship involved working on an AI product, and had to understand and weigh in on issues with data availability to train a model, and issues with model accuracy. As a designer, I felt a little crippled by my limited grasp on the technology and inability to actually prototype anything myself. I read about issues like explaining to the user where smart inputs from an AI agent were coming from, and explaining that the information could be inaccurate sometimes. This motivated me to take this course, and the structure of alternating classes discussing the technical and socio-politico-economic aspects of artificial intelligence was a surprise but in retrospect seems like the obvious approach to be able to completely understand the possible impacts of a piece of AI technology.

Vidushi Marda’s paper on AI Policy in India [[3]](https://royalsocietypublishing.org/doi/full/10.1098/rsta.2018.0087) discusses a framework for analysis of social and ethical concerns of ML systems in three stages: data, model and policy. The part of the paper I feel is especially interesting against the wave of protests in India is the use of AI for surveillance and policing by the Indian state. With Delhi Police using an automated facial recognition to find ‘rabble-rousers and miscreants’ [[4]](https://thewire.in/government/delhi-police-is-now-using-facial-recognition-software-to-screen-habitual-protestors) at Narendra Modi’s event at Ramlila Maidan, the government has shown how free speech and privacy could be at risk for dissenters.

This is despite the 2015 striking down of Section 66A of India’s Information Technology Act by the Supreme Court because it was said to have a ‘chilling effect on free speech’. In a 2017 statement, the Indian supreme court also recognised informational privacy as a fundamental right. With practice preceding policy, there is a void on clear policy against the use of AI by the state in a way that violates fundamental freedoms of the citizens.

#20 Jan 2020
Monday, 2pm

### References

[1] [Twitter thread by Yonatan Zunger](https://twitter.com/yonatanzunger/status/975545004205654016)

[2] [Google ‘fixed’ its racist algorithm by removing gorillas from its image-labeling tech](
https://www.theverge.com/2018/1/12/16882408/google-racist-gorillas-photo-recognition-algorithm-ai)

[3] [Artificial intelligence policy in India: a framework for engaging the limits of data-driven decision-making](https://royalsocietypublishing.org/doi/full/10.1098/rsta.2018.0087)

[4] [Delhi Police Is Now Using Facial Recognition Software to Screen 'Habitual Protestors'](
https://thewire.in/government/delhi-police-is-now-using-facial-recognition-software-to-screen-habitual-protestors)



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
