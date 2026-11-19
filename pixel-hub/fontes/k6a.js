/* ===================== Kanban, reunião Pixel <> :Zero de 06/11 (cartões c23 a c37), parte 1: vocabulário, cores e ícones =====================
   c29: "fase" no lugar de "bloco" em todo o produto (a trilha continua "Trilha"). c34: "Base de conhecimento" vira "Conteúdo complementar".
   A troca é feita no texto que a pessoa lê, depois de cada pintura; o drawer e a página dos templates ficam de fora,
   porque os "Blocos" do Marketing OS são partes do kit, não da jornada. */
const VOC_TROCAS=[
  [/\bBase de [Cc]onhecimento\b/g,"Conteúdo complementar"],[/\bna Conteúdo complementar\b/g,"no Conteúdo complementar"],[/\bda Conteúdo complementar\b/g,"do Conteúdo complementar"],[/\b([Aa]) Conteúdo complementar\b/g,(m,a)=>(a==="A"?"O":"o")+" Conteúdo complementar"],
  [/\bBlocos\b/g,"Fases"],[/\bblocos\b/g,"fases"],[/\bBloco\b/g,"Fase"],[/\bbloco\b/g,"fase"],
  [/\b([Dd])o fase\b/g,"$1a fase"],[/\b([Nn])o fase\b/g,"$1a fase"],[/\b([Oo]) fase\b/g,(m,o)=>(o==="O"?"A":"a")+" fase"],[/\b([Aa])o fase\b/g,(m,a)=>(a==="A"?"À":"à")+" fase"],
  [/\b([Pp])elo fase\b/g,"$1ela fase"],[/\b([Dd])este fase\b/g,"$1esta fase"],[/\b([Ee])ste fase\b/g,"$1sta fase"],[/\b([Ss])eu fase\b/g,"$1ua fase"],[/\b([Pp])róximo fase\b/g,"$1róxima fase"],[/\b([Pp])rimeiro fase\b/g,"$1rimeira fase"],
  [/\b([Oo])s (\d+ )?fases\b/g,(m,o,n)=>(o==="O"?"As":"as")+" "+(n||"")+"fases"],[/\b([Dd])os (\d+ )?fases\b/g,"$1as $2fases"],[/\b([Nn])os (\d+ )?fases\b/g,"$1as $2fases"],
  [/\b(Fase \d+|fase) concluído\b/g,"$1 concluída"],[/\b(Fase \d+|fase) liberado\b/g,"$1 liberada"]];
function vocTexto(t){ let x=t; VOC_TROCAS.forEach(([re,rp])=>{ x=x.replace(re,rp); }); return x; }
function vocAplicar(root){ if(!root) return; const pular=n=>n.parentElement&&n.parentElement.closest(".frd, .frd-pg, .fr-cr, .pc, script, style, textarea, input, [contenteditable]");
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); const nos=[]; let n; while(n=tw.nextNode()){ if(/[Bb]loco|Base de [Cc]onhecimento/.test(n.nodeValue)&&!pular(n)) nos.push(n); }
  nos.forEach(n=>{ const v=vocTexto(n.nodeValue); if(v!==n.nodeValue) n.nodeValue=v; });
  root.querySelectorAll("[title],[aria-label],[placeholder]").forEach(e=>{ if(e.closest(".frd, .frd-pg")) return; ["title","aria-label","placeholder"].forEach(a=>{ const v=e.getAttribute(a); if(v&&/[Bb]loco|Base de [Cc]onhecimento/.test(v)) e.setAttribute(a,vocTexto(v)); }); }); }
(function(){ const _r=rotularFechar; rotularFechar=function(){ _r(); try{ vocAplicar(document.body); }catch(e){ console.error(e); } }; })();
(function(){ const _av=aviso; aviso=function(t,...r){ return _av(typeof t==="string"?vocTexto(t):t,...r); }; })();
/* c30: ícone de skill neutro (arquivo com chave), no lugar das estrelinhas de "IA"; a cor vem da área, numa etiqueta */
/* c30: ícone trocado na definição original de FR_IC */
const AREA_COR={"Vendas e comercial":"var(--c-ven)","Marketing e conteúdo":"var(--c-mkt)","Atendimento ao cliente":"var(--c-com)","Gestão, RH e rotina":"var(--c-rh)","Processos internos e relatórios":"var(--c-ges)","Financeiro e cobrança":"var(--c-fin)","Operações e entrega":"var(--c-ope)","Kit global":"#6B6F80"};
function areaTag(a){ return `<span class="atag"><i style="background:${AREA_COR[a]||"#6B6F80"}"></i>${esc(a)}</span>`; }
