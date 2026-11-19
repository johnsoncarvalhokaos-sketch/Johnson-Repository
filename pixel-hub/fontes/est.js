/* ===================== Três estudos de estrutura da Trilha (03/11, sprint de arquitetura com o Cayo) =====================
   Problema: seis níveis (Trilha, bloco, etapa, pílula, passo, conteúdo), o índice vai até a etapa e o centro mostra a pílula,
   cinco sistemas de progresso e a ação do momento fora da primeira tela. Os três estudos atacam isso de jeitos diferentes:
   A. Menos níveis: a pílula vira passo da etapa (bloco, etapa, passo).
   B. Foco no agora: os mesmos níveis, mas só o passo atual aberto; o mapa vira uma linha de progresso com "Ver a jornada".
   C. Duas camadas: uma tela "Agora" (só o passo e a ação) e uma tela "Mapa" (a jornada inteira), alternadas no topo. */
const ES_PILULAS=()=>{ try{ return BK7_B1[0]; }catch(e){ return {tot:7,a:[]}; } };
function esProgresso(){ const A=TV_ATUAL, f=tvFeitas(), n=A.sub.length; return {f,n,cur:Math.min(f,n-1)}; }
function esPassoCorpo(s,i,ativo){ return `${tvAulaApoio(i)}${tvSubCorpo(s)}<div class="es-acao"><button class="btn btn-p" data-act="tvConcluir" data-arg="${i}">${i===TV_ATUAL.sub.length-1?"Concluir a etapa":"Feito, próximo passo"}${u("arrow")}</button><button class="btn btn-q" data-act="tvConsSug">${px("hub",16)}Travei neste passo</button></div>`; }
function esPassos(cls){ const A=TV_ATUAL, st=tvS(), pr=esProgresso();
  return `<ol class="es-passos ${cls||""}">${A.sub.map((s,i)=>{ const ok=st.sub[i], at=i===pr.cur&&!ok;
    return `<li class="es-p ${ok?"ok":""} ${at?"at":""}"><div class="es-ph"><span class="es-n">${ok?u("check"):i+1}</span><div><b>${esc(s.t)}</b>${at?`<small>${esc(s.onde)}, ${esc(s.min)}</small>`:""}</div>${ok?`<button class="btn btn-q btn-sm" data-act="tvFeita" data-arg="${i}">Desfazer</button>`:""}</div>${at?`<div class="es-pb">${esPassoCorpo(s,i,true)}</div>`:""}</li>`; }).join("")}</ol>`; }
function esCasca(corpo,sub){ return `<div class="shell noagent ${S.sideOpen?"side-open":""}">${lateral()}${S.sideOpen?'<div class="scrim" data-act="menuM"></div>':""}<main class="center">${topoApp("Trilha",sub)}<div class="views"><div class="view" id="scroller"><div class="page es">${corpo}</div></div></div></main></div>`; }
/* ---------- Estudo A: menos níveis ---------- */
function esA(){ const A=TV_ATUAL, B=TV_BLOCOS[A.b-1], P=ES_PILULAS(), pr=esProgresso(); const etN=B.et[A.e];
  const feitasP=P.a.filter(a=>a.s==="c"&&!a.atual).length; const idx=`<aside class="es-idx" aria-label="Etapas do bloco ${A.b}"><p>Bloco ${A.b}</p><b>${esc(B.t)}</b><ol>${B.et.map((e,k)=>`<li class="${k===A.e?"at":k<A.e?"ok":""}"><span>${k+1}</span>${esc(e)}</li>`).join("")}</ol></aside>`;
  const pilulas=P.a.map((a,k)=>{ const at=!!a.atual, ok=!at&&a.s==="c";
    return `<li class="es-pl ${at?"at":""} ${ok?"ok":""}"><div class="es-plh"><span class="es-n">${ok?u("check"):k+1}</span><div><b>${esc(a.t)}</b><small>${at?`Agora: ${pr.f} de ${pr.n} feitos`:ok?"Feito":"Depois"}</small></div></div>${at?`<div class="es-plb">${esPassos("es-sub")}</div>`:""}</li>`; }).join("");
  const resto=P.tot-P.a.length;
  return esCasca(`<div class="es-a">${idx}<div class="es-main"><p class="es-eb">Etapa ${A.e+1} de ${B.et.length}</p><h1 id="focus-h" tabindex="-1">${esc(etN)}</h1><p class="es-lede">${esc(B.fim)}</p>
    <div class="es-prog"><i><b style="width:${(feitasP/P.tot*100).toFixed(0)}%"></b></i><span>${feitasP} de ${P.tot} passos da etapa</span></div>
    <ol class="es-pls">${pilulas}${resto>0?`<li class="es-pl mais"><div class="es-plh"><span class="es-n">…</span><div><b>E mais ${resto} passos nesta etapa</b><small>Abrem quando você chegar neles</small></div></div></li>`:""}</ol></div></div>`,`Bloco ${A.b}, etapa ${A.e+1}`); }
