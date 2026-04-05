---
title: Home Network Layout
date: 2026-01-01T04:00:00.000Z
summary: 10G backed home setup
draft: false
---

# 

**Last updated: April 2026**

---

## Overview

This layout delivers a 10G fiber backbone across three managed switch locations, with 2.5G copper to every endpoint. The design principle: run fiber between floors or distant rooms so the inter-location links never become a bottleneck, then fan out 2.5G to devices at each location.

**Why this topology:**

- **10G SFP+ fiber between switches** — fiber is immune to interference, supports long runs without signal degradation, and the 10G headroom leaves room for aggregated device traffic to grow.
- **2.5G to endpoints** — sufficient for NAS transfers, 4K streaming, and multi-gigabit workloads without requiring expensive 10G NICs everywhere.
- **Chain topology (Main → Upstairs → Far End)** — matches the physical layout of most houses; each switch location gets a full 10G uplink to the next. A star back to the main rack would require more fiber runs.
- **Three managed switch zones** — Main rack (servers + gateway), Upstairs (workstations + AP), Far end (third equipment zone, e.g. garage or basement). Each zone has spare ports for additional equipment.
- **UCG-Fiber as the management boundary** — all routing, firewall, and VLAN policy lives at the gateway; switches carry tagged traffic but don't make policy decisions.

---

## Equipment

| Device          | Location   | Budget option                                    | UniFi equivalent                                |
| --------------- | ---------- | ------------------------------------------------ | ----------------------------------------------- |
| Modem / ONT     | Main rack  | ISP-provided                                     | —                                               |
| Gateway         | Main rack  | UniFi Cloud Gateway Fiber (UCG-Fiber)            | —                                               |
| Main switch     | Main rack  | SODOLA 10-port 2.5G (8× 2.5G + 2× 10G SFP+) ~$75 | USW-Pro-Max-8-PoE (8× 2.5G + 2× 10G SFP+) ~$299 |
| Upstairs switch | Upstairs   | SODOLA 10-port 2.5G (8× 2.5G + 2× 10G SFP+) ~$75 | USW-Pro-Max-8-PoE (8× 2.5G + 2× 10G SFP+) ~$299 |
| Far-end switch  | Third zone | SODOLA 8-port 2.5G (8× 2.5G + 1× 10G SFP+) ~$60  | USW-Flex-2.5G (8× 2.5G + 1× 10G SFP+) ~$199     |
| AP #1           | Main floor | Ubiquiti U7 Lite (WiFi 7, 2.5GbE, PoE 802.3af)   | —                                               |
| AP #2           | Upstairs   | Ubiquiti U7 Lite (WiFi 7, 2.5GbE, PoE 802.3af)   | —                                               |
| AP #3           | Third zone | Ubiquiti U7 Lite (WiFi 7, 2.5GbE, PoE 802.3af)   | —                                               |

> **SODOLA vs. UniFi switches:** SODOLA switches are third-party managed switches — full 802.1Q VLAN and LACP support, but no UniFi controller integration. UniFi switches add controller-managed config, topology visibility, and native PoE (eliminating separate PoE injectors for the APs) at a significantly higher price. The gateway and APs are UniFi either way; the switch choice is where the cost/ecosystem tradeoff lives.

---

## Topology


{{< mermaid >}}
graph TD
    ISP["🌐 ISP Fiber — 3 Gbps"]
    MODEM["📦 Modem / ONT — 10GE RJ45 out"]
    UCG["🔒 UCG-Fiber — WAN: 10G RJ45 — LAN: 10G SFP+"]
    SW1["🔀 Main Switch — SODOLA 10-port\n8× 2.5G + 2× 10G SFP+\nMain Rack"]
    SW2["🔀 Upstairs Switch — SODOLA 10-port\n8× 2.5G + 2× 10G SFP+\nUpstairs"]
    SW3["🔀 Far-End Switch — SODOLA 8-port\n8× 2.5G + 1× 10G SFP+\nThird Zone"]
    AP1["📶 U7 Lite AP #1 — 2.5G + PoE injector"]
    AP2["📶 U7 Lite AP #2 — 2.5G + PoE injector"]
    AP3["📶 U7 Lite AP #3 — 2.5G + PoE injector"]
    S1["🖥️ Server #1 — 2.5G"]
    S2["🖥️ Server #2 — 2.5G"]
    S3["🖥️ Server #3 — 2.5G"]
    WS1["🖥️ Workstation #1 — 2.5G"]
    WS2["🖥️ Workstation #2 — 2.5G"]

    ISP -->|fiber| MODEM
    MODEM -->|"10G copper Cat6A — in-rack"| UCG
    UCG -->|"10G SFP+ DAC — in-rack"| SW1
    SW1 -->|"2.5G RJ45 — same floor"| AP1
    SW1 -->|"2.5G RJ45 — same floor"| S1
    SW1 -->|"2.5G RJ45 — same floor"| S2
    SW1 -->|"2.5G RJ45 — same floor"| S3
    SW1 -->|"10G SFP+ fiber — inter-floor run"| SW2
    SW2 -->|"2.5G RJ45 — same floor"| WS1
    SW2 -->|"2.5G RJ45 — same floor"| WS2
    SW2 -->|"2.5G RJ45 — same floor"| AP2
    SW2 -->|"10G SFP+ fiber — far-end run"| SW3
    SW3 -->|"2.5G RJ45 — same zone"| AP3

