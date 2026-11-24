<style>
/* ===================== Plano › Equipe: visão do gestor com as entrevistas da equipe (c41), 24/11 =====================
   Só o Admin vê. Junta o que cada pessoa contou na entrevista: processos (por área), ferramentas e as horas que voltam.
   As respostas sobre IA de cada pessoa não aparecem; o Membro é avisado disso no Plano dele.
   Carla Mendes traz uma entrevista de exemplo, marcada como exemplo; Diego Rocha ainda não fez a dele. */
.pl-tabs{ margin-top:8px; }
.pl-eq .pl-top .pl-big small{ font-family:var(--f-b,inherit); font-size:16px; font-weight:400; color:var(--muted); letter-spacing:0; }
.pl-eq .pl-res2{ display:flex; flex-direction:column; gap:4px; }
.pl-eq .pl-p li > span:nth-child(2) em{ display:block; }
.pl-eq .pl-p .btn{ flex:none; }
.pl-eq .pl-arh{ display:flex; justify-content:space-between; gap:12px; margin:16px 0 4px; font-size:14px; font-weight:600; line-height:1.45; color:var(--ink-2); }
.pl-eq .pl-arh:first-child{ margin-top:0; }
.pl-eq .pl-arh span{ font-weight:400; color:var(--muted); }
/* aqui o detalhe é o conteúdo (quem contou, frequência, tempo): a versão limpa do Plano esconde, a Equipe mostra */
.pl-eq .pl-l li em{ display:block !important; font-size:14px; line-height:1.45; color:var(--muted); font-style:normal; }
.pl-eq .pl-dest small{ font-size:14px; line-height:1.45; color:var(--muted); }
.pl-eq .mtr i{ opacity:1; background:var(--line); }
.pl-eq .mtr i.p{ background:var(--ok); }
/* correções do checker: tabs, botões, contador e selos iguais ao "Seu plano" */
body.ui-rev[data-scr="plano"] .pl-tabs{ gap:24px; }
body.ui-rev[data-scr="plano"] .pl-tabs button{ font-size:var(--t-meta); }
body.ui-rev[data-scr="plano"] .pl-eq .btn-sm, body.ui-rev[data-scr="plano"] .pl-rs .btn-sm{ font-size:var(--t-meta); }
.pl-eq .pls-h .muted{ font-size:14px; font-weight:600; }
.pl-eq .pill{ font-size:14px !important; font-weight:500 !important; }

</style>
<script>
/* exemplo: a entrevista da Carla, no mesmo formato que entProcs() devolve */
const PL_EQ_EXEMPLO={ "Carla Mendes":{ exemplo:true, ferr:["WhatsApp Business","ERP","Planilhas (Excel ou Google)"],
  procs:[{nome:"Responder no WhatsApp as dúvidas de prazo de entrega",area:"Atendimento ao cliente",freq:"Todo dia",tempo:"30 min a 1 h",h:17},
         {nome:"Atualizar a planilha de pedidos com o status do ERP",area:"Operações e entrega",freq:"Algumas vezes por semana",tempo:"15 a 30 min",h:4}] } };
function plEquipe(){ const m=empMembros(); let red=[.3,.5]; try{ red=v4Compute().prim.red||red; }catch(e){}
  return m.map(p=>{ const eu=!!p.eu, nome=eu?fullName():(p.n||p.e);
    if(eu){ const a=plEnt(); return {nome,eu,feita:!!a||!!S.entrev,procs:a?entProcs(a):[],ferr:a?(a.ferr||[]).filter(f=>f&&f!=="Nenhuma delas"&&f!=="Outra"):[]}; }
    const ex=PL_EQ_EXEMPLO[p.n]; return ex?{nome,feita:true,exemplo:true,procs:ex.procs,ferr:ex.ferr}:{nome,feita:false,pend:p.s==="pendente",procs:[],ferr:[]}; }).map(x=>Object.assign(x,{red})); }
