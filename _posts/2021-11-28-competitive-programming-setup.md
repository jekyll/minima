---
layout: post
title: "Competitive Programming Setup"
---

In this post, I describe my competitive programming setup. I use this set-up for the following competition platforms.

- Codeforces
- AtCoder
- Codechef
- Google Code Jam / Kick Start
- Facebook Hackercup

Topcoder and Leetcode are not included in this list. You can refer to [another post](https://blog.huikang.dev/2021/05/13/competitive-programming.html) on how I got into competitive programming.

I write to this repository for every contest.
> [https://github.com/tonghuikang/codecomp/](https://github.com/tonghuikang/codecomp/)


## Requirements

These are the consideration on my choice of the competitive programming setup.

- Similar workflows. For each platform, I want to have almost the same tools to write, test and submit my code.
- Minimal installation. I do not want to install CLI that I do not fully understand its contents.
- Easy to use. I do not want to use a workflow just for the sake of using it.
- Easy to set up. When I set up a new computer, I should be able to set up these tools quickly.


## Workflow

This is a summary of my workflow with some explanations.


#### Before the start of the contest

- Enter the directory `./template`
- Create a new branch with the contest initials
- Run `sample_gen.py`
- Open VSCode `code .`
	- I have an alias for opening VSCode `alias code="open -a /Applications/Visual\ Studio\ Code.app"`


#### At the start of the contest

- Go to the task list, click on the Competitive Companion Chrome extension
  - This will crawl the pages and send the test cases to a port. `sample_gen.py` listens to the port and writes the test cases into a file. The script in the Chrome extension to crawl the page and parse into a standardised format is maintained by the open-source community.
  - For Google, Facebook and Codechef, I need to go to individual questions.
  - Commit the test cases. I use an alias `ggc` which combines `git add` and `git commit -m "cases"`


#### During the contest

- In the code template, there are examples of how to parse the input. Uncomment and use them. You can also use other code templates for standard methods such as Dijkstra and union find.
- To test the Python code for problem `a`, run `px a`
  - `px` is an alias for `./run_py.sh a` which runs all the test cases of problem `a` with `a.py`. It compares the output with the expected output.
  - I have written scripts to test C++ and Kotlin code.
  - The time taken will be printed. This may not be equivalent to the time taken on Codeforces.
- Code submission is manual. I need to choose the file to upload to the competition platform. I do not see the point of automating this.
- I might checkpoint the code with a commit.
  - I will be careful not to push the code, which will publish the code and is against contest rules. `git push` alone will not push the code.


#### After the contest

- Make the final commit and push the code to origin.
- Return to the `master` branch.

The procedures for interactive problems on Google are stated in the repository. For interactive problems on Codeforces, we have to depend on proofs by AC.


## Conclusion

This is my competitive programming setup and I find it pretty efficient to use.  I have been using this workflow for half a year. The most recent addition is the use of the Competitive Companion extension. I hope this inspires your setup.