{{< /mermaid >}}

---

## VLAN Design

All inter-switch fiber links carry 802.1Q trunks with all VLANs tagged. The UCG-Fiber enforces inter-VLAN routing and firewall policy at the gateway — switches forward tagged frames but apply no policy of their own.

| VLAN | Name       | Purpose                   | Port mode                                                                   |
| ---- | ---------- | ------------------------- | --------------------------------------------------------------------------- |
| 10   | Trusted    | Servers, workstations     | Access on server/workstation ports; tagged on all trunk links               |
| 20   | IoT        | Smart home, cameras       | Access on IoT device ports; tagged on all trunk links                       |
| 30   | Guest      | Guest WiFi SSID           | Tagged on AP ports (SSID-to-VLAN mapping on U7 Lite); tagged on trunk links |
| 99   | Management | Switch OOB management IPs | Tagged on trunk links; no untagged access ports                             |

**Trunk ports:** All SFP+ inter-switch links (UCG→SW1, SW1→SW2, SW2→SW3) carry VLANs 10, 20, 30, 99 tagged.

**AP ports:** Configured as trunk with VLAN 10 untagged (management) and VLANs 20/30 tagged. Each SSID on the U7 Lite maps to a VLAN — Trusted SSID → VLAN 10, IoT SSID → VLAN 20, Guest SSID → VLAN 30.

**Firewall policy at UCG-Fiber:**

- IoT (VLAN 20) → blocked from Trusted (VLAN 10); internet allowed
- Guest (VLAN 30) → blocked from all internal VLANs; internet allowed
- Trusted (VLAN 10) → full access

---

## Port Mapping

{{< mermaid >}}
graph LR
    subgraph MODEM["Modem / ONT"]
        M_OUT["10GE RJ45 OUT"]
    end

    subgraph UCG["UCG-Fiber"]
        UCG_WAN["WAN: 10G RJ45"]
        UCG_LAN["LAN: 10G SFP+"]
    end

    subgraph SW1["Main Switch — SODOLA 10-port"]
        SW1_SFP1["SFP+ Port 1 (10G) — UCG uplink"]
        SW1_SFP2["SFP+ Port 2 (10G) — inter-floor run"]
        SW1_P1["RJ45 Port 1 (2.5G) — Server #1"]
        SW1_P2["RJ45 Port 2 (2.5G) — Server #2"]
        SW1_P3["RJ45 Port 3 (2.5G) — Server #3"]
        SW1_P4["RJ45 Port 4 (2.5G) — AP #1"]
        SW1_P5["RJ45 Port 5 (2.5G) — spare"]
        SW1_P6["RJ45 Port 6 (2.5G) — spare"]
        SW1_P7["RJ45 Port 7 (2.5G) — spare"]
        SW1_P8["RJ45 Port 8 (2.5G) — spare"]
    end

    subgraph SW2["Upstairs Switch — SODOLA 10-port"]
        SW2_SFP1["SFP+ Port 1 (10G) — fiber from main"]
        SW2_SFP2["SFP+ Port 2 (10G) — far-end run"]
        SW2_P1["RJ45 Port 1 (2.5G) — Workstation #1"]
        SW2_P2["RJ45 Port 2 (2.5G) — Workstation #2"]
        SW2_P3["RJ45 Port 3 (2.5G) — AP #2"]
        SW2_P4["RJ45 Port 4 (2.5G) — spare"]
        SW2_P5["RJ45 Port 5 (2.5G) — spare"]
        SW2_P6["RJ45 Port 6 (2.5G) — spare"]
        SW2_P7["RJ45 Port 7 (2.5G) — spare"]
        SW2_P8["RJ45 Port 8 (2.5G) — spare"]
    end

    subgraph SW3["Far-End Switch — SODOLA 8-port"]
        SW3_SFP1["SFP+ Port 1 (10G) — fiber from upstairs"]
        SW3_P1["RJ45 Port 1 (2.5G) — AP #3"]
        SW3_P2["RJ45 Port 2 (2.5G) — spare"]
        SW3_P3["RJ45 Port 3 (2.5G) — spare"]
        SW3_P4["RJ45 Port 4 (2.5G) — spare"]
        SW3_P5["RJ45 Port 5 (2.5G) — spare"]
        SW3_P6["RJ45 Port 6 (2.5G) — spare"]
        SW3_P7["RJ45 Port 7 (2.5G) — spare"]
        SW3_P8["RJ45 Port 8 (2.5G) — spare"]
    end

    M_OUT ---|"Cat6A patch — in-rack"| UCG_WAN
    UCG_LAN ---|"10G SFP+ DAC 0.5–1m — in-rack"| SW1_SFP1
    SW1_SFP2 ---|"10G fiber — inter-floor run (measure distance)"| SW2_SFP1
    SW2_SFP2 ---|"10G fiber — far-end run (measure distance)"| SW3_SFP1
    SW1_P1 ---|"Cat6 patch — same floor"| S1
    SW1_P2 ---|"Cat6 patch — same floor"| S2
    SW1_P3 ---|"Cat6 patch — same floor"| S3
    SW1_P4 ---|"Cat6 run to AP — same floor"| AP1
    SW2_P1 ---|"Cat6 patch — same floor"| WS1
    SW2_P2 ---|"Cat6 patch — same floor"| WS2
    SW2_P3 ---|"Cat6 run to AP — same floor"| AP2
    SW3_P1 ---|"Cat6 run to AP — same zone"| AP3
{{< /mermaid >}}

