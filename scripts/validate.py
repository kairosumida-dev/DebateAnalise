"""Validate source references and classification data before publication."""
import json
from pathlib import Path
from urllib.parse import urlparse
from html.parser import HTMLParser
root = Path(__file__).resolve().parents[1]
data = json.loads((root/'docs/data/claims.json').read_text())
valid = {'verdadeira', 'falsa', 'imprecisa', 'em_revisao', 'sem_comprovacao', 'proposta'}
ids = set()
for c in data['claims']:
    assert c['id'] not in ids, f"Duplicate ID: {c['id']}"
    ids.add(c['id'])
    assert c['candidate'] in ('Lula', 'Flávio Bolsonaro')
    assert c['status'] in valid
    assert c['claim'] and c['evidence'] and c['sources']
    assert all(s in data['sources'] for s in c['sources'])
    assert c['timestamp'] is None, 'Unverified timestamps must not be invented'
    if c['status'] == 'proposta':
        assert c['verification'] == 'Proposta'
    if c['verification'] == 'Primária':
        assert any(data['sources'][s]['type'].startswith(('Fonte primária','Registro primário')) for s in c['sources'])
for s in data['sources'].values():
    assert urlparse(s['url']).scheme == 'https' and urlparse(s['url']).netloc
assert data['gdp']['source'] in data['sources']
assert len({v['year'] for v in data['gdp']['values']}) == len(data['gdp']['values'])
class CheckHTML(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=set(); self.local=[]
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"Duplicate HTML ID: {attrs['id']}"
            self.ids.add(attrs['id'])
        for a in ('src','href'):
            v=attrs.get(a,'')
            if v and not v.startswith(('#','https://','http://','data:')):
                self.local.append(v)
p=CheckHTML();p.feed((root/'docs/index.html').read_text())
for path in p.local: assert (root/'docs'/path).is_file(), f'Missing asset: {path}'
for needed in ('claims','metrics','sources','candidate-chart','theme-chart','gdp-chart','filters'):
    assert needed in p.ids
print(f"Validated {len(ids)} records, {len(data['sources'])} sources and local page assets.")