function plEquipeTela(){ const eq=plEquipe(), red=eq[0]?eq[0].red:[.3,.5], feitas=eq.filter(x=>x.feita);
  const procs=feitas.flatMap(x=>x.procs.map(p=>Object.assign({quem:x.nome,exemplo:x.exemplo},p)));
  const tot=procs.reduce((s,p)=>s+(p.h||0),0), lo=Math.max(1,Math.round(tot*red[0])), hi=Math.max(lo+1,Math.round(tot*red[1]));
  const dec=stTag("dec","Informado na entrevista"), ex=pill("Exemplo","idle"), nm=n=>esc(String(n).split(" ")[0]);
  const reais=S.custoH&&tot?`<small>Em reais: ${plBRL(lo*S.custoH)}–${plBRL(hi*S.custoH).replace("R$ ","")} por mês, com a hora a ${plBRL(S.custoH)}.</small>`:"";
  const topo=`<div class="pl-top">
    <div class="pl-c"><span class="pl-k">Entrevistas</span><b class="pl-big">${feitas.length} de ${eq.length} <small>concluídas</small></b><div class="mtr" role="img" aria-label="${feitas.length} de ${eq.length} entrevistas concluídas">${eq.map(x=>`<i class="${x.feita?"p":""}"></i>`).join("")}</div><p>${eq.length-feitas.length?`Falta${eq.length-feitas.length>1?"m":""} ${eq.length-feitas.length}. O plano da empresa fica mais preciso a cada entrevista.`:"Toda a equipe já contou a sua rotina."}</p></div>
    <div class="pl-c pl-dest"><span class="pl-k">Horas de volta, somando a equipe</span>${tot?`<b class="pl-big">${lo}–${hi} h por mês</b><div class="pl-res2"><small>nos ${procs.length} processos que a equipe contou, com a mesma regra do seu Plano</small>${reais}</div><div class="pl-ft">${pill("Estimativa","wait")}</div>`:`<b class="pl-big">Ainda sem horas</b><p>As horas aparecem quando alguém contar um processo na entrevista.</p>`}</div>
  </div>`;
  const pessoas=plSec(1,"Pessoas",`<ul class="pl-l pl-p">${eq.map(x=>`<li><span class="pl-dot ${x.feita?"ok":""}"></span><span><b>${esc(x.nome)}${x.eu?" (você)":""}</b><em>${x.feita&&!x.procs.length&&!x.ferr.length?"Entrevista feita":x.feita?`Entrevista feita: ${x.procs.length===1?"1 processo":x.procs.length+" processos"}, ${x.ferr.length===1?"1 ferramenta":x.ferr.length+" ferramentas"}`:x.pend?"Convite enviado; ainda não entrou no Hub":"Ainda não fez a entrevista"}</em></span>${x.exemplo?ex:x.feita?dec:x.eu?`<button class="btn btn-g btn-sm" data-act="irEntrevista">Fazer a minha</button>`:`<button class="btn btn-g btn-sm" data-act="plLembrar" data-arg="${esc(x.nome)}">Lembrar</button>`}</li>`).join("")}</ul>`);
  const areas={}; procs.forEach(p=>{ const k=p.area||"Sem área definida"; (areas[k]=areas[k]||[]).push(p); });
  const procHtml=Object.keys(areas).length?Object.entries(areas).sort((a,b)=>b[1].reduce((s,p)=>s+(p.h||0),0)-a[1].reduce((s,p)=>s+(p.h||0),0)).map(([ar,ps])=>{ const h=ps.reduce((s,p)=>s+(p.h||0),0);
    return `<h3 class="pl-arh">${esc(ar)}<span>${h?`hoje ≈ ${h} h por mês`:""}</span></h3><ul class="pl-l">${ps.map(p=>`<li><span class="pl-dot"></span><span><b>${esc(p.nome)}</b><em>${[nm(p.quem),p.freq&&p.freq.toLowerCase(),p.tempo&&"cada vez "+p.tempo.toLowerCase(),p.h!=null&&(p.h<1?"hoje, menos de 1 h por mês":entH(p.h).replace("≈","hoje ≈"))].filter(Boolean).join(", ")}</em></span>${p.exemplo?ex:dec}</li>`).join("")}</ul>`; }).join("")
    :`<p class="muted">Nenhum processo contado ainda.</p>`;
  const ferr={}; feitas.forEach(x=>x.ferr.forEach(f=>{ (ferr[f]=ferr[f]||[]).push(x); }));
  const ferrHtml=Object.keys(ferr).length?`<ul class="pl-l">${Object.entries(ferr).sort((a,b)=>b[1].length-a[1].length).map(([f,qs])=>`<li><span class="pl-dot"></span><span><b>${esc(f)}</b><em>${qs.length} de ${feitas.length} ${feitas.length===1?"pessoa":"pessoas"}: ${qs.map(q=>nm(q.nome)).join(", ")}</em></span>${qs.every(q=>q.exemplo)?ex:dec}</li>`).join("")}</ul>`:`<p class="muted">Nenhuma ferramenta contada ainda.</p>`;
  return `<div class="pl-eq"><p class="ob-note">${u("users")}O que cada pessoa contou na entrevista, somado: processos, ferramentas e horas. As respostas de cada um sobre IA não aparecem aqui.</p>${topo}${pessoas}${plSec(2,"Processos por área",procHtml,`<span class="muted">${procs.length===1?"1 processo":procs.length+" processos"}</span>`)}${plSec(3,"Ferramentas da equipe",ferrHtml)}</div>`; }
