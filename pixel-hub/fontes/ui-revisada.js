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

<script>
/* Plano revisado: seções 4 a 7 em accordions (pedido da análise de 24/11). Fica aberta a que a pessoa abriu; no começo, Oportunidades. */
(function(){ const _tp=telaPlano; telaPlano=function(){ let h=_tp(); if(S.uiRev==="ant"||!S.entrev) return h;
  const ab=S.plAc===undefined?"4":S.plAc;
  return h.replace(/<section class="pls"><div class="pls-h"><span class="pls-n">([4-7])<\/span><h2>([^<]*)<\/h2>(?:[\s\S]*?)<\/div>([\s\S]*?)<\/section>/g,(m,n,t,body)=>{
    const itens=(body.match(/<li/g)||[]).length, on=ab===n, id="pl-acc-"+n;
    return `<section class="pls pl-ac"><div class="pls-h"><button class="pl-acb" aria-expanded="${on}" aria-controls="${id}" data-act="plAc" data-arg="${n}"><span class="pls-n">${n}</span><h2>${t}</h2><span class="pl-acr">${itens===1?"1 item":itens+" itens"}</span>${u("chev")}</button></div><div class="pl-acc" id="${id}" ${on?"":"hidden"}>${body}</div></section>`; }); }; })();
Object.assign(A,{ plAc:n=>{ S.plAc=S.plAc===n||(S.plAc===undefined&&n==="4")?"":n; R(); } });
</script>
