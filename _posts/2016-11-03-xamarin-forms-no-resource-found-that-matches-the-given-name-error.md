---
layout: post
title:  "Xamarin Forms no resource found that matches the given name error"
date:   2016-11-03 23:53:00 +0300
categories: xamarin
---

I have Visual Studio 2015 Update 3, Xamarin 4.2.0.719, Xamarin Forms.

Sometimes you could get an error like these below.

```
Error   No resource found that matches the given name (at 'src' with value '?attr/mediaRouteAudioTrackDrawable')...

Error   No resource found that matches the given name (at 'textAppearance' with value '?attr/mediaRouteChooserPrimaryTextStyle')...
```

To fix the error you should do the following:

1) Delete everything in the *C:\Users\USER_NAME\AppData\Local\Xamarin* folder.

2) Also clean everything in a project *obj* folders.

3) Rebuild the project.

I found the solution [here](https://forums.xamarin.com/discussion/47224/no-resource-found-that-matches-the-given-name-with-value-integer-google-play-services-version).
