# Context — Redesign da Plataforma Pixel

> Documento vivo. Serve para dar contexto completo do projeto em qualquer sessão nova, sem precisar reexplicar nada. Atualizar ao fim de cada ciclo de trabalho.

**Última atualização:** 12/10/2026 (revisão do cliente; redesenho do zero)
**Agência:** :Zero (doispontozero.digital)
**Cliente:** Pixel Educação
**Papel do Johnson:** UX Sênior — lidera análise heurística, melhorias de produto e direção visual da landing page
**Projeto:** Redesign da interface e experiência da plataforma Pixel + landing page
**Janela:** Outubro 2026 — 21 dias úteis

---

## 0. Estado atual em 12/10 (leia primeiro)

**Onde estamos:** o cliente aprovou os fluxos e a sequência, mas reprovou o visual (genérico, com cara de IA) e pediu sobriedade. Decisão: **recriar o design do zero**. Os fluxos, textos e regras de produto continuam; a aparência e o código visual atuais não.

**Vale como fonte da verdade**
| Arquivo | Para quê |
|---|---|
| `prd-pixel-hub-2.0.md` (v2.0) | Produto, fluxos e regras; requisitos da revisão de 12/10 na seção 7.2 |
| `direcao-de-design.md` | Direção visual do redesenho (substitui os fundamentos antigos) |
| Documentação do glifo (Claude Doc) e `glifo/` | Única representação dos agentes nesta entrega |
| `context.md` e `briefing-novo-chat.md` | Decisões e contexto para novas sessões |
| Documentos do cliente (Building Blocks, Onboarding, Agent Builder) e as revisões de 08/10 e 12/10 | Regras do produto |

**Referência de fluxo, não de aparência:** `pixel-hub-prototipo.html` (versão sóbria de 12/10, publicado no mesmo link). Serve para consultar sequência, textos e regras; não para copiar telas.

**Legado (não usar como guia):** `legado/` guarda os fundamentos de design antigos, o Design System v1.1 (JSON e MD), o mapeamento de craft e as 17 cópias antigas do protótipo. O canvas e o Design System no Claude Design também são da direção reprovada. A seção 3 em diante deste arquivo é o histórico do projeto: decisões de visual descritas ali (personagem, animações, painel destacado, tokens) estão superadas pela revisão de 12/10.

**Histórico útil:** `referencia/auditoria-plataforma-pixel.md` (a plataforma original, 01/10), como evidência do problema.

- **Personagem minimalista em versionamento (12/10):** além do glifo, três caminhos para os momentos de marca (Consultor e marcos): A · glifo com antena (chapado na cor da área), B · corpo e tela (corpo na cor da área e tela azul-escura, como o Pixel original, sem degradê) e C · traço (linha azul-escura, ponta da antena na cor da área). Todos estáticos e sem expressão. No protótipo, o menu de versões (aba Layout) tem a escolha "Personagem" (Glifo, A, B, C), aplicada a todos os Pixels para comparar em contexto. Decisão pendente com o Johnson.

- **Referência de hierarquia (12/10):** painel de faturamento brasileiro (branco, um número dominante, narrativa à esquerda e evidência à direita, cor de marca só em ações, cores semânticas unificadas, estrutura sem caixas, limite de uso no rodapé). Virou a seção "Hierarquia" do `direcao-de-design.md`.

- **Arquitetura da informação do novo protótipo (12/10):** https://claude.ai/code/artifact/af74430b-f68c-4a8a-aa16-c3d95b3c4dbc. Princípios, mapa (seis áreas: Início, Plano, Agentes, Aprender, Comunidade, Empresa; Onboarding e Agent Builder em tela cheia; Consultor fixo no rodapé), navegação, perfis, fluxos, inventário de telas, modelo de conteúdo e decisões em aberto. É o ponto de partida do protótipo recriado do zero.

**Bundle fechado (12/10):** a referência de fora do software ficou **editorial de negócios impresso** como principal (a tela abre como matéria: título, olho, corpo pequeno e constante; fios no lugar de caixas; legenda junto à evidência; marco como capa de seção) e **sinalização** como regra de dosagem em listas, painéis de ferramentas e skills e no Agent Builder (uma decisão por vez, três distâncias de leitura, cor como código fixo, traço constante) — como dosagem, não como estética institucional. Descartados: objetos de precisão (já coberto por "laranja só na ação" e "volume só no clicável"; falha no teste de substituição) e material de formação (puxa para cara de apostila).

**Próximos passos (protocolo da skill de craft):** 1) ~~fechar o campo restante do bundle~~ feito em 12/10; 1b) a arquitetura da informação está pronta, com os três primeiros itens de decisões em aberto marcados pelo Johnson (confirmar o que foi decidido); 2) prova de sensação: três telas-chave (abertura, os três caminhos do Agent Builder, ferramentas e skills) no Claude Design, validadas com o Johnson e o cliente; 3) prova de trabalho: onboarding e Agent Builder construídos do zero; 4) app depois do handoff de 16/10, a combinar.

---

## 1. O cliente

**Pixel** (pixeleducacao.com.br) — empresa brasileira de formação e implementação de agentes de IA para empresas. Apesar do domínio, não é educação no sentido tradicional: o produto final é o agente rodando na operação do cliente.

### Posicionamento

Tese central do marketing: **"usar IA é o nível 1, ter agentes de IA autônomos é o nível 2"**. Agentes como "funcionários digitais" que operam áreas inteiras do negócio sozinhos, sem o usuário precisar pedir.

### Números de prova social (site, out/2026)

| Métrica | Valor |
|---|---|
| Empresas operando com agentes | +700 |
| Retorno gerado por ano | +R$ 60 mi |
| Alunos formados | +11 mil |
| Horas economizadas no operacional | +20 mil |

### Sócios

| Nome | Papel | Perfil |
|---|---|---|
| Cayo Syllos | CEO · Co-fundador | Cientista da computação, arquiteto de soluções com IA |
| Bruno Okamoto | CCO · Co-fundador | IA aplicada a negócios, TEDx Speaker, estratégia e posicionamento |
| Matheus Cardozo | COO · Co-fundador | Economista, estruturação financeira, growth e operações |

Investida por **Rony Meisler** (cofundador da Reserva). Estrutura enxuta declarada: três sócios, dois funcionários, um time de agentes de IA.

---

## 2. Os três produtos

| Produto | Proposta | Preço | Público |
|---|---|---|---|
| **Pixel AI Formação** | "Pixel te ensina a fazer" | R$ 197/mês (anual) | Microempreendedores, líderes de área, autônomos |
| **Pixel AI Hub** | "Pixel faz com você" | R$ 497/mês (anual) | Empresas com operação estabelecida, querem autonomia no fim |
| **Pixel AI Works** | "Pixel faz por você" | Sob consulta | Empresas que preferem terceirizar a implementação |

**Formação** inclui: 6 trilhas (do primeiro agente à empresa agêntica), Hubzinho (agente que estuda o conteúdo com o aluno), método para aplicar ou vender como serviço, comunidade.

**Hub** inclui: tudo do Formação + plano da empresa agêntica, consultor Pixel AI 24h no WhatsApp, mentorias técnicas ao vivo 3×/semana, Agent Builder, ferramentas prontas, comunidade de empresários.

**Works** inclui: diagnóstico, priorização por retorno, construção e integração pelo time Pixel, acompanhamento até virar processo estável, time interno treinado.

### Metodologia de implementação (5 passos)

1. **Diagnóstico** — mapear áreas, processos, ferramentas e gargalos
2. **Priorização por retorno** — ordenar rotinas por custo atual e previsibilidade
3. **Preparação do contexto** — documentar processo, organizar conhecimento, definir regras
4. **Construção e integração** — conectar às ferramentas que a empresa já usa
5. **Operação e expansão** — acompanhar até virar processo estável, depois próxima área

### Agentes por área oferecidos

Marketing · Vendas · Financeiro · Compras · Recursos Humanos · Operação · Gestão

---

## 3. A plataforma (app.pixeleducacao.com.br)

### Arquitetura de navegação atual

