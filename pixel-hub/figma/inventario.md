# Pixel Hub 2.0 · Inventário de telas e regras de negócio (para o Figma)

Levantado em 27/11/2026 a partir do protótipo. Fontes, em ordem de autoridade: `pixel-hub-produto.html` (a última definição de cada função vence), `artifacts/14a3f57a-…/index.html` (casca: acesso e entrada), `exploracoes/entrevista-imersiva/app.jsx`, `briefing-novo-chat.md` (decisões mais recentes vencem), `context.md` e `fontes/*.js`.

Como ler as origens: `(produto: fn)` = função no produto; `(plano-v2.js)` = bloco em `fontes/`; `(casca: telaAuth)` = artefato do protótipo completo; `(app.jsx)` = entrevista imersiva; `(briefing dd/mm)` = entrada do histórico. Nada aqui foi inventado: o que não tem origem está em Pendências como "a confirmar".

Convenções para o Figma:
- Desenhar só as versões padrão: Sistema visual **Revisado**, Interface **Limpa**, Plano **Novo**, Entrevista **Imersiva**, Trilha **Agora**, Pixel no cartão de template **Solto**, Banner da entrevista **Enxuto** (painel Ajustes do protótipo). As versões "Anterior", "Lista", "Estudo A/B", "Conversa" etc. ficam fora, salvo EN6 (marcada como versão em teste).
- Texto da tela: o produto troca "bloco" por "fase" e "Base de conhecimento" por "Conteúdo complementar" depois de pintar (produto: `VOC_TROCAS`, `vocAplicar`). No Figma, usar sempre "fase" e "Conteúdo complementar", mesmo onde o código ainda diz "bloco".
- Perfis: `S.profile` = `admin` (Company Gestor, Renata Lacerda, Bertoni Móveis), `membro` (Company Membro, Carla Mendes) e `individual` (Founder, Paulo Andrade) (produto: `fullName`, `amostra`, `A.ob2Abrir`).
- Como reproduzir: os comandos valem no console da janela do produto (`pixel-hub-produto.html` ou `home/pixel-hub-produto-home.html`; no protótipo completo, dentro do `iframe#produto`). Trocar de perfil com dados de exemplo: `S.profile='membro'; amostra(); R()`. O painel "Ajustes do protótipo" (botão no canto) faz o mesmo sem console.

---

## Fluxos, na ordem proposta

| # | Prefixo | Fluxo | Telas |
|---|---|---|---|
| 0 | AC | Acesso e entrada | 13 |
| 1 | ON | Onboarding 2.0 | 3 |
| 2 | IN | Início | 4 |
| 3 | EN | Entrevista | 6 |
| 4 | PL | Plano Agêntico | 3 |
| 5 | TR | Trilha (Agora, Mapa, Conteúdo complementar, aulas) | 10 |
| 6 | FS | Ferramentas e skills | 5 |
| 7 | AG | Agentes e Agent Builder | 9 |
| 8 | ME | Mentorias e agenda | 3 |
| 9 | CO | Comunidade e Cases | 4 |
| 10 | EM | Empresa, Conta e Ajustes | 5 |
| 11 | CS | Consultor, Suporte, notificações e estrutura | 7 |

Ajustes em relação à ordem pedida, e por quê:
1. **AC (Acesso e entrada) entra antes do Onboarding.** O protótipo completo abre em "Entrar no Pixel AI Hub" e só depois do login abre o onboarding 2.0 (casca: `auEntrarOk` + `irOnb2`). O canvas de 20/10 já tratava "Acesso e entrada" como página própria, com 14 telas (briefing 20/10).
2. **Início vem antes da Entrevista.** No produto, o fim do onboarding ("Ir para o Hub") leva ao Início (produto: `A.ob2Hub` → `ir("home")`), e a entrevista começa pelo banner "Seu primeiro passo" do Início ou pelo Plano vazio (produto: `irEntrevista`); "Fazer depois" na entrevista volta ao Início (entrevista-imersiva.js). Ao terminar, a entrevista abre o Plano (briefing 26/11).
3. **Agent Builder, caso real e celebrações ficam em AG**, junto da lista e da ficha: são as telas do ciclo de vida do agente (produto: `telaAB`, `telaCaso`, `telaCheckpoint`, `telaMarco`).
4. **Menu lateral, topo, caixa do Consultor e avisos ficam em CS**, como estrutura comum a todas as telas. O painel "Ajustes do protótipo" e a tela de área bloqueada (plano só Formação) ficam em EM.

Fora do inventário (versões anteriores, só para comparação no protótipo): onboarding antigo com diagnóstico em chat (`telaAbertura`, `telaChat`, `telaGera`, `telaResumo`, `telaAgenda`; casca-onb2.js), tela provisória da entrevista (`telaEntrevistaProv`, sobrescrita por `telaEntrevista`), Trilha Lista/Estudos A e B/versões antigas, Conteúdo complementar Central/Painel/Biblioteca/Pílula, Plano "Anterior", catálogo de Formações (`telaTrilhaAulas`, sem rota desde que a aba Aulas virou Conteúdo complementar; produto: `telaTrilhaNova`).

---

## 0. AC · Acesso e entrada

Tudo na casca do protótipo completo (`artifacts/14a3f57a-…/index.html`, função `telaAuth`, estado `S.tela="auth"`, `S.au=<tela>`). Layout comum: coluna do formulário + lateral com degradê em movimento ("Do trabalho manual a agentes trabalhando pela sua empresa.") e rodapé com Suporte, Termos de uso e Privacidade (casca: `auLado`, `telaAuth`). Para reproduzir qualquer uma: no protótipo completo, Ajustes › Acesso, ou `A.auSalto('<tela>')` no console da casca.

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| AC1 | Entrar | `telaAuth`, `S.au='login'` | todos | padrão; erro de campo; e-mail sem conta; senha errada com aviso de tentativas; aviso "Você saiu da conta"; aviso "Senha nova salva" | abrir o protótipo completo |
| AC2 | Recuperar a senha | `S.au='esqueci'` | todos | padrão; e-mail inválido | `A.auSalto('esqueci')` |
| AC3 | Confira o seu e-mail | `S.au='enviado'` | todos | padrão; "Link reenviado" (botão desativado) | AC2 › Enviar o link |
| AC4 | Crie uma senha nova | `S.au='nova'` | todos | requisitos ao vivo; senha fraca; senhas diferentes | AC3 › Abrir o link do e-mail |
| AC5 | Link vencido | `S.au='vencido'` | todos | único | `A.auSalto('vencido')` |
| AC6 | Acesso bloqueado | `S.au='bloqueada'` | todos | único | 5 senhas erradas (e-mail com "erro") |
| AC7 | Crie o seu acesso (convite) | `S.au='convite'` | membro | padrão; nome vazio; senha fraca; termos não aceitos | `A.auSalto('convite')` |
| AC8 | Convite expirado | `S.au='convExp'` | membro | único | `A.auSalto('convExp')` |
| AC9 | Convite já usado | `S.au='convUsado'` | membro | único | `A.auSalto('convUsado')` |
| AC10 | Empresa sem lugares | `S.au='semLugar'` | membro | único | `A.auSalto('semLugar')` |
| AC11 | Confirme o seu e-mail (compra) | `S.au='compra'` | admin, individual (texto do plano muda) | padrão; código incompleto; código errado | `A.auSalto('compra')` |
| AC12 | Crie a sua senha (compra) | `S.au='compraSenha'` | admin, individual | requisitos; senhas diferentes | AC11 › Confirmar |
| AC13 | Ajuda para entrar | `S.au='ajuda'` | todos | FAQ fechado/aberto; chamado com erro; "Chamado enviado" | `A.auSalto('ajuda')` |

### AC1 · Entrar
- **Objetivo:** entrar com o e-mail da compra ou do convite.
- **Quando aparece:** na abertura do protótipo completo; depois de "Sair da conta" (EM3).
- **Vem de:** EM3, AC2 a AC13 (Voltar para entrar).
- **Ações:** Continuar com Google: entra → ON1. Entrar: valida e entra → ON1. Esqueci a senha → AC2. Conheça os planos: aviso de protótipo. Suporte (rodapé) → AC13.
- **Regras:**
  - E-mail precisa ter formato válido; senha não pode estar vazia (casca: `auEntrar`).
  - E-mail sem conta mostra "Não encontramos uma conta com este e-mail…" (no protótipo, e-mail com "novo") (casca: `auEntrar`).
  - Senha errada limpa o campo; da 3ª à 4ª tentativa aparece "Mais N tentativas e o acesso fica bloqueado por 15 minutos"; na 5ª vai para AC6 (casca: `telaAuth`, `auEntrar`).
  - "Manter conectado" vem marcado (casca: `telaAuth`).
  - Enter no campo aciona o botão principal (casca: keydown).
  - Depois de entrar, abre o onboarding 2.0 do perfil (casca-onb2.js).
- **Estados:** padrão; erro por campo (borda e texto); aviso azul "Você saiu da conta. Entre de novo quando quiser. Nada do que você fez se perdeu."; aviso verde "Senha nova salva".
- **Pendências:** autenticação real e política de bloqueio a validar com o dev (briefing, Pendências 4: c37).
- **Exemplo:** e-mails e o nome da empresa (Bertoni Móveis, Renata Lacerda) são de exemplo (casca: `AU_EMP`).

### AC2 · Recuperar a senha
- **Objetivo:** pedir o link para criar uma senha nova.
- **Vem de:** AC1, AC5, AC6, AC9, AC13.
- **Ações:** Enviar o link → AC3. Voltar para entrar → AC1.
- **Regras:** e-mail pré-preenchido com o que foi digitado em AC1; valida formato (casca: `auEnviarLink`).
- **Estados:** padrão; e-mail inválido.

### AC3 · Confira o seu e-mail
- **Objetivo:** dizer que o link foi enviado e por quanto tempo vale.
- **Vem de:** AC2.
- **Ações:** Abrir o link do e-mail (protótipo) → AC4. Reenviar o link: aviso "Link reenviado. Ele vale por 1 hora." e o botão vira "Link reenviado", desativado. Voltar para entrar → AC1.
- **Regras:** o texto não confirma se a conta existe ("Se houver uma conta com…"); o link vale 1 hora; lembrar do spam (casca: `telaAuth` 'enviado').
- **Pendências:** o botão "Abrir o link do e-mail" é só do protótipo.

### AC4 · Crie uma senha nova
- **Objetivo:** definir a senha nova pelo link.
- **Vem de:** AC3.
- **Ações:** Salvar e entrar → AC1 com o aviso "Senha nova salva".
- **Regras:** requisitos mostrados ao vivo: pelo menos 8 caracteres; letras e números; diferente de senhas óbvias (12345678, senha123, password) (casca: `auSenhaReq`). As duas senhas precisam ser iguais (casca: `auValida`).
- **Estados:** requisito cumprido com check; erro "A senha ainda não cumpre os requisitos abaixo." ou "As duas senhas não são iguais."

### AC5 · Link vencido
- **Objetivo:** explicar que o link de senha expirou.
- **Ações:** Pedir um link novo → AC2. Voltar para entrar → AC1.
- **Regras:** link vale 1 hora e um uso só (casca: `telaAuth` 'vencido').
- **Estados:** único (componente de estado com ícone âmbar, `auEstado`).

### AC6 · Acesso bloqueado
- **Objetivo:** avisar o bloqueio por tentativas.
- **Vem de:** AC1 (5ª senha errada).
- **Ações:** Criar uma senha nova → AC2. Falar com o suporte → AC13.
- **Regras:** bloqueio de 15 minutos depois de 5 tentativas (casca: `telaAuth`, `auEntrar`; produto: `SUP_FAQ`).

### AC7 · Crie o seu acesso (convite)
- **Objetivo:** o Membro convidado cria o acesso.
- **Quando aparece:** pelo link do convite enviado pelo Admin (EM1).
- **Ações:** Continuar com Google → ON1 como Membro. Criar acesso e começar → ON1 como Membro. Termos de uso / Política de privacidade: aviso de protótipo. Entrar → AC1.
- **Regras:**
  - Mostra quem convidou e para qual empresa ("Renata Lacerda convidou você para o Pixel AI Hub da Bertoni Móveis") (casca: `telaAuth` 'convite').
  - O e-mail vem travado: "É o e-mail do convite. Para usar outro, peça um convite novo." (casca).
  - Exige nome, senha nos requisitos e aceite dos termos (casca: `auCriarConv`).
