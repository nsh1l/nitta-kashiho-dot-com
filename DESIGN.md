# 新田菓子舗 Design System

## Color Palette

This design system defines the core color palette for 新田菓子舗 (Nitta Kashiho), a Japanese confectionery company. All colors are defined using the OKLCH color space for perceptually uniform color relationships.

### 檸檬（れもん / Lemon）

A vibrant, energetic yellow accent color suitable for calls-to-action and highlights.

- `--color-lemon-50`: oklch(98.68% 0.029 102.68)
- `--color-lemon-100`: oklch(97.50% 0.057 102.02)
- `--color-lemon-200`: oklch(95.22% 0.108 103.14)
- `--color-lemon-300`: oklch(93.27% 0.151 103.23)
- `--color-lemon-400`: oklch(91.58% 0.179 102.79)
- `--color-lemon-500`: oklch(89.93% 0.187 101.15)
- `--color-lemon-600`: oklch(76.24% 0.159 101.73)
- `--color-lemon-700`: oklch(61.68% 0.128 102.04)
- `--color-lemon-800`: oklch(46.19% 0.096 102.61)
- `--color-lemon-900`: oklch(29.34% 0.061 102.72)
- `--color-lemon-950`: oklch(23.66% 0.048 102.21)

### 薔薇（ばら / Bara）

A sophisticated, muted rose for secondary elements and romantic accents.

- `--color-bara-50`: oklch(95.53% 0.009 17.31)
- `--color-bara-100`: oklch(91.15% 0.019 13.40)
- `--color-bara-200`: oklch(82.30% 0.037 15.79)
- `--color-bara-300`: oklch(73.27% 0.059 15.87)
- `--color-bara-400`: oklch(64.25% 0.083 16.67)
- `--color-bara-500`: oklch(55.41% 0.106 19.57)
- `--color-bara-600`: oklch(47.31% 0.090 18.24)
- `--color-bara-700`: oklch(38.85% 0.070 18.27)
- `--color-bara-800`: oklch(29.92% 0.049 18.42)
- `--color-bara-900`: oklch(20.22% 0.029 16.11)
- `--color-bara-950`: oklch(17.20% 0.021 14.03)

### 抹茶（まっちゃ / Matcha）

A fresh, natural green inspired by Japanese green tea, suitable for matcha-flavored products and natural themes.

- `--color-matcha-50`: oklch(96.70% 0.008 121.63)
- `--color-matcha-100`: oklch(93.32% 0.016 126.83)
- `--color-matcha-200`: oklch(86.81% 0.034 125.60)
- `--color-matcha-300`: oklch(79.94% 0.051 126.42)
- `--color-matcha-400`: oklch(72.97% 0.068 127.10)
- `--color-matcha-500`: oklch(66.12% 0.088 127.96)
- `--color-matcha-600`: oklch(56.15% 0.071 127.64)
- `--color-matcha-700`: oklch(45.94% 0.057 127.36)
- `--color-matcha-800`: oklch(35.13% 0.042 126.82)
- `--color-matcha-900`: oklch(23.03% 0.022 127.88)
- `--color-matcha-950`: oklch(19.29% 0.017 129.48)

### 蜜柑（みかん / Mikan）

A warm, energetic orange reminiscent of citrus fruits, suitable for highlighting important information.

- `--color-mikan-50`: oklch(96.79% 0.022 67.56)
- `--color-mikan-100`: oklch(93.86% 0.044 68.35)
- `--color-mikan-200`: oklch(87.82% 0.088 66.27)
- `--color-mikan-300`: oklch(82.41% 0.129 64.69)
- `--color-mikan-400`: oklch(77.37% 0.163 60.28)
- `--color-mikan-500`: oklch(73.19% 0.186 52.98)
- `--color-mikan-600`: oklch(62.01% 0.156 53.46)
- `--color-mikan-700`: oklch(50.29% 0.126 54.25)
- `--color-mikan-800`: oklch(38.04% 0.092 56.80)
- `--color-mikan-900`: oklch(24.71% 0.056 63.84)
- `--color-mikan-950`: oklch(20.33% 0.045 67.17)

### 藍（あい / Ai）

A calming, deep indigo inspired by traditional Japanese indigo dye, suitable for backgrounds and elegance.

- `--color-ai-50`: oklch(96.45% 0.008 157.09)
- `--color-ai-100`: oklch(93.08% 0.018 155.80)
- `--color-ai-200`: oklch(86.13% 0.036 156.91)
- `--color-ai-300`: oklch(79.10% 0.055 155.75)
- `--color-ai-400`: oklch(72.12% 0.073 154.98)
- `--color-ai-500`: oklch(64.81% 0.091 153.93)
- `--color-ai-600`: oklch(55.39% 0.077 153.99)
- `--color-ai-700`: oklch(45.19% 0.062 154.04)
- `--color-ai-800`: oklch(34.48% 0.044 154.77)
- `--color-ai-900`: oklch(22.81% 0.025 153.81)
- `--color-ai-950`: oklch(18.89% 0.018 155.12)

## Usage Guidelines

### Color Application

- Use 檸檬 Lemon (`--color-lemon-*`) for primary actions, buttons, and accent elements
- Use 薔薇 Bara (`--color-bara-*`) for secondary backgrounds, cards, and subtle elements
- Use 抹茶 Matcha (`--color-matcha-*`) for nature-related content, success states, and organic themes
- Use 蜜柑 Mikan (`--color-mikan-*`) for warnings, highlights, and energetic accents
- Use 藍 Ai (`--color-ai-*`) for stable backgrounds, navigation, and trust-building elements

### Accessibility

Ensure sufficient contrast ratios when combining colors:

- Text on backgrounds should meet WCAG 2.1 AA standards (minimum 4.5:1 for normal text, 3:1 for large text)
- Test color combinations with accessibility tools before final implementation

### Implementation

Colors are defined as CSS custom properties and can be used directly in stylesheets:

```css
.element {
  background-color: var(--color-matcha-500);
  color: var(--color-ai-900);
}
```

## Design Principles

新田菓子舗's visual identity balances traditional Japanese confectionery aesthetics with modern sensibilities:

- **Warmth**: Using orange and yellow tones to evoke the warmth of freshly baked goods
- **Naturalness**: Incorporating green and indigo tones to reflect natural ingredients
- **Sophistication**: Applying rose tones for premium feeling
- **Clarity**: Ensuring all colors maintain legibility and accessibility
