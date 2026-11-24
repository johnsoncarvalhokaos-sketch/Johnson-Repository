<script>
/* ===================== Plano lê a entrevista (c42; horas do c43), 24/11 =====================
   Depois da entrevista (conversa ou imersiva), o Plano mostra o que ela capturou, com as peças que ele já tem:
   - Resultado esperado: as horas que voltam, calculadas como o Plano já calcula (horas gastas × a redução do agente
     recomendado, 30% a 50% por padrão), agora sobre as horas que a pessoa contou; o selo "Estimativa" fica;
   - Oportunidades e processos: os processos contados primeiro, com frequência, tempo e horas gastas hoje, "Declarado";
   - Fontes: as ferramentas que a pessoa usa, primeiro, "Declarado"; as previstas pelo Consultor seguem depois.
   Sem entrevista concluída por esse fluxo (por exemplo, "Entrevista: Feita" nos Ajustes), o Plano fica como estava. */
function plEnt(){ return S.entrev&&S.ent&&S.ent.done?S.ent.v.a:null; }
(function(){ const _tp=telaPlano; telaPlano=function(){ let h=_tp(); const a=plEnt(); if(!a) return h;
  const ps=entProcs(a), tot=ps.reduce((s,p)=>s+(p.h||0),0), dec=stTag("dec","Informado por você na entrevista");
  if(tot){ let r=[.3,.5]; try{ r=v4Compute().prim.red||r; }catch(e){}
    const lo=Math.max(1,Math.round(tot*r[0])), hi=Math.max(lo+1,Math.round(tot*r[1]));
    h=h.replace(/<b>\d+–\d+ h por mês<\/b><small>[^<]*<\/small>/,`<b>${lo}–${hi} h por mês</b><small>de volta ${ps.length>1?"nos processos":"no processo"} que você contou na entrevista</small>`);
    h=h.replace(/(<div class="pl-c pl-dest">[\s\S]*?<div class="pl-ft">)<span class="stg st-rec"[^>]*>[^<]*<\/span>/,(m,ini)=>ini+stTag("dec","Calculado por regra a partir das suas respostas")); }
  const item=(t,em)=>`<li><span class="pl-dot"></span><span><b>${esc(t)}</b><em>${esc(em)}</em></span>${dec}</li>`;
  const secUl=(titulo,lis)=>{ const i=h.indexOf(`<h2>${titulo}</h2>`); if(i<0||!lis) return; const j=h.indexOf('<ul class="pl-l">',i); if(j<0) return; const k=j+'<ul class="pl-l">'.length; h=h.slice(0,k)+lis+h.slice(k); };
  /* processos: a mesma forma da entrevista ("todo dia, cada vez 1 a 2 h"), e as horas são as gastas hoje */
  secUl("Oportunidades e processos",ps.map(p=>{ const det=[p.freq&&p.freq.toLowerCase(),p.tempo&&"cada vez "+p.tempo.toLowerCase(),p.h!=null&&(p.h<1?"hoje, menos de 1 h por mês":entH(p.h).replace("≈","hoje ≈"))].filter(Boolean);
    return item(p.nome,det.length?"Da sua entrevista: "+det.join(", "):"Da sua entrevista"); }).join(""));
  /* fontes: o que a pessoa usa entra primeiro; uma ferramenta já conectada fica como está; o ERP segue como "próximo agente" */
  let ferr=(a.ferr||[]).filter(f=>f&&f!=="Nenhuma delas"&&f!=="Outra");
  { const i=h.indexOf("<h2>Fontes</h2>"), j=i<0?-1:h.indexOf("</ul>",i);
    if(j>0){ let sec=h.slice(i,j); const rx=f=>new RegExp(`<li>(?:(?!<li>).)*?<b>${esc(f).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}</b>(?:(?!<li>).)*?</li>`);
      ferr=ferr.filter(f=>{ const m=sec.match(rx(f)); if(m&&/pl-dot ok/.test(m[0])) return false; if(m) sec=sec.replace(rx(f),""); return true; });
      if(ferr.includes("ERP")&&/<b>ERP da empresa<\/b>/.test(sec)){ sec=sec.replace("<em>Fica para um próximo agente</em>","<em>Você usa hoje; fica para um próximo agente</em>"); ferr=ferr.filter(f=>f!=="ERP"); }
      h=h.slice(0,i)+sec+h.slice(j); } }
  secUl("Fontes",ferr.map(f=>item(f,"Você usa hoje, segundo a entrevista")).join(""));
  return h; }; })();
/* artigo depois da troca de "bloco" por "fase" ("O próximo bloco" virava "O próxima fase"; "no primeiro bloco", "no primeira fase") */
VOC_TROCAS.push([/\b([Oo]) (próxima|primeira) fase\b/g,(m,o,x)=>(o==="O"?"A":"a")+" "+x+" fase"],[/\b([NnDd])o (próxima|primeira) fase\b/g,"$1a $2 fase"]);
</script>
