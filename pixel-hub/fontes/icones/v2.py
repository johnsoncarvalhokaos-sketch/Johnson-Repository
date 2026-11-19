import json, re
I=json.load(open('icons.json'))
def small(el):
    m=re.search(r'<circle class="p" cx="[^"]+" cy="[^"]+" r="([\d.]+)"',el)
    if m: return float(m.group(1))<=2.0
    m=re.search(r'<rect class="p" x="[^"]+" y="[^"]+" width="([\d.]+)" height="([\d.]+)"',el)
    if m: return min(float(m.group(1)),float(m.group(2)))<=2.9
    return False
out={}
for k,v in I.items():
    els=re.findall(r'<[^>]+/>',v['svg'])
    novo=[]
    for e in els:
        if 'var(--icbg' in e: continue          # recortes não fazem sentido no contorno
        if 'class="p"' in e and small(e): e=e.replace('class="p"','class="d"')
        novo.append(e)
    out[k]={'cat':v['cat'],'svg':''.join(novo),'onde':v['onde']}
json.dump(out,open('icons2.json','w'),ensure_ascii=False,indent=0); print(len(out))
