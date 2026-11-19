/* ===================== Ferramentas e skills (03/11): item próprio no menu, logo abaixo da Trilha =====================
   Do documento "Hub, próxima versão" (Parte 1, Menu). Templates de agentes (sistemas prontos e por área) e skills do catálogo,
   cada um com o detalhe: o raio X do template e o detalhe da skill. Conteúdo completo onde o documento mostra; nos outros, o que ele dá. */
const FR_AREAS=["Marketing e conteúdo","Vendas e comercial","Atendimento ao cliente","Gestão, RH e rotina","Processos internos e relatórios","Financeiro e cobrança","Operações e entrega","Kit global"];
const FR_SIS=[
 {id:"mos",t:"Marketing OS",d:"Criativos, campanha na Meta e aprendizado pelo seu agente.",tag:"Kit pronto",cor:"marketing",acao:["Baixar o kit","frBaixar"],kick:"Sistema pronto da Pixel",
  lede:"O Marketing OS acrescenta um sistema de marketing ao agente Hermes que você já configurou. Você conversa pelo Telegram, e o agente conduz a configuração, executa o trabalho e pede a sua aprovação antes das ações com efeito.",
  chips:["6 blocos","13 skills","5 rotinas","Pede aprovação antes de agir","Telegram e Meta Ads"],
  blocos:[["Base: o negócio conectado","Conecta a conta Meta certa, cadastra produto e oferta e mostra a primeira coleta de números, sem inventar dado.",[["Marketing OS: mapa e entrada","Mostra o mapa dos blocos e o progresso, e leva ao bloco certo para começar ou retomar."],["Wizard da Fundação","Guia o Business Manager, o token da Meta, os produtos, o painel e a primeira coleta, sempre com a sua confirmação."]],"Meta Ads, Telegram"],
   ["Bloco 1: produção de criativo estático","Lê a oferta e o que já aprendeu, prepara brief e copy, gera as peças e apresenta cada uma para a sua decisão.",[["Wizard B1: criativo estático","Levanta as referências da marca, cria o brief e prepara o lote aprovado para a campanha."],["Criativos estáticos","Prepara briefs e peças da marca e registra a fila de aprovação; não publica campanha nem inventa prova."]],"Gerador de imagem, Telegram"],
   ["Bloco 2: subir criativos no Meta Ads","Monta campanha, conjuntos e anúncios sempre pausados; ativar é uma segunda decisão sua, com o custo por dia na tela.",[["Wizard B2: campanhas","Escolhe a mídia aprovada, o objetivo, o destino, o público e o orçamento, e revisa a montagem com você."],["Subir campanhas Meta","Valida e monta a campanha pausada, com recibo e leitura de volta na conta."]],"Meta Ads"],
   ["Bloco 3: otimização de campanhas","Coleta os números, explica ROAS ou CPL e prepara uma prévia antes de qualquer ação de verba.",[["Wizard B3: verba","Lê os números, prepara as prévias e revisa a política de verba; nunca aumenta verba sozinho."],["Aplicar verba Meta","Gera o relatório e aplica redução ou pausa só com a sua autorização."]],"Meta Ads, Painel do Marketing OS"],
   ["Bloco 4: teste de criativo","Documenta os anúncios com os IDs reais e abre testes quando há comparação honesta entre as peças.",[["Wizard B4: catálogo","Escolhe o produto, documenta os anúncios e abre os testes com pisos mínimos explícitos."],["Documentar criativos","Encontra no lote os testes de gancho, CTA, visual, texto, ângulo e formato."],["Sincronizar status de criativos","Atualiza o status de cada anúncio no catálogo a partir da última coleta."]],"Meta Ads"],
   ["Bloco 5: aprendizados de criativos","Julga os testes maduros e transforma o que funcionou em aprendizado para os próximos lotes, sem vencedor inventado.",[["Wizard B5: consolidação","Fecha os testes, registra os aprendizados e apresenta o relatório."],["Consolidar testes criativos","Julga a evidência de cada teste e registra o aprendizado; não mexe em campanha nem em verba."]],"Painel do Marketing OS"]],
  rotinas:[["Coleta de dados","Todo dia, 8h30 e 20h30. Atualiza os números da conta. Nunca escreve na Meta."],["Métricas e prévias de verba","Todo dia, 9h. Confere os números e entrega a prévia de verba. Por padrão, só a prévia."],["Status do catálogo","Todo dia, 10h. Atualiza o status de cada anúncio no catálogo."],["Consolidação de testes","Todo dia, 19h. Consolida os testes abertos e, na sexta, entrega o relatório da semana."],["Próximo lote de criativos","Toda segunda, 11h. Propõe o brief do próximo lote e pede a sua aprovação. Nasce pausada."]],
  rotNota:"Toda rotina chega como proposta: o agente só cria depois da sua confirmação.",
  antes:["Agente Hermes na VPS, respondendo no Telegram.","Acesso SSH à VPS a partir de um computador.","Business Manager da Meta com a conta de anúncios dentro dele.","Informações reais do produto, da oferta e do público."],
  instalar:["Baixe o kit, sem descompactar.","Envie o arquivo .zip para o seu agente.","Envie junto o pedido pronto que acompanha o kit.","Siga o onboarding com o agente, uma pergunta por vez."]},
 {id:"sc",t:"Segundo Cérebro",d:"Conhecimento, notas, contexto e memória com agentes, para você e para a empresa.",tag:"Kit pronto",cor:"operacao",acao:["Baixar o kit","frBaixar"],kick:"Sistema pronto da Pixel",
  lede:"O Segundo Cérebro organiza conhecimento, notas, contexto e memória em pastas que o seu agente consulta e mantém. Funciona com Hermes, Claude Code, Codex ou OpenClaw.",
  zip:[["Pessoal","uma camada sobre a pasta de trabalho que você já usa. Preserva os seus arquivos e pede confirmação antes de copiar ou sobrescrever."],["Empresa","o cérebro operacional do time, com áreas, agentes e uma caixa de entrada para cada pessoa."]],
  instalar:["Baixe os templates.","Envie o arquivo .zip para o seu agente.","Envie junto o pedido pronto que acompanha o kit.","Confirme os ajustes que o agente propuser, uma pergunta por vez."]},
 {id:"amora",t:"Amora, o agente do Bruno",d:"Um guia da Amora por dentro: como cada parte funciona e como está configurada.",tag:"34 guias",cor:"hub",acao:["Ver por dentro","frPorDentro"],kick:"Sistema pronto da Pixel",
  lede:"A Chief of Staff do Bruno, aberta por dentro: as responsabilidades com as skills, as rotinas, as 10 partes e os 3 níveis para aplicar no seu agente.",
  chips:["3 responsabilidades","3 rotinas","10 partes por dentro","3 níveis para aplicar"],
  rotinas:[["Brief da manhã",""],["Fechamento do dia",""],["Cobrança semanal",""]],rotNota:"Na Amora de verdade, são 44 rotinas.",
  porDentro:"As 3 responsabilidades com as skills, as 10 partes e os 3 níveis estão no guia completo, em “Ver por dentro”."}];