- **Estados:** padrão; erros de nome, senha e termos.
- **Pendências:** o subtítulo ainda diz "Depois disso, você faz o seu diagnóstico…"; o diagnóstico saiu do onboarding em 19/11 (briefing 19/11). Trocar a copy (a confirmar).
- **Exemplo:** carla@bertoni.com.br.

### AC8 · Convite expirado
- **Ações:** Pedir um convite novo: aviso "Pedido enviado para Renata Lacerda." Já tenho acesso → AC1.
- **Regras:** convites valem 7 dias (casca: 'convExp'; produto: `SUP_FAQ`).

### AC9 · Convite já usado
- **Ações:** Entrar → AC1. Não lembro a senha → AC2.
- **Regras:** um convite serve uma vez (casca: 'convUsado', 'ajuda').

### AC10 · Empresa sem lugares
- **Ações:** Avisar Renata: aviso de pedido enviado. Falar com o suporte → AC13.
- **Regras:** os 12 lugares do plano estão ocupados; o Admin pode liberar um lugar ou ampliar o plano; o convite continua valendo (casca: 'semLugar').
- **Exemplo:** 12 lugares (casca: `AU_EMP`).

### AC11 · Confirme o seu e-mail (compra)
- **Objetivo:** primeiro acesso de quem comprou (Admin ou Individual).
- **Ações:** Confirmar → AC12. Reenvie o código: aviso "Código novo enviado…" e limpa os campos.
- **Regras:**
  - Selo do plano no topo: "Plano Empresa, 12 lugares" ou "Plano Individual", com "Compra confirmada" (casca: 'compra').
  - Código de 6 dígitos, um por campo; digitar passa ao próximo; colar distribui; apagar volta (casca: eventos `.au-cd`).
  - Menos de 6 dígitos: "Escreva os 6 dígitos do código."; código errado: "Este código não confere…" (casca: `auConfCod`).
- **Pendências:** "No protótipo, qualquer código de 6 dígitos funciona, menos 000000" é texto de protótipo; não desenhar.

### AC12 · Crie a sua senha (compra)
- **Ações:** Criar acesso e começar → ON1.
- **Regras:** mesmos requisitos de AC4 (casca: `auValida`).

### AC13 · Ajuda para entrar
- **Objetivo:** resolver problemas de acesso sem entrar.
- **Ações:** perguntas em acordeão (uma aberta por vez); "Recuperar a senha" → AC2; Enviar o chamado → estado "Chamado enviado"; Voltar para entrar → AC1.
- **Regras:** quatro perguntas fixas (esqueci a senha; não recebi o e-mail; convite expirou ou foi usado; não sei qual e-mail usei); o chamado exige nome e e-mail válido (casca: 'ajuda', `auChamado`).
- **Estados:** FAQ; erros do chamado; confirmação verde "A equipe da Pixel responde no e-mail que você informou."

---

## 1. ON · Onboarding 2.0

Função `telaOnb2`, `S.scr='onb2'`, estado `S.ob2={f,i,r}` com `f` = `founder` | `gestor` | `membro` e `i` = −1 (visão geral), 0…n−1 (perguntas), n (fim) (produto). O perfil define o fluxo: admin → Gestor, membro → Membro, individual → Founder (produto: bloco "onboarding 2.0 como entrada padrão"). Tela cheia, sem menu; topo com o logo, as etapas e o nome do perfil.

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| ON1 | Bem-vindo à Pixel (visão geral) | `telaOnb2`, `S.ob2.i=-1` | 3 (texto e etapas mudam) | único por perfil | Ajustes › Onboarding por perfil, ou `A.ob2Abrir('gestor')` |
| ON2 | Pergunta | `S.ob2.i=0…n−1` | 3 (perguntas mudam) | texto com sugestões; escolha única; múltipla; Continuar desativado | ON1 › Começar as perguntas |
| ON3 | Pronto | `S.ob2.i=n` | Founder e Gestor com agendamento; Membro sem | com / sem agendamento | responder até o fim |

### ON1 · Bem-vindo à Pixel
- **Objetivo:** abrir o onboarding com o Consultor e dizer o esforço.
- **Quando aparece:** logo depois de entrar (AC1, AC7, AC12) e no "Voltar ao onboarding" dos Ajustes (casca-onb2.js).
- **Vem de:** AC1, AC7, AC12, EM5.
- **Ações:** Começar as perguntas → ON2.
- **Regras:**
  - Etapas no topo: Founder "Visão geral, Sobre você e a empresa, Onboarding coletivo"; Gestor "Visão geral, Sobre a empresa, Onboarding da empresa"; Membro "Visão geral, Sobre você" (produto: `OB_FLUXOS`).
  - Texto de abertura do Consultor por perfil; o do Membro diz que a empresa já está cadastrada e que não vai repetir as perguntas sobre ela (produto: `OB_FLUXOS.*.abre`).
  - Linha "N perguntas rápidas. Leva uns 2 minutos." (Founder e Gestor 8, Membro 5) (produto: `telaOnb2`).
  - Só identifica: o plano vem depois, na entrevista (produto: comentário do c36; briefing 19/11).
- **Exemplo:** o vídeo do Bruno é uma capa sem player; a capa usa um frame do IBGC On-demand (briefing 09/11).
- **Pendências:** trocar a capa do vídeo por um frame da Pixel (briefing, Pendências 7).

### ON2 · Pergunta
- **Objetivo:** coletar uma resposta por vez.
- **Ações:** escolher sugestão / opção / várias opções; Continuar (ou Concluir na última) → próxima pergunta ou ON3; Voltar → pergunta anterior ou ON1. Enter no campo de texto avança.
- **Regras:**
  - Founder: nome; cargo (sugestões: Fundador/Sócio, C-level, Gestor/Head, Analista/Especialista); empresa; setor (12 sugestões); o que vende; pessoas (Só eu, 2–10, 11–50, 51–100, mais de 100); faturamento anual (8 faixas); onde gasta mais tempo (múltipla, 6 opções) (produto: `OB_FLUXOS.founder`, `OB_*`).
  - Gestor: nome; cargo; empresa; segmento; o que vende; pessoas; áreas que a empresa tem (múltipla, 7 áreas); faturamento (produto: `OB_FLUXOS.gestor`).
  - Membro: nome; função; área (escolha única entre as 7); principais atribuições; onde gasta mais tempo (produto: `OB_FLUXOS.membro`).
  - Texto vazio não avança: "Escreva uma resposta ou escolha uma das sugestões." (produto: `ob2Prox`). Escolha e múltipla desativam Continuar até haver resposta (produto: `telaOnb2`).
  - Barra de progresso "i de n" (produto: `telaOnb2`).
  - O que o onboarding coleta (nome, cargo, empresa, setor, pessoas, área) passa para o produto e não é perguntado de novo na entrevista (produto: `A.ob2Hub`; entrevista.js: `ENT_ID`, `entComecar`).
- **Estados:** campo de texto com chips de sugestão; opções grandes de escolha única (radio); múltipla com check e "Pode marcar mais de uma."; Continuar desativado.
- **Pendências:** "Faturamento" volta no onboarding 2.0, mas uma decisão de outubro tirou o campo (context.md §11, "Campos fora do documento"). Vale a mais recente (c36, briefing 06/11); confirmar com o Johnson.

### ON3 · Pronto
- **Objetivo:** fechar o onboarding e apontar a entrevista como primeira pendência.
- **Ações:** Agendar o onboarding coletivo (Founder) / da empresa (Gestor): aviso de protótipo (abre o Calendly com o contexto). Ir para o Hub → IN1 (com o vídeo de boas-vindas, IN4).
- **Regras:**
  - Resumo do que foi dito: Membro mostra função, área e atribuições; os outros mostram empresa, cargo, setor, pessoas e faturamento (produto: `telaOnb2`).
  - Membro não agenda (produto: `OB_FLUXOS.membro.agenda=null`).
  - Com agendamento, "Ir para o Hub" vira secundário (o laranja fica no agendamento) (produto: `telaOnb2`).
  - Ao ir para o Hub: entrevista pendente e vídeo de boas-vindas ainda não visto (produto: `ob2Hub`).
- **Pendências:** embed do Calendly e retorno do horário para o produto, a validar com o dev (briefing 16/10).

---

## 2. IN · Início

Função `telaInicio` (várias camadas: home.js, home2.js, k5.js, est2/estágio, hp2 enxuto), `S.scr='home'`. Topo: "Bom dia, {nome}" e a data, "Consultor no WhatsApp" e o sino (produto: `topoApp`). Título fixo "O que importa hoje, num lugar só" (home2.js).

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| IN1 | Início antes da entrevista | `telaInicio`, `S.entrev=false` | 3 (Pendência do onboarding some no Membro) | com/sem Pendências | `S.entrev=false; ir('home')` |
| IN2 | Início depois da entrevista | `telaInicio`, `S.entrev=true` | 3 | próximo passo em 3 travas; com/sem estágio; Seus agentes vazio/com agente | Ajustes › Entrevista: Feita, ou `S.entrev=true; ir('home')` |
| IN3 | Sua jornada, fase por fase (seção) | `hfBloco` (k5.js) | 3 | fase atual/futura/concluída; hands-on antes/em 30 min/ao vivo/encerrado | Ajustes › Hands-on ao vivo |
| IN4 | Como a Pixel funciona (janela) | `bvModal`, `S.bvAberto=true` | 3 | único | Ajustes › Primeiro acesso |

### IN1 · Início antes da entrevista
- **Objetivo:** levar a pessoa à entrevista, o primeiro passo.
- **Quando aparece:** depois do onboarding, até a entrevista terminar.
- **Vem de:** ON3, menu (CS6), EN1 (Fazer depois).
- **Ações:** Começar a entrevista → EN1. Agendar / Já agendei (Pendências): tira a pendência, aviso de protótipo. Assistir (vídeo pulado) / dispensar ✕. Fase no seletor → muda IN3. Continuar a trilha → TR1. Ir para a etapa 1 (Seus agentes) → TR1. Novo agente (com cadeado) → AG9. Vídeo "Como a Pixel funciona": aviso de protótipo. Consultor no WhatsApp: aviso. Sino → CS5.
- **Regras:**
  - Ordem: título; banner do próximo passo; Pendências; Sua jornada, fase por fase; Seus agentes; Para rever como a Pixel funciona; caixa do Consultor (home2.js, k5.js).
  - Banner "Seu primeiro passo: Monte o seu Plano Agêntico com o Consultor. Uma conversa de uns 15 minutos sobre a sua rotina." com o único botão laranja da tela (produto: `hoProximo` enxuto; briefing 09/11 e 04/11).
  - Pendências: "Agende o seu onboarding" só para quem agenda (não Membro) e enquanto não clicar Agendar ou Já agendei; "Assista: Como a Pixel funciona" só se o vídeo foi pulado em IN4, com dispensar (k5.js: `homePend`). Contador ao lado do título.
  - Seus agentes enquanto a Fase 1 não termina: "O seu primeiro agente nasce pela etapa 1 da Trilha. O Agent Builder do menu libera quando a Fase 1 terminar." com "Ir para a etapa 1"; "Novo agente" com cadeado (home2.js; trava em `abTravado` = sem Fase 1 e sem agentes de exemplo).
  - Sem o estágio (ele sai da entrevista) (produto: estágio na Home).
  - O Membro não tem a pendência de agendamento (k5.js).
- **Estados:** com 0, 1 ou 2 pendências; primeira visita com IN4 por cima.
- **Exemplo:** vídeo do Bruno sem player (aviso de protótipo).

