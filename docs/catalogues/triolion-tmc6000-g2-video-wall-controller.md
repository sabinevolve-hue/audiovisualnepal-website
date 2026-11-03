# Triolion TMC6000-G2 Video Wall Controller

> Source: official manufacturer datasheets supplied to AudioVisual Nepal (TMC6000-G2 Series Video Wall Controller Specifications V2026-07-29). Specifications are as published by the manufacturer and may change; confirm at quotation. Descriptions are rewritten by AVN.


**Manufacturer:** Beijing Triolion Science & Technology Co., Ltd (DLP / LCD / LED video wall systems).

### Triolion TMC6000-G2 Video Wall Controller

**FPGA Hardware Controller for LCD, LED & DLP Walls — 8K/4K & IP Decoding**

| | |
|---|---|
| Brand / Line | Triolion · Triolion |
| Model | TMC6000-G2 |
| Segment | Video Wall Controller |
| Warranty | As per manufacturer |
| Product page | [https://www.audiovisualnepal.com/products/video-walls/triolion-tmc6000-g2](https://www.audiovisualnepal.com/products/video-walls/triolion-tmc6000-g2) |
| Datasheet | [TMC6000-G2 Specifications (V2026-07-29)](https://www.audiovisualnepal.com/downloads/triolion/triolion-tmc6000-g2-video-wall-controller-specifications.pdf) |

The Triolion TMC6000-G2 is a pure-hardware, FPGA-based video wall controller for LCD, LED and DLP walls in command and control centres — traffic, power utilities, telecom, CCTV monitoring, public security, defence and large conference rooms. Unlike PC-based processors it starts in seconds, has no operating system to crash, and moves every signal over a high-bandwidth internal bus for real-time display.

A modular chassis (2.5U, 4U, 6.5U or 12U) takes hot-swappable input and output cards: 8K (HDMI 2.1 / DP 1.4) and 4K (HDMI 2.0 / DP 1.2) inputs, HDMI/DVI/VGA/CVBS, fibre in/out over LC up to 10 km, and IP decoding of H.264/H.265 camera streams via ONVIF/RTSP (one 4K or up to 16 compressed FHD streams per card). Outputs cover DVI, HDMI 1.3, 4K/8K HDMI 2.0/DP and LED sending cards compatible with NovaStar and Colorlight. Windows can be overlapped, cut, roamed and saved as layouts, previewed on PC, iPad or phone, and controlled by Crestron/AMX, web browser or app — with redundant hot-swap power, bezel compensation, anti-burn-in and rolling captions.

**Key highlights**

- **Pure FPGA Hardware** — No OS — instant start and rock-solid 24/7 stability for control rooms.
- **8K & 4K Inputs, 4K/8K Outputs** — HDMI 2.1 / DP 1.4 8K60 in; up to 7680×4320@30 Hz out.
- **IP Camera Decoding** — H.264/H.265 over ONVIF/RTSP — 1×4K or 16× compressed FHD per card.
- **LED Sending Cards** — RJ45 outputs for NovaStar / Colorlight receivers, up to 10.4 MP per card.
- **Fibre up to 10 km** — LC fibre input/output nodes with redundancy for distributed sites.
- **Hot-Swap & Redundant** — Hot-swappable cards, fans and redundant PSUs; Crestron/AMX/web/app control.

**Technical specifications**

| Group | Specification | Value |
|---|---|---|
| System | Architecture | Pure hardware, FPGA, high-bandwidth bus |
| System | Chassis | 2.5U / 4U / 6.5U / 12U, 19" rack |
| System | Card Slots | 2.5U: 5 · 4U: 10 · 6.5U: 20 · 12U: 28 |
| Inputs | 8K Input | HDMI 2.1 or DP 1.4, 7680×4320@60 Hz |
| Inputs | 4K Input | HDMI 1.4/2.0, DP 1.2 — up to 3840×2160@60 Hz |
| Inputs | Other Inputs | DVI / VGA / HDMI 1.3 (HDCP), CVBS (PAL/NTSC), fibre LC |
| Inputs | IP Decoding | H.264/H.265, ONVIF/RTSP; 1×4K or 4×FHD (16 compressed) |
| Outputs | Outputs | DVI-D 8ch, HDMI 1.3 8/4ch, 4K HDMI 2.0/DP 1.2 2ch, fibre 8ch |
| Outputs | LED Sending Card | 16/24 × RJ45, 10.4 MP per card, 650k px per port |
| Processing | Window Capacity | Up to 40 × 2K windows per card, 16 per screen |
| Control | Control | Windows client, web (iOS/Android), app, RS232, TCP/IP, Crestron/AMX |
| Power | Power | 250 W / 460 W, redundant hot-swap (4U+), 100–240 VAC |
| Physical | Environment | 0–40 °C, 10–90% RH, ≤5,000 m altitude |

**Applications:** Government, Transportation, Corporate, Broadcast

---

## Configuration code

`TMC60XX H XX D XX V XX A XX P XX U XX F XX Y -G2`

| Code | Meaning |
|---|---|
| 60XX | XX-channel output |
| HXX | XX-channel HDMI 1.4 input |
| DXX | XX-channel DVI input |
| VXX | XX-channel VGA input |
| AXX | XX-channel video (CVBS) input |
| PXX | XX-channel simultaneous IP-stream decoding (incl. IP cameras) |
| UXX | XX-channel 8K/4K HDMI/DP input |
| FXX | XX-channel fibre input |
| Y | Signal preview & redisplay function |
| G2 | Version |

## Chassis options

| Chassis | Size (W×H×D mm) | Weight (full) | Slots | PSU |
|---|---|---|---|---|
| 2.5U | 482×111×310 | 4 kg | 1 control + 5/3 signal | 250 W (460 W opt.) |
| 4U | 482×178×310 | 11 kg | 1 control + 9/7/5 signal | 250 W, opt. 460 W redundant hot-swap |
| 6.5U | 482×289×310 | 20 kg | 1 control + 19/13 signal | 250 W, opt. 460 W redundant hot-swap |
| 12U | 482×533×310 | 38 kg | 1 control + 27 signal | 460 W, opt. redundant hot-swap |

## Feature list (manufacturer)

1. IP stream decoding (IP cameras)
2. 4K base image across the whole wall (IP decoding card needed)
3. Signal preview & redisplay on control PC, iPad and phone
4. Customised output resolution per group (preview card needed)
5. Redundant power supply
6. Hot-swappable graphic cards, fans and PSU
7. Automatic graphic-card temperature detection
8. Virtual mouse — move/zoom windows and annotate the wall
9. Signal cutting of main and subsidiary windows
10. Highlight cursor / spotlight
11. 8K & 4K HDMI/DP inputs, 4K IP inputs, 4K HDMI outputs
12. Output cards grouped for multiple walls
13. Anti-burn-in black-line scan for LCD
14. Crestron and AMX central control
15. C/S client, web browser (iOS/Android) and app control
16. Multi-webpage sources on the wall
17. LCD bezel compensation
18. Output brightness/darkness adjustment
19. Rolling captions
20. Signal cutting into 4 / 9 / 16 sub-windows
21. Audio output
22. Touch LCD screen support
