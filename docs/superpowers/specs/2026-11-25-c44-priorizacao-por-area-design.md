# c44 · Priorização de processos por área no Plano Agêntico

Data: 25/11/2026 · Projeto: Pixel Hub 2.0 (protótipo `pixel-hub/pixel-hub-produto.html`) · Card: c44, reunião Pixel <> :Zero de 18/11.

## Intenção

O card pede: "Permitir que o usuário priorize quais processos atacar primeiro, organizados por área." Não há mockup do Cayo; o desenho é nosso.

O Johnson definiu o porquê: **a Trilha é o próximo passo**. A ordem escolhida decide por onde a Trilha começa. O processo em 1º lugar vira o foco do primeiro agente (a responsabilidade "Prioritária"), e o passo 1 da Trilha ("Escolher a responsabilidade do primeiro agente") já chega com ele. Assim, a priorização deixa de ser um registro e passa a guiar o produto.

## Como o Plano funciona hoje (o que a mudança toca)

- `v4Compute()` escolhe a **área principal** pelo processo contado na entrevista (`v.a.proc` / `procArea`); sem processo, pela primeira área marcada em `inef`. Dela saem `prim` (a oportunidade principal, com a redução `red`), o agente recomendado e as responsabilidades do Agent Builder (`abNovo`, `recResps`, `prio`).
- Seção 4, "Oportunidades e processos" (accordion da revisão), lista: os processos da entrevista (`entProcs`, com frequência, tempo e horas gastas, selo "Declarado", via `fontes/plano-entrevista.js`) e, depois, as oportunidades sugeridas (`apps`, de `V4_CAT[área].opps`, selo "Sugerido"). Lista única, sem área e sem ordem.
- Seção 3, "Responsabilidades e agentes", já marca uma responsabilidade como "Prioritária".
- A aba Equipe (`fontes/plano-equipe.js`, c41) já agrupa processos por área com as horas de hoje.

O conflito atual é ter duas noções de prioridade, a da lista e a "Prioritária", sem ligação entre elas. A mudança junta as duas.

## Objetivos

1. A pessoa vê os processos e as oportunidades **agrupados por área**, numa ordem sugerida pelo Consultor, com o motivo de cada posição.
2. A pessoa aceita a sugestão ou muda a ordem: sobe ou desce um item dentro da área, ou escolhe "Atacar primeiro" em qualquer item.
3. O item em 1º lugar define a área principal e a oportunidade principal. Daí em diante, o resto segue com o que já existe: o agente recomendado, a responsabilidade "Prioritária", as horas do "Resultado esperado" e o passo 1 da Trilha.
4. Depois de priorizar, a seção diz por onde a Trilha começa, e o botão "Ir para a Trilha", que já existe em "Próximos passos", leva até lá. Não há botão novo.

## Fora do escopo

- Matriz de impacto × esforço e estimativa de dificuldade. A entrevista não mede esforço, então seria inventado.
- Arrastar e soltar. Subir, descer e "Atacar primeiro" bastam e funcionam no teclado e no celular.
- Priorização coletiva da equipe (votos, consenso). A aba Equipe continua só de leitura.
- Valor em R$ por item. Só entra se o custo da hora já tiver sido informado (c43); nesse caso aparece no motivo.

## O que seria fracasso mesmo funcionando

- Uma ordem que não muda nada: a Trilha e o agente ignoram a escolha.
- Duas prioridades em lugares diferentes que discordam entre si.
- Números ou motivos inventados. Todo motivo precisa sair de dado que o protótipo tem.
- Mais um bloco no Plano. A priorização **substitui** a lista da seção 4 em vez de somar uma seção nova ("um bloco, uma ideia").

## Caminhos considerados

- **A. Ordem manual por área.** Lista agrupada, a pessoa ordena tudo. Dá controle total, mas é trabalho manual e não ajuda a decidir.
- **B. Matriz impacto × esforço.** É visual e ajuda a decidir, mas o esforço seria inventado e o formato não funciona no celular.
- **C. O Consultor sugere e a pessoa confirma.** **Escolhido.** O Johnson definiu o objetivo e deixou o modo comigo; escolhi o C. A pessoa parte de uma boa resposta, com o motivo à vista. Usa só dados reais e mantém a voz do Consultor.

