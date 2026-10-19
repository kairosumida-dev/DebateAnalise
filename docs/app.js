'use strict';
const STATUS = {
  verdadeira: {label:'Verdadeira', plural:'Verdadeiras', color:'#287b59'},
  falsa: {label:'Falsa', plural:'Falsas', color:'#b34a47'},
  imprecisa: {label:'Imprecisa', plural:'Imprecisas', color:'#b37a24'},
  em_revisao: {label:'Em revisão', plural:'Em revisão', color:'#6972a6'},
  sem_comprovacao: {label:'Sem comprovação', plural:'Sem comprovação', color:'#777f86'},
  proposta: {label:'Proposta', plural:'Propostas', color:'#8b9a72'}
};
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let data, selection = [];
function sourceLink(key) {
  const s = data.sources[key];
  return `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><span class="source-type">${esc(s.type)}</span>`;
}
function card(c) {
  const s = STATUS[c.status];
  return `<article class="claim" id="${esc(c.id)}"><div class="claim-top"><span class="candidate-chip">${esc(c.candidate)} <a class="claim-id" href="#${esc(c.id)}" aria-label="Link para registro ${esc(c.id)}">${esc(c.id)}</a></span><span class="badge" style="--badge:${s.color}">${s.label}</span></div><p class="theme">${esc(c.theme)}</p><h3>${esc(c.claim)}</h3><span class="evidence-label">O QUE A EVIDÊNCIA MOSTRA</span><p>${esc(c.evidence)}</p><details><summary>Análise e fontes</summary>${c.note ? `<p class="note">${esc(c.note)}</p>` : ''}${c.sources.map(sourceLink).join('')}<p class="verification">Conferência: ${esc(c.verification)} · Consulta: 19/10/2026<br>Paráfrase reportada · Tempo do vídeo ainda não conferido</p></details></article>`;
}
function metrics() {
  const resolved = data.claims.filter(c => ['verdadeira','falsa','imprecisa'].includes(c.status)).length;
  const pending = data.claims.filter(c => ['em_revisao','sem_comprovacao'].includes(c.status)).length;
  const proposals = data.claims.filter(c => c.status === 'proposta').length;
  $('metrics').innerHTML = [[data.claims.length,'Registros nesta edição','Falas agrupadas por assunto'],[resolved,'Com classificação','Verdadeiras, falsas ou imprecisas'],[pending,'Com pendências','Revisão ou sem comprovação'],[proposals,'Propostas registradas','Sem pontuação de veracidade']].map(([n,label,note]) => `<div class="metric"><span class="metric-label">${label}</span><strong>${n}</strong><span>${note}</span></div>`).join('');
}
function charts() {
  const candidates = ['Lula','Flávio Bolsonaro'];
  const max = Math.max(...candidates.map(n => data.claims.filter(c => c.candidate===n).length));
  $('candidate-chart').innerHTML = candidates.map(n => {
    const claims = data.claims.filter(c => c.candidate===n);
    const counts = Object.keys(STATUS).map(k => ({...STATUS[k], count:claims.filter(c => c.status===k).length}));
    const description = counts.map(s => `${s.plural}: ${s.count}`).join('; ');
    return `<div class="candidate-row"><div class="candidate-label"><strong>${n}</strong><span>${claims.length} registros</span></div><div class="stack" role="img" aria-label="${esc(n+': '+description)}">${counts.filter(s=>s.count).map(s=>`<span class="segment" style="width:${100*s.count/max}%;background:${s.color}" title="${s.plural}: ${s.count}">${s.count}</span>`).join('')}</div><p class="small" style="margin:6px 0 0">${counts.filter(s=>s.count).map(s=>`${s.count} ${(s.count===1?s.label:s.plural).toLowerCase()}`).join(' · ')}</p></div>`;
  }).join('');
  $('legend').innerHTML = Object.values(STATUS).map(s=>`<span><i style="background:${s.color}"></i>${s.plural}</span>`).join('');
  const themes = [...new Set(data.claims.map(c=>c.theme))].map(t => [t, data.claims.filter(c=>c.theme===t).length]).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'pt-BR'));
  const top = Math.max(...themes.map(t=>t[1]));
  $('theme-chart').innerHTML = themes.map(([t,n])=>`<div class="theme-row"><span>${esc(t)}</span><div class="theme-track" aria-hidden="true"><div class="theme-fill" style="width:${n/top*100}%"></div></div><strong>${n}</strong></div>`).join('');
  const values = data.gdp.values;
  const y = v => 160 - v*15;
  const ticks = [-3,0,3,6,9];
  const fmt = n => n.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1});
  const svg = `<svg viewBox="0 0 900 245" role="img" aria-labelledby="gdp-title gdp-desc"><title id="gdp-title">Variação anual real do PIB em anos selecionados</title><desc id="gdp-desc">${values.map(v=>`${v.year}: ${fmt(v.value)}%`).join('; ')}. Os anos não são contínuos.</desc>${ticks.map(t=>`<line x1="50" x2="880" y1="${y(t)}" y2="${y(t)}" stroke="${t===0?'#95a498':'#e9ede6'}" ${t===3?'stroke-dasharray="4 4"':''}/><text x="35" y="${y(t)+4}" text-anchor="end" font-size="11" fill="#65716b">${t}%</text>`).join('')}${values.map((v,i)=>{const x=110+i*140;const negative=v.value<0;return `<rect x="${x-25}" y="${negative?y(0):y(v.value)}" width="50" height="${Math.abs(v.value)*15}" rx="3" fill="${negative?'#bb6962':'#679078'}"/><text x="${x}" y="${negative?y(v.value)+17:y(v.value)-9}" text-anchor="middle" font-size="13" font-weight="600" fill="#182823">${fmt(v.value)}%</text><text x="${x}" y="237" text-anchor="middle" font-size="12" fill="#65716b">${v.year}</text>`}).join('')}</svg>`;
  $('gdp-chart').innerHTML = svg + '<div class="gdp-values">' + values.map(v=>`<span>${v.year}: <strong>${fmt(v.value)}%</strong></span>`).join('') + '</div>';
  $('gdp-source').href=data.sources[data.gdp.source].url;
}
function populateFilters() {
  Object.entries(STATUS).forEach(([value,s]) => $('status').add(new Option(s.label,value)));
  [...new Set(data.claims.map(c=>c.theme))].sort((a,b)=>a.localeCompare(b,'pt-BR')).forEach(t=>$('theme').add(new Option(t,t)));
}
function filter() {
  const q=normalize($('search').value.trim());
  selection=data.claims.filter(c=>(!$('candidate').value||c.candidate===$('candidate').value)&&(!$('status').value||c.status===$('status').value)&&(!$('theme').value||c.theme===$('theme').value)&&(!q||normalize([c.id,c.claim,c.evidence,c.note,c.theme,c.candidate,...c.sources.map(k=>data.sources[k].title)].join(' ')).includes(q)));
  $('claims').innerHTML=selection.length?selection.map(card).join(''):'<p class="empty">Nenhum registro encontrado. Tente outro termo ou limpe os filtros.</p>';
  $('result-count').textContent=`${selection.length} de ${data.claims.length} registros`;
}
function exportCsv() {
  const cell = value => { let s=String(value??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'; };
  const rows = [['ID','Candidato','Tema','Classificação','Fala (paráfrase)','Evidência','Ressalva','Conferência','Fontes','Data da consulta'], ...selection.map(c=>[c.id,c.candidate,c.theme,STATUS[c.status].label,c.claim,c.evidence,c.note,c.verification,c.sources.map(k=>data.sources[k].url).join(' | '),c.checked_at])];
  const url=URL.createObjectURL(new Blob(['\ufeff'+rows.map(r=>r.map(cell).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8;'}));
  const a=document.createElement('a');a.href=url;a.download='debate-band-2026-selecao.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function init() {
  try {
    const response=await fetch('data/claims.json');if(!response.ok)throw new Error('Falha na leitura da base');data=await response.json();
    metrics();charts();populateFilters();filter();
    $('sources').innerHTML=Object.values(data.sources).map(s=>`<article class="source"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><p>${esc(s.type)} · acesso em 19/10/2026</p></article>`).join('');
    $('filters').addEventListener('input',filter);$('filters').addEventListener('change',filter);$('filters').addEventListener('submit',e=>e.preventDefault());$('filters').addEventListener('reset',()=>setTimeout(filter,0));$('export-csv').addEventListener('click',exportCsv);
    if(location.hash){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target?.classList.contains('claim')){target.querySelector('details').open=true;target.scrollIntoView();}}
  } catch(error) {
    $('claims').innerHTML='<p class="empty">Não foi possível carregar a base. Recarregue a página ou <a href="data/claims.json">abra os dados diretamente</a>.</p>';
    $('export-csv').disabled=true;console.error(error);
  }
}
init();
