# Recortes por máscara: a forma da frente (class="p") deixa de pintar com a cor do fundo (--icbg)
# e passa a recortar, por <mask>, tudo o que vem antes dela. Fica transparente em qualquer fundo.
import re

def mascarar(svg, uid, frente='p'):
    els = re.findall(r'<[^>]+/>', svg)
    eh = [f'class="{frente}"' in e for e in els]
    idx = [i for i, f in enumerate(eh) if f]
    if not idx: return svg
    defs, out, seg, m = [], [], [], 0
    def fecha():
        # o trecho antes da frente m some onde as frentes m, m+1… estiverem
        if not seg: return
        if m >= len(idx): out.extend(seg); return
        mid = f'{uid}-{m}'
        cortes = ''.join(re.sub(r'\s*class="[^"]*"', '', els[i])[:-2] + ' fill="#000"/>' for i in idx[m:])
        defs.append(f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="-2" y="-2" width="28" height="28"><rect x="-2" y="-2" width="28" height="28" fill="#fff"/>{cortes}</mask>')
        out.append(f'<g mask="url(#{mid})">{"".join(seg)}</g>')
    for e, f in zip(els, eh):
        if f: fecha(); seg, m = [], m + 1  # a frente não recorta a si mesma
        seg.append(e)
    fecha()
    return f'<defs>{"".join(defs)}</defs>' + ''.join(out)

if __name__ == '__main__':
    a = '<path class="s" d="M1 1h10v10z"/><rect class="p" x="2" y="2" width="4" height="4"/><path class="d" d="M0 0"/>'
    r = mascarar(a, 't')
    assert r.count('<mask') == 1 and 'url(#t-0)' in r and 'fill="#000"' in r, r
    assert r.index('class="s"') < r.index('class="p"') and r.endswith('<path class="d" d="M0 0"/>'), r
    assert mascarar('<path class="s" d="M0 0"/>', 't') == '<path class="s" d="M0 0"/>'
    b = '<circle class="p" cx="1" cy="1" r="1"/><path class="p" fill-rule="evenodd" d="M2 2"/><rect class="s" x="0" y="0" width="1" height="1"/>'
    r = mascarar(b, 'u')
    assert r.count('<mask') == 1 and r.startswith('<defs><mask id="u-1"') and 'fill-rule="evenodd" d="M2 2" fill="#000"' in r and r.endswith('height="1"/>'), r
    print('ok')
