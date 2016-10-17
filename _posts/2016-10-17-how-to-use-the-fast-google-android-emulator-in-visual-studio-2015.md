---
layout: post
title:  "How to use the fast google android emulator in Visual Studio 2015"
date:   2016-10-17 12:50:00 +0300
categories: other
---

For Windows you could either use Microsoft Visual Studio Hyper-V or Google android emulator. 

If you want to use Microsoft emulator you have to use Windows Pro edition with Hyper-V support. You have to activate Hyper-V otherwise the emulator won't work. If you will activate Hyper-V then you won't be able to use Google android emulator, VMware or any other technology is not based on Hyper-V. Also despite the fact that Microsoft claims that her emulator is the fastest, on my machine,  Google emulator boots about 4 times faster compare to the Microsoft emulator (10 s vs 40 s).

Anyway, I decide to use Google android emulator.

I faced a lot of problems in my way so I decided to describe it by steps.

1) Download and install the latest [Android Studio](https://developer.android.com/studio/index.html) and [Visual Studio 2015](https://www.visualstudio.com/vs/) (check Xamarin, Android SDK, Android NDK options).

2) Download Google android emulator via *AVD Manager/Create Virtual Device/Phone/Nexus 5/Recommended*. Then choose API level 22.

3) Change Android SDK path and JDK in Visual Studio.

```Tools/Options/Xamarin/Android Settings/Android SDK Location```

Set to 

```
C:\Users\USER_NAME\AppData\Local\Android\sdk
```

or other place where Android Studio usually puts it (I will call it ANDROID_STUDIO_SDK_PATH)

4) Change Java Development Kit Location:

Set path to a JDK 8 x86.

5) [Change Android SDK path in the register](https://msdn.microsoft.com/en-us/library/mt228282.aspx#ADB) :)

Open "regedit" and find the 

```
HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Android SDK Tools
```

Replace the existing path by ANDROID_STUDIO_SDK_PATH.

6) Restart the PC.

7) Run the Visual Studio. Then run the Google emulator Android Studio (or from a console). Then you should be able to see the emulator in the devices list.

Examle of a console command to run the emulator:

```
C:\Users\USE_NAME\AppData\Local\Android\Sdk\tools\emulator.exe -netdelay none -netspeed full -avd Nexus_5_API_22
```

8) If you have any problems fell free to write a comment.

9) Default Visual Studio paths, if anything goes wrong, are listed below. 

JDK:
```
C:\Program Files (x86)\Java\jdk1.7.0_55
```

Android SDK:
```
C:\Program Files (x86)\Android\android-sdk
```

Android NDK:
```
C:\ProgramData\Microsoft\AndroidNDK\android-ndk-r11c
```

Android SDK path in the register is the same as Android SDK.
