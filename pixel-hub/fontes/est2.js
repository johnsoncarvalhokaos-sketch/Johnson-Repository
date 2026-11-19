/* versão da Home com o estágio da transformação (04/11, proposta para o Cayo; fora do documento).
   Antes da entrevista: sem semáforo; o cartão da entrevista avisa que dela sai o estágio.
   Depois: uma linha compacta abaixo do título com o semáforo, o estágio, o gargalo e "Abrir o Plano". Ajustes: "Estágio na Home". */
function homeEstagio(){ const c=v4Compute(); const n=V4_STAGES.length;
  return `<section class="hst" aria-label="Seu estágio na transformação"><div class="hst-sem" role="img" aria-label="Estágio ${c.si+1} de ${n}">${V4_STAGES.map((x,i)=>`<i class="${i<c.si?"p":i===c.si?"n":""}" title="${esc(x)}"></i>`).join("")}</div>
    <p class="hst-t"><b>Estágio ${c.si+1} de ${n}: ${esc(c.stage)}</b><span>Gargalo: ${esc(c.gargalo.toLowerCase())}</span></p><button class="lnk hst-l" data-act="irPlano">Abrir o Plano${u("chev")}</button></section>`; }
(function(){ const _ti=telaInicio; telaInicio=function(){ let h=_ti(); if(!S.hEst) return h;
  if(!S.entrev) return h.replace('É nela que eu monto o seu Plano Agêntico.','Dela saem o seu Plano Agêntico e o seu estágio na transformação.');
  return h.replace(/(<div class="phd"><h1 id="focus-h" tabindex="-1">[^<]*<\/h1><\/div>)/,'$1'+homeEstagio()); }; })();
Object.assign(A,{ hEstModo:m=>{ S.hEst=m==="com"; R(); } });
(function(){ const _r=rotularFechar; rotularFechar=function(){ _r(); document.querySelectorAll('[data-act="hEstModo"]').forEach(b=>b.setAttribute("aria-pressed",String((S.hEst?"com":"sem")===b.dataset.arg))); }; })();
