---
layout: post
title: "Contributing to OpenStreetMap"
tags: idc foss
categories: [design]
---

## What is OSM?

[OpenStreetMap](https://www.openstreetmap.org) is an open source project that aims to create a free, editable map of the world. It's like Wikipedia, but for maps.

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

Go to the [Overpass Turbo](https://overpass-turbo.eu/) website and paste in the code below, but replace `GauriT` with your OSM username.

```
{% raw %} [out:json][timeout:25];
(
  node(user:"GauriT")({{bbox}});
  way(user:"GauriT")({{bbox}});
  relation(user:"GauriT")({{bbox}});
);
out body;
>;
out skel qt; {% endraw %}
```

![Overpass Turbo Website](https://gyanl.com/assets/overpass.png)

On the right pane, navigate to the area you mapped and you should be able to see all your accepted changes. If you can't see the changes, they might be under review by the OSM community, and you can check in later.

## Contributions by IxD 2020

As part of my Data Visualization course at IDC School of Design, my classmates and I went to Galleria and Central Avenue in Hirandandani, Powai, and marked some places on the map. This article documents which places we went to and what we marked.

| Contributor | Area                                                                                                               | Amenity                                                                                                | Count |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ----- |
| Avyay       | Central Avenue, High Street, and Powai Road                                                                        | Benches, Dustbins and and Bus Stops                                                                    | 55    |
| Aishwary    | Central Avenue: the Lucky Lane                                                                                     | Everything in the lane (shops, buildings, services)                                                    | 48    |
| Prachi      | Galleria, Central Avenue                                                                                           | beauty, clothing, services, food                                                                       | 37    |
| Dhiraj      | Powai area opposite to IIT campus                                                                                  | All                                                                                                    | 37    |
| Bhawna      | Powai area opposite to IIT campus                                                                                  | All                                                                                                    | 37    |
| Gauri       | Orchard Avenue, Heera Panna Shopping complex                                                                       | Shops, Restaurants, Gardens, Bus stops                                                                 | 32    |
| Akshay      | area in front of Y point gate                                                                                      | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 30    |
| Mayura      | area in front of Y point gate                                                                                      | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 30    |
| Aisha       | area in front of Y point gate                                                                                      | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 30    |
| Gyan        | Galleria, Central Avenue                                                                                           | beauty, clothes, convenience, electronics, electronics_repair, jeweller, optician, printer, stationery | 27    |
| Rishi       | Hiranandani Galleria, Central Avenue                                                                               | Amenities (Food related), a few shops                                                                  | 26    |
| Anjan       | Central avenue, Galleria, Hiranandani                                                                              | Restaurants, Eateries, Cafe                                                                            | 21    |
| Maulashree  | Central Avenue, Forest Avenue in Hiranandani and also Vasant Vihar, Siddhachal and Pokharan road number 2 in Thane | Fast food chains, benches, restaurants, cafes, stationery shops, convenience stores, medical stores    | x     |
| Rashmi      | Central Avenue                                                                                                     | ATM, fashion, flower shops, pharmacy, spa, cafe and restaurants, wineshop, dustbins                    | x     |
| Shraddha    | Central Avenue                                                                                                     | ATM, fashion, flower shops, pharmacy, spa, cafe and restaurants, wineshop, dustbins                    | x     |
| Eeshani     | Jogeshwari Vikhroli link                                                                                           | Apartment, shops                                                                                       | x     |

#### Mapping your contributions

It is possible to use Leaflet to map your contributions on an embeddable map. As an example, I mapped my classmate Gauri's contributions here:

**GauriT's contributions**

<iframe src="https://overpass-turbo.eu/map.html?Q=%2F*%0AThis%20is%20an%20example%20Overpass%20query.%0ATry%20it%20out%20by%20pressing%20the%20Run%20button%20above!%0AYou%20can%20find%20more%20examples%20with%20the%20Load%20tool.%0A*%2F%0A%0A%20%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A(%0A%20%20node(user%3A%22GauriT%22)(19.10746008762309%2C72.89656162261963%2C19.13645149519419%2C72.93050765991211)%3B%0A%20%20way(user%3A%22GauriT%22)(19.10746008762309%2C72.89656162261963%2C19.13645149519419%2C72.93050765991211)%3B%0A%20%20relation(user%3A%22GauriT%22)(19.10746008762309%2C72.89656162261963%2C19.13645149519419%2C72.93050765991211)%3B%0A)%3B%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B%20
"></iframe>