## Desenho

### Onde

Seção 4 do "Seu plano". O título passa a ser **"Por onde começar"**, com uma linha de apoio: "O Consultor ordenou pelo que devolve mais tempo. Mude a ordem se a sua prioridade for outra." Sugestão de texto, para o Johnson revisar. Se a seção estiver num accordion, esta abre por padrão.

### Esboço

```
4  Por onde começar                                   Sugestão do Consultor
   O Consultor ordenou pelo que devolve mais tempo. Mude a ordem se…

   Vendas e comercial                                  ≈ 8 h por mês hoje
   ┌──────────────────────────────────────────────────────────────────┐
   │ 1  Follow-up de orçamentos parados      [Atacar primeiro]   ↑ ↓  │
   │    Da sua entrevista · 2–4 h de volta por mês                     │
   │ 2  Relatório de vendas para a diretoria                 ⋯   ↑ ↓  │
   │    Da sua entrevista · 1–2 h de volta por mês                     │
   │ 3  Propostas comerciais a partir de um briefing          ⋯   ↑ ↓ │
   │    Sugerido pelo Consultor para a área                            │
   └──────────────────────────────────────────────────────────────────┘
   Atendimento ao cliente                              ≈ 17 h por mês hoje
   │ 1  …                                                             │

   A Trilha começa por "Follow-up de orçamentos parados".   (frase; o botão "Ir para a Trilha" continua só em "Próximos passos")
   Voltar à sugestão do Consultor   (só quando a ordem foi mudada)
```

### Regras

- **Itens.** Processos da entrevista (`entProcs`) e oportunidades da área (`V4_CAT[área].opps`).
  - **Ligação processo → oportunidade.** Em cada área, o 1º processo declarado absorve `opps[0]` daquela área, como o Plano já faz hoje (`prim` = `opps[0]`, `relato` = texto do processo). Os processos seguintes da mesma área absorvem `opps[1]`, `opps[2]` e assim por diante. O item mostra o processo como título e a linha "Agente sugerido: <título da oportunidade>". As oportunidades não absorvidas entram como "Sugerido pelo Consultor para a área". Assim não há duplicata.
  - **Área de cada processo.** O 1º usa `procArea`. Os outros usam `v4AreaFromText(texto)`. Se nada casar, o processo fica na área principal atual. O bloco acrescenta um id de área aos itens de `entProcs`, sem mudar a função original.
  - **Sem entrevista concluída** (por exemplo, "Entrevista: Feita" nos Ajustes): entram só as oportunidades das áreas de `inef`.
- **Áreas.** Um grupo por área, com o nome de `V4_CAT[área].areaN` e o total "≈ N h por mês hoje" quando houver horas declaradas.
- **Ordem sugerida.**
  - Dentro da área: primeiro os processos declarados, por horas de volta (h × `red` da oportunidade da área), da maior para a menor; depois as oportunidades sugeridas, na ordem do catálogo.
  - Entre as áreas: pela soma das horas de volta. Sem horas, pela ordem de `inef`.
  - O 1º da 1ª área é o "1º geral".
- **Motivo, uma linha por item.** Origem ("Da sua entrevista" ou "Sugerido pelo Consultor para a área") e, se houver, "A–B h de volta por mês". A conta é h do processo × `red` da oportunidade ligada, a mesma regra do `plano-entrevista.js`. Se o custo da hora existir (`S.custoH`, c43, já feito em `fontes/plano-reais.js`), acrescenta "R$ X–Y". Nada além disso.
- **Ações por item.**
  - "Atacar primeiro" leva o item ao 1º da área e a área ao topo.
  - "Subir" e "Descer" movem o item dentro da área.
  - O 1º geral mostra o selo "Atacar primeiro" no lugar da ação.
- **Estado.**
  - A ordem fica em `S.prio` (lista de ids).
  - Ids: processo `p1`–`p3`, oportunidade com o id do catálogo (`v1`, `v2`…).
  - `S.prio` zera quando a entrevista é refeita ou o perfil muda; com ids que já não existem, a ordem volta à sugestão. Enquanto ela segue a sugestão, o cabeçalho mostra o selo "Sugestão do Consultor" (`stTag("rec")`).
  - Depois de qualquer mudança, o selo vira "Ordem sua" (`stTag("dec")`) e aparece o link "Voltar à sugestão do Consultor".
