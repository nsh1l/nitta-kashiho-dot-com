#!/usr/bin/env python3
"""Build deterministic WOFF2 subsets from generated pages and logo SVG text."""

from html.parser import HTMLParser
from pathlib import Path
import xml.etree.ElementTree as ElementTree

from fontTools import subset
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parent.parent
SITE_DIR = ROOT / "_site"
FONT_DIR = ROOT / "src" / "assets" / "fonts"
OUTPUT_DIR = SITE_DIR / "assets" / "fonts"
SVG_DIR = ROOT / "src" / "assets" / "img"
COMMON_TEXT = "".join(chr(codepoint) for codepoint in range(0x20, 0x100))


class RenderedTextParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []

    def handle_data(self, data):
        self.parts.append(data)

    def handle_starttag(self, _tag, attrs):
        # Alpine renders strings held in attributes (for example, x-text).
        self.parts.extend(value for _name, value in attrs if value)


def read_site_text():
    parser = RenderedTextParser()
    for html_path in sorted(SITE_DIR.rglob("*.html")):
        parser.feed(html_path.read_text(encoding="utf-8"))
    return COMMON_TEXT + "".join(parser.parts)


def read_svg_text():
    parts = []
    for svg_path in sorted(SVG_DIR.rglob("*.svg")):
        root = ElementTree.parse(svg_path).getroot()
        parts.extend(root.itertext())
    return COMMON_TEXT + "".join(parts)


def build_subset(source_name, output_name, text):
    source_path = FONT_DIR / source_name
    output_path = OUTPUT_DIR / output_name
    source_font = TTFont(source_path)
    source_font.recalcTimestamp = False
    supported_codepoints = set(source_font.getBestCmap())

    options = subset.Options()
    options.flavor = "woff2"
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(source_font)
    source_font.save(output_path)

    output_font = TTFont(output_path)
    output_codepoints = set(output_font.getBestCmap())
    required_codepoints = {ord(character) for character in text} & supported_codepoints
    missing = required_codepoints - output_codepoints
    if missing:
        raise RuntimeError(f"{output_name} is missing {len(missing)} required glyphs")

    return len(required_codepoints)


def main():
    if not SITE_DIR.is_dir():
        raise SystemExit("_site does not exist; run the site build first")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    site_text = read_site_text()
    svg_text = read_svg_text()
    fonts = (
        ("line-seed-jp-400.ttf", "line-seed-jp-400.woff2", site_text),
        ("zen-maru-gothic-500.ttf", "zen-maru-gothic-500.woff2", svg_text),
        ("zen-maru-gothic-700.ttf", "zen-maru-gothic-700.woff2", svg_text),
    )

    for source_name, output_name, text in fonts:
        glyph_count = build_subset(source_name, output_name, text)
        size = (OUTPUT_DIR / output_name).stat().st_size
        print(f"Built {output_name}: {glyph_count} codepoints, {size} bytes")


if __name__ == "__main__":
    main()
