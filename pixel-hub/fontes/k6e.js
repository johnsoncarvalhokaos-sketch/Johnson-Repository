/* ===================== parte 5: onboarding em três fluxos por perfil (c36) =====================
   Founder: o onboarding individual completo. Company Gestor: a visão macro da empresa (segmento, o que vende, estrutura).
   Company Membro (convidado): só função, atribuições e onde gasta tempo, sem repetir as perguntas do gestor.
   Base: documento "Hub, próxima versão" (Onboarding 2.0: só identifica, sem diagnóstico; etapas, abertura e fecho do Consultor). */
const OB_SET=["Varejo","Indústria","Serviços B2B","Saúde","Educação","Tecnologia","Alimentação","Construção","Agro","Logística","Financeiro","Imobiliário"];
const OB_CARGO=["Fundador/Sócio","C-level","Gestor/Head","Analista/Especialista"];
const OB_PES=["Só eu","2–10","11–50","51–100","mais de 100"];
const OB_FAT=["Ainda não faturo","Até R$ 500 mil/ano","R$ 500 mil a R$ 1 milhão/ano","R$ 1 a R$ 5 milhões/ano","R$ 5 a R$ 10 milhões/ano","R$ 10 a R$ 50 milhões/ano","R$ 50 a R$ 100 milhões/ano","Acima de R$ 100 milhões/ano"];
const OB_AREAS=["Vendas e comercial","Marketing e conteúdo","Atendimento ao cliente","Operações e entrega","Financeiro e cobrança","Gestão, RH e rotina do time","Processos internos e relatórios"];
const OB_TEMPO=["Reuniões","E-mail e mensagens","Planilhas e relatórios","Atendimento a clientes","Vendas e propostas","Gestão do time"];
const OB_FLUXOS={
  founder:{n:"Founder",etapas:["Visão geral","Sobre você e a empresa","Onboarding coletivo"],abre:"Oi! Sou o Consultor Pixel AI. Antes de tudo, quero conhecer você e a sua empresa. São perguntas rápidas: o plano vem depois, na nossa entrevista.",
    q:[["nome","Como você se chama?","texto"],["cargo","Qual é o seu cargo?","texto",OB_CARGO],["emp","Qual é o nome da sua empresa?","texto"],["setor","Em qual setor ela atua?","texto",OB_SET],["vende","O que a empresa vende?","texto",null,"Ex.: móveis planejados para apartamentos"],["pes","Quantas pessoas trabalham na empresa?","escolha",OB_PES],["fat","Qual é o faturamento anual da empresa?","escolha",OB_FAT],["tempo","Onde você gasta mais tempo na semana?","multi",OB_TEMPO]],
    agenda:"Agendar o onboarding coletivo"},
  gestor:{n:"Company Gestor",etapas:["Visão geral","Sobre a empresa","Onboarding da empresa"],abre:"Oi! Sou o Consultor Pixel AI. Antes de tudo, quero ter a visão geral da sua empresa: o que ela faz, o que vende e como está organizada. O plano vem depois, na nossa entrevista.",
    q:[["nome","Como você se chama?","texto"],["cargo","Qual é o seu cargo?","texto",OB_CARGO],["emp","Qual é o nome da empresa?","texto"],["setor","Em qual segmento ela atua?","texto",OB_SET],["vende","O que a empresa vende?","texto",null,"Ex.: móveis planejados para apartamentos"],["pes","Quantas pessoas trabalham na empresa?","escolha",OB_PES],["areas","Quais áreas a empresa tem hoje?","multi",OB_AREAS],["fat","Qual é o faturamento anual da empresa?","escolha",OB_FAT]],
    agenda:"Agendar o onboarding da empresa"},
  membro:{n:"Company Membro",etapas:["Visão geral","Sobre você"],abre:"Oi! Sou o Consultor Pixel AI. A sua empresa já está aqui e fez o seu convite, então não vou repetir as perguntas sobre ela. São só algumas perguntas sobre o seu trabalho.",
    q:[["nome","Como você se chama?","texto"],["cargo","Qual é a sua função?","texto",OB_CARGO],["area","Em qual área você atua?","escolha",OB_AREAS],["atrib","Quais são as suas principais atribuições?","texto",null,"Ex.: responder orçamentos e acompanhar pedidos"],["tempo","Onde você gasta mais tempo na semana?","multi",OB_TEMPO]],
    agenda:null}};
