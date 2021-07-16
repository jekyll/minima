---
layout: post
title: "Content for JC sharing session"
---

[TOC]



# Personal Introduction

- SUTD student, Engineering Systems and Design
  - Model systems in terms of math and code, and analyse and optimise the systems
  - In a programme that requires me to take business courses leading to an SMU business degree
  - Not from computer science or information systems
- AJC student
  - PCME - AAAB/BB(A)
  - Project Eureka
    - H3-SRP on Merkle-Damgard construction
    - SSEF Merit with Integer factorisation with a sum of four squares
    - Do consult me for code-based project ideas
  - See my notes on owlcove.sg
- Technical Internships
  - 3 companies over 8 months full-time and 8 months part-time
- Interview experience
  - Interviewed with a total of 6 companies
  - Incoming Quora Software Engineer
- See resume and blog
  - https://resume.huikang.dev
  - https://blog.huikang.dev
- Motivation of this talk
  - To inform what software engineering is like
  - To describe the expectations of a technical career
  - To encourage more Singaporeans into software engineering
  - (To record the current stage of my life)
- Interesting projects that I have done
  - Timetable scheduling
    - Given constraints, suggest a timetable for the school
  - Game AI playing Snake
    - Train an AI to play snake

---

# The appeal of working in software engineering

Here I explain my main motivation for working on software engineering. It is easy to explain how doctors, lawyers or teachers add value to society and find joy in the profession.

- The power to create
  - Software engineering is very accessible. If you have your computer, you can put together a technical solution at a very low cost. You can get feedback for your creation with stakeholders.
  - You can create anything with code. If you want to implement an essay completion algorithm, you can follow resources available online to reproduce the results, modify them for your application or improve on the model.
- The potential to serve millions or billions
  - A small scale projects can help you and your friends
  - A large scale project (with a company) can help millions or billions
  - It is easy to build something. Getting people to use is hard. Asking people to pay is harder
- Huge opportunity
  - The most popular courses professions - medicine and law are increasingly using technology.
  - Successful companies need to be able to develop and use their own technology.
- Renumeration
  - One of the highest paid jobs after university education is software engineering.

---

# Workflow of a technical role

It is true that the core of software engineering is coding. However, it is not about writing code all day. Here I want to give a perspective on what else goes into writing code,

Code is usually packed in repositories. How are the repositories are edited

- Identify what to solve
  - Could be adding a simple feature, fixing an issue
  - These plans could be made at the start of the week
- Make a copy of the code (Creating a branch)
- Make edits and save edits (Making commits)
- Propose to merge edits with the main version (Make pull request)
  - Automated tests will be run to check if it breaks any existing tests
- After code review, the proposed edits are approved and combined with the main version (Merge branch)
- There may be a second round of checking by human testers and security analysts before it is deployed to serve customers live (production)

We see that editing code is a collaborative process. There is a lot of communication and planning involved. This is what differentiate software engineers. When you write code, your code needs to be robust and efficient, and it has to be read and edited by future developers.

We also now have some sense of what measures the success of a software engineer. The number of lines written does not indicate the productivity or effectiveness of the software engineer.

---

# Tools used in a technical role

Another perspective of software engineers I want to provide is based on the tools at the software engineer use. 

- Code editor
  - You definitely need to write code, in some language
  - There are some software that helps you highlight
- Version control (git)
  - You will be collaborating with other people on the code
  - You will be editing the code on your version
  - To change the main version of the code you need to undergo a code review
- Testing
  - Your code needs to work
  - Tests are written to ensure that they work
- Automation
  - Your code needs to be run on certain computers
  - You need to configure the computer you are deploying on, and the deployment process
- Documentation
  - Other people need to understand your code
  - You need to explain what your code is doing

---

# Software engineering specialisations

- Software engineering basics is required in all specialisations

  - The basics are described above, although some people focus more on one than the others

- Specialisations

  - Frontend
    - Writes the code that is run on your computer
  - Backend
    - Writes the code that is run on the company's computers
  - Fullstack
    - Works on frontend and backend code
  - Data science / Machine learning / Artificial Intelligence
    - Research, design and build predictive models
    - Engineering track and Research track
      - Research roles usually require Masters / PhD and require reading applying research papers
  - Data engineer
    - Prepare data for analysis or operations
  - Security engineer
    - Analyse whether the practices adhere to security standards
  
- Note on specialisations
  - Different people have different definitions
  - Other classifications may be useful
    - "Code-first" vs "Product-first"
      https://medium.com/@zachlloyd/code-first-vs-product-first-a086d982b7d0

---

# The tech landscape in Singapore

There is a common perception that engineering in Singapore is undervalued. I would like to provide a better insight into the following points. 

