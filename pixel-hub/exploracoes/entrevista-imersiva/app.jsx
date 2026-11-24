/* Entrevista imersiva (exploração, 19/11). Fora do fluxo do protótipo.
   A conversa acontece numa tela só: o Consultor "fala" pelo anel (a pergunta surge palavra por palavra e o anel acompanha),
   o anel escuta enquanto a pessoa digita e pensa depois de cada resposta. Só texto, como pede o c39: o anel é movido pelo ritmo
   da fala do Consultor e da digitação, nunca pelo microfone. O que é capturado aparece ao vivo, ainda durante a digitação. */
import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { VoiceRing, VoiceOrb } from "voice-ring";

const PASSO_PALAVRA = 28; // ms entre o começo de uma palavra e o da seguinte
/* dentro do protótipo do Hub (tweak "Entrevista: Imersiva"), a página recebe __EMBED e o nome, e avisa o Hub ao sair e ao terminar */
const EMB = typeof window !== "undefined" && !!window.__EMBED, NOME = (typeof window !== "undefined" && window.__NOME) || "";
const avisarHub = msg => { try { parent.postMessage({ px: "entrevista-imersiva", ...msg }, "*"); } catch (e) {} };
const RM = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* o que a demonstração reconhece no texto (exemplo: num produto real, quem extrai é o modelo) */
const FERR = [[/whats/i, "WhatsApp Business"], [/planilha|excel|sheets/i, "Planilhas"], [/e-?mail/i, "E-mail"], [/\bcrm\b|pipedrive|hubspot/i, "CRM"], [/\berp\b|bling|omie/i, "ERP"], [/chatgpt|claude|gemini/i, "ChatGPT ou outra IA"], [/notion/i, "Notion"], [/instagram/i, "Instagram"], [/drive/i, "Google Drive"]];
const AREAS = [[/orçament|vend|proposta|lead/i, "Vendas e comercial"], [/client|atend|\brespond/i, "Atendimento ao cliente"], [/cobran|financ|boleto|pagament/i, "Financeiro e cobrança"], [/relat[óo]rio|indicador|planilha/i, "Relatórios e processos internos"], [/pedido|entreg|estoque|produ/i, "Operações e entrega"], [/\bposts?\b|conte[úu]do|campanha|an[úu]ncio/i, "Marketing e conteúdo"]];
const ROTINA = /\b(todo|toda|todos|todas|sempre|cada)\b[^.!?]*|\b(confiro|mando|monto|fecho|respondo|atualizo|preparo|reviso)\b[^.!?]*/gi;
const achar = (txt, lista) => [...new Set(lista.filter(([re]) => re.test(txt)).map(([, n]) => n))];
const trechos = txt => [...new Set((String(txt).match(ROTINA) || []).map(s => s.trim().replace(/^./, c => c.toUpperCase())).filter(s => s.length > 12))].slice(0, 3);

const IA = ["Ainda não uso no trabalho", "Uso de vez em quando, por conta própria", "Uso todo dia, com prompts que reaproveito", "Já tenho automações ou agentes rodando"];
const FREQ = [["Todo dia", 22], ["Algumas vezes por semana", 10], ["Uma vez por semana", 4], ["Uma vez por mês", 1]];
const TEMPO = [["Até 15 min", 0.2], ["15 a 30 min", 0.4], ["30 min a 1 h", 0.75], ["1 a 2 h", 1.5], ["Mais de 2 h", 2.5]];
const PARTES = ["Sua rotina", "As áreas", "A conta"];

const PASSOS = [
  { id: "rotina", parte: 0, tipo: "texto", q: "Para começar: como é uma semana normal sua no trabalho? Conte do seu jeito, sem pressa.",
    ex: "Passo boa parte do dia no WhatsApp respondendo clientes e montando orçamentos. Toda manhã confiro os orçamentos sem resposta e mando mensagem um por um. Na sexta fecho o relatório de vendas na planilha." },
  { id: "ferr", parte: 0, tipo: "tags", q: "Quais ferramentas entram nisso? Já marquei as que você citou.", ops: ["WhatsApp Business", "Planilhas", "E-mail", "CRM", "ERP", "ChatGPT ou outra IA", "Notion", "Google Drive", "Instagram"] },
  { id: "ia", parte: 0, tipo: "escolha", q: "E a IA: quanto ela já faz parte do seu trabalho hoje?", ops: IA },
  { id: "areas", parte: 1, tipo: "tags", q: "Em quais áreas você sente que o tempo mais escorre?", ops: AREAS.map(a => a[1]) },
  { id: "processo", parte: 1, tipo: "texto", q: "Escolha um processo que toma tempo e me conte como ele acontece hoje, do começo ao fim.",
    ex: "Todo dia de manhã alguém abre a planilha de orçamentos, vê quem não respondeu há mais de 3 dias e manda mensagem um por um pelo WhatsApp. Leva umas duas horas." },
  { id: "ritmo", parte: 1, tipo: "ritmo", q: "Com que frequência esse processo acontece, e quanto tempo leva cada vez?" },
  { id: "conta", parte: 2, tipo: "conta", q: "Fiz a conta com o que você me contou. Confere?" },
];