const FR_AREA=[
 {id:"vendas",t:"Vendas",d:"Atender quem chega, marcar a reunião e não deixar nenhuma negociação esfriar.",nome:"Pixel Vendas",lede:"Agente de Vendas. Atender quem chega, marcar a reunião e não deixar nenhuma negociação esfriar.",
  chips:["4 responsabilidades","5 skills","1 rotina","5 ferramentas","Executar com aprovação","Trabalha para uma pessoa"],
  resp:[["Qualificar e responder os leads que chegam",1,"Triar cada lead novo por perfil, necessidade, momento e decisão, dar a temperatura e preparar a primeira resposta no WhatsApp.",["qualif","whats"],"Sob pedido","WhatsApp, HubSpot ou Pipedrive"],
   ["Marcar as reuniões comerciais",0,"Propor horários conferidos na agenda, confirmar, lembrar o lead e preparar o briefing de quem atende.",["reuniao"],"Sob pedido","Google Calendar, WhatsApp"],
   ["Fazer o follow-up das negociações",0,"Acompanhar cada proposta em aberto, registrar o que foi combinado e preparar a próxima mensagem antes de esfriar.",["followup"],"Sob pedido","HubSpot ou Pipedrive, WhatsApp, Gmail"],
   ["Manter o pipeline atualizado",0,"Revisar os estágios toda semana, apontar negócios parados e projetar o fechamento do mês.",["pipeline"],"Rotina, toda semana","HubSpot ou Pipedrive, Google Sheets"]],
  rotinas:[["Manter o pipeline atualizado","Toda semana"]],rotNota:"As outras responsabilidades rodam sob pedido. Para virar rotina, o agente usa a skill Contrato de rotina, que vem em todo kit.",
  ferr:[["WhatsApp","Mensagens a clientes e fornecedores pela API oficial da Meta, inclusive templates aprovados."],["HubSpot ou Pipedrive","CRM: buscar e atualizar contatos, empresas e negócios."],["Google Calendar","Agenda: listar eventos, achar horário livre, criar e alterar compromissos."],["Gmail","Caixa de e-mail: ler, buscar, rascunhar e enviar mensagens."],["Google Sheets","Planilhas do negócio: ler abas e intervalos, acrescentar e atualizar linhas."]]},
 {id:"marketing",t:"Marketing",d:"Transformar as prioridades de Marketing em briefings e entregas consistentes."},
 {id:"atendimento",t:"Atendimento",d:"Cuidar da carteira de clientes para que nenhum prazo, renovação ou reclamação passe."},
 {id:"financeiro",t:"Financeiro",d:"Manter caixa, contas e cobrança sob controle sem o dono precisar abrir planilha todo dia."},
 {id:"operacoes",t:"Operações",d:"Manter as entregas no prazo e as rotinas das unidades sem pendências esquecidas."},
 {id:"rh",t:"RH",d:"Tirar da rotina do dono a burocracia de gente: vagas, onboarding, ponto e obrigações."},
 {id:"dados",t:"Dados",d:"Transformar as planilhas e exportações da empresa em respostas e relatórios confiáveis."},
 {id:"gestao",t:"Gestão",d:"Tirar da mesa do dono a caixa de entrada, as cobranças e o resumo da semana."},
 {id:"cos",t:"Chief of Staff",d:"Ser a caixa de entrada, a memória e a cobrança da liderança."},
 {id:"orq",t:"Orquestrador",d:"Ser o agente da liderança: captar o que a empresa produz para o cérebro."},
 {id:"geral",t:"Geral",d:"Responder dúvidas internas e encaminhar pedidos com o contexto autorizado."}];
