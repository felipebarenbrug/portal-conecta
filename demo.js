/* Portal Conecta Barenbrug - modo demonstracao.
   Carregado so para usuarios marcados como demonstracao. Todos os nomes, clientes, revendas,
   volumes e valores deste arquivo sao ficticios. Nada aqui le ou grava dados reais do CRM. */
(function(){
  "use strict";
  let seed=20261111;
  const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
  const ri=(a,b)=>a+Math.floor(rnd()*(b-a+1));
  const pick=a=>a[Math.floor(rnd()*a.length)];
  const dia=864e5,HOJE=new Date();HOJE.setHours(12,0,0,0);
  const iso=d=>d.toISOString();
  const br=d=>String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0")+"/"+d.getFullYear();
  const mais=n=>new Date(HOJE.getTime()+n*dia);
  let uid=1000;const nid=()=>"demo-"+(++uid);

  const CAMPO=["Carlos Menezes","Renata Lopes","Paulo Antunes","Diego Farias"];
  const IS=[["Bianca","Bianca Prado"],["Camila","Camila Rocha"],["Júlia","Júlia Tavares"],["Marina","Marina Sales"]];
  const REPS=["1101 - HORIZONTE REPRESENTACOES LTDA","1102 - CAMPO FORTE AGRONEGOCIOS LTDA","1103 - PASTO NOVO REPRESENTACOES LTDA","1104 - SERTAO VERDE CONSULTORIA LTDA","1105 - BOA SAFRA REPRESENTACOES LTDA","1106 - TERRA BOA AGRO LTDA","1107 - VALE DO ARAGUAIA REPRESENTACOES LTDA","1108 - NORTE PECUARIA CONSULTORIA LTDA"];
  const CID=[["MT","Sinop"],["MT","Sorriso"],["MT","Rondonópolis"],["MT","Cuiabá"],["MS","Campo Grande"],["MS","Dourados"],["MS","Três Lagoas"],["GO","Rio Verde"],["GO","Jataí"],["GO","Goiânia"],["MG","Uberaba"],["MG","Uberlândia"],["MG","Montes Claros"],["SP","Araçatuba"],["SP","Presidente Prudente"],["SP","Barretos"],["PR","Londrina"],["PR","Umuarama"],["TO","Palmas"],["TO","Araguaína"],["TO","Gurupi"],["PA","Marabá"],["PA","Redenção"],["PA","Paragominas"],["RO","Ji-Paraná"],["RO","Vilhena"],["BA","Barreiras"],["MA","Imperatriz"],["MA","Balsas"],["SC","Chapecó"],["RS","Bagé"],["AC","Rio Branco"]];
  const EXPO=["Asuncion","Lima","Bogota","Ciudad Del Este","Guayaquil"];
  const FAZ=["Fazenda Santa Aurora","Fazenda Três Rios","Fazenda Boa Esperança","Fazenda Recanto Verde","Fazenda São Miguel","Fazenda Lagoa Azul","Fazenda Vista Alegre","Fazenda Pedra Branca","Sítio Bela Vista","Fazenda Nova Aliança","Fazenda Córrego Fundo","Fazenda Ouro Verde","Agropecuária Serra Dourada","Agropecuária Rio Manso","Fazenda Primavera","Fazenda Santa Rita do Cerrado"];
  const CANAIS_CLI=["Agro Horizonte","Campo Novo Insumos","Pasto Certo Agropecuária","Sementes do Cerrado","Casa do Produtor Vale","Agro Fronteira","Rural Mais","Cooperativa Vale Verde","Cooperativa Planalto","Agro Triângulo"];
  const HIB=[["3520 - Convert 330 Incrustada 10 kg","Sabiá"],["3611 - Cayana Incrustada 10 kg","Cayana"],["3702 - Carcará Incrustada 10 kg","Carcará"]];
  const CONV=[["2101 - Marandu Incrustada 20 kg","Marandu"],["2204 - Mombaça Incrustada 20 kg","Mombaça"],["2310 - Ruziziensis Clean 20 kg","Ruziziensis"],["2405 - Piatã Incrustada 20 kg","Piatã"]];
  const ETAPAS=["61eea2f980f7d4001007111d","61eea2f980f7d4001007111e","61eea2fa80f7d4001007111f","61eea2fa80f7d40010071120"];
  const MES=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

  function geraDeals(tipo,repFixo,n){
    const out=[];
    for(let i=0;i<n;i++){
      const canal=tipo==="is"?rnd()<.12:rnd()<.45;const exp=tipo==="exp"&&rnd()<.7;
      const cli=exp?"Importadora "+pick(["Andina","del Sur","Pacífico","Guaraní"]):canal?pick(CANAIS_CLI):pick(FAZ);
      const loc=exp?["EX",pick(EXPO)]:pick(CID);
      const r=rnd();const st=r<.52?"V":r<.9?"A":"P";
      const itens=[];const hib=exp?rnd()<.15:rnd()<(tipo==="is"?.85:.6);
      const p1=hib?pick(HIB):pick(CONV);
      const kg1=(exp?ri(3,9)*1000:tipo==="is"?(canal?ri(5,25)*100:ri(2,60)*10):canal?ri(2,24)*500:ri(1,30)*100);
      const px1=hib?ri(280,360)/10:ri(120,200)/10;
      itens.push([p1[0],kg1,Math.round(kg1*px1)]);
      if(rnd()<.25){const p2=hib?pick(CONV):pick(HIB);const kg2=Math.max(20,Math.round(kg1*(.2+rnd()*.5)/10)*10);const px2=p2[1]==="Sabiá"||p2[1]==="Cayana"||p2[1]==="Carcará"?ri(280,360)/10:ri(120,200)/10;itens.push([p2[0],kg2,Math.round(kg2*px2)]);}
      const tot=itens.reduce((t,x)=>t+x[2],0);
      let fat=null,cl=null;
      if(st==="V"){const d=mais(-ri(0,125)+ri(0,60));fat=br(d);cl=iso(mais(-ri(0,rnd()<.25?9:120)));}
      else if(rnd()<.88){fat=br(mais(ri(-12,115)));}
      const umRep=()=>rnd()<.3?REPS[0]:pick(REPS);const rep=repFixo!=null?repFixo:(canal||exp?(rnd()<.35?umRep():""):(rnd()<.7?umRep():""));
      out.push({n:`${cli} - ${p1[1]} - ${MES[ri(0,11)]}/${rnd()<.6?"26":"27"}`,st,stg:pick(ETAPAS),rt:st==="A"||st==="P"?ri(1,5):5,tot,fat,rep,
        forma:exp?"Para Canal (Sell In)":canal?"Para Canal (Sell In)":(rep?"Representante ao produtor":"Venda direta ao produtor"),
        upd:iso(mais(-(rnd()<.2?ri(16,45):ri(0,14)))),cl,cr:iso(mais(-ri(20,160))),pr:itens,
        o:[loc[0],loc[1],exp?"EXPORTAÇÃO":canal?pick(["DISTRIBUIDOR YELLOW","DISTRIBUIDOR BLUE","COOPERATIVA"]):"VENDA DIRETA"],mu:"",mc:""});
    }
    return out;
  }

  window.demoIniciar=async function(real,S){
    const eu=S.user.id;
    // nomes ficticios no lugar das listas internas do portal
    CRM_DONOS.length=0;CRM_DONOS.push(...CAMPO,"Inside Sales");
    IS_TIME.length=0;IS.forEach(x=>IS_TIME.push([x[0],x[1],null]));
    VENDEDORAS_IS.length=0;IS.forEach(x=>VENDEDORAS_IS.push(x[0]));
    COMERCIAIS_EXTRA.length=0;
    const DEALS={};const PM={};
    CAMPO.forEach((d,i)=>{DEALS[d]=geraDeals(i===3?"exp":"campo",null,ri(38,58));PM[d]=ri(3,9);});
    IS.forEach(x=>{DEALS[x[0]]=geraDeals("is","90"+ri(10,99)+" - "+x[1].toUpperCase(),ri(26,44));PM[x[0]]=ri(5,14);});

    const C=(nome,tier,meta,vkg,resp,com,rec,ufs)=>({id:nid(),nome,tier,meta_kg:meta,valor_kg:vkg,pct_conecta:.07,responsavel:resp,responsavel_legal:"Sócio administrador",comercial_id:com?eu:null,recebe_leads:rec,ufs_leads:ufs,criado_em:iso(mais(-120))});
    const canais=[C("Agro Horizonte","Yellow Master",60000,31,"CARLOS",true,true,["MT"]),C("Campo Novo Insumos","Yellow Master",45000,30.5,"RENATA",false,true,["MS","GO"]),C("Pasto Certo Agropecuária","Yellow Pro",25000,30,"CARLOS",true,true,["TO","PA"]),C("Sementes do Cerrado","Yellow Pro",20000,29.5,"PAULO",false,true,["MG"]),C("Casa do Produtor Vale","Yellow",12000,29,"CARLOS",true,false,[]),C("Agro Fronteira","Yellow",10000,29,"RENATA",false,false,[]),C("Rural Mais","Blue",6000,28.5,"PAULO",false,false,[])];
    const ating=[1.08,.94,.71,1.02,.55,.9,.38];
    const canal_resultado=canais.map((c,i)=>{const kg=Math.round(c.meta_kg*ating[i]/10)*10,rs=Math.round(kg*c.valor_kg),conv=ri(40,260)*1000;return {canal_id:c.id,pedidos_n:ri(4,19),kg_hib:kg,kg_conv:ri(8,60)*1000,rs_hib:rs,rs_conv:conv,fat_kg_hib:Math.round(kg*.62/10)*10,fat_rs_hib:Math.round(rs*.62),fat_rs_conv:Math.round(conv*.7),aberto_n:ri(1,6),aberto_rs:ri(60,480)*1000,atualizado_em:iso(HOJE)};});
    const TIPOS=[["Dia de Campo","Dia de campo com produtores da região, com área demonstrativa de Sabiá e Cayana."],["Evento/Feira","Estande na feira agropecuária regional, com equipe técnica da Barenbrug."],["Treinamento de equipe","Treinamento técnico-comercial dos vendedores sobre os híbridos."],["Campanha digital","Impulsionamento de conteúdo sobre renovação de pastagem para a base de clientes."]];
    const acoes_pgd=[];canais.forEach((c,i)=>{const n=i<5?ri(2,3):i===5?1:0;for(let k=0;k<n;k++){const t=pick(TIPOS);acoes_pgd.push({id:nid(),canal_id:c.id,tipo:t[0],descricao:t[1],cidade:pick(CID)[1],data_acao:br(mais(ri(10,150))),valor_igdb:ri(6,28)*1000,status:pick(["Aprovado","Aprovado","Em Análise","Reprovado"]),verba:"IGDB",criado_em:iso(mais(-ri(5,60)))});}
      if(i<2)acoes_pgd.push({id:nid(),canal_id:c.id,tipo:"Incentivo por saco vendido",descricao:"Premiação aos vendedores por saco de híbrido vendido na safra.",cidade:"Equipe de vendas",data_acao:"Safra 26/27",valor_igdb:ri(15,40)*1000,status:"Aprovado",verba:"Bônus de Performance",criado_em:iso(mais(-30))});});

    const P=(nome,perfil,canal,dias)=>({id:nid(),nome,email:nome.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z]+/g,".")+"@exemplo.com.br",perfil,telefone:"(00) 00000-00"+ri(10,99),ultimo_acesso:iso(mais(-dias)),canal_id:canal||null,foto_url:null,acessos:["academia"],ativo:true});
    const pessoas=[P("Carlos Menezes","Comercial Barenbrug",null,0),P("Renata Lopes","Comercial Barenbrug",null,1),P("Bianca Prado","Inside Sales",null,0),P("Camila Rocha","Inside Sales",null,2),P("Horizonte Representações","RC",null,1),P("Campo Forte Agronegócios","RC",null,3),P("Pasto Novo Representações","RC",null,6),P("Marcos Teixeira","Gestor de Revenda",canais[0].id,0),P("Aline Duarte","Vendedor de Revenda",canais[0].id,1),P("Rafael Nogueira","Vendedor de Revenda",canais[0].id,4),P("Sandra Vieira","Gestor de Revenda",canais[1].id,2),P("Tiago Bastos","Vendedor de Revenda",canais[1].id,9),P("Luciana Paes","Gestor de Revenda",canais[2].id,5),P("Eduardo Lima","Vendedor de Revenda",canais[3].id,12)];
    const progresso=[];pessoas.forEach((p,i)=>{const feitas=i%4===0?ETAPAS_ATIVAS.length:i%4;ETAPAS_ATIVAS.slice(0,feitas).forEach(e=>progresso.push({user_id:p.id,etapa:e,nota:ri(14,20)}));});

    const LN=["João Batista Ferreira","Maria Aparecida Souza","Antônio Carlos Lima","José Roberto Alves","Ana Paula Ribeiro","Pedro Henrique Costa","Luiz Fernando Melo","Francisco Araújo","Cláudia Regina Pires","Marcelo Augusto Dias","Sebastião Moreira","Fernanda Cristina Rocha","Roberto Carlos Nunes","Juliana Martins","Osvaldo Pereira","Patrícia Gomes","Wagner Santos","Vera Lúcia Cardoso","Gilberto Ramos","Simone Azevedo","Edson Barbosa","Rosana Freitas","Valdir Correia","Helena Batista"];
    const leads=LN.map((n,i)=>{const c=pick(CID);const d=mais(-ri(1,55));return {id:i+1,crm_deal_id:"demo-lead-"+i,origem:"inbound",nome:n,telefone:"(00) 00000-0"+String(100+i),email:n.split(" ")[0].toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"")+i+"@exemplo.com.br",uf:c[0],cidade:c[1],cultura:pick(["Sabiá","Cayana","Carcará","Outras Brachiarias","Cynodon"]),volume:pick(["0 a 10 ha","11 a 25 ha","26 a 50 ha","50 a 100 ha","Acima de 500 ha"]),perfil:pick(["Produtor","Produtor","Produtor","Consultor"]),motivo:rnd()<.7?"Sem retorno — antes de 1º contato":"Sem retorno — após 1º contato",campanha:"[CRM] (LP) Atendimento Comercial",entrou_em:iso(d),perdido_em:iso(new Date(d.getTime()+ri(2,9)*dia)),status:i%7===3?"Em atendimento":i%11===5?"Virou negociação":"Novo",atendido_por:i%7===3||i%11===5?"Marcos Teixeira":null,atendido_em:i%7===3||i%11===5?iso(mais(-1)):null,obs:null};});

    const A=n=>pessoas.find(p=>p.nome===n);
    const posts=[{id:1,autor:A("Carlos Menezes").id,autor_nome:"Carlos Menezes",texto:"Tabela de preços de novembro já está no portal. A condição especial de híbridos vale para pedidos com faturamento até o fim do mês.",publico:["todos"],fixado:true,tipo:"comunicado",anexo_url:null,imagem_url:null,criado_em:iso(mais(-1))},
      {id:2,autor:A("Bianca Prado").id,autor_nome:"Bianca Prado",texto:"Dia de campo de Sabiá e Cayana confirmado para o dia 28, em Sinop. Quem quiser levar clientes, avise o comercial responsável até sexta.",publico:["todos"],fixado:false,tipo:"comunicado",anexo_url:null,imagem_url:null,criado_em:iso(mais(-3))},
      {id:3,ref_user:A("Aline Duarte").id,autor_nome:"Aline Duarte",texto:"Aline Duarte acabou de chegar ao Conecta. Boas-vindas!",publico:["todos"],fixado:false,tipo:"boas-vindas",anexo_url:null,imagem_url:null,criado_em:iso(mais(-5))}];
    const duvidas=[{id:1,autor:A("Aline Duarte").id,autor_nome:"Aline Duarte",autor_perfil:"Vendedor de Revenda",tema:"Sabiá",pergunta:"Qual a taxa de semeadura do Sabiá para plantio a lanço em área de morro?",oculto:false,criado_em:iso(mais(-2))},
      {id:2,autor:A("Horizonte Representações").id,autor_nome:"Horizonte Representações",autor_perfil:"RC",tema:"Cayana",pergunta:"O Cayana pode entrar em consórcio com milho safrinha no espaçamento de 50 cm?",oculto:false,criado_em:iso(mais(-4))},
      {id:3,autor:A("Tiago Bastos").id,autor_nome:"Tiago Bastos",autor_perfil:"Vendedor de Revenda",tema:"Comercial e preços",pergunta:"Como funciona o frete fracionado para pedidos abaixo de uma tonelada?",oculto:false,criado_em:iso(mais(-1))},
      {id:4,autor:A("Campo Forte Agronegócios").id,autor_nome:"Campo Forte Agronegócios",autor_perfil:"RC",tema:"Carcará",pergunta:"Qual a altura de entrada e de saída dos animais no Carcará em pastejo rotacionado?",oculto:false,criado_em:iso(mais(-7))}];
    const duvida_respostas=[{id:1,duvida_id:1,autor:A("Bianca Prado").id,autor_nome:"Bianca Prado",autor_perfil:"Inside Sales",texto:"Em condições adversas, como área de morro ou aplicação por drone, a recomendação é de 15 kg/ha. Em linha, com solo bem preparado, 10 kg/ha.",validada:true,validada_por:"Carlos Menezes",validada_em:iso(mais(-1)),oculto:false,criado_em:iso(mais(-1))},
      {id:2,duvida_id:2,autor:A("Marcos Teixeira").id,autor_nome:"Marcos Teixeira",autor_perfil:"Gestor de Revenda",texto:"Sim. Em 50 cm o sombreamento do milho segura o capim e não costuma precisar de herbicida.",validada:false,oculto:false,criado_em:iso(mais(-3))},
      {id:3,duvida_id:4,autor:A("Carlos Menezes").id,autor_nome:"Carlos Menezes",autor_perfil:"Comercial Barenbrug",texto:"Entrada entre 70 e 80 cm e saída entre 35 e 40 cm, sempre em pastejo rotacionado.",validada:true,validada_por:"Carlos Menezes",validada_em:iso(mais(-6)),oculto:false,criado_em:iso(mais(-6))}];
    const rc_negociacoes=[{id:1,rc_user:eu,rc_nome:"Horizonte Representações",comercial:"Carlos Menezes",cliente_nome:"Fazenda Santa Aurora",cliente_doc:"00000000000191",cliente_cidade:"Sinop",cliente_uf:"MT",itens:[{cultivar:"Sabiá",kg:1200,preco:32.5}],valor_total:39000,data_faturamento:iso(mais(20)).slice(0,10),forma:"Representante ao produtor",cond_pagamento:"30 dias",frete:"CIF",status:"No CRM",anexos:[],criado_em:iso(mais(-6))},
      {id:2,rc_user:eu,rc_nome:"Horizonte Representações",comercial:"Carlos Menezes",cliente_nome:"Agropecuária Rio Manso",cliente_doc:"00000000000272",cliente_cidade:"Sorriso",cliente_uf:"MT",itens:[{cultivar:"Cayana",kg:800,preco:33},{cultivar:"Marandu",kg:2000,preco:15.2}],valor_total:56800,data_faturamento:iso(mais(35)).slice(0,10),forma:"Representante ao produtor",cond_pagamento:"Safra",frete:"FOB",status:"Enviado",anexos:[],criado_em:iso(mais(-1))}];
    const solic=[{id:1,tipo:"acesso",nome:"Priscila Andrade",email:"priscila@exemplo.com.br",telefone:"(00) 00000-0201",empresa:"Agro Horizonte",perfil:"Vendedor de Revenda",uf:"MT",mensagem:"Indicada pelo gestor Marcos Teixeira.",status:"Pendente",criado_em:iso(mais(-1))}];

    const DB={profiles:[S.profile,...pessoas],progresso,canais,canal_resultado,acoes_pgd,canal_contatos:[],canal_filiais:[],canal_estoque:[],canal_precos:[],leads,lead_views:[],posts,post_reacoes:[],duvidas,duvida_respostas,rc_negociacoes,solicitacoes_acesso:solic,crm_painel:[],crm_mapa:[],rc_ranking:[],rc_pedidos:[],is_metricas:[]};
    Object.values(DEALS).flat().filter(d=>d.st==="V"&&d.rep).forEach(d=>{d.pr.forEach(([n,kg])=>{const c=cultivarDe(n);if(ehHibrida(c))DB.rc_pedidos.push({rep:repTitulo(d.rep),cli:d.n,cultivar:c,kg,forma:d.forma,dt:d.fat});});});
    window.__DEMO={DB,DEALS,PM,canais,pessoas};

    const PASSA=["materiais_mkt","mercado_noticias","mercado_boi","mercado_clima"];
    const ufsDaRevenda=()=>{const k=canais.find(c=>c.id===S.profile.canal_id);return k&&k.recebe_leads?k.ufs_leads:[];};
    function visivel(t){
      const L=DB[t]||(DB[t]=[]);const p=S.perfil,adm=p==="Administrador",com=p==="Comercial Barenbrug",rev=p==="Gestor de Revenda"||p==="Vendedor de Revenda";
      const meusCanais=()=>adm?canais.map(c=>c.id):com?canais.filter(c=>c.comercial_id===eu).map(c=>c.id):rev?[S.profile.canal_id]:[];
      if(adm)return L;
      if(t==="crm_painel")return L.filter(r=>r.dono===S.profile.crm_dono||(S.profile.is_vendedora&&r.dono==="IS: "+S.profile.is_vendedora));
      if(t==="crm_mapa")return L.filter(r=>r.dono===S.profile.crm_dono||(S.profile.rc_crm&&r.rep===S.profile.rc_crm)||(S.profile.is_vendedora&&r.rep===(IS.find(x=>x[0]===S.profile.is_vendedora)||[])[1]));
      if(t==="canais")return L.filter(r=>meusCanais().includes(r.id));
      if(["canal_resultado","canal_contatos","canal_filiais","canal_estoque","canal_precos"].includes(t))return L.filter(r=>meusCanais().includes(r.canal_id));
      if(t==="acoes_pgd")return L.filter(r=>meusCanais().includes(r.canal_id)&&(p!=="Vendedor de Revenda"||r.status==="Aprovado"));
      if(t==="leads")return com?L:rev?L.filter(r=>ufsDaRevenda().includes(r.uf)):[];
      if(t==="rc_pedidos")return com?L:L.filter(r=>r.rep===S.profile.rc_crm);
      if(t==="rc_negociacoes")return com?L:p==="RC"?L:[];
      if(t==="profiles")return L.filter(r=>r===S.profile);
      if(t==="solicitacoes_acesso"||t==="lead_views")return [];
      return L;
    }
    function Q(t){
      let op="select",fs=[],ord=null,lim=null,rg=null,pay=null,um=false,conf=null;
      const cmp=(a,b)=>a==null?-1:b==null?1:(typeof a==="number"&&typeof b==="number"?a-b:String(a).localeCompare(String(b)));
      const api={
        select(){return api;},
        eq(c,v){fs.push(r=>String(r[c])===String(v));return api;},neq(c,v){fs.push(r=>String(r[c]??"")!==String(v));return api;},
        in(c,a){fs.push(r=>a.map(String).includes(String(r[c])));return api;},is(c,v){fs.push(r=>(r[c]??null)===v);return api;},
        lt(c,v){fs.push(r=>cmp(r[c],v)<0);return api;},lte(c,v){fs.push(r=>cmp(r[c],v)<=0);return api;},gt(c,v){fs.push(r=>cmp(r[c],v)>0);return api;},gte(c,v){fs.push(r=>cmp(r[c],v)>=0);return api;},
        order(c,o){ord=[c,!!(o&&o.ascending===false)];return api;},limit(n){lim=n;return api;},range(a,b){rg=[a,b];return api;},
        maybeSingle(){um=true;return api;},single(){um=true;return api;},
        insert(p){op="insert";pay=p;return api;},update(p){op="update";pay=p;return api;},upsert(p,o){op="upsert";pay=p;conf=o&&o.onConflict;return api;},delete(){op="delete";return api;},
        then(ok,er){return Promise.resolve().then(exec).then(ok,er);}
      };
      function exec(){
        const L=DB[t]||(DB[t]=[]);let saida;
        if(op==="select"){saida=visivel(t).filter(r=>fs.every(f=>f(r)));if(ord)saida=saida.slice().sort((a,b)=>(ord[1]?-1:1)*cmp(a[ord[0]],b[ord[0]]));if(rg)saida=saida.slice(rg[0],rg[1]+1);if(lim!=null)saida=saida.slice(0,lim);}
        else if(op==="insert"){const arr=(Array.isArray(pay)?pay:[pay]).map(x=>({id:L.reduce((m,r)=>typeof r.id==="number"&&r.id>m?r.id:m,0)+1+Math.floor(Math.random()*1e6),criado_em:new Date().toISOString(),...x}));
          arr.forEach(x=>{if(t==="duvidas"||t==="duvida_respostas"){x.autor=x.autor||eu;x.autor_nome=x.autor_nome||S.profile.nome;x.autor_perfil=x.autor_perfil||S.perfil;if(t==="duvida_respostas"){x.validada=S.perfil==="Administrador"||S.perfil==="Comercial Barenbrug";x.oculto=false;}else x.oculto=false;}
            if(t==="posts")x.autor=x.autor||eu;if(t==="rc_negociacoes"){x.rc_user=eu;x.rc_nome=S.profile.nome;x.status=x.status||"Enviado";}if(t==="post_reacoes")x.user_id=x.user_id||eu;L.push(x);});saida=arr;}
        else if(op==="update"){saida=L.filter(r=>fs.every(f=>f(r)));saida.forEach(r=>Object.assign(r,pay));}
        else if(op==="upsert"){const arr=Array.isArray(pay)?pay:[pay];arr.forEach(x=>{const i=conf?L.findIndex(r=>r[conf]===x[conf]):-1;if(i>=0)Object.assign(L[i],x);else L.push({...x});});saida=arr;}
        else if(op==="delete"){saida=L.filter(r=>fs.every(f=>f(r)));saida.forEach(r=>{const i=L.indexOf(r);if(i>=0&&r!==S.profile)L.splice(i,1);});}
        return {data:um?(saida[0]||null):saida,error:null};
      }
      return api;
    }
    const okFalso={then(ok){return Promise.resolve({data:null,error:null}).then(ok);},select(){return okFalso;},eq(){return okFalso;},maybeSingle(){return okFalso;},single(){return okFalso;},in(){return okFalso;},neq(){return okFalso;},lt(){return okFalso;},gte(){return okFalso;}};
    const urls={};
    const cliente={
      auth:real.auth,
      from(t){if(PASSA.includes(t)){const q=real.from(t);return {select:(...a)=>q.select(...a),insert:()=>okFalso,update:()=>okFalso,upsert:()=>okFalso,delete:()=>okFalso};}return Q(t);},
      async rpc(n,a){
        if(n==="diretorio")return {data:[{id:eu,nome:S.profile.nome,perfil:S.perfil,foto_url:S.profile.foto_url||null},...pessoas.map(p=>({id:p.id,nome:p.nome,perfil:p.perfil,foto_url:null}))],error:null};
        if(n==="minhas_ufs")return {data:(S.perfil==="Gestor de Revenda"||S.perfil==="Vendedor de Revenda")?ufsDaRevenda():[],error:null};
        if(n==="lead_marcar"){const l=leads.find(x=>x.id===a.p_id);if(l)Object.assign(l,{status:a.p_status,obs:a.p_obs||l.obs,atendido_por:S.profile.nome,atendido_em:new Date().toISOString()});return {data:null,error:null};}
        if(n==="meu_canal_progresso"){const k=canais.find(c=>c.id===S.profile.canal_id);const r=k&&canal_resultado.find(x=>x.canal_id===k.id);return {data:k?{nome:k.nome,tier:k.tier,meta_kg:k.meta_kg,kg_hib:r.kg_hib,fat_kg_hib:r.fat_kg_hib}:null,error:null};}
        if(n==="equipe_do_canal"){const id=(a&&a.c)||S.profile.canal_id;return {data:pessoas.filter(p=>p.canal_id===id).map(p=>({nome:p.nome,perfil:p.perfil,ultimo_acesso:p.ultimo_acesso,modulos:progresso.filter(x=>x.user_id===p.id).length})),error:null};}
        if(n==="acoes_aprovadas_meu_canal")return {data:acoes_pgd.filter(x=>x.canal_id===S.profile.canal_id&&x.status==="Aprovado").map(x=>({tipo:x.tipo,cidade:x.cidade,data_acao:x.data_acao,descricao:x.descricao,status:x.status})),error:null};
        if(n==="lead_contato"){const l=leads.find(x=>x.id===a.p_id);return {data:l?{telefone:l.telefone,email:l.email}:null,error:null};}
        if(n==="admin_redefinir_senha")return {data:"Demo-0000",error:null};
        return {data:null,error:null};
      },
      functions:{async invoke(nome,o){const b=(o&&o.body)||{};
        if(nome==="rd-crm"){
          if(b.acao==="deals"){const k=b.dono;const L=DEALS[k]||[];return {data:{mais:false,total:L.length,pm:PM[k]||0,itens:b.page>1?[]:L},error:null};}
          if(b.acao==="criar"){const n=rc_negociacoes.find(x=>String(x.id)===String(b.id))||DB.rc_negociacoes.find(x=>String(x.id)===String(b.id));if(n){n.status="No CRM";n.crm_deal_id="demonstracao";}return {data:{ok:true,deal_id:"demonstracao"},error:null};}
          return {data:{ok:true,lidas:0,gravadas:0,comDoc:0,total:0,proxima:null,falhas:[]},error:null};}
        if(nome==="criar-usuario"){DB.profiles.push({id:nid(),nome:b.nome,email:b.email,perfil:b.perfil,telefone:"",ultimo_acesso:null,canal_id:null,acessos:["academia"]});return {data:{email:b.email,senha:"Demo-0000"},error:null};}
        return {data:{ok:true},error:null};}},
      storage:{from(bk){return {
        async upload(caminho,blob){try{urls[bk+"/"+caminho]=URL.createObjectURL(blob);}catch(e){}return {data:{path:caminho},error:null};},
        getPublicUrl(caminho){return {data:{publicUrl:urls[bk+"/"+caminho]||""}};},
        async createSignedUrl(caminho,s){if(bk==="enxoval")return real.storage.from(bk).createSignedUrl(caminho,s);return {data:{signedUrl:urls[bk+"/"+caminho]||""},error:null};},
        async remove(){return {data:[],error:null};},async list(){return {data:[],error:null};}};}}
    };
    window.__DEMO.cliente=cliente;
    return cliente;
  };

  /* monta paineis, mapa e rankings com as mesmas regras do portal, a partir das negociacoes ficticias */
  window.demoCarregar=async function(S){
    const antes=S.perfil;S.perfil="Administrador";
    try{localStorage.setItem("pc_orgsync",String(Date.now()));}catch(e){}
    await atualizarCRM(()=>{});
    S.perfil=antes;S.crm=null;S.mapa=undefined;S.leadsCache=null;S.mercado=null;S.crmProg="";
  };

  const TODAS=["academia","conecta-rc","tabela-precos","calculadora","conecta-revendas","enxoval","leads","inside-sales","meu-crm","duvidas","mural","mercado"];
  const VISOES={
    "Administrador":{acessos:TODAS},
    "Comercial Barenbrug":{acessos:["academia","conecta-rc","tabela-precos","calculadora","conecta-revendas","enxoval","leads","meu-crm","mercado"],crm_dono:"Carlos Menezes"},
    "RC":{acessos:["academia","conecta-rc","tabela-precos","calculadora","enxoval","mercado"],rc_crm:"Horizonte Representacoes Ltda"},
    "Gestor de Revenda":{acessos:["academia","conecta-revendas","tabela-precos","calculadora","leads","enxoval","mercado"],canal:0},
    "Vendedor de Revenda":{acessos:["academia","calculadora","conecta-revendas","leads","enxoval","mercado"],canal:0},
    "Inside Sales":{acessos:["academia","inside-sales","meu-crm","tabela-precos","calculadora","enxoval","mercado"],is_vendedora:"Bianca",crm_dono:"IS: Bianca"}
  };
  window.demoVisoes=Object.keys(VISOES);
  window.demoVer=function(S,v){
    const cfg=VISOES[v]||VISOES.Administrador;const D=window.__DEMO;
    S.perfil=v;Object.assign(S.profile,{perfil:v,acessos:cfg.acessos.slice(),abas_ocultas:[],exige_curso:false,crm_dono:cfg.crm_dono||null,rc_crm:cfg.rc_crm||null,is_vendedora:cfg.is_vendedora||null,canal_id:cfg.canal!=null?D.canais[cfg.canal].id:null,comercial_resp:v==="RC"?"Carlos Menezes":null});
    try{schemaDoPerfil(v).forEach(c=>{if(!S.profile[c.k])S.profile[c.k]=/uf|estado/i.test(c.k)?"MT":/cidade|munic/i.test(c.k)?"Sinop":/tel|cel|whats|fone/i.test(c.k)?"(00) 00000-0000":/cpf|cnpj|doc/i.test(c.k)?"00000000000":"Demonstração";});}catch(e){}
    Object.assign(S,{secao:null,pag:"hub",crm:null,mapa:undefined,leadsCache:null,leadUfs:null,leadCanais:null,canais:null,canalRes:null,equipe:null,rcNeg:undefined,meuCanalProg:undefined,mapaF:null,mapaPin:null,crmSel:null,isSel:null,canalSel:null,feedF:"tudo",duvNova:false,postNovo:false,delConf:null,form:null,_erro:null});
    try{RC_DEALS_CACHE=null;}catch(e){}
  };
})();
