/*
  O BAÚ DO TEMPO — TEXTOS DE ACESSIBILIDADE
  =========================================
  Este arquivo guarda os textos usados no Modo Áudio e no Modo Calmo:
  - as descrições faladas de cada ilustração (também usadas como texto
    alternativo para leitores de tela, como o NVDA e o Narrador);
  - a história contada em voz alta e a história do Modo Calmo;
  - a ajuda falada de cada tela;
  - a praça do "Detetive da acessibilidade" no Modo Áudio.

  Os conteúdos históricos continuam no arquivo js/conteudo.js.

  COMO EDITAR: troque só o que está entre aspas "assim". Não apague as aspas
  nem as vírgulas. Frases curtas e simples funcionam melhor na voz.
*/

const ACESSIBILIDADE = {

  // ---------------------------------------------------------------
  // HISTÓRIA DO COMEÇO
  // ---------------------------------------------------------------
  // Contada em voz alta no Modo Áudio (curta e acolhedora).
  historiaFalada: [
    "Olá! Que bom que você chegou. Na casa da vovó tem um sótão cheio de coisas antigas.",
    "Lá no fundo do sótão tem um baú grande, de madeira.",
    "Vamos imaginar que o baú é mágico e leva a gente para outros tempos e lugares. É de brincadeira!",
    "Em cada viagem, você traz um objeto para o baú. O baú vira o seu museu. Vamos começar?"
  ],
  // Usada no Modo Calmo: linguagem literal, sem metáforas.
  historiaCalma: [
    { desenho: "cenaSotao",    texto: "Na casa da vovó tem um sótão. No sótão tem muitas coisas antigas." },
    { desenho: "cenaBauCalmo", texto: "No sótão tem um baú grande, de madeira." },
    { desenho: "cenaImaginar", texto: "Vamos imaginar que o baú nos leva ao tempo da vovó e a outros lugares. É de brincadeira." },
    { desenho: "cenaMuseuCalmo", texto: "Em cada atividade, você ganha um objeto para guardar no baú. O baú é o seu museu." }
  ],

  // Frases da tela de escolha das viagens.
  titulos: {
    viagens: "Para onde vamos viajar?",
    viagensCalmo: "Escolha uma parte do jogo."
  },

  // Mensagens do Modo Calmo (sempre iguais, para serem previsíveis).
  calmo: {
    acerto: "Certo!",
    erro: "Vamos tentar de novo.",
    fim: "Você terminou a atividade. Você ganhou 3 estrelas."
  },

  // ---------------------------------------------------------------
  // DESCRIÇÕES DAS ILUSTRAÇÕES
  //   Como é, de que é feito e como se brinca.
  //   O nome à esquerda é o nome do desenho (não mude).
  // ---------------------------------------------------------------
  descricoes: {
    // Brinquedos
    peteca: "Peteca: uma base macia de palha com penas em cima. A gente bate nela com a mão para ela voar.",
    bonecaPano: "Boneca de pano: uma boneca macia, feita de retalhos de pano costurados, com cabelo de barbante.",
    piao: "Pião: um brinquedo de madeira, com formato de gota e uma ponta embaixo. A gente enrola um barbante e joga no chão para ele rodar.",
    carrinhoLata: "Carrinho de lata: uma lata deitada, com tampinhas como rodas e um barbante para puxar.",
    bilboque: "Bilboquê: um cabo de madeira com um copinho em cima e uma bola presa num barbante. A gente joga a bola para cima e tenta pegar com o copinho.",
    bonecaSabugo: "Boneca de sabugo: o sabugo do milho é o corpo, e a roupa é de palha de milho.",
    pipa: "Pipa: um papel fino esticado em varetas, com uma rabiola comprida. Presa numa linha, ela voa com o vento.",
    bola: "Bola: redonda e leve. A gente chuta, joga e pega.",
    tablet: "Tablet: um aparelho com tela grande. A gente toca na tela para jogar.",
    celular: "Celular com jogos: um aparelho pequeno com tela. A gente toca na tela para jogar.",
    drone: "Drone de brinquedo: um aparelho com quatro hélices que voa, controlado de longe.",
    cavalinho: "Cavalinho de pau: um cabo comprido com uma cabeça de cavalo na ponta. A gente monta e sai correndo.",
    peLata: "Pé de lata: duas latas com barbantes. A gente sobe nas latas, segura os barbantes e anda.",
    corda: "Corda: uma corda comprida com cabos nas pontas. A gente pula por cima dela.",
    bolaMeia: "Bola de meia: uma bola macia feita de meias enroladas.",
    bambole: "Bambolê: um aro grande e redondo. A gente gira o bambolê na cintura.",
    patoPuxar: "Pato de puxar: um patinho de madeira com rodas e um barbante. A gente puxa e ele anda.",
    carrinho: "Carrinho: um carrinho de brinquedo com quatro rodas.",
    kendama: "Kendama: um cabo de madeira com copinhos dos lados e uma bola presa num barbante. A gente joga a bola e tenta pegar nos copinhos.",
    abayomi: "Boneca Abayomi: uma boneca de pano preto, feita só com nós, com vestido colorido. Ela não tem rosto desenhado.",
    oware: "Oware: um tabuleiro de madeira com doze buracos, seis de cada lado, e sementes dentro. A gente pega as sementes e vai soltando uma em cada buraco.",
    tsuru: "Tsuru: um pássaro de papel, feito só com dobras.",
    ritxoko: "Boneca Ritxòkò: uma boneca de barro cozido, com pinturas de linhas e desenhos.",
    gude: "Bolinhas de gude: bolinhas pequenas e lisas, de vidro. A gente joga uma para acertar a outra.",
    cataVento: "Cata-vento: um palito com quatro pás coloridas. Quando venta, ele gira.",
    // Materiais
    mMadeira: "Madeira: dura. Vem das árvores.",
    mPano: "Pano: macio. É o tecido das roupas.",
    mPalha: "Palha de milho: as folhas secas que cobrem a espiga de milho.",
    mSabugo: "Sabugo de milho: o miolo da espiga, depois que tiramos os grãos.",
    mLata: "Lata: de metal, dura e fria.",
    mPapel: "Papel: fino e leve.",
    mPlastico: "Plástico: o material das garrafas de refrigerante.",
    mPenas: "Penas: macias e leves. Vêm das aves.",
    mBarbante: "Barbante: um fio comprido e fino.",
    // Objetos das brincadeiras e do baú
    giz: "Gizes coloridos, para desenhar no chão.",
    saquinhos: "Cinco saquinhos de pano coloridos, cheios de arroz.",
    bolaLatex: "Uma bola escura de borracha.",
    bastao: "Um bastão comprido de madeira.",
    berimbau: "Berimbau: um arco de madeira com um fio de metal e uma cabaça redonda. A gente bate no fio com uma varinha e ele faz música.",
    maos: "Três mãos: uma fechada, a pedra; uma aberta, o papel; e uma com dois dedos, a tesoura.",
    maoPedra: "Pedra: a mão fechada.",
    maoPapel: "Papel: a mão aberta.",
    maoTesoura: "Tesoura: a mão com dois dedos esticados.",
    bocha: "Bolas de bocha coloridas e uma bolinha amarela, o bolim, num chão de areia.",
    pedrinha: "Uma pedrinha numa casa da amarelinha.",
    retrato: "Um retrato antigo: a vovó criança brincando de pião.",
    caixaTodos: "Uma caixa com bola, boneca e carrinho, e um coração.",
    lupa: "Uma lupa de detetive.",
    quebraCabeca: "Um quebra-cabeça verde com os números 1, 2, 3 e 4.",
    bau: "Um baú de madeira fechado.",
    bauAberto: "Um baú de madeira aberto, com uma luz saindo de dentro.",
    // Caixas e escolhas
    iVovo: "Uma vovó de cabelo branco e óculos.",
    iHoje: "Uma criança de hoje.",
    iDois: "Uma vovó e uma criança de mãos dadas.",
    iRodar: "Uma seta girando.",
    iAr: "Uma mão jogando uma bola para cima.",
    iPuxar: "Uma mão puxando um carrinho.",
    iMenino: "Um menino.",
    iMenina: "Uma menina.",
    iTodos: "Três crianças felizes, de braços para cima, e um coração.",
    // Cenas da história e das portas
    cenaSotao: "Um sótão de madeira, com caixas antigas, uma janela redonda e um baú no chão.",
    cenaBau: "Um baú de madeira no sótão, com luz em volta. Uma criança olha para ele.",
    cenaBauCalmo: "Um baú de madeira no chão do sótão. Uma criança olha para ele.",
    cenaViagem: "Uma criança feliz no meio de círculos coloridos, com uma pipa, um pião, uma peteca e uma bola em volta.",
    cenaImaginar: "Uma criança ao lado do baú aberto. Num balão de pensamento, a vovó criança brincando de pião.",
    cenaMuseu: "Um baú aberto e prateleiras com brinquedos. Uma criança comemora.",
    cenaMuseuCalmo: "Um baú aberto e prateleiras com brinquedos. Uma criança está ao lado.",
    portaOficina: "Uma oficina: uma mesa com pião, peteca e carrinho de lata, e materiais pendurados.",
    portaPatio: "Um pátio: crianças brincando de amarelinha e de pular corda.",
    portaCidade: "Uma cidade com prédios, árvores e um rio. Crianças brincando.",
    mapa: "Um mapa colorido de São Paulo, com rios, ruas e parques.",
    praca: "Uma praça com parquinho: uma entrada com escada, um bebedouro, uma árvore, um banco, um balanço, flores e um caminho.",
    // Lugares de São Paulo: Antes e Hoje
    tieteAntes: "Um rio largo, com árvores nas margens e um clube. Pessoas nadam no rio, e duas pessoas remam num barco.",
    tieteHoje: "O mesmo rio, cinzento, com avenidas dos dois lados, muitos carros e prédios altos. Ninguém nada no rio.",
    luzAntes: "Um jardim com árvores, um lago e um caminho. Famílias passeiam com roupas compridas e chapéus. Um menino brinca com um aro.",
    luzHoje: "O mesmo jardim, com as árvores e o lago. Crianças com roupas de hoje brincam. Há uma estátua e um banco.",
    sescAntes: "Dois galpões de tijolo e uma chaminé. Está escrito: fábrica. Na frente, trabalhadores e barris.",
    sescHoje: "Os mesmos galpões de tijolo, agora com janelas de vidro. Ao lado, duas torres altas de concreto, com janelas de formatos diferentes. Crianças brincam e jogam bola.",
    paulistaAntes: "Uma avenida de terra, com casarões grandes e árvores. Passa uma carroça puxada por um cavalo. As pessoas usam chapéu.",
    paulistaHoje: "A mesma avenida, agora com prédios altos. Uma placa diz: domingo. Não há carros. Crianças brincam, andam de bicicleta e jogam bola. Ao lado, as árvores do parque.",
    ibirapueraAntes: "Um terreno com poças de água, mato e árvores altas e finas. Não há ninguém.",
    ibirapueraHoje: "Um parque com um lago grande, árvores, gramado, um caminho e uma construção comprida com telhado. Crianças brincam e correm.",
    ceuAntes: "Um terreno de terra vazio, com casinhas em volta. Duas crianças brincam com uma bola de meia na terra.",
    ceuHoje: "No lugar do terreno, um prédio amarelo escrito CEU, uma piscina e uma quadra. Crianças brincam.",
    // Espaços de diferentes culturas
    culturaGuarani: "Uma aldeia com árvores e um morro ao fundo. Há uma casa de madeira e uma escola. Crianças com roupas de hoje brincam de peteca.",
    culturaCapoeira: "Pessoas de roupa branca em roda. Duas pessoas jogam capoeira no meio. Ao lado, um berimbau.",
    culturaBixiga: "Uma rua com casas e bandeirinhas coloridas. Um tambor de samba e pessoas dançando.",
    culturaLiberdade: "Uma rua com um grande portal vermelho, luminárias vermelhas e um bambu com papéis coloridos pendurados. Pessoas passeiam.",
    culturaKantuta: "Uma praça com barracas coloridas, tecidos listrados, frutas e comidas. Pessoas dançam.",
    culturaMuseuAfro: "Um prédio branco escrito Museu Afro Brasil, com quadros na parede. Árvores do parque em volta. Famílias visitam.",
    culturaImigracao: "Um prédio grande, com relógio e muitas janelas, escrito museu. Na frente, um trilho de trem e uma família com malas.",
    // Passos dos quebra-cabeças
    passoAmarelinha1: "Uma mão desenhando a amarelinha no chão com giz.",
    passoAmarelinha2: "Uma pedrinha caindo numa casa da amarelinha.",
    passoAmarelinha3: "Uma criança pulando num pé só na amarelinha.",
    passoAmarelinha4: "Uma mão pegando a pedrinha na amarelinha.",
    passoPiao1: "Um barbante enrolado no pião.",
    passoPiao2: "Uma mão segurando o pião.",
    passoPiao3: "O pião sendo jogado no chão.",
    passoPiao4: "O pião rodando no chão.",
    passoCinco1: "Cinco saquinhos espalhados no chão.",
    passoCinco2: "Uma mão jogando um saquinho para cima.",
    passoCinco3: "Uma mão pegando um saquinho do chão.",
    passoCinco4: "Uma mão pegando o saquinho que caiu."
  },

  // Como é cada brincadeira (falado antes das regras, no 2º ano).
  brincadeiras: {
    amarelinha: "Amarelinha: um desenho no chão, com casas numeradas de 1 até o céu.",
    cincoMarias: "Cinco-marias: uma brincadeira com cinco saquinhos pequenos de pano.",
    pularCorda: "Pular corda: duas pessoas giram uma corda comprida, e outra pula.",
    piao: "Pião: um brinquedo de madeira que roda no chão.",
    xikunahity: "Xikunahity: um jogo com dois times e uma bola de borracha, tocada só com a cabeça.",
    xondaro: "Xondaro: uma dança em roda, com música, em que a gente pula e desvia.",
    oware: "Oware: um jogo de tabuleiro com buracos e sementes.",
    capoeira: "Capoeira: uma roda com música, em que duas pessoas jogam no meio, gingando.",
    jokenpo: "Jokenpô: um jogo com as mãos: pedra, papel ou tesoura.",
    bocha: "Bocha: um jogo com bolas pesadas, jogadas no chão de areia."
  },

  // ---------------------------------------------------------------
  // DETETIVE DA ACESSIBILIDADE NO MODO ÁUDIO
  //   problema: true = atrapalha alguém a brincar.
  //   melhorias: três opções; "certa" é o número da certa (0, 1 ou 2).
  // ---------------------------------------------------------------
  pracaFalada: {
    intro: "Vamos visitar uma praça com parquinho. Ouça o que tem nela. Depois, diga o que atrapalha alguém a brincar.",
    elementos: [
      { id: "escada", texto: "Uma escada de três degraus na entrada, sem rampa.", problema: true,
        porque: "Quem usa cadeira de rodas não consegue subir a escada.",
        melhorias: ["Fazer uma rampa ao lado da escada", "Colocar mais degraus", "Pôr uma placa de proibido"], certa: 0,
        pronto: "Agora tem uma rampa na entrada. Todo mundo consegue entrar." },
      { id: "piso", texto: "Um caminho liso até o parquinho, sem piso tátil.", problema: true,
        porque: "Quem é cego usa os pés e a bengala para sentir o caminho. Sem piso tátil, fica difícil achar o parquinho.",
        melhorias: ["Pintar o caminho de uma cor só", "Colocar piso tátil no caminho", "Tirar o caminho"], certa: 1,
        pronto: "Agora tem piso tátil, com relevo, que guia quem não enxerga." },
      { id: "placa", texto: "Uma placa com o nome do parquinho, só com letras pintadas.", problema: true,
        porque: "Quem é cego não consegue ler letras pintadas. Precisa de braille ou de letras em relevo.",
        melhorias: ["Pintar a placa de outra cor", "Escrever o nome também em braille e em relevo", "Tirar a placa"], certa: 1,
        pronto: "Agora a placa tem braille e letras em relevo. Dá para ler com os dedos." },
      { id: "balanco", texto: "Um balanço alto, sem encosto.", problema: true,
        porque: "Quem precisa de apoio nas costas, ou usa cadeira de rodas, não consegue usar esse balanço.",
        melhorias: ["Tirar o balanço", "Colocar um balanço com encosto, cinto e lugar para cadeira de rodas", "Colocar um balanço mais alto"], certa: 1,
        pronto: "Agora tem um balanço com encosto e lugar para cadeira de rodas. Todo mundo brinca junto." },
      { id: "bebedouro", texto: "Um bebedouro muito alto.", problema: true,
        porque: "Quem usa cadeira de rodas, ou é pequeno, não alcança a água.",
        melhorias: ["Colocar um bebedouro mais baixo", "Colocar o bebedouro no telhado", "Tirar o bebedouro"], certa: 0,
        pronto: "Agora tem um bebedouro baixo. Todo mundo consegue beber água." },
      { id: "arvore", texto: "Uma árvore grande que faz sombra.", problema: false,
        porque: "A árvore não atrapalha. Ela dá sombra." },
      { id: "banco", texto: "Um banco com espaço do lado.", problema: false,
        porque: "O banco não atrapalha. Ele tem espaço do lado para uma cadeira de rodas." },
      { id: "flores", texto: "Um canteiro de flores cheirosas, fora do caminho.", problema: false,
        porque: "As flores ficam fora do caminho e não atrapalham. E têm cheiro bom!" }
    ]
  },

  // ---------------------------------------------------------------
  // AJUDA FALADA (tecla H no Modo Áudio)
  // ---------------------------------------------------------------
  ajudaGeral: "Use as setas para ouvir as opções. Enter escolhe. Esc volta. A barra de espaço repete a última fala. A tecla H é a ajuda.",
  ajuda: {
    abertura: "Esta é a tela de começo. Escolha Começar e aperte Enter.",
    historia: "Ouça a história. Enter continua. Esc volta.",
    viagens: "Escolha o ano com as setas e aperte Enter. Você também pode escolher o Meu baú.",
    ano: "Escolha uma atividade com as setas e aperte Enter. Esc volta para as viagens.",
    bau: "Use as setas para ouvir cada objeto do seu baú. Esc volta.",
    montar: "Use as setas para ouvir os materiais. Aperte Enter para escolher um material.",
    antesAgora: "Ouça o brinquedo. Depois escolha: 1, no tempo da vovó. 2, hoje. 3, nos dois. Use as setas ou os números, e aperte Enter.",
    povos: "Ouça a pergunta. Use as setas para ouvir as respostas e aperte Enter para escolher.",
    caixas: "Ouça o brinquedo e escolha a caixa certa com as setas ou com os números 1, 2 e 3.",
    regras: "Escolha um grupo de crianças. Depois, use as setas para ouvir as regras, passo a passo. Enter repete o passo.",
    amarelinha: "Enter joga e pega a pedrinha. Seta para cima pula para a frente. Seta para baixo pula para trás. Setas para os lados pulam para a esquerda e para a direita. Ouça de onde vem o som da próxima casa.",
    jokenpo: "Escolha pedra, papel ou tesoura. Depois diga quem ganhou.",
    quebraCabeca: "Ouça as etapas. Escolha qual vem primeiro, depois qual vem em seguida.",
    familia: "Escolha o nome da brincadeira na lista, ou escolha Escrever outro nome. Depois diga quem ensinou.",
    mapa: "Escolha um lugar da cidade. Ouça como era antes e como é hoje. Depois diga o que mudou e o que continuou.",
    acessibilidade: "Ouça o que tem na praça. Escolha um item e diga se ele atrapalha alguém a brincar. Depois escolha a melhor melhoria.",
    culturas: "Escolha um lugar. Ouça sobre ele. Depois responda a pergunta."
  }
};
