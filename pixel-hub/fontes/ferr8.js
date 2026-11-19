/* Kanban, em andamento (03/11): c07 página própria (cada item abre a sua página, sem janela compartilhada);
   c08 na página da skill, para que serve, quando usar, como funciona e o que vem no download ficam todos na tela, sem abas;
   c10 no template, "O que compõe" (responsabilidades ou blocos) e as rotinas seguem em abas; c11 ações: Baixar a skill e Perguntar ao Consultor. */
function frSkillPagina(){ const st=frS(); const id=st.pg.slice(2); const x=frSk(id); if(!x) return ""; const usos=frUsos(id);
  const vz=t=>`<p class="frd-vz">${t}</p>`;
  return `<nav class="fr-cr" aria-label="Caminho"><button class="lnk" data-act="frVoltar">Ferramentas e skills</button>${u("chev")}<span>Skills</span>${u("chev")}<span class="fr-cr-at">${esc(x.t)}</span></nav>
  <article class="frd frd2 frd-pg fsp">${frHead({tint:"var(--blue-bg)",ico:`<span class="frd-skico">${FR_IC}</span>`,kick:"Skill",titulo:x.t,lede:"",chips:[]}).replace(/<button class="ibtn frd-pgb"[\s\S]*?<\/button>/,"").replace('data-act="frFechar"','data-act="frVoltar"')}${frTraits([["etiqueta",x.a],["arquivo","SKILL.md"]],"frd-traits-sk")}</header>
    <div class="frd-b frd-b2 fsp-b">
      <section class="fsp-s"><h3>Para que serve</h3><p class="fsp-lead">${esc(x.d)}</p></section>
      <section class="fsp-s"><h3>Quando usar</h3>${x.quando?`<p class="frd-quando2">${esc(x.quando)}</p>`:vz("“Quando usar” entra com o catálogo do Agent Builder.")}</section>
      <section class="fsp-s"><h3>Como funciona</h3>${x.como?`<p class="frd-long2">${esc(x.como)}</p>`:vz("“Como funciona” entra com o catálogo do Agent Builder.")}</section>
      <section class="fsp-s"><h3>O que vem no download</h3><div class="frd-file2"><span class="frd-fi">${FR_DL}</span><span><b>SKILL.md</b><small>${esc(x.dl||"O SKILL.md, para enviar ao seu agente.")}</small></span></div></section>
      ${usos.length?`<details class="fsp-usos"><summary>Usada em ${usos.length} ${usos.length===1?"template":"templates"}</summary><ul class="frd-usos2">${usos.map(u0=>`<li><button data-act="frAbrir" data-arg="${u0.id}"><span class="frd-tile sm" style="background:${FR_TINT.extensao}">${px("extensao",20)}</span><span><b>${esc(u0.t)}</b><small>${u0.r.map(esc).join(", ")}</small></span>${u("chev")}</button></li>`).join("")}</ul></details>`:""}
    </div>
    <footer class="frd-f frd-f2"><button class="btn btn-g" data-act="frCons" data-arg="s:${x.id}">${px("hub",18)}Perguntar ao Consultor</button><button class="btn btn-p" data-act="frBaixarSkill" data-arg="${x.id}">${FR_DL}Baixar a skill</button></footer></article>`; }
(function(){ const _p=frPagina; frPagina=function(){ const st=frS(); return st.pg&&st.pg.startsWith("s:")?frSkillPagina():_p(); }; })();
/* clicar num cartão abre a página do item (não mais o drawer) */
Object.assign(A,{
  frAbrir:id=>{ const st=frS(); st.md=null; st.pg="t:"+id; st.tab=null; R(); document.getElementById("scroller")?.scrollTo({top:0}); },
  frSkill:id=>{ const st=frS(); st.md=null; st.pg="s:"+id; R(); document.getElementById("scroller")?.scrollTo({top:0}); }
});
(function(){ const _c=A.frCons; A.frCons=k=>{ const st=frS(); const pg=st.pg; _c(k); st.pg=pg; R(); }; })();
