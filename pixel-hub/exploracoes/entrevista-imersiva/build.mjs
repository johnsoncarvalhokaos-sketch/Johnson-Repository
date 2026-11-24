// Monta index.html: um arquivo só, com React, voice-ring (MIT) e o app embutidos. Rodar: npm install && npm run build
import { build } from "esbuild";
import { readFileSync, writeFileSync } from "node:fs";

const r = await build({ entryPoints: ["app.jsx"], bundle: true, minify: true, format: "iife", jsx: "automatic", write: false, target: "es2020", define: { "process.env.NODE_ENV": '"production"' } });
const js = r.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const css = readFileSync("estilo.css", "utf8");
const html = `<title>Entrevista imersiva</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@500;600&family=Funnel+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
<div id="app"></div>
<script>${js}</script>
`;
writeFileSync("index.html", html);
// versão para dentro do protótipo do Hub: documento completo, com __EMBED (o produto embute este arquivo)
writeFileSync("embed.html", `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><script>window.__EMBED=1</script><style>body{margin:0}</style>${html}</html>`);
console.log("index.html", (html.length / 1024).toFixed(0) + " KB");