```
Início

CONTEÚDO
├── Formações
├── Imersões e Mentorias
└── Materiais Complementares

COMUNIDADE
├── Comunidade (bloqueado até concluir onboarding)
└── Cases

AGENTES
├── Meus agentes
├── Ferramentas & Skills (badge de notificação)
└── Plano Agêntico

CONSULTOR PIXEL AI
└── Fale com o consultor

Rodapé
├── Notas de atualização (badge de notificação)
└── Perfil do usuário
```

Total: 11 itens em 4 grupos. FAB persistente "Hubzinho" no canto inferior direito.

### Trilha de formações (6 níveis)

| # | Formação | Subtítulo | Módulos | XP |
|---|---|---|---|---|
| 1 | Construindo seu primeiro agente | Do zero ao agente no ar | 5 | 2150 |
| 2 | Botando seu agente pra trabalhar | Ele atua no seu negócio | 5 | 800 |
| 3 | Criando o segundo cérebro | Seu Sistema Operacional: o contexto que não se perde | 3 | 700 |
| 4 | Agentes na sua empresa | O time inteiro com IA | 3 | 900 |
| 5 | Comandando tudo pelo PC | Sua estação de comando | — | — |
| 6 | AI OS — Bônus | — | — | — |

Sistema de gamificação: XP + níveis (`Nível 1 · 0 XP · 0%`). Economia do XP não documentada na interface.

### Direção visual atual

- Dark mode, fundo quase preto azulado
- Accent laranja-avermelhado (`#101C7E` é o theme-color do site, mas o app usa laranja/vermelho)
- Tipografia display monoespaçada para títulos, sans para corpo
- Cards com borda sutil, raio médio
- Ícones outline, traço fino

---

## 4. Squad :Zero — outubro 2026

Quatro pessoas dedicadas à Pixel: atendimento, gestão e um time de UX atuando em produto e landing page ao mesmo tempo. O mesmo squad acompanha todo o cronograma, do estudo da plataforma ao pós Black Friday.

| # | Papel | Pessoa | Responsabilidades | Atuação |
|---|---|---|---|---|
| 01 | Executivo de contas | Felipe Perobeli | Relacionamento com a Pixel · escopo e contrato · acompanhamento de resultados | Conta e relacionamento |
| 02 | Gestão / Suporte | Victor Barreto | Cronograma e prioridades · alinhamentos de progresso · suporte ao time e ao cliente | Gestão do projeto |
| 03 | **UX Sênior** | **Johnson Carvalho** | **Análise heurística · onboarding e criação de agentes · guia visual da landing page** | **Produto + Landing Page** |
| 04 | Designer auxiliar | Matheus Iglezias | Referências e estudos visuais · wireframes e layout final · ajustes e handoff para devs | Produto + Landing Page |

---

## 5. Cronograma — Outubro 2026

Produto e landing page andam **em paralelo** até o dia 20, com alinhamento no dia 09. De 21 a 30, o squad acompanha os novos usuários e refina as duas frentes.

### Frente PRODUTO

| Entrega | Descrição | Período | Duração |
|---|---|---|---|
| Estudo da plataforma | Mapeamento de melhorias por análise heurística | 01–02 out | 2 dias |
| Melhorias da plataforma | Onboarding e criação de agentes | 05–09 out | 5 dias |
| Ajustes e handoff | Entrega para a equipe de devs | 13–16 out | 4 dias |
| Suporte aos devs | Dúvidas e validação da implementação | 19–20 out | 2 dias |

### Frente LANDING PAGE

| Entrega | Descrição | Período | Duração |
|---|---|---|---|
| Referências e concorrentes | Análise de mercado e benchmarks visuais | 01–02 out | 2 dias |
| Estudos visuais e wireframe | Estilo e guia visual definidos no dia 09 | 05–09 out | 5 dias |
| Layout final | Landing page completa para desenvolvimento | 13–16 out | 4 dias |
| Suporte aos devs | Acompanhamento da implementação | 19–20 out | 2 dias |

### Frente PÓS BLACK FRIDAY

| Entrega | Descrição | Período | Duração |
|---|---|---|---|
| Produto + landing page | Melhorias e refinamento contínuos (novos usuários, feedbacks e triagem) | 21–30 out | 8 dias |

### Marcos do mês

| Data | Marco |
|---|---|
| 09 out | Alinhamento do progresso e guia visual |
| 12 out | Feriado |
| 16 out | Handoff para a equipe de devs |
| 21 out | Início do acompanhamento de novos usuários |

**Total:** 21 dias úteis.

---

## 6. Estado do redesign (08 out)

### Estado em 08/10 (resumo para quem chega agora)
- **Regra do projeto:** os documentos do cliente "Pixel Hub 2.0 — Building Blocks e Experiência do Produto", "Onboarding" e "Agent Builder" (em /mnt/user-data/uploads) são a base de tudo. O que não consta neles sai.
- **Versão vigente do protótipo:** Conforme documentos (v4). Onboarding em chat com o Consultor Pixel AI para Admin, Membro e Individual; abertura inspiradora; geração animada; resumo visual do diagnóstico (onde está, jornada, ganhos e aplicações, sem botões de criação) com um único CTA e tela de agendamento; **Agent Builder reconstruído conforme o documento "Agent Builder"** (recomendação do Plano, template ou customizado, responsabilidades com uma prioritária, instalação do Hermes em 4 etapas, identidade, forma de trabalho em 4 dimensões, ferramentas e skills por responsabilidade, revisão com impacto no Plano, Starter Kit e ativação via Composio).
- **Revisão do cliente de 08/10 aplicada:** abertura inspiradora, área de resposta única, voz em destaque, resumo visual do diagnóstico com um único CTA e ajustes no Agent Builder. Placeholders pendentes: GIFs reais e logos das ferramentas (números e cases da abertura já vêm da LP).
- **Pixel sempre em 2D:** o 3D foi removido; todo Pixel é vivo, em qualquer estilo.
- **Animações do Hubzinho:** Fases 7 e 8 (cerca de 40 animações de estado, transição, feedback, marcos, easter eggs, ensino e ambiente).
- **Versões no menu:** formato das perguntas (área de resposta única, padrão, ou "No chat", histórico); estrutura da página ("Atual" ou "Painel destacado"); estilo visual (Padrão, Operação visível, Circuito); acessórios por data.
- **Plano de execução:** Fases 1, 2, 3, 7 e 8 concluídas, mais o Agent Builder conforme o documento; faltam a Fase 6 (canvas, Design System, specs) antes do handoff de 16/10 e as Fases 4 e 5.
- **Cópias de segurança:** v4.3, v4.4 (Fase 1), v4.5 (Fase 2), v4.6 (Fase 3), v4.7 (Fase 7), v4.8 (2D), v4.9 (Fase 8), v4.10 (Agent Builder), v4.11 (revisão do cliente de 08/10), v4.12 (recorte do MVP de 09/10) e v4.13 (abertura v7, cases reais, Trilha e barra de progresso, 09/10). A atual é sempre pixel-hub-prototipo.html.

### Onde estamos
A frente Produto passou da auditoria para um **protótipo navegável completo**, já revisado com o cliente por comentários. O que existe hoje:

| Entrega | Estado | Link |
|---|---|---|
| Auditoria heurística (Home e Formações) | Concluída em 01/10 | `auditoria-plataforma-pixel.md` |
| PRD Pixel Hub 2.0 | Concluído, com anexo de decisões de UX | `prd-pixel-hub-2.0.md` |
| Fundamentos de design | Atualizado em 06/10 | `pixel-design-foundations.md` |
| Design System (artefato) | Atualizado em 06/10 | https://claude.ai/artifact/38EFsM8hL7AVRADnCC6iTe |
| Canvas de telas (fluxo tela a tela) | 32 telas do protótipo + 8 da exploração inicial | https://claude.ai/artifact/PNqS3ZSNdycVbEZ34XU1u3 |
| **Protótipo navegável (principal)** | Publicado, versão Refinada + CTA laranja por padrão | https://claude.ai/artifact/2zgcruZYHPFYBaNDJn47DX |
| Cópia separada do protótipo | Congelada em 02/10 (só recebeu a correção da linha do tempo) | https://claude.ai/artifact/CBrvjXsZrNyXvqXpiGSF99 |

