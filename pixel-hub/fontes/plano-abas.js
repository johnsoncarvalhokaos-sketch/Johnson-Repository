<style>
/* ===================== Plano: Individual | Equipe no topo (26/11) =====================
   A separação entre a visão individual e a da equipe passa a abrir a página, antes do título; a aba "Seu plano" vira "Individual".
   E o ícone das listas fica na mesma linha do nome. */
.page.plano > .pl-tabs:first-child{ margin:0 0 24px !important; }
.pl-l li > span > b:has(.px-mc, .pl-ic, .px-mc-par){ display:flex !important; align-items:center; }
</style>
<script>
(function(){ const _tp=telaPlano; telaPlano=function(){ let h=_tp(); if(S.profile!=="admin"||!pl2On()) return h;
  h=h.replace(/(data-act="plVista" data-arg="eu">)Seu plano</,"$1Individual<");
  const m=h.match(/<div class="tabs ap-tabs pl-tabs"[\s\S]*?<\/div>/); if(!m) return h;
  h=h.replace(m[0],""); const a=h.indexOf('<div class="page plano'); if(a<0) return h; const e=h.indexOf(">",a)+1; h=h.slice(0,e)+m[0]+h.slice(e);
  if(S.plVista==="equipe") h=h.replace(/<div class="phd"><h1([^>]*)>[^<]*<\/h1><p>[^<]*<\/p><\/div>/,'<div class="phd"><h1$1>A equipe rumo à operação agêntica</h1></div>');
  return h; }; })();
</script>
