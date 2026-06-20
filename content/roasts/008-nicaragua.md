---
title: 008 — Nicaragua Buenos Aires Maracaturra (C-button technique)
date: 2026-06-20T00:00:00.000Z
origin: 'Nicaragua — Buenos Aires, Maracaturra'
process:
product_url: https://www.sweetmarias.com/nicaragua-buenos-aires-maracaturra-8451.html
vendor: Sweet Maria's
target_level: Light-medium
tags:
  - roast
  - nicaragua
  - maracaturra
batch_size_g: 227
profile: P1
weight_setting: ½ lb
green_weight_g:
ambient_f:
ambient_rh:
bean_notes: |
  - Nicaragua is a **Central American hard bean** → Auto P1 per the manual (Centrals / Peruvian / Colombian).
  - **Maracaturra** has very large screen size and lower density than standard Centrals (per Sweet Maria's library). Internal development lags surface color — wait through the FC tail before dropping.
  - Cupping target (Sweet Maria's): Assam tea, orange zest, marzipan, spearmint, burnt sugar candy. They say enjoyed most at City–City+.
  - **First test of the C-button + Auto P1 hold technique** — replacing the Pro Sample Roasting P3+D drop at FC. 006 and 007 both came in under-developed (8% and 9.4% loss vs 13–16% target) with DTR 38%+; root cause was the P3 power cut starving development heat. This run holds Auto P1 through development and uses **C** for time extension instead of **+** (which capped at +2:00 on 007). See 006/007 logs for the failure-mode baseline.
playbook: |
  Built on the Behmor 2000 AB Plus manual V30 plus the C-button extension technique documented across the Behmor knowledge base, Sweet Maria's library, and home-barista forum consensus. **This is NOT the manual's Pro Sample Roasting technique** — that one drops power to 50% at FC+15s and is designed for sample roasting (small evaluation batches), not drinking-coffee development.

  **Plan rationale:**
  - 227 g charge on ½ lb weight setting → 12:00 program time, 75% shutoff at **9:00 elapsed**.
  - Target: City+ (Light-medium). Same target as 006 → direct A/B vs the Pro Sample technique.
  - **Key change: stay on Auto P1 through FC** (don't switch to manual P3 at FC+15s). Full Auto heat carries the bean through development.
  - **Use C, not +, for time extension.** C resets the timer to the Rosetta Stone 1C→2C window, bypasses Err 7, and has no per-roast cap. + has a documented per-roast cumulative limit (which 007 hit at +2:00).

  **Sequence:**
  1. Empty chaff tray. Weigh 227 g green into drum, close drum clasp.
  2. **Preheat:** drum OUT, press ½ lb + any profile + START, let run **1:30**, press **OFF**. Do not exceed 1:30 — longer locks out the roast.
  3. Insert loaded drum (asymmetric — only fits one way). Insert chaff tray. Close door.
  4. Press **½ lb** + **P1** + **START**. Start phone timer in parallel.
  5. Listen for FC from ~7 min on. Community chopstick-in-door technique for audio — close it as soon as you've heard FC start (heat loss kills development).
  6. **75% shutoff at 9:00 elapsed:** display blinks `un:30`. Press **C** to continue (not START, not +). C resets timer to standard 1C→2C window and bypasses Err 7. Stay near the machine.
  7. **Listen for FC.** Mark time-to-FC the instant of the first audible pop. Cracks may be soft on Maracaturra (n=1 from 003).
  8. **At FC: press C immediately.** This is the *core change vs 006/007.* No P3, no D, no manual mode. Timer resets to the bean's actual development window. Auto P1 keeps full heat.
  9. **Hold Auto P1** through FC body. Watch and listen.
  10. **If 2C threatens** (rapid louder snaps, sharp/acrid smoke shift, oil sheen forming) — only then press **P3** as a brake. For City+ target, 2C should not arrive.
  11. **If you need more time** (low voltage, humid day slowing development): press **C again**. Repeat as needed. Do not use + as the primary extension lever.
  12. **Drop trigger (Light-medium / City+):** 30–60s into development, before FC fully winds down. Press **Cool**. With full Auto P1 heat, development time will be shorter than the P3-stalled 5+ minutes you logged on 006/007.
  13. Cool cycle ~10 min. Open door at ~1:30 into cool for faster airflow.
  14. Weigh roasted. Target loss ~13–15%, DTR 17–20%.
  15. **Allow 1 HOUR before any next roast** (manual Part 4 Important Reminder #4).

  **What to watch:**
  - **Compare to 006/007 baseline.** If this run hits 13%+ loss with DTR in the 17–20% band, the technique change is the fix. If it stalls again, voltage drop or chamber preheat is the next suspect.
  - With Auto P1 held through FC, development will be more aggressive than the P3-cut version. Don't wait for the timer — drop on sensory cues (smell shift from bread → caramel → first hint of cocoa for City+).
  - **Never roast past 10 seconds into 2C.** Auto P1 carrying full heat means 2C will arrive sooner than on the P3-cut roasts; don't get caught off guard.
  - Heavy bluish smoke or any 2C snap = imminent fire risk. Press Cool immediately.
time_to_fc:
color_at_fc:
smell_at_fc:
interventions:
total_time:
why_dropped:
anything_weird:
roasted_weight_g:
roasted_photo:
tasting_notes:
rating:
next_time:
roaster: Behmor 2000 AB Plus
draft: false
---
