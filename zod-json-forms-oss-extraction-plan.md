# Plan: Extract ZodForm framework to an open-source package

## Context

The work shipped in `wip/json-schema` (MR !8115) introduced a JSON-Forms-style form framework over Zod inside `x1-ui/`. It consumes wire-format-valid JSON Forms UI schemas and renders them against Zod-generated schemas with a pluggable renderer registry. The framework is currently coupled to X1 only by:

- PrimeVue + custom X1 wrapper components in the 5 shipped renderer SFCs
- A few X1 utility imports (`useEnumRefBuilder`, `formatCamelCaseToTitle`)
- Project file paths via `@/` aliases

The framework code itself (types, scope resolver, renderer registry, rules engine, dispatcher) is generic. It deserves to live outside this repo because:

1. The Control Plane will be its primary consumer, not Settings — having the framework as a versioned dependency makes upgrades intentional rather than ambient.
2. JSON Forms doesn't ship a Zod-backed implementation; this fills a real gap and there's nothing competing with it on npm today.
3. Splitting from the monorepo lets other teams/projects adopt it without dragging X1's dependency tree.

**Goal of this plan:** record the structure and decisions so the extraction can start from a known position, not a fresh design pass.

## Recommended architecture: shared core + thin adapters

Mirror JSON Forms' own package layout (`@jsonforms/core` + `@jsonforms/vue` + `@jsonforms/react`):

```
zod-json-forms/                  (single repo, pnpm/npm workspaces)
├── packages/
│   ├── core/                    Pure TS. No framework.
│   ├── vue/                     Vue 3 dispatcher + layouts. Depends on core.
│   ├── react/                   React 18+ dispatcher + layouts. Depends on core.
│   └── playground/              Vite app exercising both adapters (dev-only)
├── examples/
│   ├── vue-primevue/            Sample renderer pack (mirrors x1-ui's setup)
│   └── react-mui/               Sample renderer pack (TBD)
└── docs/                        VitePress site
```

This gives you both options from one source tree: the core is portable, and the framework-specific adapters ship as separate packages so consumers pull only what they need. No runtime polyfill or universal-rendering layer — those always ossify into bad abstractions.

## Package scope

### `@<scope>/zod-json-forms-core`

Pure TypeScript, zero framework deps. Peer-depends on `zod` and `@jsonforms/core` (for the upstream type definitions — `UISchemaElement`, `Layout`, `ControlElement`, `Rule`, etc., which we reuse verbatim).