/* ---------- Estudo B: foco no agora ---------- */
function esB(){ const A=TV_ATUAL, B=TV_BLOCOS[A.b-1], pr=esProgresso(), st=tvS(); const s=A.sub[pr.cur];
  const depois=A.sub.map((x,i)=>[x,i]).filter(([x,i])=>i>pr.cur&&!st.sub[i]);
  return esCasca(`<div class="es-b">
    <nav class="es-trail" aria-label="Onde você está"><span>Bloco ${A.b}</span>${u("chev")}<span>Etapa ${A.e+1} de ${B.et.length}</span>${u("chev")}<span class="at">${esc(A.pilula)}</span><button class="btn btn-q btn-sm" data-act="esMapa">${TV_IC.mapa}Ver a jornada</button></nav>
    <h1 id="focus-h" tabindex="-1">${esc(A.pilula)}</h1>
    <div class="es-step"><div class="es-stepk"><span>Passo ${pr.cur+1} de ${pr.n}</span><i>${A.sub.map((x,i)=>`<b class="${st.sub[i]?"ok":i===pr.cur?"at":""}"></b>`).join("")}</i></div>
      <h2>${esc(s.t)}</h2><p class="es-onde">${esc(s.onde)}, ${esc(s.min)}</p>${esPassoCorpo(s,pr.cur,true)}</div>
    ${depois.length?`<div class="es-dep"><p>Depois</p><ol>${depois.map(([x,i])=>`<li><span>${i+1}</span>${esc(x.t)}</li>`).join("")}</ol></div>`:""}
    <details class="es-sobre"><summary>Sobre esta etapa</summary>${tvMeta()}<p>${esc(A.desc)}</p><p><b>Você sai com:</b> ${esc(A.sai)}</p></details>
  </div>${S.esMapa?esMapaGaveta():""}`,`Bloco ${A.b}, etapa ${A.e+1}`); }
function esMapaLista(){ const A=TV_ATUAL, P=ES_PILULAS();
  return TV_BLOCOS.map((B,bi)=>`<section class="es-mb ${bi+1===A.b?"at":""}"><div class="es-mbh"><span>${B.n}</span><b>${esc(B.t)}</b><small>${bi+1===A.b?`${B.et.length} etapas`:"Em gravação"}</small></div>${bi+1===A.b?`<ol>${B.et.map((e,k)=>`<li class="${k===A.e?"at":""}"><span>${k+1}</span><div><b>${esc(e)}</b>${k===A.e?`<ul>${P.a.map(a=>`<li class="${a.atual?"at":a.s==="c"?"ok":""}">${esc(a.t)}${a.atual?"<em>você está aqui</em>":""}</li>`).join("")}</ul>`:""}</div></li>`).join("")}</ol>`:""}</section>`).join(""); }