### IN2 · Início depois da entrevista
- **Objetivo:** mostrar o próximo passo da jornada e o estágio.
- **Vem de:** EN4/PL2, menu.
- **Ações:** botão do próximo passo (ver regras) → TR1 ou FS3 (Segundo Cérebro). Abrir o Plano → PL2. Abrir a ficha (Seus agentes) → AG3. Novo agente → AB (AG4) se liberado, senão AG9. Demais como IN1.
- **Regras:**
  - Próximo passo com "Plano montado. Seu próximo passo", seguindo as travas (produto: `hoProximo`):
    1. sem agente: "Crie o seu primeiro agente pela etapa 1" → Ir para a etapa 1 (TR1);
    2. agente criado, Fase 1 em aberto: "Termine a Fase 1" → Continuar a Trilha (TR1);
    3. Fase 1 concluída: "Monte o seu segundo cérebro" → Abrir o Segundo Cérebro (FS3 do Segundo Cérebro).
  - Cartão "Seu Plano Agêntico" com o estágio em destaque, semáforo de 5 faixas, "Estágio N de 5. Gargalo: …" e "Abrir o Plano", logo abaixo do próximo passo (produto: `homeEstagio`; briefing 04/11). Some com Ajustes › Estágio na Home: Sem.
  - Seus agentes com o agente: Pixel da área, nome, papel, estado (Trabalhando / Online / Configurado) e "Abrir a ficha" (produto: `telaInicio`); em cartão (briefing 24/11).
  - Uma ação principal por tela: o botão da Trilha no bloco de fases fica secundário (home.js, home2.js).
- **Estados:** três variantes do próximo passo; com/sem estágio; Seus agentes vazio/travado ou com agente.

### IN3 · Sua jornada, fase por fase (seção do Início)
- **Objetivo:** juntar o hands-on ao vivo e a Trilha por fase.
- **Ações:** escolher a fase (abas verticais; setas ↑↓ do teclado) → troca o painel. Botão do hands-on (muda com o estado, ver regras). Assistir à gravação do último encontro → ME1. Continuar a trilha → TR1. Ver a agenda → ME1.
- **Regras:**
  - 4 fases com número, nome e data; a atual marcada "Fase atual"; concluídas com check (k5.js: `hfBloco`).
  - Fase atual = 1 até a Fase 1 terminar, depois 2 (home.js: `hoAtual`).
  - Hands-on da fase atual com o estado real: Próximo encontro → "Adicionar à minha agenda"; Começa em 30 min → "Entrar na sala"; Ao vivo agora (pulso) → "Entrar agora"; Encerrado → "Ver a gravação" (ho2.js: `HO_EST`). Outras fases: "Participar".
  - Fase futura mostra o alerta "O ideal é começar a Fase N na Trilha antes deste hands-on. Você pode participar mesmo assim." (k5.js).
  - "Na Trilha": fase atual com etapa, progresso e "Continuar a trilha"; concluída com "Ver na Trilha"; futura "As etapas desta fase abrem quando a Fase N−1 terminar." (k5.js).
  - Gravação do último encontro só na Fase 1 (09/10, 1h24); fases 2 a 4: "A gravação do último encontro aparece aqui depois do primeiro hands-on desta fase." (k5.js: `HO_GRAV`).
- **Estados:** fase atual / futura / concluída × 4 estados do hands-on.
- **Exemplo:** datas (quintas 5, 12, 19 e 26/11, 19h) e a gravação são exemplo (k5.js; briefing, Pendências 3).
- **Pendências:** datas reais e quem conduz (briefing, Pendências 3). Nomes das fases aqui (`HO_ENC`) diferem dos da Trilha (`TV_BLOCOS`): a confirmar.

### IN4 · Como a Pixel funciona (janela de primeiro acesso)
- **Objetivo:** mostrar o vídeo do Bruno na primeira visita.
- **Quando aparece:** na primeira ida ao Início, se a pessoa não marcou "Não mostrar novamente" (k5.js).
- **Ações:** Assistir agora: fecha e marca como visto (aviso de protótipo). Pular por agora / ✕ / Esc / fundo: fecha e cria a pendência em IN1. "Não mostrar novamente": guardado no navegador.
- **Regras:** "Se pular, o vídeo fica nas suas pendências do Início." (k5.js: `bvModal`, `bvFechar`).
- **Pendências:** em 06/10 o vídeo de boas-vindas tinha sido descartado (context.md §11); voltou com o c22 (briefing 04/11). Vale o c22.

---

## 3. EN · Entrevista

Padrão desde 26/11: **imersiva** (`S.entV='imersiva'`), em tela cheia sobre o Hub, num iframe fora do `#app` (entrevista-imersiva.js; app.jsx). A versão em conversa (`S.entV='conversa'`, `telaEntrevista`) fica nos Ajustes como versão em teste. As duas levam o resultado para o Plano (briefing 26/11). Começa por "Começar a entrevista" no Início (IN1) ou no Plano vazio (PL1), e por "Fazer a minha" na Equipe (PL3).

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| EN1 | Abertura | app.jsx `i=-1` | 3 (nome muda) | único | `S.entV='imersiva'; ir('entrevista')` |
| EN2 | Pergunta | app.jsx `PASSOS[i]` | 3 | texto; tags; escolha; ritmo; falando/aguardando/pensando; "Estou entendendo"; "Ver a conversa" | EN1 › Começar a entrevista |
| EN3 | A conta | app.jsx `tipo:'conta'` | 3 | único | responder até o passo 7 |
| EN4 | Seu Plano está montado | app.jsx `i=PASSOS.length` | 3 | 1,6 s e vai sozinho | EN3 › Confere |
| EN5 | O que eu já entendi (painel) | app.jsx `aside.ei-mem` | 3 | vazio; temas em accordion; celular fechado/aberto | lateral de EN2–EN4 |
| EN6 | Entrevista em conversa (versão em teste) | `telaEntrevista`, `S.entV='conversa'` | 3 (pergunta de ferramentas muda no Membro) | pergunta normal; tags; a conta; Plano montado; painel no celular | `S.entV='conversa'; ir('entrevista')` |

### EN1 · Abertura (imersiva)
- **Objetivo:** convidar para a conversa e dizer o que esperar.
- **Vem de:** IN1, PL1, PL3.
- **Ações:** Começar a entrevista → EN2. Fazer depois → IN1.
- **Regras:**
  - Título com o primeiro nome: "{Nome}, vamos conversar sobre o seu trabalho" (entrevista-imersiva.js: `entImDoc`; app.jsx).
  - Texto: uns 15 minutos, só por texto; no fim, a pessoa confere a conta antes de virar plano (app.jsx).
  - Partes no topo: Sua rotina, As áreas, A conta (app.jsx: `PARTES`).
  - Presença do Consultor: orbe pixelado ("Pixel") é o padrão; legenda "Pronto quando você quiser" (app.jsx; briefing 26/11).
  - Só texto: a presença se move com a fala e a digitação, nunca com o microfone (briefing 19/11; app.jsx).
- **Pendências:** o seletor "Pixel | Anel | Anel mono" aparece também dentro do Hub (app.jsx: `ei-seg` sem condição): fica no produto ou é só da exploração? A confirmar.

### EN2 · Pergunta (imersiva)
- **Objetivo:** uma pergunta por vez, com a resposta no tipo certo.
- **Ações:** Enviar / Enter (texto); Usar um exemplo (preenche o campo); marcar tags e Continuar; escolher opção (avança na hora); frequência + tempo e Continuar; Ver a conversa / Esconder a conversa.
- **Regras:**
  - 7 passos (app.jsx: `PASSOS`): 1 rotina da semana (texto); 2 ferramentas (tags, já marcadas as citadas); 3 IA hoje (escolha entre 4); 4 áreas onde o tempo escorre (tags, 6 áreas); 5 um processo, do começo ao fim (texto); 6 ritmo: frequência (4) e tempo de cada vez (5); 7 a conta (EN3).
  - A fala do Consultor aparece palavra por palavra num fade curto, com um eco do que entendeu antes da pergunta (ex.: "Anotei 2 rotinas que se repetem e 1 ferramenta.") (app.jsx: `dizer`, `responder`).
  - Legenda da presença: "O Consultor está falando", "Aguardando sua resposta", "Juntando com o que você já disse" (app.jsx; briefing 26/11).
  - "Estou entendendo:" mostra, enquanto a pessoa digita, rotinas, ferramentas e áreas reconhecidas no texto (app.jsx: `aoVivo`).
  - Ferramentas e áreas com logo real (Simple Icons) ou ícone da biblioteca (briefing 26/11; app.jsx: `Marca`).
  - Enviar e Continuar ficam desativados sem resposta (app.jsx).
  - Não repete o que o onboarding perguntou (briefing 19/11).
- **Estados:** falando / aguardando / pensando; texto vazio e preenchido; "Estou entendendo" com chips; conversa aberta (lista Consultor/Você).
- **Exemplo:** "Usar um exemplo" e o reconhecimento de texto são simulados ("num produto real, quem extrai é o modelo") (app.jsx).
- **Pendências:** a imersiva pergunta uma vez sobre IA e as 6 respostas de maturidade do Plano seguem essa resposta (simplificação desta versão; o aviso ao abrir o Plano diz isso) (entrevista-imersiva.js: `entImAplicar`; briefing 24/11). Definir como fica na versão real. Para o Membro, as áreas da imersiva não batem com as do perfil, e o Plano usa áreas de exemplo (briefing 24/11).

### EN3 · A conta
- **Objetivo:** mostrar as horas antes de montar o plano, para a pessoa conferir.
- **Ações:** Confere, pode montar o plano → EN4. Corrigir os números → volta ao passo 6 (EN2 ritmo).
- **Regras:** número grande "≈ N h por mês voltam para você, só nesse processo"; premissa "Estimativa: {frequência} × {tempo} cada vez" (app.jsx). Horas = frequência (todo dia 22, algumas vezes por semana 10, uma vez por semana 4, uma vez por mês 1) × tempo (até 15 min 0,2 h; 15–30 min 0,4; 30 min–1 h 0,75; 1–2 h 1,5; mais de 2 h 2,5), arredondado (app.jsx: `FREQ`, `TEMPO`, `horas`; entrevista.js: `ENT_FREQ`, `ENT_TEMPO`).
- **Pendências:** a copy diz "voltam para você", mas o número é o tempo gasto hoje; no Plano, as horas de volta são 30% a 50% disso (plano-entrevista.js). A confirmar a copy.
- **Exemplo:** ≈ 33 h por mês (briefing 24/11).

### EN4 · Seu Plano está montado
- **Objetivo:** fechar a entrevista e levar ao Plano.
- **Ações:** Abrir o Plano Agêntico → PL2 (o Hub abre sozinho depois de 1,6 s). Recomeçar (só fora do Hub).
- **Regras:** "Abrindo o seu Plano Agêntico…" e o resumo: rotina, N ferramentas, N áreas e o primeiro processo, com cerca de N h por mês (app.jsx); presença fica verde/positiva (briefing 19/11). Ao chegar ao Plano, aviso de protótipo sobre a simplificação da IA (entrevista-imersiva.js).

### EN5 · O que eu já entendi (painel)
- **Objetivo:** mostrar ao vivo o que vai para o Plano.
- **Quando aparece:** à direita em EN2–EN4; no celular, como folha embaixo (até 900 px) (app.jsx: `movel`).
- **Ações:** abrir/fechar cada tema (accordion; só um aberto); no celular, abrir a folha.
- **Regras:**
  - Cabeçalho "O que eu já entendi" com "N de 5 temas" (app.jsx).
  - Ordem dos temas pelo que alimenta o Plano: Processo (≈ h/mês, frequência · tempo), Rotinas, Áreas que mais pesam, Ferramentas, IA hoje (app.jsx: `TEMAS`; briefing 19/11).
  - Tema sem conteúdo não aparece; vazio total: "Vou anotando aqui o que você contar." (app.jsx).
  - Fica aberto o tema que recebeu algo por último; no início, o primeiro preenchido; a pessoa pode fechar todos; fechado mostra um resumo à direita (briefing 23/11; app.jsx).
  - Conteúdo novo entra com fade e subida de 6 px; seção com conteúdo ganha ✓ verde; sem laranja (briefing 25/11). Processo em fundo `--soft`, sem contorno (briefing 25/11).
  - No celular, a barra fechada mostra o último item capturado (app.jsx: `ult`).
  - Cabeçalhos com 44 px de altura (briefing 23/11).
