/* ===================== parte 4: conteúdo ligado à aula (c35) =====================
   Na página do conteúdo, "Aparece nestas aulas" com as aulas da etapa e o atalho para a Trilha;
   no passo da Trilha, "Conteúdo complementar deste passo" com os itens ligados àquela etapa. */
function ccItens(et){ const o=[]; try{ Object.keys(BK7_COL).forEach(t=>{ (BK7_COL[t]||[]).forEach((sec,si)=>{ (sec[2]||[]).forEach((it,ii)=>{ if(it.et===et) o.push({k:`${t}|${si}|${ii}`,t:it.t||it.n||"",tipo:(BK7_SING[t]||[t])[0]}); }); }); }); }catch(e){} return o; }
function ccAulas(et){ const E=(BK7_B1||[]).find(x=>x.n===String(et)); return E?(E.a||[]).map(a=>a.t):[]; }
(function(){ const _d=bk7Drawer; bk7Drawer=function(){ let h=_d(); if(!h) return h; const g=bk7Get(bk2S().dr); if(!g) return h; const it=g.it;
  if(it.et==null) return h; const aulas=it.et===0?[]:ccAulas(it.et).slice(0,Math.max(1,it.aulas||3));
  const sec=`<section class="cc-ap"><h3>Aparece nestas aulas</h3>${it.et===0?`<p class="cc-pr">Preparação, antes da etapa 1 da Trilha.</p>`:`<p class="cc-et">Trilha, etapa ${it.et}: ${esc(TV_BLOCOS[0].et[it.et-1]||"")}</p>`}${aulas.length?`<ul>${aulas.map(a=>`<li><button data-act="bk2Trilha"><span class="cc-pl">${u("play")}</span><span>${esc(a)}</span>${u("chev")}</button></li>`).join("")}</ul>`:""}<button class="btn btn-g btn-sm" data-act="bk2Trilha">${u("map")}Ver na Trilha</button></section>`;
  return h.replace(/<button class="bk2-usado"[\s\S]*?<\/button>/,sec); }; })();
(function(){ const _a=tcAgora; tcAgora=function(){ let h=_a(); if(tcS().prox) return h; const itens=ccItens(TV_ATUAL.e+1).slice(0,4); if(!itens.length) return h;
  const bloco=`<section class="cc-ps" aria-labelledby="cc-ps-h"><h3 id="cc-ps-h">Conteúdo complementar deste passo</h3><ul>${itens.map(x=>`<li><button data-act="ccAbrir" data-arg="${esc(x.k)}"><small>${esc(x.tipo.charAt(0).toUpperCase()+x.tipo.slice(1))}</small><b>${esc(x.t)}</b></button></li>`).join("")}</ul></section>`;
  return h.replace(/<\/section>$/,bloco+"</section>"); }; })();
Object.assign(A,{ ccAbrir:k=>{ A.trSub("base"); A.bk7Abrir(k); } });
