# CLAUDE.md

This project uses Bun as a package manager and build tool. Eleventy handles the static site generation.

## Build Commands

```bash
bun install              # Install dependencies
bun run deploy           # Build CSS + generate site
bun run serve            # Start dev server with live reload
bunx prettier --write .  # Format all files
```

## Key Tools

- **Bun**: Package manager and runtime
- **Eleventy (11ty)**: Static site generator
- **Tailwind CSS v4**: Styling (via `@tailwindcss/postcss`)
- **Prettier**: Code formatting with Liquid/Jinja plugins

## Development Workflow

1. Edit templates in `src/` (`.liquid`, `.njk`, `.md`)
2. Edit data in `src/_data/` (`.yaml`)
3. Run `bun run serve` for live preview
4. Run `bun run deploy` before committing

## Tailwind CSS

Tailwind v4 is configured via PostCSS in `postcss.config.mjs`. Custom colors from `DESIGN.md` are available as CSS variables.

## Static Assets

Place images in `src/assets/img/`. Eleventy copies the entire `src/assets/` directory to `_site/`.
