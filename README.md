# Debate em evidência

Página aberta de análise das falas de Lula e Flávio Bolsonaro no debate da Band de **18 de outubro de 2026**.

**[Abrir a página](https://kairosumida-dev.github.io/DebateAnalise/)** · [Base de dados](docs/data/claims.json) · [Método editorial](METODOLOGIA.md)

## O que está disponível

- Busca e filtros por candidato, classificação, tema, bloco e nível de conferência.
- Análise individual com evidência, ressalvas e links para fontes.
- Cinco gráficos: andamento das checagens, categorias por candidato, temas, crescimento do PIB e resultados fiscais de 2003–2010.
- Exportação da seleção em CSV, além da base completa em JSON.
- Layout adaptado a celular e navegação por teclado.

## Alcance desta edição

**Inventário ampliado: 199 registros após leitura de todos os 687 parágrafos da transcrição publicada.** Os parágrafos também incluem rótulos de falantes e mediação; não são 687 afirmações. Repetições são agrupadas, e propostas, perguntas e opiniões ficam fora dos vereditos de verdade.

O [mapa de cobertura](docs/data/coverage.json) liga cada parágrafo às fichas ou registra o motivo de exclusão. As fichas trazem fontes, ressalvas e localização. Não republicamos a transcrição integral.

**A checagem documental permanece em andamento e o vídeo ainda não foi auditado.** Fichas abertas identificam o que falta; nenhuma pendência vira automaticamente falsa. Não há tempos de vídeo inventados nem placar geral de honestidade. A base não se atualiza automaticamente.

As falas são paráfrases. Há distinção entre consulta primária e conclusão baseada em reportagem. Divergências ficam visíveis, inclusive quando uma checagem publicada não é suficiente para concluir. O [método](METODOLOGIA.md) explica as categorias e os limites.

Na última rodada, todas as **44 pendências** foram revistas: **10 novas conclusões**, totalizando **126 conclusões factuais, 34 sem conclusão definitiva e 39 registros não factuais**. O [registro da rodada](docs/data/review-log.json) preserva a classificação anterior, as fontes e os limites de cada ficha. Isso não encerra a auditoria audiovisual nem supre documentos indisponíveis.

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
