# Pixel Hub 2.0 · instruções para o Claude Code

Projeto de design da :Zero para a Pixel Educação. Quem lidera: Johnson Carvalho (UX Sênior).
Protótipo navegável em HTML de arquivo único da plataforma Pixel AI Hub. Estado completo e histórico em `briefing-novo-chat.md` (a seção "Estado atual" é a fonte da verdade). Decisões em `context.md`.

## Arquivos
- `pixel-hub-produto.html` — fonte do produto. Toda mudança entra aqui.
- `artifacts/14a3f57a-3141-46b5-8063-a9e1139f35da/index.html` — protótipo completo (abre no onboarding), com o produto embutido em base64. O bloco `<style id="pxi-casca">` … `<script id="pxi-casca-js">` é do onboarding; o embed preserva.
- `home/pixel-hub-produto-home.html` — versão que abre direto no Início (gerada).
- `fontes/embed.py` — gera as duas versões acima a partir do produto.
- `fontes/imersiva.py` — embute a entrevista imersiva (`exploracoes/entrevista-imersiva`, `npm run build` gera `embed.html`) no produto, como versão em teste; rodar antes do `embed.py` quando a exploração mudar.
- `fontes/*.js|css` — cópias dos blocos acrescentados (referência). `fontes/ui-revisada.css` é o `<style id="ui-rev">` inteiro (Sistema visual: Revisado | Anterior); `fontes/entrevista-bloco.js` dá o formato do bloco de pergunta da entrevista. `fontes/plano-equipe.js` (Plano › Equipe, c41), `fontes/plano-reais.js` (R$ com o custo da hora, c43), `fontes/a11y.js` (foco e selo).
- `fontes/icones/` — biblioteca Pixel Icons: `icons.py` (geometria), `v2.py` (estilo atual, gera `icons2.json`), `mascaras.py` (recortes por máscara; `python3 mascaras.py` roda o autoteste), `build.py` (gera `pixel-icons.html`).
- `artifacts/*-your-edit`, `legado/`, `pixel-hub-prototipo*.html` — histórico; não usar como guia.

## Como trabalhar
- Mudança no produto: acrescentar blocos `<style>` e `<script>` no fim de `pixel-hub-produto.html`, antes de `</body>`, sobrescrevendo funções (`telaInicio`, `lateral`, `frListaNova`, `frTplDrawer`, `esC`, `esMapaLista`, `tcAgora`, `hoProximo`, `cardEtapa`, `bk7Drawer`, `view`) ou trocando trechos exatos. `S` é o estado, `A` o mapa de ações, `R()` re-renderiza. Um script final repinta no `DOMContentLoaded`.
- Depois de mudar: `python3 fontes/embed.py`.
- Testar com Playwright em 1440 × 900 e 390 × 844, nos três perfis (admin, membro, individual): sem erros no console e sem rolagem lateral.
- Ícones: mapa `PXI`; classes `ip` (frente, transparente; recorta o que vem antes por `<mask>`, bloco em `fontes/mascaras.js`; `--icbg` não é mais usado), `is` (corpo, 12%), `ipl` (linha), `idt` (detalhe sólido); traço 1,5 px. Ícone antigo é trocado via `PXI_ANTIGOS`.
- Cores: ação da jornada laranja `#C9420C` (hover `#B93C0A`); "agora" azul `#1F4FCC` (`--agora-forte #2E6BFF`); marca `#FF5A1F`. Espaçamento em escala de 4.
- Vocabulário: "fase" em toda a jornada; "Conteúdo complementar".

## Preferências do Johnson
- Português do Brasil, feedback direto, iteração curta. Nada inventado: o que for exemplo, dizer que é exemplo.
- Pesquisar referências (Mobbin, buscas amplas) antes de redesenhar e dizer quais foram usadas.
- Reaproveitar componentes existentes; não criar formato novo onde já há padrão.
- Clareza, simplicidade e elegância: melhorar por copy e hierarquia antes de acrescentar elementos. Um bloco, uma ideia, uma ação.
- Aplicar sem pedir permissão a cada ajuste.
- Em grandes atualizações, atualizar `briefing-novo-chat.md` sem ele pedir.

## Pendências abertas
Ver "Pendências e decisões em aberto" em `briefing-novo-chat.md` (c06 catálogo de skills, c37 validação com dev, datas dos hands-on, capa do vídeo do Bruno).
