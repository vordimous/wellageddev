# Roasting section instructions

This section logs coffee roasts on a Behmor 2000 AB Plus. The architecture separates **universal roast science** from **machine-specific guidance** so future machines can be added without template changes.

## File layout

- `content/roasts/00N-<origin>.md` — one file per roast. Structured frontmatter holds plan + raw inputs + observations; the body is rendered from those fields, not from markdown prose.
- `content/roasts/_TEMPLATE.md` — scaffold for new roasts. Excluded from Tina collection via `match.exclude: "{_*,methods,behmor-*}"`.
- `content/roasts/methods.md` — universal-only reference doc. Formulas, target-level ranges, raw input definitions. No machine names here.
- `content/roasts/behmor-2000ab.md` — Behmor 2000 AB Plus machine cheat sheet. Tables render from YAML via shortcodes — do not hand-edit the tables; edit the data file.
- `data/roast_guidance.yaml` — universal: `levels` (loss%/DTR%/rest_days/drop/flavor per roast level), `formulas`. **No machine references.**
- `data/machines/<model_key>.yaml` — everything machine-specific: profiles, weight_settings, preheat, safety, temperature_buttons, drum_speed. Has a `reference_url` field pointing to its cheat-sheet page.

## Machine selection is data-driven

`layouts/roasts/single.html` derives the machine YAML key from the `roaster` frontmatter field:

```text
"Behmor 2000 AB Plus" → lower → replaceRE `[^a-z0-9]+` "_" → "behmor_2000_ab_plus"
```

That key looks up `.Site.Data.machines.behmor_2000_ab_plus`. If no match, the machine panel silently omits machine-specific data (this is intentional — the three earliest roasts still carry the wrong-model `roaster: Behmor 1600 Plus` value).

## Adding a new machine

1. Create `data/machines/<model_key>.yaml` matching the shape of `behmor_2000_ab_plus.yaml` (top-level: `name`, `reference_url`, `profiles`, `weight_settings`, `preheat`, `safety`, `temperature_buttons`, `drum_speed`).
2. Optionally create `content/roasts/<model-slug>.md` as a human-readable cheat sheet. Use the existing `roast-behmor-weights` / `roast-behmor-profiles` shortcodes with `machine="<model_key>"` arg.
3. Add the new cheat-sheet link to the references box in `layouts/roasts/list.html` (hardcoded there, not in markdown).
4. Future roasts use the new model name in `roaster`. No template or schema changes required.

## Calibrating ranges from logged data

After ~10–15 logged roasts, the universal targets in `data/roast_guidance.yaml` may need tightening to match real cup outcomes. **Edit the YAML — do not embed ranges in templates.** All pages (single, list cards, methods, machine refs) pick up changes on rebuild.

## Ready-to-drink window

Each roast page and list card computes a rest window from the **roast date** + the level's `rest_days` range, then shows a status pill (`Resting` / `Ready` / `Past peak`) by comparing against `now`. The math lives in `layouts/roasts/single.html` and `layouts/roasts/list.html` and uses `time.ParseDuration` with hour-based durations (`mul 24 days` → `%dh`). To tune rest windows, edit the `rest_days` arrays in `data/roast_guidance.yaml` — both pages update on rebuild.

**Rest-time assumptions:** the YAML ranges are tuned for **drum roaster + filter brewing**, which is what this site logs. Scott Rao: drum roasts don't need more than 1–2 days unless underdeveloped; air roasters need 1–4 weeks. Filter vents CO₂ freely (vendor "12–24hr" minimums are real); espresso needs ~5–7 more days because gas can't escape under 9 bar. Don't widen these ranges back toward espresso/air-roaster numbers without changing the brew-method assumption documented in `methods.md` and the YAML header.

## Roasted beans photo

`roasted_photo` is a Tina `image` field. Uploads go to `static/imgs/` (configured in `tina/config.ts` media block). Phone uploads work because the project is on Tina Cloud. The single page renders the photo as a `<figure>` right after the headline stats strip, before the plan panel. Capped at 720px display width with `max-width: min(100%, 720px)` — responsive on phones, doesn't dominate on desktop. No multi-resolution `srcset` yet — to add it later, move the Tina media root from `static/` to `assets/` and use Hugo's image pipeline (`resources.GetMatch` + `.Resize`).

