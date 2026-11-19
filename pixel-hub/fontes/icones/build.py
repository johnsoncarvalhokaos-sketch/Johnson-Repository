import json, html, itertools
from mascaras import mascarar
I=json.load(open('icons2.json'))
CAT_ORD=['Navegação','Ações','Estados','Objetos do Hub','Áreas dos agentes']
AREA_COR={'area-vendas':'#FF5A1F','area-marketing':'#EC3FAC','area-atendimento':'#17AE78','area-financeiro':'#E39400','area-operacoes':'#2E6BFF','area-rh':'#7B5CFF','area-dados':'#10A3B3','area-gestao':'#10A3B3','area-chief':'#6B7090','area-orquestrador':'#6B7090','area-geral':'#6B7090'}
# mapeamento do que o Hub usa hoje para a biblioteca nova
MAP=[
 ('home','Início (menu)','inicio','Substitui'),('map','Trilha (menu), Jornada do agente','trilha','Substitui'),('book (Base)','Conteúdo complementar','conteudo','Substitui'),
 ('estrelinhas (ferr)','Ferramentas e skills (menu)','ferramentas','Substitui'),('alvo (plano)','Plano Agêntico (menu)','plano','Substitui'),('bot','Agentes (menu), Novo agente','agentes','Substitui'),
 ('book (Mentorias)','Mentorias (menu)','mentorias','Substitui'),('users','Comunidade (menu)','comunidade','Substitui'),('troféu (cases)','Cases (menu)','cases','Substitui'),
 ('building','Empresa (menu)','empresa','Substitui'),('ajuda','Suporte (menu)','suporte','Substitui'),('sino','Notificações (topo)','notificacao','Substitui'),('sliders','Ajustes do protótipo, filtros','ajustes','Substitui'),
 ('arrow','Botões com seta','seta','Substitui'),('back','Voltar','voltar','Substitui'),('chev','Links "Ver detalhes", "Abrir o Plano"','chevron','Substitui'),('down','Selects, recolher','chevron-baixo','Substitui'),
 ('x','Fechar drawers e janelas','fechar','Substitui'),('check','Concluído, selecionado','check','Substitui'),('plus','Novo agente, adicionar','mais','Substitui'),('edit, lápis','Ajustar no Agent Builder','editar','Substitui'),
 ('search','Buscas','buscar','Substitui'),('send','Enviar ao Consultor','enviar','Substitui'),('copiar','Copiar pedido','copiar','Substitui'),('download','Baixar a skill, o kit','baixar','Substitui'),
 ('ampliar','Abrir em página','ampliar','Substitui'),('sair','Sair da conta','sair','Substitui'),('play','Aulas, vídeos','play','Substitui'),
 ('info','Avisos, notas','info','Substitui'),('alerta (inline)','Alerta da fase futura','alerta','Substitui'),('check verde','Concluídos','sucesso','Substitui'),('lock','Trava do Agent Builder','cadeado','Substitui'),
 ('clock, relógio','Tempo da etapa, datas','relogio','Substitui'),('ponto pulsante','Hands-on ao vivo','ao-vivo','Novo'),('shield','Aprovação, segurança','escudo','Substitui'),
 ('engrenagem','Toda skill','skill','Substitui'),('layout','Templates','template','Novo'),('caixa','Agentes prontos, kits','kit','Novo'),('cérebro','Segundo Cérebro','cerebro','Substitui'),
 ('balão','Prompts','prompt','Novo'),('bolt','Automações','automacao','Substitui'),('repetir','Rotinas','rotina','Substitui'),('ramo','Repositórios','repositorio','Novo'),
 ('doc, arquivo','Docs, SKILL.md, modelos','documento','Substitui'),('play em quadro','Aulas da Trilha','aula','Novo'),('fone','Mentoria técnica','mentoria-tecnica','Novo'),('gravação','Gravações','gravacao','Novo'),
 ('bandeira (nenhum)','Fases e etapas','fase','Novo'),('mapa (dobras)','Mapa da jornada','mapa','Substitui'),('mic','Entrevista com o Consultor','entrevista','Substitui'),('semáforo','Estágio na transformação','estagio','Novo'),
 ('ampulheta (nenhum)','Horas que voltam','horas','Novo'),('plug (nenhum)','Conectores','conexao','Novo'),('users (+)','Convidar participante','convidar','Novo'),('calendar','Agenda, agendar','calendario','Substitui'),
 ('etiqueta','Áreas, tags','etiqueta','Substitui'),('camadas','Usada em templates','camadas','Substitui'),('chart','Dados, relatórios','grafico','Substitui'),('wa','WhatsApp','—','Mantém a marca oficial'),
 ('Pixel','Consultor Pixel AI, agentes','—','Mantém o personagem'),('ícones de área (traço)','Templates por área','area-*','Substitui'),
]
def standalone(svg,k):
    st='stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
    s=mascarar(svg,'pxm-'+k).replace('class="p"','fill="none" '+st).replace('class="s"','fill="currentColor" fill-opacity=".12" '+st)
    s=s.replace('class="pl"','fill="none" '+st).replace('class="sl"','fill="none" '+st).replace('class="d"','fill="currentColor"')
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">{s}</svg>'
data=[{'n':k,'c':v['cat'],'svg':mascarar(v['svg'],'pxm-'+k),'o':v['onde'],'raw':standalone(v['svg'],k),'cor':AREA_COR.get(k,'')} for k,v in I.items()]
cats=[c for c in CAT_ORD if any(d['c']==c for d in data)]
_n=itertools.count()
def ic(n,size=24,extra=''): return f'<svg class="ic" viewBox="0 0 24 24" width="{size}" height="{size}" aria-hidden="true" {extra}>{mascarar(I[n]["svg"],f"pxm-{n}-{next(_n)}")}</svg>'
hero_row=''.join(f'<span class="hr" style="color:{c}">{ic(n,40)}</span>' for n,c in [('agentes','#FF5A1F'),('trilha','#2E6BFF'),('skill','#EC3FAC'),('cerebro','#7B5CFF'),('ao-vivo','#FF5A1F'),('plano','#17AE78'),('kit','#E39400'),('rotina','#10A3B3'),('entrevista','#fff'),('calendario','#fff')])
mp_rows=''.join(f'<tr><td>{html.escape(a)}</td><td>{html.escape(b)}</td><td>{(ic(c,22)+"<code>"+c+"</code>") if c in I else ("<code>"+c+"</code>")}</td><td><span class="st {"novo" if d=="Novo" else "mant" if d.startswith("Mantém") else ""}">{d}</span></td></tr>' for a,b,c,d in MAP)
page=f'''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>Pixel Icons, biblioteca de ícones do Hub</title>
<style>
:root{{ --ink:#15161C; --ink2:#5A5D6B; --line:#E6E6EC; --soft:#F5F5F8; --brand:#FF5A1F; --bg:#fff; color-scheme:light; box-sizing:border-box; padding-top:env(safe-area-inset-top,0px); padding-bottom:env(safe-area-inset-bottom,0px); }}
@media (prefers-color-scheme:dark){{ :root:not([data-theme="light"]){{ --ink:#F2F2F5; --ink2:#A4A7B4; --line:#2A2B33; --soft:#1C1D24; --bg:#121318; color-scheme:dark; }} }}
:root[data-theme="dark"]{{ --ink:#F2F2F5; --ink2:#A4A7B4; --line:#2A2B33; --soft:#1C1D24; --bg:#121318; color-scheme:dark; }}
*{{ box-sizing:border-box; }} html{{ scroll-padding-top:env(safe-area-inset-top,0px); }}
body{{ margin:0; background:var(--bg); color:var(--ink); font:16px/1.55 "Inter Tight","Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif; -webkit-font-smoothing:antialiased; }}
.p{{ fill:none; stroke:currentColor; stroke-width:1.5; stroke-linejoin:round; stroke-linecap:round }} .s{{ fill:currentColor; fill-opacity:.12; stroke:currentColor; stroke-width:1.5; stroke-linejoin:round; stroke-linecap:round }} .pl,.sl{{ fill:none; stroke:currentColor; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round }} .d{{ fill:currentColor }}
.ic{{ display:block; flex-shrink:0; }}
.wrap{{ max-width:1180px; margin:0 auto; padding:0 28px; }}
header.hero{{ background:#15161C; color:#fff; padding:64px 0 56px; }}
.hero h1{{ margin:0; font-size:clamp(40px,6vw,72px); line-height:1; letter-spacing:-.035em; font-weight:650; }}
.hero p.l{{ margin:18px 0 0; max-width:58ch; font-size:18px; color:rgba(255,255,255,.72); }}
.hrow{{ display:flex; flex-wrap:wrap; gap:28px 40px; margin-top:44px; }} .hr{{ display:inline-flex; }}
.meta{{ display:flex; flex-wrap:wrap; gap:28px; margin-top:44px; padding-top:22px; border-top:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.7); font-size:14.5px; }} .meta b{{ display:block; color:#fff; font-size:26px; letter-spacing:-.02em; font-weight:650; }}
section{{ padding:64px 0 0; }} h2{{ margin:0; font-size:30px; letter-spacing:-.025em; line-height:1.15; font-weight:650; }} .sub{{ margin:8px 0 0; color:var(--ink2); max-width:66ch; }}
.ref{{ display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:16px; margin-top:28px; }}
.rc{{ padding:20px; border-radius:20px; background:var(--soft); }} .rc .demo{{ height:72px; display:flex; align-items:center; gap:14px; color:var(--ink); }} .rc b{{ display:block; margin-top:14px; font-size:15.5px; }} .rc span{{ display:block; margin-top:4px; font-size:14px; color:var(--ink2); line-height:1.5; }}
.rules{{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:40px; margin-top:28px; align-items:start; }}
.kl{{ position:relative; aspect-ratio:1; max-width:420px; border-radius:24px; background:var(--soft); display:grid; place-items:center; color:var(--ink); }}
.kl svg.grid, .kl .big{{ position:absolute; left:9%; top:9%; width:82%; height:82%; }} .kl .big{{ z-index:1; }}
.rl{{ list-style:none; margin:0; padding:0; }} .rl li{{ display:grid; grid-template-columns:120px minmax(0,1fr); gap:16px; padding:14px 0; border-bottom:1px solid var(--line); }} .rl li:first-child{{ padding-top:0; }} .rl dt,.rl b{{ font-weight:600; }} .rl span{{ color:var(--ink2); }}
.tools{{ position:sticky; top:0; z-index:5; display:flex; flex-wrap:wrap; align-items:center; gap:10px 16px; margin-top:24px; padding:12px 0; background:var(--bg); border-bottom:1px solid var(--line); }}
.tools input{{ flex:1; min-width:200px; height:42px; padding:0 14px; border:1px solid var(--line); border-radius:12px; background:var(--bg); color:var(--ink); font:inherit; font-size:15px; }} .tools input:focus{{ outline:2px solid var(--ink); outline-offset:1px; }}
.seg{{ display:inline-flex; padding:3px; border-radius:12px; background:var(--soft); }} .seg button{{ height:34px; padding:0 12px; border:0; border-radius:9px; background:none; color:var(--ink2); font:inherit; font-size:14px; font-weight:550; cursor:pointer; }} .seg button[aria-pressed="true"]{{ background:var(--bg); color:var(--ink); box-shadow:0 1px 2px rgba(0,0,0,.12); }} .seg button:focus-visible{{ outline:2px solid var(--ink); }}
.cat{{ margin-top:36px; }} .cat h3{{ margin:0 0 14px; font-size:18px; font-weight:650; display:flex; gap:10px; align-items:baseline; }} .cat h3 em{{ font-style:normal; font-size:14px; color:var(--ink2); font-weight:500; }}
.grid{{ display:grid; grid-template-columns:repeat(auto-fill,minmax(132px,1fr)); gap:10px; }}
.it{{ display:flex; flex-direction:column; align-items:center; gap:12px; padding:22px 10px 14px; border:0; border-radius:16px; background:var(--tile); color:var(--fg); font:inherit; cursor:pointer; transition:transform .15s cubic-bezier(.2,0,0,1), box-shadow .15s; }}
.it:hover{{ box-shadow:0 0 0 1.5px var(--fg); }} .it:active{{ transform:scale(.97); }} .it:focus-visible{{ outline:2px solid var(--ink); outline-offset:2px; }}
.it .nm{{ font-size:13px; font-weight:600; opacity:.82; }} .it .ok{{ font-size:12.5px; opacity:.7; min-height:18px; }}
body{{ --tile:var(--soft); --fg:var(--ink); }} body.bg-escuro{{ --tile:#1D1E26; --fg:#fff; }} body.bg-cor .it{{ --tile:color-mix(in srgb,var(--c,#FF5A1F) 12%,#fff); --fg:var(--c,#C2410C); }}
.tbl{{ width:100%; border-collapse:collapse; margin-top:24px; font-size:15px; }} .tblw{{ overflow-x:auto; }} .tbl th{{ text-align:left; font-size:13.5px; font-weight:600; color:var(--ink2); padding:10px 12px; border-bottom:1px solid var(--line); }} .tbl td{{ padding:12px; border-bottom:1px solid var(--line); vertical-align:middle; }}
.tbl td:nth-child(3){{ display:flex; align-items:center; gap:10px; }} .tbl code{{ font:600 13px ui-monospace,SFMono-Regular,Menlo,monospace; color:var(--ink2); }}
.st{{ display:inline-flex; height:24px; align-items:center; padding:0 9px; border-radius:999px; background:var(--soft); font-size:12.5px; font-weight:650; color:var(--ink2); white-space:nowrap; }} .st.novo{{ background:#E8EFFF; color:#1F4FCC; }} .st.mant{{ background:#FFF3E5; color:#8A4B00; }}
footer{{ padding:64px 0 72px; color:var(--ink2); font-size:14px; }}
.toast{{ position:fixed; left:50%; bottom:calc(24px + env(safe-area-inset-bottom,0px)); transform:translateX(-50%) translateY(20px); opacity:0; padding:10px 16px; border-radius:12px; background:#15161C; color:#fff; font-size:14px; transition:all .2s; pointer-events:none; }} .toast.on{{ opacity:1; transform:translateX(-50%); }}
.sz-16 .it .ic{{ width:16px; height:16px; }} .sz-20 .it .ic{{ width:20px; height:20px; }} .sz-24 .it .ic{{ width:24px; height:24px; }} .sz-32 .it .ic{{ width:32px; height:32px; }} .sz-48 .it .ic{{ width:48px; height:48px; }}
@media (max-width:900px){{ .ref{{ grid-template-columns:1fr 1fr; }} .rules{{ grid-template-columns:1fr; }} .rl li{{ grid-template-columns:1fr; gap:2px; }} }}
@media (prefers-reduced-motion:reduce){{ *{{ transition:none !important; }} }}
</style></head><body class="sz-32">
<header class="hero"><div class="wrap"><h1>Pixel Icons</h1><p class="l">A biblioteca de ícones do Pixel AI Hub. Contorno de 1,5 px com um preenchimento translúcido na parte principal, no estilo duotone dos Smoooth Icons, ajustado ao vocabulário do produto: fases, agentes, skills, rotinas e o Consultor.</p>
<div class="hrow">{hero_row}</div><div class="meta"><span><b>{len(I)}</b>ícones</span><span><b>5</b>categorias</span><span><b>24 px</b>grade base</span><span><b>1,5 px</b>contorno, preenchimento a 12%</span></div></div></header>
<main class="wrap">
<section><h2>O que levamos da referência</h2><p class="sub">A versão duotone dos Smoooth Icons, de Daniel Wodziczka, deu a gramática: contorno escuro e um preenchimento claro só na parte que dá corpo ao objeto. Cinco traços definem a família.</p>
<div class="ref">
 <div class="rc"><div class="demo">{ic('mentorias',40)}{ic('kit',40)}</div><b>Contorno e corpo</b><span>Todo ícone é desenhado em contorno; a parte principal ganha um preenchimento a 12% da mesma cor. Funciona em qualquer cor, inclusive na de cada Pixel.</span></div>
 <div class="rc"><div class="demo">{ic('ajustes',40)}{ic('rotina',40)}</div><b>Um traço só</b><span>1,5 px em tudo, pontas e junções redondas. Linhas soltas (setas, alças, trajetos) não ganham preenchimento.</span></div>
 <div class="rc"><div class="demo">{ic('agentes',40)}{ic('calendario',40)}</div><b>Cantos suaves</b><span>Raio constante, sem quina viva. O agente ecoa o Pixel, com antena e olhos.</span></div>
 <div class="rc"><div class="demo">{ic('plano',40)}{ic('cerebro',40)}</div><b>Detalhes cheios</b><span>Pontos, olhos e botões pequenos ficam sólidos, para não sumirem em 16 e 20 px.</span></div>
 <div class="rc"><div class="demo">{ic('seta',40)}{ic('fechar',40)}</div><b>Ações sem corpo</b><span>Setas, fechar e check ficam só no contorno. Objetos ganham o preenchimento. A ação não compete com o conteúdo.</span></div>
</div></section>
<section><h2>Regras de desenho</h2><p class="sub">Para a biblioteca crescer sem perder a família.</p>
<div class="rules"><div class="kl"><svg class="grid" viewBox="0 0 24 24" aria-hidden="true"><rect x="0.05" y="0.05" width="23.9" height="23.9" fill="none" stroke="currentColor" stroke-width=".06" opacity=".35"/><rect x="2" y="2" width="20" height="20" fill="none" stroke="#FF5A1F" stroke-width=".08" stroke-dasharray=".4 .3"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width=".06" opacity=".35"/><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width=".06" opacity=".35"/><rect x="4" y="2" width="16" height="20" rx="2" fill="none" stroke="currentColor" stroke-width=".06" opacity=".25"/><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width=".06" opacity=".25"/></svg>{ic('agentes',260,'class="ic big"')}</div>
<ul class="rl"><li><b>Grade</b><span>24 × 24, com área viva de 20 × 20 (2 px de respiro). Formas-guia: círculo de 20, quadrado de 18, retângulos de 16 × 20 e 20 × 16.</span></li>
<li><b>Traço</b><span>1,5 px, pontas e junções redondas, igual em todos os ícones.</span></li>
<li><b>Raio</b><span>De 2 a 6 px conforme o tamanho da forma; objetos grandes usam 3 a 5.</span></li>
<li><b>Preenchimento</b><span>Só na parte que dá corpo ao objeto, a 12% da cor do contorno. Nunca duas cores diferentes no mesmo ícone.</span></li>
<li><b>Sobreposição</b><span>A forma da frente esconde a de trás: no código, uma máscara (&lt;mask&gt;) recorta o que fica atrás dela. A frente é transparente e funciona sobre qualquer fundo, sem depender da cor dele.</span></li>
<li><b>Tamanhos</b><span>16, 20 e 24 px na interface; 32 e 48 px em destaques.</span></li>
<li><b>Cor</b><span>Herda a cor do texto. Nas áreas e nas skills, a cor do Pixel da área. Marcas (WhatsApp, Telegram, Google) seguem com o logo oficial.</span></li></ul></div></section>
<section id="biblioteca"><h2>Biblioteca</h2><p class="sub">Clique num ícone para copiar o SVG.</p>
<div class="tools"><input id="q" type="search" placeholder="Buscar por nome ou uso: fase, skill, agenda…" aria-label="Buscar ícone">
 <div class="seg" role="group" aria-label="Fundo"><button data-bg="claro" aria-pressed="true">Claro</button><button data-bg="escuro" aria-pressed="false">Escuro</button><button data-bg="cor" aria-pressed="false">Cor do Pixel</button></div>
 <div class="seg" role="group" aria-label="Tamanho"><button data-sz="16" aria-pressed="false">16</button><button data-sz="20" aria-pressed="false">20</button><button data-sz="24" aria-pressed="false">24</button><button data-sz="32" aria-pressed="true">32</button><button data-sz="48" aria-pressed="false">48</button></div></div>
<div id="lib"></div></section>
<section><h2>Mapeamento: o que o Hub usa hoje</h2><p class="sub">Cada ícone atual do protótipo e o que entra no lugar. Os que não existiam aparecem como novos.</p>
<div class="tblw"><table class="tbl"><thead><tr><th>Hoje</th><th>Onde aparece</th><th>Pixel Icons</th><th>Situação</th></tr></thead><tbody>{mp_rows}</tbody></table></div></section>
</main><footer class="wrap">Pixel Icons, versão 2. Desenhada para o Pixel AI Hub a partir do estilo duotone dos Smoooth Icons, de Daniel Wodziczka. Os logotipos de terceiros não fazem parte da biblioteca.</footer>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script>
const D={json.dumps(data,ensure_ascii=False)}; const CATS={json.dumps(cats,ensure_ascii=False)};
const lib=document.getElementById("lib"), q=document.getElementById("q");
function render(){{ const t=(q.value||"").toLowerCase().trim(); lib.innerHTML=CATS.map(c=>{{ const its=D.filter(d=>d.c===c&&(!t||(d.n+" "+d.o).toLowerCase().includes(t))); if(!its.length) return "";
  return `<div class="cat"><h3>${{c}}<em>${{its.length}}</em></h3><div class="grid">${{its.map(d=>`<button class="it" data-n="${{d.n}}" style="${{d.cor?`--c:${{d.cor}}`:""}}" title="${{d.o}}"><svg class="ic" viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">${{d.svg}}</svg><span class="nm">${{d.n}}</span></button>`).join("")}}</div></div>`; }}).join("")||`<p class="sub">Nenhum ícone com “${{t}}”.</p>`; }}
render(); q.addEventListener("input",render);
lib.addEventListener("click",e=>{{ const b=e.target.closest(".it"); if(!b) return; const d=D.find(x=>x.n===b.dataset.n); const ok=()=>{{ const el=document.getElementById("toast"); el.textContent=`SVG de “${{d.n}}” copiado`; el.classList.add("on"); clearTimeout(window.__t); window.__t=setTimeout(()=>el.classList.remove("on"),1600); }}; try{{ navigator.clipboard.writeText(d.raw).then(ok,ok); }}catch(_){{ ok(); }} }});
document.querySelectorAll("[data-bg]").forEach(b=>b.addEventListener("click",()=>{{ document.querySelectorAll("[data-bg]").forEach(x=>x.setAttribute("aria-pressed",String(x===b))); document.body.classList.remove("bg-escuro","bg-cor"); if(b.dataset.bg!=="claro") document.body.classList.add("bg-"+b.dataset.bg); }}));
document.querySelectorAll("[data-sz]").forEach(b=>b.addEventListener("click",()=>{{ document.querySelectorAll("[data-sz]").forEach(x=>x.setAttribute("aria-pressed",String(x===b))); document.body.className=document.body.className.replace(/sz-\\d+/,"sz-"+b.dataset.sz); }}));
</script></body></html>'''
open(__import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)),'..','..','pixel-icons.html'),'w',encoding='utf-8').write(page); print(len(page))
