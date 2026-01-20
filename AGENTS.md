# AGENTS.md

This document provides guidelines for AI agents working in this repository.

## Project Overview

This is an Eleventy (11ty) static site generator project for "新田菓子舗" (Nitta Kashiho), a Japanese confectionery company. The site showcases products using YAML data files, Liquid templates, Tailwind CSS, and Alpine.js.

**Important**: This project uses Bun as a package manager and runtime, not as a server. Do not follow generic Bun server templates from CLAUDE.md.

## Build Commands

```bash
bun install                          # Install dependencies
bun run build:css                    # Build CSS only
bun run build:prod                   # Build for production (CSS + Eleventy)
bun run start                        # Start dev server with live reload
bun test                             # Run tests (if configured)
bun test <file-name>.test.ts         # Run a single test file
bunx prettier --write .              # Format all files
```

## Code Style

### General

- Prefer simplicity over cleverness; use early returns to reduce nesting
- Keep functions focused and small; avoid magic numbers

### Formatting

- Use Prettier for all code formatting (configured with Tailwind, Liquid, Jinja plugins)
- Run `bunx prettier --write .` to format the entire project

### TypeScript

- Strict mode enabled with `noUncheckedIndexedAccess`
- Avoid `any`; use `unknown` or specific types
- Use interfaces for object shapes, types for unions/primitives

### Naming Conventions

- **Files**: kebab-case (`my-component.ts`, `product-data.yaml`)
- **Variables/Functions**: camelCase (`getProducts()`, `productList`)
- **Constants**: SCREAMING_SNAKE_CASE for values, camelCase for objects
- **Template Variables**: camelCase (matches YAML structure)

### Imports

- Use ES module syntax (`import { foo } from './bar'`)
- Sort imports alphabetically within groups; use relative imports for local modules

### Tailwind CSS

- Use utilities directly in templates; no custom CSS unless necessary
- Mobile-first: base styles, then `md:`/`lg:` prefixes (e.g., `w-full md:w-1/2`)
- Group classes: layout → spacing → typography → effects

### YAML Data Files (`src/_data/`)

- Root-level keys map to template variables (`products.product` → `products.product`)
- Use `>` for multi-line strings without trailing newline; prefer descriptive keys over comments

### Liquid Templates (.liquid, .njk)

- Use `{{ variable | filter }}` for output, `{% tag %}` for control flow
- Use `{{ content | safe }}` for unescaped content
- Include partials: `{% include 'partial.njk' %}` or `{% include 'partial.njk' with data %}`

### Alpine.js

- Prefix data objects with `x-data`; use `x-bind:` (or `:`) and `x-on:` (or `@`)
- Image error handling: `x-data="image"` on img tags with `x-bind:onerror="handleError"`
- See `src/assets/js/img-onerror.mjs` for the error handling pattern

### Error Handling

- Validate YAML data at build time when possible
- Use Eleventy passthrough copies for static assets
- Handle missing images with Alpine.js fallback (404.jpg)
- No runtime error handling needed (static site)

## Project Structure

```plain
src/
├── _data/          # YAML data files (products.yaml, info.yaml)
├── _includes/      # Layouts and partials (base.njk, footer.html)
├── assets/
│   ├── css/        # Compiled Tailwind CSS
│   ├── img/        # Product images
│   └── js/         # JavaScript modules (Alpine components)
├── global.css      # Tailwind imports only
└── *.liquid        # Page templates

_site/              # Generated static site output
assets/             # Copied to _site/ as passthrough
eleventy.config.mjs # Eleventy configuration
postcss.config.mjs  # Tailwind PostCSS config
tsconfig.json       # TypeScript configuration
.prettierrc         # Prettier configuration
```

## Configuration Files

- `eleventy.config.mjs`: Input/output dirs, passthrough copies, YAML parsing
- `postcss.config.mjs`: Tailwind PostCSS plugin
- `.prettierrc`: Prettier with Tailwind, Liquid, Jinja plugins
- `tsconfig.json`: Strict TypeScript with DOM/ESNext

## Testing

No tests currently configured. If adding tests:

- Use `bun test` for Bun's built-in test runner
- Place tests alongside source files with `.test.ts` extension
- Use `bun test <file-name>.test.ts` to run a single test file
- Mock Eleventy/11ty APIs when testing transforms or filters

## Common Tasks

### Add a new product

1. Edit `src/_data/products.yaml`, add entry to `product` array
2. Add image to `src/assets/img/sweets/[product-id]/`
3. Commit YAML and images together

### Add a new page

1. Create `src/pagename.liquid` with frontmatter
2. Set `layout: base` and page title
3. Use existing patterns for sections/components

### Modify layout

1. Edit `src/_includes/base.njk` for HTML structure
2. Edit `src/_includes/footer.html` for footer content
3. Styles are in `src/global.css` (Tailwind imports only)

### Update styles

1. Use Tailwind utilities directly in templates
2. If custom CSS needed, add `@layer components { .btn { ... } }` to `global.css`
3. Run `bun run build:css` to recompile
