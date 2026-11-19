/* templates iniciais por área com o Pixel de cada agente (08/11). Referências do Mobbin: Gumloop (cartão de agente com avatar saindo do topo,
   nome, uma linha de descrição e as ferramentas embaixo) e Wix (o personagem do agente em destaque, com o papel logo abaixo do nome). */
const TPL_PX={vendas:"vendas",marketing:"marketing",atendimento:"compras",financeiro:"financeiro",operacoes:"operacao",rh:"rh",dados:"gestao",gestao:"gestao",cos:"extensao",orq:"extensao",geral:"extensao"};
const TPL_PAPEL={vendas:"Agente de Vendas",marketing:"Agente de Marketing",atendimento:"Agente de Atendimento",financeiro:"Agente Financeiro",operacoes:"Agente de Operações",rh:"Agente de RH",dados:"Agente de Dados",gestao:"Agente de Gestão",cos:"Agente da liderança",orq:"Agente orquestrador",geral:"Agente geral"};
function tplCard(x){ const c=TPL_PX[x.id]||"extensao", cor=PX_COR[c]||PX_COR.extensao; const nome=x.nome||("Pixel "+x.t); const nResp=(x.resp||[]).length;
  return `<button class="tp" data-act="frAbrir" data-arg="${x.id}" style="--tp-c:${cor}"><span class="tp-top"><span class="tp-px">${px(c,46)}</span><span class="tpl-tag">Template inicial</span></span>
    <span class="tp-b"><small>${esc(TPL_PAPEL[x.id]||"Agente")}</small><b>${esc(nome)}</b><span class="tp-d">${esc(x.d)}</span></span>
    <span class="tp-f"><span class="tp-m">${nResp?`${nResp} responsabilidades prontas`:"Raio X em construção"}</span><span class="tp-go">Ver detalhes${u("arrow")}</span></span></button>`; }
(function(){ const _l=frListaNova; frListaNova=function(){ let h=_l(); const st=frS(); if((st.vista||"templates")!=="templates") return h;
  const q=(st.q||"").toLowerCase().trim(); const ar=FR_AREA.filter(x=>!q||(x.t+" "+x.d+" "+(x.nome||"")).toLowerCase().includes(q)); if(!ar.length) return h;
  return h.replace(/<div class="fz-grid">[\s\S]*?<\/div><\/section>/,`<div class="tp-g">${ar.map(tplCard).join("")}</div></section>`); }; })();
(function(){ try{ R(); }catch(e){} })();
