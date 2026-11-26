<style>
/* ===================== Logos e ícones nas listas do Plano (26/11) =====================
   Fontes e "Ferramentas da equipe": logo real da ferramenta (Simple Icons, CC0) ou ícone da biblioteca para as genéricas
   (CRM, ERP, e-mail). "Skills, rotinas e capacidades": ícone de skill (o arquivo SKILL.md) na cor da área do Plano, como no
   catálogo de skills; rotina com o ícone de rotina. Lacunas (a skill ainda não existe) com o ícone apagado. 20 px, antes do nome. */
.pl-l li > span > b .px-mc, .pl-l li > span > b .pl-ic{ width:20px; height:20px; margin-right:12px; vertical-align:-4px; flex:none; }
.pl-l li > span > b .px-mc-par{ margin-right:12px; vertical-align:-4px; } .pl-l li > span > b .px-mc-par .px-mc{ margin-right:0; width:18px; height:18px; }
.pl-l li > span > b .pl-ic.apagado{ opacity:.4; }
.pl-l li > span > b ~ em{ padding-left:32px; }
.pl-l li > span > b:not(:has(.px-mc, .pl-ic, .px-mc-par)) ~ em{ padding-left:0; }
</style>
<script>
function plIcPxi(k,cor,extra){ return PXI[k]?`<svg class="u pl-ic${extra?" "+extra:""}" viewBox="0 0 24 24" aria-hidden="true"${cor?` style="color:${cor}"`:""}>${PXI[k]}</svg>`:""; }
function plIcFonte(n){ const t=String(n); let m=typeof pxMarca==="function"?pxMarca(t):"";
  if(!m&&typeof pxMarca==="function"){ const al=[[/whatsapp/i,"WhatsApp"],[/planilha/i,"Planilhas"],[/\bcrm\b/i,"CRM"],[/\berp\b/i,"ERP"],[/e-?mail|gmail/i,"E-mail"],[/instagram/i,"Instagram"],[/notion/i,"Notion"],[/drive/i,"Google Drive"],[/telegram/i,"Telegram"],[/meta ads|facebook/i,"Meta Ads"],[/chatgpt|openai/i,"ChatGPT"],[/trello/i,"Trello"],[/asana/i,"Asana"],[/slack/i,"Slack"],[/hubspot/i,"HubSpot"]].find(([re])=>re.test(t));
    if(al) m=pxMarca(al[1]); }
  return m||plIcPxi("conexao"); }
function plIcSkill(n,lacuna){ let cor=""; try{ const c=v4Compute(); const an=V4_CAT[c.mainArea||c.cat.area].areaN; cor=(PX_MARCAS.areas[an]||[])[1]||""; }catch(e){}
  return /^rotina/i.test(String(n))?plIcPxi("rotina"):plIcPxi("skill",cor,lacuna?"apagado":""); }
function plIcSecao(h,titulo,fn){ const t=h.indexOf(">"+titulo); if(t<0) return h; const a=h.lastIndexOf('<section class="pls',t), b=h.indexOf("</section>",t); if(a<0||b<0) return h;
  const sec=h.slice(a,b).replace(/<li><span class="pl-dot( [^"]*)?"><\/span><span><b>([^<]+)<\/b>/g,(m,cls,nome)=>`<li><span class="pl-dot${cls||""}"></span><span><b>${fn(nome,/gap/.test(cls||""))}${nome}</b>`);
  return h.slice(0,a)+sec+h.slice(b); }
(function(){ const _tp=telaPlano; telaPlano=function(){ let h=_tp(); try{
  h=plIcSecao(h,"Fontes",n=>plIcFonte(n)); h=plIcSecao(h,"Ferramentas da equipe",n=>plIcFonte(n)); h=plIcSecao(h,"Skills, rotinas e capacidades",(n,lac)=>plIcSkill(n,lac));
  }catch(e){ console.warn("ícones do Plano",e); } return h; }; })();
</script>