**Exports:**
- Types: `RankedTester`, `TesterContext`, `JsonFormsRendererRegistryEntry` (Zod-flavored versions of the JSON Forms equivalents)
- `unwrap(schema)` / `extractChecks(def)` — Zod schema introspection (today in `unwrapZod.ts`)
- `resolveScope(rootSchema, scope)` — JSON Pointer → `{ schema, required, get, set }` (today in `useZodScope.ts`, renamed to drop the misleading `use` prefix)
- `parseJsonPointer(scope)` — RFC 6901 parser
- `createRendererRegistry()` — factory that returns `{ register, find }` (today's `rendererRegistry.ts` collapsed to a closure-scoped registry instead of module-scoped, so each form can have its own renderer set)
- `evaluateRule(rule, model)` — rules engine

**No dependencies on Vue or React.** Verified by importing from a vanilla Node script.

### `@<scope>/zod-json-forms-vue`

Vue 3 adapter. Depends on `vue` (peer), `core` (workspace), `zod` (peer), `@jsonforms/core` (peer).

**Exports:**
- `<ZodForm>` — top-level dispatcher SFC
- `<ZodControl>` — single-control dispatcher SFC
- `<VerticalLayout>`, `<Group>` — basic layout SFCs (anyone needs more, they register them)
- `layoutFor` — type-string → component registry (Vue-specific because layouts ARE Vue components)
- `ZOD_FORM_ROOT` injection key + `ZodFormRoot` type
- `useZodForm()` composable — wraps the provide/inject for advanced consumers

**No renderers shipped.** Consumers register their own widget renderers against the core registry.

### `@<scope>/zod-json-forms-react`

React 18+ adapter. Depends on `react` (peer), `core` (workspace), `zod` (peer), `@jsonforms/core` (peer).

**Exports:**
- `<ZodForm>` — top-level dispatcher
- `<ZodControl>` — single-control dispatcher
- `<VerticalLayout>`, `<Group>` — basic layouts as React components
- `ZodFormContext` (React Context) + `ZodFormProvider` wrapper
- `useResolveScope()`, `useEvaluateRule()` hooks for advanced consumers
- `useLayoutFor()` hook

**No renderers shipped.**

### `examples/vue-primevue` (and react-mui later)

The 5 renderers we shipped in `x1-ui/src/components/forms/renderers/` move here as the reference implementation. They demonstrate how to register against the core registry and serve as copy-paste templates. They are **not** published as a package — anyone building a real app should fork-and-modify or write their own.

## Source migration map

Mapping today's files in `x1-ui/` to the new package layout:

| Today's path | New location |
|---|---|
| `x1-ui/src/composables/forms/types.ts` | `packages/core/src/types.ts` |
| `x1-ui/src/composables/forms/unwrapZod.ts` | `packages/core/src/unwrapZod.ts` |
| `x1-ui/src/composables/forms/useZodScope.ts` | `packages/core/src/resolveScope.ts` (renamed) |
| `x1-ui/src/composables/forms/rendererRegistry.ts` | `packages/core/src/rendererRegistry.ts` (refactored to factory) |
| `x1-ui/src/composables/forms/rules.ts` | `packages/core/src/rules.ts` |
| `x1-ui/src/components/forms/ZodForm.vue` | `packages/vue/src/ZodForm.vue` |
| `x1-ui/src/components/forms/ZodControl.vue` | `packages/vue/src/ZodControl.vue` |
| `x1-ui/src/components/forms/zodFormContext.ts` | `packages/vue/src/context.ts` |
| `x1-ui/src/components/forms/layouts/*` | `packages/vue/src/layouts/*` |
| `x1-ui/src/components/forms/renderers/*` | `examples/vue-primevue/src/renderers/*` |
| `x1-ui/tests/unit/composables/forms/*` | `packages/core/tests/*` |

X1 consumes the published `@<scope>/zod-json-forms-vue` package; the local `forms/` directory shrinks to just the X1-specific renderer registrations.

## Bespoke X1 things to strip before extraction

- **`useEnumRefBuilder`** import in `DropdownRenderer.vue` — this is an X1 utility. The dropdown renderer wrapper is example code anyway; inline the `{ label, value }` mapping there or accept a user-provided formatter.
- **`formatCamelCaseToTitle`** import in `ZodControl.vue` — small utility. Either inline as the default label fallback or expose a configurable `labelFormatter` option.
- **PrimeVue `v-tooltip`** directive on the label — replace with a `tooltipRender` slot or callback prop so consumers wire their own tooltip mechanism.
- **`@/` path aliases** — all become relative imports within each package.
- **X1's `WrappedSwitch`, `RygenDropdown`** — these are X1 components. Replaced in the example pack with vanilla PrimeVue or just plain elements.
- **`markRaw` on the schema in `ZodForm.vue`** — keep in the Vue package. It's a Vue-specific workaround for Zod's frozen `_zod` property; the React adapter doesn't need it (Context value is not reactive-proxy-wrapped).

## Public API contract considerations

Things to nail down before publishing v0.1.0 so we don't break consumers later:

1. **Tester signature.** Today: `(uischema, schema, context) => number`. Matches `@jsonforms/core`'s `RankedTester` exactly except for `schema: ZodType` instead of `JsonSchema`. Keep.
2. **Registry shape.** Today: `JsonFormsRendererRegistryEntry` with `renderer: Component`. The React adapter needs `renderer: React.ComponentType<...>`. Solution: parameterize core's registry with the renderer type — `RendererRegistry<R>` where Vue passes `Component` and React passes `React.ComponentType`.
3. **Rules engine extension.** Today: only `const`, `enum`, `not` condition schemas. Expose a `registerConditionEvaluator(keyword, fn)` so users can add `pattern`, `required`, etc., without forking. Don't pull in AJV.
4. **Scope resolver.** Today: only handles `#/properties/<key>` chains. Add array support (`#/properties/items/<index>` or `#/properties/items/items`) before v0.1.0 — common JSON Forms pattern, easy to miss.
5. **Error handling.** Today: bad scopes throw at render time. Decide whether to expose a `validate(uiSchema, schema)` static checker that consumers can run at build time.

## Open questions (deferred)

| Question | Default if not decided |
|---|---|
| Repo location / org | Personal GitHub initially; consider donation to `@jsonforms` org once stable |
| Package scope | `@vordimous/zod-json-forms` (your existing namespace?) or unscoped `zod-json-forms` |
| License | MIT (matches JSON Forms) |
| Build tooling | pnpm workspaces + tsup for libraries + Vite for playground/examples |
| Test framework | vitest across all packages |
| Docs site | VitePress (same engine as JSON Forms docs) |
| Versioning | Changesets for per-package semver |
| Project name | "ZodForm" is fine internally; published namespace is the real public name |

## Phasing

1. **Spike repo** — scaffold the monorepo with empty packages, get `pnpm install` working, set up CI.
2. **Move core** — copy the 5 core TS files, strip Vue/React imports, get tests passing standalone.
3. **Move Vue adapter** — copy the SFCs, strip X1-specific imports, get them rendering in `packages/playground` against a minimal renderer registration.
4. **Port to React** — write the React dispatcher + hooks from scratch using the Vue version as a spec. Same JSON Forms layouts work; only the framework binding differs.
5. **Example renderer packs** — `vue-primevue` first (copied from this MR), then `react-mui` or whatever the React community lands on.
6. **X1 cutover** — replace `x1-ui/src/components/forms/` and `x1-ui/src/composables/forms/` with imports from the published package. The renderer SFCs stay in x1-ui (they're consumer code), now registered against the imported core registry.

Steps 1–5 are net-new work. Step 6 is the migration that proves the extraction was successful.

## Why I'm not recommending a "universal" runtime

It's tempting to build one package that detects framework at runtime or uses a render-target abstraction. Don't. Two reasons:

1. Vue's reactive system and React's reconciler have different mental models for state propagation; trying to express both through a shared abstraction means you end up with the lowest common denominator and both adapters feel awkward.
2. JSON Forms tried this with renderer packs that crossed framework boundaries and ended up with the same `@jsonforms/vue` / `@jsonforms/react` / `@jsonforms/angular` split we're proposing here.

The core package is genuinely framework-free (pure types and pure functions). The adapters are thin enough that maintaining two is cheaper than maintaining one universal layer plus its escape hatches.

## Not in scope for this plan

- Backend JSON layout generation (X1 Control Plane work, lives in `x1-app/`)
- Multi-select / code-editor / async-dropdown renderers (deferred to Phase 2 in the X1 MR)
- Form-level validation orchestration (today `useZodValidation` handles save-time; the OSS package could expose a `validateForm` helper but it's a separate design)
- Internationalization / i18n hooks
- A11y audit
