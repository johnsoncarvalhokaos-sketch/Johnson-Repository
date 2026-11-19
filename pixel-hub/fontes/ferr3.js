/* raio X do template também em drawer com abas (03/11), no mesmo padrão do detalhe da skill */
function frTplDrawer(){ const st=frS(); const id=st.md.split(":")[1]; const x=frTpl(id); if(!x) return ""; const sis=FR_SIS.includes(x);
  const tabs=[]; if(x.resp) tabs.push(["resp",`Responsabilidades (${x.resp.length})`]); if(x.blocos) tabs.push(["blocos",`Blocos (${x.blocos.length})`]); if(x.zip) tabs.push(["zip","O que vem no zip"]); if(x.rotinas) tabs.push(["rot",`Rotinas (${x.rotinas.length})`]); if(x.ferr) tabs.push(["ferr",`Ferramentas (${x.ferr.length})`]); if(x.antes) tabs.push(["antes","Antes de começar"]); if(x.instalar) tabs.push(["inst","Como instalar"]); if(x.porDentro) tabs.push(["dentro","Por dentro"]);
  if(!tabs.length) tabs.push(["geral","Visão geral"]);
  const tab=tabs.some(t=>t[0]===st.tab)?st.tab:tabs[0][0];
  const sk=(sid)=>{ const s=frSk(sid); return `<button class="fr-msk" data-act="frSkill" data-arg="${sid}"><span class="fr-si">${FR_IC}</span><span><b>${esc(s.t)}</b><small>${esc(s.d)}</small></span></button>`; };
  let p="";
  if(tab==="resp") p=x.resp.map(([t,pri,d,sks,modo,fer])=>`<div class="fr-blk"><div class="fr-bh"><b>${esc(t)}</b>${pri?'<span class="fr-pri">Roda primeiro</span>':""}</div><p>${esc(d)}</p>${sks.map(sk).join("")}<div class="fr-bf"><span class="fr-modo ${/Rotina/.test(modo)?"rt":""}">${esc(modo)}</span>${esc(fer)}</div></div>`).join("");
  else if(tab==="blocos") p=x.blocos.map(([t,d,sks,fer])=>`<div class="fr-blk"><div class="fr-bh"><b>${esc(t)}</b></div><p>${esc(d)}</p>${sks.map(([n,sd])=>`<div class="fr-msk st"><span class="fr-si">${FR_IC}</span><span><b>${esc(n)}</b><small>${esc(sd)}</small></span></div>`).join("")}<div class="fr-bf">${esc(fer)}</div></div>`).join("");
  else if(tab==="zip") p=`<ul class="frd-list">${x.zip.map(([a,b])=>`<li><b>${esc(a)}</b><span>${esc(b.charAt(0).toUpperCase()+b.slice(1))}</span></li>`).join("")}</ul>`;
  else if(tab==="rot") p=`<ul class="fr-rot">${x.rotinas.map(([a,b])=>`<li><span class="fr-ri">${FR_RT}</span><span><b>${esc(a)}</b>${b?`<small>${esc(b)}</small>`:""}</span></li>`).join("")}</ul>${x.rotNota?`<p class="fr-mn">${esc(x.rotNota)}</p>`:""}`;
  else if(tab==="ferr") p=`<ul class="frd-list">${x.ferr.map(([a,b])=>`<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join("")}</ul>`;
  else if(tab==="antes") p=`<ul class="frd-check">${x.antes.map(a=>`<li>${u("check")}${esc(a)}</li>`).join("")}</ul>`;
  else if(tab==="inst") p=`<ol class="frd-num">${x.instalar.map((a,i)=>`<li><span>${i+1}</span>${esc(a)}</li>`).join("")}</ol>`;
  else if(tab==="dentro") p=`<p class="frd-vz">${esc(x.porDentro)}</p>`;
  else p=`<section class="frd-s"><h3>Para que serve</h3><p>${esc(x.d)}</p></section><p class="frd-vz" style="margin-top:20px">O raio X completo deste template (o papel e a missão, as responsabilidades com as skills, as rotinas e as ferramentas) vem do catálogo do Agent Builder.</p>`;
  const ac=sis?`<button class="btn btn-p" data-act="${x.acao[1]}" data-arg="${x.id}">${x.acao[1]==="frBaixar"?FR_DL:""}${esc(x.acao[0])}</button>`:`<button class="btn btn-p" data-act="frUsarAB" data-arg="${x.id}">Usar no Agent Builder</button>`;
  const ani=st.ani; st.ani=0;
  return `<div class="fr-ov ${ani?"":"sem-ani"}" data-act="frFechar"></div><aside class="frd frd-w ${ani?"frd-in":""}" role="dialog" aria-modal="true" aria-labelledby="frd-t">
    <header class="frd-h"><div class="frd-top"><span class="frd-px">${px(sis?x.cor:"extensao",26)}</span><span class="frd-k">${sis?esc(x.kick):"Template de agente, Agent Builder"}</span><button class="ibtn frd-x" data-act="frFechar" aria-label="Fechar">${u("x")}</button></div>
      <h2 id="frd-t">${esc(x.nome||x.t)}</h2><p class="frd-lede">${esc(x.lede||x.d)}</p>${x.chips?`<div class="fr-chips">${x.chips.map(c=>`<span>${esc(c)}</span>`).join("")}</div>`:""}
      <div class="frd-tabs" role="tablist" aria-label="Informações do template">${tabs.map(([k,l])=>`<button role="tab" aria-selected="${tab===k}" data-act="frTab" data-arg="${k}">${l}</button>`).join("")}</div></header>
    <div class="frd-b" role="tabpanel">${p}</div>
    <footer class="frd-f"><button class="btn btn-g" data-act="frCons" data-arg="${esc(st.md)}">${px("hub",18)}Tirar dúvidas com o Consultor</button>${ac}</footer></aside>`; }
(function(){ const _m=frModal; frModal=function(){ const st=frS(); if(st.md&&st.md.startsWith("t:")) return frTplDrawer(); return _m(); }; })();
(function(){ const _a=A.frAbrir; A.frAbrir=id=>{ const st=frS(); st.ani=!(st.md&&st.md.startsWith("t:")); st.tab=null; _a(id); requestAnimationFrame(()=>document.querySelector(".frd-b")?.scrollTo({top:0})); }; })();
(function(){ const _s=A.frSkill; A.frSkill=id=>{ const st=frS(); const vinhaDeTpl=st.md&&st.md.startsWith("t:"); _s(id); if(vinhaDeTpl){ st.ani=0; R(); } }; })();
