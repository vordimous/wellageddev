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

3. **Default to the Professional Sample Roasting technique** unless you have a specific reason to deviate: start on Auto P1 (or per-origin Auto profile), and at 10–15s after FC press P3 + D to drop power to 50% and raise drum speed. Manual Part 5 page 12-13.

4. **Confirm constraints from the manual:**
   - Batch ≤ 336 g if pushing past City+ (manual recommendation for darker control)
   - 1:30 maximum preheat (longer locks out the roast)
   - 1 HOUR between back-to-back roasts (NOT minutes — early playbooks got this wrong by an order of magnitude)
   - Never past 10 sec into 2C
   - 75% Err 7 safety shutoff fires at 75% of program time (need START or C to continue)

### Structure every playbook with

- **A plan rationale block at the top** — what bean type → which Auto profile, what target level, what charge size, expected FC behavior
- **A numbered sequence** that includes: preheat, drum insert, profile + weight + START, when to listen for FC, exact 75% shutoff time, the P3+D drop after FC, drop trigger for the target level, cool cycle, weigh, and between-roast wait
- **A "what to watch" block** flagging the bean's idiosyncrasies plus the universal fire-risk warnings (heavy smoke, past-2C, etc.)
- **Cite the manual** when adding non-obvious advice (e.g. "manual Part 5, page 12-13" for the pro technique). The citations are what let a future reader verify the playbook against an authoritative source.

### What NOT to do when building a playbook

- Don't pick a profile from intuition — look it up in `auto_mode_profiles`.
- Don't assume "more aggressive = higher P number" — that's Manual mode logic, not Auto mode.
- Don't write a back-to-back cool-down in minutes if the manual says 1 hour.
- Don't reuse a prior roast's playbook structure without checking it against the manual — early playbooks (001–004) were built before we had the manual extracted and contain known errors.
- Don't copy generic drum-roaster advice (Genuine Origin, Scott Rao, etc.) into a Behmor playbook unless you've verified it applies to a probeless fixed-program machine.

## Time fields

`time_to_fc` and `total_time` are **elapsed time** in `mm:ss`. The Behmor displays *countdown* time — recording the countdown values produces a DTR > 40%, which is the immediate signal that elapsed vs countdown got confused. The first batch of roasts hit this; field descriptions in `tina/config.ts` clarify.

## What NOT to do

- Don't embed roast-level ranges (loss %, DTR %) in the Hugo template — they belong in `data/roast_guidance.yaml`.
- Don't hand-roll tables in `methods.md` or `behmor-2000ab.md` for data that lives in YAML — use the shortcodes (`roast-formulas`, `roast-levels`, `roast-behmor-weights`, `roast-behmor-profiles`).
- Don't add `weight_loss_pct`, `dev_time`, or `dtr_pct` back to frontmatter — they're computed in `single.html` and `list.html` from the four raw inputs.
- Don't mix machine-specific guidance into `methods.md`. That page is meant to be universal across machines.
- Don't modify the three completed roasts' measured data (`green_weight_g`, `roasted_weight_g`, `time_to_fc`, `total_time`, observations). The wrong-machine note in `bean_notes` is the documented record.