function esMapaGaveta(){ return `<div class="fr-ov" data-act="esMapa"></div><aside class="frd frd2 es-gav" role="dialog" aria-modal="true" aria-label="Sua jornada"><header class="frd-h2"><div class="frd-bar"><span>Sua jornada</span><button class="ibtn frd-x" data-act="esMapa" aria-label="Fechar">${u("x")}</button></div></header><div class="frd-b frd-b2">${esMapaLista()}</div></aside>`; }
/* ---------- Estudo C: duas camadas ---------- */
function esC(){ const A=TV_ATUAL, B=TV_BLOCOS[A.b-1], pr=esProgresso(), st=tvS(); const s=A.sub[pr.cur]; const cam=S.esCam||"agora";
  const seg=`<div class="fz-seg es-seg" role="tablist" aria-label="Trilha">${[["agora","Agora"],["mapa","Mapa da jornada"]].map(([k,l])=>`<button role="tab" aria-selected="${cam===k}" data-act="esCam" data-arg="${k}">${l}</button>`).join("")}</div>`;
  const corpo=cam==="mapa"?`<div class="es-c-mapa"><h1 id="focus-h" tabindex="-1">Sua jornada</h1><p class="es-lede">Os 4 blocos e as etapas. A etapa atual mostra onde você está.</p>${esMapaLista()}</div>`
    :`<div class="es-c-agora"><p class="es-eb">${esc(B.t)}, etapa ${A.e+1}</p><h1 id="focus-h" tabindex="-1">${esc(A.pilula)}</h1>
      <div class="es-cbar"><i><b style="width:${(pr.f/pr.n*100).toFixed(0)}%"></b></i><span>${pr.f} de ${pr.n}</span></div>
      <div class="es-card"><p class="es-stepk2">Passo ${pr.cur+1}</p><h2>${esc(s.t)}</h2><p class="es-onde">${esc(s.onde)}, ${esc(s.min)}</p>${esPassoCorpo(s,pr.cur,true)}</div></div>`;
  return esCasca(`<div class="es-c">${seg}${corpo}</div>`,cam==="mapa"?"Mapa da jornada":`Bloco ${A.b}, etapa ${A.e+1}`); }
(function(){ const _v=telaTrilhaV; telaTrilhaV=function(){ return S.trV==="ea"?esA():S.trV==="eb"?esB():S.trV==="ec"?esC():_v(); }; })();
Object.assign(A,{ esMapa:()=>{ S.esMapa=!S.esMapa; R(); }, esCam:k=>{ S.esCam=k; R(); document.getElementById("scroller")?.scrollTo({top:0}); } });
(function(){ const _t=A.trVersao; A.trVersao=v=>{ if(v==="ea"||v==="eb"||v==="ec"){ S.trV=v; S.trTab=null; if(typeof painel==="function") painel(false); ir("trilha"); aviso(v==="ea"?"Estudo A: menos níveis (bloco, etapa, passo).":v==="eb"?"Estudo B: foco no agora.":"Estudo C: duas camadas, Agora e Mapa.","prototipo"); return; } _t(v); }; })();
/* ---------- Início: o cartão da Trilha passa a falar a língua da Trilha B ---------- */
cardEtapa=function(T){ const A=TV_ATUAL, B=TV_BLOCOS[A.b-1], pr=esProgresso(), s=A.sub[pr.cur]; let aulas=[]; try{ aulas=CURSOS.find(x=>x.id==="t1").mods[0][1].slice(0,2); }catch(e){}
  return `<section class="ce v2 v3" aria-labelledby="ce-t">
    <div class="ce-top"><div class="ce-px">${px("vendas",48)}</div>
      <div class="ce-h"><small>Agora na Trilha: bloco ${A.b}, etapa ${A.e+1} de ${B.et.length}</small><b id="ce-t">${esc(A.pilula)}</b><p>${esc(A.desc.split(". ")[0])}.</p>
        <div class="ce-tr" aria-hidden="true">${A.sub.map((x,k)=>`<i class="${tvS().sub[k]?"f":k===pr.cur?"a":""}"></i>`).join("")}<span>${pr.f} de ${pr.n} passos</span></div><div class="ce-agora"><b>O que você vai fazer agora</b><p>${esc(s.t)}, ${esc(s.onde.charAt(0).toLowerCase()+s.onde.slice(1))}.</p></div></div>
      <div class="ce-a"><button class="btn btn-p" data-act="irTrilha">Continuar a etapa${u("arrow")}</button><button class="btn btn-g ce-cons" data-act="tvConsSug">${px("hub",18)}Conversar com o Consultor</button></div></div>
    <div class="ce-ap3">
      <div class="ce-aulas"><span class="ce-k2">Aulas da etapa</span>${aulas.map(l=>`<button class="ce-vid" data-act="aulaAbrir" data-arg="${l.id}"><span class="ce-th"><span class="ce-play">${u("play")}</span><span class="ce-dur">${l[1]} min</span></span><span class="ce-vt"><small>Aula</small><b>${esc(l[0])}</b></span></button>`).join("")}</div>
      <div class="ce-mtc"><span class="ce-k2">Mentoria técnica</span><div class="ce-mtb"><b>Travou na aplicação?</b><p>Agende um plantão com o time técnico da Pixel. O próximo é terça, às 10h.</p></div><button class="btn btn-g btn-sm" data-act="apIr" data-arg="mentorias">${u("calendar")}Agendar mentoria técnica</button></div>
    </div></section>`; };
