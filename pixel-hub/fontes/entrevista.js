<style>
/* ===================== Entrevista no produto (c38, c39, c40), 19/11 =====================
   Mesma casca do Consultor (menu, topo, conversa) com o painel "O que eu já entendi" à direita, no lugar da lista de conversas.
   Referências: Gumloop (conversa com "Chat details" à direita e pergunta em cartão) e Spellbook (painel de arquivos ao lado). */
.ent-cw{ grid-template-columns:minmax(0,1fr) 340px; }
.ent-cap{ display:flex; flex-direction:column; gap:16px; padding:16px; border-left:1px solid var(--line); background:var(--soft); min-height:0; overflow-y:auto; }
.ent-cap-h b{ display:block; font-family:var(--f-d); font-size:17px; font-weight:600; letter-spacing:-.01em; }
.ent-cap-h small{ display:block; margin-top:2px; font-size:12.5px; color:var(--muted); }
.ent-pt{ display:flex; flex-direction:column; gap:4px; }
.ent-pt li{ display:grid; grid-template-columns:20px minmax(0,1fr); gap:8px; align-items:center; font-size:13px; color:var(--muted); }
.ent-pt li > span{ width:20px; height:20px; border-radius:50%; display:grid; place-items:center; font-size:11px; font-weight:600; background:var(--sunken); color:var(--ink-2); }
.ent-pt li > span .u{ width:12px; height:12px; }
.ent-pt li.ok{ color:var(--ink-2); } .ent-pt li.ok > span{ background:var(--ok-bg); color:var(--ok); }
.ent-pt li.at{ color:var(--ink); font-weight:600; } .ent-pt li.at > span{ background:var(--blue-bg); color:var(--blue-ink); }
.ent-sec{ display:flex; flex-direction:column; gap:8px; padding:12px; border-radius:12px; background:#fff; box-shadow:0 0 0 1px var(--line); }
.ent-sec > .lbl{ display:flex; align-items:center; gap:8px; }
.ent-sec > .lbl em{ margin-left:auto; font-style:normal; font-weight:500; }
.ent-vz{ font-size:13px; color:var(--muted); }
.ent-chips{ display:flex; flex-wrap:wrap; gap:6px; } .ent-chips .cw-chip{ font-size:12.5px; }
.ent-eu{ font-size:13.5px; line-height:1.45; } .ent-eu b{ font-weight:600; }
.ent-pr{ display:flex; flex-direction:column; gap:3px; padding-top:8px; border-top:1px solid var(--line); }
.ent-pr:first-of-type{ padding-top:0; border-top:0; }
.ent-pr b{ font-size:13.5px; font-weight:600; line-height:1.35; }
.ent-pr small{ font-size:12.5px; color:var(--muted); line-height:1.4; }
.ent-pr .ent-h{ font-size:12.5px; font-weight:600; color:var(--ink-2); }
.ent-tot{ display:flex; align-items:baseline; justify-content:space-between; gap:8px; padding-top:8px; border-top:1px solid var(--line); font-size:13px; }
.ent-tot b{ font-family:var(--f-d); font-size:17px; font-weight:600; }
.ent-tags{ display:flex; flex-wrap:wrap; gap:8px; }
.ent-sub{ margin-top:-6px; font-size:13.5px; }
.ent-conta{ display:flex; flex-direction:column; gap:8px; }
.ent-conta li{ display:flex; justify-content:space-between; gap:12px; padding:8px 12px; border-radius:10px; background:#fff; border:1px solid var(--line); font-size:14px; }
.ent-conta li b{ font-weight:600; white-space:nowrap; }
.ent-fim{ display:flex; flex-direction:column; align-items:flex-start; gap:12px; padding:16px; border-radius:14px; background:var(--soft); border:1px solid var(--line); }
.ent-fim b{ font-size:15.5px; font-weight:600; }
.ent-fim p{ font-size:14.5px; color:var(--ink-2); }
.ent-fim .ent-ac{ display:flex; flex-wrap:wrap; gap:8px; }
.ent-capm{ display:none; }
@media (max-width:900px){
  .ent-cw{ grid-template-columns:minmax(0,1fr); }
  .ent-cap{ display:none; }
  .ent-capm{ display:flex; align-items:center; gap:8px; width:100%; padding:12px 16px; border:0; border-bottom:1px solid var(--line); background:var(--soft); font:inherit; font-size:13.5px; font-weight:600; color:var(--ink); text-align:left; }
  .ent-capm em{ margin-left:auto; font-style:normal; font-weight:500; color:var(--muted); }
  .ent-capm .u{ width:16px; height:16px; transition:transform .2s; }
  .ent-capm[aria-expanded="true"] .u{ transform:rotate(180deg); }
  .ent-cap-h b{ display:none; }
  .ent-cw.capm-on .ent-cap{ display:flex; border-left:0; border-bottom:1px solid var(--line); max-height:46vh; }
  .ent-cw.capm-on{ grid-template-rows:auto auto minmax(0,1fr); }
  .ent-cw{ grid-template-rows:auto minmax(0,1fr); }
  .ent-cw > .ent-capm{ order:0; } .ent-cw > .ent-cap{ order:1; } .ent-cw > .cw-r{ order:2; }
}
</style>
<script>
/* ===================== Entrevista no produto (c38, c39, c40), 19/11 =====================
   A entrevista usa o mesmo motor do diagnóstico (v4Q, responder, pergunta, composer), agora dentro do produto.
   O que o onboarding já perguntou (nome, cargo, empresa, setor, pessoas, área) não se repete.
   Novidades: ferramentas usadas (c40), frequência, tempo e ferramentas de cada processo, até 3 processos (c40), e "a conta" antes do plano.
   O resultado vira o S.v do Plano: o Plano passa a sair da entrevista. Antes dela, o Plano mostra que nasce da entrevista. */
const ENT_FERR=["WhatsApp Business","Planilhas (Excel ou Google)","E-mail","CRM","ERP","ChatGPT ou outra IA","Notion","Trello ou Asana","Google Drive","Instagram","Outra"];
const ENT_FREQ=[["Todo dia",22],["Algumas vezes por semana",10],["Uma vez por semana",4],["Uma vez por mês",1]];
const ENT_TEMPO=[["Até 15 min",.2],["15 a 30 min",.4],["30 min a 1 h",.75],["1 a 2 h",1.5],["Mais de 2 h",2.5]];
const ENT_ID=["nome","cargo","empresa","setor","pessoas","areaP","trabalho"];
const ENT_NOVAS=/^(ferr|freq|tempo|pferr|mais|conta|proc[23])/;
const ENT_PARTES=["Sua rotina","As áreas","A conta"];

const _v4QEnt=v4Q;
v4Q=function(p){ const base=_v4QEnt(p); if(!S.entOn) return base; const a=S.v.a, sk=S.entSkip||[], out=[];
  base.forEach(q=>{ if(sk.includes(q.id)) return;
    if(q.id==="mat0") out.push({id:"ferr",type:"tags",t:p==="membro"?"Quais ferramentas você usa no seu trabalho?":"Quais ferramentas você e o time usam no dia a dia?",sub:"Marque todas que entram na rotina. Elas vão para o seu Plano.",opts:ENT_FERR});
    out.push(q);
    if(q.id!=="proc") return;
    for(let k=1;k<=3;k++){ const s=k===1?"":String(k);
      if(k>1) out.push({id:"proc"+s,type:"text",t:"Qual é o outro processo? Conte como ele acontece hoje.",ph:"Ex.: toda segunda alguém monta o relatório de vendas na planilha"});
      if(k===1&&a.proc==="no") break;
      out.push({id:"freq"+s,type:"single",t:"Com que frequência esse processo acontece?",opts:ENT_FREQ.map(x=>x[0])});
      out.push({id:"tempo"+s,type:"single",t:"E quanto tempo leva cada vez?",opts:ENT_TEMPO.map(x=>x[0])});
      if((a.ferr||[]).length) out.push({id:"pferr"+s,type:"tags",t:"Quais dessas ferramentas entram nesse processo?",opts:a.ferr.concat(["Nenhuma delas"])});
      if(k<3) out.push({id:"mais"+s,type:"single",t:"Quer contar mais um processo?",opts:["Sim, mais um","Por enquanto é isso"]});
      if(a["mais"+s]!=="Sim, mais um") break; }
    out.push({id:"conta",type:"conta",t:"Antes de montar o plano, confira a conta."}); });
  return out; };
function entParte(id){ if(!id) return 0; if(id==="conta") return 2; return /^(inef|proc|freq|tempo|pferr|mais)/.test(id)?1:0; }

/* processos capturados, com a conta de horas (estimativa: frequência × tempo de cada vez) */
function entProcs(a){ const o=[]; for(let k=1;k<=3;k++){ const s=k===1?"":String(k); const t=a["proc"+s]; if(!t||t==="no") break;
    const f=ENT_FREQ.find(x=>x[0]===a["freq"+s]), tm=ENT_TEMPO.find(x=>x[0]===a["tempo"+s]); let ar=null; try{ ar=V4_CAT[(k===1&&a.procArea)||v4AreaFromText(String(t))]; }catch(e){}
    const nome=String(t).split(/(?<=[.!?])\s/)[0]; o.push({nome:nome.length>90?nome.slice(0,88).trim()+"…":nome,area:ar?ar.areaN:"",freq:a["freq"+s]||"",tempo:a["tempo"+s]||"",ferr:(a["pferr"+s]||[]).filter(x=>x!=="Nenhuma delas"),h:f&&tm?Math.round(f[1]*tm[1]):null});
    if(a["mais"+s]!=="Sim, mais um") break; }
  return o; }
const entH=h=>h==null?"":`≈ ${h} h por mês`;

/* estado: a entrevista tem o seu próprio S.v; fora da tela, o produto volta ao que tinha até ela terminar */
function entComecar(){ const bak=S.v, r=(S.ob2&&S.ob2.r)||{}, src=(bak&&bak.a)||{}, v=vNovo();
  const pre={nome:r.nome||src.nome,cargo:r.cargo||src.cargo,empresa:r.emp||src.empresa,setor:r.setor||src.setor,pessoas:r.pes||src.pessoas,areaP:r.area||src.areaP,trabalho:src.trabalho};
  Object.keys(pre).forEach(k=>{ if(pre[k]) v.a[k]=pre[k]; }); if(v.a.setor) v.a.setorOrg=v4Organize("setor",v.a.setor); if(v.a.trabalho) v.a.trabalhoOrg=v4Organize("atuacao",v.a.trabalho);
  S.entSkip=Object.keys(v.a).filter(k=>ENT_ID.includes(k)); S.ent={v,bak,done:false}; }
function entSync(){ if(!S.ent) return; if(S.scr==="entrevista"||S.ent.done) S.v=S.ent.v; else S.v=S.ent.bak; S.entOn=S.scr==="entrevista"; }
(function(){ const _ir=ir; ir=function(k){ if(k==="gen"&&S.entOn){ S.ent.done=true; S.entrev=true; S.v.done=true; R(); return; }
  if(k==="entrevista"){ if(!S.ent) entComecar(); else if(!S.ent.done) S.ent.bak=S.v; S.capM=false; } return _ir.apply(this,arguments); }; })();
(function(){ const _R=R; R=function(){ entSync(); return _R.apply(this,arguments); }; })();

/* respostas das perguntas novas */
function entAck(q,val){ const id=q.id;
  if(id==="ferr") return `Anotei ${val.length===1?"1 ferramenta":val.length+" ferramentas"}. Agora seis perguntas rápidas para entender em que ponto da jornada vocês estão.`;
  if(/^tempo/.test(id)){ const s=id.slice(5), p=entProcs(S.v.a).find((x,i)=>String(i+1)===(s||"1")); return p&&p.h!=null?`Isso dá ${entH(p.h).replace("≈ ","cerca de ")}. Vou levar esse número para o plano.`:""; }
  if(/^proc[23]$/.test(id)){ let ar=null; try{ ar=V4_CAT[v4AreaFromText(String(val))]; }catch(e){} return ar?`Entendi. Isso tem a ver com ${lc1(ar.areaN)}.`:"Entendi."; }
  if(/^mais/.test(id)) return val==="Sim, mais um"?"":"Combinado. Falta só conferir a conta.";
  return ""; }
(function(){ const _resp=responder; responder=function(val,label){ const v=S.v, q=v4Q(S.profile)[v.qi];
  if(!S.entOn||!q||!ENT_NOVAS.test(q.id)) return _resp(val,label); if(v.typing) return; snapshot();
  v.a[q.id]=val; v.log.push({r:"bot",t:q.t}); v.log.push({r:"me",t:label||(Array.isArray(val)?val.join(", "):String(val))}); seguir(entAck(q,val)); }; })();

/* cartões das perguntas novas e o fim */
(function(){ const _p=pergunta; pergunta=function(){ if(!S.entOn) return _p(); const v=S.v, q=v4Q(S.profile)[v.qi];
  const card=c=>`<div class="ma in">${px("hub",28)}<div class="mb"><div class="who"><b>Consultor Pixel AI</b><time>agora</time></div>${c}</div></div>`;
  if(v.done){ const n=entProcs(v.a).length, f=(v.a.ferr||[]).length; return card(`<div class="ent-fim"><b>Plano montado</b><p>O seu Plano Agêntico já tem o que eu entendi aqui: ${n===1?"1 processo":n+" processos"}, ${f===1?"1 ferramenta":f+" ferramentas"} e o seu estágio na transformação. Você pode revisar tudo no Plano.</p><div class="ent-ac"><button class="btn btn-p btn-jornada" data-act="irPlano">Abrir o Plano Agêntico${u("arrow")}</button><button class="btn btn-g" data-act="irHome">Voltar ao Início</button></div></div>`); }
  if(!q||v.typing||v.clar||(q.type!=="tags"&&q.type!=="conta")) return _p();
  const corr=v.hist.length?`<button class="lnk" data-act="desfazer">${u("back")}Corrigir a resposta anterior</button>`:"";
  if(q.type==="tags"){ const sel=v.sel; return card(`<div class="askc"><p class="ask-q">${esc(q.t)}</p>${q.sub?`<p class="muted ent-sub">${esc(q.sub)}</p>`:""}<div class="ent-tags" role="group" aria-label="${esc(q.t)}">${q.opts.map(o=>{ const on=sel.includes(o); return `<button class="ob2-ch ${on?"on":""}" aria-pressed="${on}" data-act="entTag" data-arg="${esc(o)}">${on?u("check"):""}${esc(o)}</button>`; }).join("")}</div>${sel.includes("Outra")?`<div class="fld"><label for="ent-outra">Quais outras?</label><input class="inp" id="ent-outra" data-bind="v.other" value="${esc(v.other)}" placeholder="Ex.: Pipedrive, Bling"></div>`:""}<div class="ask-b"><button class="btn btn-p btn-sm" data-act="entTags" ${sel.length?"":"disabled"}>Enviar${u("arrow")}</button><span class="muted ask-c">${sel.length===1?"1 marcada":sel.length+" marcadas"}</span></div>${corr}</div>`); }
  const ps=entProcs(v.a), tot=ps.reduce((s,p)=>s+(p.h||0),0);
  return card(`<div class="askc"><p class="ask-q">${esc(q.t)}</p><p class="muted ent-sub">É uma estimativa: a frequência vezes o tempo de cada vez.</p>${ps.length?`<ul class="ent-conta">${ps.map(p=>`<li><span>${esc(p.nome)}</span><b>${entH(p.h)||"sem tempo"}</b></li>`).join("")}<li><span>Total</span><b>${entH(tot)}</b></li></ul>`:`<p>Você ainda não contou um processo. Eu sugiro oportunidades com base nas áreas, no setor e no estágio.</p>`}<div class="ask-b"><button class="btn btn-p btn-sm" data-act="entConta">Confere, pode montar o plano${u("arrow")}</button></div>${corr}</div>`); }; })();
Object.assign(A,{
  entTag:o=>{ const v=S.v, i=v.sel.indexOf(o); if(i>=0) v.sel.splice(i,1); else { if(o==="Nenhuma delas") v.sel=[]; else v.sel=v.sel.filter(x=>x!=="Nenhuma delas"); v.sel.push(o); } R(); },
  entTags:()=>{ const v=S.v; if(!v.sel.length) return; const outras=(v.other||"").split(/[,;]/).map(x=>x.trim()).filter(Boolean);
    if(v.sel.includes("Outra")&&!outras.length){ document.getElementById("ent-outra")?.focus(); return; } responder(v.sel.filter(x=>x!=="Outra").concat(outras)); },
  entConta:()=>responder("ok","Confere, pode montar o plano"),
  entCapM:()=>{ S.capM=!S.capM; R(); }
});

/* painel "O que eu já entendi" */
function entCap(){ const v=S.v, a=v.a, Qs=v4Q(S.profile), q=Qs[v.qi], pt=v.done?3:entParte(q&&q.id);
  const mats=["mat0","mat1","mat2","mat3","mat4","mat5"].filter(k=>a[k]).length; let est=null; if(mats===6){ try{ est=v4Compute().stage; }catch(e){} }
  const ult=(Qs[v.qi-1]||{}).id||null, mudou=ult!==S.entUlt; S.entUlt=ult; const novo=k=>mudou&&ult&&k.test(ult)?" flash":""; // pisca só a seção que acabou de mudar
  const eu=[a.nome,a.cargo,a.areaP,a.empresa].filter(Boolean);
  const ps=entProcs(a), tot=ps.reduce((s,p)=>s+(p.h||0),0), areas=(a.inef||[]).filter(x=>x!=="Outra"&&x!=="Não sei identificar.").map(x=>x.replace(/\.$/,""));
  return `<div class="ent-cap-h"><b>O que eu já entendi</b><small>Atualiza a cada resposta. Nada vai para o Plano antes de você conferir a conta.</small></div>
    <ol class="ent-pt" aria-label="Partes da entrevista">${ENT_PARTES.map((n,i)=>`<li class="${i<pt?"ok":i===pt?"at":""}"><span>${i<pt?u("check"):i+1}</span>${esc(n)}</li>`).join("")}</ol>
    ${eu.length?`<section class="ent-sec"><span class="lbl">Sobre você<em>Do onboarding</em></span><p class="ent-eu"><b>${esc(eu[0])}</b>${eu.slice(1).map(x=>`, ${esc(x)}`).join("")}</p></section>`:""}
    <section class="ent-sec${novo(/^ferr$/)}"><span class="lbl">Ferramentas${a.ferr?`<em>${a.ferr.length}</em>`:""}</span>${a.ferr&&a.ferr.length?`<div class="ent-chips">${a.ferr.map(f=>`<span class="cw-chip">${esc(f)}</span>`).join("")}</div>`:`<p class="ent-vz">Ainda não falamos disso.</p>`}</section>
    <section class="ent-sec${novo(/^mat/)}"><span class="lbl">Estágio de IA${est?"":`<em>${mats} de 6</em>`}</span>${est?`<p class="ent-eu"><b>${esc(est)}</b></p>`:`<p class="ent-vz">${mats?"Formando com as suas respostas.":"Sai das seis perguntas sobre IA."}</p>`}</section>
    <section class="ent-sec${novo(/^inef$/)}"><span class="lbl">Áreas que mais pesam</span>${areas.length?`<div class="ent-chips">${areas.map(x=>`<span class="cw-chip">${esc(x)}</span>`).join("")}</div>`:`<p class="ent-vz">Ainda não falamos disso.</p>`}</section>
    <section class="ent-sec${novo(/^(proc|freq|tempo|pferr)/)}"><span class="lbl">Processos${ps.length?`<em>${ps.length}</em>`:""}</span>${ps.length?ps.map(p=>`<div class="ent-pr"><b>${esc(p.nome)}</b>${p.area?`<small>${esc(p.area)}</small>`:""}${p.freq||p.tempo?`<small>${esc([p.freq,p.tempo&&("cada vez "+p.tempo.toLowerCase())].filter(Boolean).join(", "))}</small>`:""}${p.ferr.length?`<small>Com ${esc(p.ferr.join(", "))}</small>`:""}${p.h!=null?`<span class="ent-h">${entH(p.h)}</span>`:""}</div>`).join("")+(ps.length>1&&tot?`<div class="ent-tot"><span>Total estimado</span><b>${entH(tot)}</b></div>`:""):`<p class="ent-vz">${a.proc==="no"?"Você não contou um processo. Eu sugiro pelo setor e pelas áreas.":"Cada processo que você contar aparece aqui."}</p>`}</section>`; }
function entContagem(){ const a=S.v.a; return (a.ferr||[]).length+entProcs(a).length+((a.inef||[]).length?1:0); }

/* a tela */
function telaEntrevista(){ const v=S.v, q=v4Q(S.profile)[v.qi];
  const hora=i=>`09:${String(10+Math.min(49,i)).padStart(2,"0")}`, primeiro=String(v.a.nome||"").split(" ")[0];
  const msg=(m,i)=>m.r==="bot"?`<div class="ma">${px("hub",28)}<div class="mb"><div class="who"><b>Consultor Pixel AI</b><time>${hora(i)}</time></div><p>${esc(m.t)}</p></div></div>`:`<div class="mu">${esc(m.t)}</div>`;
  const intro={r:"bot",t:`Oi${primeiro?", "+primeiro:""}! Esta é a nossa entrevista. Vou entender a sua rotina, as áreas que mais pesam e os processos que tomam tempo. À direita fica o que eu já entendi; no fim, você confere a conta antes de virar plano.`};
  const pt=entParte(q&&q.id), sub=v.done?"Concluída":`Parte ${pt+1} de 3: ${ENT_PARTES[pt]}`; // o total de perguntas cresce com cada processo, então o topo mostra a parte
  return `<div class="shell noagent ${S.sideOpen?"side-open":""}">${lateral()}${S.sideOpen?'<div class="scrim" data-act="menuM"></div>':""}<main class="center">${topoApp("Sua entrevista com o Consultor",sub)}
    <div class="views"><div class="cw ent-cw ${S.capM?"capm-on":""}">
      <button class="ent-capm" data-act="entCapM" aria-expanded="${!!S.capM}" aria-controls="ent-cap">O que eu já entendi<em>${entContagem()} itens</em>${u("down")}</button>
      <section class="cw-r" aria-label="Entrevista"><div class="cw-b" id="cp-b"><div class="thread">${[intro,...v.log].map(msg).join("")}${pergunta()}</div></div>
        ${v.done?"":`<div class="cw-c">${composer()}</div>`}</section>
      <aside class="ent-cap" id="ent-cap" aria-label="O que eu já entendi">${entCap()}</aside>
    </div></div></main></div>`; }
(function(){ const _vw=view; view=function(){ if(S.scr==="entrevista") return telaEntrevista(); return _vw(); }; })();

/* Plano antes da entrevista: ele nasce dela */
(function(){ const _tp=telaPlano; telaPlano=function(){ if(S.entrev) return _tp();
  return `<div class="shell noagent ${S.sideOpen?"side-open":""}">${lateral()}${S.sideOpen?'<div class="scrim" data-act="menuM"></div>':""}<main class="center">${topoApp("Plano Agêntico","Sai da sua entrevista")}<div class="views"><div class="view" id="scroller"><div class="page">
    <div class="emptyb"><svg class="u" viewBox="0 0 24 24" aria-hidden="true">${PXI.plano}</svg><b id="focus-h" tabindex="-1">O seu Plano nasce da entrevista</b><p>Numa conversa por texto, o Consultor entende a sua rotina, as áreas e os processos que tomam tempo. Dela saem o destino, o estágio e os primeiros agentes.</p><button class="btn btn-p btn-jornada" data-act="irEntrevista">Começar a entrevista${u("arrow")}</button></div>
  </div></div></div></main></div>`; }; })();
(function(){ const _tc=telaConsultor; telaConsultor=function(){ const h=_tc(); return S.entrev?h:h.replace(/<span class="cw-chip">Plano: [^<]*<\/span>/,'<span class="cw-chip">Plano: depois da entrevista</span>'); }; })();

/* voltar a "Pendente" nos Ajustes recomeça a entrevista */
(function(){ const _m=A.entModo; A.entModo=m=>{ if(m!=="feita"&&S.ent){ S.v=S.ent.bak; S.ent=null; S.entOn=false; } _m(m); }; })();

/* onboarding 2.0 como entrada padrão: o protótipo completo chega aqui com { onb2:true } */
(function(){ let h=null; try{ h=JSON.parse(window.name||"null"); }catch(e){}
  if(!(h&&h.pixelHandoff&&h.onb2)) return; amostra(); S.entrev=false; S.ob2={f:({admin:"gestor",membro:"membro",individual:"founder"})[S.profile]||"gestor",i:-1,r:{}}; ir("onb2"); })();
/* o que o onboarding 2.0 coletou passa a valer no produto (nome no menu, empresa) */
(function(){ const _h=A.ob2Hub; A.ob2Hub=()=>{ const r=(S.ob2&&S.ob2.r)||{}, a=S.v.a; if(r.nome) a.nome=r.nome; if(r.cargo) a.cargo=r.cargo; if(r.emp) a.empresa=r.emp; if(r.setor){ a.setor=r.setor; a.setorOrg=v4Organize("setor",r.setor); } if(r.pes) a.pessoas=r.pes; if(r.area) a.areaP=r.area; _h(); }; })();
</script>
