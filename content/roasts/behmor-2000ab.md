---
title: Behmor 2000 AB Plus — reference
date: 2026-06-14T00:00:00.000Z
summary: Operational reference for the Behmor 2000 AB Plus pulled from the official Operation Manual V30 (Oct 2024) — origin-specific Auto Mode profiles, Manual Mode power controls, the pro sample roasting technique, safety, preheat, and full machine guidance.
layout: methods
tags:
- roast
- reference
- behmor
---

Sourced from the official [2000AB 120V Operation Manual V30 (Oct 2024)](http://www.behmor.com/docs/Behmor%202000AB%20120v%20Operation%20Manual%20V28%2011.19.2023%20BW%20Inspired.pdf) and the [Behmor knowledge base](https://behmor.com/knowledge-base/). Pulled into the site so it's available on-hand during a roast.

---

## The single most important thing: P1–P5 mean TWO things

This is the easiest way to wreck a roast on this machine: P1–P5 have **different meanings** depending on whether you press them before or after Start.

| When | What P1–P5 means |
| --- | --- |
| **BEFORE Start (Auto Mode)** | Origin-specific roast profile. Choose based on bean type. |
| **AFTER Start (Manual Mode)** | Power level (0/25/50/75/100%). Use to drop power post-FC. |

The manual makes this explicit (Part 3, page 8 and Part 5 page 12). If you treat P5 like "100% power" when selecting it as your starting Auto profile, you're actually picking the Hawaiian/island lowest-heat profile — wrong direction.

## Auto Mode — pick by origin BEFORE pressing Start

This is the chart from the manual that drives every roast plan on the site.

{{< roast-behmor-auto-profiles >}}

**Practical reading:** Centrals / Peruvian / Colombian → **P1** (or P2 for slightly gentler). Brazilian / African / SE Asian → **P3**. Kona and island coffees → **P4 or P5**. The default for the machine is P1; the manual recommends beginners run four ¼ lb batches on P1 to learn it.

## Manual Mode — press P1–P5 AFTER Start

Once a roast has started, the P buttons become power-level adjusters.

{{< roast-behmor-profiles >}}

P4 and P5 are explicitly flagged as **not recommended after first crack** — combined with the bean mass already heated, they will scorch.

## Two post-FC techniques — pick by goal

The manual documents one approach (Professional Sample Roasting); forum and Sweet Maria's-library consensus uses a different one (C-button + Auto P1 hold) for drinking coffee. Both start the same way: ½ lb + P1 + Start. They diverge at first crack.

### Professional Sample Roasting (manual Part 5, page 12-13) — sample roasting only

1. Press desired weight + P1 + **START** (defaults to Auto P1)
2. Once you hear first cracking, wait **10–15 seconds**
3. Press **P3** (drops to 50% power in Manual mode)
4. Press **D** (changes drum speed)
5. May need to extend time using **+** or **C** button
6. Press **Cool** when target hit

The manual's rationale: *"Cutting power using the P3 button to 50% sustains heat, but gently allows the beans' exothermic momentum to work and prevent scorching beans."*

**Use this for:** small evaluation batches where slow, low-development finish is intentional (cupping samples).

**Don't use this for drinking coffee at ½ lb or 1 lb.** Roasts 006 and 007 logged on this site both used this technique and came in under-developed (8–9.4% loss vs 13–16% target, DTR 38%+) — the P3 cut starves development heat over the 3–5 minute development window.

### C-button + Auto P1 hold — drinking coffee at ½ lb / 1 lb

Synthesized from the Behmor knowledge base, Sweet Maria's library, and home-barista forum consensus.

1. Press desired weight + P1 + **START**
2. At the 75% shutoff prompt: press **C** to continue
3. At **first crack**: press **C** immediately. Do NOT switch to Manual P3 yet.
4. **Stay on Auto P1** through the FC body — full heat carries development
5. If development needs more time (low voltage, humid day): press **C again**. Each press resets the timer; no per-roast cap.
6. Only drop to **P3** if 2C threatens (rapid louder snaps, acrid smoke, oil sheen forming) — as a brake, not as the default
7. Press **Cool** when target hit

Rationale: full Auto P1 heat through FC body actually drives off moisture and progresses Maillard. The C-button shapes the time without cutting power. Behmor's knowledge base explicitly endorses multiple-press C for extension in low-voltage situations.

**Use this for:** drinking coffee at ½ lb or 1 lb, targeting City through Full City.

## `+` vs `C` for extending a roast

| Button | Increment | Cap | When to use |
| --- | --- | --- | --- |
| **+** | ~10 sec per press | Per-roast cumulative cap (~+2:00 observed) | Fine-tuning inside the program time |
| **C** | Resets timer to Rosetta Stone 1C→2C window | None documented | Primary extension lever. Press at FC for correct development window. Press again if you need more. |

If the roast is stalling and you reach for `+`, you'll hit the cap. Use `C` instead — Behmor's KB documents it as the multi-press low-voltage extension mechanism.

## Weight settings — default program time only

The weight button sets the **program duration**. Heat is controlled by the profile (Auto) or by the P-power level (Manual).

{{< roast-behmor-weights >}}

Match the weight button to your actual charge. The 75% Err 7 safety shutoff fires at 75% of the program time. **For Full City+ darker roasts, manual recommends reducing the batch to 336 g (12 oz) for control** — full-pound batches retain too much thermal momentum past City+.

## Preheat sequence

1. Weigh green into drum. Keep drum **out** of machine.
2. Press any weight + any profile + START. Run for **1:30 minutes** with drum out.
3. Press **OFF**. Insert loaded drum + chaff tray.
4. Start the actual roast.

**⚠ Do not exceed 1:30 preheat** — the manual warns that longer preheats trigger a safety feature that prevents starting the roast.

## 75% safety shutoff (Err 7)

At 75% through the program, the display blinks `un:30..29..28` with loud beeping. You have 30 seconds to press **START** to continue. If you miss it, the machine enters cool mode and shows **Err 7**.

The **C button bypasses Err 7** — pressing it during the warning window resets the timer per the Rosetta Stone and tells the machine you're actively engaged.

## The C button (Rosetta Stone)

The C button resets the timer to the approximate time it takes to go from start of first crack to start of second crack, per the selected weight setting. Three uses:

1. **Anticipate 2C** — gives you a fresh count toward the next milestone
2. **Bypass the Err 7 safety prompt** — signals active interaction
3. **Extend time in larger increments** than the `+` button (useful in low-voltage situations or when you've slowed development with P3)

## A/B temperature buttons

- **A** — exhaust channel temperature (active once exhaust fan starts mid-roast)
- **B** — chamber wall temperature

Manual is emphatic: *"These temps ARE NOT bean temps and for information / correlation purposes only. Never gauge degree of roast based on these temps."*

## What "dark" means on this machine

The level reference table in [Methods & reference](/roasts/methods/) defines five levels from Light through Dark. **Not all of them are safely targetable on the Behmor 2000 AB Plus.** The manual is explicit on two limits:

- *"The Behmor Roaster is not intended to roast coffee to levels known as Vienna, French, or Italian."*
- *"Never roast past 10 seconds into second crack."*

Mapping our level table to what's achievable on this machine:

| Level | Drop trigger (per `data/roast_guidance.yaml`) | Behmor-safe? |
| --- | --- | --- |
| Light | 15–45s after FC starts, before any oil sheen | Yes |
| Light-medium | 30–60s into development | Yes |
| Medium | End of FC through 1:30–2:30 development | Yes |
| Medium-dark | First few snaps of 2C | **Yes — at the safety ceiling.** Drop within 10 sec of first 2C snap. |
| Dark | Rolling SC, before oil floods | **No** — requires staying in 2C past the 10-second line; violates the manual. |

So in practice the deepest roast you can target safely is **Medium-dark / Full City+**, with the drop trigger being the *first 1–3 snaps* of 2C. For darker than that you need a different machine.

## Critical safety constraints

These come straight from the manual and they are not soft rules:

- **Allow 1 HOUR between roasts.** Not minutes — the manual states this as a direct rule (Part 4 Important Reminders #4).
- **Never roast past 10 seconds into second crack.** Past this point beans can ignite.
- **Never start above ¼ lb when first learning.** The manual is loud about this — start with four ¼ lb batches on P1.
- **The 2000 AB Plus is not intended for Vienna, French, or Italian roasts.** Oily beans + chaff tray = fire risk.
- **Never leave the roaster unattended.** Explicit in the manual title: *"NOT a set and walk away device."*

## Beginner guidance

From manual Part 3:

- Roast **four ¼ lb batches on P1** to learn FC sounds, color cues, smell changes.
- After ¼ lb is comfortable, move to ½ lb. Move to 1 lb last.
- Always forward-think the roast by 15 seconds (the reversal time from roasting to cooling).
- **Never gauge degree of roast by oil appearance** — drum roasters don't show oil during the roast; droplets appear 24h–several days after, especially with rest.

## Cleaning

- Every **5 roasts** (more often for darker roasts), do a dry burn (¼ lb + Start, run full program) with the interior cleaned by Simple Green or other non-caustic / non-abrasive cleaner.
- Never spray heating elements.
- Keep the back-lower-right corner of the roasting chamber clean — the thermocouple sensor lives there. Dirty sensor = extended / wrong roast times.

## Sources

- [Behmor Roaster Quick Start Guide](https://behmor.com/knowledge-base/behmor-roaster-quick-start-guide/) — Behmor knowledge base
- [Control Panel Features & Auto-Safety Shutoff](https://behmor.com/knowledge-base/behmor-roaster-control-panel-features-auto-safety-shutoff/) — Behmor knowledge base
- [2000AB Plus 120V Operation Manual V30 (Oct 2024)](http://www.behmor.com/docs/Behmor%202000AB%20120v%20Operation%20Manual%20V28%2011.19.2023%20BW%20Inspired.pdf) — official manual
