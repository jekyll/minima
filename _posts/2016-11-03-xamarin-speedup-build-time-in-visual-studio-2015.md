---
layout: post
title:  "Xamarin speedup build time in Visual Studio 2015"
date:   2016-11-03 23:04:00 +0300
categories: other
---

I have Visual Studio 2015 Update 3 and Xamarin 4.2.0.719.

If you want to speed up your build time for an android project you should do the following things:

1) In a project *properties/Android OPtions/Packaging*
check *Use Shared Runtime*, *Use Fast Deployment* and *Generate one package per selected ABI*.
Look at an image below.

2) Use SSD or ram disk for an emulator, Visual Studio, Android SDK.

3) Use fast google android emulator with *Intel haxm* and without *Hyper-V*.

![]({{ site.url }}/assets/2016-11-03-xamarin-speedup-build-time-in-visual-studio-2015.jpg)
