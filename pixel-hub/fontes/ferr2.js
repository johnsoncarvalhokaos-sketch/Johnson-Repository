/* detalhe da skill em drawer com abas (03/11). Referências do Mobbin: incident.io (abas logo abaixo do título, ações no rodapé),
   Unify e Gumloop (cabeçalho fixo com fechar, rodapé fixo com a ação principal). O resumo fica sempre à vista; o resto vai para as abas. */
function frUsos(id){ return FR_AREA.filter(t=>t.resp&&t.resp.some(r=>r[3].includes(id))).map(t=>({t:t.nome||t.t,id:t.id,r:t.resp.filter(r=>r[3].includes(id)).map(r=>r[0])})); }
function frSkillDrawer(){ const st=frS(); const id=st.md.split(":")[1]; const x=frSk(id); if(!x) return ""; const usos=frUsos(id);
  const tabs=[["geral","Visão geral"],["como","Como funciona"],["dl","Download"],["usos",`Usada em${usos.length?` (${usos.length})`:""}`]]; const tab=st.tab||"geral";
  const vz=t=>`<p class="frd-vz">${t}</p>`;
  const painel=tab==="geral"?`<section class="frd-s"><h3>Para que serve</h3><p>${esc(x.d)}</p></section><section class="frd-s"><h3>Quando usar</h3>${x.quando?`<p class="frd-quando">${esc(x.quando)}</p>`:vz("“Quando usar” entra com o catálogo do Agent Builder.")}</section>`
    :tab==="como"?(x.como?`<section class="frd-s"><p class="frd-long">${esc(x.como)}</p></section>`:vz("“Como funciona” entra com o catálogo do Agent Builder."))
    :tab==="dl"?`<section class="frd-s"><div class="frd-file"><span class="frd-fi">${FR_DL}</span><span><b>SKILL.md</b><small>${esc(x.dl||"O SKILL.md, para enviar ao seu agente.")}</small></span></div></section>`
    :(usos.length?`<section class="frd-s"><ul class="frd-usos">${usos.map(u0=>`<li><button data-act="frAbrir" data-arg="${u0.id}"><span class="frd-ui">${px("extensao",22)}</span><span><b>${esc(u0.t)}</b><small>${u0.r.map(esc).join(", ")}</small></span>${u("chev")}</button></li>`).join("")}</ul></section>`:vz("Ainda não aparece num template do protótipo. Você pode adicionar ao seu agente pelo Agent Builder."));
  return `<div class="fr-ov" data-act="frFechar"></div><aside class="frd" role="dialog" aria-modal="true" aria-labelledby="frd-t">
    <header class="frd-h"><div class="frd-top"><span class="fr-si">${FR_IC}</span><span class="frd-k">Skill</span><span class="frd-area">${esc(x.a)}</span><button class="ibtn frd-x" data-act="frFechar" aria-label="Fechar">${u("x")}</button></div>
      <h2 id="frd-t">${esc(x.t)}</h2>
      <div class="frd-tabs" role="tablist" aria-label="Informações da skill">${tabs.map(([k,l])=>`<button role="tab" aria-selected="${tab===k}" data-act="frTab" data-arg="${k}">${l}</button>`).join("")}</div></header>
    <div class="frd-b" role="tabpanel">${painel}</div>
    <footer class="frd-f"><button class="btn btn-g" data-act="frCons" data-arg="${esc(st.md)}">${px("hub",18)}Perguntar ao Consultor</button><button class="btn btn-p" data-act="frBaixarSkill" data-arg="${x.id}">${FR_DL}Baixar a skill</button></footer></aside>`; }
(function(){ const _m=frModal; frModal=function(){ const st=frS(); if(st.md&&st.md.startsWith("s:")) return frSkillDrawer(); return _m(); }; })();
Object.assign(A,{ frTab:k=>{ frS().tab=k; R(); requestAnimationFrame(()=>document.querySelector(".frd-b")?.scrollTo({top:0})); } });
(function(){ const _s=A.frSkill; A.frSkill=id=>{ frS().tab="geral"; _s(id); }; })();
