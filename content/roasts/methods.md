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

## The four raw inputs

Punch these into Tina; everything else is derived.

| Field | What it is | When to fill |
| --- | --- | --- |
| `green_weight_g` | Weighed grams before the roast | Pre-roast |
| `roasted_weight_g` | Weighed grams after cooling | Post-roast |
| `time_to_fc` (mm:ss) | Elapsed time from Start to the first audible pop | At first crack |
| `total_time` (mm:ss) | Elapsed time from Start to when you hit Cool | At drop |

## Derived values

The single-page panel computes these automatically; you can match them with a calculator.

{{< roast-formulas >}}

### Worked example

For a roast with `green_weight_g: 227`, `roasted_weight_g: 193`, `time_to_fc: 10:30`, `total_time: 12:45`:

- **Weight loss:** (227 − 193) / 227 × 100 = **15.0%**
- **Development time:** 12:45 − 10:30 = **2:15**
- **DTR:** 135s / 765s × 100 = **17.6%**

## Target level reference

These ranges drive the "Expected" column in the panel. They are starting points pulled from industry sources, not Behmor-specific. After 10–15 logged batches, calibrate against your own data and edit the values in [`data/roast_guidance.yaml`](https://github.com/) — every page on the site picks up the change automatically.

{{< roast-levels >}}

## Behmor 1600 Plus weight setting

The "weight" button on the Behmor sets the heating program. Match it to your actual charge — except very small batches, where overshooting one class keeps the roast from stalling.

{{< roast-behmor-weights >}}

## Safety — dark roasts on the Behmor 1600 Plus

The Behmor 1600 Plus manual **explicitly warns against Vienna, French, and Italian dark roasts** on this machine. Oily beans shed oil into the chaff tray; under repeated dark-roast heat, that residue can ignite. Stop the roast before a heavy oil sheen develops on the bean surface. The "dark" row in the level reference above is included for completeness — it is not a target this machine is built for.

## Behmor startup sequence

The Behmor 1600 Plus requires a short preheat **before loading beans**, and has a mid-roast safety cutoff you must acknowledge.

**Preheat (first roast only):**
With the drum *out*, select 1 lb + any profile, press START, let run for **1 min 30 sec**, then cancel. This warms the chamber. For back-to-back roasts the drum is already hot — skip the preheat and cool between batches instead (see playbook for each roast).

**75% safety shutoff (every roast):**
At 75% through the program, the display counts down from 0:30. You must press START to continue. If you miss it, the machine switches to cool mode immediately — mid-roast. Stay within earshot of the machine at all times.

## Profile selection

Profile P5 is the most aggressive and the default for almost all home batches on the 1600 Plus. P1–P4 trade total energy for longer drum time; useful only if your roasts are coming in too fast even at the matched weight setting.

## Sources

- Bodhi Leaf — [Behmor 1600 Plus Roasting Guide](https://www.bodhileafcoffee.com/pages/behmor-1600-plus-roasting-guide)
- Not So Ancient Chinese Secrets — [How to Home-Roast with the Behmor 1600 Plus](https://www.notsoancientchinesecrets.com/home-roast-coffee-behmor-1600plus/)
- Genuine Origin — [Roast Profiles 101](https://blog.genuineorigin.com/2025/11/guide-to-roast-profiles/)
- Green Coffee Collective — [Types of Coffee Roasts](https://greencoffeecollective.com/blogs/learn/types-of-coffee-roasts)

## Caveats

Most published targets — the 8–9 min FC benchmark, DTR ranges, the temperature thresholds — come from drum roasters with bean-probe feedback. The Behmor 1600 Plus runs a fixed time/heat program and is roasted by ear. Treat the numbers as the *shape* you're aiming for, not setpoints to dial in directly. The reference values on this page get more honest the more of your own batches you log.
