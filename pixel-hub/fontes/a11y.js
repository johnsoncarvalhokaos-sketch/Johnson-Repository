<style>
/* ===================== Acessibilidade: foco e selo (24/11), achados da verificação de hover e foco =====================
   O anel segue o padrão global do produto (:focus-visible, 2 px, var(--brand)). */
.bk2-bq:focus-within, .fr-bq:focus-within{ outline:2px solid var(--brand); outline-offset:2px; }
.bk2-bq input:focus, .fr-bq input:focus{ outline:none; }
.frd-usos button:focus-visible, .frd-usos2 button:focus-visible{ outline:2px solid var(--brand); outline-offset:2px; }
/* selo de notificações: branco no laranja da marca dava 3,1:1; no laranja de status (--brand-ink, o dos selos "Estimativa") dá 5,2:1 */
.pd-bell .bdgn{ background:var(--brand-ink); font-size:12px !important; font-weight:600; }
</style>
<script>
/* tabs com tabindex móvel: as setas, Home e End levam à tab vizinha e a ativam (antes, só a tab aberta era alcançável pelo teclado) */
document.addEventListener("keydown",e=>{ const t=e.target; if(!t||t.getAttribute&&t.getAttribute("role")!=="tab") return;
  if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key)) return;
  const tabs=[...(t.closest('[role="tablist"]')||t.parentElement).querySelectorAll('[role="tab"]')], i=tabs.indexOf(t); if(i<0) return;
  const j=e.key==="Home"?0:e.key==="End"?tabs.length-1:(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
  e.preventDefault(); const alvo=tabs[j], sel='[role="tab"][data-act="'+alvo.dataset.act+'"][data-arg="'+(alvo.dataset.arg||"")+'"]';
  alvo.click(); requestAnimationFrame(()=>document.querySelector(sel)?.focus()); });
</script>