const FR_SK=[
 {id:"whats",t:"Abordagem no WhatsApp — Conduzir a Conversa Comercial",a:"Vendas e comercial",d:"Próxima mensagem de WhatsApp pronta para enviar (primeira resposta, preço cedo, ‘vou pensar’, retomada, condução à reunião), leitura do estágio da conversa e banco de respostas que funcionaram.",
  quando:"Use para responder lead no WhatsApp: a próxima mensagem.",
  como:"Conduz a conversa comercial no WhatsApp com um lead ou contato morno: primeira resposta, retomada de conversa parada, resposta a ‘quanto custa’, envio de material e condução para a reunião ou o fechamento. Entrega os textos prontos para o dono ou vendedor enviar. Use quando o usuário pedir ‘o que eu respondo pra esse lead’, ‘me ajuda a retomar essa conversa’, ‘como eu respondo quando ele pergunta o preço’ ou colar uma conversa de WhatsApp pedindo a próxima mensagem.",
  dl:"O SKILL.md, para enviar ao seu agente."},
 {id:"qualif",t:"Qualificação de Leads — Triagem de Quem Chega",a:"Vendas e comercial",d:"Lead registrado com perfil, necessidade, momento e decisão, temperatura (quente, morno ou frio), roteiro de perguntas pronto e próximo passo decidido; fila priorizada de leads sob demanda."},
 {id:"reuniao",t:"Agendar Reunião — Do Lead Quente à Reunião Realizada",a:"Vendas e comercial",d:"Horários propostos conferidos na agenda, reunião confirmada com evento, lembrete e briefing de 4 linhas para quem atende, tratamento de no-show e remarcação, agenda comercial da semana."},
 {id:"followup",t:"Follow-up Comercial — Registro de Reunião e Régua de Cobrança",a:"Vendas e comercial",d:"Registro estruturado da reunião comercial com régua de follow-up calculada, lista de ‘quem cobrar hoje’ e textos de follow-up prontos por tentativa."},
 {id:"pipeline",t:"Pipeline e Previsão de Vendas",a:"Vendas e comercial",d:"Estrutura de pipeline com critérios de estágio, registro de oportunidades, ritual de revisão semanal, previsão em 3 cenários e diagnóstico de gargalo."},
 {id:"agcap",t:"Agenda e Capacidade de Atendimento",a:"Atendimento ao cliente",d:"Agenda de atendimento organizada em tabela e cálculo de capacidade e ocupação."},
 {id:"agprio",t:"Agenda e Preparação de Prioridades",a:"Gestão, RH e rotina",d:"Lista de 3 a 5 prioridades da semana com blocos de agenda e candidatos a delegação."},
 {id:"aiseo",t:"AI SEO",a:"Marketing e conteúdo",d:"Auditoria de visibilidade em buscadores de IA e plano de otimização."},
 {id:"alertas",t:"Alertas e Limiares de Métricas Críticas",a:"Processos internos e relatórios",d:"Ficha de métrica com limiares verde, amarelo e vermelho e a ação combinada por faixa."},
 {id:"horas",t:"Alocação e Controle de Horas",a:"Atendimento ao cliente",d:"Mapa de alocação, registro de horas e comparativo previsto e realizado por cliente e projeto."},
 {id:"gap",t:"Análise de Gap Semântico",a:"Marketing e conteúdo",d:"Lista de gaps semânticos (entidades, subtópicos, triplas EAV) classificados."}];