- **Pendências:** o código ainda tem a pílula "agora" (app.jsx: `ei-agora`), que o briefing de 25/11 diz ter saído (opção A, sem laranja). A confirmar se está só escondida no CSS.
- **Exemplo:** "Dados de exemplo." no rodapé do painel (app.jsx).

### EN6 · Entrevista em conversa (versão em teste)
- **Objetivo:** a mesma entrevista no chat do Hub, com o painel ao lado.
- **Vem de:** IN1, PL1, PL3 com Ajustes › Entrevista: Conversa.
- **Ações:** responder no composer ou nos cartões; Enviar (tags); Corrigir a resposta anterior; Confere, pode montar o plano; no fim, Abrir o Plano Agêntico → PL2 ou Voltar ao Início → IN2; no celular, "O que eu já entendi · N itens" abre o painel.
- **Regras:**
  - Topo "Sua entrevista com o Consultor" com "Parte N de 3: …" (o total de perguntas cresce com cada processo) (entrevista.js: `telaEntrevista`).
  - Perguntas novas: ferramentas (antes das 6 de maturidade; no Membro "Quais ferramentas você usa no seu trabalho?"); até 3 processos, cada um com frequência, tempo e ferramentas usadas; "Quer contar mais um processo?"; a conta (entrevista.js: `v4Q`).
  - "Outra" ferramenta exige escrever quais; "Nenhuma delas" desmarca as outras (entrevista.js: `entTag`, `entTags`).
  - Painel: Sobre você (do onboarding), Ferramentas, Estágio de IA ("N de 6" até completar), Áreas que mais pesam, Processos com horas e total; partes Sua rotina, As áreas, A conta; "Nada vai para o Plano antes de você conferir a conta." (entrevista.js: `entCap`).
  - Bloco de pergunta em cartão branco "O Consultor tem uma pergunta para você", opções em linhas com caixa, rodapé com Corrigir, contagem e Enviar (briefing 24/11; entrevista-bloco.js).
  - Ferramentas com logo (marcas-entrevista.js).
- **Estados:** pergunta de texto/escolha; tags; a conta (com ou sem processo: "Você ainda não contou um processo. Eu sugiro oportunidades…"); Plano montado; painel no celular.

---

## 4. PL · Plano Agêntico

Função `telaPlano` (camadas: base, entrevista.js, plano-entrevista.js, accordions, plano-reais.js, plano-equipe.js, plano-v2.js, plano-icones.js, plano-abas.js), `S.scr='plano'`. Topo: "Plano Agêntico" com subtítulo "Sai da sua entrevista" (vazio), "{Empresa}, atualizado hoje" (Admin/Individual) ou "Sua parte no plano da {empresa}" (Membro) (produto).

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| PL1 | O seu Plano nasce da entrevista | `telaPlano`, `S.entrev=false` | 3 (abas só no Admin) | único | `S.entrev=false; ir('plano')` |
| PL2 | Plano Individual (versão 2) | `pl2Tela`, `S.entrev=true`, `S.plVista!='equipe'` | 3 (Membro só vê a ordem) | com/sem entrevista real; custo da hora vazio/editando/informado; ordem sugerida/sua; agente já criado | entrevista completa (EN) ou `S.entrev=true; ir('plano')` |
| PL3 | Plano Equipe | `plEquipeTela`, `S.profile='admin'; S.plVista='equipe'` | admin | Admin com e sem a própria entrevista; com/sem horas; com/sem custo | `S.profile='admin'; S.plVista='equipe'; ir('plano')` |

### PL1 · O seu Plano nasce da entrevista
- **Objetivo:** explicar que o Plano sai da entrevista e começar por ela.
- **Quando aparece:** até a entrevista terminar.
- **Vem de:** menu, IN1, CS1.
- **Ações:** Começar a entrevista → EN1. Admin: aba Equipe → PL3.
- **Regras:**
  - "Numa conversa por texto, o Consultor entende a sua rotina, as áreas e os processos que tomam tempo. Dela saem o destino, o estágio e os primeiros agentes." (entrevista.js).
  - Admin vê as abas Individual | Equipe no topo; a Equipe funciona mesmo sem a entrevista do Admin (plano-equipe.js; briefing 24/11).
  - O Consultor passa a mostrar "Plano: depois da entrevista" no contexto (entrevista.js).
- **Estados:** único (por perfil: com ou sem abas).

### PL2 · Plano Individual (versão 2)
- **Objetivo:** mostrar aonde a pessoa vai, onde está e por onde começar.
- **Quando aparece:** depois da entrevista.
- **Vem de:** EN4, IN2, menu, CS1.
- **Ações:** Admin: aba Equipe → PL3. Calcular em reais / Alterar → campo do custo da hora; Calcular (ou Enter) grava. Atacar primeiro / subir / descer (Admin e Individual): reordena. Voltar à sugestão. Ir para a Trilha → TR1. Abrir a ficha → AG3 ou Criar no Agent Builder → AG4/AG9. Abrir/fechar Fontes, Skills, Checkpoints (accordion).
- **Regras:**
  - **Topo:** título "Rumo à operação agêntica" e três propriedades em linha: Resultado esperado na primeira fase ("N–M h por mês" + selo Estimativa), Em reais, Estágio atual (plano-v2.js; briefing 26/11).
  - **Resultado esperado:** se o 1º de "Por onde começar" veio da entrevista e tem horas, usa as horas dele; senão, a estimativa do catálogo (plano-v2.js: `res`). Horas de volta = horas gastas × a redução do agente recomendado, 30% a 50% por padrão, arredondadas, mínimo 1 (plano-entrevista.js; plano-v2.js: `pl2Itens`).
  - **Em reais:** horas de volta × custo da hora que a pessoa informa ("salário e encargos divididos pelas horas trabalhadas no mês"); sem esse dado, nenhum valor aparece, só "Calcular em reais"; nada é estimado pela Pixel (plano-reais.js; plano-v2.js). Valor inválido: "Informe o custo de uma hora, em reais." (plano-reais.js: `plCusto`). O mesmo custo vale na Equipe (briefing 24/11).
  - **Régua de estágio:** 5 estágios (Exploração, Uso individual, Uso padronizado, Contexto conectado, Operação agêntica), semáforo (vermelho, laranja, amarelo, verde-claro, verde), próximos a 22%, atual com contorno em tinta; abaixo, "No próximo estágio, {estágio}: {descrição}" (produto: `V4_STAGES`, `V4_STAGE_D`; plano-v2.js; briefing 26/11). Estágio calculado por regra a partir das respostas (produto: `telaPlano`).
  - **Por onde começar (c44):** processos da entrevista e oportunidades do catálogo, agrupados por área. Cada processo da entrevista absorve uma oportunidade da sua área; cada área sem processo recebe até 2 sugestões, com processo, 1. Itens da entrevista ordenados pelas horas de volta; áreas ordenadas pela soma das horas de volta (plano-v2.js: `pl2Itens`). Cada item: título e "Da sua entrevista · agente sugerido: … · N–M h de volta por mês · R$" ou "Sugerido pelo Consultor para a área" (plano-v2.js: `motivo`). Área com "≈ N h por mês hoje".
  - Selo "Sugestão do Consultor" ou "Ordem sua"; "Voltar à sugestão" só quando a ordem é da pessoa (plano-v2.js).
  - Subir e descer andam dentro da mesma área; "Atacar primeiro" leva o item (e a sua área) para o topo (plano-v2.js: `p2Sobe`, `p2Desce`, `p2Primeiro`).
  - O 1º da lista define a área principal e a oportunidade principal; daí seguem o agente recomendado, a "Prioritária" em Responsabilidades, o resultado e a Trilha (plano-v2.js: `v4Compute`). Ao mudar o 1º: aviso "A Trilha agora começa por {item}." (plano-v2.js: `pl2Mover`).
  - "Agora na Trilha: {passo}, com {1º item}." e "Ir para a Trilha" no bloco (plano-v2.js; briefing 26/11).
  - **Membro:** só vê a ordem, sem botões, com "Ordem definida pelo Admin." e o selo "Atacar primeiro" no 1º (plano-v2.js).
  - **Agente já criado:** o 1º fica para o próximo agente ("Próximo agente"; "O seu primeiro agente já está criado; o 1º desta lista fica para o próximo agente."; aviso ao mudar a ordem) e a ordem deixa de mexer no agente e na Prioritária (plano-v2.js).
  - Leitura por voz: "{item}: Nº em {área}." anunciado ao mover (plano-v2.js: `p2Live`).
  - **Responsabilidades e agentes:** sem agente, "Primeiro agente, a criar" (Recomendado) com as responsabilidades do agente recomendado e "Criar no Agent Builder"; com agente, nome, papel e "Abrir a ficha" (produto: `telaPlano`). A Prioritária segue o 1º de "Por onde começar" (plano-v2.js).
  - **Fontes, Skills e Checkpoints** numa coluna só, recolhidos (plano-v2.js; briefing 26/11); em accordion, um aberto por vez (produto: bloco "Plano revisado: seções 4 a 7 em accordions"). Como o aberto por padrão era "Oportunidades", que saiu na v2, as três começam fechadas (produto: `S.plAc` padrão "4"; plano-v2.js).
  - **Fontes:** ferramentas da entrevista primeiro ("Você usa hoje, segundo a entrevista", Declarado), sem repetir as do catálogo; fonte já conectada fica como está; ERP vira "Você usa hoje; fica para um próximo agente" (Fora do escopo) (plano-entrevista.js). Nota: "O Plano registra o que você informa sobre as fontes. Ele não acessa nem testa as suas ferramentas." (produto). Logo real ou ícone da biblioteca (plano-icones.js).
  - **Skills, rotinas e capacidades:** skills Recomendadas/Declaradas; lacuna "Skill para … · Ainda não existe no catálogo"; "Rotina de conferência semanal" Pendente até a Fase 1 (produto: `telaPlano`). Ícone de skill na cor da área; lacuna apagada; rotina com ícone de rotina (plano-icones.js).
  - **Checkpoints e evidências:** "Agente rodou num caso real e você conferiu" e "Rotina combinada com o time", Pendente até ter evidência, Confirmado com a frase do que mudou; "Lacunas e bloqueios" (produto: `telaPlano`).
  - **Estados de item:** Recomendado (pelo Consultor), Declarado (por você), Confirmado (com evidência), Pendente, Lacuna, Fora do escopo; nada aparece como confirmado sem checkpoint (produto: `ST`; briefing 16/10; context.md §11).
  - Saíram na v2: "Oportunidades e processos" (absorvida em Por onde começar) e "Próximos passos" (juntado ao bloco) (briefing 26/11).
- **Estados:** custo vazio / editando / informado; ordem sugerida / sua; com agente; Membro; sem entrevista real (Ajustes › Entrevista: Feita mostra o plano com as respostas de exemplo, sem os dados da entrevista) (plano-entrevista.js).
- **Pendências:**
  - Na v2 a nota de privacidade do Membro e a nota do Admin ("O que cada pessoa contou… está na aba Equipe") não aparecem: `pl2Tela` não inclui a `ob-note` (plano-v2.js; plano-equipe.js). A confirmar se devem voltar.
  - "Interface: Limpa" escondia o texto secundário das linhas do Plano (o `em`) (briefing 24/11). Confirmar se vale para os motivos de "Por onde começar".
  - c44 dependia do mockup do Cayo (briefing 24/11); a v2 foi feita com referências próprias (briefing 26/11). Validar com o Cayo.
- **Exemplo:** "≈ 33 h por mês gastas viram 10–17 h por mês de volta" (briefing 24/11). As responsabilidades, skills e o agente recomendado vêm do catálogo do protótipo.

