/* Mapa da jornada redesenhado (09/11). Referências do Mobbin: Base44 (níveis em cartões, com barra de progresso, quanto falta e os próximos travados),
   Cofounder (mapa por estágio, cada passo com estado), Magnific Academy (módulos com a aula atual destacada e a duração de cada uma). */
function mjFase(B,bi){ const A=TV_ATUAL, n=bi+1, atual=n===A.b, feita=n<A.b; const P=ES_PILULAS();
  if(!atual) return `<section class="mj ${feita?"ok":"fut"}"><div class="mj-h"><span class="mj-n">${feita?u("check"):n}</span><div class="mj-ht"><small>Fase ${n}</small><b>${esc(B.t)}</b>${B.fim?`<span>${esc(B.fim)}</span>`:""}</div><span class="mj-st">${feita?"Concluída":`${u("cadeado")}Em gravação`}</span></div>${feita?"":`<p class="mj-trava">Abre quando a Fase ${n-1} terminar.</p>`}</section>`;
  const et=B.et, tot=et.length; const pr=esProgresso(); const pct=Math.round(((A.e)+(pr.f/pr.n))/tot*100);
  const linhas=et.map((nome,k)=>{ const E=(BK7_B1||[]).find(x=>x.n===String(k+1))||{tot:0,a:[]}; const opc=(BK7_B1||[]).filter(x=>x.op&&x.n.startsWith((k+1)+".")); const st=k<A.e?"ok":k===A.e?"at":"next";
    const meta=`${E.tot} ${E.tot===1?"aula":"aulas"}${opc.length?`, mais ${opc.length===1?"1 etapa opcional":opc.length+" etapas opcionais"}`:""}`;
    let corpo="";
    if(st==="at"){ const lista=P.a||[]; const resto=Math.max(0,(P.tot||lista.length)-lista.length); const ix=lista.findIndex(a=>a.atual);
      corpo=`<div class="mj-cur"><ol class="mj-pl">${lista.map((a,j)=>{ const s2=j<ix?"ok":j===ix?"at":"next"; return `<li class="${s2}"><span class="mj-pi">${s2==="ok"?u("check"):s2==="at"?u("play"):""}</span><span class="mj-pt">${esc(a.t)}${s2==="at"?`<em>Você está aqui, ${pr.f} de ${pr.n} subpassos</em>`:""}</span></li>`; }).join("")}${resto?`<li class="next more"><span class="mj-pi"></span><span class="mj-pt">E mais ${resto} ${resto===1?"aula":"aulas"} nesta etapa</span></li>`:""}</ol>
        <button class="btn btn-p btn-sm mj-go" data-act="tcAba" data-arg="agora">Continuar de onde parou${u("arrow")}</button></div>`; }
    return `<li class="mj-e ${st}"><span class="mj-dot">${st==="ok"?u("check"):st==="at"?"<i></i>":""}</span><div class="mj-eb"><div class="mj-er"><div><small>Etapa ${k+1}${st==="at"?", agora":""}</small><b>${esc(nome)}</b></div><span class="mj-meta">${meta}</span></div>${corpo}</div></li>`; }).join("");
  return `<section class="mj at"><div class="mj-h"><span class="mj-n">${n}</span><div class="mj-ht"><small>Fase ${n}, a sua fase agora</small><b>${esc(B.t)}</b>${B.fim?`<span>Você sai com ${esc(B.fim.charAt(0).toLowerCase()+B.fim.slice(1))}</span>`:""}</div><span class="mj-st at">Etapa ${A.e+1} de ${tot}</span></div>
    <div class="mj-pg"><i><b style="width:${Math.max(3,pct)}%"></b></i><span>${pct}% da fase</span></div><ol class="mj-tl">${linhas}</ol></section>`; }
esMapaLista=function(){ return `<div class="mj-l">${TV_BLOCOS.map(mjFase).join("")}</div>`; };
(function(){ try{ R(); }catch(e){} })();