- **Efeito do 1º geral.**
  - `v4Compute` passa a usar o 1º geral como processo principal. A área principal vira a área do item, e `prim` vira a oportunidade ligada a ele, com `relato` igual ao texto do processo quando houver.
  - **"Resultado esperado na primeira fase"** passa a mostrar as horas de volta do 1º geral (h × `red`) quando ele é um processo declarado. É o primeiro agente, então o número é o dele. Hoje o bloco soma todos os processos da entrevista; a soma da equipe continua na aba Equipe. Quando o 1º geral é uma oportunidade sugerida, vale o cálculo atual (`v4Gains`) com o `red` dela.
  - Daí em diante seguem sem código novo: "Resultado esperado", agente recomendado, "Prioritária" e Agent Builder.
  - Ao mudar o 1º geral, o aviso (`aviso()`, o toast do produto) diz: "A Trilha agora começa por <item>."
  - Se o primeiro agente **já foi criado** (`S.abFeito`), `v4Compute` ignora `S.prio` e o Plano, o agente e a Trilha ficam como estão. Assim os três nunca discordam. O aviso diz: "O seu primeiro agente continua com <responsabilidade>. <item> fica para o próximo agente." O selo do 1º geral vira "Próximo agente".
- **Perfis.**
  - Admin e Individual reordenam.
  - O Membro vê a ordem sem os botões, com a nota "Definida pelo Admin". No protótipo cada perfil tem o seu estado, então o Membro vê a ordem sugerida, a menos que `S.prio` já exista.
  - A aba Equipe não muda.
- **Acessibilidade.**
  - Botões com rótulo: "Subir <item>", "Descer <item>", "Atacar primeiro: <item>".
  - O foco fica no item movido.
  - Uma região `aria-live` anuncia a nova posição ("<item>: 2º em Vendas e comercial").
  - Subir fica desativado no 1º da área e Descer no último.

### Peças reaproveitadas

`plSec`, as listas `.pl-l` (bolinha, título 16, linha de apoio 14 e selo à direita), `stTag`, `pill`, as tags do sistema, `.btn-g btn-sm` e o padrão de "Ir para a Trilha" que já existe no Plano. Estilo no sistema revisado: tipos 30/24/20/16/14/12, espaços em múltiplos de 4, raios 20/12/10. Os ícones de seta vêm da biblioteca (`chevron` girado ou `seta`), em 16 px.

## Decisões do autor (Claude), para o Johnson conferir

1. O título "Por onde começar" e a linha de apoio.
2. A ordem por horas de volta como critério da sugestão.
3. O Membro só vê a ordem, sem editar.
4. Com o agente já criado, o 1º geral vira "Próximo agente" e não troca o agente existente.
5. Cada processo absorve uma oportunidade da sua área, na ordem do catálogo, e o título do item é o processo, com "Agente sugerido".
6. "Resultado esperado" passa a mostrar as horas do 1º geral, e não a soma dos processos (que vai para a aba Equipe).
7. Não há botão novo para a Trilha: a seção diz por onde a Trilha começa e usa o "Ir para a Trilha" que já existe.

## Para quem constrói

- Bloco novo `fontes/plano-prioridade.js`, acrescentado ao fim de `pixel-hub-produto.html`. Ele sobrescreve `telaPlano`, para trocar o conteúdo da seção 4, e `v4Compute`, para respeitar `S.prio`. Depois, `python3 fontes/embed.py`.
- Testes: Playwright em 1440 × 900 e 390 × 844, nos três perfis, sem erros no console e sem rolagem lateral. Mais quatro checagens:
  1. Trocar o 1º geral entre processos de áreas ou `red` diferentes muda o "Resultado esperado".
  2. Trocar o 1º geral muda a "Prioritária" e o passo 1 da Trilha.
  3. O teclado alcança subir, descer e "Atacar primeiro", e o foco fica no item.
  4. "Voltar à sugestão" restaura a ordem.
- Verificação independente (ui-consistency:verifying) antes de publicar. Publicar nos dois links e atualizar o briefing.
