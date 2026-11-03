/*
  O BAÚ DO TEMPO — ILUSTRAÇÕES
  ============================
  Todas as ilustrações do jogo são desenhadas aqui, com formas simples (SVG).
  Não há fotos nem imagens copiadas da internet.
  Para usar uma ilustração no conteudo.js, escreva o nome dela (por exemplo, "peteca").
*/
const DESENHOS = (function () {
  const R = {};                       // registro: nome -> { vb, f }
  const L = 'stroke="#3b2a1a" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
  const LF = 'stroke="#3b2a1a" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"';

  function def(nome, vb, f) { R[nome] = { vb: vb, f: f }; }

  // ---------- Pessoas ----------
  const PESSOAS = [
    { pele: "#c68642", cabelo: "#2b1a10", estilo: "curto",    roupa: "#2563eb", baixo: "#1e3a8a" },
    { pele: "#f1c27d", cabelo: "#6b3e1f", estilo: "trancas",  roupa: "#e11d48", baixo: "#be185d", saia: true },
    { pele: "#8d5524", cabelo: "#1b120c", estilo: "black",    roupa: "#f59e0b", baixo: "#78350f" },
    { pele: "#5c3a21", cabelo: "#120b07", estilo: "coque",    roupa: "#16a34a", baixo: "#166534", saia: true },
    { pele: "#ffdbac", cabelo: "#c08b1e", estilo: "liso",     roupa: "#9333ea", baixo: "#4c1d95" },
    { pele: "#e0ac69", cabelo: "#2b1a10", estilo: "liso",     roupa: "#0ea5e9", baixo: "#0c4a6e", saia: true },
    { pele: "#a0662f", cabelo: "#1b120c", estilo: "curto",    roupa: "#dc2626", baixo: "#1f2937" },
    { pele: "#f3d3b0", cabelo: "#111111", estilo: "franja",   roupa: "#f97316", baixo: "#1e3a8a" },
    { pele: "#b5713c", cabelo: "#111111", estilo: "franja",   roupa: "#0d9488", baixo: "#1f2937" },
    { pele: "#a86b3c", cabelo: "#111111", estilo: "curto",    roupa: "#15803d", baixo: "#78350f" },
    { pele: "#b97a44", cabelo: "#111111", estilo: "liso",     roupa: "#ca8a04", baixo: "#7c2d12", saia: true },
    { pele: "#4a2c17", cabelo: "#0b0705", estilo: "black",    roupa: "#7c3aed", baixo: "#312e81" },
    { pele: "#f1c27d", cabelo: "#9ca3af", estilo: "curto",    roupa: "#64748b", baixo: "#334155", adulto: true },
    { pele: "#e8b98a", cabelo: "#d1d5db", estilo: "coque",    roupa: "#a855f7", baixo: "#6b21a8", saia: true, adulto: true, oculos: true }
  ];

  function cabeloAtras(p) {
    const c = p.cabelo;
    if (p.estilo === "black") return `<circle cx="0" cy="-50" r="14" fill="${c}" ${LF}/>`;
    if (p.estilo === "liso") return `<path d="M-11 -52 L-12 -34 L12 -34 L11 -52 Z" fill="${c}" ${LF}/>`;
    if (p.estilo === "trancas") return `<path d="M-10 -46 L-13 -30 M10 -46 L13 -30" stroke="${c}" stroke-width="5" stroke-linecap="round"/>` +
      `<circle cx="-13" cy="-29" r="2.5" fill="#facc15"/><circle cx="13" cy="-29" r="2.5" fill="#facc15"/>`;
    return "";
  }
  function cabeloFrente(p) {
    const c = p.cabelo;
    if (p.estilo === "black") return "";
    if (p.estilo === "coque") return `<circle cx="0" cy="-62" r="5" fill="${c}" ${LF}/><path d="M-10 -50 Q-10 -60 0 -60 Q10 -60 10 -50 Q0 -55 -10 -50Z" fill="${c}" ${LF}/>`;
    if (p.estilo === "franja") return `<path d="M-10.5 -47 Q-11 -61 0 -61 Q11 -61 10.5 -47 L7 -51 L3 -48 L-1 -51 L-5 -48 L-8 -51 Z" fill="${c}" ${LF}/>`;
    return `<path d="M-10 -49 Q-11 -61 0 -61 Q11 -61 10 -49 Q6 -55 0 -54 Q-6 -55 -10 -49Z" fill="${c}" ${LF}/>`;
  }
  // Uma pessoa com os pés em (x, y). pose: "normal", "acima", "aberto", "pe" (num pé só)
  function pessoa(x, y, s, i, pose, extra) {
    const p = PESSOAS[i % PESSOAS.length];
    const op = extra || {};
    const roupa = op.roupa || p.roupa;
    const baixo = op.baixo || p.baixo;
    const saia = op.saia !== undefined ? op.saia : p.saia;
    let bracos;
    if (pose === "acima") bracos = `<path d="M-9 -36 L-17 -50 M9 -36 L17 -50" stroke="${p.pele}" stroke-width="5" stroke-linecap="round"/>`;
    else if (pose === "aberto") bracos = `<path d="M-9 -36 L-20 -32 M9 -36 L20 -32" stroke="${p.pele}" stroke-width="5" stroke-linecap="round"/>`;
    else bracos = `<path d="M-9 -36 L-14 -22 M9 -36 L14 -22" stroke="${p.pele}" stroke-width="5" stroke-linecap="round"/>`;
    let pernas;
    if (pose === "pe") pernas = `<path d="M-4 -18 L-4 0 M4 -18 L10 -9" stroke="${p.pele}" stroke-width="5" stroke-linecap="round"/>`;
    else pernas = `<path d="M-4 -18 L-5 0 M4 -18 L5 0" stroke="${p.pele}" stroke-width="5" stroke-linecap="round"/>`;
    let corpo;
    if (op.longo) corpo = `<path d="M-9 -38 Q0 -42 9 -38 L15 -2 L-15 -2 Z" fill="${roupa}" ${LF}/>`;
    else if (saia) corpo = `<path d="M-9 -38 Q0 -42 9 -38 L10 -28 L14 -14 L-14 -14 L-10 -28 Z" fill="${roupa}" ${LF}/>`;
    else corpo = `<path d="M-9 -38 Q0 -42 9 -38 L10 -20 L-10 -20 Z" fill="${roupa}" ${LF}/><path d="M-10 -21 L10 -21 L9 -12 L-9 -12 Z" fill="${baixo}" ${LF}/>`;
    const oculos = (op.oculos || p.oculos) ? `<circle cx="-4" cy="-48" r="3" fill="none" stroke="#222" stroke-width="1.2"/><circle cx="4" cy="-48" r="3" fill="none" stroke="#222" stroke-width="1.2"/><path d="M-1 -48 L1 -48" stroke="#222" stroke-width="1.2"/>` : "";
    const chapeu = op.chapeu ? `<path d="M-15 -57 L15 -57 L10 -60 Q10 -68 0 -68 Q-10 -68 -10 -60 Z" fill="${op.chapeu}" ${LF}/>` : "";
    const sc = (p.adulto ? 1.2 : 1) * s;
    return `<g transform="translate(${x} ${y}) scale(${sc})">` +
      pernas + `<ellipse cx="-5" cy="0" rx="4" ry="2" fill="#3b2a1a"/><ellipse cx="${pose === "pe" ? 10 : 5}" cy="${pose === "pe" ? -9 : 0}" rx="4" ry="2" fill="#3b2a1a"/>` +
      bracos + corpo + cabeloAtras(p) +
      `<circle cx="0" cy="-48" r="10.5" fill="${p.pele}" ${LF}/>` + cabeloFrente(p) +
      `<circle cx="-3.6" cy="-47.5" r="1.4" fill="#1f1f1f"/><circle cx="3.6" cy="-47.5" r="1.4" fill="#1f1f1f"/>` +
      `<path d="M-3.5 -43 Q0 -40 3.5 -43" fill="none" stroke="#1f1f1f" stroke-width="1.3" stroke-linecap="round"/>` +
      oculos + chapeu + `</g>`;
  }

  // ---------- Peças de cenário ----------
  function arvore(x, y, s, cor) {
    return `<g transform="translate(${x} ${y}) scale(${s || 1})"><rect x="-5" y="-30" width="10" height="30" fill="#8b5a2b" ${LF}/>` +
      `<circle cx="0" cy="-44" r="20" fill="${cor || "#22a447"}" ${LF}/><circle cx="-14" cy="-34" r="12" fill="${cor || "#22a447"}" ${LF}/><circle cx="14" cy="-34" r="12" fill="${cor || "#22a447"}" ${LF}/></g>`;
  }
  function eucalipto(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s || 1})"><rect x="-3" y="-70" width="6" height="70" fill="#c2b59b" ${LF}/>` +
      `<ellipse cx="0" cy="-74" rx="12" ry="22" fill="#4d8b5a" ${LF}/></g>`;
  }
  function nuvem(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s || 1})" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"><ellipse cx="0" cy="0" rx="22" ry="10"/><circle cx="-8" cy="-6" r="9"/><circle cx="8" cy="-8" r="11"/></g>`;
  }
  function sol(x, y, r) {
    let raios = "";
    for (let a = 0; a < 360; a += 45) {
      const rad = a * Math.PI / 180;
      raios += `<line x1="${x + Math.cos(rad) * (r + 4)}" y1="${y + Math.sin(rad) * (r + 4)}" x2="${x + Math.cos(rad) * (r + 11)}" y2="${y + Math.sin(rad) * (r + 11)}" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>`;
    }
    return raios + `<circle cx="${x}" cy="${y}" r="${r}" fill="#fcd34d" stroke="#f59e0b" stroke-width="2"/>`;
  }
  function predio(x, y, w, h, cor) {
    let jan = "";
    for (let yy = y + 8; yy < y + h - 10; yy += 14) for (let xx = x + 6; xx < x + w - 8; xx += 12) jan += `<rect x="${xx}" y="${yy}" width="6" height="8" fill="#fef9c3" stroke="#3b2a1a" stroke-width="1"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cor}" ${LF}/>` + jan;
  }
  function casinha(x, y, cor, telhado) {
    return `<rect x="${x}" y="${y}" width="34" height="26" fill="${cor}" ${LF}/><path d="M${x - 4} ${y} L${x + 17} ${y - 16} L${x + 38} ${y} Z" fill="${telhado || "#b45309"}" ${LF}/>` +
      `<rect x="${x + 13}" y="${y + 10}" width="9" height="16" fill="#7c4a1e" ${LF}/>`;
  }
  function casarao(x, y, cor) {
    return `<rect x="${x}" y="${y}" width="70" height="46" fill="${cor}" ${LF}/><path d="M${x - 6} ${y} L${x + 35} ${y - 20} L${x + 76} ${y} Z" fill="#9a3412" ${LF}/>` +
      `<rect x="${x + 8}" y="${y + 8}" width="10" height="14" fill="#fef3c7" ${LF}/><rect x="${x + 52}" y="${y + 8}" width="10" height="14" fill="#fef3c7" ${LF}/>` +
      `<rect x="${x + 30}" y="${y + 24}" width="12" height="22" fill="#7c4a1e" ${LF}/><rect x="${x + 30}" y="${y + 6}" width="12" height="12" fill="#fef3c7" ${LF}/>`;
  }
  function carro(x, y, cor, s) {
    return `<g transform="translate(${x} ${y}) scale(${s || 1})"><path d="M-22 0 L-22 -10 L-12 -12 L-6 -20 L10 -20 L16 -12 L22 -10 L22 0 Z" fill="${cor}" ${LF}/>` +
      `<path d="M-4 -18 L8 -18 L12 -12 L-8 -12 Z" fill="#bae6fd" stroke="#3b2a1a" stroke-width="1"/>` +
      `<circle cx="-12" cy="0" r="5" fill="#1f2937"/><circle cx="12" cy="0" r="5" fill="#1f2937"/></g>`;
  }
  function banco(x, y) {
    return `<rect x="${x}" y="${y}" width="40" height="6" fill="#a16207" ${LF}/><rect x="${x}" y="${y - 14}" width="40" height="5" fill="#a16207" ${LF}/>` +
      `<path d="M${x + 4} ${y + 6} L${x + 4} ${y + 16} M${x + 36} ${y + 6} L${x + 36} ${y + 16}" ${L}/>`;
  }
  function flores(x, y) {
    let f = "";
    [[0, 0, "#ef4444"], [12, -4, "#facc15"], [24, 0, "#ec4899"], [6, 6, "#a855f7"], [18, 6, "#f97316"]].forEach(function (c) {
      f += `<line x1="${x + c[0]}" y1="${y + c[1]}" x2="${x + c[0]}" y2="${y + 14}" stroke="#15803d" stroke-width="2"/><circle cx="${x + c[0]}" cy="${y + c[1]}" r="4.5" fill="${c[2]}" stroke="#3b2a1a" stroke-width="1"/>`;
    });
    return f;
  }
  function ceu(cor) { return `<rect x="0" y="0" width="400" height="250" fill="${cor || "#bfe6ff"}"/>`; }
  function chao(y, cor) { return `<rect x="0" y="${y}" width="400" height="${250 - y}" fill="${cor || "#86d07a"}"/>`; }

  // Mão simples (para os passos e o jokenpô)
  function mao(x, y, s, rot, cor) {
    return `<g transform="translate(${x} ${y}) rotate(${rot || 0}) scale(${s || 1})"><path d="M-10 12 L-10 -4 Q-10 -12 -2 -12 L6 -12 Q12 -12 12 -4 L12 12 Z" fill="${cor || "#e0ac69"}" ${LF}/>` +
      `<ellipse cx="-12" cy="0" rx="4" ry="7" transform="rotate(-25 -12 0)" fill="${cor || "#e0ac69"}" ${LF}/><path d="M-4 -12 L-4 -4 M2 -12 L2 -4 M8 -12 L8 -4" stroke="#3b2a1a" stroke-width="1.2"/></g>`;
  }

  // Desenho da amarelinha (pequena), para os passos
  function amarelinhaMini(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="#ffffff" stroke="#475569" stroke-width="2">` +
      `<rect x="-10" y="40" width="20" height="16"/><rect x="-10" y="24" width="20" height="16"/><rect x="-20" y="8" width="20" height="16"/><rect x="0" y="8" width="20" height="16"/>` +
      `<rect x="-10" y="-8" width="20" height="16"/><path d="M-14 -8 Q0 -26 14 -8 Z"/></g>`;
  }

  // ======================= ÍCONES DA INTERFACE (24x24) =======================
  const I = 'fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
  def("iconeCasa", "0 0 24 24", () => `<path d="M3 11 L12 3 L21 11" ${I}/><path d="M5 10 L5 21 L19 21 L19 10" ${I}/><rect x="10" y="14" width="4" height="7" ${I}/>`);
  def("iconeBau", "0 0 24 24", () => `<path d="M3 10 Q3 4 12 4 Q21 4 21 10 Z" ${I}/><rect x="3" y="10" width="18" height="10" ${I}/><rect x="10" y="9" width="4" height="5" ${I}/>`);
  def("iconeAjuda", "0 0 24 24", () => `<circle cx="12" cy="12" r="9.5" ${I}/><path d="M9.2 9.2 Q9.5 6.5 12 6.5 Q14.8 6.5 14.8 9.2 Q14.8 11 12.6 12 Q12 12.4 12 14" ${I}/><circle cx="12" cy="17.5" r="1.3" fill="currentColor"/>`);
  def("iconePausa", "0 0 24 24", () => `<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>`);
  def("iconePlay", "0 0 24 24", () => `<path d="M7 4 L19 12 L7 20 Z" fill="currentColor"/>`);
  def("iconeSomOn", "0 0 24 24", () => `<path d="M3 9 L7 9 L12 5 L12 19 L7 15 L3 15 Z" fill="currentColor"/><path d="M15.5 9 Q17.5 12 15.5 15 M18 6.5 Q22 12 18 17.5" ${I}/>`);
  def("iconeSomOff", "0 0 24 24", () => `<path d="M3 9 L7 9 L12 5 L12 19 L7 15 L3 15 Z" fill="currentColor"/><path d="M16 9 L22 15 M22 9 L16 15" ${I}/>`);
  def("iconeEstrela", "0 0 24 24", () => `<path d="M12 2.5 L14.8 8.6 L21.5 9.3 L16.5 13.8 L17.9 20.5 L12 17.1 L6.1 20.5 L7.5 13.8 L2.5 9.3 L9.2 8.6 Z" fill="#facc15" stroke="#a16207" stroke-width="1.5" stroke-linejoin="round"/>`);
  def("iconeEstrelaVazia", "0 0 24 24", () => `<path d="M12 2.5 L14.8 8.6 L21.5 9.3 L16.5 13.8 L17.9 20.5 L12 17.1 L6.1 20.5 L7.5 13.8 L2.5 9.3 L9.2 8.6 Z" fill="#e5e7eb" stroke="#6b7280" stroke-width="1.5" stroke-linejoin="round"/>`);
  def("iconeCadeado", "0 0 24 24", () => `<rect x="5" y="10" width="14" height="11" rx="2" ${I}/><path d="M8 10 L8 7 Q8 3 12 3 Q16 3 16 7 L16 10" ${I}/>`);
  def("iconeVoltar", "0 0 24 24", () => `<path d="M10 5 L3 12 L10 19 M3 12 L21 12" ${I}/>`);
  def("iconeAvancar", "0 0 24 24", () => `<path d="M14 5 L21 12 L14 19 M21 12 L3 12" ${I}/>`);
  def("iconeCheck", "0 0 24 24", () => `<path d="M4 12.5 L9.5 18 L20 6" ${I}/>`);
  def("iconeLampada", "0 0 24 24", () => `<path d="M8 15 Q5 12.5 5 9 Q5 3 12 3 Q19 3 19 9 Q19 12.5 16 15 L16 18 L8 18 Z" ${I}/><path d="M9 21 L15 21" ${I}/>`);
  def("iconeEngrenagem", "0 0 24 24", () => `<circle cx="12" cy="12" r="3.5" ${I}/><path d="M12 2.5 L12 5.5 M12 18.5 L12 21.5 M2.5 12 L5.5 12 M18.5 12 L21.5 12 M5.3 5.3 L7.4 7.4 M16.6 16.6 L18.7 18.7 M5.3 18.7 L7.4 16.6 M16.6 7.4 L18.7 5.3" ${I}/>`);
  def("iconeLixeira", "0 0 24 24", () => `<path d="M4 6 L20 6 M9 6 L9 3 L15 3 L15 6 M6 6 L7 21 L17 21 L18 6" ${I}/>`);
  def("iconeLapis", "0 0 24 24", () => `<path d="M4 20 L5 15 L16 4 L20 8 L9 19 Z M14 6 L18 10" ${I}/>`);
  def("iconeBorracha", "0 0 24 24", () => `<path d="M3 15 L12 6 L19 13 L12 20 L7 20 Z M8 11 L15 18" ${I}/>`);
  def("iconeDesfazer", "0 0 24 24", () => `<path d="M9 5 L4 10 L9 15" ${I}/><path d="M4 10 L14 10 Q20 10 20 15 Q20 20 14 20 L10 20" ${I}/>`);
  def("iconeSalvar", "0 0 24 24", () => `<path d="M4 4 L17 4 L20 7 L20 20 L4 20 Z" ${I}/><rect x="8" y="4" width="8" height="5" ${I}/><rect x="7" y="13" width="10" height="7" ${I}/>`);
  def("iconeMouse", "0 0 24 24", () => `<rect x="6" y="3" width="12" height="18" rx="6" ${I}/><path d="M12 3 L12 10 M6 10 L18 10" ${I}/><path d="M6.6 9 Q7 4 12 3.5 L12 10 L6.5 10 Z" fill="#facc15" stroke="none"/>`);
  def("iconeTeclado", "0 0 24 24", () => `<rect x="2" y="6" width="20" height="12" rx="2" ${I}/><path d="M6 10 L6 10.1 M10 10 L10 10.1 M14 10 L14 10.1 M18 10 L18 10.1 M7 14 L17 14" ${I}/>`);
  def("iconeMapa", "0 0 24 24", () => `<path d="M3 6 L9 3 L15 6 L21 3 L21 18 L15 21 L9 18 L3 21 Z M9 3 L9 18 M15 6 L15 21" ${I}/>`);
  def("iconeOlho", "0 0 24 24", () => `<path d="M2 12 Q12 3 22 12 Q12 21 2 12 Z" ${I}/><circle cx="12" cy="12" r="3" fill="currentColor"/>`);
  def("iconeSetaCima", "0 0 24 24", () => `<path d="M12 20 L12 4 M5 11 L12 4 L19 11" ${I}/>`);
  def("iconeSetaDupla", "0 0 24 24", () => `<path d="M12 22 L12 4 M6 10 L12 4 L18 10 M6 16 L12 10 L18 16" ${I}/>`);
  def("iconeMao", "0 0 24 24", () => `<path d="M7 13 L7 6 Q7 4.5 8.5 4.5 Q10 4.5 10 6 L10 11 L10 4 Q10 2.5 11.5 2.5 Q13 2.5 13 4 L13 11 L13 5 Q13 3.5 14.5 3.5 Q16 3.5 16 5 L16 12 L16 8 Q16 6.5 17.5 6.5 Q19 6.5 19 8 L19 15 Q19 21 13 21 Q9 21 7 18 L4 13 Q3.5 11.5 5 11.5 Q6 11.5 7 13" ${I}/>`);

  // ======================= MATERIAIS (100x100) =======================
  def("mMadeira", "0 0 100 100", () => `<rect x="12" y="34" width="70" height="34" rx="6" fill="#b7793f" ${L}/><ellipse cx="82" cy="51" rx="9" ry="17" fill="#e3b57a" ${L}/>` +
    `<ellipse cx="82" cy="51" rx="4" ry="8" fill="none" stroke="#8b5a2b" stroke-width="2"/><path d="M20 44 Q40 40 60 45 M22 58 Q44 54 70 59" fill="none" stroke="#7a4a20" stroke-width="2"/>`);
  def("mPano", "0 0 100 100", () => `<path d="M14 30 L86 30 L86 74 Q50 84 14 74 Z" fill="#f472b6" ${L}/>` +
    `<path d="M14 44 L86 44 M14 58 L86 58 M32 30 L32 78 M50 30 L50 80 M68 30 L68 78" stroke="#be185d" stroke-width="2.5" opacity=".7"/>`);
  def("mPalha", "0 0 100 100", () => {
    let s = ""; for (let i = 0; i < 9; i++) s += `<path d="M${30 + i * 5} 88 Q${36 + i * 4} 50 ${26 + i * 6} 12" fill="none" stroke="#d4a017" stroke-width="5" stroke-linecap="round"/>`;
    return s + `<rect x="30" y="52" width="44" height="9" rx="3" fill="#b45309" ${LF}/>`;
  });
  def("mSabugo", "0 0 100 100", () => {
    let s = `<ellipse cx="50" cy="50" rx="18" ry="40" fill="#e8c77d" ${L}/>`;
    for (let y = 20; y <= 80; y += 9) for (let x = -10; x <= 10; x += 7) s += `<circle cx="${50 + x}" cy="${y}" r="2.2" fill="#b98b2e"/>`;
    return s;
  });
  def("mLata", "0 0 100 100", () => `<rect x="28" y="20" width="44" height="62" fill="#cbd5e1" ${L}/><ellipse cx="50" cy="20" rx="22" ry="7" fill="#e2e8f0" ${L}/>` +
    `<ellipse cx="50" cy="82" rx="22" ry="7" fill="#94a3b8" ${L}/><rect x="28" y="40" width="44" height="18" fill="#ef4444" stroke="#3b2a1a" stroke-width="1.5"/>`);
  def("mPapel", "0 0 100 100", () => `<path d="M22 12 L64 12 L80 28 L80 88 L22 88 Z" fill="#ffffff" ${L}/><path d="M64 12 L64 28 L80 28" fill="#e5e7eb" ${L}/>` +
    `<path d="M32 44 L70 44 M32 56 L70 56 M32 68 L58 68" stroke="#93c5fd" stroke-width="3"/>`);
  def("mPlastico", "0 0 100 100", () => `<rect x="42" y="8" width="16" height="10" rx="2" fill="#2563eb" ${L}/><path d="M42 18 L58 18 L58 26 Q72 32 72 46 L72 86 Q72 92 66 92 L34 92 Q28 92 28 86 L28 46 Q28 32 42 26 Z" fill="#bae6fd" ${L}/>` +
    `<rect x="30" y="52" width="40" height="16" fill="#38bdf8" stroke="#3b2a1a" stroke-width="1.5"/>`);
  def("mPenas", "0 0 100 100", () => `<path d="M30 90 Q40 60 70 14" fill="none" ${L}/><path d="M68 14 Q86 30 72 52 Q58 72 38 78 Q36 56 46 38 Q56 20 68 14 Z" fill="#ef4444" ${L}/>` +
    `<path d="M50 40 L62 34 M44 54 L62 48 M40 66 L56 62" stroke="#7f1d1d" stroke-width="2"/>`);
  def("mBarbante", "0 0 100 100", () => `<circle cx="46" cy="52" r="28" fill="#d6a46b" ${L}/><path d="M24 40 Q46 30 68 44 M22 54 Q46 42 72 58 M26 68 Q48 56 70 70" fill="none" stroke="#8b5a2b" stroke-width="2.5"/>` +
    `<path d="M72 62 Q86 70 80 84 Q74 94 90 94" fill="none" stroke="#8b5a2b" stroke-width="3"/>`);

  // ======================= BRINQUEDOS (100x100) =======================
  def("peteca", "0 0 100 100", () => `<ellipse cx="36" cy="32" rx="8" ry="24" transform="rotate(-22 36 32)" fill="#ef4444" ${L}/>` +
    `<ellipse cx="64" cy="32" rx="8" ry="24" transform="rotate(22 64 32)" fill="#22c55e" ${L}/><ellipse cx="50" cy="28" rx="8" ry="26" fill="#facc15" ${L}/>` +
    `<path d="M50 6 L50 54 M38 12 L44 54 M62 12 L56 54" stroke="#3b2a1a" stroke-width="1.5"/>` +
    `<path d="M30 60 Q50 54 70 60 L66 84 Q50 96 34 84 Z" fill="#e9c46a" ${L}/><path d="M40 62 L40 88 M50 60 L50 92 M60 62 L60 88" stroke="#b7892d" stroke-width="2"/>` +
    `<rect x="32" y="56" width="36" height="8" rx="3" fill="#b45309" ${LF}/>`);
  def("bonecaPano", "0 0 100 100", () => `<circle cx="50" cy="24" r="18" fill="#b45309" ${L}/><path d="M32 26 L28 50 M68 26 L72 50" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>` +
    `<rect x="40" y="76" width="7" height="18" rx="3" fill="#f5d0a9" ${LF}/><rect x="53" y="76" width="7" height="18" rx="3" fill="#f5d0a9" ${LF}/>` +
    `<path d="M40 44 L26 62 M60 44 L74 62" stroke="#f5d0a9" stroke-width="8" stroke-linecap="round"/>` +
    `<path d="M38 40 L62 40 L74 82 L26 82 Z" fill="#ec4899" ${L}/><circle cx="42" cy="56" r="3" fill="#fff"/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="48" cy="72" r="3" fill="#fff"/><circle cx="62" cy="52" r="3" fill="#fff"/>` +
    `<rect x="58" y="68" width="10" height="9" fill="#60a5fa" stroke="#3b2a1a" stroke-width="1" stroke-dasharray="2 1.5"/>` +
    `<circle cx="50" cy="27" r="13" fill="#f5d0a9" ${L}/><path d="M43 24 L47 28 M47 24 L43 28 M53 24 L57 28 M57 24 L53 28" stroke="#1f1f1f" stroke-width="1.6"/>` +
    `<path d="M45 33 Q50 37 55 33" fill="none" stroke="#be123c" stroke-width="1.8"/>`);
  def("piao", "0 0 100 100", () => `<line x1="50" y1="86" x2="50" y2="97" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M50 90 L28 54 Q28 30 50 28 Q72 30 72 54 Z" fill="#dc2626" ${L}/><path d="M31 56 Q50 64 69 56" fill="none" stroke="#fde047" stroke-width="5"/>` +
    `<path d="M38 72 Q50 77 62 72" fill="none" stroke="#3b82f6" stroke-width="5"/><rect x="44" y="16" width="12" height="13" rx="3" fill="#92400e" ${L}/>`);
  def("carrinhoLata", "0 0 100 100", () => `<path d="M22 56 Q10 62 6 82" fill="none" stroke="#a16207" stroke-width="3"/>` +
    `<rect x="22" y="38" width="54" height="32" rx="3" fill="#cbd5e1" ${L}/><rect x="22" y="46" width="54" height="14" fill="#ef4444" stroke="#3b2a1a" stroke-width="1.5"/>` +
    `<ellipse cx="76" cy="54" rx="7" ry="16" fill="#e2e8f0" ${L}/><circle cx="34" cy="76" r="9" fill="#f59e0b" ${L}/><circle cx="34" cy="76" r="3" fill="#fff7ed"/>` +
    `<circle cx="66" cy="76" r="9" fill="#f59e0b" ${L}/><circle cx="66" cy="76" r="3" fill="#fff7ed"/>`);
  def("bilboque", "0 0 100 100", () => `<path d="M50 54 Q16 52 26 24" fill="none" stroke="#78350f" stroke-width="2.5"/>` +
    `<rect x="44" y="50" width="12" height="44" rx="5" fill="#a16207" ${L}/><path d="M32 42 Q50 66 68 42 Z" fill="#d97706" ${L}/><ellipse cx="50" cy="42" rx="18" ry="5" fill="#f59e0b" ${L}/>` +
    `<circle cx="26" cy="18" r="11" fill="#dc2626" ${L}/><circle cx="29" cy="22" r="2.5" fill="#3b2a1a"/>`);
  def("bonecaSabugo", "0 0 100 100", () => {
    let s = `<path d="M44 14 L38 4 M50 12 L50 2 M56 14 L62 4" stroke="#d4a017" stroke-width="4" stroke-linecap="round"/><rect x="38" y="12" width="24" height="70" rx="12" fill="#e8c77d" ${L}/>`;
    for (let y = 40; y <= 76; y += 8) for (let x = -6; x <= 6; x += 6) s += `<circle cx="${50 + x}" cy="${y}" r="1.8" fill="#b98b2e"/>`;
    return s + `<path d="M34 48 L66 48 L78 92 L22 92 Z" fill="#facc6b" ${L}/><path d="M40 50 L34 90 M50 50 L50 92 M60 50 L66 90" stroke="#c99b2c" stroke-width="2"/>` +
      `<circle cx="45" cy="26" r="2" fill="#3b2a1a"/><circle cx="55" cy="26" r="2" fill="#3b2a1a"/><path d="M45 33 Q50 36 55 33" fill="none" stroke="#3b2a1a" stroke-width="1.6"/>`;
  });
  def("pipa", "0 0 100 100", () => `<path d="M50 72 Q38 80 48 86 Q60 92 50 98" fill="none" stroke="#3b2a1a" stroke-width="2"/>` +
    `<path d="M44 80 L50 84 L44 88 Z M54 90 L60 94 L54 98Z" fill="#ef4444" stroke="#3b2a1a" stroke-width="1"/>` +
    `<path d="M50 4 L82 38 L50 72 L18 38 Z" fill="#3b82f6" ${L}/><path d="M50 4 L82 38 L50 38 Z M50 38 L18 38 L50 72 Z" fill="#facc15" stroke="#3b2a1a" stroke-width="1.5"/>` +
    `<path d="M50 4 L50 72 M18 38 L82 38" stroke="#7c4a1e" stroke-width="2"/>`);
  def("bola", "0 0 100 100", () => `<circle cx="50" cy="52" r="38" fill="#f97316" ${L}/><path d="M14 44 Q50 62 86 44 M50 14 Q34 52 50 90 M50 14 Q66 52 50 90" fill="none" stroke="#fff7ed" stroke-width="4"/>` +
    `<circle cx="50" cy="52" r="38" fill="none" ${L}/>`);
  def("tablet", "0 0 100 100", () => `<rect x="12" y="18" width="76" height="60" rx="8" fill="#1f2937" ${L}/><rect x="19" y="25" width="62" height="46" rx="3" fill="#7dd3fc"/>` +
    `<rect x="19" y="58" width="62" height="13" fill="#4ade80"/><rect x="30" y="46" width="10" height="12" fill="#f43f5e"/><path d="M62 34 L64 39 L69 39 L65 42 L66.5 47 L62 44 L57.5 47 L59 42 L55 39 L60 39 Z" fill="#facc15"/>` +
    `<circle cx="84.5" cy="48" r="1.8" fill="#9ca3af"/>`);
  def("celular", "0 0 100 100", () => `<rect x="30" y="8" width="40" height="84" rx="7" fill="#1f2937" ${L}/><rect x="35" y="16" width="30" height="64" rx="2" fill="#c4b5fd"/>` +
    `<circle cx="42" cy="36" r="5" fill="#f43f5e"/><circle cx="58" cy="36" r="5" fill="#22c55e"/><circle cx="42" cy="56" r="5" fill="#facc15"/><circle cx="58" cy="56" r="5" fill="#3b82f6"/><circle cx="50" cy="86" r="2.5" fill="#9ca3af"/>`);
  def("drone", "0 0 100 100", () => `<path d="M24 34 L76 66 M76 34 L24 66" ${L}/><rect x="38" y="40" width="24" height="20" rx="6" fill="#ef4444" ${L}/><circle cx="50" cy="50" r="4" fill="#1f2937"/>` +
    `<ellipse cx="22" cy="32" rx="16" ry="5" fill="#cbd5e1" ${LF}/><ellipse cx="78" cy="32" rx="16" ry="5" fill="#cbd5e1" ${LF}/><ellipse cx="22" cy="68" rx="16" ry="5" fill="#cbd5e1" ${LF}/><ellipse cx="78" cy="68" rx="16" ry="5" fill="#cbd5e1" ${LF}/>`);
  def("cavalinho", "0 0 100 100", () => `<line x1="40" y1="40" x2="78" y2="96" stroke="#a16207" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M30 52 Q20 46 22 36 L30 18 Q36 8 50 10 Q62 14 58 30 L50 46 Z" fill="#d4a373" ${L}/><path d="M44 12 Q56 4 60 20 Q62 30 56 34" fill="none" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>` +
    `<circle cx="38" cy="22" r="2.5" fill="#1f1f1f"/><ellipse cx="25" cy="40" rx="2" ry="3" fill="#3b2a1a"/><path d="M28 30 L44 40" stroke="#dc2626" stroke-width="3"/><path d="M34 10 L32 2 L40 8" fill="#d4a373" ${LF}/>`);
  def("peLata", "0 0 100 100", () => `<path d="M26 60 L22 14 L38 14 L36 60 M64 60 L62 14 L78 14 L74 60" fill="none" stroke="#a16207" stroke-width="3"/>` +
    `<rect x="16" y="58" width="30" height="34" fill="#cbd5e1" ${L}/><rect x="56" y="58" width="30" height="34" fill="#cbd5e1" ${L}/>` +
    `<rect x="16" y="68" width="30" height="10" fill="#22c55e" stroke="#3b2a1a" stroke-width="1.2"/><rect x="56" y="68" width="30" height="10" fill="#3b82f6" stroke="#3b2a1a" stroke-width="1.2"/>`);
  def("gude", "0 0 100 100", () => `<circle cx="30" cy="62" r="16" fill="#60a5fa" ${L}/><path d="M20 58 Q30 50 40 66" fill="none" stroke="#1d4ed8" stroke-width="3"/>` +
    `<circle cx="66" cy="66" r="16" fill="#4ade80" ${L}/><path d="M56 70 Q66 56 76 64" fill="none" stroke="#15803d" stroke-width="3"/>` +
    `<circle cx="48" cy="34" r="16" fill="#f472b6" ${L}/><path d="M38 34 Q48 24 58 38" fill="none" stroke="#be185d" stroke-width="3"/>` +
    `<circle cx="25" cy="56" r="3" fill="#fff"/><circle cx="61" cy="60" r="3" fill="#fff"/><circle cx="43" cy="28" r="3" fill="#fff"/>`);
  def("corda", "0 0 100 100", () => `<path d="M18 30 Q20 92 50 86 Q80 80 82 30" fill="none" stroke="#a16207" stroke-width="5" stroke-linecap="round"/>` +
    `<rect x="11" y="10" width="14" height="24" rx="5" fill="#ef4444" ${L}/><rect x="75" y="10" width="14" height="24" rx="5" fill="#3b82f6" ${L}/>`);
  def("bolaMeia", "0 0 100 100", () => `<circle cx="50" cy="52" r="36" fill="#a5b4fc" ${L}/><path d="M20 38 Q50 50 80 36 M18 60 Q50 72 82 60 M38 18 Q46 52 36 86" fill="none" stroke="#4338ca" stroke-width="3" stroke-dasharray="5 4"/>`);
  def("bambole", "0 0 100 100", () => `<ellipse cx="50" cy="52" rx="40" ry="30" fill="none" stroke="#3b2a1a" stroke-width="12"/><ellipse cx="50" cy="52" rx="40" ry="30" fill="none" stroke="#a855f7" stroke-width="8" stroke-dasharray="14 10"/>` +
    `<ellipse cx="50" cy="52" rx="40" ry="30" fill="none" stroke="#facc15" stroke-width="8" stroke-dasharray="10 14" stroke-dashoffset="12"/>`);
  def("cataVento", "0 0 100 100", () => `<line x1="50" y1="46" x2="50" y2="96" stroke="#a16207" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M50 44 L50 8 L72 30 Z" fill="#ef4444" ${L}/><path d="M50 44 L86 44 L64 66 Z" fill="#3b82f6" ${L}/><path d="M50 44 L50 80 L28 58 Z" fill="#facc15" ${L}/><path d="M50 44 L14 44 L36 22 Z" fill="#22c55e" ${L}/>` +
    `<circle cx="50" cy="44" r="4" fill="#fff" ${LF}/>`);
  def("patoPuxar", "0 0 100 100", () => `<path d="M14 80 Q6 60 16 44" fill="none" stroke="#a16207" stroke-width="3"/>` +
    `<path d="M24 60 Q22 40 44 42 L52 42 Q48 26 60 20 Q76 18 76 32 Q76 40 68 44 Q86 48 80 66 Z" fill="#facc15" ${L}/><path d="M74 28 L90 32 L76 36 Z" fill="#f97316" ${LF}/>` +
    `<circle cx="66" cy="28" r="2.5" fill="#1f1f1f"/><path d="M36 54 Q48 48 58 56" fill="none" stroke="#ca8a04" stroke-width="3"/>` +
    `<rect x="20" y="64" width="62" height="8" rx="3" fill="#a16207" ${LF}/><circle cx="30" cy="80" r="8" fill="#ef4444" ${L}/><circle cx="72" cy="80" r="8" fill="#ef4444" ${L}/>`);
  def("kendama", "0 0 100 100", () => `<path d="M50 36 Q86 52 74 84" fill="none" stroke="#78350f" stroke-width="2.2"/>` +
    `<rect x="44" y="40" width="12" height="52" rx="4" fill="#d4a373" ${L}/><rect x="26" y="40" width="48" height="12" rx="5" fill="#d4a373" ${L}/>` +
    `<path d="M22 36 Q24 46 32 44 L32 36 Z M78 36 Q76 46 68 44 L68 36 Z" fill="#c08457" ${LF}/><line x1="50" y1="40" x2="50" y2="26" stroke="#78350f" stroke-width="3"/>` +
    `<circle cx="50" cy="16" r="13" fill="#dc2626" ${L}/><circle cx="45" cy="11" r="3" fill="#fecaca"/>`);
  def("abayomi", "0 0 100 100", () => `<path d="M42 38 L22 54 M58 38 L78 54" stroke="#262626" stroke-width="8" stroke-linecap="round"/>` +
    `<circle cx="22" cy="55" r="5" fill="#262626"/><circle cx="78" cy="55" r="5" fill="#262626"/>` +
    `<path d="M40 36 L60 36 L76 90 L24 90 Z" fill="#f59e0b" ${L}/><path d="M30 60 L70 60 M27 74 L73 74" stroke="#dc2626" stroke-width="5"/><path d="M34 46 L66 46" stroke="#16a34a" stroke-width="4"/>` +
    `<circle cx="50" cy="26" r="13" fill="#262626" ${L}/><path d="M36 22 Q38 6 50 8 Q64 6 64 22 Q50 16 36 22 Z" fill="#7c3aed" ${L}/><circle cx="64" cy="16" r="5" fill="#7c3aed" ${LF}/>` +
    `<circle cx="50" cy="38" r="3" fill="#404040"/>`);
  def("oware", "0 0 100 100", () => {
    let s = `<rect x="6" y="28" width="88" height="46" rx="10" fill="#92400e" ${L}/>`;
    for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) {
      const cx = 16 + i * 13.6, cy = 41 + j * 20;
      s += `<ellipse cx="${cx}" cy="${cy}" rx="5.6" ry="6.5" fill="#5b2a08"/>`;
      s += `<circle cx="${cx - 1.6}" cy="${cy - 1.5}" r="1.7" fill="#fde68a"/><circle cx="${cx + 1.8}" cy="${cy + 1.6}" r="1.7" fill="#fde68a"/>`;
    }
    return s;
  });
  def("tsuru", "0 0 100 100", () => `<path d="M10 58 L40 52 L50 22 L58 52 L92 26 L68 62 L60 74 L40 74 Z" fill="#ef4444" ${L}/>` +
    `<path d="M50 22 L50 70 M40 52 L60 74 M58 52 L40 74" stroke="#991b1b" stroke-width="1.5"/><path d="M10 58 L4 50 L16 56 Z" fill="#ef4444" ${LF}/>`);
  def("ritxoko", "0 0 100 100", () => `<path d="M38 34 Q30 40 28 52 M62 34 Q70 40 72 52" stroke="#c2703d" stroke-width="8" stroke-linecap="round"/>` +
    `<path d="M40 30 L60 30 Q70 56 64 92 L36 92 Q30 56 40 30 Z" fill="#c2703d" ${L}/>` +
    `<path d="M38 48 L62 48 M36 62 L64 62 M36 76 L64 76" stroke="#1f1f1f" stroke-width="3"/><path d="M40 55 L46 51 L52 55 L58 51 L62 55 M38 69 L44 65 L50 69 L56 65 L62 69" fill="none" stroke="#7f1d1d" stroke-width="2"/>` +
    `<circle cx="50" cy="20" r="12" fill="#c2703d" ${L}/><path d="M38 16 Q50 8 62 16" fill="none" stroke="#1f1f1f" stroke-width="3"/>` +
    `<path d="M44 22 L47 22 M53 22 L56 22" stroke="#1f1f1f" stroke-width="2"/>`);
  def("carrinho", "0 0 100 100", () => `<path d="M8 66 L8 52 L24 48 L34 32 L66 32 L78 48 L92 52 L92 66 Z" fill="#dc2626" ${L}/>` +
    `<path d="M38 36 L50 36 L50 48 L30 48 Z M54 36 L64 36 L72 48 L54 48 Z" fill="#bae6fd" ${LF}/><circle cx="28" cy="68" r="10" fill="#1f2937" ${L}/><circle cx="72" cy="68" r="10" fill="#1f2937" ${L}/>` +
    `<circle cx="28" cy="68" r="4" fill="#d1d5db"/><circle cx="72" cy="68" r="4" fill="#d1d5db"/>`);

  // ======================= ÍCONES DAS CAIXAS =======================
  def("iVovo", "0 0 100 100", () => `<rect x="0" y="0" width="100" height="100" fill="#fef3c7"/>` + pessoa(50, 97, 1.15, 13, "normal"));
  def("iHoje", "0 0 100 100", () => `<rect x="0" y="0" width="100" height="100" fill="#dbeafe"/>` + pessoa(50, 98, 1.4, 2, "normal"));
  def("iDois", "0 0 100 100", () => `<rect x="0" y="0" width="100" height="100" fill="#dcfce7"/>` + pessoa(32, 98, 1.05, 13, "normal") + pessoa(70, 98, 1.2, 5, "normal") +
    `<path d="M50 30 Q50 22 44 22 Q38 22 38 30 Q38 36 50 44 Q62 36 62 30 Q62 22 56 22 Q50 22 50 30 Z" fill="#ef4444" ${LF}/>`);
  def("iRodar", "0 0 100 100", () => `<path d="M80 50 A30 30 0 1 1 64 23" fill="none" stroke="#7c3aed" stroke-width="9" stroke-linecap="round"/><path d="M54 10 L74 20 L60 36 Z" fill="#7c3aed"/>`);
  def("iAr", "0 0 100 100", () => `<path d="M50 88 L50 34" stroke="#0369a1" stroke-width="9" stroke-linecap="round"/><path d="M30 44 L50 22 L70 44 Z" fill="#0369a1"/><circle cx="50" cy="14" r="10" fill="#f97316" ${LF}/>` + mao(50, 90, 1.3, 0));
  def("iPuxar", "0 0 100 100", () => `<path d="M88 64 L30 64" stroke="#a16207" stroke-width="4"/><path d="M50 40 L14 40" stroke="#15803d" stroke-width="8" stroke-linecap="round"/><path d="M22 28 L6 40 L22 52 Z" fill="#15803d"/>` + mao(22, 66, 1.2, -90) +
    `<rect x="68" y="52" width="26" height="14" rx="3" fill="#ef4444" ${LF}/><circle cx="74" cy="70" r="5" fill="#1f2937"/><circle cx="88" cy="70" r="5" fill="#1f2937"/>`);
  def("iMenino", "0 0 100 100", () => `<rect x="0" y="0" width="100" height="100" fill="#e0f2fe"/>` + pessoa(50, 98, 1.4, 0, "normal"));
  def("iMenina", "0 0 100 100", () => `<rect x="0" y="0" width="100" height="100" fill="#fce7f3"/>` + pessoa(50, 98, 1.4, 1, "normal"));
  def("iTodos", "0 0 100 100", () => `<rect x="0" y="0" width="100" height="100" fill="#fef9c3"/>` + pessoa(22, 98, 0.95, 3, "acima") + pessoa(50, 98, 1.05, 6, "acima") + pessoa(78, 98, 0.95, 4, "acima") +
    `<path d="M50 16 Q50 8 44 8 Q38 8 38 16 Q38 22 50 30 Q62 22 62 16 Q62 8 56 8 Q50 8 50 16 Z" fill="#ef4444" ${LF}/>`);

  // ======================= OBJETOS DO BAÚ E DAS BRINCADEIRAS =======================
  def("giz", "0 0 100 100", () => `<rect x="18" y="44" width="56" height="14" rx="5" transform="rotate(-25 46 51)" fill="#fde047" ${L}/>` +
    `<rect x="26" y="60" width="56" height="14" rx="5" transform="rotate(-10 54 67)" fill="#f9a8d4" ${L}/><rect x="22" y="76" width="56" height="14" rx="5" fill="#93c5fd" ${L}/>`);
  def("saquinhos", "0 0 100 100", () => {
    const cores = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7"];
    const pos = [[26, 34], [64, 28], [46, 58], [20, 78], [74, 70]];
    return pos.map(function (p, i) {
      return `<path d="M${p[0] - 12} ${p[1] + 10} Q${p[0] - 14} ${p[1] - 6} ${p[0]} ${p[1] - 8} Q${p[0] + 14} ${p[1] - 6} ${p[0] + 12} ${p[1] + 10} Z" fill="${cores[i]}" ${LF}/><path d="M${p[0] - 4} ${p[1] - 8} L${p[0]} ${p[1] - 14} L${p[0] + 4} ${p[1] - 8}" fill="none" stroke="#3b2a1a" stroke-width="1.5"/>`;
    }).join("");
  });
  def("bolaLatex", "0 0 100 100", () => `<circle cx="50" cy="52" r="34" fill="#3f3f46" ${L}/><circle cx="38" cy="40" r="8" fill="#71717a"/><path d="M24 70 Q50 84 76 70" fill="none" stroke="#18181b" stroke-width="2"/>`);
  def("bastao", "0 0 100 100", () => `<line x1="20" y1="86" x2="80" y2="14" stroke="#92400e" stroke-width="9" stroke-linecap="round"/><line x1="20" y1="86" x2="80" y2="14" stroke="#d4a373" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 8"/>`);
  def("berimbau", "0 0 100 100", () => `<path d="M30 6 Q72 50 30 96" fill="none" stroke="#92400e" stroke-width="6" stroke-linecap="round"/><line x1="30" y1="6" x2="30" y2="96" stroke="#525252" stroke-width="1.6"/>` +
    `<circle cx="44" cy="76" r="14" fill="#d97706" ${L}/><path d="M34 76 Q44 70 54 76" fill="none" stroke="#7c2d12" stroke-width="2"/><line x1="58" y1="40" x2="86" y2="30" stroke="#a16207" stroke-width="4" stroke-linecap="round"/>`);
  def("maoPedra", "0 0 100 100", () => `<path d="M26 40 Q26 28 38 28 L66 28 Q76 28 76 40 L76 66 Q76 82 60 82 L42 82 Q26 82 26 66 Z" fill="#e0ac69" ${L}/>` +
    `<path d="M40 28 L40 46 M52 28 L52 46 M64 28 L64 46" stroke="#3b2a1a" stroke-width="2"/><path d="M26 52 Q40 46 50 56" fill="none" ${L}/>`);
  def("maoPapel", "0 0 100 100", () => `<rect x="30" y="46" width="44" height="42" rx="12" fill="#e0ac69" ${L}/>` +
    [36, 47, 58, 69].map(function (x, i) { return `<rect x="${x - 5}" y="${i === 0 || i === 3 ? 18 : 10}" width="10" height="42" rx="5" fill="#e0ac69" ${L}/>`; }).join("") +
    `<rect x="12" y="52" width="26" height="10" rx="5" transform="rotate(-30 25 57)" fill="#e0ac69" ${L}/><rect x="31" y="46" width="42" height="12" fill="#e0ac69"/>`);
  def("maoTesoura", "0 0 100 100", () => `<rect x="32" y="12" width="11" height="46" rx="5.5" transform="rotate(-14 37 35)" fill="#e0ac69" ${L}/><rect x="54" y="12" width="11" height="46" rx="5.5" transform="rotate(14 60 35)" fill="#e0ac69" ${L}/>` +
    `<path d="M30 54 Q30 46 40 46 L64 46 Q74 46 74 56 L74 74 Q74 88 58 88 L44 88 Q30 88 30 74 Z" fill="#e0ac69" ${L}/><path d="M30 62 Q42 56 52 64" fill="none" ${L}/><path d="M58 56 L72 56 M58 66 L72 66" stroke="#3b2a1a" stroke-width="2"/>`);
  def("maos", "0 0 100 100", () => `<g transform="translate(0 20) scale(.5)">${R.maoPedra.f()}</g><g transform="translate(50 20) scale(.5)">${R.maoPapel.f()}</g><g transform="translate(25 52) scale(.5)">${R.maoTesoura.f()}</g>`);
  def("bocha", "0 0 100 100", () => `<rect x="0" y="62" width="100" height="38" fill="#d6b98c"/><circle cx="54" cy="70" r="6" fill="#facc15" ${L}/>` +
    `<circle cx="28" cy="72" r="14" fill="#dc2626" ${L}/><circle cx="78" cy="74" r="14" fill="#2563eb" ${L}/><circle cx="56" cy="40" r="14" fill="#16a34a" ${L}/><path d="M48 58 L52 64" stroke="#3b2a1a" stroke-width="2" stroke-dasharray="2 2"/>`);
  def("pedrinha", "0 0 100 100", () => `<rect x="20" y="40" width="60" height="44" fill="#ffffff" stroke="#475569" stroke-width="3"/><text x="50" y="76" font-size="30" text-anchor="middle" fill="#94a3b8" font-family="Arial" font-weight="bold">3</text>` +
    `<path d="M38 50 Q40 38 52 38 Q66 38 64 52 Q62 62 50 62 Q36 62 38 50 Z" fill="#78716c" ${L}/><circle cx="46" cy="46" r="3" fill="#d6d3d1"/>`);
  def("retrato", "0 0 100 100", () => `<rect x="10" y="8" width="80" height="84" rx="4" fill="#a16207" ${L}/><rect x="18" y="16" width="64" height="68" fill="#f5e6c8"/>` +
    `<g style="filter:sepia(1)" opacity=".85"><rect x="18" y="62" width="64" height="22" fill="#d6c3a0"/>${pessoa(40, 80, 0.9, 1, "normal", { longo: false })}<g transform="translate(56 58) scale(.24)">${R.piao.f()}</g></g>`);
  def("caixaTodos", "0 0 100 100", () => `<g transform="translate(8 6) scale(.42)">${R.bola.f()}</g><g transform="translate(36 0) scale(.4)">${R.bonecaPano.f()}</g><g transform="translate(58 8) scale(.38)">${R.carrinho.f()}</g>` +
    `<path d="M10 46 L90 46 L84 92 L16 92 Z" fill="#f59e0b" ${L}/><path d="M50 64 Q50 56 44 56 Q38 56 38 64 Q38 70 50 80 Q62 70 62 64 Q62 56 56 56 Q50 56 50 64 Z" fill="#ef4444" ${LF}/>`);
  def("lupa", "0 0 100 100", () => `<line x1="62" y1="62" x2="88" y2="88" stroke="#78350f" stroke-width="11" stroke-linecap="round"/><circle cx="42" cy="42" r="28" fill="#dbeafe" stroke="#3b2a1a" stroke-width="6"/>` +
    `<path d="M28 34 Q32 24 42 22" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`);
  def("quebraCabeca", "0 0 100 100", () => `<path d="M14 14 L46 14 Q42 4 50 4 Q58 4 54 14 L86 14 L86 46 Q96 42 96 50 Q96 58 86 54 L86 86 L14 86 L14 54 Q4 58 4 50 Q4 42 14 46 Z" fill="#22c55e" ${L}/>` +
    `<path d="M50 14 L50 86 M14 50 L86 50" stroke="#15803d" stroke-width="2.5" stroke-dasharray="4 3"/><text x="32" y="40" font-size="20" font-weight="bold" font-family="Arial" fill="#14532d">1</text><text x="62" y="40" font-size="20" font-weight="bold" font-family="Arial" fill="#14532d">2</text><text x="32" y="76" font-size="20" font-weight="bold" font-family="Arial" fill="#14532d">3</text><text x="62" y="76" font-size="20" font-weight="bold" font-family="Arial" fill="#14532d">4</text>`);

  // ======================= PASSOS DAS BRINCADEIRAS (100x100) =======================
  const fundoPasso = `<rect x="0" y="0" width="100" height="100" rx="8" fill="#e7e5e4"/>`;
  def("passoAmarelinha1", "0 0 100 100", () => fundoPasso + amarelinhaMini(40, 26, 1) + `<rect x="64" y="58" width="26" height="8" rx="3" transform="rotate(-40 77 62)" fill="#fde047" ${LF}/>` + mao(80, 74, 1, -20));
  def("passoAmarelinha2", "0 0 100 100", () => fundoPasso + amarelinhaMini(44, 26, 1) + `<path d="M86 88 Q86 40 46 54" fill="none" stroke="#475569" stroke-width="2" stroke-dasharray="4 3"/><ellipse cx="44" cy="58" rx="6" ry="4.5" fill="#78716c" ${LF}/>`);
  def("passoAmarelinha3", "0 0 100 100", () => fundoPasso + amarelinhaMini(50, 26, 1) + pessoa(50, 74, 0.8, 4, "pe"));
  def("passoAmarelinha4", "0 0 100 100", () => fundoPasso + amarelinhaMini(50, 26, 1) + `<ellipse cx="50" cy="58" rx="6" ry="4.5" fill="#78716c" ${LF}/>` + mao(58, 48, 1, 160) +
    `<path d="M80 30 Q90 50 80 70" fill="none" stroke="#2563eb" stroke-width="3"/><path d="M74 66 L80 74 L86 66" fill="none" stroke="#2563eb" stroke-width="3"/>`);
  def("passoPiao1", "0 0 100 100", () => fundoPasso + `<g transform="translate(14 6) scale(.72)">${R.piao.f()}</g><path d="M36 50 Q50 56 64 50 M38 58 Q50 64 62 58 M42 66 Q50 70 58 66" fill="none" stroke="#a16207" stroke-width="3"/><path d="M64 50 Q80 46 88 30" fill="none" stroke="#a16207" stroke-width="3"/>`);
  def("passoPiao2", "0 0 100 100", () => fundoPasso + `<g transform="translate(20 18) scale(.6) rotate(180 50 50)">${R.piao.f()}</g>` + mao(50, 30, 1.6, 180) + `<path d="M70 26 Q86 20 90 8" fill="none" stroke="#a16207" stroke-width="3"/>`);
  def("passoPiao3", "0 0 100 100", () => fundoPasso + `<g transform="translate(34 34) scale(.5)">${R.piao.f()}</g><path d="M30 20 L40 36 M44 12 L52 30 M18 34 L32 46" stroke="#475569" stroke-width="3" stroke-linecap="round"/><path d="M90 10 Q60 20 52 44" fill="none" stroke="#a16207" stroke-width="3"/>` + mao(86, 14, 1, 200));
  def("passoPiao4", "0 0 100 100", () => fundoPasso + `<rect x="0" y="80" width="100" height="20" fill="#d6b98c"/><g transform="translate(28 34) scale(.48)">${R.piao.f()}</g>` +
    `<path d="M20 50 Q14 64 22 76 M80 50 Q86 64 78 76" fill="none" stroke="#2563eb" stroke-width="3"/><path d="M16 72 L22 78 L26 70 M84 72 L78 78 L74 70" fill="none" stroke="#2563eb" stroke-width="3"/>`);
  const saquinho = function (x, y, cor) { return `<path d="M${x - 8} ${y + 6} Q${x - 9} ${y - 4} ${x} ${y - 5} Q${x + 9} ${y - 4} ${x + 8} ${y + 6} Z" fill="${cor}" ${LF}/>`; };
  def("passoCinco1", "0 0 100 100", () => fundoPasso + saquinho(24, 70, "#ef4444") + saquinho(46, 62, "#3b82f6") + saquinho(70, 72, "#22c55e") + saquinho(34, 84, "#f59e0b") + saquinho(62, 86, "#a855f7"));
  def("passoCinco2", "0 0 100 100", () => fundoPasso + saquinho(50, 18, "#ef4444") + `<path d="M50 70 L50 34" stroke="#2563eb" stroke-width="3"/><path d="M42 42 L50 32 L58 42" fill="none" stroke="#2563eb" stroke-width="3"/>` + mao(50, 80, 1.2, 0) +
    saquinho(20, 86, "#3b82f6") + saquinho(80, 88, "#22c55e"));
  def("passoCinco3", "0 0 100 100", () => fundoPasso + saquinho(50, 14, "#ef4444") + saquinho(40, 80, "#3b82f6") + saquinho(78, 86, "#22c55e") + mao(42, 64, 1.1, 180));
  def("passoCinco4", "0 0 100 100", () => fundoPasso + saquinho(56, 28, "#ef4444") + `<path d="M74 10 L74 42" stroke="#2563eb" stroke-width="3"/><path d="M66 34 L74 44 L82 34" fill="none" stroke="#2563eb" stroke-width="3"/>` + mao(56, 62, 1.3, 0) + saquinho(50, 52, "#3b82f6"));

  // ======================= CENAS DA HISTÓRIA (400x250) =======================
  function bau(x, y, s, aberto) {
    const tampa = aberto
      ? `<path d="M-62 -40 L62 -40 L50 -104 L-50 -104 Z" fill="#6b3416" ${L}/><path d="M-54 -46 L54 -46 L45 -98 L-45 -98 Z" fill="#a0522d" stroke="#3b2a1a" stroke-width="1.5"/><path d="M-50 -104 L50 -104" stroke="#facc15" stroke-width="5"/>` +
        `<rect x="-60" y="-46" width="120" height="10" fill="#2a160b"/>`
      : `<path d="M-62 -40 Q-62 -86 0 -86 Q62 -86 62 -40 Z" fill="#a0522d" ${L}/><path d="M-30 -80 L-30 -40 M30 -80 L30 -40" stroke="#facc15" stroke-width="6"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">` + tampa +
      `<rect x="-62" y="-40" width="124" height="66" rx="4" fill="#8b4513" ${L}/><path d="M-30 -40 L-30 26 M30 -40 L30 26" stroke="#facc15" stroke-width="6"/>` +
      `<rect x="-10" y="-46" width="20" height="24" rx="3" fill="#facc15" ${L}/><circle cx="0" cy="-36" r="3" fill="#3b2a1a"/></g>`;
  }
  function brilho(x, y, r) {
    let s = "";
    for (let a = 0; a < 360; a += 30) {
      const rad = a * Math.PI / 180;
      s += `<path d="M${x} ${y} L${x + Math.cos(rad - 0.08) * r} ${y + Math.sin(rad - 0.08) * r} L${x + Math.cos(rad + 0.08) * r} ${y + Math.sin(rad + 0.08) * r} Z" fill="#fde68a" opacity=".8"/>`;
    }
    return `<g class="brilho">${s}</g>`;
  }
  function estrelinha(x, y, s, cor) { return `<path class="brilho" transform="translate(${x} ${y}) scale(${s})" d="M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z" fill="${cor || "#fde047"}" stroke="#a16207" stroke-width="1"/>`; }

  def("bau", "0 0 160 120", () => bau(80, 104, 0.95, false));
  def("bauAberto", "0 0 160 140", () => brilho(80, 64, 66) + bau(80, 112, 0.9, true));
  def("cenaSotao", "0 0 400 250", () => `<rect width="400" height="250" fill="#5b3a29"/><path d="M0 0 L200 0 L0 120 Z M400 0 L200 0 L400 120 Z" fill="#3f2a1d"/>` +
    `<path d="M0 120 L200 0 L400 120" fill="none" stroke="#2a1a10" stroke-width="8"/><rect x="0" y="190" width="400" height="60" fill="#8b5a2b"/>` +
    `<path d="M0 205 L400 205 M0 225 L400 225" stroke="#6b4423" stroke-width="2"/><circle cx="200" cy="70" r="28" fill="#fde68a" stroke="#2a1a10" stroke-width="6"/><path d="M200 42 L200 98 M172 70 L228 70" stroke="#2a1a10" stroke-width="4"/>` +
    `<path d="M200 98 L120 190 L280 190 Z" fill="#fde68a" opacity=".25"/>` +
    `<rect x="24" y="140" width="60" height="50" fill="#c08457" ${L}/><rect x="34" y="104" width="44" height="36" fill="#d4a373" ${L}/><path d="M24 158 L84 158" stroke="#3b2a1a" stroke-width="2"/>` +
    `<rect x="316" y="120" width="62" height="70" fill="#a3a3a3" ${L}/><rect x="324" y="128" width="46" height="26" fill="#e5e5e5" ${LF}/><path d="M330 190 L326 206 M366 190 L370 206" ${L}/>` +
    `<path d="M300 20 L330 40 M310 18 L318 44" stroke="#d6d3d1" stroke-width="1" opacity=".6"/>` + bau(200, 214, 0.75, false));
  def("cenaBau", "0 0 400 250", () => `<rect width="400" height="250" fill="#4a2f22"/><rect x="0" y="200" width="400" height="50" fill="#8b5a2b"/>` + brilho(200, 150, 190) + bau(200, 214, 1.1, false) +
    estrelinha(90, 70, 1.4) + estrelinha(320, 60, 1.2) + estrelinha(110, 170, 0.9) + estrelinha(300, 150, 1) + pessoa(330, 228, 1.4, 2, "aberto"));
  def("cenaViagem", "0 0 400 250", () => {
    let s = `<rect width="400" height="250" fill="#312e81"/>`;
    const cores = ["#6366f1", "#8b5cf6", "#a855f7", "#c084fc", "#e9d5ff"];
    for (let i = 0; i < 5; i++) s += `<ellipse cx="200" cy="125" rx="${180 - i * 34}" ry="${110 - i * 21}" fill="${cores[i]}"/>`;
    return s + estrelinha(60, 40, 1.2) + estrelinha(350, 50, 1) + estrelinha(40, 200, 1) + estrelinha(360, 210, 1.3) +
      `<g transform="translate(60 70) scale(.6) rotate(-20 50 50)">${R.pipa.f()}</g><g transform="translate(290 80) scale(.55) rotate(20 50 50)">${R.piao.f()}</g>` +
      `<g transform="translate(270 150) scale(.5)">${R.peteca.f()}</g><g transform="translate(70 150) scale(.5)">${R.bola.f()}</g>` + pessoa(200, 190, 1.7, 2, "acima");
  });
  def("cenaMuseu", "0 0 400 250", () => `<rect width="400" height="250" fill="#fef3c7"/><rect x="0" y="200" width="400" height="50" fill="#d6b98c"/>` +
    `<rect x="20" y="40" width="110" height="10" fill="#a16207" ${LF}/><rect x="270" y="40" width="110" height="10" fill="#a16207" ${LF}/><rect x="20" y="110" width="110" height="10" fill="#a16207" ${LF}/><rect x="270" y="110" width="110" height="10" fill="#a16207" ${LF}/>` +
    `<g transform="translate(28 -4) scale(.44)">${R.peteca.f()}</g><g transform="translate(78 -4) scale(.44)">${R.piao.f()}</g><g transform="translate(278 -4) scale(.44)">${R.kendama.f()}</g><g transform="translate(328 -4) scale(.44)">${R.pipa.f()}</g>` +
    `<g transform="translate(28 66) scale(.44)">${R.bonecaPano.f()}</g><g transform="translate(78 66) scale(.44)">${R.carrinhoLata.f()}</g><g transform="translate(278 66) scale(.44)">${R.oware.f()}</g><g transform="translate(328 66) scale(.44)">${R.tsuru.f()}</g>` +
    brilho(200, 170, 90) + bau(200, 228, 0.85, true) + pessoa(330, 240, 1.3, 5, "acima"));

  // Portas das viagens
  def("portaOficina", "0 0 400 250", () => `<rect width="400" height="250" fill="#ffedd5"/><rect x="0" y="0" width="400" height="120" fill="#fed7aa"/>` +
    `<path d="M30 20 L370 20" stroke="#9a3412" stroke-width="4"/><path d="M60 20 L60 50 M120 20 L120 44 M290 20 L290 48 M340 20 L340 44" stroke="#9a3412" stroke-width="3"/>` +
    `<g transform="translate(40 40) scale(.4)">${R.mMadeira.f()}</g><g transform="translate(100 34) scale(.4)">${R.mBarbante.f()}</g><g transform="translate(270 36) scale(.4)">${R.mLata.f()}</g><g transform="translate(320 34) scale(.4)">${R.mPano.f()}</g>` +
    `<rect x="30" y="160" width="340" height="18" fill="#b7793f" ${L}/><path d="M50 178 L50 240 M350 178 L350 240" stroke="#7a4a20" stroke-width="10"/>` +
    `<g transform="translate(60 90) scale(.72)">${R.piao.f()}</g><g transform="translate(150 84) scale(.78)">${R.peteca.f()}</g><g transform="translate(240 92) scale(.72)">${R.carrinhoLata.f()}</g>` + pessoa(330, 160, 1.3, 9, "acima"));
  def("portaPatio", "0 0 400 250", () => ceu("#bbf7d0") + chao(140, "#d6c7a1") + arvore(40, 150, 1.1) + arvore(370, 150, 1) +
    `<g fill="#fff" stroke="#57534e" stroke-width="2.5"><rect x="100" y="200" width="36" height="30"/><rect x="136" y="200" width="36" height="30"/><rect x="172" y="186" width="36" height="22"/><rect x="172" y="208" width="36" height="22"/><rect x="208" y="200" width="36" height="30"/><path d="M244 200 Q284 215 244 230 Z"/></g>` +
    `<text x="118" y="222" font-size="16" font-family="Arial" fill="#57534e">1</text><text x="154" y="222" font-size="16" font-family="Arial" fill="#57534e">2</text>` +
    pessoa(160, 196, 1.2, 1, "pe") + pessoa(300, 200, 1.2, 11, "acima") + `<path d="M270 160 Q300 240 330 160" fill="none" stroke="#a16207" stroke-width="3"/>` + pessoa(80, 220, 1.1, 7, "normal") + pessoa(350, 226, 1.1, 8, "normal"));
  def("portaCidade", "0 0 400 250", () => ceu("#bfdbfe") + sol(350, 40, 18) + nuvem(80, 40, 1.2) +
    predio(20, 60, 50, 130, "#94a3b8") + predio(80, 90, 40, 100, "#cbd5e1") + predio(130, 40, 46, 150, "#a5b4fc") + predio(250, 70, 50, 120, "#fca5a5") + predio(310, 100, 70, 90, "#fde68a") +
    chao(190, "#86d07a") + `<path d="M0 225 Q100 210 200 228 T400 222 L400 250 L0 250 Z" fill="#60a5fa"/>` + arvore(200, 196, 0.9) + arvore(240, 198, 0.8) +
    pessoa(110, 214, 1, 3, "acima") + pessoa(300, 214, 1, 6, "normal"));

  // ======================= LUGARES DE SÃO PAULO: ANTES E HOJE =======================
  def("tieteAntes", "0 0 400 250", () => ceu("#e0f2fe") + nuvem(80, 40, 1.2) + nuvem(300, 30) + chao(90, "#86d07a") + arvore(30, 110, 0.9) + arvore(90, 104, 0.8) + arvore(330, 110, 0.9) + arvore(380, 106, 0.7) +
    `<rect x="120" y="70" width="80" height="34" fill="#fde68a" ${LF}/><path d="M114 70 L160 52 L206 70 Z" fill="#b45309" ${LF}/><text x="160" y="92" font-size="11" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#3b2a1a">CLUBE</text>` +
    `<path d="M0 120 Q200 108 400 122 L400 222 Q200 232 0 220 Z" fill="#3b82f6"/><path d="M30 150 Q60 146 90 150 M220 180 Q260 176 300 182 M120 200 Q150 196 180 200" stroke="#bfdbfe" stroke-width="3" fill="none"/>` +
    `<path d="M240 150 L320 150 L308 164 L252 164 Z" fill="#b45309" ${L}/><line x1="262" y1="152" x2="236" y2="172" stroke="#7c4a1e" stroke-width="3"/><line x1="298" y1="152" x2="324" y2="172" stroke="#7c4a1e" stroke-width="3"/>` +
    pessoa(268, 154, 0.7, 12, "normal", { roupa: "#f1f5f9" }) + pessoa(292, 154, 0.7, 0, "normal", { roupa: "#f1f5f9" }) +
    `<circle cx="80" cy="172" r="7" fill="#e0ac69" ${LF}/><path d="M66 176 L72 168 M88 168 L94 176" stroke="#e0ac69" stroke-width="4" stroke-linecap="round"/><circle cx="130" cy="160" r="7" fill="#c68642" ${LF}/><circle cx="170" cy="182" r="7" fill="#f1c27d" ${LF}/>` +
    chao(222, "#86d07a"));
  def("tieteHoje", "0 0 400 250", () => ceu("#dbeafe") + predio(10, 30, 40, 80, "#94a3b8") + predio(60, 50, 50, 60, "#cbd5e1") + predio(120, 20, 40, 90, "#a5b4fc") + predio(250, 40, 50, 70, "#d1d5db") + predio(310, 26, 60, 84, "#94a3b8") +
    `<rect x="0" y="108" width="400" height="34" fill="#4b5563"/><path d="M0 125 L400 125" stroke="#fde047" stroke-width="2" stroke-dasharray="14 10"/>` +
    carro(60, 122, "#ef4444", 0.8) + carro(190, 122, "#2563eb", 0.8) + carro(320, 140, "#f59e0b", 0.8) + carro(120, 140, "#16a34a", 0.8) +
    `<rect x="0" y="142" width="400" height="8" fill="#86d07a"/><path d="M0 150 Q200 144 400 152 L400 200 Q200 206 0 198 Z" fill="#64748b"/><path d="M40 170 Q70 166 100 170 M240 180 Q280 176 320 182" stroke="#94a3b8" stroke-width="3" fill="none"/>` +
    `<rect x="0" y="198" width="400" height="8" fill="#86d07a"/><rect x="0" y="206" width="400" height="44" fill="#4b5563"/><path d="M0 228 L400 228" stroke="#fde047" stroke-width="2" stroke-dasharray="14 10"/>` +
    carro(90, 226, "#a855f7", 0.8) + carro(250, 244, "#0ea5e9", 0.8) + carro(350, 226, "#dc2626", 0.8));
  def("luzAntes", "0 0 400 250", () => ceu("#e0f2fe") + chao(110, "#86d07a") + arvore(40, 130, 1.2) + arvore(120, 116, 1) + arvore(300, 118, 1.1) + arvore(370, 130, 1.2) +
    `<ellipse cx="220" cy="190" rx="90" ry="28" fill="#60a5fa" ${LF}/><path d="M0 150 Q100 140 140 170 Q170 200 90 250 L40 250 Q110 200 80 175 Q50 160 0 165 Z" fill="#e7d3a8"/>` +
    pessoa(70, 176, 1.1, 13, "normal", { longo: true, roupa: "#7c3aed", chapeu: "#4b5563" }) + pessoa(100, 182, 0.9, 1, "normal", { longo: true, roupa: "#f9a8d4" }) +
    pessoa(330, 210, 1.1, 12, "normal", { chapeu: "#1f2937", roupa: "#334155" }) + pessoa(360, 214, 0.9, 6, "normal", { roupa: "#e2e8f0", baixo: "#475569" }) +
    `<circle cx="372" cy="200" r="9" fill="none" stroke="#7c4a1e" stroke-width="2.5"/>`);
  def("luzHoje", "0 0 400 250", () => ceu("#bfdbfe") + chao(110, "#7cc96e") + arvore(40, 130, 1.3) + arvore(120, 116, 1.1) + arvore(300, 118, 1.2) + arvore(370, 130, 1.3) +
    `<ellipse cx="220" cy="190" rx="90" ry="28" fill="#60a5fa" ${LF}/><path d="M0 150 Q100 140 140 170 Q170 200 90 250 L40 250 Q110 200 80 175 Q50 160 0 165 Z" fill="#e7d3a8"/>` +
    `<rect x="170" y="110" width="14" height="40" fill="#a8a29e" ${LF}/><circle cx="177" cy="102" r="10" fill="#d6d3d1" ${LF}/>` +
    pessoa(70, 180, 1, 2, "acima") + pessoa(100, 186, 0.9, 4, "normal") + pessoa(330, 214, 1.1, 3, "normal") + pessoa(362, 218, 0.9, 7, "acima") + banco(250, 230));
  def("sescAntes", "0 0 400 250", () => ceu("#e5e7eb") + chao(170, "#a8a29e") +
    `<rect x="30" y="90" width="150" height="80" fill="#b45309" ${L}/><path d="M30 90 L105 60 L180 90 Z" fill="#78350f" ${L}/><rect x="200" y="96" width="150" height="74" fill="#b45309" ${L}/><path d="M200 96 L275 68 L350 96 Z" fill="#78350f" ${L}/>` +
    `<path d="M30 110 L180 110 M30 130 L180 130 M30 150 L180 150 M200 116 L350 116 M200 136 L350 136 M200 156 L350 156" stroke="#92400e" stroke-width="1.5"/>` +
    `<rect x="360" y="40" width="20" height="130" fill="#7c2d12" ${L}/><path d="M370 36 Q380 20 368 10 Q390 18 384 34" fill="#d1d5db" opacity=".9"/>` +
    `<text x="105" y="84" font-size="14" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#fff7ed">FÁBRICA</text>` +
    `<rect x="60" y="180" width="22" height="30" rx="4" fill="#475569" ${LF}/><rect x="88" y="182" width="22" height="30" rx="4" fill="#475569" ${LF}/><rect x="74" y="150" width="22" height="30" rx="4" fill="#64748b" ${LF}/>` +
    pessoa(250, 230, 1.1, 12, "normal", { roupa: "#1e3a8a", baixo: "#1e3a8a" }) + pessoa(300, 232, 1.1, 9, "normal", { roupa: "#1e3a8a", baixo: "#1e3a8a" }));
  def("sescHoje", "0 0 400 250", () => ceu("#bfdbfe") + chao(170, "#d6d3d1") +
    `<rect x="20" y="90" width="150" height="80" fill="#c2410c" ${L}/><path d="M20 90 L95 60 L170 90 Z" fill="#7c2d12" ${L}/><path d="M20 110 L170 110 M20 130 L170 130 M20 150 L170 150" stroke="#9a3412" stroke-width="1.5"/>` +
    `<rect x="60" y="132" width="30" height="38" fill="#7dd3fc" ${LF}/><rect x="110" y="132" width="30" height="38" fill="#7dd3fc" ${LF}/>` +
    `<rect x="220" y="30" width="56" height="140" fill="#d4d4d8" ${L}/><rect x="310" y="50" width="70" height="120" fill="#e4e4e7" ${L}/>` +
    `<path d="M276 70 L310 80 M276 110 L310 120" stroke="#a1a1aa" stroke-width="8"/>` +
    `<path d="M232 44 Q238 38 248 44 L246 58 L234 56 Z M254 80 Q262 72 268 82 L264 92 L254 90 Z M230 120 Q240 112 250 120 L248 134 L232 132 Z M324 70 Q334 62 346 70 L344 86 L326 84 Z M352 110 Q362 102 372 110 L370 126 L354 124 Z" fill="#dc2626" ${LF}/>` +
    pessoa(60, 230, 1, 4, "acima") + pessoa(110, 234, 1, 11, "normal") + pessoa(260, 232, 1, 1, "acima") + pessoa(330, 236, 1, 8, "normal") + `<g transform="translate(150 196) scale(.36)">${R.bola.f()}</g>`);
  def("paulistaAntes", "0 0 400 250", () => ceu("#e0f2fe") + nuvem(320, 40) + chao(120, "#a7d08a") + casarao(20, 90, "#fde68a") + casarao(120, 84, "#fbcfe8") + casarao(300, 90, "#ddd6fe") +
    arvore(220, 124, 1) + arvore(255, 120, 0.9) + `<path d="M0 150 L400 150 L400 210 L0 210 Z" fill="#d6b98c"/>` +
    `<path d="M150 178 L210 178 L210 196 L150 196 Z" fill="#78350f" ${L}/><circle cx="160" cy="202" r="8" fill="none" stroke="#3b2a1a" stroke-width="3"/><circle cx="200" cy="202" r="8" fill="none" stroke="#3b2a1a" stroke-width="3"/>` +
    `<path d="M210 186 L240 186 M232 170 Q250 162 256 176 L254 196 L248 196 L248 186 L236 186 L236 196 L230 196 Z" fill="#a16207" ${LF}/>` +
    chao(210, "#a7d08a") + pessoa(80, 240, 1, 13, "normal", { longo: true, roupa: "#be185d", chapeu: "#4b5563" }) + pessoa(330, 240, 1, 12, "normal", { chapeu: "#1f2937" }));
  def("paulistaHoje", "0 0 400 250", () => ceu("#bfdbfe") + predio(10, 20, 50, 130, "#94a3b8") + predio(66, 50, 44, 100, "#cbd5e1") + predio(116, 10, 52, 140, "#a5b4fc") + predio(290, 30, 46, 120, "#d1d5db") + predio(342, 0, 54, 150, "#94a3b8") +
    `<rect x="180" y="110" width="104" height="40" fill="#5ea852"/>` + arvore(200, 150, 0.8) + arvore(236, 148, 0.9) + arvore(268, 150, 0.8) +
    `<rect x="0" y="150" width="400" height="100" fill="#9ca3af"/><path d="M0 200 L400 200" stroke="#f8fafc" stroke-width="3" stroke-dasharray="20 14"/>` +
    `<rect x="150" y="164" width="100" height="22" rx="4" fill="#fef08a" ${LF}/><text x="200" y="180" font-size="12" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#3b2a1a">DOMINGO</text>` +
    pessoa(60, 236, 1, 2, "acima") + pessoa(110, 230, 0.9, 5, "normal") + pessoa(300, 238, 1, 8, "acima") + pessoa(350, 232, 0.9, 3, "normal") +
    `<g transform="translate(180 212) scale(.34)">${R.bola.f()}</g><g transform="translate(250 196)"><circle cx="0" cy="30" r="9" fill="none" stroke="#1f2937" stroke-width="3"/><circle cx="34" cy="30" r="9" fill="none" stroke="#1f2937" stroke-width="3"/><path d="M0 30 L14 14 L30 14 L34 30 M14 14 L18 4" fill="none" stroke="#dc2626" stroke-width="3"/></g>`);
  def("ibirapueraAntes", "0 0 400 250", () => ceu("#e0f2fe") + nuvem(100, 36) + chao(110, "#9fbf7a") + eucalipto(40, 140, 1) + eucalipto(80, 130, 0.9) + eucalipto(320, 136, 1) + eucalipto(360, 140, 0.8) + eucalipto(250, 124, 0.7) +
    `<ellipse cx="160" cy="170" rx="70" ry="18" fill="#7aa6c2" opacity=".9"/><ellipse cx="270" cy="200" rx="60" ry="14" fill="#7aa6c2" opacity=".9"/><ellipse cx="110" cy="222" rx="50" ry="12" fill="#7aa6c2" opacity=".9"/>` +
    `<path d="M120 160 L118 140 M126 162 L130 142 M200 160 L196 140 M206 164 L212 146 M240 194 L236 176 M300 196 L304 178 M90 216 L86 198 M140 220 L146 200" stroke="#4d7c0f" stroke-width="3" stroke-linecap="round"/>`);
  def("ibirapueraHoje", "0 0 400 250", () => ceu("#bfdbfe") + sol(360, 34, 16) + chao(110, "#7cc96e") + arvore(30, 130, 1) + arvore(80, 124, 0.9) + arvore(340, 128, 1) + eucalipto(380, 134, 0.8) +
    `<path d="M120 96 Q170 88 210 100 Q260 110 300 98 L300 108 Q260 120 210 110 Q170 98 120 106 Z" fill="#f8fafc" ${LF}/><path d="M140 106 L140 130 M200 108 L200 132 M270 110 L270 132" stroke="#94a3b8" stroke-width="4"/>` +
    `<ellipse cx="200" cy="180" rx="110" ry="26" fill="#3b82f6" ${LF}/><path d="M0 230 Q200 200 400 232" fill="none" stroke="#e7d3a8" stroke-width="14"/>` +
    pessoa(60, 236, 1, 6, "acima") + pessoa(110, 226, 0.9, 1, "normal") + pessoa(300, 232, 1, 11, "normal") + pessoa(350, 238, 1, 4, "acima") +
    `<g transform="translate(150 208) scale(.3)">${R.bola.f()}</g>`);
  def("ceuAntes", "0 0 400 250", () => ceu("#e0f2fe") + nuvem(300, 40) + chao(110, "#d6b98c") + casinha(20, 90, "#fca5a5") + casinha(66, 94, "#fde68a") + casinha(300, 92, "#bfdbfe") + casinha(350, 90, "#bbf7d0") +
    `<path d="M120 150 Q160 140 210 156 M240 190 Q280 180 320 196 M80 210 Q120 200 160 214" stroke="#b79368" stroke-width="3" fill="none"/>` +
    `<path d="M170 196 L176 186 L182 196 Z" fill="#a8a29e"/><path d="M260 150 L266 142 L272 150 Z" fill="#a8a29e"/>` +
    pessoa(150, 230, 1, 9, "acima") + pessoa(230, 226, 1, 10, "normal") + `<g transform="translate(182 208) scale(.3)">${R.bolaMeia.f()}</g>`);
  def("ceuHoje", "0 0 400 250", () => ceu("#bfdbfe") + chao(110, "#7cc96e") + casinha(10, 90, "#fca5a5") + casinha(356, 90, "#bbf7d0") +
    `<rect x="60" y="56" width="120" height="60" fill="#fde047" ${L}/><rect x="190" y="70" width="140" height="46" fill="#60a5fa" ${L}/><text x="120" y="92" font-size="22" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#1e3a8a">CEU</text>` +
    `<rect x="200" y="80" width="20" height="14" fill="#fef9c3" ${LF}/><rect x="230" y="80" width="20" height="14" fill="#fef9c3" ${LF}/><rect x="260" y="80" width="20" height="14" fill="#fef9c3" ${LF}/><rect x="290" y="80" width="20" height="14" fill="#fef9c3" ${LF}/>` +
    `<rect x="40" y="140" width="140" height="56" rx="6" fill="#38bdf8" ${L}/><path d="M50 160 Q70 154 90 160 M110 176 Q130 170 150 176" stroke="#e0f2fe" stroke-width="3" fill="none"/>` +
    `<rect x="210" y="140" width="160" height="70" fill="#f97316" ${L}/><path d="M290 140 L290 210" stroke="#fff" stroke-width="3"/><circle cx="290" cy="175" r="14" fill="none" stroke="#fff" stroke-width="3"/>` +
    `<circle cx="80" cy="170" r="7" fill="#8d5524" ${LF}/><circle cx="140" cy="164" r="7" fill="#f1c27d" ${LF}/>` + pessoa(250, 200, 1, 9, "acima") + pessoa(330, 202, 1, 10, "normal") + pessoa(120, 240, 1, 3, "normal"));

  // ======================= MAPA DE SÃO PAULO (600x400) =======================
  def("mapa", "0 0 600 400", () => {
    let s = `<rect width="600" height="400" fill="#e9f5d8"/>`;
    const quadras = [[40, 120, 90, 60], [150, 130, 80, 50], [250, 120, 110, 70], [380, 130, 90, 60], [480, 110, 90, 80], [140, 200, 100, 60], [260, 210, 90, 50], [370, 210, 110, 60], [500, 220, 70, 60],
      [150, 280, 70, 50], [380, 300, 80, 50], [240, 310, 70, 50], [500, 310, 70, 50], [60, 20, 120, 40], [220, 20, 140, 30], [400, 24, 150, 30]];
    quadras.forEach(function (q) { s += `<rect x="${q[0]}" y="${q[1]}" width="${q[2]}" height="${q[3]}" rx="8" fill="#fde9c7" stroke="#e8c99a" stroke-width="2"/>`; });
    s += `<path d="M0 86 Q120 60 240 74 Q360 88 470 62 Q540 48 600 58" fill="none" stroke="#60a5fa" stroke-width="18" stroke-linecap="round"/>`;
    s += `<path d="M60 400 Q90 320 70 250 Q50 170 110 80" fill="none" stroke="#60a5fa" stroke-width="16" stroke-linecap="round"/>`;
    s += `<path d="M0 190 L600 196 M300 0 L300 400 M120 0 L190 400 M430 0 L470 400" stroke="#ffffff" stroke-width="6" opacity=".9"/>`;
    s += `<path d="M215 232 L330 236" stroke="#f59e0b" stroke-width="8" stroke-linecap="round"/>`;
    s += `<ellipse cx="270" cy="290" rx="54" ry="34" fill="#86d07a" stroke="#4d7c0f" stroke-width="2"/><ellipse cx="275" cy="292" rx="22" ry="10" fill="#60a5fa"/>`;
    s += `<rect x="320" y="118" width="40" height="30" rx="6" fill="#86d07a" stroke="#4d7c0f" stroke-width="2"/>`;
    [[30, 330], [100, 360], [530, 360], [560, 150], [20, 200], [210, 380], [560, 270]].forEach(function (a) { s += arvore(a[0], a[1], 0.6); });
    s += `<text x="520" y="40" font-size="18" font-family="Arial" font-weight="bold" fill="#1e3a8a">N</text><path d="M528 46 L528 70 M520 54 L528 44 L536 54" stroke="#1e3a8a" stroke-width="3" fill="none"/>`;
    return s;
  });

  // ======================= PRAÇA DA ACESSIBILIDADE (400x260) =======================
  // estado: objeto com true nas melhorias já feitas { escada, piso, balanco, bebedouro }
  function praca(e) {
    e = e || {};
    let s = `<rect width="400" height="260" fill="#cfeefe"/>` + nuvem(240, 30) + `<rect x="0" y="120" width="400" height="140" fill="#86d07a"/>`;
    // árvore (distração)
    s += arvore(200, 150, 1.1);
    // caminho
    s += `<rect x="92" y="212" width="308" height="30" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>`;
    if (e.piso) { s += `<rect x="92" y="220" width="308" height="14" fill="#facc15" stroke="#a16207" stroke-width="1.5"/>`; for (let x = 100; x < 400; x += 10) s += `<circle cx="${x}" cy="227" r="2.2" fill="#a16207"/>`; }
    // entrada com escada (sempre) e rampa (melhoria)
    s += `<rect x="0" y="150" width="92" height="92" fill="#e7e5e4" stroke="#57534e" stroke-width="2"/><rect x="8" y="110" width="18" height="40" fill="#a8a29e" ${LF}/>`;
    s += `<path d="M30 242 L30 226 L46 226 L46 210 L62 210 L62 194 L92 194 L92 242 Z" fill="#a8a29e" stroke="#57534e" stroke-width="2"/>`;
    if (e.escada) s += `<path d="M0 242 L30 242 L0 194 Z" fill="none"/><path d="M92 194 L92 242 L4 242 Z" fill="none"/>` +
      `<path d="M0 200 L28 200 L28 242 L0 242 Z" fill="none"/>` + `<path d="M6 242 L6 236 L92 196 L92 206 L18 242 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>`;
    // bebedouro alto (problema) e baixo (melhoria)
    s += `<rect x="134" y="112" width="12" height="96" fill="#94a3b8" ${LF}/><rect x="126" y="100" width="28" height="16" rx="3" fill="#cbd5e1" ${LF}/><path d="M146 100 Q152 88 156 96" fill="none" stroke="#38bdf8" stroke-width="3"/>`;
    if (e.bebedouro) s += `<rect x="160" y="168" width="10" height="40" fill="#94a3b8" ${LF}/><rect x="154" y="158" width="24" height="12" rx="3" fill="#cbd5e1" ${LF}/><path d="M172 158 Q176 150 180 156" fill="none" stroke="#38bdf8" stroke-width="3"/>`;
    // banco (distração)
    s += banco(184, 198);
    // balanço
    s += `<path d="M232 210 L252 92 L272 210 M318 210 L338 92 L358 210 M252 92 L338 92" fill="none" stroke="#dc2626" stroke-width="6" stroke-linejoin="round"/>`;
    s += `<path d="M268 92 L268 160 M290 92 L290 160" stroke="#57534e" stroke-width="2"/><rect x="262" y="158" width="34" height="7" rx="2" fill="#2563eb" ${LF}/>`;
    if (e.balanco) s += `<path d="M302 92 L302 170 M334 92 L334 170" stroke="#57534e" stroke-width="2"/><rect x="298" y="166" width="40" height="22" rx="3" fill="#16a34a" ${LF}/>` +
      `<circle cx="318" cy="182" r="4" fill="none" stroke="#fff" stroke-width="2"/><path d="M316 170 L316 178 L324 178" fill="none" stroke="#fff" stroke-width="2"/>`;
    // flores (distração)
    s += flores(370, 190);
    // crianças
    if (e.escada) s += cadeirante(64, 206); else s += cadeirante(14, 248);
    return s;
  }
  function cadeirante(x, y) {
    return `<g transform="translate(${x} ${y})"><circle cx="0" cy="-8" r="10" fill="none" stroke="#1f2937" stroke-width="3"/><circle cx="12" cy="-3" r="4" fill="#1f2937"/>` +
      `<path d="M-6 -20 L-6 -36 M-6 -22 L8 -22 L12 -6" fill="none" stroke="#1f2937" stroke-width="3"/>` +
      `<path d="M-4 -24 L-4 -40 Q-2 -44 4 -44 L8 -30 L14 -28 L14 -18" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>` +
      `<circle cx="0" cy="-52" r="8" fill="#8d5524" ${LF}/><path d="M-8 -54 Q-6 -62 2 -61 Q8 -60 8 -54 Q0 -58 -8 -54Z" fill="#1b120c"/></g>`;
  }
  def("praca", "0 0 400 260", praca);

  // ======================= ESPAÇOS DE DIFERENTES CULTURAS (400x250) =======================
  def("culturaGuarani", "0 0 400 250", () => ceu("#dbeafe") + `<path d="M210 120 L290 30 L370 120 Z" fill="#6b8f5e" ${LF}/><path d="M290 30 L290 14" stroke="#64748b" stroke-width="3"/>` +
    chao(120, "#86d07a") + arvore(30, 140, 1.3, "#15803d") + arvore(80, 130, 1, "#16a34a") + arvore(380, 140, 1.2, "#15803d") +
    `<rect x="120" y="96" width="70" height="40" fill="#d6a46b" ${L}/><path d="M112 98 L155 70 L198 98 Z" fill="#a3a35a" ${L}/><rect x="146" y="112" width="18" height="24" fill="#7c4a1e" ${LF}/>` +
    `<rect x="220" y="104" width="90" height="36" fill="#fef3c7" ${L}/><path d="M214 104 L265 84 L316 104 Z" fill="#b45309" ${L}/><text x="265" y="126" font-size="12" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#3b2a1a">ESCOLA</text>` +
    pessoa(110, 220, 1.1, 8, "acima") + pessoa(170, 226, 1.1, 10, "normal") + pessoa(260, 222, 1.1, 9, "acima") + `<g transform="translate(200 160) scale(.36)">${R.peteca.f()}</g>` + pessoa(330, 228, 1.3, 10, "normal", { saia: true }));
  def("culturaCapoeira", "0 0 400 250", () => ceu("#fde68a") + chao(120, "#d6b98c") + `<ellipse cx="200" cy="190" rx="150" ry="44" fill="#e7d3a8" stroke="#a16207" stroke-width="2"/>` +
    pessoa(70, 180, 0.9, 3, "normal", { roupa: "#ffffff", baixo: "#ffffff" }) + pessoa(110, 160, 0.85, 6, "normal", { roupa: "#ffffff", baixo: "#ffffff" }) + pessoa(160, 150, 0.8, 1, "normal", { roupa: "#ffffff", baixo: "#ffffff", saia: false }) +
    pessoa(240, 150, 0.8, 9, "normal", { roupa: "#ffffff", baixo: "#ffffff" }) + pessoa(290, 160, 0.85, 4, "normal", { roupa: "#ffffff", baixo: "#ffffff" }) + pessoa(330, 180, 0.9, 5, "normal", { roupa: "#ffffff", baixo: "#ffffff", saia: false }) +
    pessoa(175, 218, 1.1, 11, "aberto", { roupa: "#ffffff", baixo: "#ffffff" }) + pessoa(228, 214, 1.1, 2, "acima", { roupa: "#ffffff", baixo: "#ffffff" }) +
    `<g transform="translate(40 120) scale(.7)">${R.berimbau.f()}</g>`);
  def("culturaBixiga", "0 0 400 250", () => ceu("#e0f2fe") + casarao(10, 80, "#fde68a") + casarao(140, 76, "#fca5a5") + casarao(270, 80, "#c7d2fe") + chao(126, "#a8a29e") +
    `<path d="M0 40 Q100 60 200 40 Q300 60 400 40" fill="none" stroke="#3b2a1a" stroke-width="1.5"/>` +
    [20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map(function (x, i) { return `<path d="M${x - 10} ${45 + Math.sin(i) * 2} L${x + 10} ${45 + Math.sin(i) * 2} L${x} ${62} Z" fill="${["#111111", "#ffffff", "#facc15", "#16a34a", "#dc2626"][i % 5]}" stroke="#3b2a1a" stroke-width="1"/>`; }).join("") +
    `<rect x="160" y="168" width="40" height="40" rx="6" fill="#f8fafc" ${L}/><ellipse cx="180" cy="168" rx="20" ry="6" fill="#e5e7eb" ${L}/><path d="M160 180 L200 196 M200 180 L160 196" stroke="#111" stroke-width="2"/>` +
    pessoa(110, 232, 1.1, 11, "acima", { roupa: "#111111" }) + pessoa(250, 232, 1.1, 3, "acima", { roupa: "#ffffff" }) + pessoa(320, 236, 1.1, 0, "aberto") + pessoa(60, 236, 1, 4, "normal"));
  def("culturaLiberdade", "0 0 400 250", () => ceu("#fef3c7") + predio(10, 40, 60, 110, "#e5e7eb") + predio(320, 30, 70, 120, "#d1d5db") + chao(150, "#a8a29e") +
    `<path d="M120 150 L120 60 M200 150 L200 60" stroke="#b91c1c" stroke-width="10"/><path d="M100 58 Q160 46 220 58 L220 68 L100 68 Z" fill="#b91c1c" ${LF}/><rect x="108" y="78" width="104" height="8" fill="#b91c1c"/>` +
    [250, 290].map(function (x) { return `<line x1="${x}" y1="150" x2="${x}" y2="70" stroke="#475569" stroke-width="4"/><path d="M${x - 14} 70 L${x + 14} 70 L${x + 10} 92 L${x - 10} 92 Z" fill="#ef4444" ${LF}/><circle cx="${x}" cy="66" r="4" fill="#ef4444" ${LF}/>`; }).join("") +
    `<path d="M40 250 Q50 160 70 120" fill="none" stroke="#65a30d" stroke-width="5"/>` +
    [[52, 160, "#f472b6"], [58, 186, "#60a5fa"], [64, 140, "#facc15"], [46, 210, "#4ade80"], [70, 168, "#a78bfa"]].map(function (t) { return `<rect x="${t[0]}" y="${t[1]}" width="10" height="20" fill="${t[2]}" stroke="#3b2a1a" stroke-width="1"/>`; }).join("") +
    pessoa(150, 236, 1.1, 7, "acima") + pessoa(200, 236, 1, 5, "normal") + pessoa(330, 238, 1.1, 12, "normal"));
  def("culturaKantuta", "0 0 400 250", () => ceu("#dbeafe") + chao(110, "#d6c7a1") + arvore(380, 120, 1) +
    [[20, "#dc2626"], [140, "#facc15"], [260, "#16a34a"]].map(function (b) {
      return `<rect x="${b[0]}" y="84" width="100" height="56" fill="#fef3c7" ${L}/><path d="M${b[0] - 6} 84 L${b[0] + 106} 84 L${b[0] + 96} 66 L${b[0] + 4} 66 Z" fill="${b[1]}" ${L}/>`;
    }).join("") +
    `<rect x="30" y="100" width="80" height="14" fill="#dc2626"/><rect x="30" y="114" width="80" height="6" fill="#facc15"/><rect x="30" y="120" width="80" height="8" fill="#16a34a"/><rect x="30" y="128" width="80" height="4" fill="#7c3aed"/>` +
    `<circle cx="170" cy="112" r="10" fill="#f59e0b" ${LF}/><circle cx="196" cy="114" r="10" fill="#fde68a" ${LF}/><circle cx="220" cy="110" r="9" fill="#ea580c" ${LF}/>` +
    `<path d="M280 106 L340 106 L336 130 L284 130 Z" fill="#a16207" ${LF}/>` +
    pessoa(80, 228, 1.1, 10, "acima", { longo: false, roupa: "#dc2626", saia: true }) + pessoa(140, 232, 1.1, 9, "aberto") + pessoa(230, 230, 1.1, 5, "acima") + pessoa(310, 234, 1.3, 13, "normal", { roupa: "#16a34a" }));
  def("culturaMuseuAfro", "0 0 400 250", () => ceu("#bfdbfe") + chao(150, "#7cc96e") + arvore(30, 160, 1.2) + arvore(370, 160, 1.2) +
    `<rect x="80" y="60" width="240" height="100" fill="#f5f5f4" ${L}/><path d="M70 60 L330 60 L330 48 L70 48 Z" fill="#78716c" ${L}/>` +
    `<text x="200" y="82" font-size="14" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#1f2937">MUSEU AFRO BRASIL</text>` +
    `<rect x="100" y="94" width="50" height="40" fill="#fbbf24" ${LF}/><path d="M108 126 L118 104 L128 120 L138 100 L146 126 Z" fill="#b45309"/>` +
    `<rect x="250" y="94" width="50" height="40" fill="#f97316" ${LF}/><circle cx="275" cy="114" r="12" fill="none" stroke="#111" stroke-width="4"/><circle cx="275" cy="114" r="5" fill="#111"/>` +
    `<rect x="180" y="100" width="40" height="60" fill="#7c4a1e" ${L}/>` +
    pessoa(130, 230, 1.1, 11, "normal") + pessoa(200, 236, 1.2, 13, "normal", { roupa: "#ea580c" }) + pessoa(250, 232, 1, 2, "acima") + pessoa(300, 230, 1, 4, "normal"));
  def("culturaImigracao", "0 0 400 250", () => ceu("#e0f2fe") + chao(150, "#d6d3d1") +
    `<rect x="40" y="60" width="320" height="96" fill="#fca5a5" ${L}/><rect x="170" y="36" width="60" height="30" fill="#fca5a5" ${L}/><circle cx="200" cy="50" r="9" fill="#fff" ${LF}/><path d="M200 50 L200 44 M200 50 L205 52" stroke="#3b2a1a" stroke-width="1.5"/>` +
    [60, 100, 140, 240, 280, 320].map(function (x) { return `<rect x="${x}" y="74" width="20" height="26" fill="#fef3c7" ${LF}/><rect x="${x}" y="114" width="20" height="26" fill="#fef3c7" ${LF}/>`; }).join("") +
    `<rect x="182" y="104" width="36" height="52" fill="#7c4a1e" ${L}/><text x="200" y="98" font-size="12" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#3b2a1a">MUSEU</text>` +
    `<path d="M0 238 L400 238 M0 246 L400 246" stroke="#57534e" stroke-width="3"/>` + [10, 40, 70, 100, 130, 160, 190, 220, 250, 280, 310, 340, 370].map(function (x) { return `<rect x="${x}" y="234" width="6" height="16" fill="#78350f"/>`; }).join("") +
    pessoa(110, 220, 1.2, 12, "normal") + pessoa(140, 222, 1.1, 13, "normal", { longo: true }) + pessoa(170, 224, 0.9, 4, "normal") +
    `<rect x="84" y="206" width="16" height="14" rx="2" fill="#92400e" ${LF}/><rect x="186" y="210" width="16" height="14" rx="2" fill="#92400e" ${LF}/>` + pessoa(300, 224, 1, 7, "acima"));

  // Cenas dos grupos que ensinam brincadeiras (2º ano)
  function cenaGrupo(g) {
    let s = (g.antigo ? `<rect width="400" height="250" fill="#f5e6c8"/>` : ceu("#dbeafe")) + chao(150, g.antigo ? "#d6c3a0" : "#a7d08a");
    s += `<circle cx="200" cy="80" r="62" fill="#ffffff" opacity=".75"/><g transform="translate(150 30)">${R[g.desenho] ? R[g.desenho].f() : ""}</g>`;
    const n = g.pessoas.length;
    g.pessoas.forEach(function (p, i) {
      const x = n === 1 ? 200 : 60 + i * (280 / (n - 1));
      s += pessoa(x, 238, 1.5, p, i % 2 ? "acima" : "normal");
    });
    return s;
  }

  // Cenas do Modo Calmo (sem brilhos nem giros)
  def("cenaBauCalmo", "0 0 400 250", () => `<rect width="400" height="250" fill="#6b4a3a"/><rect x="0" y="200" width="400" height="50" fill="#a07850"/>` + bau(200, 214, 1.1, false) + pessoa(330, 228, 1.4, 2, "normal"));
  def("cenaImaginar", "0 0 400 250", () => `<rect width="400" height="250" fill="#f3ece2"/><rect x="0" y="200" width="400" height="50" fill="#c9b08a"/>` + bau(110, 222, 0.8, true) + pessoa(200, 232, 1.4, 2, "normal") +
    `<circle cx="222" cy="128" r="5" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><circle cx="238" cy="110" r="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>` +
    `<ellipse cx="310" cy="70" rx="80" ry="58" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>` +
    `<g style="filter:sepia(.6)">${pessoa(290, 116, 0.95, 1, "normal")}<g transform="translate(318 74) scale(.34)">${R.piao.f()}</g></g>`);
  def("cenaMuseuCalmo", "0 0 400 250", () => `<rect width="400" height="250" fill="#f7f1e3"/><rect x="0" y="200" width="400" height="50" fill="#d9c7a3"/>` +
    `<rect x="20" y="40" width="110" height="10" fill="#a16207" ${LF}/><rect x="270" y="40" width="110" height="10" fill="#a16207" ${LF}/><rect x="20" y="110" width="110" height="10" fill="#a16207" ${LF}/><rect x="270" y="110" width="110" height="10" fill="#a16207" ${LF}/>` +
    `<g transform="translate(28 -4) scale(.44)">${R.peteca.f()}</g><g transform="translate(78 -4) scale(.44)">${R.piao.f()}</g><g transform="translate(278 -4) scale(.44)">${R.kendama.f()}</g><g transform="translate(328 -4) scale(.44)">${R.pipa.f()}</g>` +
    `<g transform="translate(28 66) scale(.44)">${R.bonecaPano.f()}</g><g transform="translate(78 66) scale(.44)">${R.carrinhoLata.f()}</g><g transform="translate(278 66) scale(.44)">${R.oware.f()}</g><g transform="translate(328 66) scale(.44)">${R.tsuru.f()}</g>` +
    bau(200, 228, 0.85, true) + pessoa(330, 240, 1.3, 5, "normal"));
  def("iconeAcessibilidade", "0 0 24 24", () => `<circle cx="12" cy="12" r="10" ${I}/><circle cx="12" cy="7" r="1.6" fill="currentColor"/><path d="M7 10 L17 10 M12 10 L12 14 L9 19 M12 14 L15 19" ${I}/>`);
  def("iconeVoz", "0 0 24 24", () => `<circle cx="9" cy="8" r="4" ${I}/><path d="M2 21 Q2 14 9 14 Q16 14 16 21" ${I}/><path d="M18 6 Q20 8.5 18 11 M20.5 4 Q24 8.5 20.5 13" ${I}/>`);
  def("iconeCalmo", "0 0 24 24", () => `<path d="M12 21 Q4 15 4 9 Q4 4 8.5 4 Q11 4 12 6.5 Q13 4 15.5 4 Q20 4 20 9 Q20 15 12 21 Z" ${I}/>`);
  def("iconeLetras", "0 0 24 24", () => `<path d="M2 19 L7 5 L12 19 M4 14 L10 14 M14 19 L17.5 10 L21 19 M15.2 16 L19.8 16" ${I}/>`);
  def("iconeContraste", "0 0 24 24", () => `<circle cx="12" cy="12" r="9.5" ${I}/><path d="M12 2.5 A9.5 9.5 0 0 1 12 21.5 Z" fill="currentColor"/>`);
  def("iconeParado", "0 0 24 24", () => `<rect x="4" y="4" width="16" height="16" rx="3" ${I}/><path d="M9 9 L15 15 M15 9 L9 15" ${I}/>`);

  // ---------- Função pública ----------
  function desenhar(nome, extra) {
    if (nome === "grupo") return `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="${extra && extra.antigo ? "antiga" : ""}">${cenaGrupo(extra)}</svg>`;
    const d = R[nome];
    if (!d) return `<svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="12" fill="#e5e7eb"/><text x="50" y="62" font-size="40" text-anchor="middle" fill="#6b7280">?</text></svg>`;
    return `<svg viewBox="${d.vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${d.f(extra)}</svg>`;
  }
  function existe(nome) { return !!R[nome]; }

  return { desenhar: desenhar, existe: existe };
})();
