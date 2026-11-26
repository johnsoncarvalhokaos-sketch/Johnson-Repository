<style>
/* ===================== Plano › Equipe: os dois cards do topo (26/11) =====================
   Mesma anatomia nos dois (cards uniformes): rótulo + selo "Inclui exemplo" na mesma linha; valor 24/600 com o selo
   "Estimativa" colado, como no Individual; uma linha de apoio (barra das entrevistas / valor em reais); nota de rodapé
   14/400 presa à base, para os dois terminarem alinhados. Sem gradiente: o destaque vem do número. */
html body .pl-eq .eq-top{ display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0 24px; }
html body .pl-eq .eq-c{ display:flex; flex-direction:column; padding:24px; border:1px solid var(--line,#ECEDF0); border-radius:20px; background:#fff; min-width:0; }
html body .pl-eq .eq-hd{ display:flex; align-items:center; justify-content:space-between; gap:12px; min-height:24px; }
html body .pl-eq .eq-k{ font-size:14px; font-weight:500; line-height:20px; color:var(--muted,#6B6E79); }
html body .pl-eq .eq-v{ display:flex; align-items:center; flex-wrap:wrap; gap:8px; margin-top:8px; font-size:24px; font-weight:600; line-height:32px; color:var(--ink); letter-spacing:-.01em; }
html body .pl-eq .eq-v small{ font-size:16px; font-weight:400; color:var(--muted,#6B6E79); letter-spacing:0; }
html body .pl-eq .eq-s{ margin-top:12px; font-size:16px; font-weight:500; line-height:24px; color:var(--ink); }
html body .pl-eq .eq-s span{ font-weight:400; color:var(--muted,#6B6E79); }
html body .pl-eq .eq-bar{ display:grid; grid-auto-flow:column; grid-auto-columns:1fr; gap:4px; margin-top:16px; }
html body .pl-eq .eq-bar i{ height:6px; border-radius:3px; background:#ECEDF0; }
html body .pl-eq .eq-bar i.p{ background:#12875A; }
html body .pl-eq .eq-n{ margin:auto 0 0; padding-top:16px; font-size:14px; font-weight:400; line-height:20px; color:var(--muted,#6B6E79); }
html body .pl-eq .eq-n b{ font-weight:500; color:var(--ink); }
@media (max-width:720px){ html body .pl-eq .eq-top{ grid-template-columns:1fr; } html body .pl-eq .eq-c{ padding:20px; } }
</style>
<script>
(function(){ const _eq=plEquipeTela; plEquipeTela=function(){ let h=_eq(); try{
  const a=h.indexOf('<div class="pl-top">'), b=a<0?-1:h.indexOf('<section class="pls',a); if(b<0) return h;
  const eq=plEquipe(), red=eq[0]?eq[0].red:[.3,.5], feitas=eq.filter(x=>x.feita), falta=eq.filter(x=>!x.feita);
  const procs=feitas.flatMap(x=>x.procs), tot=procs.reduce((s,p)=>s+(p.h||0),0), lo=Math.max(1,Math.round(tot*red[0])), hi=Math.max(lo+1,Math.round(tot*red[1]));
  const ex=feitas.some(x=>x.exemplo)?pill("Inclui exemplo","idle"):"", lista=n=>n.length<2?n.join(""):n.slice(0,-1).join(", ")+" e "+n[n.length-1];
  const c1=`<div class="eq-c"><div class="eq-hd"><span class="eq-k">Entrevistas</span>${ex}</div>
    <div class="eq-v">${feitas.length} de ${eq.length} <small>concluídas</small></div>
    <div class="eq-bar" role="img" aria-label="${feitas.length} de ${eq.length} entrevistas concluídas">${eq.map(x=>`<i class="${x.feita?"p":""}"></i>`).join("")}</div>
    <p class="eq-n">${falta.length?`Falta${falta.length>1?"m":""} <b>${esc(lista(falta.map(x=>x.nome)))}</b>. O plano da empresa fica mais preciso a cada entrevista.`:"Toda a equipe já fez a entrevista."}</p></div>`;
  const c2=tot?`<div class="eq-c"><div class="eq-hd"><span class="eq-k">Horas de volta da equipe</span>${ex}</div>
    <div class="eq-v">${lo}–${hi} h por mês ${pill("Estimativa","wait")}</div>
    ${S.custoH?`<div class="eq-s">${plBRL(lo*S.custoH)}–${plBRL(hi*S.custoH).replace("R$ ","")} por mês<span>, com a hora a ${plBRL(S.custoH)}</span></div>`:""}
    <p class="eq-n">Soma dos ${procs.length===1?"processo":procs.length+" processos"} que a equipe contou, com a mesma regra do seu Plano.</p></div>`
   :`<div class="eq-c"><div class="eq-hd"><span class="eq-k">Horas de volta da equipe</span></div><div class="eq-v">Ainda sem horas</div><p class="eq-n">As horas aparecem quando alguém contar um processo na entrevista.</p></div>`;
  h=h.slice(0,a)+`<div class="eq-top">${c1}${c2}</div>`+h.slice(b);
  }catch(e){ console.warn("topo da Equipe",e); } return h; }; })();
</script>
