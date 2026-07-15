#!/usr/bin/env python3
"""Verify generated local asset references and the intentionally public images."""

from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parent.parent
SITE_DIR = ROOT / "_site"
PUBLIC_IMAGES = {
    "fathers-sunflower.webp",
    "logo.svg",
    "souffle.jpg",
    "ushi_cyan.jpg",
}
ROOT_REFERENCE = re.compile(r"['\"](/(?:assets|img)/[^'\"\s)]+)")


class AssetReferenceParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.references = set()

    def handle_starttag(self, _tag, attrs):
        for name, value in attrs:
            if not value:
                continue
            if name == "srcset":
                self.references.update(part.split()[0] for part in value.split(","))
            elif name in {"src", "href", "data-fallback"}:
                self.references.add(value)


def local_path(reference):
    path = unquote(urlsplit(reference).path)
    if not path.startswith("/"):
        return None
    if not (path.startswith("/assets/") or path.startswith("/img/")):
        suffix = Path(path).suffix.lower()
        if suffix not in {".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"}:
            return None
    return SITE_DIR / path.lstrip("/")


def main():
    parser = AssetReferenceParser()
    for html_path in sorted(SITE_DIR.rglob("*.html")):
        parser.feed(html_path.read_text(encoding="utf-8"))

    for pattern in ("*.css", "*.js", "*.svg"):
        for asset_path in sorted(SITE_DIR.rglob(pattern)):
            parser.references.update(
                ROOT_REFERENCE.findall(asset_path.read_text(encoding="utf-8"))
            )

    missing = sorted(
        reference
        for reference in parser.references
        if (path := local_path(reference)) is not None and not path.is_file()
    )
    if missing:
        raise SystemExit("Missing generated asset references:\n" + "\n".join(missing))

    public_images = {
        path.relative_to(SITE_DIR / "assets" / "img").as_posix()
        for path in (SITE_DIR / "assets" / "img").rglob("*")
        if path.is_file()
    }
    if public_images != PUBLIC_IMAGES:
        raise SystemExit(
            f"Unexpected fixed-path public images: {sorted(public_images)}"
        )

    font_paths = sorted((SITE_DIR / "assets" / "fonts").glob("*.woff2"))
    if len(font_paths) != 3:
        raise SystemExit(f"Expected 3 WOFF2 fonts, found {len(font_paths)}")
    for font_path in font_paths:
        TTFont(font_path).close()

    if list(SITE_DIR.rglob("*.ttf")):
        raise SystemExit("Full TTF fonts must not be emitted")

    print(
        f"Verified {len(parser.references)} local references, "
        f"{len(public_images)} fixed-path images, and {len(font_paths)} WOFF2 fonts"
    )


if __name__ == "__main__":
    main()
