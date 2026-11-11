"""Focused static-site checks. Standard library only; no build/runtime dependency."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids, self.anchors = [], set(), []
        self.headings, self.titles, self.main, self.meta = 0, 0, 0, False
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'): self.ids.add(attrs['id'])
        self.headings += tag == 'h1'
        self.titles += tag == 'title'
        self.main += tag == 'main'
        self.meta |= tag == 'meta' and attrs.get('name') == 'description'
        for attr in ('src', 'href'):
            if attrs.get(attr): self.links.append(attrs[attr])
        if tag == 'img':
            assert 'alt' in attrs, 'Missing image alt (empty is allowed for decorative images)'
            assert attrs.get('width') and attrs.get('height'), 'Missing image dimensions'

pages = {}
for file in ROOT.glob('*.html'):
    page = Page(); page.feed(file.read_text()); pages[file.name] = page
    assert page.headings == page.titles == page.main == 1, f'{file.name}: expected one title, h1 and main'
    assert page.meta, f'{file.name}: missing description'
    assert '\u2014' not in file.read_text(), 'Avoid long dash UI wording'
for name, page in pages.items():
    for link in page.links:
        parsed = urlsplit(link)
        if parsed.scheme or parsed.netloc: continue
        target = unquote(parsed.path) or name
        assert (ROOT / target).is_file(), f'{name}: broken relative link {link}'
        if parsed.fragment and target in pages:
            assert parsed.fragment in pages[target].ids, f'{name}: missing anchor {link}'
print(f'PASS: {len(pages)} static pages; headings, metadata, image accessibility, local assets, links and anchors.')

class ContactForm(HTMLParser):
    def __init__(self):
        super().__init__()
        self.form = None
        self.fields = {}
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'form': self.form = attrs
        if tag in ('input', 'textarea', 'select') and attrs.get('name'):
            self.fields[attrs['name']] = attrs
contact = ContactForm()
contact.feed((ROOT / 'contact.html').read_text())
assert contact.form['method'].upper() == 'POST'
assert contact.form['action'] == 'https://formsubmit.co/Hatsaweb@gmail.com'
for name in ('name', 'email', 'service', 'message', 'consent'):
    assert 'required' in contact.fields[name], f'Missing required {name}'
assert contact.fields['email']['type'] == 'email'
assert '_honey' in contact.fields
assert contact.fields.get('_captcha', {}).get('value') != 'false'
assert 'form-action https://formsubmit.co;' in (ROOT / '_headers').read_text()
assert not (ROOT / 'site-config.js').exists()
print('PASS: native provider contact contract, required fields/consent, spam controls and CSP.')
