/* volta ao drawer (04/11, pedido do Johnson): clicar num cartão de template ou de skill abre o drawer da direita.
   A página própria continua acessível pelo ícone "Abrir em página" no topo do drawer.
   Skill no drawer: as quatro seções na tela, uma embaixo da outra (combinado do kanban, c08); template: abas (c10). */
frSkillDrawer=function(){ const st=frS(); const id=st.md.split(":")[1]; const x=frSk(id); if(!x) return ""; const usos=frUsos(id);
  const vz=t=>`<p class="frd-vz">${t}</p>`; const ani=st.ani; st.ani=0;
  return `<div class="fr-ov ${ani?"":"sem-ani"}" data-act="frFechar"></div><aside class="frd frd2 fsp ${ani?"frd-in":""}" role="dialog" aria-modal="true" aria-labelledby="frd-t">
    ${frHead({tint:"var(--blue-bg)",ico:`<span class="frd-skico">${FR_IC}</span>`,kick:"Skill",titulo:x.t,lede:"",chips:[]})}${frTraits([["etiqueta",x.a],["arquivo","SKILL.md"]],"frd-traits-sk")}</header>
    <div class="frd-b frd-b2 fsp-b">
      <section class="fsp-s"><h3>Para que serve</h3><p class="fsp-lead">${esc(x.d)}</p></section>
      <section class="fsp-s"><h3>Quando usar</h3>${x.quando?`<p class="frd-quando2">${esc(x.quando)}</p>`:vz("“Quando usar” entra com o catálogo do Agent Builder.")}</section>
      <section class="fsp-s"><h3>Como funciona</h3>${x.como?`<p class="frd-long2">${esc(x.como)}</p>`:vz("“Como funciona” entra com o catálogo do Agent Builder.")}</section>
      <section class="fsp-s"><h3>O que vem no download</h3><div class="frd-file2"><span class="frd-fi">${FR_DL}</span><span><b>SKILL.md</b><small>${esc(x.dl||"O SKILL.md, para enviar ao seu agente.")}</small></span></div></section>
      ${usos.length?`<details class="fsp-usos"><summary>Usada em ${usos.length} ${usos.length===1?"template":"templates"}</summary><ul class="frd-usos2">${usos.map(u0=>`<li><button data-act="frAbrir" data-arg="${u0.id}"><span class="frd-tile sm" style="background:${FR_TINT.extensao}">${px("extensao",20)}</span><span><b>${esc(u0.t)}</b><small>${u0.r.map(esc).join(", ")}</small></span>${u("chev")}</button></li>`).join("")}</ul></details>`:""}
    </div>
    <footer class="frd-f frd-f2"><button class="btn btn-g" data-act="frCons" data-arg="${esc(st.md)}">${px("hub",18)}Perguntar ao Consultor</button><button class="btn btn-p" data-act="frBaixarSkill" data-arg="${x.id}">${FR_DL}Baixar a skill</button></footer></aside>`; };
Object.assign(A,{
  frAbrir:id=>{ const st=frS(); if(st.pg){ st.pg="t:"+id; st.tab=null; R(); document.getElementById("scroller")?.scrollTo({top:0}); return; }
    st.ani=!(st.md&&st.md.startsWith("t:")); st.md="t:"+id; st.tab=null; R(); requestAnimationFrame(()=>document.querySelector(".frd-b")?.scrollTo({top:0})); },
  frSkill:id=>{ const st=frS(); if(st.pg){ st.pg="s:"+id; R(); document.getElementById("scroller")?.scrollTo({top:0}); return; }
    st.ani=!(st.md&&st.md.startsWith("s:")); st.md="s:"+id; st.tab=null; R(); requestAnimationFrame(()=>document.querySelector(".frd-b")?.scrollTo({top:0})); }
});
