# Embute a entrevista imersiva (exploracoes/entrevista-imersiva/embed.html) no produto, como versão em teste.
# Rodar depois de `npm run build` na exploração; em seguida, `python3 fontes/embed.py`.
import base64, os
O = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/'
emb = open(O + 'exploracoes/entrevista-imersiva/embed.html', 'rb').read()
blk = open(O + 'fontes/entrevista-imersiva.js', encoding='utf-8').read().replace('__IMERSIVA_B64__', base64.b64encode(emb).decode())
p = O + 'pixel-hub-produto.html'
s = open(p, encoding='utf-8').read()
ini, fim = '<!-- imersiva:inicio -->', '<!-- imersiva:fim -->'
if ini in s:
    i, j = s.index(ini), s.index(fim) + len(fim)
    s = s[:i] + blk.strip() + s[j:]
else:
    k = s.rfind('</body>'); s = s[:k] + blk + s[k:]
assert s.count(ini) == 1 and s.count('</body>') == 1
open(p, 'w', encoding='utf-8').write(s)
print('ok', len(emb), 'bytes embutidos')
