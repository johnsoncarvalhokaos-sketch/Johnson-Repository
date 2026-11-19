/* ===================== Home: kanban em andamento (03/11) =====================
   c12, c13, c14: hands-on ao vivo do bloco atual em destaque, com os 4 encontros ao lado; o destaque muda sozinho quando o bloco termina.
   c16: "Sua entrevista com o Consultor" no topo, como primeiro passo antes do plano (a entrevista em si é da Parte 2: tela provisória).
   c17: depois do plano, o próximo passo segue as travas: primeiro agente pela etapa 1, terminar o bloco 1, montar o segundo cérebro.
   O resto da Home não muda. Nomes dos encontros: documento "Hub, próxima versão" (31/10). */
const HO_ENC=["Seu primeiro agente de trabalho","O cérebro da sua empresa","Agentes trabalhando com seu time","Evoluindo sua empresa agêntica"];
function hoAtual(){ return S.bloco1?2:1; }
function hoBloco(){ const n=hoAtual(), B=TV_BLOCOS[n-1]||{}; const prox=n===1?"Quinta, 19h, com gravação":"Data na agenda de Mentorias";
  return `<section class="ho" aria-labelledby="ho-t"><div class="sec-h"><h2 id="ho-t">Hands-on ao vivo</h2><button class="lnk" data-act="irAprender">Ver a agenda${u("chev")}</button></div>
    <div class="ho-g"><div class="ho-main"><span class="ho-k"><i></i>Bloco ${n}</span><b class="ho-tt">${esc(HO_ENC[n-1])}</b><p class="ho-lede">Na sua mão, bloco por bloco, ao vivo.</p>
      <p class="ho-txt">Você está no bloco ${n}${B.fim?`: ${esc(B.fim.charAt(0).toLowerCase()+B.fim.slice(1).replace(/\.$/,""))}`:""}. Entre ao vivo: a nossa rede de IA entra com você para te ajudar.</p>
      <div class="ho-enc">${frTraits([["relogio",prox],["play","Ao vivo, com o time Pixel"]])}</div>
      <button class="btn btn-p" data-act="hoParticipar">Participar${u("arrow")}</button></div>
    <div class="ho-side"><p>Próximos encontros</p><ol>${HO_ENC.map((t,k)=>`<li class="${k+1===n?"at":k+1<n?"ok":""}"><button data-act="hoEncontro" data-arg="${k+1}"><span class="ho-n">${k+1<n?u("check"):k+1}</span><span><b>${esc(t)}</b><small>${k+1===n?"Seu bloco agora":k+1<n?"Bloco concluído":"Quando você chegar ao bloco "+(k+1)}</small></span></button></li>`).join("")}</ol></div></div></section>`; }
function hoProximo(){ const ent=!!S.entrev;
  if(!ent) return `<section class="hp" aria-labelledby="hp-t"><span class="hp-ic">${px("hub",34)}</span><div class="hp-b"><small>Seu primeiro passo</small><b id="hp-t">Sua entrevista com o Consultor</b><p>É nela que eu monto o seu Plano Agêntico. Primeiro a sua rotina, uns 15 minutos; depois, se quiser, as áreas da empresa.</p></div><button class="btn btn-p" data-act="irEntrevista">Começar a entrevista${u("arrow")}</button></section>`;
  const [t,d,act,arg,lab]=!S.abFeito?["Crie o seu primeiro agente pela etapa 1","O primeiro agente nasce pela Trilha. O Agent Builder do menu libera quando o bloco 1 terminar.","irTrilha","","Ir para a etapa 1"]
    :!S.bloco1?["Termine o bloco 1","Faltam as etapas que deixam o agente trabalhando sozinho, com segurança.","irTrilha","","Continuar a Trilha"]
    :["Monte o seu segundo cérebro","Com o bloco 1 concluído, organize o conhecimento que o seu agente consulta.","hoSegundo","","Abrir o Segundo Cérebro"];
  return `<section class="hp feito" aria-labelledby="hp-t"><span class="hp-ic ok">${u("check")}</span><div class="hp-b"><small>Plano montado. Seu próximo passo</small><b id="hp-t">${esc(t)}</b><p>${esc(d)}</p></div><button class="btn btn-p" data-act="${act}" data-arg="${arg}">${esc(lab)}${u("arrow")}</button></section>`; }
(function(){ const _ti=telaInicio; telaInicio=function(){ let h=_ti();
  // c16 e c17: o próximo passo no topo, logo depois do título
  const i=h.indexOf('<div class="phd">'); if(i>=0){ const j=h.indexOf('</div>',i)+6; h=h.slice(0,j)+hoProximo()+h.slice(j); }
  // com o próximo passo no topo, a ação do cartão da Trilha vira secundária (uma principal por tela)
  h=h.replace('<button class="btn btn-p" data-act="irTrilha">Continuar a etapa','<button class="btn btn-g" data-act="irTrilha">Continuar a etapa');
  // c12, c13, c14: o hands-on do bloco atual no lugar de "Aprender esta semana"
  h=h.replace(/<div class="sec-h"><h2>Aprender esta semana<\/h2>[\s\S]*?<div class="ments m2">(?:<div class="ment">[\s\S]*?<\/small><\/div>){2}<\/div>/,hoBloco());
  return h; }; })();
function telaEntrevistaProv(){ return `<div class="shell noagent">${lateral()}<main class="center">${topoApp("Sua entrevista com o Consultor","Tela provisória")}<div class="views"><div class="view" id="scroller"><div class="page ent">
  <button class="lnk" data-act="irHome">${u("chev")}Voltar ao Início</button>
  <div class="ent-h"><span>${px("hub",48)}</span><div><h1 id="focus-h" tabindex="-1">Sua entrevista com o Consultor</h1><p>Uma conversa sobre o seu dia a dia e as áreas pelas quais você responde. Dela saem o seu Plano Agêntico e o diagnóstico.</p></div></div>
  <ol class="ent-et"><li><span>1</span><div><b>Sua rotina</b><small>Uns 15 minutos. Obrigatória: vira o seu agente pessoal.</small></div></li><li><span>2</span><div><b>As áreas</b><small>Uns 10 minutos por área. Viram os agentes das áreas.</small></div></li><li><span>3</span><div><b>A conta</b><small>Uns 3 minutos. Você confere os números antes do plano.</small></div></li></ol>
  <p class="ent-av">A conversa da entrevista entra na Parte 2 do protótipo. Aqui, simule o fim para ver o próximo passo da Home.</p>
  <div class="ent-a"><button class="btn btn-p" data-act="entSimular">Simular: entrevista concluída${u("arrow")}</button><button class="btn btn-q" data-act="irHome">Fazer depois</button></div>
  </div></div></div></main></div>`; }
(function(){ const _vw=view; view=function(){ if(S.scr==="entrevista") return telaEntrevistaProv(); return _vw(); }; })();
Object.assign(A,{
  irEntrevista:()=>{ S.sideOpen=false; ir("entrevista"); },
  entSimular:()=>{ S.entrev=true; ir("home"); aviso("Entrevista concluída e plano montado (simulação). O próximo passo da Home mudou.","prototipo"); },
  hoParticipar:()=>aviso("Abre a sala do hands-on ao vivo do seu bloco. No protótipo, fica só o aviso.","prototipo"),
  hoEncontro:n=>{ A.irAprender(); aviso(`Encontro do bloco ${n}: a descrição e a inscrição entram em Mentorias depois desta versão.`,"prototipo"); },
  hoSegundo:()=>{ A.irFerr(); A.frAbrir("sc"); },
  entModo:m=>{ S.entrev=m==="feita"; R(); }
});