- Salaries
  - Graduate starting salaries (Ref TBC)
  - Waterloo survey
    https://uw-se-2020-class-profile.github.io/profile.pdf
  - Levels.fyi and Singapore equivalent
  - Geographical variation
- Career progression
  - Expectations at each level
  - https://www.quora.com/What-is-the-expectation-out-of-each-software-engineering-level-at-Facebook/answer/Dima-Korolev
  - Software engineering is a collaborative process
- Addressing the perceptions of software engineering [TODO]
  - Software can be written by the lowest bidder
    - Vietnamese graduate salaries
    - https://www.csc.gov.sg/articles/how-to-build-good-software
  - Some day we will not need software engineers anymore
    - https://www.commitstrip.com/en/2016/08/25/a-very-comprehensive-and-precise-spec/
  - The varying software engineering environments in Singapore
    - http://elijames.org/the-two-tiers-of-singapores-tech-companies/
  
- Market of software engineering
  - Company types [TODO]
    - Big tech companies
    - Banks
    - Government
    - Consultancies
  - Size of the Talent pool [TODO]
    - NUS CS, NTU CS enrolment, total IT enrolment
    - Compared to how many open roles and internships in the companies
  - FAANG-tier - Google / Facebook / Bytedance / Indeed / Stripe / Paypal
    - Google SWE interns on average have two prior internships at tech companies
    - More than half of Google / Facebook new graduate hires interned in Google / Facebook before
  - Established tech companies - Grab / Go-Jek / etc
    - More than half of the interns have a strong prior internship
    - All new graduate hire at least have a prior internship at tech companies
  - Empirical data is hard to find
    - The only empirical data is graduate starting salaries for each course

---

# How to prepare for a technical career

Here I provide some long-term advice on how to prepare for a technical career. I will address this from the perspective of how hiring manager and recruiters choose among candidates.

What I describe here probably applies to all professional roles as well.

- The hiring process
  - Resume screen > Online assessments > Interviews > Offer
- How to pass the resume filter
  - Summary
    - For internships and fresh graduate role, university name and previous internship experience are the main filters, the rest are tiebreakers. Not supported by data, but by browsing many LinkedIn profiles.
  - University name
    - NUS/NTU/SMU/SUTD is considered to be better than other Singapore universities
  - University course
    - I think all information technology majors are considered to be the same. We see that CS majors have the most successes because people who enter take CS are the most competitive
    - You need other proof of expertise if you do not enroll in an engineering course
    - For top companies, you usually need an above-average GPA. Some banks filter out applicants for below-average GPA.
  - Internships / Work Experience
    - Usually, your course requires you to complete an internship
    - Internship will be the main differentiator of resumes
    - Recruiters will judge the quality of your internship experience
    - An endorsement by another company is a strong signal to allow your resume through the first filter
    - Spend your first summer doing a technical internship, you need to start somewhere
  - Projects
    - Project choice
      - Something that interests you, start small and get advice
    - Document and explain the project
      - Writing helps to consolidate what you have learnt
      - Others cannot appreciate if you cannot show and explain what you are doing 
    - Maintain a blog
  - Certifications
    - Cloud Certificates (GCP, AWS)
    - Security Certificates (OSCP)
  - Competitions
    - Kaggle (Data science competitions)
    - Competitive programming (Codeforces)
    - Hackathons / Company events (ad-hoc, will usually be publicised by career office or student clubs)
- How to pass the online assessment
  - Practice coding questions
    - Leetcode, BinarySearch
- How to pass the interviews
  - The best way to practise for an interview is to go for a real interview
    - The next best way is to practise interviewing with your friend
  - Guides
    - https://frontendinterviewhandbook.com/
    - https://techinterviewhandbook.org/
- General advice (if you are on the professional path)
  - Passion
    - You need to be able to convince yourself that you are making an impact
  - Networking
    - Take the opportunity in university to get to know each other
    - Purpose - exchange learning, share insights, ask questions, exchange contacts (for future questions)
  - Mental health
    - Life is a marathon
    - There is no need to overload yourself
    - Take a break when necessary

---

# What you (JC student) can do next

You might want to find out if coding is for you.

What could you do after finishing A levels (and during NS), when you have loads of free time

- Coding bootcamps - Singaporeans might be eligible for massive discounts
- Leetcode / BinarySearch.com - solve simple algorithmic tasks
- Kaggle - data science competitions

If you need to write code for a JC science project (presumably done over the December break)

- Fun fact [TODO]
  - I implemented my integer factorisation algorithm on Excel
- Could I have learnt Python?
  - Coding and computer science was not a thing back then
  - Resources
- Could you learn to code over the December break
  - Possible, but requires a strong commitment
  - Great if at least one of you knows already how to code
  - Your mentor can advise

