/*
  O BAÚ DO TEMPO — CONTEÚDO DO JOGO
  =================================
  Este arquivo guarda TODOS os textos, brinquedos, brincadeiras e lugares do jogo.
  Você pode editar os textos aqui sem mexer no resto do jogo.

  COMO EDITAR (com cuidado):
  - Troque só o que está ENTRE ASPAS "assim". Não apague as aspas, as vírgulas
    nem os sinais { } [ ].
  - Cada item fica entre { e }, separado do próximo por uma vírgula.
  - "desenho" é o nome de uma ilustração do arquivo js/desenhos.js. Não troque,
    a não ser por outro nome que já exista lá.
  - "origem": se não tiver certeza da origem de um brinquedo, deixe as aspas
    vazias: origem: ""  — assim o jogo não mostra origem nenhuma.
  - No 1º ano, o jogo mostra tudo em LETRA MAIÚSCULA sozinho. Escreva normal.
  - Depois de editar, salve o arquivo e abra o index.html para conferir.
    Se a tela ficar branca, provavelmente faltou uma aspa ou uma vírgula.

  A lista de informações históricas e culturais para conferir está no
  arquivo REVISAR.md.
*/

const CONTEUDO = {

  // ---------------------------------------------------------------
  // HISTÓRIA DO JOGO (telas de abertura)
  // ---------------------------------------------------------------
  historia: [
    { desenho: "cenaSotao",   texto: "Na casa da vovó tem um sótão cheio de coisas antigas." },
    { desenho: "cenaBau",     texto: "Lá no fundo, você encontra um baú. Ele brilha!" },
    { desenho: "cenaViagem",  texto: "O baú é mágico: ele leva você para outros tempos e lugares." },
    { desenho: "cenaMuseu",   texto: "Em cada viagem, você traz um objeto para o baú. O baú vira o seu museu!" }
  ],

  // Nomes das três viagens (uma por ano).
  anos: {
    1: { titulo: "Oficina de Brinquedos", subtitulo: "1º ano", desenho: "portaOficina", cor: "laranja",
         convite: "Vamos conhecer e montar brinquedos!" },
    2: { titulo: "Pátio das Brincadeiras", subtitulo: "2º ano", desenho: "portaPatio", cor: "verde",
         convite: "Vamos aprender e jogar brincadeiras!" },
    3: { titulo: "Passeio pela Cidade", subtitulo: "3º ano", desenho: "portaCidade", cor: "azul",
         convite: "Vamos passear pelos lugares de brincar de São Paulo!" }
  },

  // ---------------------------------------------------------------
  // MATERIAIS (1º ano — Montar brinquedos)
  // ---------------------------------------------------------------
  materiais: [
    { id: "madeira",  nome: "Madeira",          desenho: "mMadeira" },
    { id: "pano",     nome: "Pano",             desenho: "mPano" },
    { id: "palha",    nome: "Palha de milho",   desenho: "mPalha" },
    { id: "sabugo",   nome: "Sabugo de milho",  desenho: "mSabugo" },
    { id: "lata",     nome: "Lata",             desenho: "mLata" },
    { id: "papel",    nome: "Papel",            desenho: "mPapel" },
    { id: "plastico", nome: "Plástico",         desenho: "mPlastico" },
    { id: "penas",    nome: "Penas",            desenho: "mPenas" },
    { id: "barbante", nome: "Barbante",         desenho: "mBarbante" }
  ],

  // ---------------------------------------------------------------
  // BRINQUEDOS PARA MONTAR (1º ano)
  //   materiais: os materiais certos (use os "id" da lista acima)
  //   feitoDe:   frase que aparece quando o brinquedo fica pronto
  //   comoEra:   como era feito antigamente
  //   origem:    deixe "" se não tiver certeza
  // ---------------------------------------------------------------
  montar: [
    { id: "peteca", nome: "Peteca", desenho: "peteca", materiais: ["palha", "penas"],
      feitoDe: "A peteca é feita de palha de milho e penas.",
      comoEra: "A palha era amarrada bem firme, e as penas eram presas em cima.",
      origem: "A peteca é de origem indígena. Povos indígenas brincam de peteca até hoje." },
    { id: "bonecaPano", nome: "Boneca de pano", desenho: "bonecaPano", materiais: ["pano", "barbante"],
      feitoDe: "A boneca de pano é feita de retalhos de pano. O cabelo pode ser de barbante.",
      comoEra: "Era costurada à mão, em casa, com sobras de pano.",
      origem: "" },
    { id: "piao", nome: "Pião", desenho: "piao", materiais: ["madeira", "barbante"],
      feitoDe: "O pião é feito de madeira e roda com a ajuda de um barbante.",
      comoEra: "A madeira era torneada e ganhava uma ponta. O barbante se chama fieira.",
      origem: "" },
    { id: "carrinhoLata", nome: "Carrinho de lata", desenho: "carrinhoLata", materiais: ["lata", "barbante"],
      feitoDe: "O carrinho de lata é feito com latas vazias e um barbante para puxar.",
      comoEra: "As crianças usavam latas que iam para o lixo e tampinhas como rodas.",
      origem: "" },
    { id: "bilboque", nome: "Bilboquê", desenho: "bilboque", materiais: ["madeira", "barbante"],
      feitoDe: "O bilboquê é feito de madeira, com uma bola presa num barbante.",
      comoEra: "Era de madeira. Hoje muita gente faz bilboquê com garrafa de plástico!",
      origem: "" },
    { id: "bonecaSabugo", nome: "Boneca de sabugo", desenho: "bonecaSabugo", materiais: ["sabugo", "palha"],
      feitoDe: "A boneca de sabugo é feita com sabugo de milho e roupa de palha.",
      comoEra: "Depois de comer o milho, o sabugo virava o corpo da boneca.",
      origem: "" }
  ],

  // ---------------------------------------------------------------
  // ANTES E AGORA (1º ano)
  //   aceita: quais caixas estão certas: "vovo", "hoje" ou "dois"
  //   explica: frase curta que aparece depois da escolha
  // ---------------------------------------------------------------
  antesAgora: {
    caixas: [
      { id: "vovo", nome: "No tempo da vovó", desenho: "iVovo" },
      { id: "hoje", nome: "Hoje",             desenho: "iHoje" },
      { id: "dois", nome: "Nos dois",         desenho: "iDois" }
    ],
    itens: [
      { nome: "Pião",              desenho: "piao",         aceita: ["dois"], explica: "O pião existia no tempo da vovó e existe hoje." },
      { nome: "Tablet",            desenho: "tablet",       aceita: ["hoje"], explica: "O tablet é de hoje. No tempo da vovó ele não existia." },
      { nome: "Peteca",            desenho: "peteca",       aceita: ["dois"], explica: "A peteca é muito antiga e continua até hoje." },
      { nome: "Boneca de sabugo",  desenho: "bonecaSabugo", aceita: ["vovo", "dois"], explica: "Era muito comum no tempo da vovó. Hoje é mais rara, mas ainda dá para fazer!" },
      { nome: "Pipa",              desenho: "pipa",         aceita: ["dois"], explica: "A pipa voa no céu desde o tempo da vovó até hoje." },
      { nome: "Celular com jogos", desenho: "celular",      aceita: ["hoje"], explica: "Jogo no celular é coisa de hoje." },
      { nome: "Cavalinho de pau",  desenho: "cavalinho",    aceita: ["vovo", "dois"], explica: "Era muito comum no tempo da vovó. Ainda dá para fazer com um cabo de vassoura!" },
      { nome: "Bola",              desenho: "bola",         aceita: ["dois"], explica: "A bola existia no tempo da vovó e existe hoje." },
      { nome: "Drone de brinquedo", desenho: "drone",       aceita: ["hoje"], explica: "O drone de brinquedo é de hoje." },
      { nome: "Pé de lata",        desenho: "peLata",       aceita: ["vovo", "dois"], explica: "Era muito comum no tempo da vovó. Ainda dá para fazer com latas!" },
      { nome: "Corda",             desenho: "corda",        aceita: ["dois"], explica: "Pular corda é brincadeira de antes e de agora." }
    ]
  },

  // ---------------------------------------------------------------
  // BRINQUEDOS DE MUITOS POVOS (1º ano)
  //   opcoes: três respostas; "certa" é o número da certa (0, 1 ou 2)
  // ---------------------------------------------------------------
  povos: [
    { id: "peteca", nome: "Peteca", desenho: "peteca",
      pergunta: "De onde vem a peteca?",
      opcoes: ["Dos povos indígenas do Brasil", "Do Japão", "Da Itália"], certa: 0,
      texto: "A peteca é de origem indígena. O nome vem da língua tupi. Muitos povos indígenas jogam peteca até hoje." },
    { id: "ritxoko", nome: "Boneca Ritxòkò", desenho: "ritxoko",
      pergunta: "Quem faz a boneca Ritxòkò?",
      opcoes: ["O povo Karajá", "Famílias do Japão", "Famílias da China"], certa: 0,
      texto: "As bonecas Ritxòkò são de cerâmica. Quem faz são as mulheres do povo Karajá, que vive perto do rio Araguaia. Elas fazem essas bonecas até hoje." },
    { id: "abayomi", nome: "Boneca Abayomi", desenho: "abayomi",
      pergunta: "Como é feita a boneca Abayomi?",
      opcoes: ["Só com nós de pano, sem costura", "Com plástico", "Com madeira"], certa: 0,
      texto: "A Abayomi é feita só com nós de pano, sem costura. Foi criada no Brasil pela artesã Lena Martins. É um símbolo da cultura afro-brasileira." },
    { id: "oware", nome: "Oware", desenho: "oware",
      pergunta: "De que país vem o oware?",
      opcoes: ["De Gana", "Do Japão", "Da Itália"], certa: 0,
      texto: "O oware é um jogo de tabuleiro com sementes. Ele é jogado em Gana, um país da África. Faz parte da família de jogos chamada mancala." },
    { id: "pipa", nome: "Pipa", desenho: "pipa",
      pergunta: "Onde a pipa foi inventada?",
      opcoes: ["Na China", "Na Itália", "Em Gana"], certa: 0,
      texto: "A pipa foi inventada na China, há muito, muito tempo. Hoje ela voa no céu do mundo todo." },
    { id: "kendama", nome: "Kendama", desenho: "kendama",
      pergunta: "De que país vem a kendama?",
      opcoes: ["Do Japão", "De Gana", "Da Itália"], certa: 0,
      texto: "A kendama é um brinquedo do Japão, parecido com o bilboquê. Hoje é brincada em muitos países." },
    { id: "tsuru", nome: "Tsuru de papel", desenho: "tsuru",
      pergunta: "O tsuru é uma dobradura de que país?",
      opcoes: ["Do Japão", "Da China", "De Gana"], certa: 0,
      texto: "O tsuru é um pássaro feito de papel dobrado. A arte de dobrar papel se chama origami e vem do Japão." }
  ],

  // ---------------------------------------------------------------
  // CAIXAS DE BRINQUEDOS (1º ano)
  //   Cada rodada tem caixas e brinquedos. "caixa" é o id da caixa certa.
  //   A rodada com "todos: true" é a pergunta "menino ou menina?":
  //   qualquer resposta leva à resposta celebrada "De todo mundo!".
  // ---------------------------------------------------------------
  caixas: [
    { titulo: "Do que o brinquedo é feito?",
      caixas: [
        { id: "madeira", nome: "Madeira", desenho: "mMadeira" },
        { id: "pano",    nome: "Pano",    desenho: "mPano" },
        { id: "lata",    nome: "Lata",    desenho: "mLata" } ],
      itens: [
        { nome: "Pião",             desenho: "piao",         caixa: "madeira" },
        { nome: "Boneca de pano",   desenho: "bonecaPano",   caixa: "pano" },
        { nome: "Carrinho de lata", desenho: "carrinhoLata", caixa: "lata" },
        { nome: "Cavalinho de pau", desenho: "cavalinho",    caixa: "madeira" },
        { nome: "Bola de meia",     desenho: "bolaMeia",     caixa: "pano" },
        { nome: "Pé de lata",       desenho: "peLata",       caixa: "lata" } ] },
    { titulo: "Como se brinca?",
      caixas: [
        { id: "rodar",  nome: "De rodar",        desenho: "iRodar" },
        { id: "ar",     nome: "De jogar no ar",  desenho: "iAr" },
        { id: "puxar",  nome: "De puxar",        desenho: "iPuxar" } ],
      itens: [
        { nome: "Pião",             desenho: "piao",         caixa: "rodar" },
        { nome: "Peteca",           desenho: "peteca",       caixa: "ar" },
        { nome: "Carrinho de lata", desenho: "carrinhoLata", caixa: "puxar" },
        { nome: "Bambolê",          desenho: "bambole",      caixa: "rodar" },
        { nome: "Bola",             desenho: "bola",         caixa: "ar" },
        { nome: "Pato de puxar",    desenho: "patoPuxar",    caixa: "puxar" } ] },
    { titulo: "Este brinquedo é de menino ou de menina?", todos: true,
      caixas: [
        { id: "menino", nome: "De menino",        desenho: "iMenino" },
        { id: "menina", nome: "De menina",        desenho: "iMenina" },
        { id: "todos",  nome: "De todo mundo!",   desenho: "iTodos" } ],
      itens: [
        { nome: "Boneca",   desenho: "bonecaPano", caixa: "todos" },
        { nome: "Carrinho", desenho: "carrinho",   caixa: "todos" },
        { nome: "Bola",     desenho: "bola",       caixa: "todos" },
        { nome: "Corda",    desenho: "corda",      caixa: "todos" },
        { nome: "Pipa",     desenho: "pipa",       caixa: "todos" } ],
      celebra: "De todo mundo! Meninas e meninos podem brincar de tudo." }
  ],

  // ---------------------------------------------------------------
  // GRUPOS QUE ENSINAM BRINCADEIRAS (2º ano — Aprender as regras)
  //   quem:   quem ensina (tempo e cultura)
  //   passos: as regras, em frases curtas
  //   pessoas: aparência das crianças desenhadas (não precisa mudar)
  // ---------------------------------------------------------------
  grupos: [
    { id: "amarelinha", nome: "Amarelinha", desenho: "giz",
      quem: "Crianças de uma rua de São Paulo, hoje.",
      passos: ["Desenhe a amarelinha no chão com giz.",
               "Jogue a pedrinha numa casa.",
               "Pule num pé só, sem pisar na casa da pedrinha."],
      pergunta: "Na amarelinha, onde NÃO pode pisar?",
      opcoes: ["Na casa da pedrinha", "Na casa 1", "No céu"], certa: 0,
      pessoas: [1, 4] },
    { id: "cincoMarias", nome: "Cinco-marias", desenho: "saquinhos",
      quem: "Crianças no tempo dos avós. Ainda se brinca hoje!",
      passos: ["Use cinco saquinhos de pano ou cinco pedrinhas.",
               "Jogue um saquinho para cima.",
               "Pegue um do chão antes de o outro cair."],
      pergunta: "Na cinco-marias, quantos saquinhos são usados?",
      opcoes: ["Cinco", "Dois", "Dez"], certa: 0,
      pessoas: [2, 5], antigo: true },
    { id: "pularCorda", nome: "Pular corda", desenho: "corda",
      quem: "Crianças de antes e de agora.",
      passos: ["Duas pessoas batem a corda.",
               "Outra pessoa entra e pula no meio.",
               "Quem tropeçar troca de lugar com quem bate."],
      pergunta: "Quem tropeça na corda...",
      opcoes: ["Troca de lugar com quem bate", "Sai chorando", "Ganha o jogo"], certa: 0,
      pessoas: [3, 6, 0] },
    { id: "piao", nome: "Pião", desenho: "piao",
      quem: "Crianças no tempo dos avós. Ainda se brinca hoje!",
      passos: ["Enrole o barbante no pião.",
               "Jogue o pião no chão, puxando o barbante.",
               "Ganha quem deixar o pião rodando por mais tempo."],
      pergunta: "O que se enrola no pião?",
      opcoes: ["O barbante", "Uma fita de papel", "Nada"], certa: 0,
      pessoas: [0, 7], antigo: true },
    { id: "xikunahity", nome: "Xikunahity", desenho: "bolaLatex",
      quem: "Crianças e jovens do povo Paresí, de Mato Grosso, hoje.",
      passos: ["Dois times ficam frente a frente.",
               "A bola só pode ser tocada com a cabeça.",
               "O time marca ponto quando o outro time não devolve a bola."],
      pergunta: "No xikunahity, a bola é tocada com...",
      opcoes: ["A cabeça", "As mãos", "Um taco"], certa: 0,
      pessoas: [8, 9, 10] },
    { id: "xondaro", nome: "Xondaro", desenho: "bastao",
      quem: "Crianças Guarani Mbya, que vivem em aldeias de São Paulo, hoje.",
      passos: ["Todos dançam em roda, com música.",
               "Uma pessoa mexe um bastão perto dos outros.",
               "Os outros pulam e desviam, sem deixar o bastão encostar."],
      pergunta: "No xondaro, o que os participantes fazem?",
      opcoes: ["Pulam e desviam do bastão", "Ficam parados", "Jogam bola"], certa: 0,
      pessoas: [8, 10, 9] },
    { id: "oware", nome: "Oware", desenho: "oware",
      quem: "Crianças de Gana, um país da África.",
      passos: ["O tabuleiro tem 12 casinhas, com 4 sementes em cada uma.",
               "Pegue as sementes de uma casinha e solte uma em cada casinha seguinte.",
               "Ganha quem pegar mais sementes."],
      pergunta: "No oware, o que se coloca nas casinhas?",
      opcoes: ["Sementes", "Cartas", "Bolinhas de papel"], certa: 0,
      pessoas: [11, 3] },
    { id: "capoeira", nome: "Capoeira", desenho: "berimbau",
      quem: "Rodas de capoeira, uma tradição afro-brasileira.",
      passos: ["Todos fazem uma roda, com berimbau, pandeiro e palmas.",
               "Duas pessoas jogam no meio da roda, gingando e desviando.",
               "Na capoeira se joga junto, com respeito, sem machucar ninguém."],
      pergunta: "Qual instrumento toca na roda de capoeira?",
      opcoes: ["O berimbau", "O piano", "A guitarra"], certa: 0,
      pessoas: [11, 3, 6] },
    { id: "jokenpo", nome: "Jokenpô", desenho: "maos",
      quem: "Famílias japonesas que vieram para o Brasil e seus descendentes.",
      passos: ["Todos dizem \"jo-ken-pô!\" e mostram a mão.",
               "Pedra ganha da tesoura, tesoura ganha do papel, papel ganha da pedra.",
               "Mãos iguais é empate: joga de novo."],
      pergunta: "Quem ganha: pedra ou tesoura?",
      opcoes: ["A pedra", "A tesoura", "Ninguém"], certa: 0,
      pessoas: [7, 2] },
    { id: "bocha", nome: "Bocha", desenho: "bocha",
      quem: "Famílias italianas que vieram para São Paulo, em bairros como a Mooca.",
      passos: ["Primeiro, joga-se uma bolinha pequena, o bolim.",
               "Cada um joga suas bolas, tentando chegar perto do bolim.",
               "Ganha quem deixar a bola mais perto do bolim."],
      pergunta: "Na bocha, ganha quem chega mais perto...",
      opcoes: ["Do bolim", "Da parede", "Do juiz"], certa: 0,
      pessoas: [12, 0], antigo: true }
  ],

  // ---------------------------------------------------------------
  // QUEBRA-CABEÇA DAS REGRAS (2º ano)
  //   Os passos estão NA ORDEM CERTA. O jogo embaralha sozinho.
  // ---------------------------------------------------------------
  quebraCabecas: [
    { nome: "Amarelinha", passos: [
        { texto: "Desenhar a amarelinha com giz", desenho: "passoAmarelinha1" },
        { texto: "Jogar a pedrinha numa casa",    desenho: "passoAmarelinha2" },
        { texto: "Pular num pé só",               desenho: "passoAmarelinha3" },
        { texto: "Pegar a pedrinha na volta",     desenho: "passoAmarelinha4" } ] },
    { nome: "Pião", passos: [
        { texto: "Enrolar o barbante no pião",    desenho: "passoPiao1" },
        { texto: "Segurar o pião na mão",         desenho: "passoPiao2" },
        { texto: "Jogar o pião no chão",          desenho: "passoPiao3" },
        { texto: "Ver o pião rodar",              desenho: "passoPiao4" } ] },
    { nome: "Cinco-marias", passos: [
        { texto: "Espalhar os cinco saquinhos",   desenho: "passoCinco1" },
        { texto: "Jogar um saquinho para cima",   desenho: "passoCinco2" },
        { texto: "Pegar um saquinho do chão",     desenho: "passoCinco3" },
        { texto: "Pegar o que caiu, antes de chegar ao chão", desenho: "passoCinco4" } ] }
  ],

  // ---------------------------------------------------------------
  // BRINCADEIRA DA MINHA FAMÍLIA (2º ano — tela de desenho)
  // ---------------------------------------------------------------
  familia: {
    nomes: ["Pega-pega", "Esconde-esconde", "Amarelinha", "Pular corda", "Pião", "Pipa",
            "Cinco-marias", "Bolinha de gude", "Ciranda", "Passa-anel", "Queimada", "Elástico"],
    quem: ["Avó", "Avô", "Mãe", "Pai", "Tia", "Tio", "Irmã", "Irmão", "Prima", "Primo", "Outra pessoa"]
  },

  // ---------------------------------------------------------------
  // LUGARES DE BRINCAR E DE LAZER (3º ano — Mapa de São Paulo)
  //   x, y: posição no mapa (de 0 a 100)
  //   antes / hoje: legenda das duas ilustrações
  //   itens: o que a criança marca. resposta: "mudou" ou "continuou"
  // ---------------------------------------------------------------
  lugares: [
    { id: "tiete", nome: "Rio Tietê", x: 50, y: 17, desenho: "tiete",
      antes: "Por volta de 1930: gente nadando e remando no rio.",
      hoje:  "Avenidas com carros nas margens do rio.",
      texto: "Antigamente, havia clubes à beira do rio Tietê, e as pessoas nadavam e remavam nele. Depois, o rio ficou poluído e ganhou avenidas nas margens. Hoje há projetos para limpar o rio.",
      itens: [
        { texto: "O rio", resposta: "continuou" },
        { texto: "Nadar e remar no rio", resposta: "mudou" },
        { texto: "Avenidas com carros", resposta: "mudou" } ] },
    { id: "luz", nome: "Jardim da Luz", x: 58, y: 34, desenho: "luz",
      antes: "Por volta de 1900: famílias passeando no jardim.",
      hoje:  "O jardim continua aberto para passear e brincar.",
      texto: "O Jardim da Luz é o parque público mais antigo da cidade. Foi aberto para todos em 1825. As árvores e o lago continuam lá até hoje.",
      itens: [
        { texto: "As árvores", resposta: "continuou" },
        { texto: "O lago", resposta: "continuou" },
        { texto: "As roupas das pessoas", resposta: "mudou" } ] },
    { id: "sesc", nome: "Sesc Pompeia", x: 28, y: 42, desenho: "sesc",
      antes: "Uma fábrica.",
      hoje:  "Um centro de lazer e cultura.",
      texto: "O Sesc Pompeia era uma fábrica. A arquiteta Lina Bo Bardi transformou os galpões em um lugar de lazer, aberto em 1982. Ela construiu também torres novas de concreto.",
      itens: [
        { texto: "Os galpões de tijolo", resposta: "continuou" },
        { texto: "Fábrica virou lugar de brincar", resposta: "mudou" },
        { texto: "Torres de concreto", resposta: "mudou" } ] },
    { id: "paulista", nome: "Avenida Paulista", x: 48, y: 52, desenho: "paulista",
      antes: "Por volta de 1900: casarões e árvores.",
      hoje:  "Aos domingos: avenida aberta para as pessoas.",
      texto: "A Avenida Paulista foi aberta em 1891, com casarões. Hoje tem prédios altos. Aos domingos, ela fecha para os carros e vira lugar de passear e brincar.",
      itens: [
        { texto: "A avenida", resposta: "continuou" },
        { texto: "Casarões viraram prédios altos", resposta: "mudou" },
        { texto: "As árvores do Parque Trianon", resposta: "continuou" } ] },
    { id: "ibirapuera", nome: "Parque Ibirapuera", x: 44, y: 70, desenho: "ibirapuera",
      antes: "Um terreno alagado, com árvores.",
      hoje:  "Um grande parque, com lago e caminhos.",
      texto: "O Parque Ibirapuera foi inaugurado em 1954. Antes, o lugar era um terreno alagado. Hoje é um dos parques mais visitados da cidade.",
      itens: [
        { texto: "As árvores", resposta: "continuou" },
        { texto: "Caminhos e lugares para brincar", resposta: "mudou" },
        { texto: "Prédios do parque", resposta: "mudou" } ] },
    { id: "ceu", nome: "CEU", x: 76, y: 74, desenho: "ceu",
      antes: "Um terreno vazio no bairro.",
      hoje:  "Um CEU, com piscina, quadra e biblioteca.",
      texto: "Os CEUs (Centros Educacionais Unificados) são da Prefeitura de São Paulo. Os primeiros foram abertos em 2003. Têm escola, biblioteca, teatro, quadras e piscinas para o bairro.",
      itens: [
        { texto: "As crianças do bairro", resposta: "continuou" },
        { texto: "Piscina e quadra", resposta: "mudou" },
        { texto: "O terreno vazio", resposta: "mudou" } ] }
  ],

  // ---------------------------------------------------------------
  // DETETIVE DA ACESSIBILIDADE (3º ano)
  //   problemas: o que impede uma criança com deficiência de brincar.
  //   melhorias: três opções; "certa" é o número da certa (0, 1 ou 2).
  //   distracoes: coisas que NÃO atrapalham.
  //   (A posição de cada parte está no desenho; não precisa mudar.)
  // ---------------------------------------------------------------
  acessibilidade: {
    problemas: [
      { id: "escada", nome: "Escada sem rampa",
        achou: "Você achou! A entrada só tem escada. Quem usa cadeira de rodas não consegue entrar.",
        melhorias: ["Fazer uma rampa ao lado da escada", "Colocar mais degraus", "Pôr uma placa de \"proibido\""], certa: 0,
        pronto: "Agora tem rampa! Todo mundo consegue entrar." },
      { id: "piso", nome: "Falta de piso tátil",
        achou: "Você achou! O caminho não tem piso tátil. Quem é cego usa os pés e a bengala para sentir o caminho.",
        melhorias: ["Pintar o caminho de uma cor só", "Colocar piso tátil no caminho", "Tirar o caminho"], certa: 1,
        pronto: "Agora tem piso tátil! O piso com relevo guia quem não enxerga." },
      { id: "balanco", nome: "Brinquedo sem acesso",
        achou: "Você achou! Esse balanço não tem lugar para cadeira de rodas.",
        melhorias: ["Tirar o balanço", "Colocar um balanço mais alto", "Colocar um balanço para cadeira de rodas"], certa: 2,
        pronto: "Agora tem balanço acessível! Todo mundo brinca junto." },
      { id: "bebedouro", nome: "Bebedouro alto demais",
        achou: "Você achou! O bebedouro é alto demais para quem usa cadeira de rodas.",
        melhorias: ["Colocar um bebedouro mais baixo", "Colocar o bebedouro no telhado", "Tirar o bebedouro"], certa: 0,
        pronto: "Agora tem bebedouro baixo! Todo mundo consegue beber água." }
    ],
    distracoes: [
      { id: "arvore", texto: "A árvore não atrapalha ninguém. Ela dá sombra! Procure outra coisa." },
      { id: "banco",  texto: "O banco tem espaço do lado para a cadeira de rodas. Procure outra coisa." },
      { id: "flores", texto: "As flores não atrapalham. Procure outra coisa." }
    ]
  },

  // ---------------------------------------------------------------
  // ESPAÇOS DE DIFERENTES CULTURAS EM SÃO PAULO (3º ano)
  // ---------------------------------------------------------------
  culturas: [
    { id: "guarani", nome: "Aldeias Guarani", desenho: "culturaGuarani",
      texto: "O povo Guarani Mbya vive em São Paulo hoje, em aldeias no Jaraguá (zona norte) e em Parelheiros (zona sul). Nas escolas das aldeias, as crianças aprendem em guarani e em português, e têm muito espaço para brincar.",
      pergunta: "Quando o povo Guarani vive em São Paulo?",
      opcoes: ["Hoje, e também antes", "Só no passado", "Nunca viveu aqui"], certa: 0 },
    { id: "capoeira", nome: "Roda de capoeira", desenho: "culturaCapoeira",
      texto: "A capoeira é uma tradição afro-brasileira, com música, jogo e dança. Em São Paulo há rodas em praças, escolas e centros culturais. A roda de capoeira é patrimônio cultural do Brasil.",
      pergunta: "A capoeira é uma tradição...",
      opcoes: ["Afro-brasileira", "Japonesa", "Italiana"], certa: 0 },
    { id: "bixiga", nome: "Bixiga", desenho: "culturaBixiga",
      texto: "No bairro do Bixiga nasceu a escola de samba Vai-Vai, criada em 1930 por moradores negros do bairro. Ali também acontece a Festa da Achiropita, trazida por famílias italianas.",
      pergunta: "Que escola de samba nasceu no Bixiga?",
      opcoes: ["A Vai-Vai", "Nenhuma", "Uma escola japonesa"], certa: 0 },
    { id: "liberdade", nome: "Liberdade", desenho: "culturaLiberdade",
      texto: "No bairro da Liberdade vivem e trabalham muitas famílias de origem japonesa, chinesa e coreana. Na festa Tanabata Matsuri, as pessoas penduram pedidos escritos em papéis coloridos.",
      pergunta: "Na festa Tanabata, o que as pessoas penduram?",
      opcoes: ["Pedidos em papéis coloridos", "Meias", "Bolas de futebol"], certa: 0 },
    { id: "kantuta", nome: "Praça Kantuta", desenho: "culturaKantuta",
      texto: "Aos domingos, famílias bolivianas que vivem em São Paulo se encontram na Praça Kantuta, no bairro do Pari. Tem comida, música, dança e brincadeiras da Bolívia.",
      pergunta: "Quem se encontra na Praça Kantuta aos domingos?",
      opcoes: ["Famílias bolivianas", "Só turistas", "Ninguém"], certa: 0 },
    { id: "museuAfro", nome: "Museu Afro Brasil", desenho: "culturaMuseuAfro",
      texto: "O Museu Afro Brasil fica no Parque Ibirapuera. Ele mostra a arte, a história e a cultura da população negra no Brasil.",
      pergunta: "Onde fica o Museu Afro Brasil?",
      opcoes: ["No Parque Ibirapuera", "No rio Tietê", "Na praia"], certa: 0 },
    { id: "imigracao", nome: "Museu da Imigração", desenho: "culturaImigracao",
      texto: "No bairro da Mooca ficava a Hospedaria de Imigrantes, onde famílias que chegavam de muitos países ficavam nos primeiros dias. Hoje o prédio é o Museu da Imigração.",
      pergunta: "O que o prédio da Hospedaria virou?",
      opcoes: ["O Museu da Imigração", "Uma fábrica", "Um rio"], certa: 0 }
  ],

  // ---------------------------------------------------------------
  // OBJETOS ESPECIAIS DO BAÚ
  //   Cada atividade terminada coloca um objeto no baú.
  // ---------------------------------------------------------------
  objetosBau: {
    retrato:      { nome: "Retrato da vovó",          desenho: "retrato",      texto: "A vovó criança brincando de pião. Muitos brinquedos de antes continuam até hoje!" },
    caixaTodos:   { nome: "Caixa de todo mundo",      desenho: "caixaTodos",   texto: "Uma caixa de brinquedos de todo mundo: meninas e meninos podem brincar de tudo." },
    pedrinha:     { nome: "Pedrinha da amarelinha",   desenho: "pedrinha",     texto: "A pedrinha mostra a casa em que não se pode pisar." },
    maos:         { nome: "Mãos do jokenpô",          desenho: "maos",         texto: "Pedra, papel e tesoura: o jokenpô veio do Japão." },
    quebraCabeca: { nome: "Quebra-cabeça das regras", desenho: "quebraCabeca", texto: "Toda brincadeira tem regras, e elas têm uma ordem." },
    lupa:         { nome: "Lupa de detetive",         desenho: "lupa",         texto: "Uma cidade boa para brincar é uma cidade para todas as crianças, com ou sem deficiência." }
  },

  // ---------------------------------------------------------------
  // MENSAGENS GERAIS
  // ---------------------------------------------------------------
  mensagens: {
    acertos: ["Muito bem!", "Isso mesmo!", "Você acertou!", "Que legal!"],
    tenteDeNovo: "Tente de novo!",
    concluiu: "Atividade terminada!",
    ganhouBau: "Você trouxe para o baú:",
    bauVazio: "O baú ainda está vazio. Faça uma viagem para trazer objetos!"
  }
};
