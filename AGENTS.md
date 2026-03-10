# Agent rules (Code guidelines)

## Variables

### Naming convention

- **snake_case** for functions and variables.
- **PascalCase** for components (React, Svelte, Astro or other UI components). If exporting a component wrapped by HOC, use underscore prefix for the original, e.g. `_MainMenu`.
- **ALL_CAPS** for constants and enum-like object values.
- **PascalCase** for enum-like objects and types; **ALL_CAPS** for their items. Do not use Typescript enums.

### Meaningful names

- Names must be **short**, **intuitive**, and **descriptive** (pronounceable, close to common speech).
- Use a **descriptive variable for conditions** when context is unclear, the condition is reused, or there are multiple conditions (e.g. `is_map_view`, `is_current_tab`, `is_day_valid`).
- Use names that **reflect the result**; avoid negative conditionals (e.g. prefer `is_disabled` over `!is_enabled`, `is_invalid` over `!is_valid`).
- Use **searchable names** (e.g. `MILLISECONDS_IN_A_DAY` instead of magic number `86400000`).
- **Avoid variable name shorthands**; use whole words (e.g. `event` not `e`, `user` not `u`).
- Use **default parameters and destructuring** where it improves readability.

### Prefixes

- **is** – characteristic or state (boolean): `is_admin`, `is_logged_in`, `is_invalid_date`.
- **has** – current context possesses a value (boolean): `has_filters`, not `are_filters_set`.
- **should** – conditional statement (boolean): `should_display_pagination`, `should_update_component`.
- **min/max** – minimal or maximal value: `min_battery`, `max_battery`.
- **prev/next** – previous or next state: `prev_state`, `next_users`.

### Singular/plural

- Name variables by cardinality: plural for arrays (`users`, `dogs`), singular for single values (`user`, `dog`).

---

## Functions

### Naming pattern

Use: **prefix? + action (A) + high context (HC) + low context? (LC)**.
Order of context changes meaning (e.g. `should_update_component` vs `should_component_update`).

### Action prefixes

- **fetch** – access remote data (async/API).
- **get** – access data immediately (sync).
- **set** – change a value (e.g. state).
- **reset** – reset state/data to initial value.
- **remove** – remove something from a collection.
- **delete** – remove something from persistence/existence.
- **compose** – create new data from existing.
- **handle** – handle events/actions (e.g. `handle_click` → `onClick`).

### Structure

- **At most 2–3 parameters**; if more, use a single options object.
- **One responsibility per function**; keep functions small.
- **Extract predicates/callbacks** into named functions when it improves clarity or reuse (e.g. `get_id`, then `users.map(get_id)`).
- Prefer **declarative/functional** style: use `map`, `filter`, `reduce`, `slice`, `concat` instead of mutating; avoid mutating with `push`, `pop`, `shift`, `unshift`, `splice` unless necessary.

### Arrow functions

- Use arrow functions for single-line expressions and callbacks.
- If an arrow function doesn’t fit on one line, use a block with explicit `return`, or use a function declaration.
- In component render/template, if the logic is larger than one line, move it to a named handler and keep the template clean.

---

## Declarative vs imperative

- Prefer **functional, declarative** code over imperative.
- Prefer **immutability**; use `map`, `filter`, `reduce`, `slice`, `concat` rather than mutating arrays.
- Use **reduce** when reducing to a different type (e.g. object or different length); otherwise **map** is usually enough.

---

## Modules

- **Named exports** for components (better for IDE intellisense, autocomplete, refactoring).
- **Default export** for pages when the framework requires it (e.g. Next.js pages).
- Use **type-only imports** for types: `import type { Foo } from '...'`.

---

## Components (Astro / React / UI)

- **Destructure props** at the top so it’s clear what the component uses.
- **Do not spread custom props**; only spread native HTML/design-system props when intentional.
- Use **PascalCase** for component names.

### TypeScript

- Type **props** as you would for a normal function (explicit prop types); **do not use `React.FC`** (implicit children, no generics, awkward namespace pattern).
- Prefer **Pick** over **Omit** when possible; use **Omit** only when you don’t know exactly which props to pick (e.g. generic “uncontrolled” props). When using Omit, assign to a named type so hover info is clear.
- If a **type name conflicts with a component name**, use a convention like `TType` for the type.
- **Do not use TypeScript enums**; use string union types or const objects with `as const` and derive keys/values as needed.

### Styling

- Always check what CSS library is used in the project and follow the rules of that library.
- For styled/wrapper components with **semantic meaning** (e.g. Header, Form, Footer), give them clear names; if the codebase uses an `SC` suffix for styled components, follow that.
- Prefer **theme/design tokens** and shared components (e.g. Box/Flex with `as` and styling props) over one-off inline styles when it keeps the design system consistent.
- Keep template/markup readable: if styles would be long or noisy inline, extract to a named component or utility.

---

## React-specific (if React is used)

- Use **function declarations** for components (better for hoisting and tooling; important with TanStack Router and circular deps).
- **useEffect**: wrap in a custom hook and add JSDoc so the reason and behavior are clear.
- **useMemo**: use only when there’s a clear performance benefit (e.g. expensive computation, dependency array to avoid loops); document that benefit in a comment.

---

## General

- Keep code **consistent and readable** for other developers.
- Rely on **ESLint and Prettier** (e.g. from [basic-config](https://github.com/ronaldruzicka/basic-config)) and respect their rules.
- When in doubt, prefer **readability and predictability** over brevity.
