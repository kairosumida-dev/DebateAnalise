"""Validate source references and classification data before publication."""
import json
from pathlib import Path
from urllib.parse import urlparse
from html.parser import HTMLParser
root = Path(__file__).resolve().parents[1]
data = json.loads((root/'docs/data/claims.json').read_text())
valid = {'verdadeira', 'falsa', 'imprecisa', 'em_revisao', 'sem_comprovacao', 'proposta', 'pendente', 'pergunta', 'opiniao'}
ids = set()
for c in data['claims']:
    assert c['id'] not in ids, f"Duplicate ID: {c['id']}"
    ids.add(c['id'])
    assert c['candidate'] in ('Lula', 'Flávio Bolsonaro')
    assert c['status'] in valid
    assert c['claim'] and c['evidence'] and c['sources']
    assert all(s in data['sources'] for s in c['sources'])
    assert c['paragraphs'] and len(c['paragraphs']) == len(set(c['paragraphs']))
    assert all(isinstance(p,int) and 1 <= p <= data['coverage']['paragraph_count'] for p in c['paragraphs'])
    assert c['block'] in (1,2,3,4)
    assert c['blocks'] == sorted(set(1 if p<=470 else 2 if p<=585 else 3 if p<=659 else 4 for p in c['paragraphs']))
    assert c['block'] == c['blocks'][0]
    assert c['occurrences'] == len(c['paragraphs'])
    assert c['transcript_source'] in data['sources']
    assert urlparse(c['transcript_url']).scheme == 'https'
    assert c['timestamp'] is None, 'Unverified timestamps must not be invented'
    if c['status'] == 'proposta':
        assert c['verification'] == 'Proposta'
    if c['verification'] == 'Primária':
        assert any(data['sources'][s]['type'].startswith(('Fonte primária','Registro primário')) for s in c['sources'])
coverage = json.loads((root/'docs/data/coverage.json').read_text())
assert data['coverage']['reviewed_to_end'] is True
assert data['coverage']['video_verified'] is False
assert len(coverage) == data['coverage']['paragraph_count']
assert [r['paragraph'] for r in coverage] == list(range(1,len(coverage)+1))
claims = {c['id']:c for c in data['claims']}
for r in coverage:
    assert r['disposition'] in ('mapeado','marcador','mediacao','saudacao','interacao')
    assert r['reason']
    assert len(r['claim_ids']) == len(set(r['claim_ids']))
    assert bool(r['claim_ids']) == (r['disposition']=='mapeado')
    for ident in r['claim_ids']:
        assert ident in claims, f'Unknown coverage claim: {ident}'
        assert r['paragraph'] in claims[ident]['paragraphs'], f'Coverage mismatch: {ident}'
for c in data['claims']:
    for paragraph in c['paragraphs']:
        assert c['id'] in coverage[paragraph-1]['claim_ids'], f'Missing coverage link: {c["id"]}, {paragraph}'
from collections import Counter
assert dict(Counter(r['disposition'] for r in coverage)) == data['coverage']['dispositions']
for s in data['sources'].values():
    assert urlparse(s['url']).scheme == 'https' and urlparse(s['url']).netloc
assert data['fiscal']['source'] in data['sources']
assert [v['year'] for v in data['fiscal']['values']] == list(range(2003,2011))
assert all(v['primary'] > 0 and v['nominal'] < 0 for v in data['fiscal']['values'])
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
for needed in ('claims','metrics','sources','candidate-chart','theme-chart','gdp-chart','filters','progress-chart','coverage-summary','block','verification'):
    assert needed in p.ids
print(f"Validated {len(ids)} records, {len(data['sources'])} sources and local page assets.")

audit = json.loads((root/'docs/data/review-log.json').read_text())
round_ = data['review_summary']['latest_round']
assert len(audit['records']) == 44
assert {r['id'] for r in audit['records']} == set(round_['reviewed_ids'])
assert len(set(round_['reviewed_ids'])) == 44
for r in audit['records']:
    c = claims[r['id']]
    assert r['status'] == c['status'] and r['sources'] == c['sources']
    assert r['limitation'] and c['review']['date'] == audit['date']
    assert (r['id'] in round_['new_factual_conclusions']) == (c['status'] in {'verdadeira','falsa','imprecisa'})
assert set(round_['new_factual_conclusions']).isdisjoint(round_['still_under_review'])
assert set(round_['new_factual_conclusions'] + round_['still_under_review']) == set(round_['reviewed_ids'])
print('Validated dated audit of all 44 previously unresolved records.')
