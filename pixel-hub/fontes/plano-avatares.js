<style>
/* ===================== Plano › Equipe: avatar em cada responsável (26/11) =====================
   Círculo com a foto de perfil (só a Renata tem foto; os outros, iniciais nas cores da lista da Empresa).
   32 px na lista de Pessoas, no lugar do ponto; 20 px antes do nome em Processos e Ferramentas. */
.pl-av{ width:32px; height:32px; border-radius:50%; display:inline-grid; place-items:center; flex:none; overflow:hidden; font-size:12px; font-weight:600; color:var(--ink); background:#E7E3DD; }
.pl-av.c1{ background:#DCE7FF; } .pl-av.c2{ background:#E3F4EB; } .pl-av.c3{ background:#FFE9DE; }
.pl-av img{ width:100%; height:100%; object-fit:cover; display:block; }
.pl-av.mini{ width:20px; height:20px; font-size:8px; margin-right:6px; vertical-align:middle; position:relative; top:-1px; }
html body .pl-eq .pl-l li:has(> .pl-av:first-child){ grid-template-columns:32px minmax(0,1fr) auto !important; column-gap:12px; }
html body .pl-eq .pl-l .pl-av.mini{ font-size:8px !important; line-height:20px !important; font-style:normal; }
</style>
<script>
function plAv(nome,i,mini){ const foto=nome==="Renata Lacerda"&&typeof FOTO_RENATA!=="undefined";
  return `<span class="pl-av c${i%4}${mini?" mini":""}" aria-hidden="true">${foto?`<img src="${FOTO_RENATA}" alt="">`:esc(String(nome).split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase())}</span>`; }
(function(){ const _eq=plEquipeTela; plEquipeTela=function(){ let h=_eq(); try{
  const eq=plEquipe(), idx={}; eq.forEach((x,i)=>{ idx[x.nome]=i; });
  /* Pessoas: avatar no lugar do ponto, na ordem da lista */
  let k=0; const t=h.indexOf(">Pessoas<"), a=h.lastIndexOf('<section class="pls',t), b=h.indexOf("</section>",t);
  if(t>0&&a>=0&&b>t){ const sec=h.slice(a,b).replace(/<li><span class="pl-dot[^"]*"><\/span>/g,()=>{ const x=eq[k++]; return x?`<li>${plAv(x.nome,idx[x.nome])}`:"<li>"; }); h=h.slice(0,a)+sec+h.slice(b); }
  /* Processos e Ferramentas: mini avatar antes de cada primeiro nome no texto de apoio */
  const t2=h.indexOf(">Processos por área<"); if(t2>0){ const a2=h.lastIndexOf('<section class="pls',t2);
    h=h.slice(0,a2)+h.slice(a2).replace(/<em>([^<]*)<\/em>/g,(m,txt)=>"<em>"+eq.reduce((s,x)=>{ const f=String(x.nome).split(" ")[0]; return s.replace(new RegExp("(^|: |, )"+f+"\\b","g"),(mm,p)=>p+plAv(x.nome,idx[x.nome],1)+f); },txt)+"</em>"); }
  }catch(e){ console.warn("avatares da Equipe",e); } return h; }; })();
</script>
