---
title: Methods & reference
date: 2026-06-13T00:00:00.000Z
summary: How the numbers on each roast page are calculated, and the lookup tables that drive the expected-range panel.
layout: methods
tags:
- roast
- reference
---

Every roast page computes derived values from a few raw inputs and compares them against industry-consensus targets. This page documents the formulas and the lookup tables so you can verify any number on the site by hand — and so the rules live in one editable place, not scattered through templates.

## Session conditions

Two ambient readings logged at roast start — not used in any formula today, but tracked because they explain session-to-session variation in FC timing:

| Field | Effect |
| --- | --- |
| `ambient_f` | Higher temp → earlier FC; compounding heat in back-to-back sessions |
| `ambient_rh` | Higher RH → beans carry more moisture → longer drying phase → FC comes later |

The two effects can partially cancel: a hot, humid day (91°F / 65% RH) will pull FC earlier via heat but push it later via moisture. Once you have 10+ roasts logged, compare FC times against these readings to see which variable dominates on your machine in your space.

## Raw inputs

These are logged per roast. Everything in the "Measured" panel on a roast page is derived from them — no double-entry, no drift.

| Field | What it is | When to log |
| --- | --- | --- |
| `green_weight_g` | Weighed grams before the roast | Pre-roast |
| `roasted_weight_g` | Weighed grams after cooling | Post-roast |
| `time_to_fc` (mm:ss) | Elapsed time from Start to the first audible pop | At first crack |
| `total_time` (mm:ss) | Elapsed time from Start to when you hit Cool | At drop |

The two ambient readings above (`ambient_f`, `ambient_rh`) are also raw inputs, but they don't feed any formula yet — they're recorded for pattern-finding once batch history grows.

## Derived values

The single-page panel computes these automatically; you can match them with a calculator.

{{< roast-formulas >}}

### Worked example

For a roast with `green_weight_g: 227`, `roasted_weight_g: 193`, `time_to_fc: 10:30`, `total_time: 12:45`:

- **Weight loss:** (227 − 193) / 227 × 100 = **15.0%**
- **Development time:** 12:45 − 10:30 = **2:15**
- **DTR:** 135s / 765s × 100 = **17.6%**

## Resting / ready-to-drink window

Fresh-roasted coffee needs to degas before it tastes right. CO₂ trapped in the beans interferes with extraction; brew too soon and the cup tastes flat or sour and espresso channels. Darker roasts shed CO₂ faster than light roasts (longer pyrolysis = more porous structure).

The `rest_days` ranges in the reference table are tuned for a **drum roaster brewed by filter methods**, which is what this site logs. Two assumptions baked into the numbers:

- **Drum vs air.** Scott Rao notes classic-drum roasts don't benefit from more than 1–2 days of rest unless underdeveloped; air roasters (Loring, IKAWA) often need 1–4 weeks. The Behmor is a drum roaster.
- **Filter vs espresso.** Filter brewing vents CO₂ freely, so short rests work — vendor "12–24hr" minimums on the bag are real. Espresso runs at 9 bar with nowhere for gas to escape and channels without more rest. **For espresso, add ~5–7 days to the upper bound of each range.**

The single-page panel compares today against the level's window and shows a status pill:

- **Resting** — under the lower bound; CO₂ may still fight extraction
- **Ready** — in the peak window; brew and rate
- **Past peak** — drinkable for weeks more, but aromatics are fading (faster for dark/oily — Rao recommends drinking those within days)

## Target level reference

These ranges drive the "Expected" column in the panel. They are industry-consensus starting points and apply to any roaster — calibrate against your own batches over time.

{{< roast-levels >}}

## Machine-specific guidance

This page is intentionally machine-agnostic. For machine-specific guidance — power profiles, weight-setting program times, preheat sequences, safety features — see the page for your roaster:

- [Behmor 2000 AB Plus](/roasts/behmor-2000ab/) — current machine

## Sources

- Genuine Origin — [Roast Profiles 101](https://blog.genuineorigin.com/2025/11/guide-to-roast-profiles/) (DTR 16–20% target across origins)
- Scott Rao — *The Coffee Roaster's Companion* (DTR > ~24% risks baking)
- Sweet Maria's — roast color and loss percentage guide
- Green Coffee Collective — [Types of Coffee Roasts](https://greencoffeecollective.com/blogs/learn/types-of-coffee-roasts)
- Scott Rao — [Resting Roasts: Is Fresher Better?](https://www.scottrao.com/blog/restingbeans) (rest_days; drum vs air roaster differences)

## Caveats

Most published targets — the 8–9 min FC benchmark, DTR ranges, the temperature thresholds — come from drum roasters with bean-probe feedback. Probeless home roasters like the Behmor run a fixed time/power program and are roasted by ear. Treat the numbers as the *shape* you're aiming for, not setpoints to dial in directly. The reference values on this page get more honest the more of your own batches you log.