const FR_TOTAL_SK=149;
const frSk=id=>FR_SK.find(x=>x.id===id);
const frTpl=id=>FR_SIS.find(x=>x.id===id)||FR_AREA.find(x=>x.id===id);
const FR_IC='<svg class="u" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c.4 3.6 1.9 5.9 5.6 6.4-3.7.6-5.2 2.9-5.6 6.6-.4-3.7-1.9-6-5.6-6.6 3.7-.5 5.2-2.8 5.6-6.4Z"/><path d="M18.5 15.5c.2 1.6.8 2.4 2.3 2.7-1.5.3-2.1 1.1-2.3 2.8-.2-1.7-.8-2.5-2.3-2.8 1.5-.3 2.1-1.1 2.3-2.7Z"/></svg>';
const FR_DL='<svg class="u" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14"/></svg>';
const FR_RT='<svg class="u" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
function frS(){ return S.fr||(S.fr={q:"",area:"",md:null}); }
function frCardTpl(x,sis){ return `<button class="fr-tc" data-act="frAbrir" data-arg="${x.id}"><span class="fr-ti">${px(sis?x.cor:"extensao",30)}</span><b>${esc(x.t)}</b><p>${esc(x.d)}</p><span class="fr-tg">${esc(sis?x.tag:"Agent Builder")}</span><span class="fr-vd">Ver detalhes${u("arrow")}</span></button>`; }
function telaFerr(){ const st=frS(), q=(st.q||"").toLowerCase().trim();
  const sk=FR_SK.filter(x=>(!st.area||x.a===st.area)&&(!q||(x.t+" "+x.d).toLowerCase().includes(q)));
  const lupa='<svg class="u" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>';
  return `<div class="shell noagent ${S.sideOpen?"side-open":""}">${lateral()}${S.sideOpen?'<div class="scrim" data-act="menuM"></div>':""}<main class="center">${topoApp("Ferramentas e skills","Para usar nos seus agentes")}<div class="views"><div class="view" id="scroller"><div class="page fr">
    <div class="phd"><h1 id="focus-h" tabindex="-1">Ferramentas e skills</h1><p>Os templates de agentes e as skills para os seus agentes. As aulas, os prompts, os guias e as ferramentas ficam na Trilha, na Base de conhecimento.</p></div>
    <section class="fr-sec"><div class="fr-sh"><h2>Templates de agentes</h2><span>${FR_SIS.length+FR_AREA.length} templates</span></div>
      <p class="fr-sub">Sistemas prontos da Pixel</p><div class="fr-grid">${FR_SIS.map(x=>frCardTpl(x,1)).join("")}</div>
      <p class="fr-sub">Por área, no Agent Builder</p><div class="fr-grid">${FR_AREA.map(x=>frCardTpl(x,0)).join("")}</div></section>
    <section class="fr-sec"><div class="fr-sh"><h2>Skills</h2><span>${FR_TOTAL_SK} skills</span></div>
      <div class="fr-bq">${lupa}<input id="fr-q" placeholder="Buscar por nome ou objetivo" value="${esc(st.q)}" aria-label="Buscar skills por nome ou objetivo"></div>
      <div class="fr-fil" role="group" aria-label="Filtrar por área">${["",...FR_AREAS].map(a=>`<button class="fr-ch ${st.area===a?"on":""}" aria-pressed="${st.area===a}" data-act="frArea" data-arg="${esc(a)}">${a?esc(a):"Todas"}</button>`).join("")}</div>
      ${sk.length?`<div class="fr-grid">${sk.map(x=>`<button class="fr-sc" data-act="frSkill" data-arg="${x.id}"><span class="fr-si">${FR_IC}</span><b>${esc(x.t)}</b><p>${esc(x.d)}</p><span class="fr-tg">${esc(x.a)}</span><span class="fr-vd">Ver detalhes${u("arrow")}</span></button>`).join("")}</div>`:`<p class="fr-vz">${q?"Nenhuma skill com essa palavra nesta área. Tente outra palavra ou pergunte ao Consultor.":"As skills desta área entram com o catálogo do Agent Builder."}</p>`}
      <p class="fr-nota">No protótipo aparecem ${FR_SK.length} das ${FR_TOTAL_SK} skills do catálogo do Agent Builder; as outras entram com a integração.</p></section>
  </div></div></div></main>${st.md?frModal():""}</div>`; }
