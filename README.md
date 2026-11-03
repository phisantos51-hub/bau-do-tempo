# O Baú do Tempo

Jogo educativo de História para o Ciclo de Alfabetização (1º, 2º e 3º ano do Ensino Fundamental), com o eixo do brincar do Currículo da Cidade de São Paulo:

- **1º ano – Oficina de Brinquedos**: montar brinquedos, antes e agora, brinquedos de muitos povos, caixas de brinquedos.
- **2º ano – Pátio das Brincadeiras**: aprender as regras, amarelinha digital, jokenpô, quebra-cabeça das regras, brincadeira da minha família (desenho).
- **3º ano – Passeio pela Cidade**: mapa de São Paulo (antes e hoje), detetive da acessibilidade, espaços de diferentes culturas.

Endereço do jogo: https://phisantos51-hub.github.io/bau-do-tempo/

## Como funciona

- Só HTML, CSS e JavaScript. Não precisa instalar nada.
- Funciona com mouse (botões grandes, sem clique duplo) e também com o teclado.
- Sem som obrigatório: todo aviso é visual. O som começa desligado (botão "Som" na barra de cima).
- Botões "Como jogar" e "Pausa" sempre visíveis.
- Até 3 estrelas por atividade; não existe "fim de jogo": os erros viram dicas.
- **Meu baú**: o museu da criança, com tudo o que ela colecionou e os desenhos da família.
- **Área do professor** (botão discreto no canto de baixo, protegido por uma conta de somar): liberar todas as fases ou apagar o progresso.
- O progresso e os desenhos ficam guardados **só no navegador daquele computador**. Nada é enviado para a internet. Sem anúncios e sem links externos.
- Depois de aberto uma vez, o jogo funciona sem internet enquanto a página estiver aberta. Para usar totalmente sem internet, baixe os arquivos e abra o `index.html` no navegador.

## Acessibilidade

Na tela inicial há o botão **Acessibilidade** (também disponível na Área do professor). As escolhas ficam guardadas neste navegador, neste computador, e **não** são apagadas pelo "Apagar progresso".

- **Modo Áudio**: para estudantes cegos. O jogo fala sozinho (voz do navegador, em português do Brasil) e funciona só pelo teclado: setas para navegar, Enter para confirmar, Esc para voltar, barra de espaço para repetir a última fala, H para a ajuda falada, números 1 a 9 para escolher direto. Todas as atividades têm versão falada (sem arrastar e sem desenho). A amarelinha usa sons de direção (esquerda e direita no fone; mais agudo à frente, mais grave atrás; um som para acertar a casa e outro para pisar na linha).
- **Voz do jogo**: desligue quando o computador usar o NVDA ou o Narrador do Windows, para não ter duas vozes. O jogo continua avisando o leitor de tela.
- **Voz mais devagar**.
- **Modo Calmo**: para estudantes com TEA. Cores suaves, sem brilhos, transições lentas, barra de progresso, instruções em passos numerados com figuras, linguagem literal, erros neutros, recompensa sempre igual, pausa tranquila e desenho com poucas ferramentas.
- **Sem animações**, **Letras e botões maiores** e **Alto contraste**.

Os textos falados e as descrições das ilustrações ficam em `js/acessibilidade.js`.

## Arquivos

- `index.html`: a página do jogo.
- `css/estilo.css`: cores, tamanhos e o visual.
- `js/conteudo.js`: **todos os textos, brinquedos, brincadeiras e lugares** (é aqui que se edita o conteúdo).
- `js/desenhos.js`: todas as ilustrações, desenhadas pelo próprio jogo.
- `js/acessibilidade.js`: textos do Modo Áudio e do Modo Calmo (descrições faladas, história falada, ajuda falada).
- `js/jogo.js`: o funcionamento do jogo.
- `REVISAR.md`: **lista das informações históricas e culturais para conferir** antes de usar com as turmas.

## Como editar os conteúdos

Abra `js/conteudo.js`. No começo do arquivo há instruções. Troque só o que está entre aspas. Depois de salvar, aumente o número `?v=2` no `index.html` (por exemplo, para `?v=3`) para os computadores baixarem a versão nova.
