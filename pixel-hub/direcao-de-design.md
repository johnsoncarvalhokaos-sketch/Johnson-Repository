# Pixel Hub · Direção de design

> **14/10/2026: arquivada como direção visual.** O cliente validou a direção AI Hub (`pixel-hub-prototipo-hub.html`), na linguagem do `Pixel_AI_Hub` e da landing `Pixel_Blocos`. Este documento fica como registro da direção editorial. Continuam valendo como regra de produto: "Hierarquia em telas de fluxo" (os papéis, não os tamanhos) e "Telas de cor inteira" (quando celebrar), aplicadas na linguagem do AI Hub.

## O produto
Plataforma em que empresas brasileiras criam e operam agentes de IA, guiadas por uma jornada em três blocos (primeiro agente, cérebro da empresa, operação agêntica). Quem usa é gestor e dono de negócio, não técnico. Tudo em português do Brasil.

## Personalidade
Confiante mas caloroso. Profissional sem ser corporativo. Educador, não vendedor: explica o próximo passo com clareza e sem jargão.
O que NÃO somos: enterprise pesado, crypto bro, "startup de IA" de gradientes.

## O que é só nosso (passa no teste de substituição)
- O glifo do agente: quadrado arredondado chapado na cor da área, dois olhos brancos, estático. É a única marca de IA no produto.
- Laranja Pixel (#FF5A1F) e azul-escuro (#0E1238; #101C7E nas superfícies de marca).
- Funnel Display, a mesma da LP da Pixel.
- A jornada: progresso por blocos e marcos, sempre mostrando o próximo passo.
- Onde mora a ousadia (à la Arc), em quatro territórios, cada um com o seu limite para não competirem:
    1. **Tipografia:** títulos grandes em Funnel Display, quase editoriais, só nos momentos-chave (abertura, resultado do diagnóstico e marcos). No resto do produto, títulos contidos.
    2. **Bloco de contraste:** o azul-escuro como uma placa forte, no máximo um por tela, com o número ou o próximo passo que importa.
    3. **Voz:** o resumo em frase e textos com opinião ("Seu próximo passo é…"); a Pixel orienta como educadora, não como ferramenta neutra. Vale em todo o produto, porque não ocupa espaço visual.
    4. **Marcos da jornada:** o único lugar com cor de marca e composição generosa, como uma capa, quando a pessoa conclui um bloco.
    - **Regra de convivência:** uma tela usa no máximo dois territórios visuais ao mesmo tempo (tipografia grande, bloco de contraste ou marco); a voz pode estar sempre. Telas de configuração e listas não usam nenhum, só a voz.

## Referências
Produto: painel de faturamento brasileiro (referência de hierarquia visual, 12/10: um número dominante, narrativa à esquerda e evidência à direita, níveis por cor, cor de marca só em ações, cores semânticas unificadas entre gráfico, totais e status), app financeiro com agente (referência de 12/10: resumo em frase, bloco de contraste único e a pílula "Talk to your agent"; tomar a limpeza e a voz, não o fundo bege), Gumloop (linguagem geral e agentes), Linear (densidade sem desordem), Raycast (densidade com elegância, camadas flutuantes), Claude (craft e UX), Perplexity, Origin, Notion (flexibilidade), Arc (defaults opinativos), Clerk (refinamento visual).
Padrões: AlignUI (https://www.figma.com/design/G2Jsv2KKziOWB9yjFk00pR/PREVIEW-%E2%9C%A6-Align-UI-%E2%9C%A6-Design-System--2.0-?node-id=414-4397&t=614oHJttteHDXzbu-1).
Fora do software (12/10): **editorial de negócios impresso** como principal, **sinalização** como regra de dosagem.
- **Editorial — como as telas se armam.** A tela abre como uma matéria: título, uma linha de olho que explica, e o corpo todo em tamanho pequeno e constante. Fios finos no lugar de caixas. Legenda curta junto à evidência, não rótulo em cima dela. O marco de bloco é capa de seção: margem generosa e nada mais na página. O resumo em frase é o lead.
- **Sinalização — como a informação é dosada.** Uma decisão por vez, no ponto da decisão. Informação em três distâncias de leitura (o que se lê de longe, de perto e no detalhe). Cor como código fixo, nunca decorativa. Setas e ícones de traço constante, sem exceção. Vale em listas, painéis de ferramentas e skills e no Agent Builder. Entra como dosagem, nunca como estética institucional: nada de frio nem de placa de aeroporto.

## Tipografia
- Títulos: Funnel Display. Texto: Plus Jakarta Sans. Sem terceira família.
- Escala: 12 · 14 · 16 · 20 · 28 · 40 px. Um salto claro entre níveis; nunca dois tamanhos vizinhos lado a lado.
- Pesos: 400 texto, 500 rótulos, ênfase e a maior parte dos títulos. 600 só em casos raros. A hierarquia vem de tamanho e de cor, não de negrito.
- Tracking: -0,03em em 28 e 40; -0,02em em 20; -0,01em em 14 e 16; 0 em 12.
- Números em dados e tabelas: algarismos tabulares.

## Cor (claro primeiro; escuro só na v2)
- Base branca: o fundo principal é branco (#FFFFFF). Superfícies secundárias (barra lateral, campos, áreas agrupadas) em um quase-branco com um traço quente imperceptível (#FAFAF9 e #F5F5F3). Divisórias em #EDEDEA. Nada de bege nem de cinza frio azulado.
- 60% branco e neutros: fundo, superfícies e divisórias.
- 30% azul-escuro: texto principal, títulos e o bloco de contraste.
- 10% laranja: ação principal e foco. Uma ação laranja por tela.
- Cor decorativa da marca com parcimônia: no glifo e em momentos de marco, nunca em fundos de leitura.
- Semântica separada da marca: verde concluído, âmbar aguardando, vermelho erro, azul informação. Chips de categoria em tons pastel claros.
- Gráficos: cinzas e uma única cor de dado.
- Logos e fotos reais são a principal fonte de cor do conteúdo.

## Hierarquia
- **Um dominante por tela:** um único elemento grande (o número, o estágio ou o próximo passo que importa). Todo o resto entre 12 e 16 px. O salto de tamanho até ele é grande o bastante para não haver disputa.
- **Narrativa à esquerda, evidência à direita** nas telas de estado (Início, Plano, Empresa): a coluna estreita conta a história (o dominante, o contexto em uma linha, a ação principal e uma secundária, o insight do Consultor e o "Fale com o Consultor"); a coluna larga prova (progresso, gráficos e tabelas).
- **Níveis por cor, não por peso:** quase tudo em peso regular; o rótulo em cinza, o valor ou o item ativo em azul-escuro.
- **Abas, filtros e alternâncias como texto:** o ativo em azul-escuro, os demais em cinza. Sem pílulas de aba.
- **Ações secundárias como links** na cor de ação; só a principal é botão.
- **Cores semânticas unificadas:** o mesmo verde, âmbar, vermelho e cinza nos números, nos gráficos e nos ícones de status. A linha de totais funciona como legenda do gráfico; sem legenda separada.
- **Estrutura sem caixas:** alinhamento, espaço e divisórias finas organizam a tela; cards só quando agrupam algo que se move junto.
- **Limites ancorados no rodapé** da coluna de narrativa, presentes sem competir. Ex.: "Franquia de IA: R$ 312 de R$ 500" com a barra fina e "Ver plano" em link.
- **Insight do Consultor:** um bloco curto de texto com os fatos-chave em ênfase, na coluna de narrativa, quando houver algo útil a dizer (a Pixel propõe).

## Tabelas e listas (12/10, a partir do painel de faturamento)
- Todo valor em azul-escuro e peso regular. Cinza só no rótulo do cabeçalho e no campo vazio ("Definir", "Ainda não rodou").
- Uma linha por registro, 48 px de altura, divisória fina entre linhas. Sem subtítulo dentro da célula no desktop; no celular, a coluna secundária desce para baixo do nome.
- Logo real ou glifo soltos, 16 a 18 px, ao lado do nome, sem caixa em volta.
- Status só por ícone (círculo chapado de 16 px: verde com check, âmbar com três pontos, vermelho com x, contorno cinza para rascunho), em coluna estreita à direita.
- A linha de totais acima da tabela é a legenda: contagens curtas na cor semântica ("2 conectadas", "1 aguardando acesso"). Sem legenda separada e sem filtro repetindo as mesmas categorias.
- Título da seção pequeno e cinza, sem fio forte. Busca como botão redondo à direita do título. "Ver todos" em link abaixo da tabela.
- Sem fundo no hover das linhas. Ações da linha num menu "…" no fim.

## Telas de cor inteira (13/10)
Uma tela inteira colorida só aparece quando algo real aconteceu e foi verificado. Cada cor tem um significado só:
- **Azul de marca (#101C7E): fechamento de bloco da jornada.** Três vezes em toda a jornada (Primeiro agente, Cérebro da empresa, Operação agêntica). É o "marco da jornada" deste documento, como uma capa.
- **Verde (#17663F): checkpoint com evidência.** Quando a pessoa registra que a responsabilidade rodou num caso real e marca os critérios (executou, conferiu, corrigiu, repetiu) com uma frase do que mudou. A tela mostra a evidência: o caso, a responsabilidade, os critérios e a data.
- **Nunca:** no fim do Agent Builder (o Starter Kit não é o agente em produção e não comprova nada; a confirmação ali é branca, com os estados em tags), no plano pronto, no agendamento, ao salvar ou ao concluir uma etapa de instalação (isso é confirmação de ação e cabe num aviso breve).
- A sequência dá a escala da conquista: agente configurado (branco) → primeira entrega comprovada (verde) → bloco concluído (azul).
- Composição igual nas duas: glifo claro, rótulo do momento, título grande, uma frase de contexto, ação principal em pílula clara e link secundário à esquerda; à direita, a evidência ou os números, em lista com fios claros. Sem o Consultor no rodapé.

## Hierarquia em telas de fluxo (13/10, Agent Builder)
Cinco papéis de texto, sem tamanhos intermediários (nada de 13 ou 15 px):
- **Título da tela:** 28 px, Funnel Display 400.
- **Título de seção:** 20 px, Funnel Display 400. É o salto que separa um bloco do outro.
- **Item e rótulo de campo:** 14 px, peso 500, azul-escuro. O nome de uma responsabilidade, ferramenta ou opção; a pergunta acima de um campo.
- **Descrição:** 14 px, peso 400, cinza. Diferencia-se do item por peso e cor, nunca por um tamanho vizinho.
- **Metadado:** 12 px, cinza claro. De onde veio, estado, contagem.
Ações nunca se parecem com conteúdo: link de ação em laranja e peso 500, com ícone de lápis quando edita algo (Editar, Alterar, Ajustar); ação que abre um catálogo ou acrescenta algo vira botão secundário com ícone; a ação de avanço fica só no rodapé, em laranja.

## Densidade e espaçamento (por contexto)
- Generoso onde se decide ou se aprende: onboarding, diagnóstico, resumo do plano, escolhas do Agent Builder.
- Denso onde se configura ou se acompanha: listas, painéis de ferramentas e skills, Meus agentes, tabelas. Densidade com ritmo claro, à la Linear e Gumloop, nunca amontoado.
- Base de 4 px; seções separadas por espaço e divisória, não por card dentro de card.

## Profundidade
Volume só em elementos interativos. Superfícies de leitura (fundo, cards, painéis) são planas, com borda de 1 px e sem sombra. Camadas flutuantes (popovers, menus, modais) têm sombra suave.
- Botão principal (laranja): degradê vertical curto (4–6% mais claro no topo), brilho interno de 1 px no topo (branco 20%), borda 1 px um tom mais escura, sombra curta em duas camadas (0 1px 2px; 0 2px 4px -2px) na cor do botão escurecida. Pressionado: sem brilho, sombra menor, desce 0,5 px.
- Botão azul-escuro: igual, com brilho interno de 10%.
- Botão secundário (branco): degradê de branco para 2% de cinza, borda 1 px neutra, sombra mínima (0 1px 2px a 6%).
- Tags e chips: fundo tonal claro, borda interna 1 px na própria cor, brilho de 1 px no topo, sem sombra externa; selecionáveis ganham a sombra mínima.
- Campos: levemente afundados (sombra interna de 1 px no topo).
- Checkbox, radio e toggle: volume do botão principal em escala menor quando marcados.
- Camadas flutuantes: sombra difusa em duas camadas (curta e próxima + longa e suave); vidro fosco só aqui, opcional.
- Estados obrigatórios em todo elemento com volume: normal, hover, pressionado, desabilitado e foco visível.
- Nunca: degradê de duas cores, brilho colorido, sombra em card de leitura, volume em texto ou ícone.

## Raio
8 px campos · pílula em botões, tags, chips e no seletor de empresa · 12 px cards de lista · 16 px modais · 20 px popovers e menus · 24 px no bloco de contraste e nos contêineres principais.

## Movimento
Sutil e rápido: 150–200 ms, easing com base em física (ease-out com desaceleração suave). Sem saltos, sem animação decorativa. Movimento só para confirmar ação, revelar camada ou mostrar progresso. Tudo respeita a redução de movimento.

## Padrões de assinatura
- **Resumo em frase:** telas de estado abrem com uma frase em duas vozes, palavras de ligação em cinza e fatos em azul-escuro. Ex.: "Você tem **1 passo** na Trilha, **1 agente** aguardando instalação e **2 dias** até o próximo checkpoint."
- **Bloco de contraste:** no máximo um por tela, em azul-escuro, com o número ou o próximo passo que mais importa e até duas ações em pílula clara. Todo o resto da tela fica claro.
- **"Fale com o Consultor" sempre no rodapé:** uma pílula fixa que cresce para caixa de texto ao digitar, com microfone. O trabalho do agente aparece numa linha de status discreta acima dela, com um ponto ("Analisando seus orçamentos…"), nunca num spinner.
- **Status embutido no texto:** ícones de status minúsculos ao lado do item (check verde, três pontos de "em andamento"), em vez de selos grandes.

## Imagens e ícones
- Pessoas: fotos reais, em círculo. Agentes: o glifo. As duas nunca se confundem.
- Ferramentas: logos reais (catálogo do Composio). Sem monogramas inventados.
- Ícones de traço fino e consistente. Sem ilustrações, mascotes animados ou cenas 3D.

## Princípios de interação
- Reconheça toda ação instantaneamente (optimistic UI).
- Ação primária sempre visível, nunca escondida.
- A Pixel propõe, a pessoa revisa: sugestões chegam prontas e são aceitas com um gesto (autocompletar, "sugerido", pré-seleção explicada).
- Formulários parecem conversa, não papelada.
- Erros ajudam a consertar, nunca culpam.
- Carregamento mostra progresso, não spinner.
- Uma ação de avanço por vez em fluxos de etapas; troca de etapa leva ao topo.
- Componente certo para cada intenção: radio para escolher uma, checkbox para várias, botão para confirmar, toggle só para ligar uma preferência.
- Mobile: amigável à zona do polegar, swipe nativo.

## Anti-referências
- Flat sem afordância e excesso de degradês.
- Qualquer elemento com "cara de IA": brilhos (✦), roxo de IA, degradês de "startup de IA".
- Minimalismo sem personalidade.
- Dashboards com 50 ações visíveis.

## O teste
1. Isso pareceria em casa num case study do Layers.to?
2. Se eu trocar o logo, ainda é reconhecível como Pixel? Se não, falta identidade.
3. Uma ação laranja por tela? Densidade certa para o contexto? Volume só no que é clicável?