function Presenca({ tipo, estado, nivel, emocao, size }) {
  const comum = { state: estado, level: nivel, emotion: emocao, size, theme: "light", calm: 0.35, "aria-label": "Consultor Pixel AI" };
  if (tipo === "pixel") return <VoiceOrb type="pixel" color="#FF5A1F" {...comum} />;
  return <VoiceRing type={tipo === "mono" ? "mono" : "ring"} {...comum} />;
}

function App() {
  const [larg, setLarg] = useState(typeof innerWidth === "number" ? innerWidth : 1440);
  useEffect(() => { const f = () => setLarg(innerWidth); addEventListener("resize", f); return () => removeEventListener("resize", f); }, []);
  const [i, setI] = useState(-1);                  // -1 abertura · PASSOS.length fim
  const [estado, setEstado] = useState("idle");    // idle | speaking | listening | processing
  const [fala, setFala] = useState({ eco: "", q: "" });
  const [vis, setVis] = useState(0);               // caracteres já ditos
  const [txt, setTxt] = useState("");
  const [sel, setSel] = useState([]);
  const [ritmo, setRitmo] = useState({ freq: "", tempo: "" });
  const [r, setR] = useState({});                  // respostas
  const [mem, setMem] = useState({ ferr: [], areas: [], proc: [], ia: "", princ: "" });
  const [novo, setNovo] = useState([]); // seções que acabaram de receber algo
  const [aberto, setAberto] = useState(undefined); // accordion aberto; "" = todos fechados pela pessoa
  const [ult, setUlt] = useState("");
  const [tipo, setTipo] = useState("ring");
  const [conversa, setConversa] = useState([]);
  const [verConversa, setVerConversa] = useState(false);
  const [memAberta, setMemAberta] = useState(false);
  const nivel = useRef(0), tecla = useRef(0), campo = useRef(null);
  const passo = PASSOS[i];
  const total = fala.eco.length + fala.q.length;
  const dizendo = estado === "speaking" && vis < total;
  /* a fala entra palavra a palavra, cada uma num fade curto que se sobrepõe à seguinte */
  const palavras = useMemo(() => [...fala.eco.split(/\s+/).filter(Boolean).map(t => ({ t, eco: true })), ...fala.q.split(/\s+/).filter(Boolean).map(t => ({ t }))], [fala]);

  /* o anel lê este getter a cada quadro: fala do Consultor, digitação da pessoa ou silêncio */
  const getNivel = useMemo(() => () => nivel.current, []);
  useEffect(() => { let raf; const loop = () => { tecla.current *= 0.9; if (estado === "listening") nivel.current = Math.min(1, tecla.current); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf); }, [estado]);

  /* a fala aparece de uma vez, num fade; o anel "fala" por um instante junto (pedido de 23/11: o letra a letra demorava) */
  useEffect(() => {
    if (estado !== "speaking") return;
    setVis(total);
    const fim = () => { nivel.current = 0; setEstado(i >= PASSOS.length ? "idle" : "listening"); campo.current?.focus(); };
    if (RM) { fim(); return; }
    const t0 = performance.now(); let raf;
    const dur = (palavras.length * PASSO_PALAVRA + 700) / 1000; // o anel fala enquanto as palavras entram
    const loop = now => { const t = (now - t0) / 1000, env = Math.sin(Math.min(1, t / dur) * Math.PI); nivel.current = Math.max(0, env * (.5 + .22 * Math.sin(t * 9) + .12 * Math.sin(t * 3.7))); if (t < dur) raf = requestAnimationFrame(loop); else fim(); };
    raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf);
  }, [estado, total]);

  function dizer(eco, q, prox) {
    setFala({ eco: eco ? eco + " " : "", q }); setVis(0); setI(prox); setEstado("speaking");
    setConversa(c => c.concat([{ quem: "c", t: (eco ? eco + " " : "") + q }]));
  }
  function guardar(k, v, troca) { const vs = [].concat(v).filter(Boolean), atual = [].concat(mem[k] || []); const nov = vs.filter(x => !atual.includes(x)); if (!vs.length && !troca) return;
    setMem(m => ({ ...m, [k]: troca ? vs : Array.isArray(m[k]) ? [...new Set(m[k].concat(vs))] : vs[0] })); if (!nov.length) return; // nada novo: nada acende
    setUlt(nov[nov.length - 1]); setAberto(k); setNovo(n => [...new Set(n.concat(k))]); setTimeout(() => setNovo(n => n.filter(x => x !== k)), 1600); }

  /* captura ao vivo: enquanto a pessoa escreve, aparece o que o Consultor está entendendo */
  const aoVivo = useMemo(() => passo && passo.tipo === "texto" ? { ferr: achar(txt, FERR).filter(f => !mem.ferr.includes(f)), areas: achar(txt, AREAS).filter(a => !mem.areas.includes(a)), proc: trechos(txt) } : null, [txt, i]);

  function responder(valor, rotulo) {
    const p = passo; const nr = { ...r, [p.id]: valor }; setR(nr);
    setConversa(c => c.concat([{ quem: "p", t: rotulo || (Array.isArray(valor) ? valor.join(", ") : valor) }]));
    setTxt(""); setSel([]); setEstado("processing"); nivel.current = 0;
    let eco = "";
    if (p.id === "rotina") { const f = achar(valor, FERR), a = achar(valor, AREAS), pr = trechos(valor); guardar("ferr", f); guardar("areas", a); guardar("proc", pr);
      eco = pr.length ? `Anotei ${pr.length === 1 ? "uma rotina" : pr.length + " rotinas"} que se repetem${f.length ? ` e ${f.length === 1 ? "uma ferramenta" : f.length + " ferramentas"}` : ""}.` : "Entendi."; }
    if (p.id === "ferr") { guardar("ferr", valor, true); eco = `${valor.length} ferramentas no mapa.`; }
    if (p.id === "ia") { guardar("ia", valor); eco = /Ainda não|vez em quando/.test(valor) ? "Bom ponto de partida: dá para avançar rápido." : "Você já tem uma base boa para começar."; }
    if (p.id === "areas") { guardar("areas", valor); eco = valor.length > 1 ? `${valor[0]} e mais ${valor.length - 1}. Vamos olhar um processo de perto.` : `${valor[0]}. Vamos olhar um processo de perto.`; }
    if (p.id === "processo") { guardar("ferr", achar(valor, FERR)); guardar("princ", String(valor).split(/(?<=[.!?])\s/)[0]); eco = "Esse eu entendi bem."; }
    if (p.id === "ritmo") { eco = "Pronto, tenho os números."; setAberto("princ"); setNovo(n => [...new Set(n.concat("princ"))]); setTimeout(() => setNovo(n => n.filter(x => x !== "princ")), 1600); }
    const prox = i + 1;
    setTimeout(() => {
      if (prox >= PASSOS.length) { dizer("", "Seu Plano está montado. Ele já começa por esse processo.", prox); return; }
      dizer(eco, PASSOS[prox].q, prox);
      if (PASSOS[prox].id === "ferr") setSel(mem.ferr.concat(achar(nr.rotina || "", FERR)).filter((v, k, a) => a.indexOf(v) === k));
    }, RM ? 100 : 1100);
  }

  const horas = (() => { const f = FREQ.find(x => x[0] === (r.ritmo || ritmo).freq), t = TEMPO.find(x => x[0] === (r.ritmo || ritmo).tempo); return f && t ? Math.round(f[1] * t[1]) : null; })();
  const legenda = { idle: i < 0 ? "Pronto quando você quiser" : "Entrevista concluída", speaking: "O Consultor está falando", listening: "Ouvindo você", processing: "Juntando com o que você já disse" }[estado];
  const parte = i < 0 ? -1 : i >= PASSOS.length ? 3 : passo.parte;
  const TEMAS = [["princ", "Processo", "o processo principal", 4], ["proc", "Rotinas", "as rotinas", 0], ["areas", "Áreas que mais pesam", "as áreas", 3], ["ferr", "Ferramentas", "as ferramentas", 1], ["ia", "IA hoje", "a IA hoje", 2]]; // o último número: a etapa que preenche o tema
  const cheio = k => Array.isArray(mem[k]) ? mem[k].length > 0 : !!mem[k], vazios = TEMAS.filter(([k]) => !cheio(k)), faltam = vazios.filter(t => i <= t[3]), nTemas = TEMAS.length - vazios.length;
  /* cada tema é um accordion; fica aberto só um: o que recebeu algo por último ou, sem isso, o primeiro preenchido */
  const abertoEf = aberto === undefined || (aberto && !cheio(aberto)) ? (TEMAS.find(([k]) => cheio(k)) || [])[0] : aberto;
  const plural = (n, um, varios) => n === 1 ? "1 " + um : n + " " + varios;
  const rit = r.ritmo || ritmo, sec = (k, n, resumo, corpo) => cheio(k) && <section key={k} className={"ei-g" + (k === "princ" ? " ei-princ" : "") + (abertoEf === k ? " on" : "")}>
    <h3 className="ei-g-h"><button className="ei-ac" aria-expanded={abertoEf === k} aria-controls={"ei-ac-" + k} onClick={() => setAberto(abertoEf === k ? "" : k)}>
      <span className="ei-ac-n">{n}</span>{abertoEf !== k && <span className="ei-sr">: </span>}{novo.includes(k) && <span className="ei-agora" aria-hidden="true">agora</span>}
      {abertoEf !== k && <span className="ei-ac-r">{resumo}</span>}
      <svg className="ei-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 14.5 12 9l5.5 5.5" /></svg></button></h3>
    <div className="ei-ac-c" id={"ei-ac-" + k} hidden={abertoEf !== k}>{corpo}</div></section>;
  const podeResponder = estado === "listening" || (estado === "speaking" && !dizendo);
  const tamanho = larg < 700 ? 150 : 228, movel = larg <= 900; // no celular a lista vira folha

  function digitar(e) { setTxt(e.target.value); tecla.current = Math.min(1, tecla.current + 0.45); if (estado === "speaking" && !dizendo) setEstado("listening"); }

  return (
    <div className="ei">
      <div className="ei-haze" aria-hidden="true"></div>
      <header className="ei-top">
        <span className="ei-logo"><svg className="px" viewBox="0 0 40 46" aria-hidden="true" style={{ width: 22 }}><rect className="px-h" x="15" y="0" width="10" height="10" rx="3" /><rect className="px-b" x="0" y="12" width="40" height="34" rx="12" /><g className="px-e"><rect x="10.5" y="21.5" width="6" height="13" rx="3" /><rect x="23.5" y="21.5" width="6" height="13" rx="3" /></g></svg><b>Entrevista com o Consultor</b></span>
        <ol className="ei-partes" aria-label="Partes da entrevista">{PARTES.map((n, k) => <li key={n} className={k < parte ? "ok" : k === parte ? "at" : ""} aria-current={k === parte ? "step" : undefined}><i></i><span>{n}</span></li>)}</ol>
        {EMB && <button className="ei-lnk ei-sair" onClick={() => avisarHub({ acao: "sair" })}>Fazer depois</button>}
        <div className="ei-seg" role="group" aria-label="Presença do Consultor (exploração)">{[["ring", "Anel"], ["mono", "Anel mono"], ["pixel", "Pixel"]].map(([k, n]) => <button key={k} aria-pressed={tipo === k} onClick={() => setTipo(k)}>{n}</button>)}</div>
      </header>

      <main className="ei-m">
        <section className="ei-palco" aria-label="Conversa">
          <div className={"ei-anel " + estado}><Presenca tipo={tipo} estado={estado} nivel={getNivel} emocao={i >= PASSOS.length ? "positive" : estado === "processing" ? null : "calm"} size={tamanho} /></div>
          <p className="ei-leg" aria-hidden="true">{legenda}</p>

          {i < 0 ? (
            <div className="ei-abre">
              <h1>{NOME ? `${NOME}, vamos conversar sobre o seu trabalho` : "Vamos conversar sobre o seu trabalho"}</h1>
              <p>Uns 15 minutos, só por texto. Você escreve do seu jeito e eu vou mostrando o que entendi. No fim, você confere a conta antes de virar plano.</p>
              <button className="ei-btn jornada" onClick={() => dizer("", PASSOS[0].q, 0)}>Começar a entrevista</button>
            </div>
          ) : (
            <>
              <div className="ei-fala" key={fala.eco + fala.q} aria-hidden="true">{palavras.map((w, k) => <span key={k}><span className={"ei-w" + (w.eco ? " eco" : "")} style={{ animationDelay: `${k * PASSO_PALAVRA}ms` }}>{w.t}</span>{" "}</span>)}</div>
              <p className="ei-sr" aria-live="polite">{estado !== "speaking" || !dizendo ? fala.eco + fala.q : ""}</p>

              {i < PASSOS.length && !dizendo && estado !== "processing" && (
                <div className="ei-resp">
                  {passo.tipo === "texto" && (<>
                    <div className={"ei-in " + (estado === "listening" && txt ? "on" : "")}>
                      <textarea id={"in-" + passo.id} ref={campo} rows={3} value={txt} onChange={digitar} placeholder="Escreva aqui" aria-label={passo.q}
                        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (txt.trim()) responder(txt.trim()); } }} />
                      <div className="ei-in-b">
                        <button className="ei-lnk" onClick={() => { setTxt(passo.ex); setEstado("listening"); tecla.current = 0.8; campo.current?.focus(); }}>Usar um exemplo</button>
                        <button className="ei-btn" disabled={!txt.trim()} onClick={() => responder(txt.trim())}>Enviar</button>
                      </div>
                    </div>
                    {aoVivo && (aoVivo.ferr.length + aoVivo.areas.length + aoVivo.proc.length > 0) && (
                      <p className="ei-vivo" aria-live="polite"><span>Estou entendendo:</span>{aoVivo.proc.map(x => <em key={x} className="p">{x}</em>)}{aoVivo.ferr.map(x => <em key={x}>{x}</em>)}{aoVivo.areas.map(x => <em key={x} className="a">{x}</em>)}</p>
                    )}
                  </>)}
                  {passo.tipo === "tags" && (<>
                    <div className="ei-chips" role="group" aria-label={passo.q}>{passo.ops.map(o => <button key={o} className="ei-ch" aria-pressed={sel.includes(o)} onClick={() => setSel(s => s.includes(o) ? s.filter(x => x !== o) : s.concat(o))}>{o}</button>)}</div>
                    <button className="ei-btn" disabled={!sel.length} onClick={() => responder(sel)}>Continuar</button>
                  </>)}
                  {passo.tipo === "escolha" && <div className="ei-ops" role="group" aria-label={passo.q}>{passo.ops.map(o => <button key={o} className="ei-op" onClick={() => responder(o)}>{o}</button>)}</div>}
                  {passo.tipo === "ritmo" && (<>
                    <p className="ei-k">Frequência</p>
                    <div className="ei-chips" role="radiogroup" aria-label="Frequência">{FREQ.map(([o]) => <button key={o} role="radio" className="ei-ch" aria-checked={ritmo.freq === o} onClick={() => setRitmo(x => ({ ...x, freq: o }))}>{o}</button>)}</div>
                    <p className="ei-k">Cada vez</p>
                    <div className="ei-chips" role="radiogroup" aria-label="Tempo de cada vez">{TEMPO.map(([o]) => <button key={o} role="radio" className="ei-ch" aria-checked={ritmo.tempo === o} onClick={() => setRitmo(x => ({ ...x, tempo: o }))}>{o}</button>)}</div>
                    <button className="ei-btn" disabled={!ritmo.freq || !ritmo.tempo} onClick={() => responder(ritmo, `${ritmo.freq}, ${ritmo.tempo.toLowerCase()} cada vez`)}>Continuar</button>
                  </>)}
                  {passo.tipo === "conta" && (
                    <div className="ei-conta">
                      <p className="ei-num"><b>≈ {horas} h</b><span>por mês voltam para você, só nesse processo</span></p>
                      <p className="ei-prem">Estimativa: {(r.ritmo || {}).freq?.toLowerCase()} × {(r.ritmo || {}).tempo?.toLowerCase()} cada vez.</p>
                      <div className="ei-row"><button className="ei-btn jornada" onClick={() => responder("ok", "Confere, pode montar o plano")}>Confere, pode montar o plano</button><button className="ei-lnk" onClick={() => { setI(i - 1); setEstado("listening"); }}>Corrigir os números</button></div>
                    </div>
                  )}
                </div>
              )}
              {i >= PASSOS.length && !dizendo && (
                <div className="ei-fim">
                  <p>O Plano já tem a sua rotina, {mem.ferr.length} ferramentas, {mem.areas.length} áreas e o primeiro processo para virar agente{horas != null ? `, com cerca de ${horas} h por mês na mesa` : ""}.</p>
                  <div className="ei-row">{EMB ? <button className="ei-btn jornada" onClick={() => avisarHub({ acao: "fim", dados: { ...mem, rotina: r.rotina || "", processo: r.processo || "", ritmo: r.ritmo || ritmo } })}>Abrir o Plano Agêntico</button> : <a className="ei-btn jornada" href="https://claude.ai/artifact/N58xZ5eyVrZHReRKUvym59" target="_blank" rel="noopener">Abrir o protótipo do Hub</a>}<button className="ei-lnk" onClick={() => { setI(-1); setEstado("idle"); setR({}); setMem({ ferr: [], areas: [], proc: [], ia: "", princ: "" }); setConversa([]); setRitmo({ freq: "", tempo: "" }); setUlt(""); setNovo([]); setMemAberta(false); setAberto(undefined); setFala({ eco: "", q: "" }); }}>Recomeçar</button></div>
                </div>
              )}
              {conversa.length > 1 && <button className="ei-lnk ei-ver" aria-expanded={verConversa} aria-controls="ei-conv" onClick={() => setVerConversa(v => !v)}>{verConversa ? "Esconder a conversa" : "Ver a conversa"}</button>}
              {verConversa && <ol className="ei-conv" id="ei-conv">{conversa.map((m, k) => <li key={k} className={m.quem}><b>{m.quem === "c" ? "Consultor" : "Você"}</b>{m.t}</li>)}</ol>}
            </>
          )}
        </section>

        <aside className={"ei-mem " + (memAberta ? "aberta" : "")} aria-label="O que eu já entendi">
          {movel
            ? <button className="ei-mem-t" aria-expanded={memAberta} aria-controls="ei-mem-c" onClick={() => setMemAberta(v => !v)}>
                <span className="ei-mem-tt"><b>O que eu já entendi</b><small>{nTemas} de {TEMAS.length} temas</small></span>
                {ult && !memAberta && <span className="ei-mem-ult">{ult}</span>}
                <svg className="ei-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 14.5 12 9l5.5 5.5" /></svg>
              </button>
            : <div className="ei-mem-t"><div className="ei-mem-tt"><h2>O que eu já entendi</h2><small>{nTemas} de {TEMAS.length} temas</small></div></div>}
          <div className="ei-mem-c" id="ei-mem-c" role="group" tabIndex={0} aria-label="O que eu já entendi, em detalhe">
            {sec("princ", "Processo", horas != null ? `≈ ${horas} h/mês` : "1 processo", <>{horas != null && <p className="ei-ph"><b>≈ {horas} h</b><span>por mês</span></p>}<p className="ei-pt">{mem.princ}</p>{(rit.freq || rit.tempo) && <p className="ei-pm">{[rit.freq, rit.tempo && rit.tempo.toLowerCase() + " cada vez"].filter(Boolean).join(" · ")}</p>}</>)}
            {sec("proc", "Rotinas", plural(mem.proc.length, "rotina", "rotinas"), <ul className="ei-rot">{mem.proc.map(x => <li key={x}>{x}</li>)}</ul>)}
            {sec("areas", "Áreas que mais pesam", plural(mem.areas.length, "área", "áreas"), <div className="ei-tags">{mem.areas.map(x => <em key={x} className="ei-tag a">{x}</em>)}</div>)}
            {sec("ferr", "Ferramentas", plural(mem.ferr.length, "ferramenta", "ferramentas"), <div className="ei-tags">{mem.ferr.map(x => <em key={x} className="ei-tag">{x}</em>)}</div>)}
            {sec("ia", "IA hoje", ["Ainda não usa", "De vez em quando", "Todo dia", "Já tem agentes"][IA.indexOf(mem.ia)] || mem.ia, <p className="ei-pv">{mem.ia}</p>)}
            {!nTemas && <p className="ei-falta">Vou anotando aqui o que você contar.</p>}
            <p className="ei-nota">Dados de exemplo.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}

createRoot(document.getElementById("app")).render(<App />);
