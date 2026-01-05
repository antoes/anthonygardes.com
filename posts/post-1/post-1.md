---
title: "🧪 Networking Lab: Inter-VLAN Routing with Router-on-a-Stick"
author: "Anthony Gardés"
description: "A helpful lab on inter-VLAN routing using the router-on-a-stick method."
hero: "./anthonyGardes-router-on-a-stick.webp"
heroAlt: "image of a router on a stick"
date: 2025-11-05
lastModified: 2026-01-03
tags: ["networking", "labs"]
---
{% include "posttop.njk" %}
If you're studying for the CCNA or are a curious explorer sharpening your networking skills, understanding how VLANs communicate across a network is essential. This was one of the most helpful labs I encountered while studying for my CCNA, and I wanted to share my version with you all as one of my first lab posts on this new site.

Prerequisites:
- [Cisco Packet Tracer](https://www.netacad.com/cisco-packet-tracer)
- A Computer
- Concepts: VLANs, 802.1Q trunking, router sub-interfaces, default gateways, subnetting basics, and basic Cisco CLI commands.

To get the most out of this lab, try completing each step without referring to the tips provided (the tips are incomplete answers intended to kickstart you if you get stuck). Repeat this lab until you can complete all the steps without needing to refer to any dropdown tips. The starter packet tracer file is provided below; the final will be included at the end of the post, in case you get stuck and need a reference. Happy labbing!

<wa-button size="large" appearance="filled-outlined" variant="neutral" href="./Lab - Router on a Stick.pkt">
  <wa-icon slot="start" name="download"></wa-icon>
  Lab - Router on a Stick.pkt
</wa-button>

## Step 1: Configure the PCs IP Settings
Each PC is assigned to a different VLAN and must be manually configured with:
- IP Address - This should be the second usable IP address in the subnet.
- Subnet Mask - Use the CIDR notation provided for the mask.
- Default Gateway - this should be the first IP address in the subnet.

<wa-details summary="Tip #1" icon-placement="end">
    
    This is what the settings would be for PC1 in VLAN 10.
    
    IP: `192.168.10.2`<wa-copy-button value="192.168.10.2"></wa-copy-button>
    
    Mask: `255.255.255.0`<wa-copy-button value="255.255.255.0"></wa-copy-button>
    
    Gateway: `192.168.10.1`<wa-copy-button value="192.168.10.1"></wa-copy-button>

</wa-details>

## Step 2: VLANS and Access Ports
Create the VLANs and Access Ports on SW1.

<wa-details summary="Tip #2" icon-placement="end">
    
    This is how you'd configure VLAN 10 and interface fa0/1

    Switch(config)# `vlan 10`<wa-copy-button value="vlan 10"></wa-copy-button>

    Switch(config)# `interface fa0/1`<wa-copy-button value="interface fa0/1"></wa-copy-button>

    Switch(config-if)# `switchport mode`<wa-copy-button value="switchport mode"></wa-copy-button>

    Switch(config-if)# `switchport access`<wa-copy-button value="switchport access"></wa-copy-button>

</wa-details>

## Step 3: Trunk Links
Configure the trunk link to the Router.

<wa-details summary="Tip #3" icon-placement="end">
    
    Switch(config)# `interface g0/1`<wa-copy-button value="interface g0/1"></wa-copy-button>

    Switch(config-if)# `switchport mode`<wa-copy-button value="switchport mode"></wa-copy-button>

    switch(config-if)# `switchport trunk`<wa-copy-button value="switchport trunk"></wa-copy-button>

</wa-details>

## Step 4: Configure Sub-Interfaces
Since one physical interface will carry traffic for multiple VLANs, we will need to create sub-interfaces on the Router.

<wa-details summary="Tip #4" icon-placement="end">
    
    Router(config)# `interface g0/0.10`<wa-copy-button value="interface g0/0.10"></wa-copy-button>


    Router(config-subif)# `encapsulation dot1Q`<wa-copy-button value="encapsulation dot1Q"></wa-copy-button>


    Router(config-subif)# `ip address 192.168.10.1 255.255.255.0`<wa-copy-button value="ip add 192.168.10.1 255.255.255.0"></wa-copy-button>


    <em>*Don't forget to enable the main interface!</em>

</wa-details>

## Step 5: Test Inter-VLAN Connectivity
From PC1 in VLAN 10, try to ping PC2 in VLAN 20. If everything is configured correctly, you should see successful replies. If your pings are not successful, don't worry; this is a perfect time to start troubleshooting. Some ideas on troubleshooting are below. Also, below is the finished lab if you prefer to see the final working lab as a reference.

<wa-button size="large" appearance="filled-outlined" variant="neutral" href="./Lab - Router on a Stick - Complete.pkt">
  <wa-icon slot="start" name="download"></wa-icon>
  Lab - Router on a Stick - Complete
</wa-button>

<wa-details summary="Troubleshooting Tips" icon-placement="end">
    
    Pings failing between VLANs - Check default gateways on PCs

    No ping to Router - Verify g0/0 is no shutdown

    VLAN not working - check switchport mode = access

    Router no routing - confirm sub-interface uses correct VLAN and IP

    Trunk not forwarding VLAN Traffic - Verify switchport mode trunk

</wa-details>

Give this lab a few tries until you can complete it from memory. Another great practice would be to make your own lab from scratch once you have this down. Creating my own labs after learning the material helped solidify everything much more effectively. I hope you enjoyed this one and found value in the exercise. I'm happy to provide more; feel free to shoot me an email anytime with ideas or concepts I might be able to help with.