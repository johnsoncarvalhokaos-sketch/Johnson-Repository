# Coloca o produto (pixel-hub-produto.html) dentro do protótipo completo e regera a versão que abre no Início
import base64
import os
O=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'/'
p=open(O+'pixel-hub-produto.html',encoding='utf-8').read()
idx=O+'artifacts/14a3f57a-3141-46b5-8063-a9e1139f35da/index.html'
s=open(idx,encoding='utf-8').read()
i=s.find('const PRODUTO="')+len('const PRODUTO="'); j=s.find('"',i)
s=s[:i]+base64.b64encode(p.encode('utf-8')).decode()+s[j:]
open(idx,'w',encoding='utf-8').write(s); open(O+'pixel-hub-onboarding-chat.html','w',encoding='utf-8').write(s)
h=s.replace('<title>Pixel AI Hub, onboarding com o Consultor</title>','<title>Pixel AI Hub, produto</title>',1)
boot='<script>/* versão que abre direto no produto (Início), sem a entrada e sem o onboarding */\n(function(){ function abrir(){ try{ fechaPainel&&fechaPainel(); }catch(e){} try{ S.tela="ov"; if(!S.v.done){ amostraDados(); } irProduto(false); }catch(e){ console.error(e); } } if(document.readyState==="complete") abrir(); else window.addEventListener("load",abrir); })();</script>\n</body>'
k=h.rfind('</body>'); h=h[:k]+boot+h[k+7:]
open(O+'home/pixel-hub-produto-home.html','w',encoding='utf-8').write(h); print('ok',len(p))
