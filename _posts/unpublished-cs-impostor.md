---
layout: post
title: "What am I studying in university"
---

# How to be a CS impostor

After failing multiple technical interviews for being clueless on the computer science concepts, I realised that I needed to be better impostor.

This document compiles answers optimised the **knowledge questions** for software engineer interviews. Refer to the other document for data science topics.


* auto-gen TOC:
{:toc}


### What is this about

I am making this for myself, but I am still wondering how can this be useful to others.

Collaborators are welcome and much needed, because I do not have the required background (my degree is not Computer Science).

Ideally you should currently be taking interviews that ask some knowledge questions, for example
- What is the difference between thread and processes?
- Explain the difference between the various neural network optimisers.

Please message me somehow, if you are interested.


### How to answer questions

- The purpose of your answer is to demostrate knowledge of the subject, rather than to teach the concept. You do not need to explain everything from scratch.
- You should keep your answer concise. You need to condense all you know into around three sentences. They will ask for more if they want. There is likely many other questions to go through, and you might need to code too.
- If you do not know the answer to the question, try explaining from what you know (the concepts mentioned), and try to answer their question.
- You should know what you are talking about. It is better to concede when you do not know further.
- To show your experience and make your answer unique, you may want to elaborate with an example on how you applied the concepts in question.


### How to ask questions

- (Good to understand how thoughtful interview processes are designed)
- Whether are knowledge questions good - considering that it can be memorised
- What questions are better - those that are more conceptual for example, rather than facts
- How to follow up
- How to assess - commuication skills (how simple can you explain it), conceptual correctness, experience in applying the concept


### What should this contain

- No opinions. While we should have opinions (on ethics, predictions, controversies), you have to figure them out and justify them yourself.
- References. This will serve as attribution, and also further reading material to understand the topic.
- Good questions. This should contain questions that can be asked in a technical interview. It should not be a history quiz or a numbers trivia.
- Short answers. Here we prepare short questions that can be reasonably be presented as an answer.
- We would not cover all aspects of computer science, or even everything that is taught in school. This is meant to answer interview questions, not your course examinations.


#### Relevant roles

This interview content guide is meant for new grads. For new graduates,  companies usually recruit for "Software Engineer" or "Data Scientist" and then matchmake your role depending on location and requirements.

- Software Engineer
  - Frontend and Mobile (explain job scope here)
  - Backend (explain job scope here)
  - Site Reliability Engeineer / Production Engeineer (explain job scope here)
  - Data Engineer (explain job scope here)
  - Security Engineer (explain job scope here)
  - Machine Learning Engineer (explain job scope here)
  - DevOps / Productivity Engineering (explain job scope here)
- Data Analyst / Scientist (explain job scope here)
  - Research Engineer / Scientist (usually Masters/PhD required)
