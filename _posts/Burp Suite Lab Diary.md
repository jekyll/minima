---
layout: post
---
## Documenting My Learning Process: The Trials and Tribulations of Burp Suite

Burp Suite is a set of web application security testing tools developed by PortSwigger used for to identify vulnerabilities. My initial encounter with Burp Suite proved challenging, as I encountered difficulties with the Burp Browser functionality. Despite trying it on multiple platforms such as Ubuntu, Mac, and Windows, and even downloading an updated Java version, the issue persisted. Frustrated, I sought assistance from a peer and we still could not figure it out after performing a Browser Health Check. I stepped away from Burp Suite and returned the next day and eventually realized that I had accidentally enabled the "Intercept" feature, which was causing the problem. Turning off intercept resolved the issue, and I was able to resume my experimentation and learning. This experience served as a microcosm of my broader cybersecurity learning journey, where troubleshooting is an inherent part of the process. While challenges initially make everything seem difficult, the journey becomes easier and more fulfilling as knowledge and skills are gained. Creating a site map of my personal website using Burp Suite was an accomplishment that further ignited my excitement to explore other security tools and continue navigating the learning curve.

### How To Crawl a Website With Burp Suite Community Edition
Crawling a website with Burp Suite involves systematically exploring its pages and functionality to map its structure, identify potential vulnerabilities, and enhance its security posture. This helps uncover hidden or forgotten pages, detects security flaws, and provides insights into the overall security landscape of the web application, enabling proactive measures to mitigate risks and protect against potential attacks.

1. Launch Burp Suite Community Edition. 

2. Configure your web browser to use Burp Suite as a proxy, directing the traffic through Burp Suite. You can modify the proxy settings in your browser to point to the desired address. The default configuration is usually set to localhost (127.0.0.1) and port 8080.
<p align="center"> <img width="376" alt="Screenshot 2023-05-29 at 10 36 07 AM" src="https://github.com/nancyuddin/nancyuddin/assets/119987538/322a249b-a621-445a-879b-31b29fda8916">
</p>
3. Set up the target scope: In Burp Suite, navigate to the "Target" tab and select the "Scope" sub-tab. Add the target website URL or define the scope based on specific criteria, such as domain or file extension. This helps specify the range of pages to be included in the crawl.

<p align="center"> <img width="762" alt="Screenshot 2023-05-29 at 10 37 11 AM" src="https://github.com/nancyuddin/nancyuddin/assets/119987538/f50dd8b9-6d86-4951-bb51-b5a14e14f077">
</p>

4. Use the Proxy tool for manual crawling: In the "Proxy" tab of Burp Suite, you can manually browse the target website by visiting different pages and interacting with the site's functionalities. Open Browser and as you navigate through the website, Burp Suite will capture the requests and responses.

*Note: When you are connected to the proxy and have the Proxy Intercept switched on, your browser will not load whenever you make a request. This was my mistake and therefore was unable to make any web requests through my browser. If your browser is not loading, try checking your proxy!*

<p align="center"> <img width="776" alt="Screenshot 2023-05-29 at 10 38 45 AM" src="https://github.com/nancyuddin/nancyuddin/assets/119987538/a53b6fed-52d2-4ee5-b929-b07d88896884">
</p>

5. Analyze the captured traffic: In the "Proxy" tab, you can review the captured traffic, including the URLs, requests, and responses. This allows you to observe the structure of the website and identify additional URLs to include in the site map.

6. Site map allows you to map out the apps you are targeting in a tree structure. The pages you visit will populate automatically. You can create a site map manually by browsing through the website. 
<p align="center"> <img width="766" alt="Screenshot 2023-05-29 at 10 39 50 AM" src="https://github.com/nancyuddin/nancyuddin/assets/119987538/3c31493e-3c7c-42ba-a2f1-4560ba893b0e">
</p>

7. Export the site map if desired: If you wish to export the site map for further analysis or documentation, you can manually save the site map information in a preferred format, such as a text document or spreadsheet or use a [Site Map Extractor tool](https://portswigger.net/bappstore/f991b67d4ef94f3c8692c3edca06583e). 

### Resources:

- [Try Hack Me Burp Suite Modules](https://tryhackme.com/module/learn-burp-suite)
- [Web Security Academy Labs](https://portswigger.net/web-security/all-labs)
