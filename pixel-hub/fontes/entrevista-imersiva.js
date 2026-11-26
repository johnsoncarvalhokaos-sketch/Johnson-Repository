<!-- imersiva:inicio -->
<style>
/* ===================== Entrevista imersiva como versão em teste (24/11) =====================
   Ajustes › Versões em teste › Entrevista: Imersiva (padrão desde 26/11) | Conversa. A imersiva é a exploração de 19/11
   (exploracoes/entrevista-imersiva), embutida aqui: abre em tela cheia sobre o Hub e, no fim, o resultado vai para o Plano. */
.ent-im{ position:fixed; inset:0; z-index:100; background:#fff; }
.ent-im iframe{ display:block; width:100%; height:100%; border:0; }
</style>
<script>
const ENT_IM_B64="__IMERSIVA_B64__";
const ENT_IM_IA=["Ainda não uso no trabalho","Uso de vez em quando, por conta própria","Uso todo dia, com prompts que reaproveito","Já tenho automações ou agentes rodando"];
function entImDoc(){ const bin=atob(ENT_IM_B64), bytes=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
  const nome=String(fullName()||"").split(" ")[0];
  return new TextDecoder("utf-8").decode(bytes).replace("window.__EMBED=1","window.__EMBED=1;window.__NOME="+JSON.stringify(nome).replace(/</g,"\\u003c")); }

/* a tela cheia fica fora do #app: o R() do Hub não a recria, então a conversa não se perde */
function entImSync(){ const on=S.scr==="entrevista"&&(S.entV||"imersiva")==="imersiva"&&!(S.ent&&S.ent.done); let el=document.getElementById("ent-im"); const app=document.getElementById("app");
  if(on&&!el){ el=document.createElement("div"); el.id="ent-im"; el.className="ent-im"; const f=document.createElement("iframe"); f.title="Entrevista com o Consultor"; f.srcdoc=entImDoc(); el.appendChild(f); document.body.appendChild(el); setTimeout(()=>f.focus(),60); }
  if(!on&&el) el.remove(); if(app) app.inert=on; }
(function(){ const _R=R; R=function(){ const r=_R.apply(this,arguments); entImSync(); return r; }; })();

/* o resultado da imersiva vira o S.v da entrevista. Ela pergunta uma só coisa sobre IA: as seis respostas de maturidade seguem essa (simplificação desta versão em teste) */
function entImAplicar(d){ if(!S.ent) entComecar(); const v=S.ent.v, a=v.a, bak=(S.ent.bak&&S.ent.bak.a)||{}, Q=_v4QEnt(S.profile), ops=id=>(Q.find(q=>q.id===id)||{}).opts||[];
  const ii=Math.max(0,ENT_IM_IA.indexOf(d.ia));
  ["mat0","mat1","mat2","mat3","mat4","mat5"].forEach(k=>{ const o=ops(k); a[k]=o.length?o[Math.round(ii*(o.length-1)/3)]:bak[k]; });
  const inef=ops("inef").filter(o=>(d.areas||[]).includes(o.replace(/\.$/,""))).slice(0,2); a.inef=inef.length?inef:(bak.inef||[]);
  a.ferr=(d.ferr||[]).slice(); a.proc=d.processo||d.rotina||"no";
  if(d.ritmo&&d.ritmo.freq){ a.freq=d.ritmo.freq; a.tempo=d.ritmo.tempo; }
  v.qi=_v4QEnt(S.profile).length; v.done=true; S.ent.done=true; S.entrev=true; }
window.addEventListener("message",e=>{ const f=document.querySelector("#ent-im iframe"), d=e.data; if(!f||e.source!==f.contentWindow||!d||d.px!=="entrevista-imersiva") return;
  if(d.acao==="sair"){ ir("home"); return; }
  if(d.acao==="fim"){ entImAplicar(d.dados||{}); ir("plano"); aviso("Plano montado com a entrevista imersiva. Nesta versão, as seis perguntas de maturidade seguem a resposta sobre IA.","prototipo"); } });

/* a opção nos Ajustes, logo depois de "Banner da entrevista" */
(function(){ const h=[...document.querySelectorAll(".tz2-s h3")].find(x=>x.textContent.trim()==="Versões em teste"); if(!h) return;
  const row=document.createElement("div"); row.className="tz2-row";
  row.innerHTML='<span class="tz2-l">Entrevista</span><div class="tz2-seg" role="group" style="--n:2"><button data-act="entVersao" data-arg="imersiva">Imersiva (padrão)</button><button data-act="entVersao" data-arg="conversa">Conversa</button></div><small class="tz2-hint">Imersiva, a principal desde 26/11: tela cheia, com o anel como presença do Consultor. Conversa: a entrevista no chat do Hub, com o painel ao lado. As duas levam o resultado para o Plano.</small>';
  const prim=h.parentElement.querySelector(".tz2-row"); if(prim) prim.after(row); else h.after(row); })();
Object.assign(A,{ entVersao:v=>{ S.entV=v; R(); aviso(v==="imersiva"?"Entrevista imersiva, a versão principal.":"Entrevista em conversa: abra a entrevista pelo Início ou pelo Plano.","prototipo"); } });
(function(){ const _r=rotularFechar; rotularFechar=function(){ _r(); document.querySelectorAll('[data-act="entVersao"]').forEach(b=>b.setAttribute("aria-pressed",String((S.entV||"imersiva")===b.dataset.arg))); }; })();
</script>
<!-- imersiva:fim -->
