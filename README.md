# Debate em evidência

Página aberta de análise das principais afirmações de Lula e Flávio Bolsonaro no debate da Band de **18 de outubro de 2026**.

**[Abrir a página](https://kairosumida-dev.github.io/DebateAnalise/)** · [Base de dados](docs/data/claims.json) · [Método editorial](METODOLOGIA.md)

## O que está disponível

- Busca e filtros por candidato, classificação e tema.
- Análise individual com evidência, ressalvas e links para fontes.
- Gráficos de classificações por candidato, distribuição de temas e crescimento do PIB.
- Exportação da seleção em CSV, além da base completa em JSON.
- Layout adaptado a celular e navegação por teclado.

## Alcance desta edição

**Levantamento parcial, em revisão.** A base usa falas reportadas em cobertura jornalística e checagens publicadas, além de documentos primários identificados. Não houve auditoria minuto a minuto da íntegra; tempos de vídeo não foram inventados. Não afirma cobrir todas as falas importantes. Não é uma amostra estatística e não permite concluir a taxa de veracidade de cada candidato no debate completo.

As falas são paráfrases, não citações literais. Há distinção entre conferência primária e reprodução de conclusão jornalística. Divergências ficam em revisão; acusações sem evidência suficiente não se tornam fatos nem são automaticamente falsas. Propostas não recebem pontuação de veracidade.

## Executar localmente

Sem instalação de pacotes:

```sh
python3 -m http.server 8000 --directory docs
```

Abra `http://localhost:8000`. A leitura da base usa `fetch`; abrir o HTML diretamente como arquivo não é suficiente.

```sh
python3 scripts/validate.py
```

## Publicação

O fluxo em `.github/workflows/pages.yml` valida os dados e publica `docs/` no GitHub Pages ao atualizar `main`. A configuração de Pages deve usar **GitHub Actions**. Não há servidor, banco de dados, rastreamento ou dependência de bibliotecas externas no navegador.

## Atualização e correção

Edite `docs/data/claims.json` preservando IDs. Anexe fontes que sustentem o núcleo da conclusão, registre a data da consulta e a distinção entre fonte primária e checagem secundária. Mudanças de classificação devem ser explicadas em `CHANGELOG.md`. O site não se atualiza automaticamente com novas notícias.

Conteúdo de fontes externas mantém os direitos dos respectivos autores; este projeto publica sínteses curtas e links. Sem vínculo com as emissoras ou organizações citadas.