(function(){ const _tp=telaPlano; telaPlano=function(){ let h=_tp();
  h=h.replace("Suas respostas pessoais não aparecem para o Admin.","O Admin vê os processos e as ferramentas que você contar na entrevista; as suas respostas sobre IA ficam com você.");
  if(S.profile!=="admin") return h;
  h=h.replace("O avanço de cada participante entra numa próxima versão.","O que cada pessoa contou na entrevista está na aba Equipe; o avanço de cada uma na Trilha entra numa próxima versão.");
  const v=S.plVista==="equipe"?"equipe":"eu";
  const tabs=`<div class="tabs ap-tabs pl-tabs" role="tablist" aria-label="Plano">${[["eu","Seu plano"],["equipe","Equipe"]].map(([k,t])=>`<button role="tab" aria-selected="${v===k}" tabindex="${v===k?0:-1}" data-act="plVista" data-arg="${k}">${t}</button>`).join("")}</div>`;
  /* sem a própria entrevista, o Plano do Admin é o estado vazio: as abas ficam no topo e a Equipe já funciona */
  const e=h.indexOf('<div class="emptyb">');
  if(e>=0){ const fim=h.lastIndexOf('</div></div></div></main>');
    if(v==="equipe"&&fim>e) return h.slice(0,e)+`<div class="phd"><h1 id="focus-h" tabindex="-1">O mapa da sua transformação</h1><p>Você ainda não fez a sua entrevista. Enquanto isso, veja o que a equipe já contou.</p></div>${tabs}`+plEquipeTela()+h.slice(fim);
    return h.slice(0,e)+tabs+h.slice(e); }
  const i=h.indexOf('<div class="phd">'), j=i<0?-1:h.indexOf("</div>",i); if(j<0) return h;
  h=h.slice(0,j+6)+tabs+h.slice(j+6);
  if(v==="equipe"){ const a=h.indexOf('<div class="pl-leg2"'), b=h.lastIndexOf('</div></div></div></main>'); if(a>0&&b>a) h=h.slice(0,a)+plEquipeTela()+h.slice(b); }
  return h; }; })();
Object.assign(A,{
  plVista:k=>{ S.plVista=k; R(); },
  plLembrar:n=>aviso(`Lembrete para ${String(n).split(" ")[0]} fazer a entrevista. No protótipo, nada é enviado.`,"prototipo") });
</script>