### PL3 · Plano Equipe
- **Objetivo:** juntar, para o gestor, o que a equipe contou na entrevista.
- **Quando aparece:** só para o Admin, na aba Equipe (plano-equipe.js; plano-abas.js).
- **Vem de:** PL1, PL2 (abas).
- **Ações:** aba Individual → PL1/PL2. Fazer a minha (Admin sem entrevista) → EN1. Lembrar (quem não fez): aviso "Lembrete para {nome}…; no protótipo, nada é enviado".
- **Regras:**
  - Título "A equipe rumo à operação agêntica" (plano-abas.js). Abas Individual | Equipe abrem a página, antes do título; tabs com setas, Home e End (plano-abas.js; a11y.js).
  - Nota: "O que cada pessoa contou na entrevista, somado: processos, ferramentas e horas. As respostas de cada um sobre IA não aparecem aqui." (plano-equipe.js).
  - **Cards do topo**, mesma anatomia: rótulo + selo "Inclui exemplo" na mesma linha; valor 24/600; linha de apoio; nota presa à base (plano-equipe-topo.js; briefing 26/11).
    - Entrevistas: "N de M concluídas", barra com um traço por pessoa, "Falta(m) {nomes}. O plano da empresa fica mais preciso a cada entrevista." ou "Toda a equipe já fez a entrevista."
    - Horas de volta da equipe: soma das horas dos processos de todos × a mesma redução do Plano (30% a 50%), com Estimativa; em reais só com o custo da hora informado ("R$ … por mês, com a hora a R$ …"); sem horas: "Ainda sem horas. As horas aparecem quando alguém contar um processo na entrevista."
  - **Pessoas:** todos os participantes da Empresa (EM1), com avatar 32 px (foto só da Renata; os outros com iniciais nas cores da Empresa); estado "Entrevista feita: N processos, N ferramentas", "Ainda não fez a entrevista" ou "Convite enviado; ainda não entrou no Hub"; ação Fazer a minha (você) ou Lembrar (outros); selo Exemplo ou Declarado (plano-equipe.js; plano-avatares.js).
  - **Processos por área:** agrupados por área, áreas ordenadas pelas horas de hoje; cada processo com quem contou (mini avatar 20 px), frequência, tempo e "hoje ≈ N h por mês" (plano-equipe.js; plano-avatares.js).
  - **Ferramentas da equipe:** ordenadas por quantas pessoas usam, "N de M pessoas: nomes", com logo (plano-equipe.js; plano-icones.js).
  - Admin sem a própria entrevista: "Você ainda não fez a sua entrevista. Enquanto isso, veja o que a equipe já contou." (plano-equipe.js).
- **Estados:** com e sem a entrevista do Admin; com/sem horas; com/sem custo; pessoa pendente de convite.
- **Pendências:** privacidade em conflito com outras telas (ver EM1 e EM2). Avanço de cada pessoa na Trilha fica para uma próxima versão (plano-equipe.js).
- **Exemplo:** a entrevista da Carla Mendes (2 processos, 3 ferramentas) é exemplo, marcada "Exemplo"; Diego Rocha ainda não fez a dele (plano-equipe.js: `PL_EQ_EXEMPLO`; briefing 24/11). "R$ 480–880 por mês, com a hora a R$ 80" (briefing 26/11).

---

## 5. TR · Trilha

`S.scr='trilha'`. Padrão: Estudo C, "Agora" (`S.trV='ec'`, `esC`, `tcAgora`) (produto: parte 3; briefing 06/11). Submenu no menu: Jornada do agente | Conteúdo complementar (`trSub`) (produto: `lateral`; briefing 03/11). Conteúdo complementar = abas verticais (`S.trTab='base'`, `S.bkV='v5'`, `telaBase3`, `bk5Inicio`).

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| TR1 | Agora | `esC` / `tcAgora` | 3 | subpasso 1–4; tipos de subpasso; passo concluído; com/sem aula | `ir('trilha')` |
| TR2 | Mapa da jornada | `esMapaLista` / `mjFase` | 3 | etapa concluída/atual/próxima; fases 2–4 travadas | TR1 › aba Mapa da jornada |
| TR3 | Conteúdo complementar › Aulas | `bk5Inicio` + `bk6Visao` | 3 (plano só Formação: única área liberada) | progresso; etapa sem aula ("Em gravação") | `A.trSub('base')` |
| TR4 | Painel da aula | `bk6Sheet`, `S.bk2.sheet` | 3 | não iniciada / em andamento / assistida; celular sobe de baixo | TR3 › clicar numa aula |
| TR5 | Coleção | `bk5Inicio` + `bk7Secoes`, `S.bk2.tipo` | 3 | com itens; seção vazia; "E mais N" | TR3 › aba Prompts, Automações… |
| TR6 | Drawer do item | `bk7Drawer`, `S.bk2.dr` | 3 | normal/ampliado; com/sem pedido; sem mini guia | TR5 › clicar num item |
| TR7 | Busca no Conteúdo complementar | `bk5Inicio`, `S.bk2.q` | 3 | com resultados; sem resultados | TR3 › buscar |
| TR8 | Página do item | `bk2Item`, `S.bk2.item` | 3 | por tipo | TR4 › Abrir a página completa da aula |
| TR9 | Player da aula | `telaAula`, `S.scr='aula'` | 3 | tocando/pausado; concluída; tela cheia | TR1 › vídeo da aula |
| TR10 | Página do curso | `telaCurso`, `S.scr='curso'` | 3 | módulos abertos/fechados | TR9 › nome do curso no caminho |

### TR1 · Agora
- **Objetivo:** mostrar só o passo atual e o que fazer agora.
- **Vem de:** menu, IN1–IN3, PL2, AG9, CS5.
- **Ações:** abas Agora | Mapa da jornada (rolam até a seção). Vídeo da aula → TR9. Pontos do carrossel / Anterior → outro subpasso. Travei aqui → abre o Consultor com sugestão (CS2). Feito, próximo subpasso → próximo. Concluir o passo (último) → estado "passo concluído". Copiar (pedido): copia. Item de "Conteúdo complementar deste passo" → TR6.
- **Regras:**
  - Cabeçalho "Fase 1, etapa N de 7" e "Passo N: {pílula}", barra "N de M subpassos" (produto: `tcAgora`).
  - Vídeo da aula já aberto acima dos subpassos, em player 16:9 na largura do container (briefing 06/11, 09/11).
  - Subpassos N.1 a N.4 em carrossel, um por vez, com o nome, "onde, quanto tempo" e o corpo (pedido para copiar, lista, frase ou aviso) (produto: `tcAgora`, `TV_ATUAL.sub`; briefing 09/11).
  - No último subpasso, avança sozinho para o próximo passo, com aviso "Passo concluído. Seguindo para o próximo passo." (produto: `tcFeito`; c24).
  - "Conteúdo complementar deste passo": até 4 itens ligados à etapa (produto: parte 4, c35); o mais ligado ao subpasso sobe com "Para este subpasso"; prompts com Copiar (briefing 09/11).
  - Abas presas no topo, que acompanham a rolagem (produto: `tcSpy`; c26).
  - Azul marca a fase e a etapa atuais; laranja só em outros elementos (briefing 06/11).
- **Estados:** subpasso 1 a 4 (feito/pendente nos pontos); passo concluído: "Passo N concluído: … Você seguiu para o próximo." com "Rever o passo anterior" e o espaço vazio "A aula e os subpassos deste passo entram com o material do Bruno." (produto: `tcAgora`).
- **Pendências:** só o passo "Contar a sua rotina ao agente" tem conteúdo; os outros entram com o material do Bruno (produto: `tcAgora`). O caso real e o Agent Builder não são alcançáveis a partir da Trilha padrão (ver AG4 e AG6).
- **Exemplo:** pílula, subpassos, pedidos e exemplo (Bertoni Móveis) vêm do material de exemplo (produto: `TV_ATUAL`).

### TR2 · Mapa da jornada
- **Objetivo:** situar a pessoa nas 4 fases e 7 etapas.
- **Ações:** Continuar de onde parou → volta à aba Agora (TR1).
- **Regras:**
  - Fase atual em cartão: "Fase 1, a sua fase agora", "Você sai com …", "Etapa N de 7", barra "N% da fase" (mapa.js).
  - 7 etapas em linha do tempo: concluída com check verde; atual com ponto azul pulsando, "Etapa N, agora"; próximas em contorno; cada uma com "N aulas, mais N etapas opcionais" (mapa.js).
  - A etapa atual abre as aulas (feitas, "Você está aqui, N de M subpassos", "E mais N aulas nesta etapa") (mapa.js).
  - Fases 2 a 4 discretas, com cadeado, "Em gravação" e "Abre quando a Fase N−1 terminar." (mapa.js).
- **Pendências:** nomes das fases 2 a 4 (`TV_BLOCOS`: Cérebro da empresa, Agentes com o seu time, A empresa decidindo com dados) diferem do Início e do Conteúdo complementar; etapas das fases 2 a 4 em gravação (briefing 20/10). A confirmar.

### TR3 · Conteúdo complementar › Aulas
- **Objetivo:** ver todas as aulas da formação, na ordem da jornada.
- **Vem de:** submenu, TR1, CS2.
- **Ações:** abas verticais (Para aprender: Aulas, Docs do Hermes; Para usar no seu agente: Prompts, Automações, Modelos, Ferramentas, Repositórios) → TR5. Busca → TR7. Continuar (Continue de onde parou) / clicar numa aula → TR4. Baixar tudo em .md: aviso de protótipo.
- **Regras:**
  - Cartão "Formação completa · Na ordem da jornada", "Todas as aulas da formação", "4 fases e 29 etapas…", destaque único "Continue de onde parou" com "Faltam N min", rodapé "N de M aulas assistidas" (produto: `bk6Visao`; briefing 09/11).
  - Fases com etapas e aulas (estado, miniatura, título, o que falta, duração); etapa sem aula com "Em gravação"; fases 2 a 4 "Em gravação" (produto: `bk6Visao`).
  - Abas com ícone e contagem (produto: `bk5Inicio`, `BK7_GRUPOS`). Skills e templates de agentes saíram daqui para Ferramentas e skills; "Templates" virou "Modelos" (briefing 03/11, c04).
  - Ícones das abas neutros (briefing 06/11, c27).
  - No plano só Formação, é a única área liberada (produto: `telaTrilhaNova`, `telaBloq`).
- **Exemplo:** contagens (112 aulas, 8 prompts, 19 automações…) são do mock do Bruno (produto: `BK7_N`; briefing 20/10).

### TR4 · Painel da aula
- **Objetivo:** ver a aula sem sair da lista.
- **Ações:** Continuar a aula → TR9. Perguntar ao Consultor (a caixa mostra "Sobre: {aula}") → CS2. Copiar pedido. Abrir a página completa da aula → TR8. Fechar.
- **Regras:** capa com progresso, estado, título, descrição, pedidos da aula com Copiar; no celular sobe de baixo (briefing 20/10; produto: `bk6Sheet`).

### TR5 · Coleção
- **Objetivo:** listar os itens de um tipo, agrupados como no material.
- **Ações:** clicar num item → TR6.
- **Regras:** cabeçalho com ícone, título, descrição e quantidade; seções do material (ex.: Prompts: Em toda aula; Etapa 1); linhas com ícone e cor do tipo, nome técnico em mono, "Etapa N", Rascunho e Em breve; o que falta: "E mais N … que entram com o material do Bruno." (produto: `bk7Secoes`, `BK7_DESC`; briefing 20/10).
- **Estados:** com itens; seção vazia.

### TR6 · Drawer do item
- **Objetivo:** ver o mini guia do item sem perder a coleção.
- **Ações:** Perguntar ao Consultor (fecha e abre a conversa sobre o item) → CS2. Para a sua IA: Baixar .md / Copiar tudo. Copiar o pedido (prompts). Ampliar/Reduzir. Link para o guia de outro item → abre o drawer dele. Aula em "Aparece nestas aulas" / Ver na Trilha → TR1. Fechar / fundo.
- **Regras:** caminho Coleção › Item; atributos (Rascunho, Em breve, etiqueta, "Em N aulas", Etapa N); "1 O que faz", "2 Como usar" em passos numerados; "Aparece nestas aulas" com as aulas da etapa e "Ver na Trilha" no lugar de "Usado em" (produto: `bk7Drawer`; parte 4, c35).
- **Estados:** normal / ampliado; sem mini guia: "O mini guia completo deste item entra com o material do Bruno." (produto).

