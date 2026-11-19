/* ===================== parte 2: Ferramentas e skills (c30 a c33) =====================
   c31: os agentes prontos (Marketing OS e Amora) viram produto: cartões maiores, com capa, números e a etiqueta "Plug and play".
   c32: os templates por área (em construção) ficam mais simples, com a etiqueta "Template inicial".
   c33: o Segundo Cérebro não é agente: ganha um bloco próprio, com ícone de cérebro.
   c30: na skill, o ícone é neutro e a área aparece numa etiqueta com a cor dela. */
const BRAIN_IC='<svg class="u" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 4.5A2.5 2.5 0 0 0 7 7a2.6 2.6 0 0 0-2 4.4A2.8 2.8 0 0 0 6.5 16 2.6 2.6 0 0 0 9.5 19.5V4.5Z"/><path d="M14.5 4.5A2.5 2.5 0 0 1 17 7a2.6 2.6 0 0 1 2 4.4 2.8 2.8 0 0 1-1.5 4.6 2.6 2.6 0 0 1-3 3.5V4.5Z"/><path d="M9.5 9H8M9.5 13.5H7.8M14.5 9H16M14.5 13.5h1.7"/></svg>';
function fzProduto(x){ const nums=(x.chips||[]).filter(c=>/^\d+ /.test(c)).slice(0,3); const tint=FR_TINT[x.cor]||FR_TINT.extensao;
  return `<button class="pc" data-act="frAbrir" data-arg="${x.id}"><span class="pc-hero" style="--pc-tint:${tint}"><span class="pc-ic">${px(x.cor,52)}</span><span class="pc-tag">Plug and play</span></span>
    <span class="pc-b"><b>${esc(x.t)}</b><span class="pc-d">${esc(x.d)}</span></span>
    <span class="pc-f"><span>${esc(x.acao[0]==="Ver por dentro"?"Ver por dentro":"Ver detalhes")}</span>${u("arrow")}</span></button>`; }
function fzCerebro(x){ return `<section class="fz-sec"><div class="fz-sh"><h2>Segundo Cérebro</h2><p>Não é um agente: é a base de conhecimento que os seus agentes consultam e mantêm.</p></div>
  <button class="scb" data-act="frAbrir" data-arg="${x.id}"><span class="scb-ic">${BRAIN_IC}</span><span class="scb-b"><b>${esc(x.t)}</b><span>${esc(x.lede||x.d)}</span><span class="scb-z">${(x.zip||[]).map(z=>`<span>${esc(z[0])}</span>`).join("")}</span></span><span class="fz-vd"><span class="fz-vdt">Ver detalhes</span>${u("chev")}</span></button></section>`; }
(function(){ const _l=frListaNova; frListaNova=function(){ let h=_l(); const st=frS(); if((st.vista||"templates")!=="templates") return h.replace(/<span class="fz-sca">([^<]*)<\/span>/g,(m,a)=>areaTag(a));
  const q=(st.q||"").toLowerCase().trim(); const bate=x=>!q||(x.t+" "+x.d).toLowerCase().includes(q);
  const ag=FR_SIS.filter(x=>x.id!=="sc"&&bate(x)), sc=FR_SIS.find(x=>x.id==="sc");
  const novo=(ag.length?`<section class="fz-sec"><div class="fz-sh"><h2>Agentes prontos da Pixel</h2><p>Prontos para usar: você baixa, envia para o seu agente e ele se configura com você.</p></div><div class="pc-g">${ag.map(fzProduto).join("")}</div></section>`:"")+(sc&&bate(sc)?fzCerebro(sc):"");
  h=h.replace(/<section class="fz-sec"><div class="fz-sh"><h2>Sistemas prontos da Pixel<\/h2>[\s\S]*?<\/div><\/section>/,novo);
  h=h.replace('<h2>Por área, no Agent Builder</h2><p>Pontos de partida para criar o agente de uma área. Abra para ver o raio X e use no Agent Builder.</p>','<h2>Templates iniciais, por área</h2><p>Pontos de partida, ainda em construção, para criar o agente de uma área no Agent Builder.</p>');
  h=h.replace(/(<span class="fz-acb"><b>[^<]*<\/b>)/g,'$1<span class="tpl-tag">Template inicial</span>');
  return h; }; })();
