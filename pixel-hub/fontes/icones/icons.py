import math, json
# Biblioteca Pixel: grade 24, área viva 20 (2 px de respiro), duas camadas: p (100%) e s (40%), traço de 2 px com pontas redondas.
def gear(cx=12,cy=12,ro=9.6,ri=7.4,n=8,frac=.42):
    # dente trapezoidal com cantos suaves, gerado em polígono e arredondado por pontos médios
    pts=[]
    for k in range(n):
        a=2*math.pi*k/n
        w=2*math.pi/n
        for (ang,r) in [(a-w*frac/2-w*.06,ri),(a-w*frac/2,ro),(a+w*frac/2,ro),(a+w*frac/2+w*.06,ri)]:
            pts.append((cx+r*math.cos(ang),cy+r*math.sin(ang)))
    # caminho com arcos curtos (cantos levemente arredondados via quadrática)
    d=''
    N=len(pts)
    for i in range(N):
        p0=pts[i-1]; p1=pts[i]; p2=pts[(i+1)%N]
        t=.18
        a=(p1[0]+(p0[0]-p1[0])*t,p1[1]+(p0[1]-p1[1])*t); b=(p1[0]+(p2[0]-p1[0])*t,p1[1]+(p2[1]-p1[1])*t)
        d+=('M' if i==0 else 'L')+f'{a[0]:.2f} {a[1]:.2f}Q{p1[0]:.2f} {p1[1]:.2f} {b[0]:.2f} {b[1]:.2f}'
    return d+'Z'
