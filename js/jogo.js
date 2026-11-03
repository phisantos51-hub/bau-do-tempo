/*
  O BAÚ DO TEMPO — FUNCIONAMENTO DO JOGO
  ======================================
  Este arquivo faz o jogo funcionar. Para mudar TEXTOS, brinquedos, brincadeiras
  e lugares, use o arquivo js/conteudo.js (não precisa mexer aqui).

  O progresso e os desenhos ficam guardados só neste navegador, neste computador
  (localStorage). Nada é enviado para a internet.
*/
(function () {
  "use strict";

  const C = CONTEUDO;
  const tela = document.getElementById("tela");
  const barra = document.getElementById("barra");
  const retorno = document.getElementById("retorno");
  const fundoJanela = document.getElementById("fundo-janela");
  const janela = document.getElementById("janela");
  const botaoProfessor = document.getElementById("botao-professor");

  // ===================================================================
  // Utilidades
  // ===================================================================
  function el(tag, attrs, filhos) {
    const e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        const v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") e.className = v;
        else if (k === "texto") e.textContent = v;
        else if (k === "html") e.innerHTML = v;
        else if (k.indexOf("on") === 0) e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? "" : v);
      });
    }
    (filhos || []).forEach(function (f) {
      if (f === null || f === undefined || f === false) return;
      e.append(typeof f === "string" ? document.createTextNode(f) : f);
    });
    return e;
  }
  function figura(nome, classe, extra) {
    return el("span", { class: "figura " + (classe || ""), "data-alt": textoAlt(nome, extra) || null, html: DESENHOS.desenhar(nome, extra) });
  }
  function icone(nome) { return el("span", { class: "ic", html: DESENHOS.desenhar(nome) }); }
  function botao(texto, ic, acao, classe, attrs) {
    return el("button", Object.assign({ type: "button", class: "botao " + (classe || ""), onclick: acao }, attrs || {}),
      [ic ? icone(ic) : null, el("span", { texto: texto })]);
  }
  function embaralhar(lista) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function sorteio(lista) { return lista[Math.floor(Math.random() * lista.length)]; }
  function balancar(elemento) {
    if (!elemento || suave()) return;
    elemento.classList.remove("balanca"); void elemento.offsetWidth; elemento.classList.add("balanca");
  }
  function minusculaInicial(t) { return t.charAt(0).toLowerCase() + t.slice(1); }

  // ===================================================================
  // ACESSIBILIDADE: configurações guardadas neste computador
  // (Modo Áudio, Modo Calmo, sem animações, letras maiores, alto contraste)
  // ===================================================================
  const AC = (typeof ACESSIBILIDADE !== "undefined") ? ACESSIBILIDADE
    : { descricoes: {}, brincadeiras: {}, ajuda: {}, ajudaGeral: "", historiaFalada: [], historiaCalma: [], titulos: {}, calmo: {}, pracaFalada: { intro: "", elementos: [] } };
  const CHAVE_ACESS = "bauDoTempo.acessibilidade.v1";
  function acessPadrao() { return { audio: false, voz: true, devagar: false, calmo: false, semAnimacoes: false, grande: false, contraste: false }; }
  let acess = acessPadrao();
  try { const t = localStorage.getItem(CHAVE_ACESS); if (t) acess = Object.assign(acessPadrao(), JSON.parse(t)); } catch (e) { /* sem acesso */ }
  function salvarAcess() { try { localStorage.setItem(CHAVE_ACESS, JSON.stringify(acess)); } catch (e) { /* sem acesso */ } }

  const falaViva = document.getElementById("fala");
  const falaVisivel = document.getElementById("fala-visivel");

  function aplicarAcess() {
    const b = document.body.classList;
    b.toggle("modo-audio", acess.audio);
    b.toggle("calmo", acess.calmo);
    b.toggle("sem-animacoes", acess.semAnimacoes);
    b.toggle("grande", acess.grande);
    b.toggle("contraste", acess.contraste);
    document.documentElement.classList.toggle("grande", acess.grande);
    if (acess.audio) {
      // No Modo Áudio, o NVDA e o Narrador passam as teclas direto para o jogo.
      tela.setAttribute("role", "application");
      tela.setAttribute("aria-label", "O Baú do Tempo. Use as setas e o Enter.");
      retorno.removeAttribute("role"); retorno.setAttribute("aria-live", "off");
    } else {
      tela.removeAttribute("role"); tela.removeAttribute("aria-label");
      retorno.setAttribute("role", "status"); retorno.setAttribute("aria-live", "polite");
    }
    falaVisivel.hidden = !acess.audio;
  }
  function descricao(nome) { return AC.descricoes[nome] || ""; }
  function suave() { return acess.calmo || acess.semAnimacoes; }
  function msgAcerto() { return acess.calmo ? (AC.calmo.acerto || "Certo!") : sorteio(C.mensagens.acertos); }

  // Texto alternativo das ilustrações (para o NVDA, o Narrador e a voz do jogo).
  function textoAlt(nome, extra) {
    if (nome === "grupo" && extra) return "Crianças brincando de " + extra.nome + ".";
    return descricao(nome);
  }
  function marcarFiguras(raiz) {
    if (!raiz.querySelectorAll) return;
    const l = Array.prototype.slice.call(raiz.querySelectorAll(".figura"));
    if (raiz.matches && raiz.matches(".figura")) l.push(raiz);
    l.forEach(function (f) {
      if (f.closest("button") || !f.getAttribute("data-alt")) { f.setAttribute("aria-hidden", "true"); f.removeAttribute("role"); }
      else { f.setAttribute("role", "img"); f.setAttribute("aria-label", f.getAttribute("data-alt")); f.removeAttribute("aria-hidden"); }
    });
  }
  new MutationObserver(function (lista) {
    lista.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) marcarFiguras(n); }); });
  }).observe(document.body, { childList: true, subtree: true });

  // ---------- Voz do jogo (síntese de voz do navegador, em português do Brasil) ----------
  const A = { ultima: "", ajuda: "", voltar: null, teclas: null, ativado: false, falaTela: "" };
  let vozEscolhida = null;
  function escolherVoz() {
    if (!window.speechSynthesis) return;
    const vs = speechSynthesis.getVoices();
    vozEscolhida = vs.filter(function (v) { return /pt[-_]BR/i.test(v.lang); })[0] || vs.filter(function (v) { return /^pt/i.test(v.lang); })[0] || null;
  }
  if (window.speechSynthesis) {
    escolherVoz();
    if (speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", escolherVoz);
    else speechSynthesis.onvoiceschanged = escolherVoz;
  }
  let falaId = 0;
  function dizer(texto) {
    if (!window.speechSynthesis) return;
    const id = falaId;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = "pt-BR";
      if (vozEscolhida) u.voice = vozEscolhida;
      u.rate = acess.devagar ? 0.75 : 0.95;
      setTimeout(function () { if (id === falaId) speechSynthesis.speak(u); }, 60);
    } catch (e) { /* sem voz */ }
  }
  function falar(texto) {
    if (!acess.audio || !texto) return;
    A.ultima = texto;
    falaVisivel.textContent = texto;
    const id = ++falaId;
    falaViva.textContent = "";
    setTimeout(function () { if (id === falaId) falaViva.textContent = texto; }, 90);
    if (acess.voz) dizer(texto);
  }
  function falaDe(b) { return b.getAttribute("data-fala") || b.getAttribute("aria-label") || textoFalavel(b); }
  function mudarFala(b, fala) { b.setAttribute("data-fala", fala); b.setAttribute("aria-label", fala); }
  function textoFalavel(n) {
    if (!n) return "";
    if (n.nodeType === 3) return n.textContent.trim();
    if (n.nodeType !== 1) return "";
    if (n.getAttribute("aria-hidden") === "true" || n.tagName === "INPUT" || n.hidden) return "";
    if (n.getAttribute("role") === "img") return n.getAttribute("aria-label") || "";
    if (n.tagName === "IMG") return n.getAttribute("alt") || "";
    let t = "";
    n.childNodes.forEach(function (c) { const x = textoFalavel(c); if (x) t += (t ? " " : "") + x; });
    return t.trim();
  }

  // ---------- Teclado do Modo Áudio ----------
  // Setas: navegar. Enter: confirmar. Esc: voltar. Espaço: repetir. H: ajuda. 1 a 9: escolher.
  let ultimaTecla = "";
  function opcoesAtivas() {
    let c = tela;
    if (janelaAberta()) c = janela;
    else if (!retorno.hidden && tela.inert) c = retorno;
    let l = Array.prototype.slice.call(c.querySelectorAll(c === tela ? ".opcao-audio" : "button, input"));
    if (c === tela && !l.length) l = Array.prototype.slice.call(tela.querySelectorAll("button"));
    return l.filter(function (b) { return !b.disabled && !b.hidden && b.offsetParent !== null; });
  }
  function moverAudio(d) {
    const l = opcoesAtivas();
    if (!l.length) { falar(A.ultima); return; }
    let i = l.indexOf(document.activeElement), prefixo = "";
    if (i < 0) i = d > 0 ? 0 : l.length - 1;
    else {
      i += d;
      if (i >= l.length) { i = 0; prefixo = "De novo do começo. "; }
      if (i < 0) { i = l.length - 1; prefixo = "Última opção. "; }
    }
    l[i].focus();
    falar(prefixo + falaDe(l[i]));
  }
  function ativarAudio() {
    const l = opcoesAtivas();
    if (l.indexOf(document.activeElement) >= 0) { document.activeElement.click(); return; }
    if (l.length === 1) l[0].click();
    else if (l.length) falar("Use as setas para escolher. Depois aperte Enter.");
  }
  function voltarAudio() {
    if (janelaAberta()) {
      if (janelaFechavel) { const refaz = !!aoFecharJanela; fecharJanela(); if (!refaz) falar("Fechado. " + (A.falaTela || "")); }
      else falar("Escolha uma opção com as setas e aperte Enter.");
      return;
    }
    if (A.voltar) { pararFalaVisual(); A.voltar(); }
    else falar("Você está no começo do jogo.");
  }
  function pararFalaVisual() { esconderRetorno(); }
  function ajudaAudio() { falar((A.ajuda ? A.ajuda + " " : "") + AC.ajudaGeral); }
  document.addEventListener("keydown", function (e) {
    ultimaTecla = e.key;
    if (!acess.audio || e.ctrlKey || e.altKey || e.metaKey) return;
    if (!A.ativado) {
      // A primeira tecla só "acorda" a voz (o navegador exige um toque antes de falar).
      A.ativado = true; e.preventDefault(); e.stopPropagation();
      falar(A.falaTela || A.ultima || "O Baú do Tempo.");
      return;
    }
    const alvo = e.target;
    if (alvo && (alvo.tagName === "INPUT" || alvo.tagName === "TEXTAREA")) {
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); voltarAudio(); }
      return;
    }
    if (e.key === "Tab") return;
    if (A.teclas && !janelaAberta() && !tela.inert && A.teclas(e)) { e.preventDefault(); e.stopPropagation(); return; }
    let usada = true;
    switch (e.key) {
      case "ArrowDown": case "ArrowRight": moverAudio(1); break;
      case "ArrowUp": case "ArrowLeft": moverAudio(-1); break;
      case "Enter": ativarAudio(); break;
      case "Escape": voltarAudio(); break;
      case " ": case "Spacebar": falar(A.ultima); break;
      case "h": case "H": ajudaAudio(); break;
      default:
        if (/^[1-9]$/.test(e.key)) {
          const b = opcoesAtivas()[+e.key - 1];
          if (b) { b.focus(); b.click(); } else falar("Não tem a opção " + e.key + ".");
        } else usada = false;
    }
    if (usada) { e.preventDefault(); e.stopPropagation(); }
  }, true);
  document.addEventListener("focusin", function (e) {
    if (acess.audio && ultimaTecla === "Tab" && e.target.closest && e.target.closest("button, input")) falar(falaDe(e.target) || "Campo de texto.");
  });

  // Menu falado: uma lista de opções escolhidas com as setas e o Enter.
  function menuAudio(container, cfg) {
    const lista = el("div", { class: "menu-audio", role: "group", tabindex: "-1", "aria-label": cfg.titulo || "Opções" });
    (cfg.opcoes || []).forEach(function (o, i) {
      const fala = o.fala || o.texto;
      const b = el("button", { type: "button", class: "opcao opcao-linha opcao-audio " + (o.classe || ""), "data-fala": fala, "aria-label": fala },
        [el("span", { class: "numero", "aria-hidden": "true", texto: String(i + 1) }), o.desenho ? figura(o.desenho, "figura-mini") : null, el("span", { texto: o.texto })]);
      b.addEventListener("click", function () { o.acao(b, i); });
      lista.append(b);
    });
    if (cfg.titulo) container.append(el("h3", { texto: cfg.titulo }));
    container.append(lista);
    A.voltar = cfg.voltar || null;
    if (cfg.ajuda !== undefined) A.ajuda = cfg.ajuda;
    A.teclas = cfg.teclas || null;
    const primeiro = lista.querySelector("button");
    const lerPrimeira = cfg.lerPrimeira !== false && primeiro;
    A.falaTela = (cfg.fala || "") + (lerPrimeira ? " " + falaDe(primeiro) : "");
    if (lerPrimeira || (cfg.focar && primeiro)) primeiro.focus({ preventScroll: true }); else lista.focus({ preventScroll: true });
    falar(A.falaTela);
    return lista;
  }

  // ---------- Sons (com direção: esquerda e direita; agudo e grave) ----------
  function contextoAudio() {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === "suspended") audio.resume();
    return audio;
  }
  function tom(freq, pan, forma, dur, vol, atraso) {
    if (!somLigado) return;
    try {
      const a = contextoAudio();
      const o = a.createOscillator(), g = a.createGain();
      o.type = acess.calmo ? "sine" : (forma || "sine");
      o.frequency.value = freq;
      o.connect(g);
      if (a.createStereoPanner) { const p = a.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan || 0)); g.connect(p); p.connect(a.destination); }
      else g.connect(a.destination);
      const t = a.currentTime + (atraso || 0), v = (vol || 0.15) * (acess.calmo ? 0.4 : 1);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(v, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.start(t); o.stop(t + dur + 0.05);
    } catch (e) { /* sem som */ }
  }

  // Coloca os ícones da barra de cima.
  document.querySelectorAll("[data-icone]").forEach(function (s) { s.innerHTML = DESENHOS.desenhar(s.getAttribute("data-icone")); });

  // ===================================================================
  // Progresso guardado no navegador
  // ===================================================================
  const CHAVE = "bauDoTempo.progresso.v1";
  const CHAVE_DESENHOS = "bauDoTempo.desenhos.v1";
  function estadoVazio() { return { estrelas: {}, bau: [], parcial: {}, liberado: false, historiaVista: false }; }
  function lerEstado() {
    try { const t = localStorage.getItem(CHAVE); if (t) return Object.assign(estadoVazio(), JSON.parse(t)); } catch (e) { /* sem acesso */ }
    return estadoVazio();
  }
  let estado = lerEstado();
  let somLigado = false; // o som começa desligado (no Modo Áudio, começa ligado)
  function salvar() { try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* sem acesso */ } }
  function lerDesenhos() { try { return JSON.parse(localStorage.getItem(CHAVE_DESENHOS)) || []; } catch (e) { return []; } }
  function salvarDesenhos(lista) { try { localStorage.setItem(CHAVE_DESENHOS, JSON.stringify(lista)); return true; } catch (e) { return false; } }

  // ===================================================================
  // Catálogo do baú (todos os objetos que podem ser colecionados)
  // ===================================================================
  const CATALOGO = {};
  const ORDEM_BAU = { 1: [], 2: [], 3: [] };
  function addItem(id, ano, nome, desenho, texto) { CATALOGO[id] = { id: id, ano: ano, nome: nome, desenho: desenho, texto: texto }; ORDEM_BAU[ano].push(id); }
  function addObjeto(id, ano) { const o = C.objetosBau[id]; if (o) addItem(id, ano, o.nome, o.desenho, o.texto); }

  C.montar.forEach(function (b) { addItem("brinquedo-" + b.id, 1, b.nome, b.desenho, [b.feitoDe, b.comoEra, b.origem].filter(Boolean).join(" ")); });
  addObjeto("retrato", 1);
  C.povos.forEach(function (p) { if (!CATALOGO["brinquedo-" + p.id]) addItem("povo-" + p.id, 1, p.nome, p.desenho, p.texto); });
  addObjeto("caixaTodos", 1);
  C.grupos.forEach(function (g) { addItem("brincadeira-" + g.id, 2, g.nome, g.desenho, g.quem + " " + g.passos.join(" ")); });
  addObjeto("pedrinha", 2); addObjeto("maos", 2); addObjeto("quebraCabeca", 2);
  C.lugares.forEach(function (l) { addItem("lugar-" + l.id, 3, l.nome, l.desenho + "Hoje", l.texto); });
  addObjeto("lupa", 3);
  C.culturas.forEach(function (c) { addItem("cultura-" + c.id, 3, c.nome, c.desenho, c.texto); });

  function idPovo(p) { return CATALOGO["brinquedo-" + p.id] ? "brinquedo-" + p.id : "povo-" + p.id; }
  function guardarNoBau(id) {
    if (!CATALOGO[id]) return;
    if (estado.bau.indexOf(id) < 0) { estado.bau.push(id); salvar(); }
  }

  // ===================================================================
  // Som (desligado no começo; todo aviso também é visual)
  // ===================================================================
  let audio = null;
  function som(tipo) {
    if (tipo === "bom") { tom(660, 0, "sine", 0.2, 0.12); tom(880, 0, "sine", 0.25, 0.12, 0.12); }
    else if (tipo === "fim") { tom(523, 0, "sine", 0.2, 0.12); tom(659, 0, "sine", 0.2, 0.12, 0.15); tom(784, 0, "sine", 0.35, 0.12, 0.3); }
    else tom(330, 0, "sine", 0.35, 0.08);
  }
  const botaoSom = document.getElementById("botao-som");
  function atualizarBotaoSom() {
    botaoSom.setAttribute("aria-pressed", somLigado ? "true" : "false");
    botaoSom.innerHTML = "";
    botaoSom.append(icone(somLigado ? "iconeSomOn" : "iconeSomOff"), el("span", { texto: somLigado ? "Som: ligado" : "Som: desligado" }));
  }
  botaoSom.addEventListener("click", function () { somLigado = !somLigado; atualizarBotaoSom(); som("bom"); });

  // ===================================================================
  // Avisos (acerto e dica) e janelas
  // ===================================================================
  function travar(sim) { tela.inert = !!sim; tela.classList.toggle("travada", !!sim); }
  let tempoRetorno = null;
  let ultimoClique = null;
  document.addEventListener("pointerdown", function (e) { ultimoClique = e.target.closest ? e.target.closest("button") : null; }, true);
  function esconderRetorno() { clearTimeout(tempoRetorno); retorno.hidden = true; retorno.innerHTML = ""; travar(false); }
  function mostrarRetorno(tipo, texto, proximo, rotulo) {
    clearTimeout(tempoRetorno);
    if (acess.calmo && tipo === "dica") {
      // Modo Calmo: erro mostrado de forma neutra, sempre com a mesma frase no começo.
      texto = (AC.calmo.erro || "Vamos tentar de novo.") + " " + texto.replace(/^(Ainda não[!.]?|Pare!|Olhe de novo:|Pense de novo:|Ops[,!.]?)\s*/i, "");
    }
    retorno.className = "retorno " + tipo;
    retorno.innerHTML = "";
    retorno.append(icone(tipo === "bom" ? "iconeEstrela" : "iconeLampada"), el("span", { class: "msg", texto: texto }));
    if (proximo) {
      const b = botao(rotulo || "Próximo", "iconeAvancar", function () { esconderRetorno(); proximo(); }, "botao-principal");
      retorno.append(b);
      travar(true);
      setTimeout(function () { b.focus(); }, 30);
    } else {
      retorno.append(botao("Entendi", "iconeCheck", esconderRetorno));
      // Avisos sem "Próximo" somem sozinhos depois de alguns segundos.
      tempoRetorno = setTimeout(esconderRetorno, tipo === "bom" ? 3500 : 7000);
    }
    retorno.hidden = false;
    balancar(tipo === "dica" ? retorno : null);
    som(tipo);
    falar(texto + (proximo ? " Aperte Enter para continuar." : ""));
    // Se o aviso cobrir o botão que a criança acabou de usar, rola a tela um pouco.
    const alvo = ultimoClique && document.body.contains(ultimoClique) ? ultimoClique : null;
    if (alvo && tela.contains(alvo)) {
      const topoAviso = retorno.getBoundingClientRect().top;
      const fundo = alvo.getBoundingClientRect().bottom;
      if (fundo > topoAviso - 12) window.scrollBy({ top: fundo - topoAviso + 24, behavior: suave() ? "auto" : "smooth" });
    }
  }

  let focoAntes = null;
  let janelaFechavel = true;
  let aoFecharJanela = null;
  // Junta frases para a voz, sem pontuação repetida.
  function juntarFrases(lista) {
    return lista.map(function (t) { return (t || "").trim(); }).filter(Boolean)
      .map(function (t) { return /[.!?:]$/.test(t) ? t : t + "."; }).join(" ").replace(/:\./g, ":");
  }
  function abrirJanela(titulo, ic, corpo, botoes, fechavel, fala, semSufixo) {
    janela.innerHTML = "";
    janela.append(el("h2", { id: "janela-titulo" }, [ic ? icone(ic) : null, el("span", { texto: titulo })]));
    corpo.forEach(function (c) { if (c) janela.append(c); });
    janela.append(el("div", { class: "botoes" }, botoes));
    if (fundoJanela.hidden) focoAntes = document.activeElement;
    janelaFechavel = fechavel !== false;
    fundoJanela.hidden = false;
    [tela, barra, retorno, botaoProfessor].forEach(function (x) { x.inert = true; });
    const primeiro = janela.querySelector("input, .botoes button");
    setTimeout(function () { (primeiro || janela).focus(); }, 30);
    if (acess.audio) {
      const botoesReais = botoes.filter(Boolean);
      const texto = fala || juntarFrases([titulo].concat(corpo.filter(Boolean).map(textoFalavel)));
      const fim = !semSufixo && primeiro && primeiro.tagName === "BUTTON" ? " Aperte Enter para: " + falaDe(primeiro) + "." + (botoesReais.length > 1 ? " Ou use as setas para outras opções." : "") : "";
      falar(texto + fim);
    }
  }
  function fecharJanela() {
    fundoJanela.hidden = true;
    fundoJanela.classList.remove("tranquila");
    const depois = aoFecharJanela; aoFecharJanela = null;
    janela.innerHTML = "";
    [barra, retorno, botaoProfessor].forEach(function (x) { x.inert = false; });
    tela.inert = tela.classList.contains("travada");
    if (focoAntes && document.body.contains(focoAntes)) focoAntes.focus();
    if (depois) depois();
  }
  function janelaAberta() { return !fundoJanela.hidden; }
  document.addEventListener("keydown", function (e) {
    if (acess.audio) return; // no Modo Áudio, o Esc é tratado pelo teclado falado
    if (e.key === "Escape" && janelaAberta() && janelaFechavel) fecharJanela();
  });

  // ===================================================================
  // Navegação entre telas
  // ===================================================================
  let atual = { tela: "abertura", atividade: null };
  let limparAtividade = null;
  function mostrar(conteudo, ano, titulo) {
    if (limparAtividade) { limparAtividade(); limparAtividade = null; }
    if (janelaAberta()) fecharJanela();
    esconderRetorno();
    document.body.classList.toggle("ano-1", ano === 1);
    A.voltar = null; A.teclas = null; A.ajuda = ""; A.falaTela = "";
    tela.innerHTML = "";
    conteudo.forEach(function (c) { if (c) tela.append(c); });
    document.getElementById("barra-titulo").textContent = titulo || "O Baú do Tempo";
    window.scrollTo(0, 0);
    tela.focus({ preventScroll: true });
  }

  document.getElementById("botao-inicio").addEventListener("click", function () { telaViagens(); });
  document.getElementById("botao-bau").addEventListener("click", function () { telaBau(); });
  document.getElementById("botao-ajuda").addEventListener("click", function () { abrirAjuda(); });
  document.getElementById("botao-pausa").addEventListener("click", function () { abrirPausa(); });
  botaoProfessor.addEventListener("click", function () { abrirProfessor(); });

  // ===================================================================
  // Estrelas e liberação das atividades
  // ===================================================================
  function calcEstrelas(erros) { return erros <= 1 ? 3 : (erros <= 3 ? 2 : 1); }
  function desenharEstrelas(n, grande) {
    const s = el("span", { class: "estrelas" + (grande ? " grandes" : ""), role: "img", "aria-label": n + " de 3 estrelas" });
    for (let i = 0; i < 3; i++) s.append(icone(i < n ? "iconeEstrela" : "iconeEstrelaVazia"));
    return s;
  }
  function atividadesDoAno(ano) { return ATIVIDADES.filter(function (a) { return a.ano === ano; }); }
  function liberada(at) {
    if (estado.liberado) return true;
    const lista = atividadesDoAno(at.ano);
    const i = lista.indexOf(at);
    return i === 0 || (estado.estrelas[lista[i - 1].id] || 0) > 0;
  }

  // ===================================================================
  // Telas: abertura, história, viagens, ano
  // ===================================================================
  function telaAbertura() {
    atual = { tela: "abertura" };
    const comecar = function () { if (estado.historiaVista) telaViagens(); else telaHistoria(0); };
    if (acess.audio) {
      const area = el("div", { class: "area-audio" });
      mostrar([el("section", { class: "abertura" }, [figura("bauAberto", "bau-grande"), el("h1", { texto: "O Baú do Tempo" }), area])]);
      menuAudio(area, {
        fala: "O Baú do Tempo, um jogo de brinquedos e brincadeiras. Use as setas para ouvir as opções e o Enter para escolher. A tecla H ajuda.",
        ajuda: AC.ajuda.abertura,
        opcoes: [
          { texto: "Começar", acao: comecar },
          { texto: "Ouvir a história", acao: function () { telaHistoria(0); } },
          { texto: "Acessibilidade", fala: "Acessibilidade: ligar ou desligar a voz e os outros modos.", acao: function () { abrirAcessibilidade(); } }
        ]
      });
      if (!A.ativado) falaVisivel.textContent = "Aperte qualquer tecla para ouvir o jogo.";
      return;
    }
    mostrar([el("section", { class: "abertura" }, [
      figura("bauAberto", "bau-grande"),
      el("h1", { texto: "O Baú do Tempo" }),
      el("p", { class: "instrucao", texto: acess.calmo ? "Um jogo sobre brinquedos e brincadeiras." : "Viaje no tempo e descubra brinquedos e brincadeiras!" }),
      el("div", { class: "linha" }, [
        botao("Começar", "iconePlay", comecar, "botao-principal"),
        estado.historiaVista ? botao("Ver a história", "iconeOlho", function () { telaHistoria(0); }) : null,
        botao("Acessibilidade", "iconeAcessibilidade", function () { abrirAcessibilidade(); }, "botao-acess")
      ])
    ])]);
  }

  function telaHistoria(i) {
    atual = { tela: "historia" };
    const lista = acess.calmo && AC.historiaCalma.length ? AC.historiaCalma : C.historia;
    const h = lista[i];
    const pontos = el("div", { class: "pontinhos", "aria-hidden": "true" });
    lista.forEach(function (_, k) { pontos.append(el("span", { class: k === i ? "atual" : "" })); });
    const ultimo = i === lista.length - 1;
    const seguir = function () { if (ultimo) { estado.historiaVista = true; salvar(); telaViagens(); } else telaHistoria(i + 1); };
    const quadro = el("div", { class: "historia-quadro aparece", role: "img", "aria-label": descricao(h.desenho) || h.texto, html: DESENHOS.desenhar(h.desenho) });
    if (acess.audio) {
      const area = el("div", { class: "area-audio" });
      const texto = (!acess.calmo && AC.historiaFalada[i]) || h.texto;
      mostrar([el("section", { class: "abertura" }, [quadro, el("p", { class: "historia-texto", texto: texto }), pontos, area])]);
      menuAudio(area, {
        fala: texto + (ultimo ? " Aperte Enter para abrir o baú." : " Aperte Enter para continuar."), lerPrimeira: false,
        voltar: function () { if (i > 0) telaHistoria(i - 1); else telaAbertura(); }, ajuda: AC.ajuda.historia,
        opcoes: [{ texto: ultimo ? "Abrir o baú" : "Continuar", acao: seguir }]
      });
      return;
    }
    mostrar([el("section", { class: "abertura" }, [
      quadro,
      el("p", { class: "historia-texto", texto: h.texto }),
      pontos,
      el("div", { class: "linha" }, [
        i > 0 ? botao("Voltar", "iconeVoltar", function () { telaHistoria(i - 1); }) : null,
        botao(ultimo ? "Abrir o baú!" : "Continuar", "iconeAvancar", seguir, "botao-principal")
      ])
    ])]);
  }

  function estrelasDoAno(ano) {
    let soma = 0; const lista = atividadesDoAno(ano);
    lista.forEach(function (a) { soma += estado.estrelas[a.id] || 0; });
    return { soma: soma, total: lista.length * 3 };
  }

  function telaViagens() {
    atual = { tela: "viagens" };
    if (acess.audio) {
      const area = el("div", { class: "area-audio" });
      mostrar([el("h1", { class: "centro", texto: "Escolha a viagem" }), area]);
      const opcoes = [1, 2, 3].map(function (ano) {
        const a = C.anos[ano], e = estrelasDoAno(ano);
        return { texto: a.subtitulo + ": " + a.titulo, desenho: a.desenho, fala: a.subtitulo + ": " + a.titulo + ". " + e.soma + " de " + e.total + " estrelas.", acao: function () { telaAno(ano); } };
      });
      opcoes.push({ texto: "Meu baú", desenho: "bau", fala: "Meu baú: o seu museu, com " + estado.bau.length + " objetos.", acao: telaBau });
      menuAudio(area, { fala: (acess.calmo ? "Escolha uma parte do jogo." : "Para onde vamos?") + " Use as setas e aperte Enter.", voltar: telaAbertura, ajuda: AC.ajuda.viagens, opcoes: opcoes });
      return;
    }
    const grade = el("div", { class: "grade grade-3" });
    [1, 2, 3].forEach(function (ano) {
      const a = C.anos[ano];
      const e = estrelasDoAno(ano);
      grade.append(el("button", { type: "button", class: "cartao cor-" + a.cor, onclick: function () { telaAno(ano); } }, [
        figura(a.desenho),
        el("span", { class: "sub", texto: a.subtitulo }),
        el("span", { class: "nome", texto: a.titulo }),
        el("span", { class: "selo" }, [icone("iconeEstrela"), el("span", { texto: e.soma + " de " + e.total + " estrelas" })])
      ]));
    });
    const bauCartao = el("button", { type: "button", class: "cartao cor-roxo", style: "flex-direction:row;justify-content:center;margin-top:1rem;width:100%", onclick: telaBau }, [
      el("span", { class: "figura figura-quadrada", style: "aspect-ratio:auto;border:none;background:transparent", html: DESENHOS.desenhar("bau") }),
      el("span", {}, [el("span", { class: "nome", texto: "Meu baú" }), el("br"), el("span", { class: "sub", texto: "Veja tudo o que você já colecionou: " + estado.bau.length + " objetos." })])
    ]);
    mostrar([el("h1", { class: "centro", texto: acess.calmo ? AC.titulos.viagensCalmo : AC.titulos.viagens || "Para onde vamos viajar?" }), grade, bauCartao]);
  }

  function telaAno(ano) {
    atual = { tela: "ano", ano: ano };
    const a = C.anos[ano];
    if (acess.audio) {
      const area = el("div", { class: "area-audio" });
      mostrar([el("h2", { texto: a.subtitulo + " – " + a.titulo }), area], ano, a.titulo);
      menuAudio(area, {
        fala: a.subtitulo + ": " + a.titulo + ". Escolha uma atividade.", voltar: telaViagens, ajuda: AC.ajuda.ano,
        opcoes: atividadesDoAno(ano).map(function (at) {
          const livre = liberada(at), n = estado.estrelas[at.id] || 0;
          return { texto: at.nome, fala: at.nome + ". " + (livre ? (n ? n + (n === 1 ? " estrela." : " estrelas.") : "Ainda não jogada.") : "Fechada: termine a atividade anterior."),
            acao: function () { if (livre) abrirAtividade(at); else falar("Esta atividade ainda está fechada. Termine a anterior primeiro."); } };
        })
      });
      return;
    }
    const grade = el("div", { class: "grade" });
    atividadesDoAno(ano).forEach(function (at) {
      const livre = liberada(at);
      const n = estado.estrelas[at.id] || 0;
      grade.append(el("button", {
        type: "button", class: "cartao cor-" + a.cor + (livre ? "" : " bloqueado") + (n ? " feito" : ""),
        onclick: function () {
          if (livre) abrirAtividade(at);
          else mostrarRetorno("dica", "Esta atividade abre quando você terminar a anterior.");
        }
      }, [
        figura(at.desenho),
        el("span", { class: "nome", texto: at.nome }),
        livre ? desenharEstrelas(n) : el("span", { class: "selo" }, [icone("iconeCadeado"), el("span", { texto: "Fechada" })])
      ]));
    });
    mostrar([
      el("div", { class: "topo-atividade" }, [botao("Viagens", "iconeVoltar", telaViagens), el("h2", { texto: a.subtitulo + " – " + a.titulo })]),
      el("p", { class: "instrucao", texto: a.convite }),
      grade
    ], ano, a.titulo);
  }

  // ===================================================================
  // Execução de uma atividade
  // ===================================================================
  function abrirAtividade(at) {
    atual = { tela: "atividade", atividade: at, ano: at.ano };
    const area = el("div", { class: "area-atividade" });
    const contador = el("span", { class: "contador", hidden: true });
    const barraItens = el("span", { class: "barra-itens", "aria-hidden": "true" });
    const doAno = atividadesDoAno(at.ano), posicao = doAno.indexOf(at) + 1;
    let progresso = null, passos = null;
    if (acess.calmo) {
      // Modo Calmo: sempre o mesmo lugar para mostrar onde a criança está e quantas faltam.
      const seg = el("span", { class: "segmentos", "aria-hidden": "true" });
      doAno.forEach(function (_, k) { seg.append(el("span", { class: k < posicao - 1 ? "feito" : (k === posicao - 1 ? "atual" : "") })); });
      const faltam = doAno.length - posicao;
      progresso = el("div", { class: "progresso-calmo" }, [seg, el("span", { texto: "Atividade " + posicao + " de " + doAno.length + ". " + (faltam ? "Depois desta, faltam " + faltam + "." : "Esta é a última.") })]);
      if (!acess.audio) {
        passos = el("ol", { class: "passos-calmos", "aria-label": "Como fazer" });
        (at.ajudaCalma || at.ajuda).forEach(function (x, k) { passos.append(el("li", {}, [el("span", { class: "numero", texto: String(k + 1) }), figura(x[0]), el("span", { texto: x[1] })])); });
      }
    }
    mostrar([
      progresso,
      el("div", { class: "topo-atividade" }, [botao("Atividades", "iconeVoltar", function () { telaAno(at.ano); }), el("h2", { texto: at.nome }), contador, barraItens]),
      passos,
      area
    ], at.ano, C.anos[at.ano].titulo);
    A.voltar = function () { telaAno(at.ano); };
    A.ajuda = AC.ajuda[at.id] || "";
    const ctx = {
      at: at, area: area, erros: 0, ganhos: [],
      contador: function (a, b) {
        contador.hidden = false; contador.textContent = a + " de " + b;
        if (acess.calmo) {
          barraItens.innerHTML = "";
          for (let k = 0; k < b; k++) barraItens.append(el("span", { class: k < a ? "feito" : "" }));
        }
      },
      acerto: function (texto, depois, rotulo) { mostrarRetorno("bom", texto, depois, rotulo); },
      erro: function (texto, elemento) { ctx.erros++; mostrarRetorno("dica", texto); balancar(elemento); },
      dica: function (texto) { mostrarRetorno("dica", texto); },
      ganhar: function (id) { if (CATALOGO[id] && ctx.ganhos.indexOf(id) < 0) ctx.ganhos.push(id); guardarNoBau(id); },
      parcial: function () { if (!estado.parcial[at.id]) estado.parcial[at.id] = []; return estado.parcial[at.id]; },
      fim: function (extra) { terminarAtividade(ctx, extra); },
      aoSair: function (fn) { limparAtividade = fn; },
      limpar: function () { area.innerHTML = ""; esconderRetorno(); }
    };
    if (acess.audio && at.audio) at.audio(ctx); else at.iniciar(ctx);
  }

  function terminarAtividade(ctx, extra) {
    const at = ctx.at;
    const n = acess.calmo ? 3 : calcEstrelas(ctx.erros);
    estado.estrelas[at.id] = Math.max(estado.estrelas[at.id] || 0, n);
    delete estado.parcial[at.id];
    salvar();
    esconderRetorno();
    som("fim");
    const frase = acess.calmo ? (AC.calmo.fim || "Você terminou a atividade.") : n === 3 ? "Perfeito! Você ganhou 3 estrelas!" : (n === 2 ? "Muito bem! Você ganhou 2 estrelas." : "Você conseguiu! Jogue de novo para ganhar mais estrelas.");
    const corpo = [el("div", { class: "centro" }, [desenharEstrelas(n, true)]), el("p", { class: "instrucao", texto: frase })];
    if (ctx.ganhos.length) {
      const g = el("div", { class: "ganhos" });
      ctx.ganhos.forEach(function (id) { const it = CATALOGO[id]; g.append(el("div", { class: "objeto" }, [figura(it.desenho), el("span", { texto: it.nome })])); });
      corpo.push(el("p", { class: "centro", texto: C.mensagens.ganhouBau }), g);
    }
    if (extra) corpo.push(extra);
    const lista = atividadesDoAno(at.ano);
    const prox = lista[lista.indexOf(at) + 1];
    const botoes = [
      prox ? botao("Próxima atividade", "iconeAvancar", function () { abrirAtividade(prox); }, "botao-principal") : null,
      botao("Ver as atividades", "iconeVoltar", function () { telaAno(at.ano); }, prox ? "" : "botao-principal"),
      botao("Jogar de novo", "iconeDesfazer", function () { abrirAtividade(at); })
    ];
    const fala = juntarFrases([C.mensagens.concluiu, frase,
      ctx.ganhos.length ? C.mensagens.ganhouBau + " " + ctx.ganhos.map(function (id) { return CATALOGO[id].nome; }).join(", ") : "",
      extra ? textoFalavel(extra) : ""]);
    abrirJanela(C.mensagens.concluiu, "iconeEstrela", corpo, botoes, false, fala);
  }

  // ===================================================================
  // Peças reutilizáveis das atividades
  // ===================================================================

  // Pergunta com três respostas. Ao acertar, chama aoAcertar().
  function perguntar(ctx, cfg, aoAcertar) {
    const resp = el("div", { class: "respostas" });
    embaralhar(cfg.opcoes.map(function (t, k) { return { t: t, certa: k === cfg.certa }; })).forEach(function (o) {
      const b = el("button", { type: "button", class: "opcao opcao-linha" }, [el("span", { texto: o.t })]);
      b.addEventListener("click", function () {
        if (b.classList.contains("tentada") || b.classList.contains("certa")) return;
        if (o.certa) { b.classList.add("certa"); aoAcertar(); }
        else { b.classList.add("tentada"); ctx.erro(cfg.dica || "Ainda não. Tente outra resposta!", b); }
      });
      resp.append(b);
    });
    ctx.area.innerHTML = "";
    ctx.area.append(el("div", { class: "pergunta" }, [
      el("div", { class: "centro" }, [figura(cfg.desenho, "figura-grande", cfg.extra), cfg.nome ? el("h3", { texto: cfg.nome }) : null]),
      el("div", {}, [el("p", { class: "instrucao", texto: cfg.pergunta }), resp, cfg.voltar || null])
    ]));
  }

  // Classificar brinquedos em caixas (clicar na caixa ou arrastar).
  function classificar(ctx, cfg, aoTerminar) {
    const itens = embaralhar(cfg.itens);
    let i = 0;
    const caixasEl = {};
    const carta = el("div", { class: "carta-brinquedo", "aria-live": "polite" });
    const zona = el("div", { class: "caixas" });
    cfg.caixas.forEach(function (cx) {
      const b = el("button", { type: "button", class: "caixa", onclick: function () { escolher(cx.id); } },
        [figura(cx.desenho), el("span", { texto: cx.nome }), el("span", { class: "dentro" })]);
      caixasEl[cx.id] = b;
      zona.append(b);
    });
    ctx.area.innerHTML = "";
    ctx.area.append(el("p", { class: "instrucao", texto: cfg.titulo }), el("div", { class: "classificar" }, [
      carta, el("p", { class: "texto-pequeno", texto: "Clique na caixa certa ou arraste o brinquedo até ela." }), zona
    ]));

    function mostrarItem() {
      const it = itens[i];
      ctx.contador(i + 1, itens.length);
      carta.innerHTML = "";
      carta.append(figura(it.desenho), el("div", { texto: it.nome }));
      carta.classList.remove("aparece"); void carta.offsetWidth; carta.classList.add("aparece");
    }
    function guardar(it, id) {
      caixasEl[id].querySelector(".dentro").append(el("span", { html: DESENHOS.desenhar(it.desenho), title: it.nome }));
    }
    function seguir() { i++; if (i < itens.length) mostrarItem(); else aoTerminar(); }
    function escolher(id) {
      const it = itens[i];
      if (!it) return;
      if (cfg.todos) {
        guardar(it, "todos");
        caixasEl.todos.classList.add("celebrada");
        ctx.acerto((id === "todos" ? "Isso! " : "") + cfg.celebra, seguir);
        return;
      }
      const certas = it.aceita || [it.caixa];
      if (certas.indexOf(id) >= 0) {
        guardar(it, id);
        ctx.acerto(sorteio(C.mensagens.acertos) + " " + (it.explica || ""), seguir);
      } else {
        const nomeCerta = cfg.caixas.filter(function (c) { return c.id === certas[0]; })[0].nome;
        ctx.erro(it.explica ? "Ainda não! " + it.explica : "Ainda não! " + it.nome + " vai na caixa \"" + nomeCerta + "\".", caixasEl[id]);
      }
    }

    // Arrastar com o mouse (opcional: clicar na caixa também funciona).
    let arr = null;
    function caixaNoPonto(x, y) {
      let achou = null;
      Object.keys(caixasEl).forEach(function (id) {
        const r = caixasEl[id].getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) achou = id;
      });
      return achou;
    }
    carta.addEventListener("pointerdown", function (e) {
      arr = { x: e.clientX, y: e.clientY, mov: false };
      try { carta.setPointerCapture(e.pointerId); } catch (er) { /* ok */ }
    });
    carta.addEventListener("pointermove", function (e) {
      if (!arr) return;
      const dx = e.clientX - arr.x, dy = e.clientY - arr.y;
      if (!arr.mov && Math.abs(dx) + Math.abs(dy) > 10) { arr.mov = true; carta.classList.add("arrastando"); }
      if (arr.mov) {
        carta.style.transform = "translate(" + dx + "px," + dy + "px)";
        const alvo = caixaNoPonto(e.clientX, e.clientY);
        Object.keys(caixasEl).forEach(function (id) { caixasEl[id].classList.toggle("alvo", id === alvo); });
      }
    });
    function soltar(e) {
      if (!arr) return;
      const mov = arr.mov; arr = null;
      carta.style.transform = ""; carta.classList.remove("arrastando");
      Object.keys(caixasEl).forEach(function (id) { caixasEl[id].classList.remove("alvo"); });
      if (mov && e.type === "pointerup") { const alvo = caixaNoPonto(e.clientX, e.clientY); if (alvo) escolher(alvo); }
    }
    carta.addEventListener("pointerup", soltar);
    carta.addEventListener("pointercancel", soltar);

    mostrarItem();
  }

  // Grade de lugares/grupos para visitar. Guarda quais já foram visitados.
  function visitas(ctx, itens, opcoes) {
    const feitos = ctx.parcial();
    function grade() {
      ctx.limpar();
      ctx.contador(feitos.length, itens.length);
      const g = el("div", { class: "grade" });
      itens.forEach(function (it) {
        const ok = feitos.indexOf(it.id) >= 0;
        g.append(el("button", { type: "button", class: "cartao " + (ok ? "feito cor-verde" : ""), onclick: function () { opcoes.abrir(it, concluir, grade); } }, [
          opcoes.figura(it),
          el("span", { class: "nome", texto: it.nome }),
          ok ? el("span", { class: "selo" }, [icone("iconeCheck"), el("span", { texto: "Já visitei" })]) : el("span", { class: "sub", texto: opcoes.convite })
        ]));
      });
      ctx.area.append(el("p", { class: "instrucao", texto: opcoes.instrucao }), g);
    }
    function concluir(it) {
      if (feitos.indexOf(it.id) < 0) { feitos.push(it.id); salvar(); }
      if (feitos.length >= itens.length) ctx.fim(); else grade();
    }
    grade();
  }

  // ===================================================================
  // 1º ANO — OFICINA DE BRINQUEDOS
  // ===================================================================
  function atvMontar(ctx) {
    const lista = C.montar;
    let i = 0;
    function rodada() {
      const b = lista[i];
      ctx.limpar();
      ctx.contador(i + 1, lista.length);
      const escolhidos = [];
      const fig = figura(b.desenho, "silhueta");
      const mini = el("div", { class: "escolhidos" });
      const falta = el("p", { texto: "Precisa de " + b.materiais.length + " materiais." });
      const grade = el("div", { class: "materiais" });
      C.materiais.forEach(function (m) {
        const bt = el("button", { type: "button", class: "opcao" }, [figura(m.desenho), el("span", { texto: m.nome })]);
        bt.addEventListener("click", function () { escolher(m, bt); });
        grade.append(bt);
      });
      ctx.area.append(el("p", { class: "instrucao", texto: "Escolha os materiais para montar o brinquedo." }),
        el("div", { class: "montar" }, [el("div", { class: "bancada" }, [el("h3", { texto: b.nome }), fig, falta, mini]), grade]));

      function escolher(m, bt) {
        if (escolhidos.indexOf(m.id) >= 0 || bt.classList.contains("tentada")) return;
        if (b.materiais.indexOf(m.id) >= 0) {
          escolhidos.push(m.id);
          bt.classList.add("certa");
          mini.append(el("span", { class: "mini aparece", html: DESENHOS.desenhar(m.desenho) }));
          const restam = b.materiais.length - escolhidos.length;
          if (restam === 0) pronto();
          else { falta.textContent = "Falta " + restam + (restam === 1 ? " material." : " materiais."); mostrarRetorno("bom", "Isso! " + m.nome + " é um dos materiais. Escolha mais um."); }
        } else {
          bt.classList.add("tentada");
          const texto = m.id === "plastico"
            ? "Antigamente, este brinquedo não era feito de plástico. Tente outro material!"
            : "Não vai " + minusculaInicial(m.nome) + " neste brinquedo. Tente outro material!";
          ctx.erro(texto, bt);
        }
      }
      function pronto() {
        fig.classList.remove("silhueta"); fig.classList.add("aparece");
        falta.textContent = "Pronto!";
        janelaPronto(ctx, b, i === lista.length - 1, function () { i++; if (i < lista.length) rodada(); else ctx.fim(); });
      }
    }
    rodada();
  }

  function atvAntesAgora(ctx) {
    classificar(ctx, { titulo: "Este brinquedo é de que tempo?", caixas: C.antesAgora.caixas, itens: C.antesAgora.itens }, function () {
      ctx.ganhar("retrato"); ctx.fim();
    });
  }

  function atvPovos(ctx) {
    const lista = C.povos;
    let i = 0;
    function rodada() {
      const p = lista[i];
      ctx.limpar();
      ctx.contador(i + 1, lista.length);
      perguntar(ctx, { desenho: p.desenho, nome: p.nome, pergunta: p.pergunta, opcoes: p.opcoes, certa: p.certa, dica: "Ainda não! " + p.texto }, function () {
        ctx.ganhar(idPovo(p));
        ctx.acerto(p.texto, function () { i++; if (i < lista.length) rodada(); else ctx.fim(); });
      });
    }
    rodada();
  }

  function atvCaixas(ctx) {
    const rodadas = C.caixas;
    let r = 0;
    function rodada() {
      ctx.limpar();
      const cfg = rodadas[r];
      const errosAntes = ctx.erros;
      classificar(ctx, cfg, function () {
        if (cfg.todos) ctx.erros = errosAntes; // na pergunta "menino ou menina?" não há erro
        r++;
        if (r < rodadas.length) ctx.acerto("Caixas arrumadas! Vamos para a próxima.", rodada);
        else { ctx.ganhar("caixaTodos"); ctx.fim(); }
      });
    }
    rodada();
  }

  // ===================================================================
  // 2º ANO — PÁTIO DAS BRINCADEIRAS
  // ===================================================================
  function atvRegras(ctx) {
    visitas(ctx, C.grupos, {
      instrucao: "Clique num grupo de crianças para aprender a brincadeira.",
      convite: "Aprender",
      figura: function (g) { return el("span", { class: "figura", "data-alt": textoAlt("grupo", g), html: DESENHOS.desenhar("grupo", g) }); },
      abrir: function (g, concluir, voltar) {
        ctx.limpar();
        const passos = el("ol", { class: "passos" });
        g.passos.forEach(function (t, k) { passos.append(el("li", {}, [el("span", { class: "numero", texto: String(k + 1) }), el("span", { texto: t })])); });
        ctx.area.append(el("div", { class: "licao" }, [
          el("div", {}, [el("span", { class: "figura", "data-alt": textoAlt("grupo", g), html: DESENHOS.desenhar("grupo", g) })]),
          el("div", {}, [
            el("h3", { texto: g.nome }),
            el("p", { class: "quem", texto: "Quem ensina: " + g.quem }),
            el("p", { style: "font-weight:bold;margin-top:.5rem", texto: "As regras:" }),
            passos,
            el("div", { class: "linha", style: "justify-content:flex-start" }, [
              botao("Voltar ao pátio", "iconeVoltar", voltar),
              botao("Aprendi! Vamos ver?", "iconeCheck", function () {
                perguntar(ctx, { desenho: g.desenho, nome: g.nome, pergunta: g.pergunta, opcoes: g.opcoes, certa: g.certa,
                  dica: "Ainda não. Lembre a regra: " + g.passos.join(" ") }, function () {
                  ctx.ganhar("brincadeira-" + g.id);
                  ctx.acerto(sorteio(C.mensagens.acertos) + " Você aprendeu: " + g.nome + ".", function () { concluir(g); });
                });
              }, "botao-principal")
            ])
          ])
        ]));
      }
    });
  }

  // Amarelinha digital: jogar com o mouse ou com as setas do teclado.
  function atvAmarelinha(ctx) {
    // Casas: 0 = início, 1, 2, 3, 4 (casas 4 e 5), 5 (casa 6), 6 (casas 7 e 8), 7 = céu
    const CENTRO_Y = [300, 260, 220, 180, 140, 100, 60, 24];
    const PEDRAS = [2, 5, 3];
    let r = 0, pos = 0, dir = 1, pedra = PEDRAS[0], jogou = false, pegou = false;
    const pista = el("div", { class: "pista", role: "img", "aria-label": "Amarelinha" });
    const situacao = el("p", { class: "instrucao", "aria-live": "polite" });
    const bJogar = el("button", { type: "button", class: "botao botao-principal", style: "grid-column:1 / -1" }, [icone("iconePlay"), el("span", { texto: "Jogar a pedrinha" })]);
    const bPular = el("button", { type: "button", class: "botao" }, [icone("iconeSetaCima"), el("span", { texto: "Pular uma casa" }), el("span", { class: "tecla", texto: "seta ↑" })]);
    const bPorCima = el("button", { type: "button", class: "botao" }, [icone("iconeSetaDupla"), el("span", { texto: "Pular por cima" }), el("span", { class: "tecla", texto: "seta →" })]);
    const bPegar = el("button", { type: "button", class: "botao", style: "grid-column:1 / -1" }, [icone("iconeMao"), el("span", { texto: "Pegar a pedrinha" }), el("span", { class: "tecla", texto: "seta ↓" })]);
    bJogar.addEventListener("click", jogar);
    bPular.addEventListener("click", pular);
    bPorCima.addEventListener("click", porCima);
    bPegar.addEventListener("click", pegar);
    ctx.area.append(el("div", { class: "amarelinha" }, [pista, el("div", {}, [situacao, el("div", { class: "comandos" }, [bJogar, bPular, bPorCima, bPegar])])]));

    function desenharPista() {
      let s = `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="200" height="320" fill="#d6d3d1"/>`;
      const casa = function (x, y, w, h, n, idx) {
        const destaque = idx === pos ? "#fde68a" : "#ffffff";
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${destaque}" stroke="#334155" stroke-width="3"/><text x="${x + w / 2}" y="${y + h / 2 + 7}" font-size="20" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#64748b">${n}</text>`;
      };
      s += casa(70, 240, 60, 40, "1", 1) + casa(70, 200, 60, 40, "2", 2) + casa(70, 160, 60, 40, "3", 3);
      s += casa(40, 120, 60, 40, "4", 4) + casa(100, 120, 60, 40, "5", 4) + casa(70, 80, 60, 40, "6", 5);
      s += casa(40, 40, 60, 40, "7", 6) + casa(100, 40, 60, 40, "8", 6);
      s += `<path d="M40 40 Q100 -18 160 40 Z" fill="${pos === 7 ? "#fde68a" : "#e0f2fe"}" stroke="#334155" stroke-width="3"/><text x="100" y="32" font-size="15" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#1d4ed8">CÉU</text>`;
      s += `<text x="150" y="306" font-size="14" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#57534e">INÍCIO</text>`;
      if (jogou && !pegou) s += `<ellipse cx="${pedra === 4 || pedra === 6 ? 70 : 85}" cy="${CENTRO_Y[pedra] + 6}" rx="11" ry="8" fill="#78716c" stroke="#292524" stroke-width="2"/>`;
      const y = CENTRO_Y[pos];
      s += `<g transform="translate(${pos === 0 ? 80 : 118} ${y + 16}) scale(.75)"><circle cx="0" cy="-18" r="16" fill="#8d5524" stroke="#3b2a1a" stroke-width="2.5"/><circle cx="-5" cy="-20" r="2.2" fill="#111"/><circle cx="5" cy="-20" r="2.2" fill="#111"/><path d="M-6 -12 Q0 -7 6 -12" stroke="#111" stroke-width="2" fill="none"/><path d="M-16 -22 Q-14 -38 0 -36 Q14 -38 16 -22 Q8 -30 0 -29 Q-8 -30 -16 -22Z" fill="#1b120c"/></g>`;
      if (pegou) s += `<ellipse cx="${pos === 0 ? 102 : 140}" cy="${y + 4}" rx="9" ry="6" fill="#78716c" stroke="#292524" stroke-width="2"/>`;
      s += `</svg>`;
      pista.innerHTML = s;
      bJogar.hidden = jogou;
      ctx.contador(r + 1, PEDRAS.length);
      if (!jogou) situacao.textContent = "Rodada " + (r + 1) + ": jogue a pedrinha!";
      else if (dir === 1) situacao.textContent = "Pule até o céu, sem pisar na casa da pedrinha.";
      else if (!pegou) situacao.textContent = "Volte! Pegue a pedrinha quando estiver ao lado dela.";
      else situacao.textContent = "Agora volte até o início!";
    }
    function nomeCasa(idx) { return ["o início", "1", "2", "3", "4 e 5", "6", "7 e 8", "o céu"][idx]; }
    function jogar() {
      if (jogou) return;
      jogou = true; desenharPista();
      mostrarRetorno("bom", "A pedrinha caiu na casa " + nomeCasa(pedra) + ". Não pise nela!");
    }
    function mover(alvo) {
      pos = alvo; esconderRetorno(); desenharPista(); som("bom");
      if (pos === 7) { dir = -1; desenharPista(); mostrarRetorno("bom", "Você chegou ao céu! Agora volte e pegue a pedrinha."); }
      else if (pos === 0 && pegou) {
        ctx.acerto("Muito bem! Você fez a amarelinha sem pisar na casa da pedrinha.", function () {
          r++;
          if (r < PEDRAS.length) { pos = 0; dir = 1; pedra = PEDRAS[r]; jogou = false; pegou = false; desenharPista(); }
          else { ctx.ganhar("pedrinha"); ctx.fim(); }
        });
      }
    }
    function pular() {
      if (!jogou) { ctx.dica("Primeiro jogue a pedrinha!"); return; }
      const alvo = pos + dir;
      if (alvo < 0 || alvo > 7) return;
      if (!pegou && alvo === pedra) {
        ctx.erro(dir === 1 ? "Não pode pisar na casa da pedrinha! Use o botão Pular por cima." : "Pare! Primeiro pegue a pedrinha.", pista);
        return;
      }
      mover(alvo);
    }
    function porCima() {
      if (!jogou) { ctx.dica("Primeiro jogue a pedrinha!"); return; }
      if (dir === -1) { ctx.erro(pegou ? "Na volta, pule uma casa de cada vez." : "Na volta, primeiro pegue a pedrinha.", pista); return; }
      if (pos + 1 !== pedra) { ctx.erro("Só pule por cima quando a próxima casa tiver a pedrinha.", pista); return; }
      mover(pos + 2);
    }
    function pegar() {
      if (!jogou) { ctx.dica("Primeiro jogue a pedrinha!"); return; }
      if (pegou) { ctx.dica("Você já pegou a pedrinha. Agora volte até o início!"); return; }
      if (dir === -1 && pos === pedra + 1) { pegou = true; desenharPista(); mostrarRetorno("bom", "Você pegou a pedrinha! Agora continue voltando."); }
      else ctx.erro(dir === 1 ? "A pedrinha se pega na volta, quando você estiver na casa ao lado dela." : "Chegue mais perto: fique na casa ao lado da pedrinha.", pista);
    }
    function teclas(e) {
      if (janelaAberta() || tela.inert) return;
      if (e.key === "ArrowUp") { e.preventDefault(); if (!jogou) jogar(); else pular(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); porCima(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); pegar(); }
    }
    document.addEventListener("keydown", teclas);
    ctx.aoSair(function () { document.removeEventListener("keydown", teclas); });
    desenharPista();
  }

  function atvJokenpo(ctx) {
    const MAOS = [
      { id: "pedra", nome: "Pedra", desenho: "maoPedra", artigo: "da" },
      { id: "papel", nome: "Papel", desenho: "maoPapel", artigo: "do" },
      { id: "tesoura", nome: "Tesoura", desenho: "maoTesoura", artigo: "da" }
    ];
    const GANHA_DE = { pedra: "tesoura", tesoura: "papel", papel: "pedra" };
    const TOTAL = 5;
    let r = 0;
    function porId(id) { return MAOS.filter(function (m) { return m.id === id; })[0]; }
    function escolha() {
      ctx.limpar();
      ctx.contador(r + 1, TOTAL);
      const g = el("div", { class: "maos-escolha" });
      MAOS.forEach(function (m) {
        g.append(el("button", { type: "button", class: "opcao", onclick: function () { duelo(m); } }, [figura(m.desenho), el("span", { texto: m.nome })]));
      });
      ctx.area.append(el("div", { class: "jokenpo" }, [el("p", { class: "instrucao", texto: "Jo-ken-pô! Escolha a sua mão:" }), g,
        el("p", { class: "quem", texto: "Lembre: pedra ganha da tesoura, tesoura ganha do papel, papel ganha da pedra." })]));
    }
    function duelo(eu) {
      const pc = sorteio(MAOS);
      const resultado = eu.id === pc.id ? "empate" : (GANHA_DE[eu.id] === pc.id ? "voce" : "computador");
      let explica;
      if (resultado === "empate") explica = "Mãos iguais: é empate!";
      else {
        const venc = resultado === "voce" ? eu : pc, perd = resultado === "voce" ? pc : eu;
        explica = venc.nome + " ganha " + perd.artigo + " " + minusculaInicial(perd.nome) + "!";
      }
      ctx.limpar();
      const resp = el("div", { class: "linha" });
      [{ id: "voce", t: "Você" }, { id: "computador", t: "O computador" }, { id: "empate", t: "Empate" }].forEach(function (o) {
        const b = el("button", { type: "button", class: "botao" }, [el("span", { texto: o.t })]);
        b.addEventListener("click", function () {
          if (b.disabled) return;
          if (o.id === resultado) {
            ctx.acerto("Isso! " + explica, function () { r++; if (r < TOTAL) escolha(); else { ctx.ganhar("maos"); ctx.fim(); } });
          } else { b.disabled = true; ctx.erro("Olhe de novo: " + explica, b); }
        });
        resp.append(b);
      });
      ctx.area.append(el("div", { class: "jokenpo" }, [
        el("div", { class: "duelo" }, [
          el("div", { class: "lado" }, [figura(eu.desenho), el("span", { texto: "Você: " + eu.nome })]),
          el("span", { class: "x", texto: "×" }),
          el("div", { class: "lado" }, [figura(pc.desenho), el("span", { texto: "Computador: " + pc.nome })])
        ]),
        el("p", { class: "instrucao", texto: "Quem ganhou?" }), resp
      ]));
    }
    escolha();
  }

  function atvQuebraCabeca(ctx) {
    const lista = C.quebraCabecas;
    let q = 0;
    function rodada() {
      ctx.limpar();
      const qc = lista[q];
      ctx.contador(q + 1, lista.length);
      let proximo = 0;
      const lugares = el("div", { class: "lugares-passos" });
      const vagas = qc.passos.map(function (_, k) {
        const v = el("div", { class: "lugar-passo" }, [el("span", { class: "numero", texto: String(k + 1) })]);
        lugares.append(v); return v;
      });
      const pecas = el("div", { class: "pecas" });
      embaralhar(qc.passos.map(function (p, k) { return { p: p, k: k }; })).forEach(function (o) {
        const b = el("button", { type: "button", class: "opcao" }, [figura(o.p.desenho), el("span", { texto: o.p.texto })]);
        b.addEventListener("click", function () {
          if (b.hidden) return;
          if (o.k === proximo) {
            vagas[proximo].classList.add("cheio");
            vagas[proximo].append(figura(o.p.desenho, "aparece"), el("span", { texto: o.p.texto }));
            b.hidden = true;
            proximo++;
            esconderRetorno();
            if (proximo === qc.passos.length) {
              ctx.acerto("As regras da brincadeira " + qc.nome + " estão em ordem!", function () { q++; if (q < lista.length) rodada(); else { ctx.ganhar("quebraCabeca"); ctx.fim(); } });
            }
          } else {
            ctx.erro(proximo === 0 ? "Ainda não. O que vem primeiro?" : "Ainda não. O que vem depois de \"" + minusculaInicial(qc.passos[proximo - 1].texto) + "\"?", b);
          }
        });
        pecas.append(b);
      });
      ctx.area.append(el("p", { class: "instrucao", texto: qc.nome + ": clique nas figuras na ordem certa." }), lugares, pecas);
    }
    rodada();
  }

  // Brincadeira da minha família: desenho guardado só neste computador.
  function atvFamilia(ctx) {
    const L = 800, A = 500;
    const cv = el("canvas", { width: L, height: A, "aria-label": "Quadro de desenho" });
    const g = cv.getContext("2d");
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, L, A);
    g.lineCap = "round"; g.lineJoin = "round";
    let cor = "#1f2937", tam = 8, borracha = false, desenhando = false, ult = null, mexeu = false;
    const historico = [];
    function ponto(e) { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * L / r.width, y: (e.clientY - r.top) * A / r.height }; }
    function guardarHistorico() { historico.push(g.getImageData(0, 0, L, A)); if (historico.length > 15) historico.shift(); }
    function traco(p) {
      g.strokeStyle = borracha ? "#ffffff" : cor;
      g.lineWidth = borracha ? tam * 3 : tam;
      g.beginPath(); g.moveTo(ult.x, ult.y); g.lineTo(p.x + 0.01, p.y); g.stroke();
      ult = p;
    }
    cv.addEventListener("pointerdown", function (e) {
      e.preventDefault(); guardarHistorico(); desenhando = true; mexeu = true;
      try { cv.setPointerCapture(e.pointerId); } catch (er) { /* ok */ }
      ult = ponto(e); traco(ult);
    });
    cv.addEventListener("pointermove", function (e) { if (desenhando) traco(ponto(e)); });
    ["pointerup", "pointercancel"].forEach(function (t) { cv.addEventListener(t, function () { desenhando = false; }); });

    const CORES = acess.calmo
      ? [["Preto", "#1f2937"], ["Azul", "#2563eb"], ["Verde", "#16a34a"], ["Amarelo", "#facc15"], ["Vermelho", "#dc2626"], ["Marrom", "#8b5a2b"]]
      : [["Preto", "#1f2937"], ["Vermelho", "#dc2626"], ["Laranja", "#f97316"], ["Amarelo", "#facc15"], ["Verde", "#16a34a"], ["Azul", "#2563eb"],
        ["Roxo", "#7c3aed"], ["Rosa", "#ec4899"], ["Marrom", "#8b5a2b"], ["Marrom escuro", "#5c3a21"], ["Bege", "#f1c27d"], ["Cinza", "#9ca3af"]];
    const coresEl = el("div", { class: "cores" });
    const ferramentasCor = [];
    CORES.forEach(function (c) {
      const b = el("button", { type: "button", class: "cor", style: "background:" + c[1], "aria-label": c[0], title: c[0], "aria-pressed": c[1] === cor ? "true" : "false" });
      b.addEventListener("click", function () { cor = c[1]; borracha = false; atualizar(); });
      ferramentasCor.push([b, c[1]]); coresEl.append(b);
    });
    const tamanhos = el("div", { class: "tamanhos" });
    const tamBotoes = (acess.calmo ? [[6, "Fino"], [16, "Grosso"]] : [[4, "Fino"], [8, "Médio"], [18, "Grosso"]]).map(function (t) {
      const b = el("button", { type: "button", class: "tamanho", "aria-label": "Traço " + t[1], title: t[1] }, [el("span", { style: "width:" + (t[0] + 4) + "px;height:" + (t[0] + 4) + "px" })]);
      b.addEventListener("click", function () { tam = t[0]; atualizar(); });
      tamanhos.append(b); return [b, t[0]];
    });
    const bLapis = el("button", { type: "button", class: "botao ferramenta" }, [icone("iconeLapis"), el("span", { texto: "Lápis" })]);
    const bBorracha = el("button", { type: "button", class: "botao ferramenta" }, [icone("iconeBorracha"), el("span", { texto: "Borracha" })]);
    bLapis.addEventListener("click", function () { borracha = false; atualizar(); });
    bBorracha.addEventListener("click", function () { borracha = true; atualizar(); });
    function atualizar() {
      ferramentasCor.forEach(function (x) { x[0].setAttribute("aria-pressed", !borracha && x[1] === cor ? "true" : "false"); });
      tamBotoes.forEach(function (x) { x[0].setAttribute("aria-pressed", x[1] === tam ? "true" : "false"); });
      bLapis.setAttribute("aria-pressed", borracha ? "false" : "true");
      bBorracha.setAttribute("aria-pressed", borracha ? "true" : "false");
    }
    const desfazer = function () { if (historico.length) g.putImageData(historico.pop(), 0, 0); };
    const limparQuadro = function () { guardarHistorico(); g.fillStyle = "#ffffff"; g.fillRect(0, 0, L, A); };
    const ferramentas = acess.calmo
      ? el("div", { class: "ferramentas ferramentas-calmas" }, [
        el("strong", { texto: "Cores" }), coresEl, el("strong", { texto: "Traço" }), tamanhos,
        botao("Desfazer", "iconeDesfazer", desfazer, "botao-principal desfazer-grande"),
        botao("Limpar tudo", "iconeLixeira", limparQuadro)
      ])
      : el("div", { class: "ferramentas" }, [
        el("strong", { texto: "Cores" }), coresEl, el("strong", { texto: "Traço" }), tamanhos,
        el("div", { class: "linha" }, [bLapis, bBorracha]),
        el("div", { class: "linha" }, [botao("Desfazer", "iconeDesfazer", desfazer), botao("Limpar", "iconeLixeira", limparQuadro)])
      ]);
    if (acess.calmo) tam = 6;
    atualizar();

    let nomeEscolhido = "", quemEscolhido = "";
    function passoDesenho() {
      ctx.limpar();
      ctx.contador(1, 2);
      ctx.area.append(
        el("p", { class: "instrucao", texto: "Desenhe uma brincadeira que alguém da sua família ensinou." }),
        el("div", { class: "desenho-area" }, [el("div", { class: "quadro" }, [cv]), ferramentas]),
        el("div", { class: "linha", style: "margin-top:.8rem" }, [botao("Pronto! Dar um nome", "iconeAvancar", function () {
          if (!mexeu) { ctx.dica("Faça o seu desenho primeiro. Clique e arraste o mouse no quadro branco."); return; }
          passoNome();
        }, "botao-principal")])
      );
    }
    function grupoEscolhas(lista, atual, aoEscolher) {
      const box = el("div", { class: "escolhas" });
      lista.forEach(function (t) {
        const b = el("button", { type: "button", class: "botao", "aria-pressed": t === atual ? "true" : "false" }, [el("span", { texto: t })]);
        b.addEventListener("click", function () {
          box.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
          b.setAttribute("aria-pressed", "true"); aoEscolher(t);
        });
        box.append(b);
      });
      return box;
    }
    function passoNome() {
      ctx.limpar();
      ctx.contador(2, 2);
      const outro = el("input", { type: "text", maxlength: "40", id: "nome-outro", autocomplete: "off" });
      const autor = el("input", { type: "text", maxlength: "30", id: "nome-autor", autocomplete: "off" });
      const nomes = grupoEscolhas(C.familia.nomes, nomeEscolhido, function (t) { nomeEscolhido = t; outro.value = ""; });
      outro.addEventListener("input", function () { if (outro.value.trim()) { nomeEscolhido = ""; nomes.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); }); } });
      const img = el("img", { src: cv.toDataURL("image/png"), alt: "O seu desenho", style: "width:240px;border:4px solid #3b2a1a;border-radius:12px;background:#fff" });
      ctx.area.append(
        el("div", { class: "linha", style: "justify-content:flex-start;align-items:flex-start" }, [img, el("div", { style: "flex:1;min-width:300px" }, [
          el("p", { class: "instrucao", style: "text-align:left", texto: "Qual é o nome da brincadeira?" }), nomes,
          el("label", { class: "campo", for: "nome-outro" }, [el("span", { texto: "Outro nome (escreva aqui):" }), outro])
        ])]),
        el("p", { class: "instrucao", style: "text-align:left", texto: "Quem ensinou?" }),
        grupoEscolhas(C.familia.quem, quemEscolhido, function (t) { quemEscolhido = t; }),
        el("label", { class: "campo", for: "nome-autor" }, [el("span", { texto: "O seu primeiro nome (se quiser):" }), autor]),
        el("div", { class: "linha" }, [
          botao("Voltar ao desenho", "iconeVoltar", passoDesenho),
          botao("Guardar no baú", "iconeSalvar", function () {
            const nome = (outro.value.trim() || nomeEscolhido);
            if (!nome) { ctx.dica("Escolha ou escreva o nome da brincadeira."); return; }
            if (!quemEscolhido) { ctx.dica("Escolha quem ensinou a brincadeira."); return; }
            const lista = lerDesenhos();
            const novo = { id: Date.now(), nome: nome, quem: quemEscolhido, autor: autor.value.trim(), data: new Date().toLocaleDateString("pt-BR"), imagem: cv.toDataURL("image/jpeg", 0.7) };
            lista.push(novo);
            if (!salvarDesenhos(lista)) {
              ctx.dica("O baú de desenhos deste computador está cheio. Peça ao professor para apagar o progresso antigo.");
              return;
            }
            ctx.fim(el("div", { class: "centro" }, [el("p", { texto: C.mensagens.ganhouBau }),
              el("img", { class: "desenho-salvo", src: novo.imagem, alt: "Desenho: " + nome, style: "max-width:320px" }),
              el("p", { style: "font-weight:bold", texto: nome + " (quem ensinou: " + quemEscolhido + ")" })]));
          }, "botao-principal")
        ])
      );
    }
    passoDesenho();
  }

  // ===================================================================
  // 3º ANO — PASSEIO PELA CIDADE
  // ===================================================================
  function atvMapa(ctx) {
    const feitos = ctx.parcial();
    function mapa() {
      ctx.limpar();
      ctx.contador(feitos.length, C.lugares.length);
      const m = el("div", { class: "mapa" }, [el("span", { class: "figura figura-fundo", html: DESENHOS.desenhar("mapa") })]);
      C.lugares.forEach(function (l) {
        const ok = feitos.indexOf(l.id) >= 0;
        m.append(el("button", { type: "button", class: "pino" + (ok ? " feito" : ""), style: "left:" + l.x + "%;top:" + l.y + "%", onclick: function () { lugar(l); } },
          [icone(ok ? "iconeCheck" : "iconeOlho"), el("span", { texto: l.nome }), ok ? el("span", { class: "so-leitor", texto: " (já visitado)" }) : null]));
      });
      ctx.area.append(el("p", { class: "instrucao", texto: "Clique num lugar de São Paulo para ver como era antes e como é hoje." }), m);
    }
    function lugar(l) {
      ctx.limpar();
      let resolvidos = 0;
      const lista = el("div", { class: "marcar" });
      l.itens.forEach(function (it) {
        const linha = el("div", { class: "item" }, [el("span", { class: "texto", texto: it.texto })]);
        const bots = [["mudou", "Mudou"], ["continuou", "Continuou"]].map(function (o) {
          const b = el("button", { type: "button", class: "botao" }, [icone(o[0] === "mudou" ? "iconeDesfazer" : "iconeCheck"), el("span", { texto: o[1] })]);
          b.addEventListener("click", function () {
            if (linha.classList.contains("resolvido")) return;
            if (o[0] === it.resposta) {
              linha.classList.add("resolvido");
              bots.forEach(function (x) { x.remove(); });
              linha.append(el("span", { class: "resposta", texto: "✓ " + o[1] }));
              resolvidos++;
              if (resolvidos === l.itens.length) {
                ctx.ganhar("lugar-" + l.id);
                if (feitos.indexOf(l.id) < 0) { feitos.push(l.id); salvar(); }
                ctx.acerto(l.texto, function () { if (feitos.length >= C.lugares.length) ctx.fim(); else mapa(); }, "Voltar ao mapa");
              } else mostrarRetorno("bom", sorteio(C.mensagens.acertos));
            } else {
              ctx.erro(it.resposta === "continuou" ? "Olhe de novo: isso aparece Antes e também Hoje. Então continuou!" : "Olhe de novo: isso é diferente Antes e Hoje. Então mudou!", b);
            }
          });
          return b;
        });
        bots.forEach(function (b) { linha.append(b); });
        lista.append(linha);
      });
      ctx.area.append(
        el("div", { class: "topo-atividade" }, [botao("Voltar ao mapa", "iconeMapa", mapa), el("h3", { style: "flex:1;margin:0", texto: l.nome })]),
        el("div", { class: "antes-hoje" }, [
          el("figure", {}, [figura(l.desenho + "Antes", "antiga"), el("figcaption", {}, [el("span", { class: "etiqueta antes", texto: "Antes" }), l.antes])]),
          el("figure", {}, [figura(l.desenho + "Hoje"), el("figcaption", {}, [el("span", { class: "etiqueta hoje", texto: "Hoje" }), l.hoje])])
        ]),
        el("p", { class: "instrucao", style: "margin-top:.6rem", texto: "O que mudou? O que continuou?" }),
        lista
      );
    }
    mapa();
  }

  function atvAcessibilidade(ctx) {
    const A = C.acessibilidade;
    // Partes da praça: [x, y, largura, altura] no desenho de 400 x 260.
    const ZONAS = {
      escada: [0, 148, 92, 100], piso: [92, 210, 308, 36], bebedouro: [118, 90, 60, 120], balanco: [232, 86, 128, 124],
      arvore: [168, 62, 64, 90], banco: [180, 178, 50, 34], flores: [362, 178, 38, 32]
    };
    const NOMES = { escada: "Entrada da praça", piso: "Caminho", bebedouro: "Bebedouro", balanco: "Balanço", arvore: "Árvore", banco: "Banco", flores: "Flores" };
    const feito = {};
    const praca = el("div", { class: "praca" });
    const desenho = el("span", { class: "figura figura-fundo", "data-alt": descricao("praca") });
    praca.append(desenho);
    const painel = el("div", {});
    const achados = el("ul", { class: "achados" });
    function redesenhar() { desenho.innerHTML = DESENHOS.desenhar("praca", feito); }
    function listaAchados() {
      achados.innerHTML = "";
      A.problemas.forEach(function (p) {
        achados.append(el("li", { class: feito[p.id] ? "ok" : "" }, [icone(feito[p.id] ? "iconeCheck" : "iconeAjuda"), el("span", { texto: feito[p.id] ? p.nome : "Ainda não encontrado" })]));
      });
      ctx.contador(Object.keys(feito).length, A.problemas.length);
    }
    function painelInicial() {
      painel.innerHTML = "";
      painel.append(el("p", { class: "quem", texto: "Encontre na praça 4 coisas que impedem uma criança com deficiência de brincar." }), el("h3", { style: "margin-top:.6rem", texto: "O que você já encontrou:" }), achados);
    }
    const zonasEl = {};
    Object.keys(ZONAS).forEach(function (id) {
      const z = ZONAS[id];
      const b = el("button", { type: "button", class: "zona", "aria-label": NOMES[id], title: NOMES[id],
        style: "left:" + (z[0] / 4) + "%;top:" + (z[1] / 2.6) + "%;width:" + (z[2] / 4) + "%;height:" + (z[3] / 2.6) + "%" });
      b.addEventListener("click", function () { clicar(id); });
      zonasEl[id] = b;
      praca.append(b);
    });
    function clicar(id) {
      const prob = A.problemas.filter(function (p) { return p.id === id; })[0];
      if (!prob) { const d = A.distracoes.filter(function (x) { return x.id === id; })[0]; ctx.dica(d ? d.texto : "Isso não atrapalha. Procure outra coisa."); return; }
      if (feito[id]) { ctx.dica("Este já está resolvido! Procure outra coisa."); return; }
      esconderRetorno();
      painel.innerHTML = "";
      const resp = el("div", { class: "respostas" });
      embaralhar(prob.melhorias.map(function (t, k) { return { t: t, certa: k === prob.certa }; })).forEach(function (o) {
        const b = el("button", { type: "button", class: "opcao opcao-linha" }, [el("span", { texto: o.t })]);
        b.addEventListener("click", function () {
          if (b.classList.contains("tentada")) return;
          if (o.certa) {
            feito[id] = true; redesenhar(); zonasEl[id].classList.add("resolvida"); listaAchados(); painelInicial();
            if (Object.keys(feito).length === A.problemas.length) ctx.acerto(prob.pronto + " A praça agora é para todas as crianças!", function () { ctx.ganhar("lupa"); ctx.fim(); });
            else mostrarRetorno("bom", prob.pronto);
          } else { b.classList.add("tentada"); ctx.erro("Essa ideia não ajuda a criança a brincar. Pense em outra!", b); }
        });
        resp.append(b);
      });
      painel.append(el("p", { class: "quem", texto: prob.achou }), el("p", { class: "instrucao", style: "text-align:left", texto: "Qual é a melhor melhoria?" }), resp);
    }
    redesenhar(); listaAchados(); painelInicial();
    ctx.area.append(el("p", { class: "instrucao", texto: "Detetive: o que impede uma criança com deficiência de brincar nesta praça?" }),
      el("div", { class: "detetive" }, [praca, painel]));
  }

  function atvCulturas(ctx) {
    visitas(ctx, C.culturas, {
      instrucao: "Clique num lugar para conhecer espaços e tempos de brincar de diferentes culturas em São Paulo.",
      convite: "Conhecer",
      figura: function (c) { return figura(c.desenho); },
      abrir: function (c, concluir, voltar) {
        ctx.limpar();
        ctx.area.append(el("div", { class: "licao" }, [
          figura(c.desenho),
          el("div", {}, [
            el("h3", { texto: c.nome }),
            el("p", { class: "quem", texto: c.texto }),
            el("div", { class: "linha", style: "justify-content:flex-start;margin-top:.8rem" }, [
              botao("Voltar", "iconeVoltar", voltar),
              botao("Li! Vamos ver?", "iconeCheck", function () {
                perguntar(ctx, { desenho: c.desenho, pergunta: c.pergunta, opcoes: c.opcoes, certa: c.certa, dica: "Ainda não. Leia de novo: " + c.texto }, function () {
                  ctx.ganhar("cultura-" + c.id);
                  ctx.acerto(sorteio(C.mensagens.acertos) + " Você conheceu: " + c.nome + ".", function () { concluir(c); });
                });
              }, "botao-principal")
            ])
          ])
        ]));
      }
    });
  }


  // ===================================================================
  // MODO ÁUDIO — versões faladas das atividades (só teclado, sem arrastar)
  // ===================================================================
  function voltarAno(ctx) { return function () { telaAno(ctx.at.ano); }; }

  // Pergunta falada: as respostas são ouvidas com as setas e escolhidas com Enter.
  function audioPerguntar(ctx, cfg, aoAcertar) {
    ctx.limpar();
    if (cfg.desenho) ctx.area.append(figura(cfg.desenho, "figura-audio", cfg.extra));
    const ops = embaralhar(cfg.opcoes.map(function (t, k) { return { t: t, certa: k === cfg.certa }; }));
    menuAudio(ctx.area, {
      titulo: cfg.pergunta, voltar: cfg.voltar || voltarAno(ctx), lerPrimeira: false,
      fala: (cfg.intro ? cfg.intro + " " : "") + cfg.pergunta + " Use as setas para ouvir as respostas.",
      opcoes: ops.map(function (o) {
        return { texto: o.t, acao: function (b) {
          if (b.classList.contains("tentada")) { falar("Essa você já tentou. Escolha outra."); return; }
          if (o.certa) { b.classList.add("certa"); aoAcertar(); }
          else { b.classList.add("tentada"); mudarFala(b, o.t + ". Já tentou."); ctx.erro(cfg.dica || "Ainda não. Tente outra resposta!"); }
        } };
      })
    });
  }

  // Classificar falado: o jogo fala o brinquedo e as caixas; escolha com setas, Enter ou 1, 2, 3.
  function audioClassificar(ctx, cfg, aoTerminar) {
    const itens = embaralhar(cfg.itens);
    let i = 0;
    const listaCaixas = cfg.caixas.map(function (c, k) { return (k + 1) + ": " + c.nome; }).join(". ") + ".";
    function item() {
      ctx.limpar();
      const it = itens[i];
      ctx.contador(i + 1, itens.length);
      ctx.area.append(el("p", { class: "instrucao", texto: cfg.titulo }), el("div", { class: "carta-brinquedo" }, [figura(it.desenho), el("div", { texto: it.nome })]));
      menuAudio(ctx.area, {
        voltar: voltarAno(ctx), lerPrimeira: false,
        fala: it.nome + ". " + descricao(it.desenho) + " " + cfg.titulo + " " + listaCaixas,
        opcoes: cfg.caixas.map(function (c) { return { texto: c.nome, desenho: c.desenho, acao: function () { escolher(c.id); } }; })
      });
    }
    function seguir() { i++; if (i < itens.length) item(); else aoTerminar(); }
    function escolher(id) {
      const it = itens[i];
      if (cfg.todos) { ctx.acerto((id === "todos" ? "Isso! " : "") + cfg.celebra, seguir); return; }
      const certas = it.aceita || [it.caixa];
      if (certas.indexOf(id) >= 0) ctx.acerto(msgAcerto() + " " + (it.explica || ""), seguir);
      else {
        const nomeCerta = cfg.caixas.filter(function (c) { return c.id === certas[0]; })[0].nome;
        ctx.erro(it.explica ? "Ainda não! " + it.explica : "Ainda não! " + it.nome + " vai na caixa " + nomeCerta + ".");
      }
    }
    item();
  }

  // Lista falada de lugares ou grupos para visitar (guarda os já visitados).
  function audioVisitas(ctx, itens, cfg) {
    const feitos = ctx.parcial();
    function menu() {
      ctx.limpar();
      ctx.contador(feitos.length, itens.length);
      menuAudio(ctx.area, {
        titulo: cfg.titulo, voltar: voltarAno(ctx),
        fala: cfg.fala + " Já " + (feitos.length === 1 ? "foi " : "foram ") + feitos.length + " de " + itens.length + ".",
        opcoes: itens.map(function (it) {
          const ok = feitos.indexOf(it.id) >= 0;
          return { texto: it.nome + (ok ? " (já visitado)" : ""), fala: it.nome + (ok ? ". Já visitado." : "."), acao: function () { cfg.abrir(it, concluir, menu); } };
        })
      });
    }
    function concluir(it) {
      if (feitos.indexOf(it.id) < 0) { feitos.push(it.id); salvar(); }
      if (feitos.length >= itens.length) ctx.fim(); else menu();
    }
    menu();
  }

  // ---------- 1º ano ----------
  function audioMontar(ctx) {
    const lista = C.montar;
    let i = 0;
    function rodada() {
      ctx.limpar();
      const b = lista[i];
      ctx.contador(i + 1, lista.length);
      const escolhidos = [], tentados = [];
      ctx.area.append(figura(b.desenho, "figura-audio silhueta"));
      menuAudio(ctx.area, {
        titulo: "Materiais", voltar: voltarAno(ctx), lerPrimeira: false,
        fala: "Vamos montar: " + b.nome + ". " + descricao(b.desenho) + " Este brinquedo precisa de " + b.materiais.length + " materiais. Use as setas para ouvir os materiais e aperte Enter para escolher.",
        opcoes: C.materiais.map(function (m) {
          return { texto: m.nome, fala: descricao(m.desenho) || m.nome, desenho: m.desenho, acao: function (bt) {
            if (escolhidos.indexOf(m.id) >= 0) { falar(m.nome + " já foi escolhido. Escolha outro material."); return; }
            if (tentados.indexOf(m.id) >= 0) { falar(m.nome + " não vai neste brinquedo. Escolha outro."); return; }
            if (b.materiais.indexOf(m.id) >= 0) {
              escolhidos.push(m.id); bt.classList.add("certa"); mudarFala(bt, m.nome + ". Já escolhido.");
              const restam = b.materiais.length - escolhidos.length;
              if (restam === 0) janelaPronto(ctx, b, i === lista.length - 1, function () { i++; if (i < lista.length) rodada(); else ctx.fim(); });
              else mostrarRetorno("bom", msgAcerto() + " " + m.nome + " é um dos materiais. Falta " + restam + (restam === 1 ? " material." : " materiais."));
            } else {
              tentados.push(m.id); bt.classList.add("tentada"); mudarFala(bt, m.nome + ". Não vai neste brinquedo.");
              ctx.erro(m.id === "plastico" ? "Antigamente, este brinquedo não era feito de plástico. Tente outro material!" : "Não vai " + minusculaInicial(m.nome) + " neste brinquedo. Tente outro material!");
            }
          } };
        })
      });
    }
    rodada();
  }
  function audioAntesAgora(ctx) {
    audioClassificar(ctx, { titulo: "Este brinquedo é de que tempo?", caixas: C.antesAgora.caixas, itens: C.antesAgora.itens }, function () { ctx.ganhar("retrato"); ctx.fim(); });
  }
  function audioPovos(ctx) {
    const lista = C.povos;
    let i = 0;
    function rodada() {
      const p = lista[i];
      ctx.contador(i + 1, lista.length);
      audioPerguntar(ctx, { desenho: p.desenho, intro: descricao(p.desenho) || p.nome, pergunta: p.pergunta, opcoes: p.opcoes, certa: p.certa, dica: "Ainda não! " + p.texto }, function () {
        ctx.ganhar(idPovo(p));
        ctx.acerto(p.texto, function () { i++; if (i < lista.length) rodada(); else ctx.fim(); });
      });
    }
    rodada();
  }
  function audioCaixas(ctx) {
    let r = 0;
    function rodada() {
      const cfg = C.caixas[r];
      const errosAntes = ctx.erros;
      audioClassificar(ctx, cfg, function () {
        if (cfg.todos) ctx.erros = errosAntes;
        r++;
        if (r < C.caixas.length) ctx.acerto("Caixas arrumadas! Vamos para a próxima.", rodada);
        else { ctx.ganhar("caixaTodos"); ctx.fim(); }
      });
    }
    rodada();
  }

  // ---------- 2º ano ----------
  function audioRegras(ctx) {
    audioVisitas(ctx, C.grupos, {
      titulo: "Grupos de crianças",
      fala: "Pátio das brincadeiras. Escolha um grupo de crianças para aprender uma brincadeira.",
      abrir: function (g, concluir, voltar) {
        ctx.limpar();
        ctx.area.append(el("span", { class: "figura figura-audio", "data-alt": textoAlt("grupo", g), html: DESENHOS.desenhar("grupo", g) }));
        const todos = g.passos.map(function (p, k) { return "Passo " + (k + 1) + ": " + p; }).join(" ");
        const opcoes = g.passos.map(function (p, k) {
          return { texto: "Passo " + (k + 1) + ": " + p, acao: function () { falar("Passo " + (k + 1) + ": " + p); } };
        });
        opcoes.push({ texto: "Ouvir todos os passos de novo", acao: function () { falar(todos); } });
        opcoes.push({ texto: "Já aprendi! Vamos ver?", acao: function () {
          audioPerguntar(ctx, { desenho: g.desenho, pergunta: g.pergunta, opcoes: g.opcoes, certa: g.certa, voltar: function () { cfgVoltar(); },
            dica: "Ainda não. Lembre as regras: " + todos }, function () {
            ctx.ganhar("brincadeira-" + g.id);
            ctx.acerto(msgAcerto() + " Você aprendeu: " + g.nome + ".", function () { concluir(g); });
          });
        } });
        function cfgVoltar() { abrirLicao(); }
        function abrirLicao() {
          ctx.limpar();
          ctx.area.append(el("span", { class: "figura figura-audio", "data-alt": textoAlt("grupo", g), html: DESENHOS.desenhar("grupo", g) }));
          menuAudio(ctx.area, {
            titulo: g.nome, voltar: voltar,
            fala: (AC.brincadeiras[g.id] || g.nome + ".") + " Quem ensina: " + g.quem + " Vamos ouvir as regras, passo a passo. A seta para baixo vai para o próximo passo. Enter repete o passo.",
            opcoes: opcoes
          });
        }
        abrirLicao();
      }
    });
  }

  // Amarelinha falada, com sons de direção:
  // esquerda e direita no estéreo; casas mais à frente com som mais agudo, mais atrás com som mais grave.
  function audioAmarelinha(ctx) {
    const CASAS = { 0: [0, 0], 1: [0, 1], 2: [0, 2], 3: [0, 3], 4: [-1, 4], 5: [1, 4], 6: [0, 5], 7: [-1, 6], 8: [1, 6], 9: [0, 7] }; // [coluna, linha]
    const NOMES = { 0: "o início", 9: "o céu" };
    const PEDRAS = [2, 5, 7];
    let r = 0, pos = 0, pedra = PEDRAS[0], jogou = false, pegou = false, volta = false;
    const pista = el("div", { class: "pista pista-audio", role: "img", "aria-label": "Amarelinha" });
    ctx.area.append(el("div", { class: "amarelinha" }, [pista, el("div", { class: "quem" }, [
      el("p", { texto: "Enter: jogar e pegar a pedrinha." }), el("p", { texto: "Seta para cima: pular para a frente." }),
      el("p", { texto: "Seta para baixo: pular para trás." }), el("p", { texto: "Setas para os lados: esquerda e direita." })])]));
    function nome(n) { return NOMES[n] || "casa " + n; }
    function freq(n) { return 300 * Math.pow(2, CASAS[n][1] / 7); }
    function somCasa(n) { tom(freq(n), CASAS[n][0] * 0.9, "sine", 0.3, 0.2); tom(freq(n) * 1.5, CASAS[n][0] * 0.9, "sine", 0.25, 0.1, 0.1); }
    function somLinha(pan) { tom(110, pan, "square", 0.3, 0.07); tom(92, pan, "square", 0.3, 0.07, 0.12); }
    function somPista(n) { tom(freq(n), CASAS[n][0] * 0.9, "triangle", 0.2, 0.09, 0.5); }
    function sequencia() {
      const ida = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function (n) { return n !== pedra; });
      return volta ? [8, 7, 6, 5, 4, 3, 2, 1, 0] : ida;
    }
    function proxima() {
      const s = sequencia();
      if (!volta) { for (let k = 0; k < s.length; k++) if (s[k] > pos) return s[k]; return null; }
      for (let k = 0; k < s.length; k++) if (s[k] < pos) return s[k];
      return null;
    }
    function teclaPara(de, para) {
      const a = CASAS[de], b = CASAS[para];
      if (a[1] !== b[1]) return b[1] > a[1] ? "ArrowUp" : "ArrowDown";
      return b[0] > a[0] ? "ArrowRight" : "ArrowLeft";
    }
    function direcao(de, para) {
      const t = teclaPara(de, para), lado = CASAS[para][0];
      let d = { ArrowUp: "para a frente", ArrowDown: "para trás", ArrowLeft: "para a esquerda", ArrowRight: "para a direita" }[t];
      if ((t === "ArrowUp" || t === "ArrowDown") && lado !== 0) d += lado < 0 ? ", do lado esquerdo" : ", do lado direito";
      return d;
    }
    function desenhar() {
      const R = { 1: [70, 240, 60, 40], 2: [70, 200, 60, 40], 3: [70, 160, 60, 40], 4: [40, 120, 60, 40], 5: [100, 120, 60, 40], 6: [70, 80, 60, 40], 7: [40, 40, 60, 40], 8: [100, 40, 60, 40] };
      let s = `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="200" height="320" fill="#d6d3d1"/>`;
      Object.keys(R).forEach(function (k) {
        const q = R[k];
        s += `<rect x="${q[0]}" y="${q[1]}" width="${q[2]}" height="${q[3]}" fill="${+k === pos ? "#fde68a" : "#ffffff"}" stroke="#334155" stroke-width="3"/><text x="${q[0] + 30}" y="${q[1] + 27}" font-size="20" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#64748b">${k}</text>`;
        if (jogou && !pegou && +k === pedra) s += `<ellipse cx="${q[0] + 18}" cy="${q[1] + 28}" rx="10" ry="7" fill="#78716c" stroke="#292524" stroke-width="2"/>`;
      });
      s += `<path d="M40 40 Q100 -18 160 40 Z" fill="${pos === 9 ? "#fde68a" : "#e0f2fe"}" stroke="#334155" stroke-width="3"/><text x="100" y="32" font-size="15" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#1d4ed8">CÉU</text>`;
      s += `<text x="100" y="306" font-size="14" text-anchor="middle" font-family="Arial" font-weight="bold" fill="${pos === 0 ? "#b45309" : "#57534e"}">INÍCIO</text></svg>`;
      pista.innerHTML = s;
      ctx.contador(r + 1, PEDRAS.length);
    }
    function instrucao() {
      if (!jogou) return "Rodada " + (r + 1) + " de " + PEDRAS.length + ". Aperte Enter para jogar a pedrinha.";
      const p = proxima();
      if (volta && !pegou && p === pedra) return "A pedrinha está na próxima casa. Aperte Enter para pegar a pedrinha.";
      if (p === null) return "";
      return "Próxima: " + nome(p) + ", " + direcao(pos, p) + ".";
    }
    function anunciar(prefixo) { falar((prefixo ? prefixo + " " : "") + instrucao()); const p = proxima(); if (jogou && p !== null) somPista(p); }
    function teclas(e) {
      const k = e.key;
      if (k === "Enter") {
        if (!jogou) { jogou = true; desenhar(); tom(500, 0, "triangle", 0.2, 0.1); anunciar("A pedrinha caiu na " + nome(pedra) + ". Não pise nela! Você está no início."); return true; }
        const p = proxima();
        if (volta && !pegou && p === pedra) { pegou = true; desenhar(); somCasa(pedra); anunciar("Você pegou a pedrinha!"); return true; }
        falar(pegou || !volta ? "Agora é só pular. " + instrucao() : instrucao());
        return true;
      }
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(k) < 0) return false;
      if (!jogou) { falar("Primeiro, aperte Enter para jogar a pedrinha."); return true; }
      const p = proxima();
      if (p === null) return true;
      if (volta && !pegou && p === pedra) { falar("Espere! Primeiro aperte Enter para pegar a pedrinha."); return true; }
      if (k !== teclaPara(pos, p)) {
        const pan = { ArrowLeft: -0.9, ArrowRight: 0.9 }[k] || 0;
        somLinha(pan);
        ctx.erro("Ops, pisou na linha. " + instrucao());
        return true;
      }
      pos = p; desenhar(); somCasa(pos); esconderRetorno();
      if (pos === 9) { volta = true; anunciar("Você chegou ao céu! Agora vamos voltar."); return true; }
      if (pos === 0 && volta) {
        ctx.acerto("Muito bem! Você fez a amarelinha sem pisar na casa da pedrinha.", function () {
          r++;
          if (r < PEDRAS.length) { pos = 0; pedra = PEDRAS[r]; jogou = false; pegou = false; volta = false; desenhar(); comecar(); }
          else { ctx.ganhar("pedrinha"); ctx.fim(); }
        });
        return true;
      }
      anunciar("Casa " + pos + ".");
      return true;
    }
    function comecar() {
      A.voltar = voltarAno(ctx); A.teclas = teclas; A.ajuda = AC.ajuda.amarelinha;
      tela.focus({ preventScroll: true });
      A.falaTela = "Amarelinha. Vamos pular da casa 1 até o céu e voltar, sem pisar na casa da pedrinha. Ouça de onde vem o som da próxima casa. " + instrucao();
      falar(A.falaTela);
    }
    desenhar();
    comecar();
  }

  function audioJokenpo(ctx) {
    const MAOS = [{ id: "pedra", nome: "Pedra", desenho: "maoPedra", artigo: "da" }, { id: "papel", nome: "Papel", desenho: "maoPapel", artigo: "do" }, { id: "tesoura", nome: "Tesoura", desenho: "maoTesoura", artigo: "da" }];
    const GANHA_DE = { pedra: "tesoura", tesoura: "papel", papel: "pedra" };
    const TOTAL = 5;
    let r = 0;
    function escolha() {
      ctx.limpar();
      ctx.contador(r + 1, TOTAL);
      menuAudio(ctx.area, {
        voltar: voltarAno(ctx),
        fala: "Rodada " + (r + 1) + " de " + TOTAL + ". Jo-ken-pô! Escolha a sua mão." + (r === 0 ? " Lembre: pedra ganha da tesoura, tesoura ganha do papel, papel ganha da pedra." : ""),
        opcoes: MAOS.map(function (m) { return { texto: m.nome, desenho: m.desenho, fala: descricao(m.desenho) || m.nome, acao: function () { duelo(m); } }; })
      });
    }
    function duelo(eu) {
      const pc = sorteio(MAOS);
      const resultado = eu.id === pc.id ? "empate" : (GANHA_DE[eu.id] === pc.id ? "voce" : "computador");
      let explica;
      if (resultado === "empate") explica = "Mãos iguais: é empate!";
      else { const v = resultado === "voce" ? eu : pc, p = resultado === "voce" ? pc : eu; explica = v.nome + " ganha " + p.artigo + " " + minusculaInicial(p.nome) + "!"; }
      ctx.limpar();
      ctx.area.append(el("div", { class: "duelo" }, [
        el("div", { class: "lado" }, [figura(eu.desenho), el("span", { texto: "Você: " + eu.nome })]), el("span", { class: "x", texto: "×" }),
        el("div", { class: "lado" }, [figura(pc.desenho), el("span", { texto: "Computador: " + pc.nome })])]));
      menuAudio(ctx.area, {
        voltar: escolha, lerPrimeira: false,
        fala: "Você mostrou " + minusculaInicial(eu.nome) + ". O computador mostrou " + minusculaInicial(pc.nome) + ". Quem ganhou?",
        opcoes: [{ id: "voce", t: "Você" }, { id: "computador", t: "O computador" }, { id: "empate", t: "Empate" }].map(function (o) {
          return { texto: o.t, acao: function (b) {
            if (o.id === resultado) ctx.acerto("Isso! " + explica, function () { r++; if (r < TOTAL) escolha(); else { ctx.ganhar("maos"); ctx.fim(); } });
            else { b.classList.add("tentada"); ctx.erro("Pense de novo: " + explica); }
          } };
        })
      });
    }
    escolha();
  }

  function audioQuebraCabeca(ctx) {
    const lista = C.quebraCabecas;
    let q = 0;
    function rodada() {
      const qc = lista[q];
      let proximo = 0;
      let restantes = embaralhar(qc.passos.map(function (p, k) { return { p: p, k: k }; }));
      const ordinal = ["primeiro", "em segundo lugar", "em terceiro lugar", "por último"];
      function menu(prefixo) {
        ctx.limpar();
        ctx.contador(q + 1, lista.length);
        menuAudio(ctx.area, {
          titulo: qc.nome, voltar: voltarAno(ctx), lerPrimeira: false,
          fala: (prefixo ? prefixo + " " : qc.nome + ". Ouça as etapas da brincadeira e escolha qual vem primeiro. ") + (proximo > 0 ? "Qual vem " + (ordinal[proximo] || "em seguida") + "?" : ""),
          opcoes: restantes.map(function (o) {
            return { texto: o.p.texto, desenho: o.p.desenho, acao: function () {
              if (o.k === proximo) {
                proximo++;
                restantes = restantes.filter(function (x) { return x !== o; });
                if (proximo === qc.passos.length) {
                  ctx.acerto("Muito bem! A ordem é: " + qc.passos.map(function (p, k) { return (k + 1) + ", " + p.texto; }).join(". ") + ".", function () { q++; if (q < lista.length) rodada(); else { ctx.ganhar("quebraCabeca"); ctx.fim(); } });
                } else menu(msgAcerto() + " Etapa " + proximo + ": " + o.p.texto + ".");
              } else {
                ctx.erro(proximo === 0 ? "Ainda não. Pense: o que se faz primeiro?" : "Ainda não. O que vem depois de " + minusculaInicial(qc.passos[proximo - 1].texto) + "?");
              }
            } };
          })
        });
      }
      menu("");
    }
    rodada();
  }

  // Brincadeira da minha família, sem desenho: escolher numa lista ou digitar (a voz fala cada letra).
  function audioFamilia(ctx) {
    let nome = "";
    function nomes() {
      ctx.limpar();
      ctx.contador(1, 2);
      const opcoes = C.familia.nomes.map(function (t) { return { texto: t, acao: function () { nome = t; quem(); } }; });
      opcoes.push({ texto: "Escrever outro nome", acao: escrever });
      menuAudio(ctx.area, { fala: "Qual é a brincadeira que alguém da sua família ensinou? Escolha na lista, ou escolha Escrever outro nome.", voltar: voltarAno(ctx), lerPrimeira: false, opcoes: opcoes });
    }
    function escrever() {
      ctx.limpar();
      const campo = el("input", { type: "text", maxlength: "40", class: "campo-audio", "aria-label": "Nome da brincadeira", autocomplete: "off" });
      ctx.area.append(el("label", { class: "campo" }, [el("span", { texto: "Nome da brincadeira:" }), campo]));
      A.voltar = nomes; A.teclas = null;
      let antes = "";
      campo.addEventListener("input", function () {
        const v = campo.value;
        if (v.length > antes.length) { const c = v.slice(-1); falar(c === " " ? "espaço" : c); }
        else if (v.length < antes.length) falar(v.length ? "Apagou. Ficou: " + v : "Apagou tudo.");
        antes = v;
      });
      campo.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return;
        e.preventDefault();
        const v = campo.value.trim();
        if (!v) { falar("Escreva pelo menos uma letra. Depois aperte Enter."); return; }
        nome = v; quem();
      });
      campo.focus();
      A.falaTela = "Escreva o nome da brincadeira com o teclado. A voz fala cada letra. Quando terminar, aperte Enter. Esc volta para a lista.";
      falar(A.falaTela);
    }
    function quem() {
      ctx.limpar();
      ctx.contador(2, 2);
      menuAudio(ctx.area, {
        fala: "Brincadeira: " + nome + ". Quem ensinou?", voltar: nomes, lerPrimeira: false,
        opcoes: C.familia.quem.map(function (t) { return { texto: t, acao: function () { guardar(t); } }; })
      });
    }
    function guardar(q) {
      const lista = lerDesenhos();
      lista.push({ id: Date.now(), nome: nome, quem: q, autor: "", data: new Date().toLocaleDateString("pt-BR"), imagem: null });
      if (!salvarDesenhos(lista)) { ctx.dica("O baú deste computador está cheio. Peça ajuda ao professor."); return; }
      ctx.fim(el("p", { class: "centro", texto: "Guardado no baú: " + nome + ", quem ensinou: " + q + "." }));
    }
    nomes();
  }

  // ---------- 3º ano ----------
  function audioMapa(ctx) {
    audioVisitas(ctx, C.lugares, {
      titulo: "Lugares de São Paulo",
      fala: "Passeio pela cidade de São Paulo. Escolha um lugar para conhecer como era antes e como é hoje.",
      abrir: function (l, concluir, voltar) {
        function figuras() {
          ctx.area.append(el("div", { class: "antes-hoje" }, [
            el("figure", {}, [figura(l.desenho + "Antes", "antiga"), el("figcaption", {}, [el("span", { class: "etiqueta antes", texto: "Antes" }), l.antes])]),
            el("figure", {}, [figura(l.desenho + "Hoje"), el("figcaption", {}, [el("span", { class: "etiqueta hoje", texto: "Hoje" }), l.hoje])])]));
        }
        const falaAntes = "Ilustração Antes. " + l.antes + " " + descricao(l.desenho + "Antes");
        const falaHoje = "Ilustração Hoje. " + l.hoje + " " + descricao(l.desenho + "Hoje");
        function antes() {
          ctx.limpar(); figuras();
          menuAudio(ctx.area, { voltar: voltar, lerPrimeira: false, fala: l.nome + ". Vamos ouvir as duas ilustrações, uma de cada vez. " + falaAntes + " Aperte Enter para ouvir a ilustração Hoje.",
            opcoes: [{ texto: "Ouvir a ilustração Hoje", acao: hoje }] });
        }
        function hoje() {
          ctx.limpar(); figuras();
          menuAudio(ctx.area, { voltar: antes, lerPrimeira: false, fala: falaHoje + " Aperte Enter para responder o que mudou e o que continuou.",
            opcoes: [{ texto: "Responder", acao: function () { pergunta(0); } }] });
        }
        function pergunta(k) {
          const it = l.itens[k];
          ctx.limpar(); figuras();
          menuAudio(ctx.area, {
            voltar: voltar, lerPrimeira: false,
            fala: "Pergunta " + (k + 1) + " de " + l.itens.length + ": " + it.texto + ". Mudou ou continuou?",
            opcoes: [
              { texto: "Mudou", acao: function () { responder(k, "mudou"); } },
              { texto: "Continuou", acao: function () { responder(k, "continuou"); } },
              { texto: "Ouvir a ilustração Antes de novo", acao: function () { falar(falaAntes); } },
              { texto: "Ouvir a ilustração Hoje de novo", acao: function () { falar(falaHoje); } }
            ]
          });
        }
        function responder(k, r) {
          const it = l.itens[k];
          if (r !== it.resposta) { ctx.erro(it.resposta === "continuou" ? "Pense de novo: isso aparece Antes e também Hoje. Então continuou!" : "Pense de novo: isso é diferente Antes e Hoje. Então mudou!"); return; }
          if (k + 1 < l.itens.length) { ctx.acerto(msgAcerto() + " " + it.texto + ": " + (r === "mudou" ? "mudou." : "continuou."), function () { pergunta(k + 1); }); return; }
          ctx.ganhar("lugar-" + l.id);
          ctx.acerto(msgAcerto() + " " + l.texto, function () { concluir(l); }, "Voltar aos lugares");
        }
        antes();
      }
    });
  }

  function audioAcessibilidade(ctx) {
    const P = AC.pracaFalada;
    const problemas = P.elementos.filter(function (x) { return x.problema; });
    const feito = {}, conferido = {};
    const desenho = el("span", { class: "figura figura-audio-larga", "data-alt": descricao("praca") });
    function redesenhar() { desenho.innerHTML = DESENHOS.desenhar("praca", feito); }
    function quantos() { return problemas.filter(function (p) { return feito[p.id]; }).length; }
    function praca(prefixo) {
      ctx.limpar();
      redesenhar(); ctx.area.append(desenho);
      ctx.contador(quantos(), problemas.length);
      menuAudio(ctx.area, {
        titulo: "O que tem na praça", voltar: voltarAno(ctx), lerPrimeira: false,
        fala: (prefixo ? prefixo + " " : P.intro + " ") + "Faltam " + (problemas.length - quantos()) + " coisas para melhorar. Use as setas para ouvir o que tem na praça.",
        opcoes: P.elementos.map(function (x) {
          const estado = feito[x.id] ? " Já melhorado." : (conferido[x.id] ? " Não atrapalha." : "");
          return { texto: x.texto + estado, acao: function () { perguntar(x); } };
        })
      });
    }
    function perguntar(x) {
      if (feito[x.id]) { falar("Isso já foi melhorado. Escolha outro item."); return; }
      ctx.limpar(); redesenhar(); ctx.area.append(desenho);
      menuAudio(ctx.area, {
        voltar: function () { praca(""); }, lerPrimeira: false,
        fala: x.texto + " Isso atrapalha alguém a brincar?",
        opcoes: [
          { texto: "Sim, atrapalha", acao: function () { if (x.problema) melhorar(x); else ctx.erro("Pense de novo: " + x.porque); } },
          { texto: "Não atrapalha", acao: function () {
            if (x.problema) ctx.erro("Pense de novo: " + x.porque);
            else { conferido[x.id] = true; ctx.acerto("Isso mesmo! " + x.porque, function () { praca(""); }); }
          } },
          { texto: "Voltar para a praça", acao: function () { praca(""); } }
        ]
      });
    }
    function melhorar(x) {
      audioPerguntar(ctx, { pergunta: "Isso mesmo! " + x.porque + " Qual é a melhor melhoria?", opcoes: x.melhorias, certa: x.certa, voltar: function () { praca(""); },
        dica: "Essa ideia não ajuda a criança a brincar. Pense em outra!" }, function () {
        feito[x.id] = true;
        if (quantos() === problemas.length) ctx.acerto(x.pronto + " A praça agora é para todas as crianças!", function () { ctx.ganhar("lupa"); ctx.fim(); });
        else ctx.acerto(x.pronto, function () { praca(""); });
      });
    }
    praca("");
  }

  function audioCulturas(ctx) {
    audioVisitas(ctx, C.culturas, {
      titulo: "Espaços de diferentes culturas",
      fala: "Espaços e tempos de brincar de diferentes culturas em São Paulo. Escolha um lugar.",
      abrir: function (c, concluir, voltar) {
        ctx.limpar();
        ctx.area.append(figura(c.desenho, "figura-audio-larga"));
        menuAudio(ctx.area, {
          voltar: voltar, lerPrimeira: false, focar: true,
          fala: c.nome + ". " + c.texto + " Na ilustração: " + descricao(c.desenho) + " Aperte Enter para ouvir a pergunta.",
          opcoes: [
            { texto: "Ouvir a pergunta", acao: function () {
              audioPerguntar(ctx, { desenho: c.desenho, pergunta: c.pergunta, opcoes: c.opcoes, certa: c.certa, voltar: voltar, dica: "Ainda não. Ouça de novo: " + c.texto }, function () {
                ctx.ganhar("cultura-" + c.id);
                ctx.acerto(msgAcerto() + " Você conheceu: " + c.nome + ".", function () { concluir(c); });
              });
            } },
            { texto: "Ouvir de novo", acao: function () { falar(c.texto); } }
          ]
        });
      }
    });
  }

  // Janela "brinquedo pronto" (usada no modo normal e no Modo Áudio).
  function janelaPronto(ctx, b, ultimo, continuar) {
    ctx.ganhar("brinquedo-" + b.id);
    esconderRetorno();
    som("bom");
    abrirJanela(b.nome + ": pronto!", "iconeEstrela", [
      figura(b.desenho, "figura-media aparece"),
      el("p", { class: "instrucao", texto: b.feitoDe }),
      el("p", { class: "quem", texto: "Como era feito: " + b.comoEra }),
      b.origem ? el("p", { class: "quem", style: "margin-top:.5rem", texto: "De onde vem: " + b.origem }) : null
    ], [botao(ultimo ? "Terminar" : "Próximo brinquedo", "iconeAvancar", function () { fecharJanela(); continuar(); }, "botao-principal")], false);
  }

  // ===================================================================
  // Painel de acessibilidade (na tela inicial e na Área do professor)
  // ===================================================================
  function abrirAcessibilidade() {
    const ITENS = [
      ["audio", "iconeVoz", "Modo Áudio", "Para quem não enxerga: o jogo fala e funciona só com o teclado."],
      ["voz", "iconeSomOn", "Voz do jogo", "Desligue se o computador usa o NVDA ou o Narrador, para não ter duas vozes."],
      ["devagar", "iconeVoz", "Voz mais devagar", "A voz do jogo fala mais devagar."],
      ["calmo", "iconeCalmo", "Modo Calmo", "Tela mais simples, cores suaves, sem brilhos e instruções em passos."],
      ["semAnimacoes", "iconeParado", "Sem animações", "Nada se mexe na tela."],
      ["grande", "iconeLetras", "Letras e botões maiores", "Tudo fica maior na tela."],
      ["contraste", "iconeContraste", "Alto contraste", "Fundo preto e letras claras."]
    ];
    const lista = el("div", { class: "lista-acess" });
    ITENS.forEach(function (it) {
      const chave = it[0];
      const estadoTxt = el("span", { class: "estado" });
      const b = el("button", { type: "button", class: "botao alternar" }, [icone(it[1]), el("span", { class: "alt-texto" }, [el("strong", { texto: it[2] }), el("span", { class: "texto-pequeno", texto: it[3] })]), estadoTxt]);
      function atualizar() {
        const on = !!acess[chave];
        b.setAttribute("aria-pressed", on ? "true" : "false");
        estadoTxt.textContent = on ? "Ligado" : "Desligado";
        mudarFala(b, it[2] + ": " + (on ? "ligado" : "desligado") + ". " + it[3]);
      }
      b.addEventListener("click", function () {
        acess[chave] = !acess[chave];
        if (chave === "audio") { A.ativado = true; somLigado = acess.audio; atualizarBotaoSom(); }
        if (chave === "calmo" && acess.calmo && !acess.audio) { somLigado = false; atualizarBotaoSom(); }
        salvarAcess(); aplicarAcess(); atualizar();
        if (acess.audio) falar(it[2] + ": " + (acess[chave] ? "ligado." : "desligado.") + (chave === "audio" ? " Agora o jogo fala. Use as setas para ouvir as opções. Para sair daqui, aperte Esc." : ""));
        else if (chave === "audio") pararFala();
      });
      atualizar();
      lista.append(b);
    });
    const testar = botao("Testar a voz", "iconeVoz", function () { dizer("Olá! Esta é a voz do Baú do Tempo."); });
    abrirJanela("Acessibilidade", "iconeAcessibilidade", [
      el("p", { texto: "Ligue ou desligue cada opção. As escolhas ficam guardadas neste computador." }), lista
    ], [botao("Pronto", "iconeCheck", fecharJanela, "botao-principal"), testar],
    true, "Acessibilidade. Use as setas para ouvir as opções e Enter para ligar ou desligar. Para terminar, escolha Pronto.", true);
    aoFecharJanela = recarregarTela; // ao fechar (Pronto ou Esc), a tela se refaz com as novas escolhas
    // A primeira opção da lista recebe o foco (Modo Áudio ligado ou não).
    setTimeout(function () { const p = lista.querySelector("button"); if (p) p.focus(); }, 40);
  }
  function pararFala() { try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) { /* sem voz */ } }

  // ===================================================================
  // Lista das atividades (a ordem é a ordem de liberação)
  // ===================================================================
  const AJUDA_GERAL = [
    ["iconeMouse", "Use o mouse: clique uma vez nos botões grandes."],
    ["iconeLampada", "Errou? Leia a dica e tente de novo. Não existe fim de jogo!"],
    ["iconeEstrela", "Em cada atividade você ganha até 3 estrelas."],
    ["iconeBau", "As viagens trazem objetos para o Meu baú."],
    ["iconePausa", "Precisa parar um pouco? Clique em Pausa."]
  ];
  const ATIVIDADES = [
    { id: "montar", ano: 1, nome: "Montar brinquedos", desenho: "piao", iniciar: atvMontar, audio: audioMontar,
      ajuda: [["mMadeira", "Clique nos materiais certos para montar o brinquedo."], ["iconeLampada", "Se errar, leia a dica e escolha outro."], ["peteca", "Quando o brinquedo fica pronto, você descobre como era feito."]] },
    { id: "antesAgora", ano: 1, nome: "Antes e agora", desenho: "iDois", iniciar: atvAntesAgora, audio: audioAntesAgora,
      ajuda: [["piao", "Olhe o brinquedo."], ["iVovo", "Clique na caixa: No tempo da vovó, Hoje ou Nos dois."], ["iconeMouse", "Você também pode arrastar o brinquedo até a caixa."]] },
    { id: "povos", ano: 1, nome: "Brinquedos de muitos povos", desenho: "abayomi", iniciar: atvPovos, audio: audioPovos,
      ajuda: [["abayomi", "Olhe o brinquedo e leia a pergunta."], ["iconeMouse", "Clique na resposta."], ["iconeOlho", "Descubra de onde vem cada brinquedo."]] },
    { id: "caixas", ano: 1, nome: "Caixas de brinquedos", desenho: "caixaTodos", iniciar: atvCaixas, audio: audioCaixas,
      ajuda: [["caixaTodos", "Coloque cada brinquedo na caixa certa."], ["iconeMouse", "Clique na caixa ou arraste o brinquedo."], ["iTodos", "No fim, pense: de quem é cada brinquedo?"]] },
    { id: "regras", ano: 2, nome: "Aprender as regras", desenho: "giz", iniciar: atvRegras, audio: audioRegras,
      ajuda: [["giz", "Clique num grupo de crianças."], ["iconeOlho", "Leia as regras da brincadeira."], ["iconeCheck", "Responda a pergunta. Visite todos os grupos!"]] },
    { id: "amarelinha", ano: 2, nome: "Amarelinha digital", desenho: "pedrinha", iniciar: atvAmarelinha, audio: audioAmarelinha,
      ajuda: [["pedrinha", "Jogue a pedrinha numa casa."], ["iconeSetaCima", "Pule uma casa de cada vez (seta para cima)."], ["iconeSetaDupla", "Pule por cima da casa da pedrinha (seta para a direita)."], ["iconeMao", "Na volta, pegue a pedrinha (seta para baixo)."]] },
    { id: "jokenpo", ano: 2, nome: "Jokenpô", desenho: "maos", iniciar: atvJokenpo, audio: audioJokenpo,
      ajuda: [["maos", "Escolha pedra, papel ou tesoura."], ["iconeOlho", "Veja a mão do computador."], ["iconeCheck", "Diga quem ganhou."]] },
    { id: "quebraCabeca", ano: 2, nome: "Quebra-cabeça das regras", desenho: "quebraCabeca", iniciar: atvQuebraCabeca, audio: audioQuebraCabeca,
      ajuda: [["quebraCabeca", "Clique nas figuras na ordem certa: 1, 2, 3 e 4."], ["iconeLampada", "Se errar, pense: o que vem antes?"]] },
    { id: "familia", ano: 2, nome: "Brincadeira da minha família", desenho: "iconeLapis", iniciar: atvFamilia, audio: audioFamilia,
      ajuda: [["iconeLapis", "Escolha uma cor e desenhe: clique e arraste o mouse."], ["iconeBorracha", "Use a borracha ou o Desfazer para corrigir."], ["iconeSalvar", "Escolha o nome da brincadeira e guarde no baú."]],
      ajudaCalma: [["iconeLapis", "Escolha uma cor e desenhe: clique e arraste o mouse."], ["iconeDesfazer", "Para apagar o último risco, aperte Desfazer."], ["iconeSalvar", "Escolha o nome da brincadeira e guarde no baú."]] },
    { id: "mapa", ano: 3, nome: "Mapa da cidade", desenho: "mapa", iniciar: atvMapa, audio: audioMapa,
      ajuda: [["iconeMapa", "Clique num lugar do mapa."], ["iconeOlho", "Compare as figuras: Antes e Hoje."], ["iconeCheck", "Marque o que mudou e o que continuou."]] },
    { id: "acessibilidade", ano: 3, nome: "Detetive da acessibilidade", desenho: "lupa", iniciar: atvAcessibilidade, audio: audioAcessibilidade,
      ajuda: [["lupa", "Procure o que impede uma criança com deficiência de brincar."], ["iconeMouse", "Clique nessa parte da praça."], ["iconeCheck", "Escolha a melhor melhoria e veja a praça mudar."]] },
    { id: "culturas", ano: 3, nome: "Espaços de diferentes culturas", desenho: "culturaCapoeira", iniciar: atvCulturas, audio: audioCulturas,
      ajuda: [["culturaGuarani", "Clique num lugar."], ["iconeOlho", "Leia sobre o lugar."], ["iconeCheck", "Responda a pergunta."]] }
  ];

  // ===================================================================
  // Meu baú (museu da criança)
  // ===================================================================
  function telaBau() {
    atual = { tela: "bau" };
    if (acess.audio) {
      const area = el("div", { class: "area-audio" });
      mostrar([el("h1", { texto: "Meu baú" }), area], null, "Meu baú");
      const opcoes = [];
      [1, 2, 3].forEach(function (ano) {
        ORDEM_BAU[ano].forEach(function (id) {
          if (estado.bau.indexOf(id) < 0) return;
          const it = CATALOGO[id];
          opcoes.push({ texto: it.nome, desenho: it.desenho, fala: it.nome + ". " + it.texto, acao: function () { falar(it.nome + ". " + it.texto + " " + descricao(it.desenho)); } });
        });
      });
      lerDesenhos().forEach(function (d) {
        const f = "Brincadeira da minha família: " + d.nome + ". Quem ensinou: " + d.quem + "." + (d.imagem ? " Tem um desenho." : "");
        opcoes.push({ texto: d.nome + " (família)", fala: f, acao: function () { falar(f); } });
      });
      if (!opcoes.length) opcoes.push({ texto: "Voltar às viagens", acao: telaViagens });
      menuAudio(area, {
        fala: opcoes.length && estado.bau.length + lerDesenhos().length ? "Meu baú, o seu museu. Você tem " + (estado.bau.length + lerDesenhos().length) + " objetos. Use as setas para ouvir cada um. Esc volta." : C.mensagens.bauVazio,
        voltar: telaViagens, ajuda: AC.ajuda.bau, opcoes: opcoes
      });
      return;
    }
    const corpo = [];
    const total = Object.keys(CATALOGO).length;
    corpo.push(el("div", { class: "bau-topo" }, [
      el("span", { class: "figura", html: DESENHOS.desenhar("bauAberto") }),
      el("div", {}, [el("h1", { texto: "Meu baú" }), el("p", { class: "instrucao", style: "text-align:left", texto: "O seu museu: " + estado.bau.length + " de " + total + " objetos. Clique num objeto para ler sobre ele." })])
    ]));
    if (!estado.bau.length) corpo.push(el("p", { class: "quem", texto: C.mensagens.bauVazio }));
    [1, 2, 3].forEach(function (ano) {
      const a = C.anos[ano];
      const prat = el("div", { class: "prateleira" });
      ORDEM_BAU[ano].forEach(function (id) {
        const it = CATALOGO[id];
        if (estado.bau.indexOf(id) >= 0) {
          prat.append(el("button", { type: "button", class: "objeto", onclick: function () { verObjeto(it); } }, [figura(it.desenho), el("span", { texto: it.nome })]));
        } else {
          prat.append(el("div", { class: "objeto vazio", "aria-label": "Objeto ainda não encontrado" }, [el("span", { class: "interrogacao", "aria-hidden": "true", texto: "?" }), el("span", { texto: "Ainda não encontrado" })]));
        }
      });
      corpo.push(el("section", { class: "secao-bau cor-" + a.cor }, [el("h2", { texto: a.subtitulo + " – " + a.titulo }), prat]));
    });
    const desenhos = lerDesenhos();
    const pratD = el("div", { class: "prateleira" });
    if (!desenhos.length) pratD.append(el("p", { texto: "Nenhum desenho ainda. Faça um na atividade \"Brincadeira da minha família\" (2º ano)." }));
    desenhos.slice().reverse().forEach(function (d) {
      pratD.append(el("button", { type: "button", class: "objeto", onclick: function () { verDesenho(d); } }, [d.imagem ? el("img", { src: d.imagem, alt: "" }) : figura("mPapel"), el("span", { texto: d.nome }), d.autor ? el("span", { class: "texto-pequeno", texto: d.autor }) : null]));
    });
    corpo.push(el("section", { class: "secao-bau cor-roxo" }, [el("h2", { texto: "Brincadeiras da minha família (desenhos)" }), pratD]));
    mostrar(corpo, null, "Meu baú");
  }
  function verObjeto(it) {
    abrirJanela(it.nome, "iconeBau", [figura(it.desenho, "figura-media" + (it.desenho.indexOf("Hoje") > 0 || it.desenho.indexOf("cultura") === 0 ? " figura-larga" : "")), el("p", { class: "instrucao", style: "font-weight:normal", texto: it.texto })],
      [botao("Fechar", "iconeCheck", fecharJanela, "botao-principal")]);
  }
  function verDesenho(d) {
    abrirJanela(d.nome, "iconeLapis", [
      d.imagem ? el("img", { class: "desenho-salvo", src: d.imagem, alt: "Desenho: " + d.nome }) : el("p", { class: "centro", texto: "Brincadeira escolhida sem desenho." }),
      el("p", { class: "instrucao", texto: "Quem ensinou: " + d.quem }),
      el("p", { class: "centro", texto: (d.autor ? "Desenho de " + d.autor + ". " : "") + "Feito em " + d.data + "." })
    ], [botao("Fechar", "iconeCheck", fecharJanela, "botao-principal")]);
  }

  // ===================================================================
  // Como jogar, Pausa e Área do professor
  // ===================================================================
  function listaAjuda(itens) {
    const ul = el("ul", { class: "ajuda-lista" });
    itens.forEach(function (x) { ul.append(el("li", {}, [figura(x[0]), el("span", { texto: x[1] })])); });
    return ul;
  }
  function abrirAjuda() {
    const corpo = [];
    if (atual.tela === "atividade" && atual.atividade) {
      corpo.push(el("h3", { texto: atual.atividade.nome }), listaAjuda((acess.calmo && atual.atividade.ajudaCalma) || atual.atividade.ajuda), el("h3", { style: "margin-top:1rem", texto: "Em todo o jogo" }));
    }
    corpo.push(listaAjuda(AJUDA_GERAL));
    abrirJanela("Como jogar", "iconeAjuda", corpo, [botao("Entendi!", "iconeCheck", fecharJanela, "botao-principal")]);
  }
  function abrirPausa() {
    pararFala();
    abrirJanela("Jogo pausado", "iconePausa", [
      el("span", { class: "pausa-icone", html: DESENHOS.desenhar("iconePausa") }),
      el("p", { class: "instrucao", texto: acess.calmo ? "Pausa. Você pode descansar o tempo que quiser. Quando quiser voltar, aperte Continuar." : "Descanse um pouco. Quando quiser, clique em Continuar." })
    ], [botao("Continuar", "iconePlay", fecharJanela, "botao-principal")]);
    if (acess.calmo) fundoJanela.classList.add("tranquila");
  }

  function abrirProfessor() {
    const a = 5 + Math.floor(Math.random() * 5), b = 3 + Math.floor(Math.random() * 7);
    const campo = el("input", { type: "text", inputmode: "numeric", maxlength: "3", autocomplete: "off", "aria-label": "Resultado da soma" });
    const aviso = el("p", { class: "centro", "aria-live": "polite" });
    function conferir() {
      if (parseInt(campo.value, 10) === a + b) painelProfessor();
      else { aviso.textContent = "Resposta errada. Tente de novo."; campo.value = ""; campo.focus(); }
    }
    campo.addEventListener("keydown", function (e) { if (e.key === "Enter") conferir(); });
    abrirJanela("Área do professor", "iconeEngrenagem", [
      el("p", { texto: "Para entrar, responda:" }),
      el("p", { class: "conta" }, [el("span", { texto: "Quanto é " + a + " + " + b + "? " }), campo]),
      aviso
    ], [botao("Entrar", "iconeCheck", conferir, "botao-principal"), botao("Cancelar", "iconeVoltar", fecharJanela)]);
  }
  function painelProfessor() {
    const qtd = lerDesenhos().length;
    abrirJanela("Área do professor", "iconeEngrenagem", [
      el("p", { class: "quem", texto: estado.liberado ? "Situação: todas as fases estão liberadas." : "Situação: as atividades abrem em ordem (cada uma abre quando a anterior termina)." }),
      el("p", { texto: "O progresso (estrelas e baú) e os " + qtd + " desenhos ficam guardados só neste navegador, neste computador. Nada é enviado para a internet." }),
      el("p", { class: "texto-pequeno", texto: "Para conferir as informações históricas e culturais do jogo, veja o arquivo REVISAR.md. Para mudar os textos, edite o arquivo js/conteudo.js." })
    ], [
      estado.liberado
        ? botao("Voltar a abrir em ordem", "iconeCadeado", function () { estado.liberado = false; salvar(); fecharJanela(); recarregarTela(); })
        : botao("Liberar todas as fases", "iconeCheck", function () { estado.liberado = true; salvar(); fecharJanela(); recarregarTela(); mostrarRetorno("bom", "Todas as fases foram liberadas."); }, "botao-principal"),
      botao("Acessibilidade", "iconeAcessibilidade", abrirAcessibilidade),
      botao("Apagar progresso", "iconeLixeira", confirmarApagar, "botao-perigo"),
      botao("Fechar", "iconeVoltar", fecharJanela)
    ]);
  }
  function confirmarApagar() {
    const qtd = lerDesenhos().length;
    abrirJanela("Apagar progresso?", "iconeLixeira", [
      el("p", { class: "instrucao", texto: "Tem certeza? Isto apaga as estrelas, os objetos do baú e os " + qtd + " desenhos deste computador. As escolhas de acessibilidade continuam guardadas." }),
      el("p", { class: "centro", texto: "Não dá para desfazer." })
    ], [
      botao("Não, voltar", "iconeVoltar", painelProfessor, "botao-principal"),
      botao("Sim, apagar tudo", "iconeLixeira", function () {
        try { localStorage.removeItem(CHAVE); localStorage.removeItem(CHAVE_DESENHOS); } catch (e) { /* sem acesso */ }
        estado = estadoVazio();
        fecharJanela();
        telaAbertura();
        mostrarRetorno("bom", "O progresso deste computador foi apagado.");
      }, "botao-perigo")
    ]);
  }
  function recarregarTela() {
    if (atual.tela === "abertura") telaAbertura();
    else if (atual.tela === "historia") telaHistoria(0);
    else if (atual.tela === "atividade" && atual.atividade) abrirAtividade(atual.atividade);
    else if (atual.tela === "ano") telaAno(atual.ano);
    else if (atual.tela === "viagens") telaViagens();
    else if (atual.tela === "bau") telaBau();
  }

  // ===================================================================
  // Começo
  // ===================================================================
  somLigado = acess.audio;
  aplicarAcess();
  atualizarBotaoSom();
  telaAbertura();
})();
