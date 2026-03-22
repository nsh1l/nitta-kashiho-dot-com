# 新田菓子舗 (Nitta Kashiho)

[![Build and Deploy](https://github.com/nsh1l/nitta-kashiho-dot-com/actions/workflows/deploy.yaml/badge.svg)](https://github.com/nsh1l/nitta-kashiho-dot-com/actions)

[https://nitta-kashiho.com](https://nitta-kashiho.com/)

## Tech Stack

| Category | Technology                                                                                    |
| -------- | --------------------------------------------------------------------------------------------- |
| SSG      | [Eleventy](https://www.11ty.dev/) v3                                                          |
| CSS      | [Tailwind CSS](https://tailwindcss.com/) v4                                                   |
| JS       | [Alpine.js](https://alpinejs.dev/)                                                            |
| Template | [Liquid](https://shopify.github.io/liquid/) + [Nunjucks](https://mozilla.github.io/nunjucks/) |
| Runtime  | [Bun](https://bun.sh/)                                                                        |

## Getting Started

```bash
# Install dependencies
bun i

# Start development server (CSS watch + Eleventy serve)
bun run serve

# Build for production
bun run deploy
```

> [!NOTE]
> For Bun-specific commands, see [AGENTS.md](./AGENTS.md).

## Project Structure

```plain
src/
├── _data/           # YAML data files (products, company info)
├── _includes/       # Layouts and partials
├── assets/
│   ├── css/         # Compiled Tailwind CSS
│   ├── img/         # Product images
│   └── js/          # Alpine.js components
├── index.liquid     # Homepage
├── about.md         # About page
└── legal.md         # Legal page

_site/               # Generated static output
```

## Color Palette

- **檸檬 (Lemon)** - CTAやアクセント
- **薔薇 (Bara)** - セカンダリー要素
- **抹茶 (Matcha)** - 自然・有機的なテーマ
- **蜜柑 (Mikan)** - 警告・ハイライト
- **藍 (Ai)** - 背景・ナビゲーション

詳細は [DESIGN.md](./DESIGN.md) をご覧ください。

## Deployment

Push to `main` triggers automatic build and deploy to [dev.nitta-kashiho.com](https://dev.nitta-kashiho.com).

## License

有限会社新田菓子舗 All rights reserved.