G=gear()
I={}
def add(nome,cat,svg,onde=''): I[nome]={'cat':cat,'svg':svg,'onde':onde}
P=lambda d:f'<path class="p" d="{d}"/>'
S=lambda d:f'<path class="s" d="{d}"/>'
PL=lambda d:f'<path class="pl" d="{d}"/>'
SL=lambda d:f'<path class="sl" d="{d}"/>'
def R(c,x,y,w,h,r): return f'<rect class="{c}" x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}"/>'
def C(c,x,y,r): return f'<circle class="{c}" cx="{x}" cy="{y}" r="{r}"/>'
# ---------- Navegação ----------
add('inicio','Navegação',S('M3.5 10.6a2 2 0 0 1 .74-1.55l6.5-5.3a2 2 0 0 1 2.52 0l6.5 5.3a2 2 0 0 1 .74 1.55V19a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2z')+R('p',9.5,14,5,7,1.6),'Menu: Início')
add('trilha','Navegação',SL('M8.6 18.5H15a3.25 3.25 0 0 0 0-6.5H9a3.25 3.25 0 0 1 0-6.5h6.4')+C('p',6,18.5,2.6)+C('p',18,5.5,2.6),'Menu: Trilha, Jornada do agente')
add('conteudo','Navegação',S('M3 5.6A1.6 1.6 0 0 1 4.6 4h4.2A2.4 2.4 0 0 1 11.2 6.4V20a2.3 2.3 0 0 0-2.3-2.3H4.6A1.6 1.6 0 0 1 3 16.1z')+P('M21 5.6A1.6 1.6 0 0 0 19.4 4h-4.2a2.4 2.4 0 0 0-2.4 2.4V20a2.3 2.3 0 0 1 2.3-2.3h4.3a1.6 1.6 0 0 0 1.6-1.6z'),'Menu: Conteúdo complementar')
add('ferramentas','Navegação',R('s',2.5,8,19,12.5,3.2)+PL('M8.75 8V6.6A1.6 1.6 0 0 1 10.35 5h3.3a1.6 1.6 0 0 1 1.6 1.6V8')+R('p',10,12,4,3.4,1.2),'Menu: Ferramentas e skills')
add('plano','Navegação',C('s',12,12,9.5)+'<path class="p" fill-rule="evenodd" d="M12 6.6a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8zm0 3.3a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2z"/>','Menu: Plano Agêntico; estágio')
add('agentes','Navegação',R('s',3,8.2,18,13,5.2)+R('p',10.9,3.6,2.2,4,1.1)+R('p',7.8,12.2,2.6,5,1.3)+R('p',13.6,12.2,2.6,5,1.3),'Menu: Agentes; Novo agente')
add('mentorias','Navegação',R('s',2.5,6,13.5,12,3.2)+P('M17.4 10.3 20.5 8.1A.95.95 0 0 1 22 8.9v6.2a.95.95 0 0 1-1.5.78l-3.1-2.2z'),'Menu: Mentorias')
add('comunidade','Navegação',C('p',9,7.8,3.6)+P('M2.6 19.1A6.4 6.4 0 0 1 15.4 19.1a.9.9 0 0 1-.9.9H3.5a.9.9 0 0 1-.9-.9z')+C('s',16.8,8.6,2.8)+S('M17.6 20h3a.9.9 0 0 0 .9-.95 5.2 5.2 0 0 0-6.5-4.95 7.6 7.6 0 0 1 2.6 5.9z'),'Menu: Comunidade; RH')
add('cases','Navegação',S('M7 3.8h10V10a5 5 0 0 1-10 0z')+SL('M7 6H5.6A1.6 1.6 0 0 0 4 7.6 3.6 3.6 0 0 0 7.4 11.2')+SL('M17 6h1.4A1.6 1.6 0 0 1 20 7.6a3.6 3.6 0 0 1-3.4 3.6')+R('p',11,14.6,2,4.6,1)+R('p',7.8,18.6,8.4,2.6,1.3),'Menu: Cases')
add('empresa','Navegação',R('s',3.5,3,11.5,18,2.6)+R('s',16,9,4.5,12,2)+R('p',6.4,6.2,2.3,2.3,.7)+R('p',9.8,6.2,2.3,2.3,.7)+R('p',6.4,10.2,2.3,2.3,.7)+R('p',9.8,10.2,2.3,2.3,.7)+R('p',7.9,15.6,2.7,5.4,.9),'Menu: Empresa')
add('suporte','Navegação',C('s',12,12,9.5)+PL('M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.6.25-1 .8-1 1.45v.4')+C('p',12,16.9,1.25),'Menu: Suporte')
add('notificacao','Navegação',S('M6 15.2V11a6 6 0 0 1 12 0v4.2l1.3 1.9a.9.9 0 0 1-.74 1.4H5.44a.9.9 0 0 1-.74-1.4z')+P('M9.8 19.6h4.4a2.2 2.2 0 0 1-4.4 0z'),'Topo: notificações')
add('ajustes','Navegação',SL('M4 7h16')+SL('M4 17h16')+R('p',13.4,4.2,2.6,5.6,1.3)+R('p',8,14.2,2.6,5.6,1.3),'Ajustes do protótipo; filtros')
# ---------- Ações (uma camada, traço de 2 px: são verbos, ficam mais leves que os objetos) ----------
add('seta','Ações',PL('M5 12h13.5')+PL('M13 6.5 18.5 12 13 17.5'),'Botões: Continuar, Participar')
add('voltar','Ações',PL('M19 12H5.5')+PL('M11 6.5 5.5 12l5.5 5.5'),'Voltar ao Início')
add('chevron','Ações',PL('M9.5 6.5 15 12l-5.5 5.5'),'Links: Ver detalhes, Abrir o Plano')
add('chevron-baixo','Ações',PL('M6.5 9.5 12 15l5.5-5.5'),'Selects, recolher')
add('fechar','Ações',PL('M6.5 6.5l11 11')+PL('M17.5 6.5l-11 11'),'Drawers, janelas, pendências')
add('check','Ações',PL('M5 12.6 9.6 17.2 19 7.4'),'Concluído, selecionado')
add('mais','Ações',PL('M12 5.5v13')+PL('M5.5 12h13'),'Novo agente, adicionar')
add('editar','Ações',S('M14.4 5.2a2.2 2.2 0 0 1 3.1 0l1.3 1.3a2.2 2.2 0 0 1 0 3.1L9.4 19l-4.9.5.5-4.9z')+P('M14.4 5.2a2.2 2.2 0 0 1 3.1 0l1.3 1.3a2.2 2.2 0 0 1 0 3.1l-1.3 1.3-4.4-4.4z')+PL('M13.2 20.2h6.6'),'Ajustar no Agent Builder')
add('buscar','Ações',C('s',10.5,10.5,6.5)+PL('M15.6 15.6 20 20')+'<circle class="pl" cx="10.5" cy="10.5" r="6.5"/>','Buscas')
add('enviar','Ações','<path class="p" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" d="M4.4 4.6 20.3 11.3H7.1z"/>'+'<path class="s" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" d="M20.3 12.7 4.4 19.4 7.1 12.7z"/>','Consultor: enviar')
add('copiar','Ações',R('s',3,3,12,12,3)+R('p',9,9,12,12,3),'Copiar pedido')
add('baixar','Ações',SL('M4 15v2.4A2.6 2.6 0 0 0 6.6 20h10.8a2.6 2.6 0 0 0 2.6-2.6V15')+PL('M12 4v10')+PL('M7.6 9.6 12 14l4.4-4.4'),'Baixar a skill, o kit')
add('ampliar','Ações',PL('M14 4h6v6')+PL('M20 4l-6.5 6.5')+PL('M10 20H4v-6')+PL('M4 20l6.5-6.5'),'Abrir em página')
add('externo','Ações',SL('M10 5H7a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-3')+PL('M14 4h6v6')+PL('M20 4l-8.5 8.5'),'Links para fora')
add('opcoes','Ações',C('p',5.5,12,1.9)+C('p',12,12,1.9)+C('p',18.5,12,1.9),'Menus de mais opções')
add('play','Ações',S('M8 5.4v13.2a1 1 0 0 0 1.52.85l10.6-6.6a1 1 0 0 0 0-1.7L9.52 4.55A1 1 0 0 0 8 5.4z'),'Aulas, vídeos')
add('compartilhar','Ações',C('p',18,5.5,2.6)+C('p',6,12,2.6)+C('p',18,18.5,2.6)+SL('M8.3 10.8l7.4-4.1')+SL('M8.3 13.2l7.4 4.1'),'Compartilhar')
add('sair','Ações',SL('M10 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h3')+PL('M10 12h10')+PL('M16 8l4 4-4 4'),'Sair da conta')
# ---------- Estados ----------
add('info','Estados',C('s',12,12,9.5)+PL('M12 11v5.4')+C('p',12,7.7,1.3),'Avisos, notas')
add('alerta','Estados',S('M10.27 4a2 2 0 0 1 3.46 0l7.6 13.2A2 2 0 0 1 19.6 20H4.4a2 2 0 0 1-1.73-2.8z')+PL('M12 9v4.6')+C('p',12,16.8,1.25),'Alerta da fase futura')
add('sucesso','Estados',C('s',12,12,9.5)+PL('M8 12.3l2.8 2.8L16.2 9.6'),'Entrevista concluída, fase concluída')
add('erro','Estados',C('s',12,12,9.5)+PL('M9 9l6 6')+PL('M15 9l-6 6'),'Erros')
add('cadeado','Estados',R('s',4.5,10,15,11,3.2)+PL('M8 10V8a4 4 0 0 1 8 0v2')+R('p',11,13.6,2,4,1),'Trava do Agent Builder')
add('relogio','Estados',C('s',12,12,9.5)+PL('M12 7.4V12l3 2'),'Tempo da etapa, agenda')
add('ao-vivo','Estados',C('p',12,12,2.4)+SL('M8.1 15.9a5.5 5.5 0 0 1 0-7.8')+SL('M15.9 8.1a5.5 5.5 0 0 1 0 7.8')+PL('M5.3 18.7a9.5 9.5 0 0 1 0-13.4')+PL('M18.7 5.3a9.5 9.5 0 0 1 0 13.4'),'Hands-on ao vivo')
add('estrela','Estados',P('M12 3.6l2.5 5.07 5.6.81-4.05 3.95.96 5.57L12 16.37l-5.01 2.63.96-5.57L3.9 9.48l5.6-.81z'),'Favoritos, destaque')
add('escudo','Estados',S('M12 3l7 2.6v5.8c0 4.6-3 8.2-7 9.6-4-1.4-7-5-7-9.6V5.6z')+PL('M8.8 12.2l2.2 2.2 4.2-4.2'),'Aprovação, segurança')
# ---------- Objetos do Hub ----------
add('skill','Objetos do Hub',S(G)+C('p',12,12,3.3),'Toda skill (na cor da área)')
add('template','Objetos do Hub',R('s',3,3,18,18,4)+R('p',6.2,6.2,11.6,3.6,1.3)+R('p',6.2,11.6,5,6.2,1.3)+R('p',12.8,11.6,5,2.4,1.2)+R('p',12.8,15.4,5,2.4,1.2),'Templates de agentes')
add('kit','Objetos do Hub',S('M4 8.6 12 4.2l8 4.4v7.1a2 2 0 0 1-1.03 1.75L12 21.3l-6.97-3.85A2 2 0 0 1 4 15.7z')+P('M12 4.2l7.7 4.25L12 12.7 4.3 8.45z'),'Agentes prontos, kits')
add('cerebro','Objetos do Hub',S('M11.2 5.2a3 3 0 1 0-5.6.4 4 4 0 0 0-2.5 5.8 4 4 0 0 0 .6 6.6 4 4 0 0 0 7.5 1.1z')+P('M12.8 5.2a3 3 0 1 1 5.6.4 4 4 0 0 1 2.5 5.8 4 4 0 0 1-.6 6.6 4 4 0 0 1-7.5 1.1z')+'<path d="M15.4 9.6c1.2.1 2 .9 2.2 2.1M15 15.6c1.3-.4 2.6.1 3.2 1.1" fill="none" stroke="var(--icbg,#fff)" stroke-width="1.6" stroke-linecap="round"/>'+PL('M8.6 9.6c-1.2.1-2 .9-2.2 2.1')+PL('M9 15.6c-1.3-.4-2.6.1-3.2 1.1'),'Segundo Cérebro')
add('prompt','Objetos do Hub',S('M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.4 3.3a.8.8 0 0 1-1.3-.64V17A2.5 2.5 0 0 1 4 14.5z')+PL('M8 9h8')+PL('M8 12.5h5'),'Prompts, pedidos prontos')
add('automacao','Objetos do Hub',R('s',3,3,18,18,6)+P('M13.2 5.5 7.6 13h3.6l-.6 5.5L16.4 11h-3.7z'),'Automações')
add('rotina','Objetos do Hub',PL('M4.5 11V9.6a3 3 0 0 1 3-3h11')+PL('M15.5 3.6l3 3-3 3')+SL('M19.5 13v1.4a3 3 0 0 1-3 3h-11')+SL('M8.5 20.4l-3-3 3-3'),'Rotinas')
add('repositorio','Objetos do Hub',C('p',6.5,5.5,2.4)+C('p',6.5,18.5,2.4)+C('p',17.5,8.5,2.4)+SL('M6.5 8v8')+SL('M17.5 11a5 5 0 0 1-5 5H8.9'),'Repositórios')
add('documento','Objetos do Hub',S('M5 5.2A2.2 2.2 0 0 1 7.2 3h6.3L19 8.5v10.3a2.2 2.2 0 0 1-2.2 2.2H7.2A2.2 2.2 0 0 1 5 18.8z')+P('M14 3l5 5h-3.2A1.8 1.8 0 0 1 14 6.2z')+PL('M8.6 13h6.8')+PL('M8.6 16.5h4.4'),'Docs, SKILL.md, modelos')
add('aula','Objetos do Hub',R('s',2.5,5,19,14,3.4)+P('M10 9.1v5.8a.6.6 0 0 0 .92.5l4.6-2.9a.6.6 0 0 0 0-1l-4.6-2.9a.6.6 0 0 0-.92.5z'),'Aulas da Trilha')
add('mentoria-tecnica','Objetos do Hub',SL('M4.5 14v-2a7.5 7.5 0 0 1 15 0v2')+R('p',3,13.4,4.4,7,2.2)+R('p',16.6,13.4,4.4,7,2.2),'Mentoria técnica; Atendimento')
add('gravacao','Objetos do Hub',C('s',12,12,9.5)+C('p',12,12,4.2),'Gravações')
add('fase','Objetos do Hub',PL('M5.5 21V4')+S('M7 4.6h10.4a.9.9 0 0 1 .72 1.44L15.8 9l2.32 2.96a.9.9 0 0 1-.72 1.44H7z'),'Fases e etapas')
add('mapa','Objetos do Hub',S('M3 6.4a1.2 1.2 0 0 1 .78-1.12L8.5 3.5v15l-4.72 1.77A.6.6 0 0 1 3 19.7z')+P('M9.8 3.5l4.4 2v15l-4.4-2z')+S('M15.5 5.5l4.72-1.77A.6.6 0 0 1 21 4.3v13.3a1.2 1.2 0 0 1-.78 1.12L15.5 20.5z'),'Mapa da jornada')
add('entrevista','Objetos do Hub',R('p',8.5,2.8,7,11.6,3.5)+SL('M5.4 11.2a6.6 6.6 0 0 0 13.2 0')+SL('M12 17.8V21'),'Entrevista com o Consultor')
add('estagio','Objetos do Hub','<path class="sl" style="stroke-width:3.4" d="M4.5 16.5a7.5 7.5 0 0 1 15 0"/>'+PL('M12 16.5l3.6-4.4')+C('p',12,16.5,1.9),'Estágio na transformação')
add('horas','Objetos do Hub',S('M6.5 3.5h11a.9.9 0 0 1 .9.9V6a5 5 0 0 1-2.4 4.3L14.2 12l1.8 1.7A5 5 0 0 1 18.4 18v1.6a.9.9 0 0 1-.9.9h-11a.9.9 0 0 1-.9-.9V18A5 5 0 0 1 8 13.7L9.8 12 8 10.3A5 5 0 0 1 5.6 6V4.4a.9.9 0 0 1 .9-.9z')+P('M8.6 18.4c.4-1.4 1.6-2.4 3.4-2.4s3 1 3.4 2.4z'),'Horas que voltam')
add('conexao','Objetos do Hub',R('p',6.5,5.2,11,7.4,2.6)+R('p',8.9,2.2,1.9,4,.95)+R('p',13.2,2.2,1.9,4,.95)+SL('M12 12.6v2.6a3.6 3.6 0 0 1-3.6 3.6H6.4a1.9 1.9 0 0 0-1.9 1.9V21'),'Conectores, ferramentas ligadas')
add('chave','Objetos do Hub',C('s',8,15.5,5)+C('p',8,15.5,1.7)+PL('M11.6 11.9 19.5 4')+PL('M16.5 7l2.2 2.2'),'Chaves de acesso')
add('usuario','Objetos do Hub',C('p',12,7.8,4)+S('M4.5 19.4A7.5 7.5 0 0 1 19.5 19.4a.9.9 0 0 1-.9.9H5.4a.9.9 0 0 1-.9-.9z'),'Conta, responsável')
add('convidar','Objetos do Hub',C('p',10,7.8,3.8)+S('M3.4 19.2a6.6 6.6 0 0 1 13.2 0 .9.9 0 0 1-.9.9H4.3a.9.9 0 0 1-.9-.9z')+PL('M19 8v6')+PL('M16 11h6'),'Convidar participante')
add('calendario','Objetos do Hub',R('s',3,5,18,16,3.4)+R('p',3,5,18,5.2,2.6)+R('p',7,2.8,2,4.6,1)+R('p',15,2.8,2,4.6,1)+R('p',7,13.4,3,3,.9),'Agenda, agendar mentoria')
add('etiqueta','Objetos do Hub',S('M3.5 5.5a2 2 0 0 1 2-2h6.1a2 2 0 0 1 1.42.59l7.4 7.4a2 2 0 0 1 0 2.83l-6.1 6.1a2 2 0 0 1-2.83 0l-7.4-7.4A2 2 0 0 1 3.5 11.6z')+C('p',8.3,8.3,1.8),'Áreas, etiquetas')
add('camadas','Objetos do Hub',S('M3.6 12.5 12 17l8.4-4.5')+S('M3.6 16.5 12 21l8.4-4.5')+P('M12 3l8.4 4.5L12 12 3.6 7.5z'),'Usada em templates')
add('grafico','Objetos do Hub',R('s',3.5,11,4,9.5,1.4)+R('p',10,4,4,16.5,1.4)+R('s',16.5,8,4,12.5,1.4),'Dados, relatórios')
add('pasta','Objetos do Hub',S('M3 6.6A2.6 2.6 0 0 1 5.6 4h3.6a2 2 0 0 1 1.5.68L12 6.2h6.4A2.6 2.6 0 0 1 21 8.8V10H3z')+R('p',3,9,18,11.5,2.6),'Pastas, coleções')
add('email','Objetos do Hub',R('s',2.5,4.5,19,15,3.4)+PL('M6 8.6l6 4.4 6-4.4'),'E-mail')
add('moeda','Objetos do Hub',C('s',12,12,9.5)+PL('M14.6 9.2A2.8 2.8 0 0 0 12 7.8c-1.6 0-2.7.9-2.7 2.1 0 2.9 5.4 1.5 5.4 4.2 0 1.2-1.1 2.1-2.7 2.1a2.8 2.8 0 0 1-2.6-1.4')+PL('M12 6v1.8M12 16.2V18'),'Financeiro, saldo')
# ---------- Áreas (com a cor do Pixel da área) ----------
add('area-vendas','Áreas dos agentes',R('s',3,3,18,18,5)+PL('M6.8 15.6l3.4-3.4 2.6 2.4 4.4-4.8')+PL('M13.8 9.6h3.4V13'),'Pixel Vendas')
add('area-marketing','Áreas dos agentes',S('M4 10.4a2 2 0 0 1 2-2h2.2L15 4.6a.8.8 0 0 1 1.2.7v13.4a.8.8 0 0 1-1.2.7l-6.8-3.8H6a2 2 0 0 1-2-2z')+PL('M19 9.5a3.4 3.4 0 0 1 0 5')+R('p',6.5,15,3,5.4,1.5),'Pixel Marketing')
add('area-atendimento','Áreas dos agentes',SL('M4.5 14v-2a7.5 7.5 0 0 1 15 0v2')+R('p',3,13.4,4.4,7,2.2)+R('p',16.6,13.4,4.4,7,2.2)+PL('M18.8 20.4c0 .9-1.6 1.6-4.3 1.6H13'),'Pixel Atendimento')
add('area-financeiro','Áreas dos agentes',C('s',12,12,9.5)+PL('M14.6 9.2A2.8 2.8 0 0 0 12 7.8c-1.6 0-2.7.9-2.7 2.1 0 2.9 5.4 1.5 5.4 4.2 0 1.2-1.1 2.1-2.7 2.1a2.8 2.8 0 0 1-2.6-1.4')+PL('M12 6v1.8M12 16.2V18'),'Pixel Financeiro')
add('area-operacoes','Áreas dos agentes',S('M4 8.6 12 4.2l8 4.4v7.1a2 2 0 0 1-1.03 1.75L12 21.3l-6.97-3.85A2 2 0 0 1 4 15.7z')+P('M12 12.7v8.6l-6.97-3.85A2 2 0 0 1 4 15.7V8.6z'),'Pixel Operações')
add('area-rh','Áreas dos agentes',C('p',9,7.8,3.6)+P('M2.6 19.1A6.4 6.4 0 0 1 15.4 19.1a.9.9 0 0 1-.9.9H3.5a.9.9 0 0 1-.9-.9z')+C('s',16.8,8.6,2.8)+S('M17.6 20h3a.9.9 0 0 0 .9-.95 5.2 5.2 0 0 0-6.5-4.95 7.6 7.6 0 0 1 2.6 5.9z'),'Pixel RH')
add('area-dados','Áreas dos agentes',R('s',3.5,11,4,9.5,1.4)+R('p',10,4,4,16.5,1.4)+R('s',16.5,8,4,12.5,1.4),'Pixel Dados')
add('area-gestao','Áreas dos agentes',R('s',2.5,7.5,19,13,3.2)+PL('M8.8 7.5V6a1.6 1.6 0 0 1 1.6-1.6h3.2a1.6 1.6 0 0 1 1.6 1.6v1.5')+P('M2.5 11.6h19v1.2a2 2 0 0 1-1.4 1.9L13.4 16.8a4.4 4.4 0 0 1-2.8 0L3.9 14.7a2 2 0 0 1-1.4-1.9z'),'Pixel Gestão')
add('area-chief','Áreas dos agentes',R('s',3,4,18,16,3.4)+P('M3 13h4.6l1.4 2.4h6l1.4-2.4H21v3.6a3.4 3.4 0 0 1-3.4 3.4H6.4A3.4 3.4 0 0 1 3 16.6z'),'Pixel Chief of Staff')
add('area-orquestrador','Áreas dos agentes',C('p',12,5,2.6)+C('s',5.5,18.5,2.6)+C('s',18.5,18.5,2.6)+PL('M12 7.6v4.2')+PL('M12 11.8l-4.6 4.6')+PL('M12 11.8l4.6 4.6'),'Pixel Orquestrador')
add('area-geral','Áreas dos agentes',S('M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5z')+C('p',8,12,1.4)+C('p',12,12,1.4)+C('p',16,12,1.4),'Pixel Geral')
json.dump(I,open('icons.json','w'),ensure_ascii=False,indent=0)
print(len(I))