function obS(){ return S.ob2||(S.ob2={f:"gestor",i:-1,r:{}}); }
function telaOnb2(){ const st=obS(), F=OB_FLUXOS[st.f], tot=F.q.length, i=st.i; const fim=i>=tot;
  const etAtual=i<0?0:fim?(F.etapas.length-1):1;
  const top=`<header class="ob2-top"><span class="ob2-logo">${px("hub",28)}<b>Pixel</b></span><ol class="ob2-et">${F.etapas.map((e,k)=>`<li class="${k<etAtual?"ok":k===etAtual?"at":""}"><span>${k<etAtual?u("check"):k+1}</span>${esc(e)}</li>`).join("")}</ol><span class="ob2-perfil">${esc(F.n)}</span></header>`;
  let corpo="";
  if(i<0) corpo=`<div class="ob2-c ob2-vg"><p class="ob2-k">Visão geral</p><h1 id="focus-h" tabindex="-1">Bem-vindo à Pixel</h1><p class="ob2-l">${esc(F.abre)}</p><div class="hvd-th ob2-v" role="img" aria-label="Vídeo do Bruno"><span class="hvd-pl">${u("play")}</span></div><button class="btn btn-p btn-jornada" data-act="ob2Ir" data-arg="0">Começar as perguntas${u("arrow")}</button><p class="ob2-n">${tot} perguntas rápidas. Leva uns 2 minutos.</p></div>`;
  else if(!fim){ const [k,t,tipo,ops,ph]=F.q[i]; const v=st.r[k]; const sel=Array.isArray(v)?v:[];
    const campo=tipo==="texto"?`<input class="ob2-in" id="ob2-in" value="${esc(v||"")}" placeholder="${esc(ph||"Escreva aqui")}" aria-label="${esc(t)}">${ops?`<div class="ob2-sg">${ops.map(o=>`<button class="ob2-ch ${v===o?"on":""}" data-act="ob2Sug" data-arg="${esc(o)}">${esc(o)}</button>`).join("")}</div>`:""}`
      :tipo==="escolha"?`<div class="ob2-op" role="radiogroup" aria-label="${esc(t)}">${ops.map(o=>`<button role="radio" aria-checked="${v===o}" class="ob2-ch lg ${v===o?"on":""}" data-act="ob2Esc" data-arg="${esc(o)}">${esc(o)}</button>`).join("")}</div>`
      :`<div class="ob2-op" role="group" aria-label="${esc(t)}">${ops.map(o=>`<button aria-pressed="${sel.includes(o)}" class="ob2-ch lg ${sel.includes(o)?"on":""}" data-act="ob2Multi" data-arg="${esc(o)}">${sel.includes(o)?u("check"):""}${esc(o)}</button>`).join("")}</div><p class="ob2-n">Pode marcar mais de uma.</p>`;
    const ok=tipo==="multi"?sel.length>0:!!v;
    corpo=`<div class="ob2-c"><div class="ob2-pg"><i><b style="width:${(i/tot*100).toFixed(0)}%"></b></i><span>${i+1} de ${tot}</span></div><div class="ob2-msg"><span class="ob2-av">${px("hub",30)}</span><h1 id="focus-h" tabindex="-1">${esc(t)}</h1></div>${campo}
      <div class="ob2-a"><button class="btn btn-q" data-act="ob2Ir" data-arg="${i-1}">${u("chev")}Voltar</button><button class="btn btn-p" data-act="ob2Prox" ${tipo!=="texto"&&!ok?"disabled":""}>${i===tot-1?"Concluir":"Continuar"}${u("arrow")}</button></div></div>`; }
  else { const r=st.r, nome=(r.nome||"").split(" ")[0]||"tudo certo";
    const ctx=st.f==="membro"?[["Função",r.cargo],["Área",r.area],["Atribuições",r.atrib]]:[["Empresa",r.emp],["Cargo",r.cargo],["Setor",r.setor],["Pessoas",r.pes],["Faturamento",r.fat]];
    corpo=`<div class="ob2-c ob2-fim"><span class="ob2-ok">${u("check")}</span><h1 id="focus-h" tabindex="-1">Pronto, ${esc(nome)}.</h1><p class="ob2-l">${F.agenda?`Agora é ${st.f==="founder"?"agendar o onboarding coletivo":"agendar o onboarding da empresa"} com a equipe Pixel. `:""}No Hub, a sua primeira pendência é a entrevista comigo: é nela que eu monto o seu Plano Agêntico.</p>
      <dl class="ob2-ctx">${ctx.filter(x=>x[1]).map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>
      <div class="ob2-a fim">${F.agenda?`<button class="btn btn-p btn-jornada" data-act="ob2Agendar">${CAL_IC}${esc(F.agenda)}</button>`:""}<button class="btn ${F.agenda?"btn-q":"btn-p btn-jornada"}" data-act="ob2Hub">Ir para o Hub${u("arrow")}</button></div></div>`; }
  return `<div class="ob2">${top}<main class="ob2-m">${corpo}</main></div>`; }