### TR7 · Busca no Conteúdo complementar
- **Regras:** "Perguntar ao Consultor" com o termo vem primeiro; "N resultados para '…'" com Limpar a busca; as contagens das abas mostram os resultados; se a aba atual não tem resultado, troca para a primeira que tem (produto: `bk5Inicio`; briefing 20/10).
- **Estados:** com resultados; vazio: "Nada nesta coleção com essa palavra." (produto).

### TR8 · Página do item
- **Objetivo:** a página completa da aula/item.
- **Regras:** caminho, título, "Assistir à aula", "Perguntar ao Consultor", "Para a sua IA", o que você faz, o pedido, exemplo, se travar, anterior e próxima (briefing 20/10; produto: `bk2Item`).
- **Pendências:** a estrutura vem da Base v2 (20/10); conferir se ainda é o padrão (a confirmar).

### TR9 · Player da aula
- **Objetivo:** assistir à aula com o material ao lado.
- **Vem de:** TR1, TR4, ME1, ME2, TR10.
- **Ações:** Voltar (texto muda pela origem: Trilha, curso, Mentorias, Início) (produto: `telaAula`). Marcar como concluída. Próxima aula. Ficou com dúvida? → Consultor com o contexto da aula. Expandir → tela cheia.
- **Regras:** vídeo 16:9; tela cheia escura com Conteúdo (lista do curso), Próxima aula, capítulos, ±10 s, velocidade 1x–2x, legenda; Esc sai; espaço toca e pausa (briefing 16/10; produto: `A.playerFull`). Miniatura com o frame do Bruno (briefing 09/11).
- **Estados:** tocando/pausado; concluída; tela cheia.
- **Pendências:** player sem vídeo real; capa com logo do IBGC (briefing, Pendências 7).

### TR10 · Página do curso
- **Objetivo:** ver o curso com módulos e progresso.
- **Quando aparece:** pelo nome do curso no caminho do player (produto: `telaAula`, `cursoAbrir`).
- **Regras:** capa, números, progresso, "Continuar: próxima aula" e módulos em acordeão (concluída, atual, a seguir) (briefing 16/10).
- **Pendências:** o catálogo de Formações não tem mais rota; confirmar se a página do curso continua no produto (a confirmar).
- **Exemplo:** módulos e aulas são exemplo (briefing 16/10).

---

## 6. FS · Ferramentas e skills

`S.scr='ferramentas'`, `telaFerr` → `frListaNova` (lista) ou página (`S.fr.pg`); drawer em `S.fr.md` (produto). Alternância "Templates de agentes (N) | Skills (149)" com a busca ao lado, fixas ao rolar (briefing 03/11).

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| FS1 | Templates de agentes | `frListaNova`, `S.fr.vista='templates'` | 3 | busca com/sem resultado; Pixel no cartão Solto (padrão) | `ir('ferramentas')` |
| FS2 | Skills | `S.fr.vista='skills'` | 3 | filtro por área; busca; vazio | FS1 › Skills |
| FS3 | Drawer do template | `frTplDrawer`, `S.fr.md='tpl:<id>'` | 3 | por template (abas diferentes) | FS1 › clicar num cartão |
| FS4 | Drawer da skill | `frSkillDrawer` | 3 | única | FS2 › clicar numa skill |
| FS5 | Página do template ou da skill | `S.fr.pg` | 3 | por item | FS3/FS4 › Abrir em página |

### FS1 · Templates de agentes
- **Objetivo:** escolher um ponto de partida para um agente.
- **Vem de:** menu, IN2 (Segundo Cérebro), TR3 (link).
- **Ações:** cartão → FS3. Busca: filtra e avisa quando o resultado está na outra coleção ("Há N skills… Ver as skills"). Limpar a busca. Link Conteúdo complementar → TR3.
- **Regras:**
  - Seções: "Agentes prontos da Pixel" (Marketing OS, Amora) como produto, com o Pixel solto e "Plug and play", sem KPIs; "Segundo Cérebro" em bloco próprio ("Não é um agente: é a base de conhecimento que os seus agentes consultam e mantêm.", "Kit pronto", Pessoal e Empresa); "Templates iniciais, por área" (11) com "Template inicial" (produto: parte 2; briefing 06/11, 09/11).
  - Cartão de template inicial: faixa na cor do agente, Pixel, papel ("Agente de Vendas"), nome ("Pixel Vendas"), descrição em até 2 linhas, rodapé "4 responsabilidades prontas" (Vendas) ou "Raio X em construção" e "Ver detalhes" (produto: `tplCard`; briefing 08/11).
  - Cores por área: Vendas laranja, Marketing rosa, Atendimento verde, Financeiro amarelo, Operações azul, RH roxo, Dados e Gestão azul-petróleo; Chief of Staff, Orquestrador e Geral em cinza (briefing 08/11).
  - No plano só Formação, o item fica com cadeado (briefing 03/11; produto: `lateral`).
- **Pendências:** escolha do Pixel no cartão (Solto, Na faixa, Ao lado; recomendação Na faixa) (briefing, Pendências 1). Raio X dos outros 10 templates (Pendências 2).

### FS2 · Skills
- **Objetivo:** achar uma skill por área ou objetivo.
- **Ações:** filtro de áreas na lateral (no celular, pílulas roláveis); busca; cartão → FS4.
- **Regras:** áreas do catálogo com contagem; cartão com ícone de skill (arquivo SKILL.md) na cor da área, nome, descrição em 2 linhas, área e seta; nota "No protótipo aparecem 11 das 149 skills do catálogo do Agent Builder…" (produto: `frListaNova`, `FR_AREAS`, `FR_TOTAL_SK`; briefing 09/11, 25/11).
- **Estados:** com resultados; vazio na área: "As skills desta área entram com o catálogo do Agent Builder."; vazio na busca com atalho para templates.
- **Pendências:** catálogo real das 149 skills (só falta um export: nome, área, descrição) (briefing 25/11).
- **Exemplo:** as 11 skills mostradas.

### FS3 · Drawer do template
- **Objetivo:** ver o raio X do template sem sair da lista.
- **Ações:** abas; skill dentro do raio X → troca o drawer para FS4; Abrir em página → FS5; Tirar dúvidas com o Consultor → CS1 com a pergunta; ação principal (Usar no Agent Builder → AG4/AG9; Baixar o kit; Ver por dentro); fechar.
- **Regras:**
  - Abas por template: Vendas (Responsabilidades, Rotinas, Ferramentas); Marketing OS (Blocos, Antes de começar com "Como instalar", Rotinas); Segundo Cérebro (uma visão: o que vem no zip + como instalar, sem barra de abas); Amora (Rotinas, Por dentro); demais (Visão geral) (briefing 03/11, 09/11; produto: `frTplDrawer`).
  - Sem KPIs no topo; o drawer rola inteiro, só a barra de ampliar e fechar fica fixa, abas presas no topo (briefing 09/11).
  - Identidade em destaque (ícone 56 px, título), comportamento numa linha com escudo (briefing 03/11).
  - "Usar no Agent Builder" respeita a trava da Fase 1 (produto: revisão do kanban 04/11, C).
  - "Blocos" do Marketing OS mantém a palavra (são partes do kit) (briefing 06/11).

### FS4 · Drawer da skill
- **Regras:** quatro seções na tela, sem abas: Para que serve, Quando usar, Como funciona, Download (SKILL.md); "Usada em" recolhível; rodapé com Perguntar ao Consultor e Baixar a skill; ícone na cor da área (briefing 03/11, 04/11, 09/11).

### FS5 · Página do template ou da skill
- **Regras:** caminho (Ferramentas e skills › Templates de agentes › Pixel Vendas), as mesmas abas e "Voltar"; dentro da página, clicar numa skill ou template navega para a página dele (briefing 03/11, 04/11; c07).

---

## 7. AG · Agentes e Agent Builder

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| AG1 | Seus agentes | `telaAgentes`, `S.scr='agentes'` | 3 | vazio; 1 agente; vários | Ajustes › Agentes com exemplos |
| AG2 | Editar / Excluir agente | `agModal`, `S.agModal` | 3 | editar; excluir (agente do Builder ou registrado) | AG1 › lápis / lixeira |
| AG3 | Ficha do agente | `telaFicha`, `S.scr='ficha'` | 3 | online/trabalhando; responsabilidade ativa | `A.saltar('agentes'); ir('ficha')` |
| AG4 | Agent Builder | `telaAB`, `S.scr='ab'`, `S.ab.s=0…7` | 3 | 8 passos; 3 caminhos no passo 1 | Ajustes › Agent Builder |
| AG5 | Agente configurado | `telaAB`, `S.scr='abfim'` | 3 | Hermes confirmado/pendente | concluir AG4 |
| AG6 | Caso real (registrar a evidência) | `telaCaso`, `S.scr='caso'` | 3 | critérios incompletos/completos | `ir('caso')` com agente |
| AG7 | Checkpoint comprovado | `telaCheckpoint` | 3 | único | Ajustes › Checkpoint do agente |
| AG8 | Fase 1 concluída | `telaMarco` | 3 | único | Ajustes › Fase 1 concluída |
| AG9 | O Agent Builder libera com a Fase 1 | `travaModal`, `S.travaAB` | 3 | único | sem Fase 1: Novo agente |

### AG1 · Seus agentes
- **Objetivo:** ver os agentes e criar um novo.
- **Vem de:** menu, IN2, PL2, AG3.
- **Ações:** Novo agente / cartão "Novo agente" → AG4 (ou AG9). Editar / Excluir → AG2. Abrir a ficha (agente do Builder) → AG3. Abrir o Agent Builder (vazio) → AG4/AG9.
- **Regras:**
  - Cartão: Pixel da área, nome, função, estado, missão, responsabilidades ativas de N, ferramentas, área e origem (produto: `telaAgentes`).
  - Nota: "A Pixel não acessa os seus agentes em produção. O estado de cada um é o que você registrou aqui e na Trilha." (produto).
  - Agente não pode ser pausado nem fica fixado no menu; "Registrar agente existente" saiu (briefing 16/10, checklist do Cayo).
  - "Novo agente" respeita a trava da Fase 1 (produto: revisão do kanban 04/11, C).
- **Estados:** vazio ("Nenhum agente ainda…"); um ou vários.
- **Exemplo:** "Pixel Financeiro" e "Pixel Vendas" de Ajustes › Agentes com exemplos (produto: `A.saltar('agentes')`).

### AG2 · Editar / Excluir agente
- **Regras:** editar nome (obrigatório: "Dê um nome ao agente."), função, área e missão; vale para a ficha e o Plano (produto: `agModal`, `agSalvar`). Excluir explica: o agente do Builder sai da lista, o Plano volta a mostrá-lo como recomendado, os checkpoints comprovados ficam no histórico e o agente no Hermes não é desligado por aqui; um registrado sai da lista e do Plano (produto: `agModal`).

### AG3 · Ficha do agente
- **Objetivo:** ver e ajustar o que o agente faz.
- **Ações:** Todos os agentes → AG1. Baixar o Starter Kit. Ajustar no Agent Builder → AG4. Interruptor da responsabilidade.
- **Regras:**
  - Responsabilidades com interruptor; sempre uma ativa ("O agente precisa de pelo menos uma responsabilidade ativa."); ativar outra conclui o passo 6 e avisa "Confira o resultado antes de ativar a próxima." (produto: `ficResp`; briefing 16/10).
  - Forma de trabalho (autonomia, escala para você, na dúvida, comunicação); ferramentas e skills com estado e lacunas; histórico com evidência (produto: `telaFicha`).
  - Sem a etiqueta "Declarado" nas linhas, só as exceções (briefing 03/11).
- **Exemplo:** "Ferraz Arquitetura" e o caso de follow-up são exemplo.

