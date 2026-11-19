/* ===================== Home completa do documento "Hub, próxima versão" (04/11) =====================
   Ordem: próximo passo (entrevista, depois travas) · Agende seu onboarding (dono e Founder) · Hands-on da fase · Trilha ·
   Seus agentes · Para rever como a Pixel funciona · Consultor. Trava do "Novo agente" até a Fase 1 terminar.
   Referências do Mobbin: Xero (faixa "Book a free call" no topo, dispensável), Buffer e Shopify (primeiros passos com estado),
   Base44 ("Unlock this feature": janela pequena com ícone, uma frase e uma ação). */
const LOCK_IC='<svg class="u" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>';
const CAL_IC='<svg class="u" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5"/><path d="M8 3.5v4M16 3.5v4M4 10h16"/></svg>';
function abTravado(){ return !S.bloco1 && !S.agExtra; }
function homeOnb(){ if(S.onbOk||S.profile==="membro") return "";
  return `<section class="hob" aria-labelledby="hob-t"><span class="hob-ic">${CAL_IC}</span><div class="hob-b"><b id="hob-t">Agende o seu onboarding</b><p>Uma conversa com o time Pixel para começar a jornada pelo caminho certo.</p></div><div class="hob-a"><button class="btn btn-g btn-sm" data-act="onbAgendar">Agendar</button><button class="btn btn-q btn-sm" data-act="onbJa">Já agendei</button></div></section>`; }
function homeVideo(){ return `<section class="hvd" aria-labelledby="hvd-t"><div class="sec-h"><h2 id="hvd-t">Para rever como a Pixel funciona</h2></div>
  <button class="hvd-c" data-act="hvdPlay"><span class="hvd-th"><span class="hvd-pl">${u("play")}</span></span><span class="hvd-tx"><small>Vídeo do Bruno</small><b>Como a Pixel funciona</b><span>Para rever quando quiser, sozinho ou com o time.</span></span></button></section>`; }
function travaModal(){ return `<div class="trv-ov" data-act="travaFechar"></div><div class="trv" role="dialog" aria-modal="true" aria-labelledby="trv-t"><span class="trv-ic">${LOCK_IC}</span><h2 id="trv-t">O Agent Builder libera com a Fase 1</h2><p>O seu primeiro agente nasce pela Trilha, na etapa 1. Quando a Fase 1 terminar, você cria os próximos agentes por aqui.</p><div class="trv-a"><button class="btn btn-p" data-act="travaTrilha">Ir para a etapa 1${u("arrow")}</button><button class="btn btn-q" data-act="travaFechar">Agora não</button></div></div>`; }
/* Trilha: fase, etapa, progresso e "Continuar a trilha"; sem aulas e mentoria dentro do cartão */
(function(){ const _c=cardEtapa; cardEtapa=function(T){ let h=_c(T); if(!h) return h;
  h=h.replace(/Agora na Trilha: bloco (\d+), etapa/,"Agora na Trilha: Fase $1, etapa").replace(">Continuar a etapa<",">Continuar a trilha<");
  h=h.replace(/<div class="ce-ap3">[\s\S]*<\/div>\s*<\/section>$/,"</section>"); return h; }; })();
(function(){ const _ti=telaInicio; telaInicio=function(){ let h=_ti();
  h=h.replace('<button class="btn btn-p" data-act="irTrilha">Continuar a trilha','<button class="btn btn-g" data-act="irTrilha">Continuar a trilha');
  h=h.replace(/<h1 id="focus-h" tabindex="-1">[^<]*<\/h1><p>[^<]*<\/p>/,'<h1 id="focus-h" tabindex="-1">O que importa hoje, num lugar só</h1>');
  const k=h.indexOf('<section class="ho"'); if(k>=0) h=h.slice(0,k)+homeOnb()+h.slice(k);
  h=h.replace(/<div class="hgrid">[\s\S]*?<div class="sec-h"><h2>Seus agentes<\/h2>/,'<div class="sec-h"><h2>Seus agentes</h2>');
  if(abTravado()){
    h=h.replace('<small>O Agent Builder monta o primeiro em oito passos, a partir do seu diagnóstico.</small></div><button class="btn btn-g btn-sm" data-act="abrirAB">Abrir o Agent Builder</button>','<small>O seu primeiro agente nasce pela etapa 1 da Trilha. O Agent Builder do menu libera quando a Fase 1 terminar.</small></div><button class="btn btn-q btn-sm" data-act="irTrilha">Ir para a etapa 1</button>');
    h=h.replace('<button class="addb" data-act="abrirAB">','<button class="addb bloq" data-act="travaAB" aria-label="Novo agente, libera quando a Fase 1 terminar">'+LOCK_IC);
  }
  const m=h.indexOf('</div></div></div></main>'); if(m>=0) h=h.slice(0,m)+homeVideo()+h.slice(m);
  return h; }; })();
(function(){ const _l=lateral; lateral=function(){ let h=_l(); if(!abTravado()) return h;
  return h.replace('<button class="agsel" data-act="abrirAB" data-arg="agentes" title="Novo agente">','<button class="agsel bloq" data-act="travaAB" title="Novo agente: libera quando a Fase 1 terminar">').replace('<span class="nm nl">Novo agente</span>','<span class="nm nl">Novo agente</span><span class="agsel-lk nl">'+LOCK_IC+'</span>'); }; })();
(function(){ const _vw=view; view=function(){ const h=_vw(); return S.travaAB?h+travaModal():h; }; })();
Object.assign(A,{
  travaAB:()=>{ S.sideOpen=false; S.travaAB=true; R(); requestAnimationFrame(()=>document.querySelector('.trv [data-act="travaTrilha"]')?.focus()); },
  travaFechar:()=>{ S.travaAB=false; R(); },
  travaTrilha:()=>{ S.travaAB=false; A.irTrilha(); },
  onbAgendar:()=>{ S.onbOk=true; R(); aviso("Abre a agenda do time Pixel (Calendly) para marcar o onboarding. No protótipo, fica só o aviso.","prototipo"); },
  onbJa:()=>{ S.onbOk=true; R(); aviso("Combinado. O aviso do onboarding sai da Home.","prototipo"); },
  hvdPlay:()=>aviso("Abre o vídeo do Bruno. No protótipo, o vídeo ainda não está disponível.","prototipo")
});
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&S.travaAB){ S.travaAB=false; R(); } });