## Bean source

`product_url` (paste the vendor's product page link) and optional `vendor` (human-readable name). The single page renders a "Source" row in the plan panel — uses `vendor` if set, otherwise extracts the URL's host via `replaceRE`. Links open in a new tab with `rel="noopener"`.

## Building a roast playbook — REQUIRED PROCESS

A roast playbook directly drives a physical action on a $400 machine using $20+ of green coffee. Wrong guidance burns beans and risks fire (the Behmor manual is explicit about ignition past 10 seconds into 2C). Treat every playbook like instructions someone will follow with their hands on hot equipment.

### Before writing any playbook step

1. **Read the machine reference page first** — `content/roasts/behmor-2000ab.md` is the source of truth for everything machine-specific. The official manual is linked there.
2. **Look up the origin's recommended Auto Mode profile** from the machine YAML (`auto_mode_profiles`). The mapping is non-obvious:
   - **Centrals, Peruvian, Colombian** → P1 or P2 (Hard Bean, highest heat)
   - **Brazilian, African, SE Asian, Malabar, JBM, Yauco** → P3 (Soft Bean)
   - **Kona, low-grown island** → P4 or P5 (lowest heat)

   Picking P5 for a Brazilian or Central American bean is wrong — P5 in Auto mode is the *lowest* heat profile, intended for Hawaiian/island coffees. The "P5 = aggressive" assumption is only correct in Manual mode (which fires AFTER Start).

3. **Default to the C-button + Auto P1 hold technique** for drinking-coffee batches at ½ lb or 1 lb: start on Auto P1 (or per-origin Auto profile), at FC press **C** (resets timer to Rosetta Stone 1C→2C window), stay on Auto P1 through the FC body, drop to P3 only as a brake if 2C threatens. Extend with additional **C** presses, not `+` (which has a per-roast cap that 007 hit at +2:00). See `c_button_technique` in `data/machines/behmor_2000_ab_plus.yaml` and the public Behmor reference page.

   **Do NOT default to the manual's Pro Sample Roasting technique** (P3+D at FC+15s) for drinking-coffee batches — it cuts power to 50% for the entire development phase, which stalls heat needed for moisture drive-off. Roasts 006 and 007 both used Pro Sample Roasting and came in under-developed (8–9.4% loss vs 13–16% target, DTR 38%+ vs 17–22% target). Pro Sample Roasting is for sample roasting (small evaluation batches where slow, low-development finish is intentional); see `pro_sample_roasting.appropriate_use` in the YAML.

4. **Confirm constraints from the manual:**
   - Batch ≤ 336 g if pushing past City+ (manual recommendation for darker control)
   - 1:30 maximum preheat (longer locks out the roast)
   - 1 HOUR between back-to-back roasts (NOT minutes — early playbooks got this wrong by an order of magnitude)
   - Never past 10 sec into 2C
   - 75% Err 7 safety shutoff fires at 75% of program time (need START or C to continue)

### Structure every playbook with

- **A plan rationale block at the top** — what bean type → which Auto profile, what target level, what charge size, expected FC behavior
- **A numbered sequence** that includes: preheat, drum insert, profile + weight + START, when to listen for FC, exact 75% shutoff time, C-button at FC (the default per `c_button_technique` in the machine YAML), drop trigger for the target level, cool cycle, weigh, and between-roast wait
- **A "what to watch" block** flagging the bean's idiosyncrasies plus the universal fire-risk warnings (heavy smoke, past-2C, etc.)
- **Cite the manual** when adding non-obvious advice (e.g. "manual Part 5, page 12-13" for the pro technique). The citations are what let a future reader verify the playbook against an authoritative source.

### What NOT to do when building a playbook

- Don't pick a profile from intuition — look it up in `auto_mode_profiles`.
- Don't assume "more aggressive = higher P number" — that's Manual mode logic, not Auto mode.
- Don't write a back-to-back cool-down in minutes if the manual says 1 hour.
- Don't reuse a prior roast's playbook structure without checking it against the manual — early playbooks (001–004) were built before we had the manual extracted and contain known errors.
- Don't copy generic drum-roaster advice (Genuine Origin, Scott Rao, etc.) into a Behmor playbook unless you've verified it applies to a probeless fixed-program machine.
- Don't write unsourced sensory recipes ("press P3 for the final 30s before 2C", "open door at 1:30 into cool"). If a step isn't traceable to the manual or a cited forum/library, either drop it or mark it explicitly as common roasting knowledge / community technique. The rule is: a step under time pressure should not be dressed up as official guidance when it isn't.
- Don't test multiple variables in a single roast. When introducing a new technique (e.g. switching from Pro Sample Roasting to C-button + Auto P1 hold), validate it at a previously-attempted target before pushing to a new deeper or lighter level. Otherwise you can't cleanly attribute an off result to technique vs target. If the user requests a multi-variable run anyway, flag it explicitly in `bean_notes` so the outcome is interpreted with that caveat.

### Every playbook runs in isolation

Each `NNN-*.md` playbook must be written as if no other roast preceded it. Two specific consequences:

1. **Always include the 1:30 preheat step.** The Behmor's cool cycle blows forced air through the chamber specifically to cool the drum and elements down. The next roast needs the standard preheat regardless of how recently the previous one finished. Do not write conditional preheat ("skip if back-to-back") or "drum is hot" framing — both are wrong.
2. **No cross-references to other roasts in the playbook body.** No "back-to-back" deviation framing, no "previous roast" notes, no chronology-based instructions. The 1-hour-between-roasts rule is a standalone instruction at the end of the sequence, not a framing for skipping steps. Bean notes may compare against prior *tasting* outcomes; the playbook itself cannot.

The "no preheat, drum hot" pattern in roasts 003–004 is documented as one of the pre-manual errors — don't propagate it.

## Repeatability — capture every button press

The `interventions` field is the single most important repeatability tool. Starting settings (profile / weight / batch) are not enough to reproduce a roast — what *makes* the roast is the sequence of mid-roast button presses with their elapsed times. Capture them all:

- The Manual-mode P switch (e.g. `14:00 — P3 (drop to 50%)`)
- The D button if pressed (e.g. `14:00 — D (drum high)`)
- Every `C` press (note: C is the documented extension lever for the C-button technique; resets the timer to the Rosetta Stone 1C→2C window)
- Every `+` press with the seconds added (note: + has a per-roast cumulative cap, ~+2:00 observed; if you reach for + as the primary extension lever you'll run out)
- The Cool press at drop

Format is one per line, `MM:SS — what you pressed`. Free text after the dash is fine. The page renders it as a monospace block in the Live notes section.

Without this log, "ran on Auto P1, 1 lb, dropped at 18:45" tells you nothing about *when* you switched modes, *when* you added time, or how the cup got where it did. With it, future-you can replicate a good roast or diagnose a bad one.

## Capturing machine details honestly

When pulling info from the Behmor manual into the YAML data:

- **Quote the manual directly** in a `manual_quote` or similar field when the wording matters
- **Flag contradictions** rather than silently picking one. The manual gives two different drum-speed RPM ranges on different pages; the YAML now states this and treats the absolute values as approximate
- **Don't invent precision.** If the manual says "high" and "standard" without RPM, capture those names. Don't backfill numbers from forum posts or other machines

This same standard applies to playbook construction — every non-obvious instruction should be traceable to a manual section. See "Building a roast playbook" above.

## Time fields

`time_to_fc` and `total_time` are **elapsed time** in `mm:ss`. The Behmor displays *countdown* time — recording the countdown values produces a DTR > 40%, which is the immediate signal that elapsed vs countdown got confused. The first batch of roasts hit this; field descriptions in `tina/config.ts` clarify.

## What NOT to do

- Don't embed roast-level ranges (loss %, DTR %) in the Hugo template — they belong in `data/roast_guidance.yaml`.
- Don't hand-roll tables in `methods.md` or `behmor-2000ab.md` for data that lives in YAML — use the shortcodes (`roast-formulas`, `roast-levels`, `roast-behmor-weights`, `roast-behmor-profiles`).
- Don't add `weight_loss_pct`, `dev_time`, or `dtr_pct` back to frontmatter — they're computed in `single.html` and `list.html` from the four raw inputs.
- Don't mix machine-specific guidance into `methods.md`. That page is meant to be universal across machines.
- Don't modify the three completed roasts' measured data (`green_weight_g`, `roasted_weight_g`, `time_to_fc`, `total_time`, observations). The wrong-machine note in `bean_notes` is the documented record.
