<style>
/* ===================== Plano: horas e dinheiro "na mesa" (c43, parte em R$), 24/11 =====================
   O valor em reais sai das horas de volta que o Plano já mostra × o custo da hora que a pessoa informa.
   Sem esse custo, o Plano não mostra valor nenhum: pede o dado. Nada é estimado por nós. */
.pl-rs{ display:flex; flex-direction:column; gap:4px; padding-top:16px; margin-top:4px; border-top:1px solid var(--line); }
.pl-rs > span, .pl-rs label{ font-size:14px; line-height:1.45; color:var(--muted); }
.pl-rs label{ color:var(--ink-2); font-weight:500; }
.pl-rs > b{ font-family:var(--f-d); font-size:24px; font-weight:600; line-height:1.2; letter-spacing:-.02em; }
.pl-rs small{ font-size:14px; line-height:1.45; color:var(--muted); }
.pl-rs small .lnk{ font-size:14px; padding:0; margin-left:4px; }
.pl-rsf{ display:flex; align-items:center; gap:8px; margin-top:4px; }
.pl-rsf .pl-rsi{ position:relative; flex:0 1 160px; }
.pl-rsf .pl-rsi span{ position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:14px; color:var(--muted); pointer-events:none; }
.pl-rsf .inp{ margin:0; height:40px; padding-left:36px; font-size:16px; }
</style>
<script>
const plBRL=n=>"R$ "+Math.round(n).toLocaleString("pt-BR");
(function(){ const _tp=telaPlano; telaPlano=function(){ let h=_tp();
  const i=h.indexOf('<div class="pl-res">'); if(i<0) return h; const j=h.indexOf("</div>",i); if(j<0) return h;
  const m=h.slice(i,j).match(/<b>(\d+)–(\d+) h por mês<\/b>/); if(!m) return h;
  const lo=+m[1], hi=+m[2], c=S.custoH;
  const bloco=c&&!S.custoEd
    ? `<div class="pl-rs"><span>Em reais</span><b>${plBRL(lo*c)}–${plBRL(hi*c).replace("R$ ","")} por mês</b><small>Com a hora a ${plBRL(c)}, o valor que você informou.<button class="lnk" data-act="plCustoEd">Alterar</button></small></div>`
    : `<div class="pl-rs"><label for="pl-custo">Para ver em reais: quanto custa uma hora de trabalho do time?</label><div class="pl-rsf"><span class="pl-rsi"><span aria-hidden="true">R$</span><input class="inp" id="pl-custo" inputmode="decimal" autocomplete="off" placeholder="Ex.: 80" value="${c||""}" aria-describedby="pl-custo-d"></span><button class="btn btn-g btn-sm" data-act="plCusto">Calcular</button></div><small id="pl-custo-d">Salário e encargos divididos pelas horas trabalhadas no mês. O cálculo: horas de volta × custo da hora.</small></div>`;
  return h.slice(0,j+6)+bloco+h.slice(j+6); }; })();
Object.assign(A,{
  plCusto:()=>{ const el=document.getElementById("pl-custo"); const n=parseFloat(String(el&&el.value||"").replace(/[^\d,.]/g,"").replace(/\.(?=\d{3}\b)/g,"").replace(",","."));
    if(!(n>0)){ el&&el.focus(); aviso("Informe o custo de uma hora, em reais."); return; } S.custoH=Math.round(n*100)/100; S.custoEd=false; R(); },
  plCustoEd:()=>{ S.custoEd=true; R(); requestAnimationFrame(()=>document.getElementById("pl-custo")?.focus()); } });
document.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target&&e.target.id==="pl-custo"){ e.preventDefault(); A.plCusto(); } });
</script>