- Solution Architect (you sell your company's technical products to customers and provide advice)

Regardless of your technical role, it is important to have some basic knowledge of other technologies. This helps to develop a bigger picture and inform you what is important when you develop your technical solutions. (What does this sentence actually mean lol)



#### Excluded topics

We want interview questions that are immediately relevant to a software engineer or a machine learning practitioner. The following topics are excluded

- Algorithms (please refer to other resources to prepare for the coding component of the interview)
- Mathematics and Theory of Computation
- Computation Structures (Arithmetric Logic Unit) - will this ever be asked in an interview?
- Robotics
- Game Design and Development
- Graphics and Image Processing
- Data Analysis and Information Visualisation



### Useful resources

- [GeeksForGeeks articles](https://www.geeksforgeeks.org/most-asked-computer-science-subjects-interview-questions-in-amazon-microsoft-flipkart/). They tend to explain everything, here I want to summarise the answer that it is good for interview.
- [donnemartin's System Design Primer](https://github.com/donnemartin/system-design-primer). This describes how to prepare to interview questions on designing large-scale systems.
- [Tech Interview Handbook](https://yangshun.github.io/tech-interview-handbook/). How to apply for technical role from resume writing to offer negotiation, and a gentle introduction to algorithms.
- [MIT CSAIL Missing Semester](https://missing.csail.mit.edu/). Introduces tools for software development which is hardly covered in courses.
- [Programmer competency matrix](https://sijinjoseph.netlify.app/programmer-competency-matrix/). An outline of the the different competency levels of each domain of computer science.
- Syllabus and Course Objectives. They are good summaries of the courses that you have taken. [Attempted comparison of CS courses between Singapore universities](https://www.reddit.com/r/SGExams/comments/g3yion/uni_computer_science_curricula/)
- Job Descriptions. Your cover letter should address the requirements point-by-point. Interviews are also likely designed to verify whether you fulfill the requirements.
- Past Interview questions. Some past interviewees share their interviewing experience on online platforms such as [Glassdoor](https://www.glassdoor.sg/Interview), [LeetCode](https://leetcode.com/discuss/interview-experience), [BinarySearch](https://binarysearch.com/). Many of the questions here are adapted from these. 
- Past Successes. Companies are likely to hire based on experience with previous hires. You can search up previous year's hires on LinkedIn and use them as a standard to estimate your chances of success. Regardless, do not be discouraged to submit your resume as long as you are sincerely interested in the role.
- https://blog.hackerrank.com/developer-skills-list/
- Bytedance interivew questions https://osjobs.net/topk/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8/


# Computer Science Topics

I have organised the topics under four fields

- Backend Engineering
- Frontend Engineering
- Security Engineering
- Engineering Management





## Backend Engineering

Technical solutions often involve business logic and information. Business logic requires computational work, and databases require storage.


### Operating Systems

[SUTD 50.005 Computer System Engineering](https://istd.sutd.edu.sg/undergraduate/courses/50005-computer-system-engineering)

What is the difference between process and threads?

- A process may have multiple threads. Different processes do not share memory, different threads of a process share a memory



- Process management and multithreaded programming
- Process scheduling, synchronization, deadlock
- Memory management, file system, and I/O system





### Databases

[SUTD 50.043 Database and Big Data Systems](https://istd.sutd.edu.sg/undergraduate/courses/50043-database-and-big-data-systems)

How do we index a database and why?

- Databases use index to allow faster access to an entry in the database. indexing is done with balance binary search tree to allow O(log n) acceess to the element. you may index the table on multiple columns. the downside of using indexes is storage cost, as well as increase time when modifying the table





What is the difference between SQL-based database, and NoSQL-based databases?
- [MongoDB's explanation of NoSQL](https://www.mongodb.com/nosql-explained)



What are the types of NoSQL Databases?
- Document databases
- Key-value databases
- Wide-column stores
- Graph databases



What is the difference between MySQL, PostgresSQL
- No idea

MongoDB, Ruby on Rails, Redis



Where does join operations happen? How is compute and store separated? Where do compute-intensive workload happen, and what are some examples?



Hadoop and MapReduce



GraphQL

- Benefits - you request as much data as you need
- Should you use GET or POST method? GET method allows for caching, but you do not want to cache at times.
- `nodes` and `edges`



### Distributed Systems

[50.041 Distributed Systems and Computing](https://istd.sutd.edu.sg/undergraduate/courses/50041-distributed-systems-computing)



What is the CAP theorem and how is it applied?

- Consistency, Availability, Partition tolerance





1. Build models of distributed systems.
2. Prototype distributed software systems.
3. Build distributed algorithms using industry-strength programming language.
4. Build algorithms to analyse the correctness of distributed systems.
5. Prototype software and systems to manage files and records in a distributed environment.
6. Build algorithms to analyse and test possible faults in distributed systems.
7. Build techniques to recover from faults in distributed systems.
8. Build techniques at the level of supervisory software to support distributed applications.



Normal and byzantine faults



(Go programming language and why it is suitable?)





### Blockchain

Some basic knowledge of blockchain will help in understanding and communicating its potential and limitations.

[SUTD 50.037 Blockchain Technology]()

What is blockchain?

- TBC
- [Coinbase](https://www.coindesk.com/learn/blockchain-101)




What are some applications of blockchain?

- TBC





## Frontend Engineering

Your clients usually extract value from your business offerings through an interface. Such interfaces need to be intutitive and usable. An appreciation of how the interface is constructed will (I need help pinning down the benefits)

(Vue, React, ?)

ES6, TypeScript, Babel, Web Workers, React, and Angular

package managers (npm), task runners (Gulp, Webpack, Grunt), CSS processors (Sass, Stylus), and APIs (WebSocket)

UI testing 




### Mobile Technologies

Many products adopt a mobile-first strategy, and we need to know how to develop and serve on this platform.



Outline the procedure to publish an application on Google Play Store, and on iOS App Store
- TBC



What are the differences between the mobile browser and desktop browser
- (Chromium, Blink, Webkit?)



## Security Engineering

You need to protect your asset and data from interference and unauthorised access. It is important for all engineers the security implications of what they are working on.

[SUTD 50.042 Foundations of Cybersecurity](https://istd.sutd.edu.sg/undergraduate/courses/50042-foundations-cybersecurity)

[SUTD 50.020 Network Security]( https://istd.sutd.edu.sg/undergraduate/courses/50020-network-security)

[SUTD 50.044 System Security](https://istd.sutd.edu.sg/undergraduate/courses/50044-system-security)

(The course objectives above lacked keywords for me to extract)



What are the objectives of Cybersecurity?
- Confidentiality, Integrity and Availability



What is the difference between symmetric and asymmetric encryption?
- Symmetric encryption uses the same keys to encrypt and decrypt, 





### Networking

Information is sent over the Internet, and communications needs to be secure. 

[SUTD 50.012 Networks](https://istd.sutd.edu.sg/undergraduate/courses/50012-networks)

What happens when you access a website?

- DNS lookup for IP address, and then?

(packet switching, layered architectures, TCP/IP, physical layer, error control, window flow control, local area networks (Ethernet, Token Ring; FDDI), network layer, congestion control, quality of service, multicast, network programming interfaces, networked applications)


How does secure communciation happen through https?

- Security and encryption process - Authentication with Certificate Authority with asymmetric encryption, symmetric for secure communication


How does your computer ensure that the website that you are visiting is authentic?

- Certificate authority




### Threat Management

We need to understand, detect and manage security threats.

Describe how the following attack works, and how to project against it

- Cross-Site Request Forgery (CSRF)
- Cross-site scripting (XSS)
- Distributed Denial of Service (DDoS)
- SQL injection








## Engineering Management

While you are likely to start out from the bottom, you need to understand the prespective of your technical manager. You also may need to make certain design decisions, which involves tradeoffs.

This section also inclulde concept that are relevant in software engineering and not specific to frontend or backend engineering.



### System Design

Questions from the System Design Primer

Explain the following tradeoffs
- Performance vs scalability
- Latency vs throughput
- Availability vs consistency


### Object Oriented Programming

Inheritance versus composition




### Software Testing

Reasons for unit testing

Unit tests and Integration tests

Mocks and why are they used



### Software development

What is the difference between Waterfall and Scrum, and what are its merits?
- TBC



Development processes (?) (Agile Scrum, Lean Manufacturing, Design Thinking, Six Sigma, Lean Startup, DevOps, Software Development Lifecycle)

Test Driven Development

Continuous Integration, Continuous Delivery



How does the git source control process work (fetch, pull, add, commit, push)?





## Unclassified

Different stacks and its merits

- LAMP, MEAN

What is a deadlock

Containers and Kubernetes



Benefits of on-prem, and on cloud, and hybrid setup?



Cloud offerings and how to choose between them



Serverless versus monolithic, advantages and disadvantages



Kafka, Airflow, etc



The data pipeline?



UI/UX, QA



(Primal-dual formulation? Seems like an important concept in optimisation but I do not understand, but this is math)



(Programming languages, choice and design?)



Bluetooth technologies, and TraceTogether





Terraform



Describe the difference between L1, L2 and L3 support







