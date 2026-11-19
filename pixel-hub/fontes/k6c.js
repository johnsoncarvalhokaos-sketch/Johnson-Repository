/* ===================== parte 3: Trilha com foco no "agora" (c23 a c26) =====================
   Estudo C, o preferido na reunião, vira a Trilha padrão. Referência do Mobbin: Luma (um passo por vez, "Step 1 / 4", Voltar e Próximo).
   c23: o passo atual em destaque e os subpassos (3.1, 3.2…) num carrossel, um por vez. c24: ao concluir o último subpasso, avança sozinho para o próximo passo.
   c25: o vídeo da aula já aberto acima dos subpassos, sem clique extra. c26: rolagem livre, com as abas "Agora" e "Mapa da jornada" presas no topo. */
function tcS(){ return S.tc||(S.tc={i:null,prox:false}); }
function tcPassoN(){ const P=ES_PILULAS(); const k=(P.a||[]).findIndex(a=>a.atual); return k<0?1:k+1; }
function tcAgora(){ const A=TV_ATUAL, B=TV_BLOCOS[A.b-1], st=tvS(), T=tcS(); const n=tcPassoN();
  if(T.prox){ const E2=BK7_B1[1]||{t:"Próxima etapa",a:[]}; const a=(E2.a||[])[0]||{t:"Próximo passo"};
    return `<section class="tc-sec" id="tc-agora"><p class="es-eb">Fase ${A.b}, etapa 2 de ${B.et.length}</p><h1 id="focus-h" tabindex="-1">Passo 1: ${esc(a.t)}</h1><p class="tc-ok">${u("check")}Passo ${n} concluído: ${esc(A.pilula)}. Você seguiu para o próximo.</p>
      <div class="tc-vid vz"><span class="hvd-pl">${u("play")}</span><span>A aula e os subpassos deste passo entram com o material do Bruno.</span></div><div class="tc-a"><button class="btn btn-q" data-act="tcVoltarPasso">Rever o passo anterior</button></div></section>`; }
  const tot=A.sub.length; let i=T.i; if(i===null||i===undefined){ i=st.sub.findIndex(x=>!x); if(i<0) i=tot-1; T.i=i; }
  const s=A.sub[i], l=tvAulaDoPasso(i), feitos=st.sub.filter(Boolean).length;
  const vid=l?`<button class="tc-vid" data-act="aulaAbrir" data-arg="${l.id}" aria-label="Assistir à aula ${esc(l[0])}"><span class="tc-vth"><span class="hvd-pl">${u("play")}</span><span class="tc-dur">${l[1]} min</span></span><span class="tc-vtx"><small>Aula deste passo</small><b>${esc(l[0])}</b></span></button>`:"";
  return `<section class="tc-sec" id="tc-agora"><p class="es-eb">Fase ${A.b}, etapa ${A.e+1} de ${B.et.length}</p><h1 id="focus-h" tabindex="-1">Passo ${n}: ${esc(A.pilula)}</h1>
    <div class="es-cbar"><i><b style="width:${(feitos/tot*100).toFixed(0)}%"></b></i><span>${feitos} de ${tot} subpassos</span></div>
    ${vid}
    <div class="tc-car" aria-roledescription="carrossel" aria-label="Subpassos do passo ${n}">
      <div class="tc-ch"><span class="tc-num">${n}.${i+1}</span><div class="tc-dots" role="tablist" aria-label="Subpassos">${A.sub.map((x,k)=>`<button role="tab" aria-selected="${k===i}" aria-label="Subpasso ${n}.${k+1}${st.sub[k]?", feito":""}" class="${st.sub[k]?"ok":""}" data-act="tcIr" data-arg="${k}"></button>`).join("")}</div><span class="tc-de">${i+1} de ${tot}</span></div>
      <div class="tc-card" aria-live="polite"><h2>${esc(s.t)}</h2><p class="es-onde">${esc(s.onde)}, ${esc(s.min)}</p>${tvSubCorpo(s)}</div>
      <div class="tc-nav"><button class="btn btn-q" data-act="tcIr" data-arg="${i-1}" ${i===0?"disabled":""}>${u("chev")}Anterior</button><div class="tc-nr"><button class="btn btn-q" data-act="tvConsSug">${px("hub",16)}Travei aqui</button><button class="btn btn-p" data-act="tcFeito" data-arg="${i}">${i===tot-1?"Concluir o passo":"Feito, próximo subpasso"}${u("arrow")}</button></div></div>
    </div></section>`; }
esC=function(){ const A=TV_ATUAL; const tab=S.esCam||"agora";
  const tabs=`<div class="tc-tabs" role="tablist" aria-label="Trilha">${[["agora","Agora"],["mapa","Mapa da jornada"]].map(([k,l])=>`<button role="tab" aria-selected="${tab===k}" data-act="tcAba" data-arg="${k}">${l}</button>`).join("")}</div>`;
  return esCasca(`<div class="es-c tc">${tabs}${tcAgora()}<section class="tc-sec tc-mapa" id="tc-mapa"><h2 class="tc-mh">Mapa da jornada</h2><p class="es-lede">As 4 fases e as etapas. A etapa atual mostra onde você está.</p>${esMapaLista()}</section></div>`,`Fase ${A.b}, etapa ${A.e+1}`); };
Object.assign(A,{
  tcIr:k=>{ const n=+k; if(n<0||n>=TV_ATUAL.sub.length) return; tcS().i=n; R(); },
  tcFeito:k=>{ const i=+k, st=tvS(), T=tcS(); st.sub[i]=true; const tot=TV_ATUAL.sub.length;
    if(i>=tot-1||st.sub.every(Boolean)){ T.prox=true; R(); aviso("Passo concluído. Seguindo para o próximo passo.","sucesso"); document.getElementById("scroller")?.scrollTo({top:0,behavior:"smooth"}); return; }
    const prox=st.sub.findIndex((x,k)=>!x&&k>i); T.i=prox<0?st.sub.findIndex(x=>!x):prox; R(); document.querySelector(".tc-car")?.scrollIntoView({behavior:"smooth",block:"nearest"}); },
  tcVoltarPasso:()=>{ const T=tcS(); T.prox=false; T.i=TV_ATUAL.sub.length-1; R(); },
  tcAba:k=>{ S.esCam=k; const el=document.getElementById(k==="mapa"?"tc-mapa":"tc-agora"); const sc=document.getElementById("scroller"); if(el&&sc){ sc.scrollTo({top:el.offsetTop-(k==="mapa"?60:0),behavior:"smooth"}); } document.querySelectorAll(".tc-tabs [role=tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.arg===k))); }
});
/* abas presas no topo que acompanham a rolagem */
function tcSpy(){ const sc=document.getElementById("scroller"), m=document.getElementById("tc-mapa"); if(!sc||!m||sc.dataset.tcspy) return; sc.dataset.tcspy="1";
  sc.addEventListener("scroll",()=>{ const k=sc.scrollTop+120>=m.offsetTop?"mapa":"agora"; if(S.esCam!==k){ S.esCam=k; document.querySelectorAll(".tc-tabs [role=tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.arg===k))); } },{passive:true}); }
(function(){ const _r=rotularFechar; rotularFechar=function(){ _r(); try{ tcSpy(); }catch(e){} }; })();
/* Estudo C é a Trilha padrão; as outras versões seguem nos Ajustes para comparar */
(function(){ if(!S.trV||S.trV==="b") S.trV="ec"; })();
