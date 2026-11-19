/* ===== Kanban, em andamento (03/11) =====
   c02: Trilha com submenu no menu (Jornada do agente e Base de conhecimento); as abas da página saem, o submenu é o caminho.
   c04: templates de agentes e skills saem da Base; a coleção "Templates" da Base vira "Modelos", só com os moldes (Company Brain, USER.md).
   c07: página própria para cada template e cada skill; o drawer continua como prévia rápida, com "Abrir em página". */
Object.assign(A,{ trSub:v=>{ S.sideOpen=false; if(v==="jornada"&&S.planoF){ A.irBloq("jornada"); return; } S.trTab=v==="base"?"base":null; ir("trilha"); } });
/* c04 */
(function(){ try{
  BK7_COL.templates=BK7_COL.templates.filter(s=>s[0]!=="Agente Hermes").map(s=>s[0]==="Próximos templates"?["Próximos modelos","Entram aqui com a etiqueta do que são: um relatório, uma proposta, uma aula em HTML.",[],"Nenhum ainda. Os modelos chegam junto com as aulas que os usam."]:s);
  BK7_COL.templates.forEach(s=>s[2].forEach(it=>{ if(it.tag==="Company Brain") it.tag="Molde do Company Brain"; }));
  delete BK7_N.templates; delete BK7_COL.skills;
  BK7_TIPOS.forEach(t=>{ if(t[0]==="templates") t[1]="Modelos"; }); BK2_TIPOS.forEach(t=>{ if(t[0]==="templates") t[1]="Modelos"; });
  BK7_DESC.templates="Moldes que a sua IA aplica: os do Company Brain e os arquivos-base do agente. Os templates de agentes e as skills ficam em Ferramentas e skills.";
  BK3_DESC.templates=BK7_DESC.templates; BK7_SING.templates=["modelo","modelos"]; BK3_SING.templates=["modelo","modelos"];
  for(let i=BK2_ITENS.length-1;i>=0;i--){ if(BK2_ITENS[i].tipo==="skills") BK2_ITENS.splice(i,1); }
}catch(e){ console.error(e); } })();
/* c07: página própria */
function frPagina(){ const st=frS(); const md0=st.md, ani0=st.ani; st.md=st.pg; st.ani=0; const sk=st.pg.startsWith("s:"); let h=sk?frSkillDrawer():frTplDrawer(); st.md=md0; st.ani=ani0;
  h=h.replace(/^<div class="fr-ov[^>]*><\/div>/,"").replace('<aside class="frd','<article class="frd frd-pg').replace(/<\/aside>$/,"</article>").replace(/data-act="frFechar"/g,'data-act="frVoltar"').replace(/<button class="ibtn frd-pgb"[\s\S]*?<\/button>/,"").replace('aria-modal="true"','');
  const x=sk?frSk(st.pg.slice(2)):frTpl(st.pg.slice(2)); const nome=x?(x.nome||x.t):"";
  return `<nav class="fr-cr" aria-label="Caminho"><button class="lnk" data-act="frVoltar">Ferramentas e skills</button>${u("chev")}<span>${sk?"Skills":"Templates de agentes"}</span>${u("chev")}<span class="fr-cr-at">${esc(nome)}</span></nav>${h}`; }
(function(){ const _t=telaFerr; telaFerr=function(){ const st=frS(); if(!st.pg) return _t(); return `<div class="shell noagent ${S.sideOpen?"side-open":""}">${lateral()}${S.sideOpen?'<div class="scrim" data-act="menuM"></div>':""}<main class="center">${topoApp("Ferramentas e skills","Para usar nos seus agentes")}<div class="views"><div class="view" id="scroller"><div class="page fr fr-pgw">${frPagina()}</div></div></div></main>${st.md?frModal():""}</div>`; }; })();
(function(){ const _h=frHead; frHead=function(o){ return _h(o).replace('<button class="ibtn frd-x" data-act="frFechar" aria-label="Fechar">','<button class="ibtn frd-pgb" data-act="frPaginaAbrir" aria-label="Abrir em página" title="Abrir em página"><svg class="u" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5"/></svg></button><button class="ibtn frd-x" data-act="frFechar" aria-label="Fechar">'); }; })();
Object.assign(A,{
  frPaginaAbrir:()=>{ const st=frS(); if(!st.md) return; st.pg=st.md; st.md=null; R(); document.getElementById("scroller")?.scrollTo({top:0}); },
  frVoltar:()=>{ const st=frS(); st.pg=null; st.tab=null; R(); }
});
(function(){ const _a=A.frAbrir, _s=A.frSkill; A.frAbrir=id=>{ const st=frS(); if(st.pg){ st.pg="t:"+id; st.tab=null; R(); document.getElementById("scroller")?.scrollTo({top:0}); return; } _a(id); };
  A.frSkill=id=>{ const st=frS(); if(st.pg){ st.pg="s:"+id; st.tab="geral"; R(); document.getElementById("scroller")?.scrollTo({top:0}); return; } _s(id); };
  const _i=A.irFerr; A.irFerr=()=>{ const st=frS(); st.pg=null; st.md=null; _i(); }; })();
