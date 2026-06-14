# Repo instructions

## Roasting content (`content/roasts/`)

This section logs coffee roasts on a Behmor 2000 AB Plus. The architecture separates **universal roast science** from **machine-specific guidance** so future machines can be added without template changes.

### File layout

- `content/roasts/00N-<origin>.md` — one file per roast. Structured frontmatter holds plan + raw inputs + observations; the body is rendered from those fields, not from markdown prose.
- `content/roasts/_TEMPLATE.md` — scaffold for new roasts. Excluded from Tina collection via `match.exclude: "{_*,methods,behmor-*}"`.
- `content/roasts/methods.md` — universal-only reference doc. Formulas, target-level ranges, raw input definitions. No machine names here.
- `content/roasts/behmor-2000ab.md` — Behmor 2000 AB Plus machine cheat sheet. Tables render from YAML via shortcodes — do not hand-edit the tables; edit the data file.
- `data/roast_guidance.yaml` — universal: `levels` (loss%/DTR%/drop/flavor per roast level), `formulas`. **No machine references.**
- `data/machines/<model_key>.yaml` — everything machine-specific: profiles, weight_settings, preheat, safety, temperature_buttons, drum_speed. Has a `reference_url` field pointing to its cheat-sheet page.

### Machine selection is data-driven

`layouts/roasts/single.html` derives the machine YAML key from the `roaster` frontmatter field:

```
"Behmor 2000 AB Plus" → lower → replaceRE `[^a-z0-9]+` "_" → "behmor_2000_ab_plus"
```

That key looks up `.Site.Data.machines.behmor_2000_ab_plus`. If no match, the machine panel silently omits machine-specific data (this is intentional — the three earliest roasts still carry the wrong-model `roaster: Behmor 1600 Plus` value).

### Adding a new machine

1. Create `data/machines/<model_key>.yaml` matching the shape of `behmor_2000_ab_plus.yaml` (top-level: `name`, `reference_url`, `profiles`, `weight_settings`, `preheat`, `safety`, `temperature_buttons`, `drum_speed`).
2. Optionally create `content/roasts/<model-slug>.md` as a human-readable cheat sheet. Use the existing `roast-behmor-weights` / `roast-behmor-profiles` shortcodes with `machine="<model_key>"` arg.
3. Update `_index.md` References line to add the new cheat-sheet link.
4. Future roasts use the new model name in `roaster`. No template or schema changes required.

### Calibrating ranges from logged data

After ~10–15 logged roasts, the universal targets in `data/roast_guidance.yaml` may need tightening to match real cup outcomes. **Edit the YAML — do not embed ranges in templates.** All pages (single, list cards, methods, machine refs) pick up changes on rebuild.

### Time fields

`time_to_fc` and `total_time` are **elapsed time** in `mm:ss`. The Behmor displays *countdown* time — recording the countdown values produces a DTR > 40%, which is the immediate signal that elapsed vs countdown got confused. The first batch of roasts hit this; field descriptions in `tina/config.ts` clarify.

### What NOT to do

- Don't embed roast-level ranges (loss %, DTR %) in the Hugo template — they belong in `data/roast_guidance.yaml`.
- Don't hand-roll tables in `methods.md` or `behmor-2000ab.md` for data that lives in YAML — use the shortcodes (`roast-formulas`, `roast-levels`, `roast-behmor-weights`, `roast-behmor-profiles`).
- Don't add `weight_loss_pct`, `dev_time`, or `dtr_pct` back to frontmatter — they're computed in `single.html` and `list.html` from the four raw inputs.
- Don't mix machine-specific guidance into `methods.md`. That page is meant to be universal across machines.
- Don't modify the three completed roasts' measured data (`green_weight_g`, `roasted_weight_g`, `time_to_fc`, `total_time`, observations). The wrong-machine note in `bean_notes` is the documented record.
