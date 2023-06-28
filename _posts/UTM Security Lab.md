---
layout: post
title: "UTM Security Lab"
categories: misc
---

# UTM Security Lab
### Introducing my security project I have built on UTM, currently undergoing updates to enhance its functionalities and features. This repository showcases the minimal viable product, serving as a foundation for further development and exploration of this network architecture.

A **client-server network** is a communications model in which multiple client programs share the services of a common server program. The client sends a request and the server responds with this back-and-forth pattern while adhering to a common communications protocol, which sets the rules, language, and dialog patterns to be used. A cybersecurity approach is necessary to protect the integrity, confidentiality, and accessibility of a computer network due to growing threats that can disrupt the flow of data and business operations e.g. DoS/DDoS, viruses, worms, Trojans, on-path (man-in-the-middle) attacks, and side-channel attacks. Cybersecurity Ventures expects global cybercrime costs to increase by [15 percent per year over the next five years, reaching $10.5 trillion USD annually by 2025](https://cybersecurityventures.com/hackerpocalypse-cybercrime-report-2016/). There are many processes, tools, and configurations people can use to implement network security. 

**Virtualization** is the process of running a virtual instance of a computer system; virtualized machines can run applications that are isolated from the host operating system. On my Mac OS, I used UTM to virtualize several machines, including Ubuntu 22.04.1 LTS (Jammy Jellyfish). Ubuntu server is an open-source operating system that offers container deployment, cloud services, database servers, and more. I configured Ubuntu by upgrading and setting a static IP address to 192.168.64.13. I used Nano Text Editor to edit the netplan file with ```sudo nano /etc/netplan/01-network-manager-all.yaml.``` I installed pfSense, a software that remembers information about connections flowing through the firewall to automatically allow reply traffic. Next, I connected Ubuntu with pfSense. Firewalls monitor and filter incoming and outgoing network traffic based on predetermined security rules. After setting pfSense’s IP static address of 192.168.64.6, I successfully pinged Ubuntu and pfSense to confirm connectivity. 

**Secure Shell (SSH)** is an encrypted protocol to connect and control other servers, allowing administrators to modify servers remotely. I enabled SSH on Ubuntu (See Image 2) and am able to log in to other machines, including pfSense and vice versa. 

Then, I installed Splunk on Ubuntu and connected Splunk, a platform that searches, monitors, and analyzes machine-generated data, as **security information and event management (SIEM)** for my network. SIEM offers real-time monitoring and analysis of events as well as tracking and logging of security data for compliance or auditing purposes. Splunk is currently installed (see Image 3, 4). I also bound Suricata with pfSense (see Image 1). Suricata is an open-source Intrusion Detection System (IDS) project to help detect and stop network attacks based on rules. (IDS) automates the inspection of logs and real-time system events to detect intrusion attempts and system failures. On pfSense’s Package Manager, I installed the Suricata plugin. On Suricata’s Global Settings, I used the ET Open rules and The Snort Community Ruleset. Then, I set up the interface on WAN and enabled all the rules. If I had more details on the scope of a project for a business, I would fine-tune the rules. Under Alerts, I could view logs of activities. There may be false positives so diligently investigating entries is necessary. On many IDS, engineers review logs and decide if traffic is an actual threat or if a rule needs to be modified due to a false positive result. 

I also connected Snort with pfSense (see Image 1). Snort is an open-source network intrusion prevention system, capable of performing real-time traffic analysis and packet logging on IP networks. Under Snort’s Global Settings, I enabled the GPLv2 Community rules and Emerging Threats Open rules. I launched the GUI Snort and entered my Oinkmaster code. Then, I updated the rules. I added and enabled the WAN interface. Under the Categories tab, I enabled all the rules. If I had more details on the scope of a project for a business, I would fine-tune the rules. Then, I started Snort on the interface. Under Alerts, I could view logs of activities. There may be false positives so diligently investigating entries is necessary.

I intend to expand my topology to include Kali Linux, a security distribution aimed at advanced penetration testing and security auditing. **Penetration testing** is a form of ethical hacking, where you can perform a simulated cyberattack on a computer system to gain intelligence and insights on how to mature a security organization. I also will add Metasploitable, a virtual machine based on Linux that contains several intentional vulnerabilities for you to exploit. I will place Kali Linux outside my network to target my network. 

Ultimately, I set a foundation for my security network but am also monitoring it and critically thinking of ways to improve it. As the cyber security field rapidly changes, my network must be open to adjustments to produce the most secure network. 



<img width="558" alt="Screenshot 2023-05-16 at 5 35 43 PM" src="https://github.com/nancyuddin/nancyuddin/assets/119987538/125f22ee-a66e-4799-992a-71fbc3d83e03">
<p align="center"><sup>Image 1</sup></p>


<img width="485" alt="Screenshot 2023-05-16 at 5 36 49 PM" src="https://github.com/nancyuddin/nancyuddin/assets/119987538/92dab57f-370a-45ec-a48d-8f9b7abbddfe">
<p align="center"><sup>Image 2</sup></p>


<img width="562" alt="Screenshot 2023-05-16 at 5 37 34 PM" src="https://github.com/nancyuddin/nancyuddin/assets/119987538/8a1f70d1-a181-47d6-909a-bf0dee4b7938">
<p align="center"><sup>Image 3</sup></p>


<img width="561" alt="Screenshot 2023-05-16 at 5 38 00 PM" src="https://github.com/nancyuddin/nancyuddin/assets/119987538/21222101-e7b2-4488-8d9a-41c7dd94a051">
<p align="center"><sup>Image 4</sup></p>


