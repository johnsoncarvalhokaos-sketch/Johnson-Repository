<script>
/* ===================== Bloco de pergunta da entrevista no formato do Emergent, dentro da conversa (24/11) =====================
   Referência: Emergent (Mobbin), "Agent has questions for you": cabeçalho discreto, corpo branco, opções em linhas com caixa
   de marcar, rodapé com a navegação à esquerda e a ação à direita. Aqui ele fica na conversa, como mensagem do Consultor.
   Só com "Sistema visual: Revisado"; o estilo está em <style id="ui-rev">. */
(function(){ const _p=pergunta; pergunta=function(){ let h=_p();
  if(S.scr!=="entrevista"||S.uiRev==="ant"||!S.v||S.v.done||h.indexOf('<div class="askc">')<0) return h;
  h=h.replace('<div class="askc">',`<div class="askc askc-em"><div class="askc-h">${px("hub",16)}<span>O Consultor tem uma pergunta para você</span></div>`);
  /* várias escolhas: linhas com caixa de marcar no lugar dos chips */
  const ck=u("check");
  h=h.replace(/<button class="ob2-ch ?(on)?" aria-pressed="(true|false)" data-act="entTag" data-arg="([^"]*)">([\s\S]*?)<\/button>/g,(m,on,pr,arg,txt)=>
    `<button class="ent-op${on?" on":""}" aria-pressed="${pr}" data-act="entTag" data-arg="${arg}"><span class="ent-cb" aria-hidden="true">${ck}</span>${txt.split(ck).join("")}</button>`);
  /* "Corrigir a resposta anterior" vai para o rodapé, à esquerda, quando há rodapé */
  const cm=h.match(/<button class="lnk" data-act="desfazer">[\s\S]*?<\/button>/);
  if(cm&&h.indexOf('<div class="ask-b">')>=0){ h=h.replace(cm[0],"").replace('<div class="ask-b">',`<div class="ask-b">${cm[0]}`); }
  return h; }; })();
</script>
