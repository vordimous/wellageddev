---
title: 008 — Guatemala Huehuetenango Rolando Sanchez
date: 2026-06-20T00:00:00.000Z
origin: 'Guatemala — Huehuetenango, Finca Claima (Rolando Sanchez)'
process: Wet Process (Washed)
product_url: https://thecaptainscoffee.com/products/guatemala-huehuetenango-rolando-sanchez
vendor: The Captain's Coffee
target_level: Light-medium
tags:
  - roast
  - guatemala
  - huehuetenango
batch_size_g: 227
profile: P1
weight_setting: ½ lb
green_weight_g:
ambient_f:
ambient_rh:
bean_notes: |
  - **Guatemala Huehuetenango** is a Central American hard bean → Auto P1 per the manual (Centrals / Peruvian / Colombian).
  - **SHB EP**, varietals **Catuai + Caturra**, altitude 1,100–2,000 masl (main plantings 1,100–1,200 m). Dense, high-grown — expect FC slightly later than lower-grown lots at the same heat.
  - Finca Claima in La Democracia, Huehuetenango. Fully washed; small eco-friendly wet mill on-site; parchment dried at La Esperanza mill in Guatemala City.
  - Vendor (The Captain's Coffee) cupping target: **dark chocolate, caramel, peach, cashew butter**, rich buttery texture, warm earthy finish. They say "takes a wide variety of roasts well."
  - Recommended roast: **City+ to Vienna**, optimal between end of FC and just before 2C. Lighter end pulls lemony brightness; deeper end accents chocolate, caramel, body.
  - Targeting **City+** here — moderate end of vendor's window, preserves the peach top note while building toward caramel.
playbook: |
  Built from the Behmor 2000 AB Plus manual V30. Central American hard bean → **Auto Mode P1** (manual default for Centrals). Using the **C-button + Auto P1 hold technique** (the documented default for drinking-coffee batches at ½ lb / 1 lb — see `data/machines/behmor_2000_ab_plus.yaml` `c_button_technique` and the public Behmor reference page).

  **Plan rationale:**
  - 227 g charge on ½ lb weight setting → 12:00 program time, 75% shutoff fires at **9:00 elapsed**.
  - Target: City+ (Light-medium). 227 g is well under the 336 g manual ceiling for darker control.
  - SHB EP at 1,100–1,200 m → dense bean, expect a slightly later FC than the published 8:30 ¼ lb / 12:00 ½ lb Auto P1 timing suggests.

  **Sequence:**
  1. Empty chaff tray. Weigh 227 g green into drum, close drum clasp.
  2. **Preheat:** drum OUT, press ½ lb + any profile + START, let run **1:30**, press **OFF**. Do not exceed 1:30 — longer locks out the roast.
  3. Insert loaded drum (asymmetric — only fits one way). Insert chaff tray. Close door.
  4. Press **½ lb** + **P1** + **START**. Start phone timer in parallel.
  5. Listen for FC from ~7 min on. Chopstick-in-door for audio if needed (close it as soon as you've heard FC start — heat loss kills development).
  6. **75% shutoff at 9:00 elapsed:** display blinks `un:30`. Press **C** to continue. C resets the timer to the Rosetta Stone 1C→2C window and bypasses Err 7. Stay near the machine.
  7. **Listen for FC.** Mark time-to-FC the instant of the first audible pop.
  8. **At FC: press C immediately.** Timer resets to the bean's actual development window. **Stay on Auto P1** — do not switch to Manual P3.
  9. **Hold Auto P1** through FC body. Watch color and smell.
  10. **If 2C threatens** (rapid louder snaps, acrid smoke shift, oil sheen forming) — only then press **P3** as a brake. For City+ target, 2C should not arrive.
  11. **If you need more time** (low voltage, humid day, FC tail still rolling): press **C again**. Repeat as needed. Do not reach for `+` — it has a per-roast cap and will run out.
  12. **Drop trigger (Light-medium / City+):** 30–60s into development, before FC fully winds down. Press **Cool**.
  13. Cool cycle ~10 min. Open door at ~1:30 into cool for faster airflow.
  14. Weigh roasted. Target loss ~13–15%, DTR 17–20%.
  15. **Allow 1 HOUR before any next roast** (manual Part 4 Important Reminder #4).

  **What to watch:**
  - **Smell shift is the drop cue.** Fresh bread → toasted bread → caramel → first hint of cocoa. City+ wants you to drop right as caramel sets in and before cocoa deepens.
  - Pale color at FC + bland smell = under-developed. Hold through the FC tail before dropping.
  - Heavy bluish smoke or any 2C snap = imminent fire risk. Press Cool immediately.
  - Never roast past 10 seconds into 2C.
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
