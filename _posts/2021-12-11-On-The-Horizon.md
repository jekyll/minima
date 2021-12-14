---
layout: post
title: "On the horizon: A new project"
---

Ideas and motivation behind my new project! <!--more-->

If you're actively applying for jobs or reading about people's hiring experiences you'd have often come across this term `portfolio`, being bandied around like hot cakes. What is it? Well it's nothing but a good collection (it can just be one marvelous thing, no need for plural :)) of your work. In the tech world, I'd prefer to call it a "showcase" rather than a portfolio - because it's a representation of your skills - albeit it's not the entire picture, hell it barely scratches the surface , but let's be honest - you're way more inclined to believe me if I showed you that I could beat Eliud Kipchoge in a marathon ([here's](https://en.wikipedia.org/wiki/Eliud_Kipchoge) who he is, by the way) by actually doing it, rather than just _running_ my mouth off, right? 

## Why I'm doing what I'm doing

If like me, you really have a passion for code, then you would be dying to learn all the new buzzwords that you hear and see on Reddit posts, right? Well this is the perfect opportunity for you to use all of them along with building your portfolio. In our world of software, a portfolio is best shown on a versioning system like Git on Github/GitLab/BitBucket (I personally prefer Github). This approach has a twofold benefit - you get to host your code on an industry standard for versioning(Git over SVN) and you can show recruiters you know how to operate Git and organize your projects well. Add onto that a good CI/CD pipeline with Github Actions/GitLab CI/CD and lo behold, you have a very nifty little project that screams **hire me!**. 
So that was my main motivation - passion and an opportunity to show what I can make. It may not be the best looking software (I'm quite artistically challenged) but I'm damn sure I'm going to make it functionally really well built.

## Frontend Stack

Since my go-to frontend framework is React with Typescript (a very good and powerful option once you get to know Typescript well), I wanted to look at how I can use some advanced React concepts into my stack. I've heard a lot about [Redux](https://redux.js.org/), as I'm sure you would have too, along with [Context API](https://reactjs.org/docs/context.html). I have to decide which one to use and decide if my application even needs one of them. After a lot of deliberation and planning which included, but was not limited to [this SO answer](https://stackoverflow.com/questions/49568073/react-context-vs-react-redux-when-should-i-use-each-one) and [Mark's blog post](https://blog.isquaredsoftware.com/2018/03/redux-not-dead-yet/) I decided to go ahead with Context API but also follow a Redux based approach where I define reducers, a store and also use dispatch method to carry out actions. Of course, it will be a fully functional component based architecture with extensive usage of React Hooks - a fantastic feature of React. 

<br>

Vercel has been pushing [Next.js](nextjs.org/) very strongly since the past few months (or at least the past few months that I've noticed) - so I thought I'd check it out. Server side generation along with pre-fetching and ootb TS support? Count me in man. Next.js can be safely added to out stack, it compliments React very well. On a few Reddit posts on [r/reactjs](https://www.reddit.com/r/reactjs/) I had seen quite a few applications using [Apollo Client](https://www.reddit.com/r/reactjs/). Hmmm, this is very intriguing - what is it, why is it so popular, what can it do that [Axios](https://axios-http.com/docs/intro) cannot already do? As it turns out, Apollo is a state management library to allow you to manage local and remote data *with GraphQL*. Now this is a word that's been gaining traction quite strongly over the past few years - notably in the software community. To be honest, I first came across this word/tech when i saw [this](https://hackerone.com/reports/745324) **insane** find (it was gibberish to me back then and not has changed much even now) on HackerOne. I then also found out that it was developed internally by Facebook as early as 2012 before it was released publicly in 2015. GitHub has also released [v4 of their API](https://docs.github.com/en/graphql/overview/about-the-graphql-api) as a GraphQL API. Nice, so we're an almost all Facebook stack, at least on the frontend! ┏(＾0＾)┛┗(＾0＾) ┓

## Backend Stack

Now, this was a decision I had to make - do I want a backend? And then, more importantly do I **_need_** a backend? To answer this, I needed an idea of what I wanted to make. I knew what I wanted, don't worry - I'll disclose it in the next post ;) So the answer for me was simple, I needed to handle user authentication albeit via SSO - so I needed a backend. I had a choice between Django (easy to user, n00b friendly and uses Python), Node.js (easy setup with Javascript - something I'm using even on the frontend and easy to setup) or SpringBoot (heavy and uses Java). Now you should know this about me, I don't _really like Python_. There I said it, and I'm not afraid of the mob either. Since I'm currently primarily working as a Java dev at work, I thought it would be great to use SpringBoot and get my hands dirty by setting up a project from scratch, defining resources, services, mappers, DTOs and adding filters. But hold your horses, we (un?)fortunately won't be following REST as we have a GraphQL frontend. So that means I need to have a backend that can parse a GraphQL query and respond appropriately. Hmmm, this is getting interesting even on the backend - it won't be a good ol' REST API anymore, it'll be a GraphQL API! On surfing the web a bit, I came across the library [graphql-java](https://www.graphql-java.com/). It seems to have really comprehensive documentation and it's pink \\( ﾟヮﾟ)/.

## Wrap Up

So far my tech stack looks like this:

- Frontend
1. Next.js with React.js
2. Context API for state management
3. Apollo Client for GraphQL querying

- Backend
1. SpringBoot Java
2. graphql-java

Quite an interesting stack, wouldn't you agree? (｡◕‿◕｡)
<br>
Now for a few more non-code related details. I'll discuss my Git branching strategy and how I really finalized whether I'd be able to work on the selected tech stack in upcoming blogs - I didn't _just read_ about some tech and decide to work on it. I needed to ensure that it supported all the features I would need. I also plan to setup a Github Actions pipeline for continuous integration from my main branch onto an AWS Elastic Beanstalk instance for both my Next as well as Java application. The caveat? I haven't ever worked with Github Actions or AWS before (っ▀¯▀)つ But we'll figure it out, don't we always?
