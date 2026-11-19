/* drawer, rodada de craft (03/11): identidade em destaque, números no lugar das etiquetas, listas sem caixa dentro de caixa */
const FR_TINT={marketing:"#FCE9F5",operacao:"#E8EFFF",hub:"#FFEDE5",extensao:"#EFEFF5"};
function frStats(chips){ const nums=[], meta=[]; (chips||[]).forEach(c=>{ const m=c.match(/^(\d+)\s+(.*)$/); if(m) nums.push([m[1],m[2]]); else meta.push(c); }); return {nums,meta}; }
function frHead({tint,ico,kick,titulo,lede,chips,mono}){ const {nums,meta}=frStats(chips);
  return `<header class="frd-h2"><div class="frd-bar"><span>${esc(kick)}</span><button class="ibtn frd-x" data-act="frFechar" aria-label="Fechar">${u("x")}</button></div>
    <div class="frd-id"><span class="frd-tile" style="background:${tint}">${ico}</span><h2 id="frd-t" class="${mono?"mono":""}">${esc(titulo)}</h2></div>
    ${lede?`<p class="frd-lede2">${esc(lede)}</p>`:""}
    ${nums.length?`<dl class="frd-nums">${nums.map(([n,l])=>`<div><dt>${esc(l)}</dt><dd>${n}</dd></div>`).join("")}</dl>`:""}
    ${meta.length?`<p class="frd-meta">${u("shield")}${meta.map(esc).join(". ")}.</p>`:""}`; }