### Versão vigente: Conforme documentos (v4), 06/10
Depois da apresentação de 06/10, o cliente determinou que o produto siga à risca os documentos "Pixel Hub 2.0 — Building Blocks e Experiência do Produto" e "Onboarding". A v4 é o padrão do protótipo; Atual (v2.3) e Essencial (v3.0) ficam no menu só como histórico.

- **Onboarding em chat** para os três perfis (Admin, Membro, Individual), escolhidos no menu de versões: visão geral com a jornada e cases ilustrativos, diagnóstico em 4 partes (contexto, as 6 perguntas de maturidade do diagnóstico atual, até 2 áreas de ineficiência, processo específico por texto ou voz), Plano Agêntico inicial e agendamento não bloqueante (Membro não agenda).
- **Resultado do diagnóstico (desde a revisão do cliente de 08/10):** resumo visual na ordem onde está → jornada e próximos passos → ganhos de tempo, custo e faturamento com premissas → aplicações possíveis; sem seleção, criação nem calculadora; um único CTA (agendamento para Founder e criador, Trilha para membro). O formato anterior (prioridade com link para o Agent Builder e pergunta de refinamento do ganho) foi substituído.
- **Agent Builder em 8 passos:** seleção do trabalho (com "já existe um agente?"), agente online (Hermes), identidade e papel, forma de trabalho, ferramentas e skills, revisão, Starter Kit, download e instalação.
- **Consultor Pixel AI** substitui o nome Hubzinho na v4 (o Hubzinho continua como rosto), com página central e histórico. Navegação: Formações, Hands-on e Mentorias.
- **Geração do Plano (07/10):** entre o fim do chat e o Plano, uma tela "Montando seu Plano Agêntico" com o Consultor e anéis de luz, barra de progresso e 6 etapas que se completam com a origem de cada uma (Você, Regra, Consultor). Cerca de 4 s; 1 s com redução de movimento. O Plano entra em cascata.
- **Estrutura com painel destacado (08/10), versionada:** menu de versões, aba Layout, "Estrutura da página": Atual ou Painel destacado (navegação solta sobre o fundo e conteúdo num painel branco com cantos de 16 px, borda fina e 12 px de afastamento; dentro dele, nada de card dentro de card: o próximo passo vira seção de abertura com linha embaixo, a coluna lateral é separada por linha vertical, o histórico do Consultor também, e os demais cards ficam só com contorno; caixas internas e itens clicáveis mantêm um cinza leve; o painel fica fixo na tela, respeitando a margem e a área segura do dispositivo, e só o conteúdo dele rola; no celular, nada muda).
- **Agent Builder conforme o documento "Agent Builder" (08/10, cópia em pixel-hub-prototipo-v4.10.html):** 1) recomendação explicada a partir do Plano (agente sugerido, responsabilidade inicial e por quê), 6 templates (Marketing, Operações, Vendas, Gestão, Chief of Staff, Agente Geral da Empresa) ou agente customizado por texto ou voz com proposta do Consultor; várias responsabilidades com as comuns marcadas, uma prioritária, e "Quero que ele faça outra coisa" estruturado pelo Consultor; responsável e público antes de confirmar; 2) instalação do Hermes em 4 etapas (VPS, Hermes, bot do Telegram, teste) com instrução, GIF, resultado esperado, problemas comuns, ajuda contextual e aviso de credenciais; 3) identidade e papel pré-preenchidos com missão e ajuste em linguagem natural; 4) autonomia (4 níveis), escalonamento (5 situações), incerteza (4 posturas), comunicação (tom, detalhe, proatividade, formato) e ajuste em linguagem natural; 5) ferramentas e skills derivadas de cada responsabilidade (capacidades, ferramentas com o porquê, skills prontas, lacunas para o Skill Creator), a prioritária como mínimo para começar, Personal Brain opcional, escolha manual como avançado; 6) revisão consolidada com permissões previstas, edição de qualquer item e impacto no Plano; 7) Pixel Agent Spec compilado em SOUL.md, AGENTS.md, config, skills, tools, permissões e ativação, sem credenciais; 8) download, instalação, ativação das ferramentas pelo agente no Telegram (Composio) e confirmação; o Plano registra "configurado e instalação confirmada pelo participante". A pergunta "já existe um agente?" saiu do builder (o documento diz que o fluxo é só de criação) e virou o link "Já tenho um agente fazendo isso" no card da prioridade do Plano.
- **Revisão do cliente de 08/10 ("Revisão do protótipo Pixel AI Hub:** Onboarding e Agent Builder"), aplicada (cópia em pixel-hub-prototipo-v4.11.html): abertura inspiradora com antes e depois da empresa, números e cases (placeholders "inserir da LP"); área de resposta única como padrão ("No chat" virou histórico) e Enter enviando a múltipla escolha; voz em destaque nas respostas longas ("Contar por voz", barra de gravação com tempo e Parar, texto para revisar; voz real quando o navegador permite, simulada no protótipo); resultado do diagnóstico como resumo visual na ordem onde está → jornada e próximos passos (linha do tempo) → ganhos potenciais (tempo, custo e faturamento, com premissas e selo de estimativa) → aplicações possíveis (sem botões de criação nem calculadora); um único CTA (Founder e criador vão à tela de agendamento com o contexto; membro vai à Trilha); Agent Builder com os três caminhos rotulados, "Já tenho uma VPS configurada" (autodeclaração), cinco dimensões (autonomia, escalonamento, comportamento, comunicação e linguagem), capacidades editáveis, ferramentas com logo (placeholder), descrição e pré-seleção ligadas às capacidades, skills associadas, lacunas com finalidade levadas ao LACUNAS.md do Starter Kit, mapa do que o agente faz na revisão, caminho visual do kit em 3 passos e os estados configurado, aguardando e confirmado. Agente existente: "Registrar agente existente" em Meus agentes.
- **Recorte do MVP (cliente, 09/10), em ordem de prioridade:** 1) Onboarding conforme a revisão; 2) Agent Builder conforme a revisão; 3) Trilha com ações e CTAs claros por bloco; 4) Consultor com histórico e CTA do WhatsApp; 5) Plano Agêntico vivo com as informações dos Building Blocks e a evolução; 6) Mentorias no visual novo, com hands-on em destaque; 7) Formações só no visual novo; 8) Comunidade com resumo visual por grupo e acesso fácil; 9) Cases com visual novo e seleção menor. O que não couber no prazo é explicitado e decidido junto com o cliente.
- **Aplicado em 09/10 (cópia v4.12):** Trilha: cada passo leva ao lugar onde o trabalho é feito (Agent Builder, guia de instalação, guia do passo, ficha do agente, Company Brain, Plano, Consultor, convite ou registro de evidência), e a lista mostra onde cada passo é feito; os passos com subtarefas ganharam um guia que marca as subtarefas e conclui o passo. Plano vivo: resultado esperado, oportunidades e processos com estado, fontes previstas, pendentes de teste, conectadas, fora do escopo ou com bloqueio, e "Como o plano evoluiu". Consultor: múltiplas conversas com histórico próprio, título automático, nova conversa, conversa do WhatsApp no histórico e "Conversar pelo WhatsApp" (número placeholder). Hands-on e Mentorias: guia de escolha, hands-on em destaque com cards por bloco, mentorias técnicas como plantões com as horas (3h Individual, 12h Empresa). Comunidade: destaques da semana e card por grupo com resumo e "Entrar no grupo" (links placeholder). Cases: três cases com um em destaque, selo de curadoria e detalhe com contexto, problema, agente, trabalho, arquitetura, ferramentas, skills, implementação e resultados (conteúdo de exemplo).
- **Trilha: usabilidade (09/10, referências do Mobbin):** meta do bloco e do próximo checkpoint no topo, passo atual expandido na lista com tempo, lugar, subtarefas e ação, tempo estimado nas linhas, diagnóstico concluído no início do Bloco 1, blocos bloqueados com o que destrava e o que se ganha, próximo passo abrindo sozinho e diálogo de marco ao fechar um bloco.
- **Foto da Fabi (09/10):** foto enviada pelo Johnson, recortada em círculo e embutida no protótipo (card do próximo hands-on, sessões de hands-on e bloco Ao vivo da Home). Trocar pela foto oficial da Fabi quando chegar.
- **Abertura do onboarding reestruturada (09/10, referências do Mobbin: Ferndesk, Contra, Qatalog, Upwork, Zapier):** narrativa em uma rolagem. Herói com a promessa, o que a pessoa leva (onde está, por onde começar, quanto pode ganhar), um único botão com a expectativa (~8 min, dá para pausar) e um depoimento logo abaixo; à direita, a prévia do Consultor conversando. Depois: a transformação (antes e depois com a escala de estágios), como funciona (diagnóstico, Plano, onboarding da empresa, com o tempo de cada um), quem já fez (números e cases), seus dados e o fechamento com o botão final. Saiu o rodapé fixo que repetia o botão. O canvas do Claude Design ainda mostra a abertura anterior.
- **Abertura no estilo da LP da Pixel (09/10, arquivo Pixel_LP_Variacoes):** herói em painel azul-marinho (#101C7E) com título em Funnel Display 700 e tracking negativo, chip "+700 empresas operando com agentes de IA", botão laranja "Começar o diagnóstico" e secundário branco "Ver resultados de clientes", três Pixels 2D com as notificações de resultado da LP, e os números reais no herói (+R$ 60 mi por ano de retorno, +11 mil alunos, +20 mil horas). Depois: "Quem confia na Pixel", Nível 1 × Nível 2 (a IA trabalha com você × por você, texto da LP), como funciona com a prévia do Consultor, os cases reais em bento (Antônio Henrique, Paulo Barroso, Manassés, Graziele Piva e "mais 46 cases"), seus dados e o fechamento azul. Números e cases da abertura não são mais placeholder.
- **Abertura em uma tela (09/10):** sem rolagem no desktop (medido de 1100×800 a 1920×1080). Herói azul com a promessa, uma linha de apoio, um único botão em destaque (maior, com halo) e o tempo estimado, os números reais e os três agentes com resultados; embaixo, a faixa de cases reais em cards coloridos com o resultado em destaque (Antônio Henrique, Paulo Barroso, Manassés, Graziele Piva, +46). Níveis, como funciona, dados e fechamento saíram da abertura. No tablet e no celular, a página rola normalmente.
- **Cases reais (09/10, pixeleducacao.com.br/cases):** a área de Cases usa o conteúdo do site. Quatro casos em destaque com a conta aberta (Antônio Henrique, Paulo Barroso, Manassés, Graziele Piva), com "Ver a conta do case"; o critério de divulgação da Pixel (conta verificável e autorização do cliente) explicando o selo; e o mural da comunidade com os 46 cases, as 7 categorias com as contagens, 18 cases listados (9 visíveis, "Mostrar mais") e o link para cases.pixeleducacao.com.br. Os dados ilustrativos saíram. As fotos dos quatro destaques (enviadas pelo Johnson) estão embutidas no arquivo, nos cards de Cases, no detalhe e na faixa de cases da abertura.
- **Abertura v7 (09/10, a partir do mapeamento da revisão e de referências amplas do Mobbin: V7, Ploy, Descript, Grammarly, Stripe):** título sobre a transformação ("Da operação manual à empresa que roda com agentes"), o diagnóstico como primeiro passo, um único botão laranja com o tempo, números como prova, e a transformação como imagem principal em três pares "Hoje" → "Com agentes" (dor apagada → agente com resultado da LP). Embaixo, três cases reais uniformes com foto (Antônio Henrique, Paulo Barroso, Manassés). Sem rolagem no desktop (1280×720 a 1920×1080).
- **Barra de progresso do diagnóstico (09/10):** uma linha laranja fina, de ponta a ponta da tela, na base do cabeçalho de etapas (que ficou fixo no topo), preenchendo a cada resposta; a contagem discreta fica sob o nome do Consultor ("Contexto · 8 de 13"). Uma versão anterior com texto, etapas e tempo foi descartada por excesso de informação e por cortar as mensagens ao rolar.
- **Abertura v7, proporção (09/10):** título em três linhas, pares "Hoje → Com agentes" com mais corpo e os números numa faixa que atravessa o card azul.
- **Cases sem cores (09/10):** os quatro destaques da área de Cases são brancos e uniformes; o do Antônio se destaca só por um contorno laranja suave e pelo botão principal. A faixa de cases da abertura v7 também é uniforme, com foto.
- **Auditoria contra os documentos (09/10):** esquecidos e ainda abertos: refinar o ganho com o tempo real (pergunta opcional do documento de Onboarding, que saiu junto com a calculadora obrigatória) e o consentimento de voz (o "Contar por voz" usa o microfone real quando o navegador permite). Pendentes de entrega: specs de handoff (Fase 6). Para depois do lançamento: pergunta sem registro e marca nos arquivos gerados.
- **Pergunta como fala do Consultor (09/10):** a pergunta da vez aparece na hora como fala do robozinho no chat (como já era com o nome), e a área de resposta fica só com o campo ou as opções, sem repetir o título; o título continua acessível para leitores de tela. As perguntas de esclarecimento mantêm o título na própria área. Texto do cargo: "Qual é o seu cargo?".
- **Mensagens atrás da caixa de respostas (09/10, corrigido):** a caixa fica num rodapé fixo (.v4-dock) de altura variável (cerca de 140 a 300 px); a conversa agora reserva a altura real dele, medida ao vivo (ResizeObserver → --v4dock), no lugar das reservas fixas de 200 + 40 px, e a rolagem fica colada no fim quando ele muda de tamanho. Medido: 24 px entre a última mensagem e a caixa em todas as perguntas, em 1280×640, 1440×900 e 390×844.
- **Muitas opções no diagnóstico (09/10, corrigido):** perguntas com 7 ou mais opções mostram a lista em duas colunas em telas a partir de 700 px; a caixa de respostas nunca passa da altura da tela (rola por dentro se precisar) e a barra com "Enviar" fica fixa na base dela. Medido: "Enviar" visível em 1280×640, 1366×768, 1440×900, 390×844 e 390×667.
- **Decisão (09/10): o painel destacado é a interface oficial.** Passou a ser o padrão de todo o app, inclusive para estados salvos antigos. No menu de versões, a outra estrutura ficou como "Anterior", só para comparação. Verificado em todas as telas do app em 1440×900, 1280×720 e 390×844: sem rolagem lateral (o carrossel de Formações e a tabela de participantes rolam por dentro, de propósito). Corrigido junto: os destaques de Cases voltam a uma coluna no celular e no tablet.
- **Agent Builder volta ao topo a cada etapa (09/10, corrigido):** ao Continuar, Voltar ou trocar de subtela (quando o título muda), a rolagem do builder e da página volta ao topo da nova tela. Medido em 1280×720 e 390×844: rolagem zero após cada transição.
- **Critérios dos checkpoints com subtítulo (09/10):** cada critério dos cinco checkpoints (entrega, rotina, empresa legível, aprovações e governança) ganhou uma linha em texto regular e menor que explica o que conta e dá um exemplo do mesmo caso (follow-up de orçamentos).
- **Coroa no lugar da capa (09/10):** a evolução do Hubzinho por marcos ficou mais sutil: crachá ao criar o primeiro agente, **coroa dourada** inclinada na quina da cabeça ao concluir o primeiro checkpoint (substitui a capa rosa, que parecia erro de desenho) e cérebro na antena ao concluir os Blocos 1 e 2. A coroa dá um pequeno pulo a cada 3 s, parado com redução de movimento.
- **Rolagem do onboarding (09/10, corrigido):** a trava de rolagem da página do painel destacado (o painel rola por dentro) passou a valer só no app (`data-route="app"`); com o painel como padrão, ela travava o resumo e o agendamento do onboarding.
- **Revisão do cliente de 12/10 e nova direção (cópia v5.0 em andamento):** fluxos aprovados; visual criticado como genérico e com cara de IA; pedido de sobriedade (sem robozinhos, animações, acessórios e easter eggs nesta entrega; representação dos agentes rediscutida depois da Black Friday) e revisão profunda de direção, composição, hierarquia e componentes. Referência aprovada pelo cliente: **Gumloop**. Referências complementares (Mobbin, busca ampla): Clay (três caminhos), Relevance AI (estrutura do builder), StackAI (prévia e configuração), Sana AI (agente como ícone e cor), Langdock, Linear e Amplitude (catálogo de ferramentas), Tally, Tana, Coda e Hex (início sóbrio). **Botões:** laranja na ação principal (uma por tela), azul-escuro (#0E1238) nas secundárias com peso, contorno neutro nas demais.
- **Etapa 1 aplicada (12/10):** tokens neutros (surface #F7F7F8, bordas #E2E3E8/#ECECF0, sombras quase nulas, cards com borda fina e raio 14); o agente virou um glifo chapado e estático (quadrado arredondado na cor da área com dois olhos brancos) em todo o produto; reações, comemorações, easter eggs, acessórios por data, coroa, estúdio de avatar e a tag "IA" desligados (o código fica inerte para a rediscussão futura). Próximas etapas: 2) onboarding na nova direção com os pontos do cliente; 3) Agent Builder (três caminhos, instalação com uma ação por vez, ferramentas no modelo do Composio e skills); 4) app.
- **Bundle de direção de design (12/10):** `direcao-de-design.md` é a fonte oficial para o redesenho do zero (personalidade, referências, tipografia Funnel Display + Plus Jakarta Sans, cor 60-30-10, densidade por contexto, profundidade só no que é clicável, raios, movimento, imagens, princípios de interação e o teste). Substitui os fundamentos de design antigos como guia visual. Dois campos em aberto: onde mora a ousadia da marca e a referência de fora do software.
- **Glifo do agente documentado (12/10):** o personagem minimalista (quadrado arredondado chapado na cor da área, dois olhos brancos, estático) foi aprovado pelo Johnson e ganhou documentação própria: https://claude.ai/code/artifact/6b42632f-0560-4f63-811f-67bb52a7290c (construção na grade 100 × 100, cores por área, tamanhos de 16 a 64 px, regras de uso, acessibilidade e o que fica para depois da Black Friday). SVGs de cada área em `glifo/`.
- **Decisão (12/10): recriar o design do zero.** A etapa 1 (tokens neutros e glifo sobre a composição antiga) deixou o protótipo mais sóbrio, mas com a mesma aparência de antes. O redesenho vai partir do zero, com novas composições a partir das referências (Gumloop e complementares), e não de ajustes sobre as telas atuais. Fica para uma próxima sessão; os fluxos aprovados pelo cliente continuam valendo como base de conteúdo e sequência.
- **Avatar do agente (12/10, cópia v4.14):** componente `pxAvatar` em SVG: o Pixel com rosto em matriz de LED, antena acesa, três formatos (quadrado, redondo, tela larga), cor do corpo (as cores dos Pixels), cor do rosto (branco, ciano, verde, âmbar, laranja) e ritmo (calma, normal, agitada). Sete estados ligados a situações reais: pronto (pisca), pensando, trabalhando, esperando você, feliz, bloqueado (X em vermelho) e dormindo. Na etapa "Identidade e papel" do Agent Builder, a seção "Aparência" substitui o antigo "Visual": prévia grande com inclinação de até 8° seguindo o mouse, fileira de estados e "Gerar imagem de perfil para o Telegram" (PNG 512×512, vai no Starter Kit). O agente criado leva o visual para o card de Meus agentes e para a ficha, com o estado tirado da situação real (aguardando instalação = esperando você; fonte bloqueada = bloqueado; pausado = dormindo). A estética escura e futurista continua no radar da v2.
- **Aparência em estúdio (12/10):** a Aparência saiu da coluna estreita ao lado dos campos e virou um estúdio em largura total no topo de "Identidade e papel": o avatar grande num palco com a cor do agente à esquerda, os controles à direita (rótulo acima de cada um, tudo numa linha) e a fileira dos sete estados com nome embaixo; os campos de identidade vêm logo abaixo, em largura total. No celular, empilha.
- **Radar v2 (12/10): avatar do agente e estética escura.** O cliente pediu uma estética mais escura e futurista para o Agent Builder, "quase um sistema de espionagem". Referência enviada pelo Johnson: um configurador de cabeças de robô (rosto em matriz de LED, estados com expressão própria, painel de cor e formato, antena com luz). Plano discutido (o avatar em 2D foi implementado em 12/10; fica para a v2 só a estética escura): (1) componente único de avatar do Pixel em SVG, com cor, formato (só variações do quadrado arredondado), estado e velocidade; (2) expressões em LED ligadas a estados reais (pronto, pensando, trabalhando, esperando você, feliz, bloqueado, dormindo); (3) seção "Aparência" na etapa "Identidade e papel" do Agent Builder, com imagem de perfil exportável para o bot do Telegram; (4) profundidade em 2D (camadas, brilho, inclinação de até 8°), sem voltar ao 3D. A estética escura conversa com a escolha de estilo pendente (F5.5: Operação visível e Circuito). Não entra no MVP.
- **Proposta de corte do MVP (a decidir com o cliente):** a visão do Admin com o progresso de cada participante e a evolução do Plano com histórico datado de mudanças (hoje a evolução é derivada do estado atual).
- **Pendências do cliente para o MVP:** decisão sobre conversas do Consultor (proposta: múltiplas), número do WhatsApp, lista e conteúdo dos grupos, seleção de cases (já aplicada a partir do site da Pixel).
- **Conferência canvas × protótipo (09/10):** as 7 pranchetas foram renderizadas e comparadas lado a lado com o protótipo e ajustadas (largura do conteúdo, cabeçalho, rodapés alinhados ao conteúdo, linha do tempo, coluna azul e marcadores do Agent Builder, subtarefas e coluna do Plano na Home, horários do agendamento, logos e checkboxes das ferramentas). Dois erros do protótipo corrigidos na mesma passada: o resumo lia o porte com o nome de campo errado (não mostrava "com 11–50 pessoas" e calculava o ganho sempre com o porte padrão) e a caixa de contexto do agendamento tinha a cor do fundo.
- **Claude Design (08/10):** canvas "Pixel Hub 2.0 · Telas" com 10 pranchetas editáveis, atualizado em 09/10 (abertura v7, diagnóstico com progresso, resumo, agendamento, Home com a Trilha nova, Agent Builder início e capacidades, Consultor, Cases reais, Hands-on e Mentorias): https://claude.ai/artifact/9ALTA1SwqLvWZvn7iAFniu. Design System "Pixel Hub" (tokens dos dois temas, cores dos Pixels, tipografia, raios, sombras, brand book, componentes Botão, Selo de origem, Estado do agente e Pixel, e os 9 Pixels em SVG), instalado no canvas: https://claude.ai/artifact/9iPdeN69Pu4hTvSTkqnxkR. Substitui o canvas e o Design System antigos.
- **Verificação contra a revisão do cliente (08/10):** todos os pontos conferidos. Completados nesta passada: estado do agente honesto em toda parte ("Configurado · aguardando instalação", "Instalação confirmada por você · N ferramentas aguardando conexão", "Declarado por você"; nada de "Online"); ajustar uma responsabilidade existente por texto ou voz no Agent Builder; capacidade nova sugerindo e marcando a ferramenta ligada (ex.: projeção financeira → Google Sheets).
- **Ajustes de 08/10 por comentários:** etapas do onboarding com número escuro sobre o laranja (6,2:1), concluídas em verde e pendentes com contorno, e o leitor de tela anunciando cada estado; círculos numerados do Agent Builder com contorno laranja sólido; página do Consultor numa moldura única (histórico com divisória de cima a baixo, cabeçalho da conversa e rodapé com sugestões e caixa de mensagem); selo do checkpoint integrado à linha do passo, sem a tarja solta; avisos de contexto priorizando o teste de fonte.
- **Time de Pixels (08/10):** na tela Empresa, virou uma escalação em lista, cada Pixel num card próprio de largura total (Pixel pequeno, nome, estado, progresso e "Criar agente" ou "Ver ficha"), com resumo "N prioridades · N com agente"; sem agente, o Pixel aparece dormindo; com agente, acordado.
- **Miniaturas reais (08/10):** as aulas em Formações usam recortes do único vídeo real da Pixel que temos (o de boas-vindas, com o Bruno): rosto do apresentador, tela da plataforma e logo na camiseta, alternando. Pendência: pedir ao cliente a miniatura oficial de cada aula.
- **Atalho do protótipo (08/10):** menu de versões, aba Fluxo, "Ir direto para a Home" preenche dados de exemplo e abre a Home (fica só no menu de demonstração). Correção: recarregar durante "Montando seu Plano Agêntico" deixava a tela presa; agora a geração retoma sozinha.
- **Conversa fluida (07/10):** no formato "No chat", a caixa de mensagem fica sempre no rodapé, com a mesma altura; só a dica interna muda. Dá para responder clicando, pelos números do teclado (com a caixa vazia) ou escrevendo ("3", "11 a 50", "vendas e financeiro"; no processo, o relato digitado já conta como "Sim, quero contar"). As opções entram em cascata e o foco fica sempre na caixa.
- **Formato das perguntas (07/10), versionado:** "No chat" (padrão): as opções aparecem dentro da conversa, abaixo da pergunta do Consultor, e o rodapé fica só como caixa de mensagem para as perguntas abertas. "Na caixa de resposta": pergunta e opções num cartão acima do rodapé. Alternável no menu de versões, aba Fluxo.
- **Revisão contra o documento de Onboarding (07/10):** saíram o "Pular", os contadores de pergunta e as dicas de teclado do chat, a grade das 6 dimensões no Plano, o "Para começar" da prioridade, o card de estado inicial do Membro e o botão duplicado de agendamento. Entraram o "O que pode ganhar ao longo dessa evolução" e, para o Membro, "Como contribui para a empresa". Mantido por usabilidade: "Corrigir a resposta anterior".
- **Provisório no protótipo:** a regra de posicionamento (o produto usa as regras do diagnóstico atual), o catálogo de oportunidades e os cases (ilustrativos).

### Estilo "Operação visível" (v5), 07/10
Exploração visual com mais movimento e visão agêntica, disponível no menu de versões, aba Craft, em "Estilo visual". Direção: painel de controle azul-marinho com grid e marcas "+", superfícies sólidas e técnicas, rótulos de sistema em monoespaçada, cantoneiras no item selecionado, laranja sólido como única ação. Luz e movimento só como sinal de atividade. Universo dos Pixels: olhar que segue o cursor, respiração, antena como LED de status, cabeça inclinada ao digitar, "não" no erro, piscada de "recebido", olhos felizes na fonte confirmada e no checkpoint (com confete), montagem do agente criado, texto do Consultor surgindo do desfoque, números que contam. Easter eggs: choque no duplo clique, modo foco com 5 cliques na antena, "obrigado" vira olhos de coração, código Konami faz todos dançarem, "sextou" às sextas depois das 17h. Tudo respeita redução de movimento. Referências: slide da própria Pixel, ChainGPT, assistente com orbe e bento de funcionalidades (a Query foi descartada). Pendentes do prompt: arrastar o Pixel como pêndulo, mapa de nós agente ↔ fontes com fluxo de dados, acessórios por data e coleção de easter eggs.

### Estilo "Circuito" (v5.1), 07/10
Variação da "Operação visível" sem o azul da apresentação: preto grafite quase neutro (#0B0B0D a #141417), traços de circuito finos com cantos arredondados e pads no lugar do grid, superfícies em grafite com borda de 1 px, e o laranja como único acento (barras e níveis neutros em cinza, só o gargalo em laranja). Referências: landing de protocolo cross-chain (traços e brilho monocromático), ChainGPT e painel de cidade inteligente (gráficos finos em grafite). Compartilha com a v5 os rótulos em monoespaçada, as cantoneiras, os Pixels vivos, as reações e os easter eggs. Disponível no menu de versões, aba Craft, "Estilo visual".

### Plano de execução das recomendações (07/10)
33 itens em 7 fases, com status, no Claude Doc "Pixel Hub 2.0 · Plano de execução das recomendações" (https://claude.ai/code/artifact/6a8f87cd-b197-4da3-a24f-1ec51e77d13c). Origem: padrões do Shape of AI (Trust builders e Governors), a fala do cliente sobre diferenciar humano e IA, e as pendências do estilo novo.
Entregue em 07/10: F1.1 selos "Pessoa" (círculo) e "IA" (glifo do Pixel) em Ao vivo, Formações, Cases, Comunidade e no Consultor; F1.3 estado "Recomendado" (IA) no Plano, ao lado de Declarado e Confirmado; F1.5 o Consultor mostra um cartão "Antes de registrar" e só grava no Plano depois da confirmação. F1.2 ajuda do passo em duas colunas na Home ("Com a IA": Consultor; "Com pessoas": aula do passo e próxima sessão ao vivo). F1.4 origem de cada informação no Plano inicial ("Calculado por regra", "Interpretado pelo Consultor", "Sua resposta"). Fase 1 concluída; cópia em pixel-hub-prototipo-v4.4.html. Fase 2 concluída (cópia em pixel-hub-prototipo-v4.5.html): cada resposta do Consultor mostra o conteúdo de pessoas relacionado (aula do passo, Hands-on, plantão) com selo "Pessoa"; avisos só quando o assunto pede (valores, teste de fonte); raciocínio visível em etapas enquanto pensa; perguntas sugeridas e "Parar" também na página central; cartão "Isso vale levar para uma pessoa" em dúvidas de erro ou travamento; a confirmação antes de gravar passou a valer também no modo de demonstração. Fase 8, mais animações do Hubzinho (cópia em pixel-hub-prototipo-v4.9.html): estados trabalhando (ferramenta na geração do Plano), criando (feixe de luz na geração do Starter Kit), lendo (óculos de leitura ao abrir aula) e bloqueado (alerta na tela e coçando a cabeça quando há fonte com erro); transições de viagem até o novo passo da Trilha, passagem de bastão no cartão "Com uma pessoa", teletransporte ao abrir o painel, caixa no download do Starter Kit e cabo que acende na fonte confirmada; feedback com cortina ao revelar o Plano, Pixel reagindo nos avisos, Pixel apontando o campo que falta, Pixel empurrando a contagem e o antes e depois no ganho; evolução com marcos (crachá no primeiro agente, coroa no primeiro checkpoint, cérebro na antena ao fechar o Bloco 2), prancheta em respostas longas e sequência de dias; easter eggs de pêndulo ao arrastar, tontura com o mouse em círculos, "Oi!" no hover longo, café em "bom dia", risada em "kkk", acessórios por data (Natal, festa junina, Carnaval, madrugada; menu Craft), Pixels se cumprimentando e coleção de 11 segredos (3 liberam o Ninja e 6 o Bigode Dalí no Agent Builder); ensino com o Hubzinho apontando o elemento-chave no primeiro uso de cada tela, demonstrando o microfone e espiando pela borda quando o passo atual sai de vista; ambiente com clima do Plano (nuvem com bloqueio, sol com tudo confirmado), lanterna no escuro e inclinação no celular. Fase 7, animações do Hubzinho (cópia em pixel-hub-prototipo-v4.7.html): energia na antena ligada ao progresso real (e medidor de 4 segmentos no chat do diagnóstico); "esperando você" (antena âmbar piscando e o cartão de confirmação pulsando enquanto a ação é sua); entrega até o Plano (o registro confirmado voa até o item Plano Agêntico da navegação, que dá um pulo); comemoração em níveis (pequena: piscadas; média: pulo e olhos felizes; grande: dancinha e confete no checkpoint; épica: os Pixels da empresa acenam juntos ao concluir a Trilha); demora para responder (aos 30 s ele balança e assobia, aos 60 s faz embaixadinha; qualquer movimento encerra, sem pressionar); choque com raios em todos os Pixels, que vira irritação de quadrinho no terceiro clique duplo em 8 s (fica vermelho, veia saltando, tracinhos de raiva, sobrancelhas, vapor e "Tá bom, já entendi. Vamos trabalhar?"). Valem em todos os estilos e respeitam redução de movimento. Correção: quando a pessoa cita uma fonte que não está no plano, o Consultor não chuta outra; lista as fontes previstas e oferece respostas rápidas ("Testei Extratos bancários e funcionou"), e as sugestões do Consultor já trazem um teste com uma fonte real do plano. Fase 3 concluída (cópia em pixel-hub-prototipo-v4.6.html): pergunta de esclarecimento quando a área "Outra" ou o processo relatado são ambíguos (ou o relato tem menos de 4 palavras), com as áreas como opções e respostas por clique, número ou texto; exemplos de processo ligados às áreas escolhidas, que preenchem a caixa; anexo de um exemplo real no relato, que aparece na mensagem e no Plano (no protótipo, o arquivo não é enviado).

### Versões do protótipo
O protótipo tem duas versões de fluxo, alternáveis no menu de versões, aba **Fluxo**, sem perder o progresso:

| Versão | O que é |
|---|---|
| **Atual (v2.3)** | Onboarding em 5 etapas (você e empresa, diagnóstico, prioridades, equipe, agenda), geração do plano e Agent Builder em 5 passos. É o padrão. |
| **Essencial (v3.0)** | Releitura radical e simples: 3 telas até o primeiro agente (você, sua empresa, onde o trabalho manual mais pesa) e criação do agente numa tela só (Pixel 3D, primeira tarefa, interruptor de autonomia). Diagnóstico completo, equipe, agenda, personalização e revisão ficam para depois. |

Cópia de segurança da Atual antes da Essencial: `pixel-hub-prototipo-v2.3-atual.html`.

### O que o protótipo cobre
- **Onboarding do Admin (Plano Empresa):** workspace com logo da empresa, diagnóstico em 4 perguntas, escolha dos Pixels prioritários, equipe e privacidade (até 12), agenda do onboarding coletivo, geração animada do Plano Agêntico. Etapas verticais sob o Hubzinho, com resumo das respostas e "Editar".
- **Home:** próximo passo com subtarefas e "Como fazer" por subtarefa, Trilha com 18 passos em 3 blocos e 5 checkpoints, painel do Plano Agêntico, Ao vivo do passo. Segmented "Minha Trilha / Empresa".
- **Agent Builder em tela cheia (estúdio):** 5 etapas (Template, Responsabilidades, Como trabalha, Personalizar, Revisão). Painel lateral com o Pixel em 3D e o resumo das escolhas. Personalizar: nome, tom, acabamento, expressão, acessório. Revisão: perfil de personagem.
- **Plano Agêntico:** destino, linha do tempo de estágio, agente, responsabilidades, fontes (prevista, declarada, confirmada, bloqueio), skills, lacunas. Registro de teste de fonte.
- **Checkpoints com evidência obrigatória**, modal com destaque ("declarado vira confirmado").
- **Meus agentes:** cards em largura cheia, ficha do agente (editar, pausar, personalizar, excluir com desfazer), expansão para nova área.
- **Hubzinho:** IA real via capacidade `sample` (com contexto do plano e ferramenta `registrar_teste_de_fonte`), fallback para respostas prontas, cartões dentro do chat, cochila quando inativo.
- **Ao vivo:** inscrição, dúvida enviada ao mentor, sessão simulada (palco, roteiro, chat, mão levantada, fila do plantão), gravação vai para Aprender.
- **Aprender:** playlist com thumbnails, destaque "Continue daqui", prateleiras por bloco.
- **Empresa (Admin):** card do plano com "Time de Pixels" em 3D, participantes, limites (franquia, mentoria, lugares).
- **Trilha concluída:** estado final com números, evidências em modal, expandir para nova área, virar case.
- **Menu de versões** (ferramenta de demonstração): Layout (modais ou drawers), Botão principal (neutro, laranja da marca, laranja acessível), Craft (Original ou Refinada).

### Hipótese de trabalho
A Trilha é a espinha dorsal; todo recurso aparece ligado ao passo atual. O Plano é o mapa (aonde vai e o que está confirmado); a Trilha é o caminho (o que fazer agora).

---

## 7. Histórico de sessões

### 2026-10-01 — Auditoria inicial
Auditoria heurística das telas Home e Formações: 4 achados de severidade 4, causa-raiz no laranja carregando 6+ significados. Veredito: bloquear enquanto houver severidade 4.

### 2026-10-01 a 02 — PRD, fundamentos, design system, canvas e protótipo
PRD a partir do documento "Building Blocks". Fundamentos de design. Design System com 73 tokens e 9 componentes. Canvas com 8 telas estáticas. Primeira versão do protótipo navegável e versão Refinada (30 achados de craft).

### 2026-10-02 — Rodada de comentários do cliente (CEO)
Cores dos robôs padronizadas (paleta vibrante homogênea), radio de verdade, "Como fazer" por subtarefa, modal sem piscar (atualização incremental do DOM e motion fluido), passo 1 vira a porta do Agent Builder, sessão ao vivo simulada, logo da empresa, segmented em pílula, Hubzinho com IA real, estado de Trilha concluída.

### 2026-10-05 — Fluxo no canvas, CTA laranja e correções
Fluxo tela a tela no canvas. CTA principal laranja por padrão. Correção da linha do tempo de estágio (colisão de classe CSS). Ponto do estágio atual em laranja. Aviso verde com contorno acessível. Outra sessão adicionou ficha do agente, gestão (editar, pausar, excluir), etapa Personalizar e Hubzinho que cochila; validei e publiquei.

### 2026-10-06 — Grande rodada de comentários
Agent Builder em tela cheia com painel lateral, etapas verticais no onboarding, Aprender como playlist, cartões no chat do Hubzinho, ficha mais visual, Pixel com expressão no Registrar teste, checkpoint com destaque, Pixels 3D (renders reais e derivados), "Time de Pixels" na Empresa, card de agente limpo em largura cheia, personalização (acabamento, expressão, acessório). Ícones coloridos removidos das opções a pedido do cliente.

---

### 2026-10-06 — Apresentação ao cliente e virada para os documentos
O cliente pediu que o produto siga à risca os documentos Building Blocks e Onboarding. Nasceu a v4 (Conforme documentos): onboarding em chat para os três perfis, Plano inicial com ganhos, Agent Builder em 8 passos, Consultor Pixel AI. Atual e Essencial viraram histórico. Perguntas em cartão no estilo Claude, Plano redesenhado com referências do Mobbin, revisão de hierarquia card a card, revisão visual automática.

### 2026-10-07 — Estilo agêntico, revisão contra o documento e Fases 1 e 2
Prompt visual "Operação visível" com o universo dos Pixels (olhar, respiração, antena LED, reações, montagem do agente, confete, easter eggs) e a variação "Circuito" sem azul. Revisão do fluxo inicial contra o documento (saíram Pular, contadores, grade de dimensões e outros). Perguntas dentro do chat (versionado) e conversa fluida. Inventário Shape of AI, fala do cliente sobre humano × IA e plano de execução. Fase 1 (selos Pessoa e IA, ajuda em duas colunas, estado Recomendado, origem de cada item, confirmação antes de gravar) e Fase 2 (conteúdo de pessoas relacionado, sugestões, avisos de contexto, raciocínio visível, passagem para uma pessoa, Parar) concluídas.

### 2026-10-08 — Painel destacado, 2D, Fase 8 e Agent Builder conforme o documento
Comentários do cliente no protótipo: contraste das etapas do onboarding (inclusive no escuro), contorno nos círculos numerados, Pixel 3D removido (tudo em 2D, animações em qualquer Pixel), estrutura com painel destacado (conteúdo em fundo branco dividido por linhas, painel fixo com rolagem interna), Time de Pixels como escalação em cards, miniaturas reais nas Formações, página do Consultor numa moldura com divisores, selo do checkpoint integrado à linha do passo. Correções: Home quebrada por estado salvo incompleto, geração do Plano presa após recarregar, raio do choque de volta em todos os Pixels, caixinha do Starter Kit invisível por erro de curva de animação, fonte citada fora do plano. Fase 8 com cerca de 30 animações novas. Documento "Agent Builder" recebido e builder reconstruído nos 8 passos dele.

## 8. Próximos passos

Fonte da verdade: o Claude Doc "Pixel Hub 2.0 · Plano de execução das recomendações" (https://claude.ai/code/artifact/6a8f87cd-b197-4da3-a24f-1ec51e77d13c).

### Próximos: Fase 6 antes do handoff
- F6.1 Recapturar o canvas (ainda mostra as versões antigas).
- F6.2 Atualizar o Design System (humano × IA, estados, origem, conversa, estilos escuros).
- F6.4 Specs de handoff, uma página por padrão novo.

A Fase 3 (diagnóstico completo) foi concluída em 07/10: todos os itens do documento de Onboarding estão implementados.

### Depois
- Fase 4: medidor da franquia de IA, aviso de gravação nas sessões ao vivo, controle de dados do Membro, consentimento de voz.
- Fase 5: mapa de nós agente ↔ fontes com fluxo de dados, pêndulo, acessórios por data, coleção de easter eggs, escolha do estilo com o cliente.
- Fase 6: recapturar o canvas (ainda mostra as versões antigas), atualizar o Design System, specs de handoff.

### Até o handoff (16 out)
Fases 1, 2, 3, 7, 8 e o Agent Builder entregues; falta a Fase 6 (canvas, Design System, specs). Fases 4 e 5 podem ir para o pós-lançamento (21 a 30/10), exceto a escolha do estilo (F5.5).

## 9. Perguntas em aberto (bloqueantes)

1. Quais são os 18 passos e os 5 checkpoints oficiais? O documento "Trilha — Jornada Agêntica" não chegou. Os atuais são derivados dos parágrafos dos blocos no "Building Blocks" (ver anexo do PRD).
2. Qual é a métrica de ativação?
3. O Admin tem home de praticante ou de gestor? (o protótipo resolve com o segmented "Minha Trilha / Empresa")
4. O que é "Black" no documento de produto?
5. O que acontece ao estourar a franquia de R$ 500 do Hubzinho?

---

## 10. Riscos de cronograma
- Trilha oficial ausente: os passos podem mudar e exigir retrabalho no protótipo e no canvas.
- Fontes da marca ausentes: o protótipo usa fallback, o que muda a percepção do craft.
- Decisão do laranja em aberto: afeta acessibilidade de todos os botões principais.

---

## 11. Decisões tomadas

| Decisão | Resolução |
|---|---|
| Botão principal | **Laranja da marca `#FF5A1F` por padrão** (decisão do cliente em 05/10). Contraste 3,1:1; alternativa acessível `#C43C0A` disponível no menu |
| Seleção na UI | Laranja com halo |
| Hubzinho | Pixel laranja (cor de marca, não de área) |
| Naming dos agentes | "Pixel + Área", sem "de" (Pixel Vendas) |
| Cores dos Pixels | Paleta vibrante homogênea com degradê para o corpo (`--px-*`); tons escuros (`--agent-*`) só para texto e ícone pequeno |
| Pixels 3D | Retrato padrão no Agent Builder, na ficha e no "Time de Pixels". Vendas, Marketing e Operação com renders reais; demais derivados por matiz |
| Personalização | Tom, acabamento, expressão e acessório; quando personalizado, o Pixel aparece desenhado em 2D com as escolhas |
| Agent Builder | Fluxo dedicado em tela cheia, não modal; responsabilidade escolhida uma única vez, dentro do builder |
| Passo 1 da Trilha | Abre o Agent Builder ("Criar meu primeiro agente"); concluir o builder fecha os passos 1 e 2 |
| Botões principais | Nunca "mortos": com pendência, o clique destaca o que falta |
| Escolha única x múltipla | Radio com ponto para única; checkbox para múltipla |
| Status no Plano | Ícone do tipo à esquerda e selo colorido à direita (nada que pareça controle) |
| Ícones em opções | Removidos das opções do diagnóstico e dos chips de prioridade, a pedido do cliente |
| Vídeo de boas-vindas | **Descartado por enquanto** (06/10). O vídeo da plataforma atual mostra a interface antiga; se voltar, será regravado para a 2.0, curto, e entrará depois do primeiro agente, não como etapa inicial |
| Nome do assistente na v4 | Consultor Pixel AI, sempre com selo "IA" e o Pixel laranja como rosto |
| Pixel 3D | **Removido (08/10).** Todo o sistema usa o Pixel 2D, e todo Pixel é vivo em qualquer estilo: olhar, respiração, escuta, choque com raios, irritação, modo foco, coração, Konami e "sextou" |
| Resultado do diagnóstico | Resumo visual sem CTAs de criação nem calculadora obrigatória (revisão do cliente de 08/10 prevalece sobre o documento de Onboarding nesse ponto) |
| Formato das perguntas | Área de resposta única como padrão; "No chat" é histórico |
| Agente existente | Registrado em Meus agentes, fora do Agent Builder e do resumo |
| Ganho financeiro | Tempo, custo e faturamento com premissas curtas; tempo só vira economia com premissa justificada |
| Documentação | A cada grande atualização, todos os documentos do projeto e o briefing são atualizados junto |
| Humano × IA | Pessoa = círculo, foto ou ícone de pessoa, selo "Pessoa", estático. IA = Pixel, selo "IA", vivo. Cor nunca é o único sinal |
| Estados no Plano | Recomendado (IA), Declarado (pessoa), Confirmado (evidência) |
| Registro pelo Consultor | Nada é gravado no Plano sem o cartão "Antes de registrar" ser confirmado, nos modos com IA e de demonstração |
| Revisão contra o documento | Mudanças aplicadas direto na v4, sem guardar a anterior: o documento oficial é a base |
| Documentos do cliente | Building Blocks e Onboarding são a regra (decisão do cliente em 06/10) |
| Nome do assistente | Consultor Pixel AI, com o Hubzinho como rosto |
| Campos fora do documento | Faturamento, site, LinkedIn e "o que a empresa faz" saem do onboarding (v4) |
| Versão Essencial | Aposentada como histórico; o chat do documento é a simplificação |
| Sistema único | LP e produto compartilham a mesma linguagem visual |
| Tipografia | Funnel Display (títulos) + Satoshi (texto e botões) |

---

## 12. Glossário do projeto
- **Plano Agêntico:** artefato vivo com destino, estágio, agentes, responsabilidades, fontes, skills e checkpoints. É o mapa.
- **Trilha:** 18 passos em 3 blocos com 5 checkpoints. É o caminho.
- **Declarado x Confirmado:** declarado é o que o usuário informou; confirmado é o que ele testou e registrou. A UI nunca afirma que algo externo funciona sem confirmação.
- **Starter Kit:** configuração do agente gerada no Agent Builder; não é o agente em produção.
- **Hermes:** runtime onde o agente roda.
- **Hubzinho:** assistente único da Pixel; conhece o plano e o passo, não acessa sistemas.
- **Checkpoint:** passo que exige evidência registrada para concluir.


## Prova de sensação, 12/10 (sessão de continuação)
- Protótipo novo: https://claude.ai/artifact/L28tTA8WnV2Y2Fu3j4jbaX (`pixel-hub-sensacao.html`), 13 telas, testado em 1440 × 900 e 390 × 844.
- Decisões do Johnson nesta sessão: referência de fora do software fechada (editorial como principal, sinalização nas listas); referências de controles físicos descartadas, exceto o botão de gravar no estilo gravador, que fica; tabelas seguem o painel de faturamento (seção "Tabelas e listas" do bundle); sem sobrelinhas, pontos entre palavras, status pulsando, perguntas sugeridas, chips pastel e setas nos botões; peso 400 em todo texto, 500 só em botões e cabeçalhos de seção, 600 só no logo.
- Personagem: cinco modelos no seletor (Glifo, Antena, Corpo e tela, Traço, Cabeça), cores por área do protótipo anterior (Vendas #FF8A1F, não o laranja da ação). Glifo é o padrão.

## Prova de trabalho, 13/10
- Novo protótipo: https://claude.ai/artifact/5oq4xuFWHptjqAkb37g4Ln. Base de conteúdo e fluxo: a versão "Conforme documentos" (v4) do protótipo validado, sem alterar perguntas, ordem nem regras. Mudanças só onde a revisão de 12/10 pediu: plano apresentado automaticamente após a última resposta, um único indicador de progresso no diagnóstico, estágio e gargalo fora do subtítulo, objetivo da sessão explícito, convite da equipe no agendamento, recomendado com responsabilidades, três caminhos com o mesmo peso, uma ação de avanço por vez na instalação, idioma e vocabulário fora do fluxo principal, ferramentas e skills refeitas e Consultor nas etapas de instalação e download. Saiu o estúdio de aparência do agente (sobriedade).

## Direção validada, 14/10
- O cliente validou a direção AI Hub (`pixel-hub-prototipo-hub.html`). Ela passa a ser a linguagem do produto. A direção editorial (v2 e o bundle de `direcao-de-design.md`) fica arquivada como direção visual; as regras de produto registradas nela (hierarquia em telas de fluxo, telas de celebração só para checkpoint com evidência e fechamento de bloco) continuam valendo.
