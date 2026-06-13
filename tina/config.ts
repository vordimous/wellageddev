import { defineConfig, type Collection, type TinaField } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Hide a declared-but-technical field from the editor UI while keeping it in
// the file (Tina drops any undeclared frontmatter key on save).
const hidden = { component: () => null };

// Shared metadata fields placed at the END of every form (content-first).
const metaFields: TinaField[] = [
  {
    type: "datetime",
    name: "date",
    label: "Date",
    description: "Publish date. Used for sorting and the archive feed.",
  },
  {
    type: "string",
    name: "tags",
    label: "Tags",
    list: true,
    description: "SEO / grouping — optional. Safe to leave as-is.",
  },
  {
    type: "boolean",
    name: "draft",
    label: "Draft",
    description: "When ON, the page is hidden from the live site.",
  },
];

// Rich-text body — used for short pages with plain markdown only.
const richBody: TinaField = {
  type: "rich-text",
  name: "body",
  label: "Body",
  isBody: true,
  description:
    "Main page content. Use the toolbar for headings, lists, and links.",
};

// Raw-markdown body — used for posts so Hugo shortcodes (e.g. {{< mermaid >}})
// and any raw HTML survive saves untouched.
const markdownBody: TinaField = {
  type: "string",
  name: "body",
  label: "Body (Markdown)",
  isBody: true,
  ui: { component: "textarea" },
  description:
    "Raw markdown. Hugo shortcodes like {{< mermaid >}} are preserved here.",
};

// =====================================================================
// CONTENT TIER — everyday editing
// =====================================================================

const posts: Collection = {
  name: "post",
  label: "Posts",
  path: "content/posts/",
  format: "md",
  description:
    "Blog posts. New posts appear on the homepage and in /posts/.",
  defaultItem: () => ({
    date: new Date().toISOString(),
    draft: true,
  }),
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "summary",
      label: "Summary",
      description:
        "Shown in post lists and as the meta description. 1–2 sentences.",
    },
    markdownBody,
    ...metaFields,
  ],
};

const drafts: Collection = {
  name: "draft",
  label: "Drafts",
  path: "content/",
  format: "md",
  // Only the four loose draft files at the content root. Avoids overlap with
  // _index.md and the posts/ collection.
  match: { include: "{buy_a_bike,cover,open_bar,profile}" },
  description:
    "Scratch pages that live at the site root. Marked draft — not on the live site until you flip the Draft switch off.",
  ui: {
    allowedActions: { create: false, delete: false },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "summary",
      label: "Summary",
    },
    markdownBody,
    ...metaFields,
  ],
};

