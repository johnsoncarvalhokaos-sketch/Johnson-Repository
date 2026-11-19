<style>
/* Pixel Icons: recortes por máscara (19/11). A frente (.ip) não pinta mais com a cor do fundo (--icbg): fica transparente e recorta, por <mask>, o que vem antes dela. Funciona em hover, cartões coloridos e qualquer fundo. */
svg .ip{ fill:none; }
/* play cheio nos botões e selos de cor sólida, como já aparecia */
.btn-p svg .ip, .mj-pi svg .ip{ fill:currentColor; }
</style>
<script>
(function(){
  const NS="http://www.w3.org/2000/svg"; let n=0;
  function mascara(box){
    if(box.querySelector(":scope > defs.pxm")) return;
    const els=[...box.children].filter(e=>e.tagName!=="defs"&&e.tagName!=="title");
    const fr=els.filter(e=>e.classList.contains("ip"));
    const defs=document.createElementNS(NS,"defs"); defs.setAttribute("class","pxm"); box.insertBefore(defs,box.firstChild);
    let seg=[], m=0;
    const fecha=()=>{ // o trecho antes da frente m some onde as frentes m, m+1… estiverem
      if(!seg.length||m>=fr.length) return;
      const id="pxm"+(++n), mk=document.createElementNS(NS,"mask");
      mk.id=id; mk.setAttribute("maskUnits","userSpaceOnUse"); ["x","y"].forEach(a=>mk.setAttribute(a,"-2")); ["width","height"].forEach(a=>mk.setAttribute(a,"28"));
      const r=document.createElementNS(NS,"rect"); ["x","y"].forEach(a=>r.setAttribute(a,"-2")); ["width","height"].forEach(a=>r.setAttribute(a,"28")); r.setAttribute("fill","#fff"); mk.appendChild(r);
      fr.slice(m).forEach(f=>{ const c=f.cloneNode(false); c.removeAttribute("class"); c.removeAttribute("style"); c.setAttribute("fill","#000"); c.setAttribute("stroke","none"); mk.appendChild(c); });
      defs.appendChild(mk);
      const g=document.createElementNS(NS,"g"); g.setAttribute("mask","url(#"+id+")"); box.insertBefore(g,seg[0]); seg.forEach(e=>g.appendChild(e));
    };
    els.forEach(e=>{ if(e.classList.contains("ip")){ fecha(); seg=[]; m++; } seg.push(e); });
  }
  function tudo(){ const bx=new Set(); document.querySelectorAll("svg .ip").forEach(f=>{ if(f.parentNode.tagName!=="g"||!f.parentNode.hasAttribute("mask")) bx.add(f.parentNode); }); bx.forEach(mascara); }
  tudo(); new MutationObserver(tudo).observe(document.documentElement,{childList:true,subtree:true});
})();
</script>