---

## Cable Runs

| Run | From                   | To                     | Type                               | Speed | Location            |
| --- | ---------------------- | ---------------------- | ---------------------------------- | ----- | ------------------- |
| 1   | Modem                  | UCG-Fiber WAN          | Cat6A patch                        | 10G   | In-rack             |
| 2   | UCG-Fiber SFP+         | Main Switch SFP+ 1     | 10G SFP+ DAC (0.5–1m)              | 10G   | In-rack             |
| 3   | Main Switch SFP+ 2     | Upstairs Switch SFP+ 1 | OM3/OM4 fiber + 2× SFP+ MM modules | 10G   | **Inter-floor run** |
| 4   | Main Switch RJ45 1     | Server #1              | Cat6 patch                         | 2.5G  | Same floor          |
| 5   | Main Switch RJ45 2     | Server #2              | Cat6 patch                         | 2.5G  | Same floor          |
| 6   | Main Switch RJ45 3     | Server #3              | Cat6 patch                         | 2.5G  | Same floor          |
| 7   | Main Switch RJ45 4     | PoE Injector → AP #1   | Cat6 solid copper                  | 2.5G  | Same floor          |
| 8   | Upstairs Switch RJ45 1 | Workstation #1         | Cat6 patch                         | 2.5G  | Same floor          |
| 9   | Upstairs Switch RJ45 2 | Workstation #2         | Cat6 patch                         | 2.5G  | Same floor          |
| 10  | Upstairs Switch RJ45 3 | PoE Injector → AP #2   | Cat6 solid copper                  | 2.5G  | Same floor          |
| 11  | Upstairs Switch SFP+ 2 | Far-End Switch SFP+ 1  | OM3/OM4 fiber + 2× SFP+ MM modules | 10G   | **Far-end run**     |
| 12  | Far-End Switch RJ45 1  | PoE Injector → AP #3   | Cat6 solid copper                  | 2.5G  | Same zone           |

---

## SFP+ & Fiber

| Qty | Item                                        | Where Used                                                         |
| --- | ------------------------------------------- | ------------------------------------------------------------------ |
| 1   | 10G SFP+ DAC 0.5–1m                         | UCG-Fiber ↔ Main Switch (in-rack)                                  |
| 2   | 10G SFP+ multimode modules                  | Main Switch SFP+ 2 + Upstairs Switch SFP+ 1 (inter-floor run ends) |
| 1   | OM3/OM4 LC-LC duplex fiber (measure length) | Main → Upstairs wall run                                           |
| 2   | 10G SFP+ multimode modules                  | Upstairs Switch SFP+ 2 + Far-End Switch SFP+ 1 (far-end run ends)  |
| 1   | OM3/OM4 LC-LC duplex fiber (measure length) | Upstairs → Far-End wall run                                        |
