<style>
/* ===================== Plano Agêntico, versão 2 (26/11) =====================
   Referências (Design Sense): Teal (objetivo como título com propriedades em linha; progresso e tarefas lado a lado), Snowflake
   "Get your agent ready" (o próximo passo é o próprio bloco de progresso), Airtasker (nível numa régua de uma cor, com o que muda
   no próximo nível). Junta o c44: "Por onde começar" ordena os processos por área e o 1º define o primeiro agente e a Trilha.
   A versão anterior fica nos Ajustes do protótipo › Versões em teste › Plano: Novo | Anterior. */
.pl-v2 .p2-h{ display:flex; flex-direction:column; gap:16px; }
.pl-v2 .p2-h h1{ margin:0; font-family:var(--f-d); font-size:var(--t-page,30px); font-weight:600; line-height:1.15; letter-spacing:-.02em; }
.pl-v2 .p2-props{ display:flex; flex-wrap:wrap; gap:16px 40px; margin:0; }
.pl-v2 .p2-props > div{ display:flex; flex-direction:column; gap:4px; min-width:0; }
.pl-v2 .p2-props dt{ font-size:14px; font-weight:500; line-height:1.45; color:var(--muted); }
.pl-v2 .p2-props dd{ margin:0; display:flex; flex-wrap:wrap; align-items:center; gap:8px; font-family:var(--f-d); font-size:20px; font-weight:600; line-height:1.3; color:var(--ink); }
.pl-v2 .p2-props dd .lnk{ font-family:var(--f-s,inherit); font-size:14px; font-weight:500; padding:0; }
.pl-v2 .p2-props dd .pill{ font-family:var(--f-s,inherit); }
.pl-v2 .p2-custo{ display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
.pl-v2 .p2-custo .pl-rsi{ position:relative; flex:0 1 160px; }
.pl-v2 .p2-custo .pl-rsi span{ position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:14px; color:var(--muted); pointer-events:none; }
.pl-v2 .p2-custo .inp{ margin:0; height:40px; padding-left:36px; font-size:16px; border-radius:12px; }
.pl-v2 .p2-custo small{ flex-basis:100%; font-size:14px; color:var(--muted); }
.pl-v2 .pl-tabs + .p2-reg{ margin-top:24px; }
.pl-v2 .p2-reg ol{ display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:8px; margin:0; padding:0; list-style:none; }
.pl-v2 .p2-reg li{ display:flex; flex-direction:column; gap:8px; font-size:12px; font-weight:500; line-height:1.4; color:var(--muted); }
.pl-v2 .p2-reg li::before{ content:""; height:6px; border-radius:3px; background:var(--line); }
.pl-v2 .p2-reg li.ok::before{ background:var(--ink); }
.pl-v2 .p2-reg li.at::before{ background:var(--agora,#1F4FCC); }
.pl-v2 .p2-reg li.at{ color:var(--ink); font-weight:600; }
/* semáforo de volta (26/11, pedido do Johnson): as mesmas cores do medidor anterior; estágios passados e o atual cheios,
   os próximos a 22%; o atual com o contorno em tinta */
.pl-v2 .p2-reg li:nth-child(1)::before{ background:#F04438; } .pl-v2 .p2-reg li:nth-child(2)::before{ background:#F79009; }
.pl-v2 .p2-reg li:nth-child(3)::before{ background:#EAAA08; } .pl-v2 .p2-reg li:nth-child(4)::before{ background:#66C61C; }
.pl-v2 .p2-reg li:nth-child(5)::before{ background:#12875A; }
.pl-v2 .p2-reg li:not(.ok):not(.at)::before{ opacity:.22; }
.pl-v2 .p2-reg li.at::before{ box-shadow:0 0 0 2px #fff, 0 0 0 3.5px var(--ink); }
.pl-v2 .p2-reg p{ margin:12px 0 0; font-size:14px; line-height:1.45; color:var(--ink-2); }
.pl-v2 .p2-reg p b{ font-weight:600; color:var(--ink); }
.pl-v2 .p2-ini{ display:flex; flex-direction:column; gap:16px; padding:24px; border-radius:20px; background:#fff; box-shadow:0 0 0 1px var(--line); }
.pl-v2 .p2-ini-h{ display:flex; flex-wrap:wrap; align-items:center; gap:8px 16px; }
.pl-v2 .p2-ini-h h2{ margin:0; font-family:var(--f-d); font-size:20px; font-weight:600; line-height:1.3; }
.pl-v2 .p2-ini-h .p2-ac{ margin-left:auto; display:flex; align-items:center; gap:12px; }
.pl-v2 .p2-agora{ margin:0; padding:12px 16px; border-radius:12px; background:var(--soft); font-size:14px; line-height:1.45; color:var(--ink-2); }
.pl-v2 .p2-agora b{ color:var(--ink); font-weight:600; }
.pl-v2 .p2-ar h3{ display:flex; justify-content:space-between; gap:12px; margin:0 0 4px; font-size:14px; font-weight:600; line-height:1.45; color:var(--ink); }
.pl-v2 .p2-ar h3 span{ font-weight:400; color:var(--muted); }
.pl-v2 .p2-ar ol{ margin:0; padding:0; list-style:none; }
.pl-v2 .p2-it{ display:grid; grid-template-columns:28px minmax(0,1fr) auto; gap:12px; align-items:center; padding:12px 0; border-top:1px solid var(--line); }
.pl-v2 .p2-ar ol .p2-it:first-child{ border-top:0; }
.pl-v2 .p2-n{ display:grid; place-items:center; width:28px; height:28px; border-radius:999px; background:var(--sunken); font-size:14px; font-weight:600; color:var(--ink-2); }
.pl-v2 .p2-it.um .p2-n{ background:var(--ink); color:#fff; }
.pl-v2 .p2-t{ display:flex; flex-direction:column; gap:2px; min-width:0; }
.pl-v2 .p2-t b{ font-size:16px; font-weight:500; line-height:1.4; color:var(--ink); }
.pl-v2 .p2-t em{ font-style:normal; font-size:14px; line-height:1.45; color:var(--muted); }
.pl-v2 .p2-a{ display:flex; align-items:center; gap:4px; }
.pl-v2 .p2-a .ibtn{ width:32px; height:32px; }
.pl-v2 .p2-a .ibtn .u{ width:16px; height:16px; }
.pl-v2 .p2-a .p2-up .u{ transform:rotate(180deg); }
.pl-v2 .p2-a .ibtn:disabled{ opacity:.3; cursor:default; }
.pl-v2 .p2-nota{ margin:0; font-size:14px; color:var(--muted); }
.pl-v2 .p2-det{ display:flex; flex-direction:column; gap:12px; }
.pl-v2 .p2-sr{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
.pl-v2 .pl-l li .pl-dot.pr ~ span em{ display:inline-flex !important; margin-left:8px; padding:2px 8px; border-radius:999px; background:var(--agora-bg,#E8EFFF); color:var(--agora,#1F4FCC); font-size:12px; font-weight:500; font-style:normal; vertical-align:2px; }
.pl-v2 > * + *{ margin-top:32px; }
@media (max-width:640px){ .pl-v2 .p2-h h1{ font-size:24px; }
  .pl-v2 .p2-props{ gap:12px 24px; }
  .pl-v2 .p2-reg ol{ gap:4px; } .pl-v2 .p2-reg li{ font-size:12px; }
  .pl-v2 .p2-reg li span{ display:none; } .pl-v2 .p2-reg li.at span{ display:block; }
  .pl-v2 .p2-ini{ padding:16px; }
  .pl-v2 .p2-ini-h .p2-ac{ margin-left:0; width:100%; justify-content:space-between; }
  .pl-v2 .p2-it{ grid-template-columns:28px minmax(0,1fr); }
  .pl-v2 .p2-a{ grid-column:2; }
}
</style>
<script>
const PL2_KEY=n=>Object.keys(V4_CAT).find(k=>V4_CAT[k].areaN===n)||null;
function pl2On(){ return S.plV!=="ant"; }
/* itens: processos da entrevista (cada um absorve uma oportunidade da sua área, na ordem do catálogo) e as oportunidades que sobram */
function pl2Itens(c0){ const a=plEnt(), ps=a?entProcs(a):[], porA={};
  const base=c0.cat&&c0.cat.area||"relatorios";
  ps.forEach((p,i)=>{ const k=(i===0&&a.procArea&&V4_CAT[a.procArea])?a.procArea:(PL2_KEY(p.area)||v4AreaFromText(String(p.nome))||base); (porA[k]=porA[k]||[]).push(Object.assign({i},p)); });
  const ordemAreas=[...new Set([...Object.keys(porA),base,...(c0.areas||[]).filter(k=>V4_CAT[k]),...(c0.outras||[]).map(o=>o.cat).filter(k=>V4_CAT[k])])];
  const itens=[]; ordemAreas.forEach(k=>{ const cat=V4_CAT[k]; if(!cat) return; const opps=cat.opps||[], pr=porA[k]||[];
    const dec=pr.map((p,j)=>{ const opp=opps[j]||opps[0], r=opp.red||[.3,.5], h=p.h||0; return {id:"p"+p.i,k,titulo:p.nome,origem:"dec",opp,h,lo:h?Math.max(1,Math.round(h*r[0])):0,hi:h?Math.max(1,Math.round(h*r[1])):0}; });
    const rec=opps.slice(pr.length,pr.length+(pr.length?1:2)).map(o=>({id:o.id,k,titulo:o.t,origem:"rec",opp:o,h:0,lo:0,hi:0}));
    itens.push(...dec.sort((x,y)=>y.hi-x.hi),...rec); });
  /* áreas pela soma das horas de volta; sem horas, a ordem acima */
  const soma=k=>itens.filter(x=>x.k===k).reduce((s,x)=>s+x.hi,0);
  const areas=[...new Set(itens.map(x=>x.k))].map((k,i)=>[k,i]).sort((x,y)=>soma(y[0])-soma(x[0])||x[1]-y[1]).map(x=>x[0]);
  return areas.flatMap(k=>itens.filter(x=>x.k===k)); }
function pl2Ordem(c0){ const sug=pl2Itens(c0), ids=sug.map(x=>x.id);
  if(Array.isArray(S.prio)&&S.prio.length===ids.length&&S.prio.every(id=>ids.includes(id))) return {itens:S.prio.map(id=>sug.find(x=>x.id===id)),sug,meu:S.prio.join()!==ids.join()};
  return {itens:sug,sug,meu:false}; }
/* o 1º define a área principal e a oportunidade principal; daí seguem o agente recomendado, a "Prioritária", o resultado e a Trilha */
let pl2V4=null;
(function(){ const _v=v4Compute; pl2V4=_v; v4Compute=function(){ const c=_v.apply(this,arguments); if(!pl2On()||S.abFeito) return c;
  try{ const it=pl2Ordem(c).itens[0]; if(!it||!V4_CAT[it.k]) return c;
    return Object.assign({},c,{mainArea:it.k,cat:V4_CAT[it.k],prim:Object.assign({},it.opp,{cat:it.k,relato:it.origem==="dec"?it.titulo:(c.prim&&c.prim.relato)||""})}); }catch(e){ return c; } }; })();
function pl2Sec(h,titulo){ const t=h.indexOf(">"+titulo); if(t<0) return ""; const a=h.lastIndexOf('<section class="pls',t); if(a<0) return ""; const b=h.indexOf("</section>",t); return b<0?"":h.slice(a,b+10); }
function pl2Tela(h){ const c=v4Compute(), c0=pl2V4(), g=v4Gains(c), T=trilhaInfo(), mem=S.profile==="membro";
  const {itens,meu}=pl2Ordem(c0), um=itens[0], esc=window.esc||(x=>x);
  const res=um&&um.origem==="dec"&&um.hi?[um.lo,um.hi]:[g.lo,g.hi];
  const reais=S.custoH&&!S.custoEd?`${plBRL(res[0]*S.custoH)}–${plBRL(res[1]*S.custoH).replace("R$ ","")}<button class="lnk" data-act="plCustoEd">Alterar</button>`:`<button class="lnk" data-act="plCustoEd">Calcular em reais</button>`;
  const custo=S.custoEd?`<div class="p2-custo"><label class="p2-sr" for="pl-custo">Quanto custa uma hora de trabalho do time?</label><span class="pl-rsi"><span aria-hidden="true">R$</span><input class="inp" id="pl-custo" inputmode="decimal" autocomplete="off" placeholder="Ex.: 80" value="${S.custoH||""}" aria-describedby="pl-custo-d"></span><button class="btn btn-g btn-sm" data-act="plCusto">Calcular</button><small id="pl-custo-d">Quanto custa uma hora de trabalho do time: salário e encargos divididos pelas horas trabalhadas no mês.</small></div>`:"";
  const tabs=(h.match(/<div class="tabs ap-tabs pl-tabs"[\s\S]*?<\/div>/)||[""])[0];
  const prox=T.passos.find(x=>!x[1]);
  const reg=`<section class="p2-reg" aria-label="Estágio da transformação"><ol>${V4_STAGES.map((s,k)=>`<li class="${k<c.si?"ok":k===c.si?"at":""}"${k===c.si?' aria-current="step"':""}><span>${esc(s)}</span></li>`).join("")}</ol>${c.si<4?`<p>No próximo estágio, <b>${esc(V4_STAGES[c.si+1])}</b>: ${esc(V4_STAGE_D[c.si+1])}</p>`:""}</section>`;
  /* Por onde começar */
  const areas=[...new Set(itens.map(x=>x.k))];
  const ap=a=>itens.filter(x=>x.k===a);
  const motivo=x=>[x.origem==="dec"?"Da sua entrevista":"Sugerido pelo Consultor para a área",x.origem==="dec"&&x.opp?"agente sugerido: "+x.opp.t:"",x.hi?`${x.lo}–${x.hi} h de volta por mês`:"",x.hi&&S.custoH?`${plBRL(x.lo*S.custoH)}–${plBRL(x.hi*S.custoH).replace("R$ ","")}`:""].filter(Boolean).join(" · ");
  const lis=a=>ap(a).map((x,j,arr)=>{ const g1=itens[0]===x, n=itens.indexOf(x)+1;
    const acoes=mem?"":`${g1?pill(S.abFeito?"Próximo agente":"Atacar primeiro","blue"):`<button class="btn btn-g btn-sm" data-act="p2Primeiro" data-arg="${x.id}">Atacar primeiro</button>`}<button class="ibtn p2-up" data-act="p2Sobe" data-arg="${x.id}" aria-label="Subir ${esc(x.titulo)}" ${j===0?"disabled":""}>${u("down")}</button><button class="ibtn" data-act="p2Desce" data-arg="${x.id}" aria-label="Descer ${esc(x.titulo)}" ${j===arr.length-1?"disabled":""}>${u("down")}</button>`;
    return `<li class="p2-it${g1?" um":""}"><span class="p2-n" aria-hidden="true">${n}</span><span class="p2-t"><b>${esc(x.titulo)}</b><em>${esc(motivo(x))}</em></span><span class="p2-a">${mem&&g1?pill("Atacar primeiro","blue"):acoes}</span></li>`; }).join("");
  const grupos=areas.map(a=>{ const hoje=ap(a).reduce((s,x)=>s+(x.h||0),0); return `<div class="p2-ar"><h3>${esc(V4_CAT[a].areaN)}<span>${hoje?`≈ ${hoje} h por mês hoje`:""}</span></h3><ol>${lis(a)}</ol></div>`; }).join("");
  const ini=`<section class="p2-ini" aria-labelledby="p2-ini-t"><div class="p2-ini-h"><h2 id="p2-ini-t">Por onde começar</h2>${meu?pill("Ordem sua","idle"):pill("Sugestão do Consultor","idle")}<div class="p2-ac">${meu&&!mem?`<button class="lnk" data-act="p2Sugestao">Voltar à sugestão</button>`:""}<button class="btn btn-p btn-sm" data-act="irTrilha">Ir para a Trilha${u("arrow")}</button></div></div>
    ${prox?`<p class="p2-agora">Agora na Trilha: <b>${esc(prox[0])}</b>${um?`, com ${esc(um.titulo)}`:""}.</p>`:""}
    ${mem?`<p class="p2-nota">Ordem definida pelo Admin.</p>`:""}${S.abFeito&&!mem?`<p class="p2-nota">O seu primeiro agente já está criado; o 1º desta lista fica para o próximo agente.</p>`:""}
    ${grupos}<p class="p2-sr" aria-live="polite" id="p2-live">${esc(S.p2Live||"")}</p></section>`;
  let resp=pl2Sec(h,"Responsabilidades e agentes").replace(/<small>Recomendado:[^<]*<\/small>/,"");
  /* a "Prioritária" segue o 1º de "Por onde começar", também dentro da mesma área */
  if(um&&um.opp&&!S.abFeito){ const alvo=esc(um.opp.t); if(resp.indexOf("<b>"+alvo+"</b>")>=0){ resp=resp.replace(/<span class="pl-dot pr"><\/span>/g,'<span class="pl-dot"></span>').replace(/<em>Prioritária<\/em>/g,"");
    resp=resp.replace(/<li><span class="pl-dot ?"><\/span><span><b>([^<]*)<\/b>/g,(m,t)=>t===alvo?`<li><span class="pl-dot pr"></span><span><b>${t}</b><em>Prioritária</em>`:m); } }
  const det=["Fontes","Skills, rotinas e capacidades","Checkpoints e evidências"].map(t=>pl2Sec(h,t)).join("");
  const topo=`<header class="p2-h"><h1 id="focus-h" tabindex="-1">Rumo à ${esc(V4_STAGES[4].toLowerCase())}</h1>
    <dl class="p2-props"><div><dt>Resultado esperado na primeira fase</dt><dd>${res[0]}–${res[1]} h por mês ${pill("Estimativa","wait")}</dd></div><div><dt>Em reais</dt><dd>${reais}</dd></div><div><dt>Estágio atual</dt><dd>${esc(c.stage)}</dd></div></dl>${custo}</header>`;
  return `<div class="page plano pl-v2">${topo}${tabs}${reg}${ini}${resp}<div class="p2-det">${det}</div></div>`; }
(function(){ const _tp=telaPlano; telaPlano=function(){ const h=_tp(); if(!pl2On()) return h;
  if(h.indexOf('<div class="emptyb">')>=0) return h; if(S.profile==="admin"&&S.plVista==="equipe") return h;
  const a=h.indexOf('<div class="page plano">'), b=h.lastIndexOf('</div></div></main>'); if(a<0||b<a) return h;
  try{ return h.slice(0,a)+pl2Tela(h)+h.slice(b); }catch(e){ console.warn("plano v2",e); return h; } }; })();
function pl2Mover(f,id){ const c0=pl2V4(), o=pl2Ordem(c0), antes=o.itens[0]; let L=o.itens.slice(); f(L); S.prio=L.map(x=>x.id);
  const depois=L[0], x=L.find(i=>i.id===id); const pos=L.filter(i=>i.k===x.k).indexOf(x)+1;
  S.p2Live=`${x.titulo}: ${pos}º em ${V4_CAT[x.k].areaN}.`; R();
  if(depois!==antes) aviso(S.abFeito?`O seu primeiro agente continua como está. ${depois.titulo} fica para o próximo agente.`:`A Trilha agora começa por ${depois.titulo}.`);
  requestAnimationFrame(()=>document.querySelector(`.pl-v2 [data-arg="${id}"][data-act]:not([disabled])`)?.focus()); }
Object.assign(A,{
  p2Sobe:id=>pl2Mover(L=>{ const i=L.findIndex(x=>x.id===id), k=L[i].k; for(let j=i-1;j>=0;j--) if(L[j].k===k){ [L[i],L[j]]=[L[j],L[i]]; break; } },id),
  p2Desce:id=>pl2Mover(L=>{ const i=L.findIndex(x=>x.id===id), k=L[i].k; for(let j=i+1;j<L.length;j++) if(L[j].k===k){ [L[i],L[j]]=[L[j],L[i]]; break; } },id),
  p2Primeiro:id=>pl2Mover(L=>{ const x=L.find(i=>i.id===id), mesma=L.filter(i=>i.k===x.k&&i!==x), outras=L.filter(i=>i.k!==x.k); L.splice(0,L.length,x,...mesma,...outras); },id),
  p2Sugestao:()=>{ S.prio=null; S.p2Live="Ordem sugerida pelo Consultor."; R(); aviso("Voltou a ordem sugerida pelo Consultor."); },
  plVersao:v=>{ S.plV=v; R(); aviso(v==="ant"?"Plano na versão anterior.":"Plano na versão nova.","prototipo"); } });
if(!A.irTrilha) A.irTrilha=()=>ir("trilha");
/* a opção nos Ajustes: Versões em teste › Plano */
(function(){ const h=[...document.querySelectorAll(".tz2-s h3")].find(x=>x.textContent.trim()==="Versões em teste"); if(!h) return;
  const row=document.createElement("div"); row.className="tz2-row";
  row.innerHTML='<span class="tz2-l">Plano</span><div class="tz2-seg" role="group" style="--n:2"><button data-act="plVersao" data-arg="novo">Novo (padrão)</button><button data-act="plVersao" data-arg="ant">Anterior</button></div><small class="tz2-hint">Novo: objetivo no título, régua de estágio e "Por onde começar" (c44) com o próximo passo. Anterior: o Plano de 25/11.</small>';
  const rows=h.parentElement.querySelectorAll(".tz2-row"); (rows[rows.length-1]||h).after(row); })();
(function(){ const _r=rotularFechar; rotularFechar=function(){ _r(); document.querySelectorAll('[data-act="plVersao"]').forEach(b=>b.setAttribute("aria-pressed",String((S.plV||"novo")===b.dataset.arg))); }; })();
</script>
