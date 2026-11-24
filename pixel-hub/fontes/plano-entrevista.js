<script>
/* ===================== Plano lê a entrevista (c42; horas do c43), 24/11 =====================
   Depois da entrevista (conversa ou imersiva), o Plano mostra o que ela capturou, com as peças que ele já tem:
   - Resultado esperado: as horas por mês dos processos contados, no lugar da faixa genérica (selo "Estimativa" mantido);
   - Oportunidades e processos: os processos contados primeiro, com frequência, tempo e horas, marcados "Informado por você";
   - Fontes: as ferramentas que a pessoa usa, primeiro, marcadas "Informado por você"; as previstas pelo Consultor seguem depois.
   Sem entrevista concluída por esse fluxo (por exemplo, "Entrevista: Feita" nos Ajustes), o Plano fica como estava. */
function plEnt(){ return S.entrev&&S.ent&&S.ent.done?S.ent.v.a:null; }
(function(){ const _tp=telaPlano; telaPlano=function(){ let h=_tp().replace("no primeira fase","na primeira fase"); const a=plEnt(); if(!a) return h; // a troca de "bloco" por "fase" deixou o artigo no masculino
  const ps=entProcs(a), tot=ps.reduce((s,p)=>s+(p.h||0),0), dec=stTag("dec","Informado por você na entrevista");
  if(tot) h=h.replace(/<b>\d+–\d+ h por mês<\/b><small>[^<]*<\/small>/,`<b>≈ ${tot} h por mês</b><small>${ps.length>1?"nos processos que você contou na entrevista":"no processo que você contou na entrevista"}</small>`);
  const item=(t,em)=>`<li><span class="pl-dot"></span><span><b>${esc(t)}</b><em>${esc(em)}</em></span>${dec}</li>`;
  const secUl=(titulo,lis)=>{ const i=h.indexOf(`<h2>${titulo}</h2>`); if(i<0||!lis) return; const j=h.indexOf('<ul class="pl-l">',i); if(j<0) return; const k=j+'<ul class="pl-l">'.length; h=h.slice(0,k)+lis+h.slice(k); };
  secUl("Oportunidades e processos",ps.map(p=>item(p.nome,["Da sua entrevista",[p.freq,p.tempo&&p.tempo.toLowerCase()+" cada vez"].filter(Boolean).join(", "),p.h!=null?`≈ ${p.h} h por mês`:""].filter(Boolean).join(" · "))).join(""));
  const ferr=(a.ferr||[]).filter(f=>f!=="Nenhuma delas");
  { const i=h.indexOf("<h2>Fontes</h2>"), j=i<0?-1:h.indexOf("</ul>",i); // a mesma ferramenta não aparece duas vezes: a da entrevista fica
    if(j>0){ let sec=h.slice(i,j); ferr.forEach(f=>{ sec=sec.replace(new RegExp(`<li>(?:(?!<li>).)*?<b>${esc(f).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}</b>(?:(?!<li>).)*?</li>`),""); }); h=h.slice(0,i)+sec+h.slice(j); } }
  secUl("Fontes",ferr.map(f=>item(f,"Você usa hoje, segundo a entrevista")).join(""));
  return h; }; })();
</script>