frTplDrawer=function(){ const st=frS(); const id=st.md.split(":")[1]; const x=frTpl(id); if(!x) return ""; const sis=FR_SIS.includes(x);
  const tabs=[]; if(x.resp) tabs.push(["resp","Responsabilidades"]); if(x.blocos) tabs.push(["blocos","Blocos"]); if(x.zip) tabs.push(["zip","O que vem no zip"]); if(x.rotinas) tabs.push(["rot","Rotinas"]); if(x.ferr) tabs.push(["ferr","Ferramentas"]); if(x.antes) tabs.push(["antes","Antes de começar"]); if(x.instalar) tabs.push(["inst","Como instalar"]); if(x.porDentro) tabs.push(["dentro","Por dentro"]);
  if(!tabs.length) tabs.push(["geral","Visão geral"]);
  const tab=tabs.some(t=>t[0]===st.tab)?st.tab:tabs[0][0];
  const skl=(t,d,sid)=>`<li>${sid?`<button class="frd-sk" data-act="frSkill" data-arg="${sid}">`:'<div class="frd-sk st">'}<span class="frd-ski">${FR_IC}</span><span><b>${esc(t)}</b><small>${esc(d)}</small></span>${sid?u("chev")+"</button>":"</div>"}</li>`;
  let p="";
  if(tab==="resp") p=`<ol class="frd-items">${x.resp.map(([t,pri,d,sks,modo,fer],i)=>`<li><span class="frd-n">${i+1}</span><div><div class="frd-it"><b>${esc(t)}</b>${pri?'<span class="fr-pri">Roda primeiro</span>':""}</div><p>${esc(d)}</p><ul class="frd-sks">${sks.map(sid=>{ const s=frSk(sid); return skl(s.t,s.d,sid); }).join("")}</ul><p class="frd-ft"><span class="fr-modo ${/Rotina/.test(modo)?"rt":""}">${esc(modo)}</span><span>${esc(fer)}</span></p></div></li>`).join("")}</ol>`;
  else if(tab==="blocos") p=`<ol class="frd-items">${x.blocos.map(([t,d,sks,fer],i)=>`<li><span class="frd-n">${i}</span><div><div class="frd-it"><b>${esc(t.replace(/^[^:]+:\s*/,s=>s))}</b></div><p>${esc(d)}</p><ul class="frd-sks">${sks.map(([n,sd])=>skl(n,sd,null)).join("")}</ul><p class="frd-ft"><span>${esc(fer)}</span></p></div></li>`).join("")}</ol>`;
  else if(tab==="zip") p=`<ul class="frd-list">${x.zip.map(([a,b])=>`<li><b>${esc(a)}</b><span>${esc(b.charAt(0).toUpperCase()+b.slice(1))}</span></li>`).join("")}</ul>`;
  else if(tab==="rot") p=`<ul class="frd-rot2">${x.rotinas.map(([a,b])=>`<li><span class="fr-ri">${FR_RT}</span><span><b>${esc(a)}</b>${b?`<small>${esc(b)}</small>`:""}</span></li>`).join("")}</ul>${x.rotNota?`<p class="frd-note">${esc(x.rotNota)}</p>`:""}`;
  else if(tab==="ferr") p=`<ul class="frd-list">${x.ferr.map(([a,b])=>`<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join("")}</ul>`;
  else if(tab==="antes") p=`<ul class="frd-check">${x.antes.map(a=>`<li>${u("check")}${esc(a)}</li>`).join("")}</ul>`;
  else if(tab==="inst") p=`<ol class="frd-num">${x.instalar.map((a,i)=>`<li><span>${i+1}</span>${esc(a)}</li>`).join("")}</ol>`;
  else if(tab==="dentro") p=`<p class="frd-vz">${esc(x.porDentro)}</p>`;
  else p=`<p class="frd-vz">O raio X completo deste template (o papel e a missão, as responsabilidades com as skills, as rotinas e as ferramentas) vem do catálogo do Agent Builder.</p>`;
  const ac=sis?`<button class="btn btn-p" data-act="${x.acao[1]}" data-arg="${x.id}">${x.acao[1]==="frBaixar"?FR_DL:""}${esc(x.acao[0])}</button>`:`<button class="btn btn-p" data-act="frUsarAB" data-arg="${x.id}">Usar no Agent Builder</button>`;
  const ani=st.ani; st.ani=0; const cor=sis?x.cor:"extensao";
  return `<div class="fr-ov ${ani?"":"sem-ani"}" data-act="frFechar"></div><aside class="frd frd-w frd2 ${ani?"frd-in":""}" role="dialog" aria-modal="true" aria-labelledby="frd-t">
    ${frHead({tint:FR_TINT[cor]||FR_TINT.extensao,ico:px(cor,30),kick:sis?x.kick:"Template de agente, Agent Builder",titulo:x.nome||x.t,lede:x.lede||x.d,chips:x.chips})}
      <div class="frd-tabs" role="tablist" aria-label="Informações do template">${tabs.map(([k,l])=>`<button role="tab" aria-selected="${tab===k}" data-act="frTab" data-arg="${k}">${l}</button>`).join("")}</div></header>
    <div class="frd-b frd-b2" role="tabpanel">${p}</div>
    <footer class="frd-f frd-f2"><button class="btn btn-g" data-act="frCons" data-arg="${esc(st.md)}">${px("hub",18)}Tirar dúvidas com o Consultor</button>${ac}</footer></aside>`; };
frSkillDrawer=function(){ const st=frS(); const id=st.md.split(":")[1]; const x=frSk(id); if(!x) return ""; const usos=frUsos(id);
  const tabs=[["geral","Visão geral"],["como","Como funciona"],["dl","Download"],["usos","Usada em"]]; const tab=st.tab||"geral";
  const vz=t=>`<p class="frd-vz">${t}</p>`;
  const painel=tab==="geral"?`<section class="frd-s2"><h3>Para que serve</h3><p>${esc(x.d)}</p></section><section class="frd-s2"><h3>Quando usar</h3>${x.quando?`<p class="frd-quando2">${esc(x.quando)}</p>`:vz("“Quando usar” entra com o catálogo do Agent Builder.")}</section>`
    :tab==="como"?(x.como?`<p class="frd-long2">${esc(x.como)}</p>`:vz("“Como funciona” entra com o catálogo do Agent Builder."))
    :tab==="dl"?`<div class="frd-file2"><span class="frd-fi">${FR_DL}</span><span><b>SKILL.md</b><small>${esc(x.dl||"O SKILL.md, para enviar ao seu agente.")}</small></span></div>`
    :(usos.length?`<ul class="frd-usos2">${usos.map(u0=>`<li><button data-act="frAbrir" data-arg="${u0.id}"><span class="frd-tile sm" style="background:${FR_TINT.extensao}">${px("extensao",20)}</span><span><b>${esc(u0.t)}</b><small>${u0.r.map(esc).join(", ")}</small></span>${u("chev")}</button></li>`).join("")}</ul>`:vz("Ainda não aparece num template do protótipo. Você pode adicionar ao seu agente pelo Agent Builder."));
  const ani=st.ani; st.ani=0;
  return `<div class="fr-ov ${ani?"":"sem-ani"}" data-act="frFechar"></div><aside class="frd frd2 ${ani?"frd-in":""}" role="dialog" aria-modal="true" aria-labelledby="frd-t">
    ${frHead({tint:"var(--blue-bg)",ico:`<span class="frd-skico">${FR_IC}</span>`,kick:`Skill, ${x.a}`,titulo:x.t,lede:"",chips:[]})}
      <div class="frd-tabs" role="tablist" aria-label="Informações da skill">${tabs.map(([k,l])=>`<button role="tab" aria-selected="${tab===k}" data-act="frTab" data-arg="${k}">${l}${k==="usos"&&usos.length?`<em>${usos.length}</em>`:""}</button>`).join("")}</div></header>
    <div class="frd-b frd-b2" role="tabpanel">${painel}</div>
    <footer class="frd-f frd-f2"><button class="btn btn-g" data-act="frCons" data-arg="${esc(st.md)}">${px("hub",18)}Perguntar ao Consultor</button><button class="btn btn-p" data-act="frBaixarSkill" data-arg="${x.id}">${FR_DL}Baixar a skill</button></footer></aside>`; };
