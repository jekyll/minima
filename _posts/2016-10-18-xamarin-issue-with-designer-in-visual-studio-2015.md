---
layout: post
title:  "Xamarin issue with designer in Visual Studio 2015"
date:   2016-10-18 14:54:00 +0300
categories: other
---

I have Visual Studio 2015 Update 3, Xamarin 4.2.0.703, Android 7.0 SDK Platform (API 24), Android SDK Tools 25.2.2, Android SDK Build-tools 24.0.3 .

An issue message:

```
The installed Android SDK is too old. Version 25.1.3 or newer is required. Please update to the latest version.
```

![](https://github.com/vmaks/vmaks.github.io/blob/master/images/2016-10-18-xamarin-issue-with-designer-in-visual-studio-2015.jpg)

To fix the issue you have to download Android 6.0 SDK Platform (API 23).

[Thanks to John Watmuff from stackoverflow.](http://stackoverflow.com/a/40077831/3001953)

It's shame for Xamarin to have an issues like these.
