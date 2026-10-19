# Método e limitações

Referência: 19/10/2026. Debate da Band: 18/10/2026, Lula e Flávio Bolsonaro.

## Alcance

O inventário percorre sequencialmente os **687 parágrafos da transcrição publicada pelo Aos Fatos**. São **199 registros agrupados**, incluindo afirmações factuais, propostas, perguntas e opiniões. Um parágrafo pode conter vários núcleos e uma afirmação pode reaparecer em vários parágrafos. Rótulos de falantes e intervenções da mediação também integram os 687; esse número não é uma contagem de afirmações.

`docs/data/coverage.json` informa a destinação de cada parágrafo e os IDs correspondentes, sem reproduzir o texto integral. A numeração local começa em 1 e pode mudar se a fonte editar a transcrição. O resumo da base contém o hash do material consultado. A leitura foi até o fim, mas **não houve auditoria audiovisual**: a gravação pode revelar omissões, nomes incorretos ou diferenças de contexto. `timestamp` permanece `null`.

As fichas são paráfrases e mantêm bloco, parágrafos, evidência, ressalvas, fontes e nível de conferência. A ordem segue a primeira ocorrência. Repetições do mesmo núcleo são agrupadas. Perguntas retóricas que contêm acusações factuais podem gerar uma ficha factual; perguntas sem afirmação independente ficam separadas. Juízos de valor são agrupados como opinião, sem pretender enumerar cada expressão retórica.

O parágrafo 682 da transcrição traz rótulo de jornalista, mas contém as considerações finais de Flávio; essa atribuição foi corrigida editorialmente e documentada. O nome Marcola, em F67, refere-se a Marco Aurélio Santana Ribeiro, não ao dirigente do PCC.

**Inventário concluído não significa checagem documental concluída.** As categorias e os documentos faltantes tornam essa distinção explícita. A página não se atualiza automaticamente.

## Classificações

| Categoria | Critério |
|---|---|
| Verdadeira | Núcleo factual sustentado pela evidência citada, no escopo delimitado. |
| Falsa | Núcleo factual contradito pela evidência citada. |
| Imprecisa | Número, período, alcance ou contexto comprometem a interpretação, apesar de haver base real. |
| Em revisão | Parte foi conferida, mas há divergência, ambiguidade ou reconciliação de dados pendente. |
| Apuração aberta | Fala localizada; faltam documentos identificados para concluir. Não é um veredito de ausência de prova ou falsidade. |
| Sem comprovação | A evidência obtida não sustenta a afirmação ou acusação. Não equivale a falsa nem prova inocência. |
| Proposta | Compromisso futuro; sem pontuação de verdade. Sistemas já existentes podem ser citados como contexto. |
| Pergunta | Interrogação sem afirmação factual autônoma; sem pontuação de verdade. |
| Opinião | Juízo de valor ou retórica; sem pontuação de verdade. |

Uma classificação falsa não demonstra intenção deliberada de mentir. Investigar, indiciar, condenar e condenar definitivamente são situações diferentes. O voto individual secreto não é dedutível de resultados por seção. Anúncio, valor elegível, financiamento disponível e execução financeira também não são equivalentes.

## Fontes e independência

- **Primária:** documento, registro ou dado consultado diretamente. Não significa conferência direta da fala no vídeo.
- **Secundária:** conclusão apoiada em reportagem, estudo ou checagem identificada; o documento original pode não ter sido auditado pelo projeto.
- **Apuração aberta / Pendente:** falta evidência para concluir. Uma referência de transcrição apenas localiza a fala.
- **Divergência entre fontes:** preserva a discordância e explica o que precisa ser reconciliado.

O projeto utiliza Aos Fatos como fonte da transcrição e de algumas checagens, mas não adota seus selos automaticamente. As referências incluem documentos do IBGE, Banco Central, legislação, STF, STJ, Congresso, instituições de pesquisa e outros veículos. Há divergências de leitura entre checadores, inclusive sobre vacinas, fechamentos de empresas e períodos fiscais; elas não foram ocultadas.

Fonte governamental pode documentar norma, anúncio ou posição oficial. Não é prova independente da eficácia da própria gestão ou de responsabilidade penal. Depoimento comprova o que foi declarado, não automaticamente a veracidade do relato. Estimativas dependem de método e hipóteses. Rankings exigem critérios e ano.

## Gráficos e exportação

- **Da fala à conclusão:** separa conclusões factuais, itens sem conclusão definitiva e itens sem julgamento de verdade.
- **Por candidato:** contagens absolutas, na mesma escala, incluindo todas as categorias. Não é placar de honestidade, taxa representativa ou medida de tempo de fala.
- **Temas:** um tema principal por registro, incluindo propostas.
- **PIB:** anos selecionados do IBGE, não uma série contínua. A recuperação após recessão não demonstra, isoladamente, mérito de um governo.

Os gráficos usam a base inteira. Filtros atuam nas fichas e no CSV exportado, com bloco, parágrafos e fontes. Todas as contagens são derivadas da base, sem números fixados no gráfico.

## Pendências

As fichas em apuração ou revisão descrevem o que falta: documentos bancários, autos, votações, séries homogêneas, definição de período ou conferência no áudio. Entre os assuntos estão resultados fiscais, acusações financeiras, políticas futuras atribuídas ao adversário e comparações internacionais. Sem esses elementos, não forçamos um julgamento binário.

O validador confere referências, categorias, localização, reciprocidade entre fichas e mapa de cobertura, contagem de parágrafos e arquivos da página. Essa validação estrutural não substitui a revisão jornalística da evidência.

## Revisão integral das pendências de 19/10/2026

As 44 fichas sem conclusão definitiva receberam registro datado de revisão. Dez passaram a ter conclusão factual e 34 continuam inconclusivas. Fichas antes marcadas como apuração aberta foram identificadas como sem comprovação quando a pesquisa permaneceu insuficiente; essa mudança não é veredito de falsidade nem comprovação de inocência. O arquivo `docs/data/review-log.json` preserva o estado anterior e os limites. A rodada não inclui escuta integral do vídeo ou acesso a autos sigilosos.

Na pesquisa complementar das 34 restantes, cinco receberam novas conclusões e um prognóstico foi separado dos vereditos; 28 permanecem inconclusivas. O registro complementar conserva os limites. A ferramenta de exportação do vídeo oficial não disponibilizou transcrição; nenhuma sincronização audiovisual foi inferida disso. A ausência de legenda exportável não implica defeito na gravação nem permite certificar sua conferência.

## Revalidação das falsas de 19/10/2026

As 16 fichas falsas foram revistas com a fala completa da transcrição ao lado. Três critérios levaram a mudanças: paráfrase mais forte que a fala (F27), evidência posterior não considerada (F02) e erro numérico com base real, que o método trata como imprecisão (L60). Fontes inacessíveis por assinatura foram substituídas ou complementadas por outras abertas, sem presumir o conteúdo das fechadas. `docs/data/review-false-audit.json` guarda a classificação anterior e os limites.