### AG4 · Agent Builder
- **Objetivo:** montar o agente em 8 passos com prévia ao lado.
- **Vem de:** AG1, IN2, PL2, FS3, menu (Novo agente), CO3, AG3, Ajustes.
- **Regras:**
  - Passos: O que o agente fará, Agente online, Identidade e papel, Forma de trabalho, Ferramentas e skills, Revisão, Starter Kit, Download e instalação (produto: `AB_STEPS`).
  - Passo 1 com três caminhos de mesmo peso: usar o agente recomendado, escolher um template, criar um personalizado (produto: `telaAB`; briefing 13/10).
  - Prévia do agente acompanha cada passo (atual em destaque, feitos com check, próximos "A definir") (briefing 16/10).
  - "O que vamos fazer agora" antes da instalação; "Problemas comuns" fecha ao avançar; última etapa do Starter Kit "Siga o onboarding do Starter Kit"; ferramentas "No onboarding"; modal de skills só com as recomendadas, "Ver todas" e "Pular" (briefing 16/10).
  - Trava: libera com a Fase 1 concluída ou para quem já tinha agente (home2.js: `abTravado`).
- **Pendências:** "Agent Builder novo, com agente novo ou incrementar" (Parte 2 do documento) ainda não feito (briefing, Pendências 6). Na Trilha padrão não há caminho para o Agent Builder; só pelos Ajustes ou com a Fase 1 concluída. A confirmar o fluxo final.

### AG5 · Agente configurado
- **Ações:** Ir para a Trilha → TR1. Ver no Plano Agêntico → PL2.
- **Regras:** "O {nome} está configurado"; a primeira vitória acontece na Trilha, com a prioritária rodando num caso real; indicadores Configuração, Hermes (Confirmado/Pendente), Ferramentas no onboarding, Primeira entrega na Trilha (produto: `telaAB` abfim).

### AG6 · Caso real (registrar a evidência)
- **Objetivo:** registrar que o agente rodou num caso real.
- **Ações:** marcar critérios; Registrar a evidência → AG7 (só com os 4 critérios e a frase).
- **Regras:** 4 critérios (executou num caso real; você conferiu; corrigiu ou não precisou; repetiu em pelo menos mais um caso) e "O que mudou, em uma frase?", que fica no Plano como evidência, com data (produto: `telaCaso`, `registrarCaso`).
- **Pendências:** só alcançável pela Trilha "Lista" (versão anterior; produto: `TR_STEPS` `abrirCaso`); na Trilha padrão não há caminho. A confirmar onde entra.

### AG7 · Checkpoint comprovado
- **Ações:** Continuar na Trilha → TR1. Ver a evidência no Plano → PL2.
- **Regras:** mostra o caso, a responsabilidade e "4 de 4 conferidos por você, em {data}"; a evidência entra no Plano (produto: `telaCheckpoint`).
- **Pendências:** celebrações na linguagem do Hub, sem tela de cor inteira (briefing 14/10).

### AG8 · Fase 1 concluída
- **Ações:** Começar a Fase 2 (aviso "não faz parte deste protótipo"). Ver no Plano Agêntico → PL2. Voltar ao início → IN2.
- **Regras:** "O {nome} já trabalha pela sua empresa"; indicadores 7 de 7 passos, 2 checkpoints, responsabilidades ativas; libera o Agent Builder do menu e muda o próximo passo do Início para o Segundo Cérebro (produto: `telaMarco`; home.js; home2.js).

### AG9 · O Agent Builder libera com a Fase 1
- **Quando aparece:** ao tocar em Novo agente, Abrir o Agent Builder, Criar no Agent Builder ou Usar no Agent Builder antes da Fase 1 (produto: revisão do kanban 04/11, C; home2.js).
- **Ações:** Ir para a etapa 1 → TR1. Agora não / Esc / fundo: fecha.
- **Regras:** "O seu primeiro agente nasce pela Trilha, na etapa 1. Quando a Fase 1 terminar, você cria os próximos agentes por aqui." (home2.js: `travaModal`). Os Ajustes do protótipo abrem o Builder direto (produto).

---

## 8. ME · Mentorias e agenda

`telaAprender` (base + k5.js), `S.scr='aprender'`, abas `S.apTab` = `ho` | `mt` | `agenda`. Título "Ajuda ao vivo para o seu passo"; no topo, "Para o seu passo agora: {pílula}" com a aula da etapa (→ TR9) e "Travou? Mentoria técnica, terça às 10h" (→ ME2) (produto: `telaAprender`).

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| ME1 | Hands-on ao vivo | `apHO2`, `S.apTab='ho'` | 3 | fase atual/futura; gravação/vazio | `ir('aprender')` |
| ME2 | Mentorias técnicas | `apMT2`, `S.apTab='mt'` | 3 (saldo muda: Individual × Empresa) | plantão agendado/livre | ME1 › aba |
| ME3 | Agenda completa | `apAgenda`, `S.apTab='agenda'` | 3 | semana/lista; filtros; sessão selecionada; semana vazia | ME1 › aba |

### ME1 · Hands-on ao vivo
- **Ações:** Adicionar à agenda (fase atual) / Participar: aviso de protótipo. Gravação → TR9.
- **Regras:** "Próximos encontros ao vivo" com as 4 fases (data, nome, "Ao vivo, às 19h"; fase futura: "O ideal é começar a fase na Trilha antes."); gravações dos hands-on; fases 2 a 4: "A gravação entra aqui depois do primeiro hands-on da fase." (k5.js: `apHO2`). Hands-on incluídos no plano, sem limite (briefing 16/10).
- **Exemplo:** datas (5, 12, 19 e 26/11) e gravações.
- **Pendências:** datas reais e quem conduz (briefing, Pendências 3).

### ME2 · Mentorias técnicas
- **Ações:** Agendar → "Agendado" com check.
- **Regras:** saldo em horas, nunca "créditos": 3 h no Individual, 12 h compartilhadas na Empresa (briefing 16/10; k5.js: `apMT2`); próximos plantões coletivos com data, 1 hora e vagas; gravações das mentorias.
- **Exemplo:** saldo usado (1 h / 3,5 h), plantões e vagas.

### ME3 · Agenda completa
- **Ações:** Hoje; semana anterior/próxima; filtros Hands-on | Mentoria técnica; Semana | Lista; sessão → detalhe ao lado com a ação (Garantir vaga / Agendar) e Fechar.
- **Regras:** semana seg a sex, 8h às 21h; sessões coloridas por tipo; sem sessão selecionada, a lateral mostra "Próximas sessões" (até 6) (produto: `apAgenda`). Abre na semana de hoje (briefing 04/11). Com a Interface Limpa, abre em Lista (produto: `apAgenda`; briefing 20/10). O onboarding não aparece na agenda (briefing 16/10).
- **Estados:** semana; lista; sessão selecionada; "Nenhuma sessão nesta semana."
- **Pendências:** "hoje" está fixo em 04/11/2026 no protótipo (produto: `apAgenda`); datas são exemplo.

---

## 9. CO · Comunidade e Cases

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| CO1 | Grupos da comunidade | `telaComunidade` | 3 | grupo "Para o seu passo" | `ir('comunidade')` |
| CO2 | Cases | `telaCases` | 3 | filtros; menu aberto; vazio | `ir('cases')` |
| CO3 | Página do case | `telaCase`, `S.csSel` | 3 | com foto / com iniciais | CO2 › cartão |
| CO4 | Enviar o meu case | `csModal`, `S.csModal` | 3 | campos pré-preenchidos com agente/evidência | CO2 › Enviar o meu case |

### CO1 · Grupos da comunidade
- **Ações:** Entrar no grupo / Entrar no grupo do WhatsApp: aviso de protótipo.
- **Regras:** cada grupo com resumo curto do que se discutiu; o da etapa atual marcado "Para o seu passo"; sem ranking nem pontuação (produto: `telaComunidade`; briefing 16/10).
- **Exemplo:** os resumos dos grupos são exemplo (briefing 16/10).
- **Pendências:** o "resumo da semana feito pelo Consultor" (briefing 16/10) não aparece mais na tela (produto: `telaComunidade`). A confirmar se saiu.

### CO2 · Cases
- **Ações:** filtros Segmento e Área (menus com contagem, combináveis); Limpar filtros; cartão → CO3; Enviar o meu case → CO4.
- **Regras:** sete cases publicados em aihub.pixeleducacao.com.br, com textos e tags do site; números do site no topo (200+ cases, 40+ publicados, 30+ segmentos, times de 2 a 200); "Cada case é analisado, selecionado e estruturado pela Pixel antes de ser publicado." (produto: `telaCases`; briefing 16/10). Opção com zero resultados aparece apagada (produto).
- **Estados:** sem filtro; filtrado; vazio "Nenhum case com esses filtros".
- **Pendências:** Cases como item próprio do menu era decisão a confirmar com o cliente (briefing 16/10). Fotos de Felipe, Elton e Mateus faltam (iniciais) (briefing 16/10).

### CO3 · Página do case
- **Ações:** Todos os cases → CO2. Abrir o Agent Builder → AG4/AG9.
- **Regras:** resumo real no topo; as sete seções do PRD (Contexto, Problema, Agente criado, Trabalho realizado, Ferramentas e skills, Implementação, Resultados) só como estrutura, para não inventar detalhes de pessoas reais (produto: `telaCase`; briefing 16/10).

### CO4 · Enviar o meu case
- **Regras:** "Qual agente você montou?" e "Que resultado ele trouxe?", pré-preenchidos com o agente e a evidência quando existem; "Nada é publicado sem a sua aprovação final."; a Pixel analisa e estrutura antes de publicar (produto: `csModal`; briefing 16/10).

---

## 10. EM · Empresa, Conta e Ajustes

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| EM1 | Sua empresa na Pixel | `telaEmpresa` | admin (outros vão para o Início) | convite pendente; lugares cheios; erros do convite | `S.profile='admin'; ir('empresa')` |
| EM2 | Conta | `telaConta` | 3 (blocos mudam) | por perfil | `ir('conta')` |
| EM3 | Sair da conta? | `sairModal`, `S.sairM` | 3 | único | EM2 › Sair da conta |
| EM4 | Área do plano completo (bloqueada) | `telaBloq`, `S.planoF` | 3 | por área | Ajustes › Plano só Formação |
| EM5 | Ajustes do protótipo | painel `#tw-pan` | protótipo | seções | botão "Ajustes do protótipo" |

### EM1 · Sua empresa na Pixel
- **Objetivo:** gerir participantes, ver a mentoria e a privacidade.
- **Quando aparece:** só Admin, pelo menu e pelo quadrado da empresa no topo do menu (produto: `lateral`, `telaEmpresa`).
- **Ações:** Convidar; Reenviar; cancelar convite / remover; Ver plantões → ME2; Plano Agêntico da empresa → PL2.
- **Regras:**
  - Topo: lugares do plano (N de 12) e mentoria técnica (horas de 12 compartilhadas) (produto). Sem gasto de IA na interface (briefing 16/10).
  - Convite por e-mail: formato válido; limite de 12 ("Os 12 lugares do plano estão ocupados.", botão desativado); sem repetir ("Essa pessoa já está na lista."); entra como Membro pendente (produto: `empConvidar`).
  - Pendente: Reenviar e cancelar; ativo: remover; você não tem ação (produto). Convites do onboarding chegam pendentes (produto: `empMembros`).
  - Privacidade em duas colunas: Você vê (o plano e as prioridades; os agentes de cada um e o estado; o uso dos lugares e da mentoria) × Você não vê (as respostas pessoais do diagnóstico; as conversas com o Consultor; os dados externos dos agentes) (produto: `telaEmpresa`).
  - "Avanço de cada participante" e "Capacidade adicional" como Em breve (produto).
- **Pendências:** a privacidade ainda fala em "diagnóstico" e não cita a entrevista, enquanto PL3 mostra os processos e ferramentas de cada pessoa. Alinhar o texto (a confirmar).
- **Exemplo:** Carla Mendes e Diego Rocha; 8,5 h de 12 h.

### EM2 · Conta
- **Ações:** Salvar perfil; interruptores de notificação; O que o Consultor sabe → CS1; Baixar os meus dados: aviso; Gerenciar a empresa (Admin) → EM1; Ajuda e suporte → CS3; Sair da conta → EM3.
- **Regras:**
  - Cabeçalho com papel (Admin, Membro, Individual) e plano (Empresa/Individual) (produto: `telaConta`).
  - Perfil: nome, cargo, e-mail, WhatsApp (produto).
  - Notificações por tipo (aprovações dos agentes, próximo passo da Trilha, sessões e hands-on, resumo da comunidade, novidades) × canal (no app, e-mail, WhatsApp) (produto: `NT_PREF`).
  - Membro vê "O que o Admin vê: a sua prioridade, o agente e o progresso. Nunca as suas respostas pessoais." (produto).
  - Individual: "3 h de mentoria técnica"; Empresa: "Mentoria técnica compartilhada pela empresa" (produto).
