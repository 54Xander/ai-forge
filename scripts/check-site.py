#!/usr/bin/env python3
"""Check the static site's entry point, pages, links, and project-path portability."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = []
        self.references = []
        self.h1_count = 0
        self.has_title = False
        self.has_viewport = False
        self.language = None
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "html":
            self.language = attrs.get("lang")
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.has_title = True
        if tag == "meta" and attrs.get("name") == "viewport":
            self.has_viewport = True
        for key in ("src", "href"):
            if attrs.get(key):
                self.references.append(attrs[key])


def main():
    errors = []
    if not (ROOT / "index.html").is_file():
        errors.append("Missing GitHub Pages entry point: index.html")
    if not (ROOT / ".nojekyll").is_file():
        errors.append("Missing .nojekyll for static publishing")
    pages = {path.resolve(): Page(path) for path in ROOT.glob("*.html")}
    for path, page in pages.items():
        prefix = path.name + ": "
        duplicates = [item for item, count in Counter(page.ids).items() if count > 1]
        if duplicates:
            errors.append(prefix + "duplicate IDs: " + ", ".join(duplicates))
        if page.h1_count != 1 or not page.has_title or not page.has_viewport or page.language != "en":
            errors.append(prefix + "requires one h1, title, viewport, and English language metadata")
        for reference in page.references:
            parsed = urlsplit(reference)
            if parsed.scheme or parsed.netloc:
                continue
            if parsed.path.startswith("/"):
                errors.append(prefix + "root-relative URL breaks repository subpaths: " + reference)
                continue
            target = (path.parent / unquote(parsed.path)).resolve() if parsed.path else path
            if not target.is_relative_to(ROOT):
                errors.append(prefix + "local URL escapes site directory: " + reference)
            elif not target.is_file():
                errors.append(prefix + "missing local resource: " + reference)
            elif parsed.fragment and target in pages and unquote(parsed.fragment) not in pages[target].ids:
                errors.append(prefix + "missing anchor: " + reference)
    if errors:
        raise SystemExit("\n".join(errors))
    references = sum(len(page.references) for page in pages.values())
    print(f"PASS: {len(pages)} pages, {references} resource/link references, metadata, anchors, and GitHub Pages entry files.")


if __name__ == "__main__":
    main()
