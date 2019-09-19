---
layout: post
title: "Contributing to OpenStreetMap"
categories: idc
---

## What is OSM?
[OpenStreetMap](https://www.openstreetmap.org) is an open source project that aims to create a free, editable map of the world. It's like Wikipedia, but for maps.

#### Contributing to OSM
As part of my Data Visualization course at IDC School of Design, my classmates and I went to Galleria and Central Avenue in Hirandandani, Powai, and marked some places on the map. This article documents which places we went to and what we marked.


| Contributor | Area                     | Amenity                                                                                                | Count |
|-------------|--------------------------|--------------------------------------------------------------------------------------------------------|-------|
| Gyan        | Galleria, Central Avenue | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 27    |
| Gyan        | Galleria, Central Avenue | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 27    |
| Gyan        | Galleria, Central Avenue | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 27    |
| Gyan        | Galleria, Central Avenue | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 27    |
| Gyan        | Galleria, Central Avenue | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 27    |
| Gyan        | Galleria, Central Avenue | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 27    |
| Gyan        | Galleria, Central Avenue | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 27    |

### How did we do it?
Most of us followed the instructions to update OSM through the Java based OSM editor JOSM, for which our senior Rohit had a [blog article](http://rohitg.in/2017/08/31/ContribOSM/). However, this method is a little complicated, and doesn't work very well for people with iOS devices, and even for Android requires a series of hoops you have to jump through.

A much easier method to contribute to OSM is using the [MAPS.ME](https://maps.me/) mobile app. They have an app for both iOS and Android, and I'm detailing the process below.

#### Step 0
Before starting, review the OSM contribution guidelines.

#### Step 1
Sign up for an OSM account at [openstreetmap.org](https://www.openstreetmap.org/).  

#### Step 2
Download MAPS.ME for [Android](https://play.google.com/store/apps/details?id=com.mapswithme.maps.pro&hl=en_IN) or [iOS](https://apps.apple.com/us/app/maps-me-offline-map-nav/id510623322).  

#### Step 3
Open the Settings section in MAPS.ME and go to the OpenStreetMap profile option. Sign in with your OSM credentials.

#### Step 4
Dont do armchair mapping, and get out into the field. Use the overflow menu to find the "Add place to the map" option. Select the type of amenity, and you can fill out more details about the place like the name or business hours or phone number (depending on the type of amenity). 

## Checking your contributions with Overpass

Go to the [Overpass Turbo](https://overpass-turbo.eu/) website and paste in the code below, but replace ````GauriT```` with your OSM username.

````
{% raw %} [out:json][timeout:25];
(
  node(user:"GauriT")({{bbox}});
  way(user:"GauriT")({{bbox}});
  relation(user:"GauriT")({{bbox}});
);
out body;
>;
out skel qt; {% endraw %}
````

![Overpass Turbo Website](https://gyanl.com/blog/assets/overpass.png)

On the right pane, navigate to the area you mapped and you should be able to see all your accepted changes. If you can't see the changes, they might be under review by the OSM community, and you can check in later.