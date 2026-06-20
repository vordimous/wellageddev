---
title: 008 — Guatemala Huehuetenango Rolando Sanchez (Full City+)
date: 2026-06-20T00:00:00.000Z
origin: 'Guatemala — Huehuetenango, Finca Claima (Rolando Sanchez)'
process: Wet Process (Washed)
product_url: 'https://thecaptainscoffee.com/products/guatemala-huehuetenango-rolando-sanchez'
vendor: The Captain's Coffee
target_level: Medium-dark
tags:
  - roast
  - guatemala
  - huehuetenango
batch_size_g: 227
profile: P1
weight_setting: ½ lb
green_weight_g: 227
ambient_f: 84
ambient_rh: 50
bean_notes: |
  - **Guatemala Huehuetenango** is a Central American hard bean → Auto P1 per the manual (Centrals / Peruvian / Colombian).
  - **SHB EP**, varietals **Catuai + Caturra**, altitude 1,100–2,000 masl (main plantings 1,100–1,200 m). Dense, high-grown — expect FC slightly later than lower-grown lots at the same heat.
  - Finca Claima in La Democracia, Huehuetenango. Fully washed; small eco-friendly wet mill on-site; parchment dried at La Esperanza mill in Guatemala City.
  - Vendor (The Captain's Coffee) cupping target: **dark chocolate, caramel, peach, cashew butter**, rich buttery texture, warm earthy finish. They say "takes a wide variety of roasts well."
  - Recommended roast: **City+ to Vienna**. Lighter end pulls lemony brightness; deeper end accents chocolate, caramel, body.
  - **Targeting Full City+ (Medium-dark) — the safe maximum on the Behmor 2000 AB Plus.** The manual prohibits Vienna / French / Italian and warns "never past 10 sec into 2C." First few snaps of 2C → drop. This level pulls the dark-chocolate / caramel / cashew-butter side of the vendor's profile and softens the peach top note. If you want true rolling-SC dark, you need a different machine.
  - 227 g charge is well under the 336 g manual ceiling for darker control (manual recommends reducing batch for Full City+).
  - **Two-variable test note:** this run tested the new C-button + Auto P1 hold technique (first use, untested) *and* hit Medium-dark for the first time on this machine.
  - **Outcome (post-roast):** under-developed at 8.85% loss vs 16–18% Medium-dark target. Root cause identified — the playbook step "press C at FC immediately" was wrong for this run because FC came early (7:30) with 4:30 remaining on the ½ lb / 12:00 clock. The C button RESETS the clock to the Rosetta Stone ~2:09 duration (it does not ADD time); pressing C at FC here CUT the available development time by 2:21. The bean got 3:00 of post-FC development instead of the ~4:30 it needed, and 2C likely never arrived. The C-button technique in the machine YAML has been corrected to specify "press C at FC ONLY if remaining clock < ~2:30." See [behmor-2000ab.md](/roasts/behmor-2000ab/) `+ vs C` table for the corrected rule.
playbook: |
  Built from the Behmor 2000 AB Plus manual V30. Central American hard bean → **Auto Mode P1** (manual default for Centrals). Using the **C-button + Auto P1 hold technique** (the documented default for drinking-coffee batches at ½ lb / 1 lb — see `data/machines/behmor_2000_ab_plus.yaml` `c_button_technique` and the public Behmor reference page).

  **Plan rationale:**
  - 227 g charge on ½ lb weight setting → 12:00 program time, 75% shutoff fires at **9:00 elapsed**.
  - Target: Full City+ (Medium-dark). 227 g is under the 336 g manual ceiling for darker control.
  - SHB EP at 1,100–1,200 m → dense bean, expect FC slightly later than the published 12:00 ½ lb Auto P1 timing.
  - **Safety ceiling:** drop within the first 10 seconds of 2C. Past that line is the manual's explicit fire-risk threshold; the dark-roast warning about oily beans + chaff tray fire risk applies.

  **Sequence:**
  1. Empty chaff tray (critical for dark roasts — chaff retains heat and is the documented fire-risk surface). Weigh 227 g green into drum, close drum clasp.
  2. **Preheat:** drum OUT, press ½ lb + any profile + START, let run **1:30**, press **OFF**. Do not exceed 1:30 — longer locks out the roast.
  3. Insert loaded drum (asymmetric — only fits one way). Insert chaff tray. Close door.
  4. Press **½ lb** + **P1** + **START**. Start phone timer in parallel.
  5. Listen for FC from ~7 min on. Chopstick-in-door for audio if needed (close it as soon as you've heard FC start — heat loss kills development).
  6. **75% shutoff at 9:00 elapsed:** display blinks `un:30`. Press **C** to continue. C resets the timer to the Rosetta Stone 1C→2C window and bypasses Err 7. Stay near the machine.
  7. **Listen for FC.** Mark time-to-FC the instant of the first audible pop.
  8. **At FC: check the remaining clock first.** (Original playbook said "press C immediately" — this was wrong and caused the under-development on this run; see bean_notes outcome paragraph.) If remaining clock < ~2:30, press C to extend toward Rosetta Stone. If remaining clock is more than that, do NOT press C — let Auto P1's original program continue. **Stay on Auto P1** either way — do not switch to Manual P3.
  9. **Hold Auto P1** through FC body. Smell shift (common roasting knowledge, not from the Behmor manual): bread → toast → caramel → cocoa → first hint of resinous/oily smoke. Color shifts through tan → brown → deep brown.
  10. **As FC winds down** and you smell cocoa deepening, position your hand near the Cool button. 2C is coming.
  11. **At first snaps of 2C: press Cool within 10 seconds.** This is the safety-critical step. Do not wait for rolling 2C. The first 1–3 distinct crack sounds *after* FC has fully ended is your drop trigger.
  12. **If you need more time before 2C arrives** (low voltage, humid day): press **C again**. Each press resets the timer. Don't use `+` (per-roast cap).
  13. Cool cycle ~10 min. (Community technique: open door at ~1:30 into cool for faster airflow — not in the manual, use at your discretion.)
  14. Weigh roasted. Target loss ~16–18%, DTR 19–23%.
  15. **Allow 1 HOUR before any next roast** (manual Part 4 Important Reminder #4).

  **What to watch — dark-roast specific:**
  - **Bluish smoke = press Cool immediately.** Resinous/acrid smoke shift past caramel/cocoa means oil is starting to migrate and ignition risk is rising fast.
  - **Listen for the *gap* between FC and 2C.** Common roasting knowledge (not from the Behmor manual): FC has a wet-popcorn pop sound; 2C is a sharper, drier snap. If you confuse the FC tail with 2C start, you'll under-roast. If you confuse 2C start with FC tail, you'll over-roast past the safety line.
  - **Never roast past 10 seconds into 2C.** This is the documented fire-ignition threshold.
  - **Drop early if anything feels off.** Better to land at Full City than to set the chaff tray on fire.
time_to_fc: '7:30'
color_at_fc: null
smell_at_fc: null
interventions: 'pressed c. then pressed c again at 1:00 left'
total_time: '10:30'
why_dropped: null
anything_weird: null
roasted_weight_g: 206.9
roasted_photo: /imgs/PXL_20260620_200002620.jpg
tasting_notes: null
rating: null
next_time: null
roaster: Behmor 2000 AB Plus
draft: false
---


