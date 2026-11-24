<script>
/* Revisão de UI (24/11): liga as regras de <style id="ui-rev"> pela classe ui-rev no body. Padrão: revisado. */
(function(){ const sync=()=>document.body.classList.toggle("ui-rev",S.uiRev!=="ant");
  const _R=R; R=function(){ const r=_R.apply(this,arguments); sync(); return r; }; sync();
  const rows=[...document.querySelectorAll(".tz2-s .tz2-row")], ui=rows.find(x=>(x.querySelector(".tz2-l")||{}).textContent==="Interface");
  if(ui){ const row=document.createElement("div"); row.className="tz2-row";
    row.innerHTML='<span class="tz2-l">Sistema visual</span><div class="tz2-seg" role="group" style="--n:2"><button data-act="uiRevModo" data-arg="rev">Revisado (padrão)</button><button data-act="uiRevModo" data-arg="ant">Anterior</button></div><small class="tz2-hint">Revisão de 24/11 no Início, Plano, Trilha, Ferramentas e Mentorias: escala de tipos 30, 24, 20, 16, 14 e 12; espaços em múltiplos de 4; um tipo de cartão; cinza de apoio com contraste AA.</small>';
    ui.after(row); } })();
Object.assign(A,{ uiRevModo:v=>{ S.uiRev=v; R(); aviso(v==="ant"?"Sistema visual anterior, para comparar.":"Sistema visual revisado.","prototipo"); } });
(function(){ const _r=rotularFechar; rotularFechar=function(){ _r(); document.querySelectorAll('[data-act="uiRevModo"]').forEach(b=>b.setAttribute("aria-pressed",String((S.uiRev==="ant"?"ant":"rev")===b.dataset.arg))); }; })();
</script>

<script>
/* Plano revisado: seções 4 a 7 em accordions (pedido da análise de 24/11). Fica aberta a que a pessoa abriu; no começo, Oportunidades. */
(function(){ const _tp=telaPlano; telaPlano=function(){ let h=_tp(); if(S.uiRev==="ant"||!S.entrev) return h;
  const ab=S.plAc===undefined?"4":S.plAc;
  /* só cabeçalhos sem ação extra e corpos sem seção aninhada; o resto fica como está */
  return h.replace(/<section class="pls"><div class="pls-h"><span class="pls-n">([4-7])<\/span><h2>([^<]*)<\/h2><\/div>((?:(?!<section)[\s\S])*?)<\/section>/g,(m,n,t,body)=>{
    const itens=(body.match(/<li/g)||[]).length, on=ab===n, id="pl-acc-"+n;
    return `<section class="pls pl-ac"><div class="pls-h"><span class="pls-n">${n}</span><h2 class="pl-ach"><button class="pl-acb" aria-expanded="${on}" aria-controls="${id}" data-act="plAc" data-arg="${n}">${t}<span class="pl-acr">${itens===1?"1 item":itens+" itens"}</span>${u("chev")}</button></h2></div><div class="pl-acc" id="${id}" ${on?"":"hidden"}>${body}</div></section>`; }); }; })();
Object.assign(A,{ plAc:n=>{ S.plAc=S.plAc===n||(S.plAc===undefined&&n==="4")?"":n; R(); document.querySelector(`[data-act="plAc"][data-arg="${n}"]`)?.focus(); } }); // o R() recria o botão: o foco volta para ele
</script>
