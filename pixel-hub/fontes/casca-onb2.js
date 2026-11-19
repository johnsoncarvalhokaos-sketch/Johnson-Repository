<script id="pxi-casca-onb2">
/* c38 (19/11): o onboarding fica só com perfil e informações principais (onboarding 2.0, dentro do produto).
   Depois do login, e no "Voltar ao onboarding", o protótipo abre o onboarding 2.0 do perfil; a entrevista acontece no produto.
   O onboarding antigo, com o diagnóstico em chat, continua nos atalhos dos Ajustes do protótipo, como versão anterior. */
function irOnb2(){ const h={pixelHandoff:1,onb2:1,profile:S.profile,a:{},slot:null,inv:[]};
  const bin=atob(PRODUTO); const bytes=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i); const html=new TextDecoder("utf-8").decode(bytes);
  const f=document.createElement("iframe"); f.id="produto"; f.title="Pixel AI Hub"; f.name=JSON.stringify(h); f.srcdoc=html; document.body.appendChild(f); document.body.classList.add("em-produto"); fechaPainel(); }
(function(){ const _ok=auEntrarOk; auEntrarOk=function(){ _ok.apply(this,arguments); irOnb2(); }; })();
(function(){ if(S.tela==="ov"&&!document.getElementById("produto")) irOnb2(); })();
</script>
