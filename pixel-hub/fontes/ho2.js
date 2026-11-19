/* hands-on ao vivo, versão evento (04/11). Referências do Mobbin: Calendly ("Up next" com horário, quem conduz e "Join meeting"
   só perto da hora), Square (bloco de data com o dia grande), Meetup (data numa linha), Base44 (faixa escura com uma ação).
   O cartão é o único da Home com cara de ingresso: bloco de data, estado real do encontro e ação que muda com o momento. */
const HO_EST={antes:{st:"Próximo encontro",ac:["Adicionar à minha agenda","hoAgenda"]},perto:{st:"Começa em 30 min",ac:["Entrar na sala","hoParticipar"]},aovivo:{st:"Ao vivo agora",ac:["Entrar agora","hoParticipar"]},depois:{st:"Encerrado",ac:["Ver a gravação","hoGravacao"]}};
hoBloco=function(){ const n=hoAtual(), B=TV_BLOCOS[n-1]||{}; const e=S.hoEst||"antes", E=HO_EST[e]; const data=n===1?{w:"Qui",d:"5",m:"nov",h:"19h"}:null;
  return `<section class="ho ho2" aria-labelledby="ho-t"><div class="sec-h"><h2 id="ho-t">Hands-on ao vivo</h2><button class="lnk" data-act="irAprender">Ver a agenda${u("chev")}</button></div>
    <div class="ho2-c ${e}">
      ${data?`<div class="ho2-dt" aria-label="${data.w}, ${data.d} de ${data.m}, ${data.h}"><span>${data.w}</span><b>${data.d}</b><span>${data.m}</span><i>${data.h}</i></div>`:`<div class="ho2-dt vz"><span>Data</span><b>—</b><span>na agenda</span></div>`}
      <div class="ho2-b"><p class="ho2-st"><span class="ho2-pill ${e}">${e==="aovivo"?"<i></i>":""}${esc(E.st)}</span><span>Fase ${n}</span></p>
        <b class="ho2-t">${esc(HO_ENC[n-1])}</b>
        <p class="ho2-d">Na sua mão, fase por fase, ao vivo.${B.fim?` Você sai com ${esc(B.fim.charAt(0).toLowerCase()+B.fim.slice(1).replace(/\.$/,""))}.`:""}</p></div>
      <div class="ho2-a"><button class="btn ${e==="depois"?"btn-g":"btn-p"}" data-act="${E.ac[1]}">${esc(E.ac[0])}${e==="perto"||e==="aovivo"?u("arrow"):""}</button></div>
    </div>
    <ol class="ho2-fs" aria-label="As 4 fases ao vivo">${HO_ENC.map((t,k)=>`<li class="${k+1===n?"at":k+1<n?"ok":""}"><button data-act="hoEncontro" data-arg="${k+1}"><span class="ho2-n">${k+1<n?u("check"):k+1}</span><span><small>Fase ${k+1}${k+1===n?", a sua":""}</small><b>${esc(t)}</b></span></button></li>`).join("")}</ol></section>`; };
FR_TRI.pessoa='<circle cx="12" cy="8.5" r="3.5"/><path d="M5 19.5c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5"/>';
Object.assign(A,{
  hoAgenda:()=>aviso("Adiciona o encontro à sua agenda (Google ou Outlook). No protótipo, fica só o aviso.","prototipo"),
  hoGravacao:()=>{ A.irAprender(); aviso("A gravação fica em Mentorias, na aba Gravações.","prototipo"); },
  hoModo:m=>{ S.hoEst=m; R(); }
});
(function(){ const _r=rotularFechar; rotularFechar=function(){ _r(); document.querySelectorAll('[data-act="hoModo"]').forEach(b=>b.setAttribute("aria-pressed",String((S.hoEst||"antes")===b.dataset.arg))); }; })();