(function(){ const _vw=view; view=function(){ if(S.scr==="onb2") return telaOnb2(); return _vw(); }; })();
function ob2Salvar(){ const st=obS(), F=OB_FLUXOS[st.f]; if(st.i<0||st.i>=F.q.length) return; const [k,,tipo]=F.q[st.i]; if(tipo==="texto"){ const el=document.getElementById("ob2-in"); if(el) st.r[k]=el.value.trim(); } }
Object.assign(A,{
  ob2Abrir:f=>{ S.ob2={f,i:-1,r:{}}; S.profile=f==="founder"?"individual":f==="membro"?"membro":"admin"; if(typeof painel==="function") painel(false); ir("onb2"); },
  ob2Ir:k=>{ ob2Salvar(); const st=obS(); st.i=Math.max(-1,+k); R(); requestAnimationFrame(()=>document.getElementById("ob2-in")?.focus()); },
  ob2Prox:()=>{ ob2Salvar(); const st=obS(), F=OB_FLUXOS[st.f], [k,,tipo]=F.q[st.i]; if(tipo==="texto"&&!st.r[k]){ aviso("Escreva uma resposta ou escolha uma das sugestões.","prototipo"); return; } st.i++; R(); requestAnimationFrame(()=>document.getElementById("ob2-in")?.focus()); },
  ob2Sug:o=>{ const st=obS(), [k]=OB_FLUXOS[st.f].q[st.i]; st.r[k]=o; R(); },
  ob2Esc:o=>{ const st=obS(), [k]=OB_FLUXOS[st.f].q[st.i]; st.r[k]=o; R(); },
  ob2Multi:o=>{ const st=obS(), [k]=OB_FLUXOS[st.f].q[st.i]; const a=Array.isArray(st.r[k])?st.r[k]:[]; st.r[k]=a.includes(o)?a.filter(x=>x!==o):[...a,o]; R(); },
  ob2Agendar:()=>aviso("Abre a agenda do time Pixel (Calendly), com o contexto da empresa, do cargo, do setor, das pessoas e do faturamento.","prototipo"),
  ob2Hub:()=>{ S.entrev=false; S.bvVisto=false; ir("home"); }
});
document.addEventListener("keydown",e=>{ if(S.scr==="onb2"&&e.key==="Enter"&&e.target&&e.target.id==="ob2-in"){ e.preventDefault(); A.ob2Prox(); } });
