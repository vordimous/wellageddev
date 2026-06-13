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
  // Skip the _TEMPLATE.md scaffold so it doesn't show up as an editable entry.
  match: { exclude: "_*" },
  description:
    "Coffee roast log. One markdown file per roast — phone-friendly fields for mid-roast edits.",
  defaultItem: () => ({
    date: new Date().toISOString(),
    roaster: "Behmor 1600 Plus",
    batch_size_g: 113,
    profile: "P5",
    weight_setting: "1 lb",
    tags: ["roast"],
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
    { type: "datetime", name: "date", label: "Date" },
    { type: "string", name: "roaster", label: "Roaster" },
    { type: "string", name: "origin", label: "Origin" },
    { type: "string", name: "process", label: "Process" },
    { type: "string", name: "target_level", label: "Target roast level" },
    { type: "number", name: "batch_size_g", label: "Batch size (g green)" },
    { type: "string", name: "profile", label: "Behmor profile" },
    { type: "string", name: "weight_setting", label: "Weight setting" },
    { type: "string", name: "drum_speed", label: "Drum speed" },
    { type: "number", name: "green_weight_g", label: "Green weight (g)" },
    { type: "number", name: "roasted_weight_g", label: "Roasted weight (g)" },
    { type: "number", name: "weight_loss_pct", label: "Weight loss %" },
    { type: "string", name: "time_to_fc", label: "Time to first crack (mm:ss)" },
    { type: "string", name: "total_time", label: "Total roast time (mm:ss)" },
    { type: "string", name: "dev_time", label: "Development time (mm:ss)" },
    { type: "number", name: "dtr_pct", label: "DTR %" },
    { type: "number", name: "rating", label: "Rating (1–10)" },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
    },
    markdownBody,
    { type: "boolean", name: "draft", label: "Draft" },
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