function frModal(){ const st=frS(); const [k,id]=st.md.split(":"); const foot=(a)=>`<div class="fr-mf">${a}<button class="btn btn-g" data-act="frCons" data-arg="${esc(st.md)}">Tirar dúvidas com o Consultor</button><button class="btn btn-q" data-act="frFechar">Fechar</button></div>`;
  let h="";
  if(k==="s"){ const x=frSk(id); if(!x) return "";
    h=`<div class="fr-mh">${`<span class="fr-si big">${FR_IC}</span>`}<div><small>Skill</small><h2 id="fr-mt">${esc(x.t)}</h2><span class="fr-tg">${esc(x.a)}</span></div></div>
      <div class="fr-mb"><h3>Para que serve</h3><p>${esc(x.d)}</p>${x.quando?`<h3>Quando usar</h3><p>${esc(x.quando)}</p>`:""}${x.como?`<h3>Como funciona</h3><p>${esc(x.como)}</p>`:""}<h3>O que vem no download</h3><p>${esc(x.dl||"O SKILL.md, para enviar ao seu agente.")}</p>${x.quando?"":'<p class="fr-mvz">“Quando usar” e “Como funciona” entram com o catálogo do Agent Builder.</p>'}</div>
      <div class="fr-mf"><button class="btn btn-p" data-act="frBaixarSkill" data-arg="${x.id}">${FR_DL}Baixar a skill</button><button class="btn btn-g" data-act="frCons" data-arg="${esc(st.md)}">Perguntar ao Consultor</button><button class="btn btn-q" data-act="frFechar">Fechar</button></div>`;
  } else { const x=frTpl(id); if(!x) return ""; const sis=FR_SIS.includes(x);
    const cab=`<div class="fr-mh"><span class="fr-ti big">${px(sis?x.cor:"extensao",40)}</span><div><small>${sis?x.kick:"Template de agente, Agent Builder"}</small><h2 id="fr-mt">${esc(x.nome||x.t)}</h2><p>${esc(x.lede||x.d)}</p>${x.chips?`<div class="fr-chips">${x.chips.map(c=>`<span>${esc(c)}</span>`).join("")}</div>`:""}</div></div>`;
    let corpo="";
    if(x.resp){ corpo+=`<h3>O que compõe o agente</h3>${x.resp.map(([t,pri,d,sks,modo,fer])=>`<div class="fr-blk"><div class="fr-bh"><b>${esc(t)}</b>${pri?'<span class="fr-pri">Roda primeiro</span>':""}</div><p>${esc(d)}</p>${sks.map(sid=>{ const s=frSk(sid); return `<button class="fr-msk" data-act="frSkill" data-arg="${sid}"><span class="fr-si">${FR_IC}</span><span><b>${esc(s.t)}</b><small>${esc(s.d)}</small></span></button>`; }).join("")}<div class="fr-bf"><span class="fr-modo ${/Rotina/.test(modo)?"rt":""}">${esc(modo)}</span>${esc(fer)}</div></div>`).join("")}`; }
    if(x.blocos){ corpo+=`<h3>O que compõe o sistema</h3>${x.blocos.map(([t,d,sks,fer])=>`<div class="fr-blk"><div class="fr-bh"><b>${esc(t)}</b></div><p>${esc(d)}</p>${sks.map(([n,sd])=>`<div class="fr-msk st"><span class="fr-si">${FR_IC}</span><span><b>${esc(n)}</b><small>${esc(sd)}</small></span></div>`).join("")}<div class="fr-bf">${esc(fer)}</div></div>`).join("")}`; }
    if(x.zip){ corpo+=`<h3>O que vem no zip</h3><ul class="fr-ul">${x.zip.map(([a,b])=>`<li><b>${esc(a)}:</b> ${esc(b)}</li>`).join("")}</ul>`; }
    if(x.rotinas){ corpo+=`<h3>Rotinas</h3><ul class="fr-rot">${x.rotinas.map(([a,b])=>`<li><span class="fr-ri">${FR_RT}</span><span><b>${esc(a)}</b>${b?`<small>${esc(b)}</small>`:""}</span></li>`).join("")}</ul>${x.rotNota?`<p class="fr-mn">${esc(x.rotNota)}</p>`:""}`; }
    if(x.ferr){ corpo+=`<h3>Ferramentas que ele usa</h3><ul class="fr-ul">${x.ferr.map(([a,b])=>`<li><b>${esc(a)}:</b> ${esc(b)}</li>`).join("")}</ul>`; }
    if(x.porDentro){ corpo+=`<p class="fr-mn">${esc(x.porDentro)}</p>`; }
    if(x.antes){ corpo+=`<h3>Antes de começar</h3><ul class="fr-ul">${x.antes.map(a=>`<li>${esc(a)}</li>`).join("")}</ul>`; }
    if(x.instalar){ corpo+=`<h3>Como instalar</h3><ol class="fr-ol">${x.instalar.map(a=>`<li>${esc(a)}</li>`).join("")}</ol>`; }
    if(!corpo) corpo=`<p class="fr-mvz">O raio X completo deste template (o papel e a missão, as responsabilidades com as skills, as rotinas e as ferramentas) vem do catálogo do Agent Builder.</p>`;
    const ac=sis?`<button class="btn btn-p" data-act="${x.acao[1]}" data-arg="${x.id}">${x.acao[1]==="frBaixar"?FR_DL:""}${esc(x.acao[0])}</button>`:`<button class="btn btn-p" data-act="frUsarAB" data-arg="${x.id}">Usar no Agent Builder</button>`;
    h=cab+`<div class="fr-mb">${corpo}</div>`+foot(ac); }
  return `<div class="fr-ov" data-act="frFechar"></div><div class="fr-md" role="dialog" aria-modal="true" aria-labelledby="fr-mt"><button class="ibtn fr-x" data-act="frFechar" aria-label="Fechar">${u("x")}</button>${h}</div>`; }
