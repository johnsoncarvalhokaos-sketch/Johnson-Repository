<script>
/* Revisão de UI (24/11): liga as regras de <style id="ui-rev"> pela classe ui-rev no body. Padrão: revisado. */
(function(){ const sync=()=>document.body.classList.toggle("ui-rev",S.uiRev!=="ant");
  const _R=R; R=function(){ const r=_R.apply(this,arguments); sync(); return r; }; sync();
  const rows=[...document.querySelectorAll(".tz2-s .tz2-row")], ui=rows.find(x=>(x.querySelector(".tz2-l")||{}).textContent==="Interface");
  if(ui){ const row=document.createElement("div"); row.className="tz2-row";
    row.innerHTML='<span class="tz2-l">Sistema visual</span><div class="tz2-seg" role="group" style="--n:2"><button data-act="uiRevModo" data-arg="rev">Revisado (padrão)</button><button data-act="uiRevModo" data-arg="ant">Anterior</button></div><small class="tz2-hint">Revisão de 24/11 no Início e no Plano: escala de tipos 30, 24, 20, 16, 14 e 12; espaços em múltiplos de 4; um tipo de cartão.</small>';
    ui.after(row); } })();
Object.assign(A,{ uiRevModo:v=>{ S.uiRev=v; R(); aviso(v==="ant"?"Sistema visual anterior, para comparar.":"Sistema visual revisado.","prototipo"); } });
(function(){ const _r=rotularFechar; rotularFechar=function(){ _r(); document.querySelectorAll('[data-act="uiRevModo"]').forEach(b=>b.setAttribute("aria-pressed",String((S.uiRev==="ant"?"ant":"rev")===b.dataset.arg))); }; })();
</script>