const roasts: Collection = {
  name: "roast",
  label: "Roasts",
  path: "content/roasts/",
  format: "md",
  // Skip the _TEMPLATE.md scaffold and the methods reference page — they
  // aren't roast entries.
  match: { exclude: "{_*,methods}" },
  description:
    "Coffee roast log. Phone-friendly: scroll top→bottom in the order you actually fill fields during a roast.",
  defaultItem: () => ({
    date: new Date().toISOString(),
    batch_size_g: 227,
    profile: "P5",
    weight_setting: "½ lb",
    tags: ["roast"],
    draft: true,
    roaster: "Behmor 1600 Plus",
  }),
  fields: [
    // ----- TITLE & DATE -----
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      description: "Roast date. Sorts the roast index.",
    },

    // ----- BEAN PLAN (pre-roast) -----
    {
      type: "string",
      name: "origin",
      label: "Origin",
      description:
        "Country and farm/region/lot. Example: \"Ethiopia — Kayon Mountain, Taaroo\".",
    },
    {
      type: "string",
      name: "process",
      label: "Process",
      description:
        "Washed, Natural, Honey, Anaerobic, etc. Read it off the bean bag.",
    },
    {
      type: "string",
      name: "target_level",
      label: "Target roast level",
      options: ["Light", "Light-Medium", "Medium", "Medium-Dark", "Dark"],
      description:
        "Drives the expected-range panel. Dropdown to avoid typos that would silently break the lookup.",
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      description: "Always keep \"roast\". Add origin, varietal, process.",
    },

    // ----- BATCH PLAN (pre-roast) -----
    {
      type: "number",
      name: "batch_size_g",
      label: "Batch size (g green)",
      description:
        "Grams of green charged. ½ lb (227 g) is the Behmor's comfortable batch.",
    },
    {
      type: "string",
      name: "profile",
      label: "Behmor profile",
      description: "P1–P5. P5 is the default for almost all batches.",
    },
    {
      type: "string",
      name: "weight_setting",
      label: "Weight setting",
      description:
        "Match the actual charge (½ lb for 227 g). Overshoot one class only for tiny (~¼ lb) charges.",
    },
    {
      type: "number",
      name: "green_weight_g",
      label: "Green weight (g)",
      description:
        "Exact weighed grams BEFORE the roast. Fill in when you weigh the batch — used to compute loss %.",
    },

    // ----- PRE-ROAST FREEFORM NOTES -----
    {
      type: "string",
      name: "bean_notes",
      label: "Bean-specific notes",
      ui: { component: "textarea" },
      description:
        "What makes THIS bean distinct — flavor goals beyond the level-default, density quirks, things to watch.",
    },
    {
      type: "string",
      name: "playbook",
      label: "Today's playbook",
      ui: { component: "textarea" },
      description:
        "Step-by-step plan for this specific roast. Ambient temp, FC window estimate, drop trigger, between-roast cool time.",
    },

    // ----- LIVE NOTES (during roast) — fill in time order -----
    {
      type: "string",
      name: "time_to_fc",
      label: "Time to first crack (mm:ss)",
      description: "Elapsed from Start to the first audible pop. Format 09:30.",
    },
    {
      type: "string",
      name: "color_at_fc",
      label: "Color at first crack",
      description:
        "Quick observation at FC start. Example: \"light tan, no smoke yet\".",
    },
    {
      type: "string",
      name: "smell_at_fc",
      label: "Smell at first crack",
      description:
        "Quick observation. Example: \"bread-y / sweet / faint caramel\".",
    },
    {
      type: "string",
      name: "total_time",
      label: "Total roast time (mm:ss)",
      description: "Elapsed from Start to when you hit Cool / dropped.",
    },
    {
      type: "string",
      name: "why_dropped",
      label: "Why dropped",
      ui: { component: "textarea" },
      description:
        "What you saw/heard that triggered the drop. Useful next time you're between SC snaps and second.",
    },
    {
      type: "string",
      name: "anything_weird",
      label: "Anything weird",
      ui: { component: "textarea" },
      description:
        "Stalls, uneven roast, smoke earlier than expected, scorched beans, anything off. Leave blank if nothing.",
    },

    // ----- POST-ROAST MEASUREMENT -----
    {
      type: "number",
      name: "roasted_weight_g",
      label: "Roasted weight (g)",
      description: "Weighed grams AFTER cooling. Page computes loss % from this and the green weight.",
    },

    // ----- REST & TASTE -----
    {
      type: "string",
      name: "tasting_notes",
      label: "Tasting notes (after 12–24h rest)",
      ui: { component: "textarea" },
      description:
        "Aroma, acidity, body, sweetness, finish. Brew method + ratio if relevant.",
    },
    {
      type: "number",
      name: "rating",
      label: "Rating (1–10)",
      description: "Your subjective score of the cup after resting.",
    },
    {
      type: "string",
      name: "next_time",
      label: "What to change next time",
      ui: { component: "textarea" },
      description:
        "Specific adjustments for the next batch of this bean. Drop earlier? More dev? Different weight setting?",
    },

    // ----- OVERFLOW BODY (optional) -----
    {
      type: "string",
      name: "body",
      label: "Anything else (freeform markdown)",
      isBody: true,
      ui: { component: "textarea" },
      description:
        "Optional. Use for photos, tables, links, or anything that doesn't fit the structured fields above.",
    },

    // ----- MACHINE / ADMIN (rarely changes) -----
    {
      type: "string",
      name: "roaster",
      label: "Roaster",
      description: "Defaults to Behmor 1600 Plus. Change only if you switch machines.",
    },
    {
      type: "boolean",
      name: "draft",
      label: "Draft",
      description: "When ON, this roast is hidden from the live site.",
    },
  ],
};

// =====================================================================
// PAGES TIER — one-off page text
// =====================================================================

const homePage: Collection = {
  name: "home",
  label: "Page: Home",
  path: "content/",
  format: "md",
  match: { include: "_index" },
  description:
    "The text on the site's home page. Affects what visitors see first.",
  ui: {
    allowedActions: { create: false, delete: false },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      description:
        "Optional. The home page falls back to the site title if blank.",
    },
    {
      type: "string",
      name: "summary",
      label: "Intro / Summary",
      ui: { component: "textarea" },
      description: "The intro paragraph shown above the recent posts list.",
    },
    richBody,
    {
      type: "string",
      name: "coverImg",
      label: "Cover Image",
      description:
        "Filename of an image in static/imgs/ (e.g. wd_logo.svg). Optional.",
    },
    ...metaFields,
  ],
};

const aboutPage: Collection = {
  name: "about",
  label: "Page: About",
  path: "content/about/",
  format: "md",
  match: { include: "index" },
  description:
    "The About / Resume page. Long-form content with headings is fine here.",
  ui: {
    allowedActions: { create: false, delete: false },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "summary",
      label: "Summary",
      ui: { component: "textarea" },
      description: "Short tagline shown under the title.",
    },
    richBody,
    ...metaFields,
  ],
};

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "imgs",
      publicFolder: "static",
    },
  },

  schema: {
    collections: [
      // ---- Content (everyday editing) ----
      posts,
      roasts,
      drafts,
      // ---- Pages (one-off page text) ----
      homePage,
      aboutPage,
      // ---- Settings (site-wide) ----
      // Header / footer / menus / social live in config/_default/*.toml and
      // are not editable through Tina by design.
    ],
  },
});
