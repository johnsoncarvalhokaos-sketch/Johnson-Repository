/* banner da entrevista, versão nova (09/11). A anterior fica nos Ajustes ("Banner da entrevista: Anterior").
   Vende o resultado (o Plano e o estágio), mostra o esforço numa linha, situa na jornada e mostra que é uma conversa. */
(function(){ const _hp=hoProximo; hoProximo=function(){ if(S.entrev||S.bnV==="ant") return _hp();
  return `<section class="hp2" aria-labelledby="hp2-t"><div class="hp2-c">
    <ol class="hp2-st" aria-label="Até o primeiro agente"><li class="at"><span>1</span>Entrevista</li><li><span>2</span>Primeiro agente</li><li><span>3</span>Fase 1</li></ol>
    <h2 id="hp2-t">Monte o seu Plano Agêntico com o Consultor</h2>
    <p class="hp2-sai"><span>Você sai com</span><em>${u("plano")}Plano Agêntico</em><em>${u("estagio")}Seu estágio na transformação</em></p>
    <p class="hp2-f">${u("relogio")}Uns 15 minutos. Primeiro a sua rotina; depois, se quiser, as áreas da empresa.</p>
    <div class="hp2-a"><button class="btn btn-p btn-jornada" data-act="irEntrevista">Começar a entrevista${u("arrow")}</button><button class="lnk hp2-l" data-act="hp2Como">Como funciona a entrevista</button></div></div>
    <div class="hp2-v" aria-hidden="true"><div class="hp2-msg"><span class="hp2-av">${px("hub",28)}</span><div class="hp2-b1"><small>Consultor Pixel AI</small>Oi, Renata! Me conta: como é um dia normal seu na Bertoni?</div></div><div class="hp2-b2">Começo pelos orçamentos que chegaram no WhatsApp…</div><div class="hp2-typ"><i></i><i></i><i></i></div></div></section>`; }; })();
Object.assign(UI,{ plano:PXI.plano, estagio:PXI.estagio, relogio:PXI.relogio });
Object.assign(A,{ hp2Como:()=>aviso("Abre uma explicação curta da entrevista: o que o Consultor pergunta, quanto tempo leva e o que sai dela.","prototipo"), bnModo:v=>{ S.bnV=v; R(); } });
(function(){ const _r=rotularFechar; rotularFechar=function(){ _r(); document.querySelectorAll('[data-act="bnModo"]').forEach(b=>b.setAttribute("aria-pressed",String((S.bnV||"novo")===b.dataset.arg))); }; })();
(function(){ try{ R(); }catch(e){} })();
