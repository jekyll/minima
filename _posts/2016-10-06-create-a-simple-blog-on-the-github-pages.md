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

8) Run a server by the command:

```
bundle exec jekyll serve
```

9) Check the server by opening the web page:

```
http://localhost:4000
```

10) Сommit all changes.

11) Check the following web page: 

```
username.github.io
```

Additional links:

https://pages.github.com/

https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/
