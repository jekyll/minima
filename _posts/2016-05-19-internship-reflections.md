---
layout: post
title: "Internship Reflections"
categories: technical-role
---

I would like to share my internship experience here, and also some reflections.

## My Internship Experience Explained

Here I objectively elaborate what the points meant on my resume.

**2359 Media**
`Dec 2018 - Sep 2019`<br>
 Software Engineer Intern

- Delivered an API for chatbot builders to provide logic to the chatbot without writing code
- Developed a file conversion tool to visualise the chatbot content in a spreadsheet
- Technical domains: nodejs Express, Azure Functions, python

A chatbot is essentially an intent classifier, that returns a pre-scripted response. The intent classifier is trained with samples of freeform text that the end-user may provide. For more advanced chatbots, the range relevant intents is limited based on the state of the conversation.

A chatbot is usually configured on a chatbot console, which allows you to edit the intent and responses of the chatbot. Editing on a chatbot console like Dialogflow requires multiple clicks and waiting. The console also usually does not allow you to see all the responses on one screen, and it is usually important to compare responses as you want a consistent tone and format on how your chatbot responds.

I wrote a helper tool to visualise chatbot content on a spreadsheet. Editing a spreadsheet is intutitive, and many people know how edit cells, and make the information presentable by resizing cells and applying conditional formating. Essentially the helper tool converts the zip file into a Google spreadsheet, and vice versa (but the latter is not tested).

Another tool that I built with my fellow intern is a process for chatbot builders to set up logic into the chatbot without the need of a developer's help. We deployed a middleware which processes the API calls from the chatbot, replacing the custom fields with values from a Google spreadsheet.

I started working part-time from in the winter break of 2018-19, and worked full-time during the summer until my school term start. I got to know about the company from a coursemate.



**Teralytics**
`Jan 2020 - Nov 2020`<br>
Data Science Intern

- Designed and implemented metrics to illustrate the accuracy of proposed methods
- Optimized and parallelised routine calculation pipelines with PySpark
- Technical domains: python pandas matplotlib pyspark, git, unit tests, bash

Teralytics aggreates and analyses telecom data to provide the mobility insights for the clients. The data from telecom operators should have been anonymised when it reaches us.

I worked on a Python codebase. I helped to create new metrics and visualisations for the data, the visualisations are included automatically generated daily/monthly/quarterly reports. I also optimised and parallelised some routine calculation pipelines with PySpark to speed up the computation time so that reports can be generated faster. I also helped to experiment with a classifier to validate the accuracy of a feature with other features.

I got to know the company through a course project (Data and Business Analytics) sponsored by the company. The project was sourced by the school. I found the scope of the project to be very reasonable, and the feedback from the company mentors to be very sensible. I applied for the company right after the final project presentation and was accepted for an internship after a data science interview. I started working part-time from January 2020 to April 2020, and full-time remotely during the summer break. I extended my internship part-time remotely until November 2020.



**Versafleet**
`Dec 2020 - Jan 2021`<br>
Data Science Intern

- Explored vehicle and driver features to improve the estimate of the time of arrival
- Reviewed literature and prototyped a learning-based approach for vehicle routing problem
- Technical domains: python or-tools pandas matplotlib, git, PostgreSQL

Versafleet helps route planners to plan routes. Manual route planning is an involved process, it can get more complicate with more tasks, vehicles and constraints. Versafleet resolves this pain point by providing an algorithm and webapp that generates the route plans and allow route planners to visualise and modify the generated plans. Versafleet also provides a mobile app for the drivers to check off their tasks.

I got to know the founder through a seminar in late 2018. I sought capstone project sponsorship from the company, but eventually it did not happen. Near the end of my Teralytics part-time internship, Versafleet approach me to see if I am interested work during the winter. After, a basic data science interview, I was invited to work on two experiments over seven weeks.

The first experiment involves understanding the vehicle and driver features available and see if the knowledge improves the estimate of the time of arrival. The second experiment involves understanding handmade routing plans and see if the knowledge helps to make route plans closer to other handmade route plans. I also had the help of a high school student who wrote code to generate some synthetic route plans. For both experiments, I need to query the relevant data from the database.



## Internship Reflections

I now share some reflection over my internships, and also some advice on how to do better during an internship. (Please refer to another post on my thoughts on how to get a better internship.) To maintain some ambuguity, each of the points here may apply to all, some or none of the internship experience I had.

Understand the internship expectations. Your internship may be just an extended interview where you are expected to take initiative to network widely. Your internship may require you to focus on an existing product and you are expected to write quality code and documentation that last. Your internship may be an experiment that the company needs to do, and you are expected to explore widely with rapid prototyping. Understanding what actually matters to your supervisors and the company guides you to work on the relevant areas in an effective manner.

Understand the company. Go beyond your role and learn about the company. What is the company strategy and how are they faring against competitors? Who holds the power? How are decisions made? Analyse the company as well. What motivates the employees? Do the employees approve of the management? Think of recommendations as well. Feel free to discuss this with your colleagues if appropriate, and lunch (when it was possible) is a great time for these discussion. Having some answers to many of these questions gives you a prespective of the management.

