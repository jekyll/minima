---
layout: post
title:  "Create a simple blog on the GitHub Pages"
date:   2016-10-06 11:24:00 +0300
categories: other
---

I wrote a post about how to create a simple and free blog with help of the GitHub Pages.

I used Ubuntu 16.04 x64.

I described all steps below:

1) Install all requirements:

```
sudo apt-get install ruby-dev
sudo apt-get install zlib1g-dev
sudo apt-get install nodejs
```

2) fork the following project:

```
https://github.com/jekyll/minima
```

3) Rename the project to the "username.github.io".

4) git clone the project above in a dicrectory.

5) Run the following command in the directory:

```
bundle install
```

6) Copy all files (except "_posts" folder) from the example directory to the root folder of the project.

Delete example directory.

7) Add a post to the "_post" directory.

8) Edit *_config.yml* file

Replace

```
baseurl: "/minima"
```

by

```
baseurl: ""
```

You could also edit other filds in the files as needed.

9) Run a server by the command:

```
bundle exec jekyll serve
```

10) Check the server by opening the web page:

```
http://localhost:4000
```

11) Сommit all changes.

12) Check the following web page: 

```
username.github.io
```

13) Add Disqus support:

a) register on the [site](https://disqus.com/).

b) find disqus shortname, more info is provided by the [following link](
https://help.disqus.com/customer/portal/articles/466208).

c) add to the *_config.yml* file the following code:

```
disqus:
    shortname: YOU_DISQUS_SHORT_NAME
```

14) Add Google Alytics support:

a) register on the [site](https://analytics.google.com/analytics/web/).

b) add to the *_config.yml* file the following code:

```
google_analytics: UA-********-*
```

where UA-********-* - it is your Tracking ID.

*Additional links:*

https://pages.github.com/

https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/