Object.assign(A,{
  irFerr:()=>{ S.sideOpen=false; ir("ferramentas"); },
  frArea:a=>{ frS().area=a; R(); },
  frAbrir:id=>{ frS().md="t:"+id; R(); requestAnimationFrame(()=>document.querySelector(".fr-md")?.scrollTo({top:0})); },
  frSkill:id=>{ frS().md="s:"+id; R(); requestAnimationFrame(()=>document.querySelector(".fr-md")?.scrollTo({top:0})); },
  frFechar:()=>{ frS().md=null; R(); },
  frCons:k=>{ const [t,id]=k.split(":"); const x=t==="s"?frSk(id):frTpl(id); frS().md=null; S.cons.aberto=true;
    const nome=x?(x.nome||x.t):""; S.cons.msgs.push({me:1,t:t==="s"?`Como funciona a skill “${nome}” e quando eu uso?`:`Como o template ${nome} funciona e por onde eu começo?`});
    S.cons.msgs.push({t:t==="s"?`A “${nome}” entra no seu agente como uma skill. Me diga em que situação você quer usar e eu te mostro o pedido certo para ele.`:(x&&x.resp?`O ${nome} tem ${x.resp.length} responsabilidades, e a primeira a rodar é “${x.resp.find(r=>r[1])[0]}”. O caminho mais curto é usar o template no Agent Builder e ligar essa primeira. Quer que eu te leve lá?`:`O ${nome} é um ponto de partida pronto. Me conte o que você quer que ele faça na sua empresa e eu te digo por onde começar.`)}); R(); },
  frUsarAB:id=>{ frS().md=null; A.abrirAB&&A.abrirAB(); aviso("O Agent Builder abre já com este template. No protótipo, abre o Builder do começo.","prototipo"); },
  frBaixar:id=>aviso("Baixa o kit (.zip) com o pedido pronto. No protótipo, fica só o aviso.","prototipo"),
  frBaixarSkill:id=>aviso("Baixa o SKILL.md desta skill. No protótipo, fica só o aviso.","prototipo"),
  frPorDentro:id=>aviso("Abre o guia da Amora por dentro (34 guias). No protótipo, fica só o aviso.","prototipo")
});
document.addEventListener("input",e=>{ if(e.target.id==="fr-q"){ frS().q=e.target.value; const pos=e.target.selectionStart; R(); const n=document.getElementById("fr-q"); if(n){ n.focus(); n.setSelectionRange(pos,pos); } } });
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&S.fr&&S.fr.md){ S.fr.md=null; R(); } });