- **Pendências:** o texto do Membro diverge do Plano ("O Admin vê os processos e as ferramentas que você contar na entrevista; as suas respostas sobre IA ficam com você.") (plano-equipe.js). A confirmar.

### EM3 · Sair da conta?
- **Ações:** Cancelar; Sair da conta → AC1 com o aviso "Você saiu da conta".
- **Regras:** "Você volta para a tela de entrada. O seu Plano, a Trilha e os agentes continuam como estão." (produto: `sairModal`; casca: `pxAuth='saiu'`).

### EM4 · Área do plano completo (bloqueada)
- **Objetivo:** explicar o que o plano só Formação não inclui.
- **Quando aparece:** no plano só Formação, ao tocar num item com cadeado (produto: `lateral`, `telaBloq`).
- **Ações:** Conhecer o plano completo: aviso. Ir para o Conteúdo complementar → TR3.
- **Regras:** só a Trilha, aba Conteúdo complementar, fica liberada; as outras áreas com cadeado no menu; Novo agente travado; sem a caixa do Consultor (produto: `telaBloq`, `view`; briefing 16/10, 20/10).

### EM5 · Ajustes do protótipo
- **Objetivo:** ferramenta do protótipo para simular momentos e comparar versões (não é tela do produto).
- **Regras:** Ir para (Início, Trilha, Agent Builder; Onboarding por perfil: Founder 8, Gestor 8, Membro 5 perguntas); Simular um momento (Entrevista Pendente/Feita; Hands-on Antes/Em 30 min/Ao vivo/Encerrado; Estágio na Home; Checkpoint, Fase 1 concluída, Agentes com exemplos, Plano só Formação, Primeiro acesso); Versões em teste (Entrevista, Banner da entrevista, Trilha, Pixel no cartão, Conteúdo complementar, Interface, Sistema visual, Plano, versões anteriores); rodapé "Voltar ao onboarding" (produto: `#tw-pan`; briefing 09/11).
- **Pendências:** desenhar no Figma? Sugestão: só como referência de estados, não como tela (a confirmar).

---

## 11. CS · Consultor, Suporte, notificações e estrutura

| ID | Nome | Função / estado | Perfis | Estados | Reproduzir |
|---|---|---|---|---|---|
| CS1 | Consultor Pixel AI (tela central) | `telaConsultor`, `S.scr='cons'` | 3 | conversa vazia; com mensagens; WhatsApp só leitura; antes da entrevista | `ir('cons')` |
| CS2 | Caixa e painel do Consultor | `consDock` / `consPanel` | 3 | fechado; aberto; minimizado; pensando; com sugestão | qualquer tela do Hub |
| CS3 | Como podemos ajudar? (Suporte) | `telaSuporte` | 3 | FAQ filtrado; busca vazia; chamados | `ir('suporte')` |
| CS4 | Abrir um chamado | `supModal`, `S.supModal` | 3 | erros; anexo | CS3 › Abrir um chamado |
| CS5 | Notificações | `ntfDrawer`, `S.ntfOpen` | 3 (convite aceito só Admin) | lidas/não lidas | sino do topo |
| CS6 | Menu lateral e topo | `lateral`, `topoApp` | 3 (Empresa só Admin) | expandido; recolhido; gaveta no celular; cadeados | qualquer tela |
| CS7 | Avisos (toasts) | `aviso` / `pixelToast` | 3 | sucesso, erro, atenção, informação, protótipo | qualquer ação com aviso |

### CS1 · Consultor Pixel AI
- **Objetivo:** conversar com o Consultor, com histórico.
- **Vem de:** menu, CS2, EM2, CS3, FS3, IN1.
- **Ações:** Nova conversa; escolher conversa; sugestões; Enviar; Conversar pelo WhatsApp / Abrir no WhatsApp: aviso.
- **Regras:**
  - Lista: conversa de hoje, Instalação do Hermes (com agente), WhatsApp (só leitura, "Esta conversa continua no WhatsApp"), Diagnóstico inicial (produto: `convs`).
  - "Usando o seu contexto:" Plano (estágio), Trilha, agente; antes da entrevista, "Plano: depois da entrevista" (produto; entrevista.js).
  - Vazio: "Eu conheço o seu diagnóstico, o Plano, a etapa da Trilha e o que você registrou no Agent Builder. Não acesso o seu agente nem as suas ferramentas…" (produto).
  - "O Consultor pode errar. Nada vai para o Plano sem a sua confirmação." (produto).
- **Pendências:** a conversa "Diagnóstico inicial" e o texto do vazio ainda falam do diagnóstico do onboarding antigo; com a entrevista, trocar (a confirmar).
- **Exemplo:** as conversas são exemplo (produto: `CONV_MSGS`).

### CS2 · Caixa e painel do Consultor
- **Quando aparece:** embaixo das telas do Hub (Início, Trilha, Ferramentas, Plano, Agentes, ficha, Mentorias, Comunidade, Cases, case, Empresa, Conta, área bloqueada, Suporte), menos no plano só Formação (produto: `view`).
- **Ações:** escrever e Enviar (abre o painel); sugestão; Continuar no WhatsApp; Minimizar ("Conversa minimizada, N mensagens"); Encerrar ("O histórico fica no WhatsApp e no Plano.").
- **Regras:** status "Lendo o seu Plano e a etapa da Trilha" → "Montando a resposta" (produto: `consEnviar`); "Sobre: {item}" quando um item do Conteúdo complementar está aberto (briefing 20/10); fundo escurecido com o painel aberto (produto: `view`).

### CS3 · Como podemos ajudar? (Suporte)
- **Ações:** Abrir um chamado → CS4; Falar com o Consultor → CS1; Agendar mentoria técnica → ME2; busca e filtro por assunto; Novo chamado → CS4.
- **Regras:** três caminhos: conta, acesso e cobrança (Pixel responde por e-mail); jornada ou Plano (Consultor); instalação ou agente (mentoria) (produto: `telaSuporte`); FAQ por assunto (Acesso e conta, Plano e cobrança, Participantes, Dados e privacidade); "Seus chamados" com estado Aberto/Respondido; "Nunca pedimos a sua senha." (produto).
- **Exemplo:** chamado "Nota fiscal de setembro".

### CS4 · Abrir um chamado
- **Regras:** assunto (5), resumo, o que aconteceu, anexo opcional; "Nunca pedimos a sua senha." (produto: `supModal`).
- **Pendências:** validações exatas não lidas no código (`supEnviar`): a confirmar.

### CS5 · Notificações
- **Ações:** ação de cada notificação (Revisar → AG3; Abrir a Trilha → TR1; Ver → ME1; Abrir o Plano → PL2); Marcar todas como lidas; Preferências de notificação → EM2.
- **Regras:** o sino mostra o número de não lidas (produto: `topoApp`, `ntfNaoLidas`); selo em `--brand-ink` (5,2:1) (briefing 24/11). Itens: aprovação do agente (com agente), próximo passo da Trilha, hands-on, convite aceito (só Admin), Plano criado (produto: `ntfLista`). Overlay escurecido; gaveta à direita (briefing 16/10).
- **Pendências:** "Plano criado a partir do diagnóstico" e "começou o diagnóstico" aparecem mesmo antes da entrevista; trocar pela entrevista (a confirmar).

### CS6 · Menu lateral e topo
- **Regras:**
  - Itens: Início, Trilha (submenu Jornada do agente, Conteúdo complementar), Ferramentas e skills, Plano Agêntico, Agentes, Mentorias, Comunidade, Cases, Empresa (só Admin); embaixo, Consultor Pixel AI e Suporte; empresa no topo; Novo agente com cadeado até a Fase 1; pessoa no rodapé com o papel (produto: `lateral`; briefing 03/11, 04/11).
  - Sempre aberto no desktop; recolher vale para a sessão; no celular, gaveta com os nomes e o submenu (briefing 03/11).
  - Logo da Bertoni só quando a empresa é a Bertoni; foto só da Renata (briefing 04/11; produto: `lateral`).
  - Topo: título e subtítulo da tela; no Início, "Consultor no WhatsApp"; sino (produto: `topoApp`).
  - Plano só Formação: cadeado nas áreas travadas (produto: `lateral`).

### CS7 · Avisos (toasts)
- **Regras:** cartão branco no canto inferior direito, ícone num círculo tingido por tipo (sucesso verde, erro vermelho, atenção âmbar, informação azul, protótipo cinza), título curto, descrição opcional, fechar, barra de tempo, ação opcional; erro fica 6 s, os outros 4,2 s; pausa no hover; no máximo 3 empilhados; sem movimento com redução de movimento (briefing 16/10).
- **Pendências:** avisos de tipo "protótipo" marcam o que não existe no protótipo; no Figma, desenhar o destino real (a confirmar caso a caso).

---

## Contagem de telas

| Fluxo | Telas |
|---|---|
| AC · Acesso e entrada | 13 |
| ON · Onboarding 2.0 | 3 |
| IN · Início | 4 |
| EN · Entrevista | 6 |
| PL · Plano Agêntico | 3 |
| TR · Trilha | 10 |
| FS · Ferramentas e skills | 5 |
| AG · Agentes e Agent Builder | 9 |
| ME · Mentorias e agenda | 3 |
| CO · Comunidade e Cases | 4 |
| EM · Empresa, Conta e Ajustes | 5 |
| CS · Consultor, Suporte, notificações e estrutura | 7 |
| **Total** | **72** |

---

## Dúvidas para o Johnson

1. **Ordem e agrupamento:** pode ser AC → ON → IN → EN (o produto passa pelo Início antes da entrevista), com Acesso como fluxo próprio?
2. **Versões a desenhar:** só as padrão (Revisado, Limpa, Plano Novo, Imersiva, Trilha Agora)? EN6 (entrevista em conversa) e EM5 (Ajustes do protótipo) entram no Figma?
3. **Nomes das fases 2 a 4:** Início e Mentorias usam "O cérebro da sua empresa / Agentes trabalhando com seu time / Evoluindo sua empresa agêntica"; Trilha e Mapa usam "Cérebro da empresa / Agentes com o seu time / A empresa decidindo com dados". Qual vale?
4. **Privacidade do Admin:** Empresa e Conta (Membro) dizem que o Admin não vê as respostas pessoais e vê "a prioridade, o agente e o progresso"; o Plano › Equipe mostra processos e ferramentas de cada pessoa. Qual é o texto final? E a nota de privacidade do Membro, que sumiu no Plano v2, volta?
5. **"Diagnóstico" que ficou:** convite (AC7), Consultor (conversa "Diagnóstico inicial" e texto do vazio), notificações e Empresa ainda falam do diagnóstico do onboarding antigo. Troco tudo por "entrevista"?
6. **Empresa da Carla:** no perfil Membro ela é da "Rede Vitta"; na Empresa da Renata, é participante da Bertoni. Qual?
7. **Agent Builder e caso real:** na Trilha padrão não há caminho para eles (só pelos Ajustes ou pela versão Lista). Desenho como estão, ou espero o "Agent Builder novo" (Parte 2)?
8. **Entrevista imersiva:** o seletor de presença (Pixel, Anel, Anel mono) fica no produto? A conta diz "voltam para você", mas o número é o tempo gasto hoje (no Plano, só 30% a 50% volta): ajusto a copy? E a pergunta única de IA vale para a versão final?
9. **Pixel no cartão de template:** Solto (padrão), Na faixa (recomendada) ou Ao lado?
10. **Dados reais:** datas e condutores dos hands-on das fases 2 a 4, export das 149 skills, raio X dos 10 templates, capa do vídeo do Bruno com frame da Pixel e fotos dos cases que faltam.
11. **Onboarding 2.0:** o faturamento volta a ser perguntado (c36), apesar da decisão de outubro de tirá-lo. Confirmado?
12. **Comunidade:** o "resumo da semana pelo Consultor" saiu da tela de propósito?
