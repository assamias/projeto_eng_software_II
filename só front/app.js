// Lógica do app (SPA simples com LocalStorage para progresso)
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const VIEWS = {
  home: $("#homeView"),
  aula: $("#aulaView"),
  quiz: $("#quizView"),
  biblioteca: $("#bibliotecaView"),
  progresso: $("#progressoView")
};

const state = {
  moduleIndex: 0,
  lessonIndex: 0,
  quizAnswers: {}
};

// ----- Navegação de views -----
function showView(name) {
  Object.values(VIEWS).forEach(v => v.classList.remove("active"));
  VIEWS[name].classList.add("active");
}

$("#btnHome").addEventListener("click", ()=> showView("home"));
$("#btnBiblioteca").addEventListener("click", ()=> showView("biblioteca"));
$("#btnProgresso").addEventListener("click", ()=> { renderProgresso(); showView("progresso"); });

$("#btnComecar").addEventListener("click", () => {
  state.moduleIndex = 0;
  state.lessonIndex = 0;
  openLesson();
  showView("aula");
});

$("#voltarLista").addEventListener("click", ()=> showView("home"));
$("#voltarAula").addEventListener("click", ()=> showView("aula"));

// ----- Renderização da Home -----
function renderHome() {
  const grid = $("#modulosGrid");
  grid.innerHTML = "";
  COURSE.modules.forEach((m, idx) => {
    const card = document.createElement("div");
    card.className = "card module-card";
    const done = getModuleProgress(idx) >= m.lessons.length;
    card.innerHTML = `
      <h4>${idx+1}. ${m.title}</h4>
      <p>${m.minutes} min • ${m.lessons.length} aulas • Quiz</p>
      <div class="progress-wrap" aria-label="Progresso do módulo">
        <div class="progress-bar" style="width:${Math.min(100, Math.round(getModuleProgressPercent(idx)))}%"></div>
      </div>
      <div style="margin-top:10px; display:flex; gap:8px;">
        <button class="btn btn-primary" data-open="${idx}">${done ? "Rever módulo" : "Iniciar módulo"}</button>
        <button class="btn" data-open-quiz="${idx}">Quiz</button>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.addEventListener("click", (e)=> {
    const btn = e.target.closest("button");
    if (!btn) return;
    if (btn.dataset.open !== undefined) {
      state.moduleIndex = Number(btn.dataset.open);
      state.lessonIndex = 0;
      openLesson();
      showView("aula");
    } else if (btn.dataset.openQuiz !== undefined) {
      state.moduleIndex = Number(btn.dataset.openQuiz);
      openQuiz();
      showView("quiz");
    }
  });
}

// ----- Aula -----
function openLesson() {
  const mod = COURSE.modules[state.moduleIndex];
  const les = mod.lessons[state.lessonIndex];
  $("#aulaTitulo").textContent = `${mod.title} — ${les.title}`;
  $("#aulaConteudo").innerHTML = les.html;

  // progresso barra
  const total = mod.lessons.length;
  const progress = Math.min(getModuleProgressPercent(state.moduleIndex), ((state.lessonIndex)/total)*100);
  $("#progressBar").style.width = `${progress}%`;

  // botões
  $("#btnAnterior").disabled = state.lessonIndex === 0;
  $("#btnProxima").disabled = state.lessonIndex === total - 1;
}

$("#btnAnterior").addEventListener("click", ()=>{
  if (state.lessonIndex > 0) state.lessonIndex--;
  openLesson();
});
$("#btnProxima").addEventListener("click", ()=>{
  const mod = COURSE.modules[state.moduleIndex];
  if (state.lessonIndex < mod.lessons.length - 1) state.lessonIndex++;
  markLessonDone(state.moduleIndex, state.lessonIndex); // marca leitura
  openLesson();
});
$("#btnQuiz").addEventListener("click", ()=>{
  openQuiz();
  showView("quiz");
});

// ----- Quiz -----
function openQuiz() {
  const mod = COURSE.modules[state.moduleIndex];
  $("#quizTitulo").textContent = `Quiz — ${mod.title}`;
  const form = $("#quizForm");
  form.innerHTML = "";

  mod.quiz.forEach((item, qi)=>{
    const qDiv = document.createElement("div");
    qDiv.className = "q";
    qDiv.innerHTML = `<h5>${qi+1}. ${item.q}</h5>`;

    item.a.forEach((alt, ai)=>{
      const id = `q${qi}a${ai}`;
      const opt = document.createElement("label");
      opt.innerHTML = `<input type="radio" name="q${qi}" value="${ai}" id="${id}" /> ${alt}`;
      qDiv.appendChild(opt);
    });
    form.appendChild(qDiv);
  });

  $("#quizResultado").textContent = "";
}

$("#btnEnviarQuiz").addEventListener("click", ()=>{
  const mod = COURSE.modules[state.moduleIndex];
  let score = 0;
  let total = mod.quiz.length;

  mod.quiz.forEach((item, qi)=>{
    const checked = document.querySelector(`input[name="q${qi}"]:checked`);
    if (checked && Number(checked.value) === item.correct) score++;
  });

  const pct = Math.round((score/total)*100);
  $("#quizResultado").textContent = `Você acertou ${score}/${total} (${pct}%).`;
  saveQuizScore(state.moduleIndex, pct);
  // auto-marcar módulo concluído se todos os quizzes e lições foram vistos
  if (getModuleProgress(state.moduleIndex) >= mod.lessons.length) markModuleDone(state.moduleIndex);
});

$("#btnRefazer").addEventListener("click", ()=> openQuiz());

// ----- Progresso (LocalStorage) -----
const KEY = "curso_diversidade_progress_v1";

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { lessonsDone: {}, quiz: {}, modulesDone: {} };
  } catch {
    return { lessonsDone: {}, quiz: {}, modulesDone: {} };
  }
}

function setProgress(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

function lessonKey(modIdx, lesIdx) { return `m${modIdx}:l${lesIdx}`; }
function moduleKey(modIdx) { return `m${modIdx}`; }

function markLessonDone(modIdx, lesIdx) {
  const p = getProgress();
  p.lessonsDone[lessonKey(modIdx, lesIdx)] = true;
  setProgress(p);
}

function getModuleProgress(modIdx) {
  const p = getProgress();
  const total = COURSE.modules[modIdx].lessons.length;
  let done = 0;
  for (let i=0;i<total;i++){
    if (p.lessonsDone[lessonKey(modIdx, i)]) done++;
  }
  return done;
}

function getModuleProgressPercent(modIdx) {
  const total = COURSE.modules[modIdx].lessons.length;
  const done = getModuleProgress(modIdx);
  return (done/total)*100;
}

function saveQuizScore(modIdx, pct) {
  const p = getProgress();
  p.quiz[moduleKey(modIdx)] = Math.max(p.quiz[moduleKey(modIdx)] || 0, pct);
  setProgress(p);
}

function getQuizScore(modIdx) {
  const p = getProgress();
  return p.quiz[moduleKey(modIdx)] || 0;
}

function markModuleDone(modIdx) {
  const p = getProgress();
  p.modulesDone[moduleKey(modIdx)] = true;
  setProgress(p);
}

function isModuleDone(modIdx) {
  const p = getProgress();
  return !!p.modulesDone[moduleKey(modIdx)];
}

function overallProgress() {
  const totalLessons = COURSE.modules.reduce((acc,m)=> acc + m.lessons.length, 0);
  const doneLessons = COURSE.modules.reduce((acc,m,mi)=> acc + getModuleProgress(mi), 0);
  const avgQuiz = Math.round(COURSE.modules.reduce((acc,m,mi)=> acc + getQuizScore(mi), 0)/COURSE.modules.length);
  const modulesDone = COURSE.modules.reduce((acc,_,mi)=> acc + (isModuleDone(mi)?1:0), 0);
  return { totalLessons, doneLessons, avgQuiz, modulesDone, totalModules: COURSE.modules.length };
}

function renderProgresso() {
  const res = overallProgress();
  const el = $("#progressoResumo");
  const pctLessons = Math.round((res.doneLessons/res.totalLessons)*100);
  el.innerHTML = `
    <h3>Resumo</h3>
    <p>Aulas concluídas: <strong>${res.doneLessons}/${res.totalLessons}</strong> (${pctLessons}%).</p>
    <p>Módulos concluídos: <strong>${res.modulesDone}/${res.totalModules}</strong>.</p>
    <p>Média de quizzes: <strong>${res.avgQuiz}%</strong>.</p>
    <div class="progress-wrap" aria-label="Progresso geral">
      <div class="progress-bar" style="width:${pctLessons}%"></div>
    </div>
    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn" onclick="resetarProgresso()">Zerar progresso</button>
      <button class="btn btn-accent" onclick="gerarCertificado()">Gerar certificado</button>
    </div>
  `;
}

function resetarProgresso() {
  localStorage.removeItem(KEY);
  renderHome();
  renderProgresso();
  alert("Progresso zerado.");
}

// Certificado simples (gera um arquivo HTML para impressão/salvar em PDF)
function gerarCertificado() {
  const res = overallProgress();
  if (res.modulesDone < res.totalModules || res.avgQuiz < 60) {
    alert("Para gerar o certificado, conclua todos os módulos e alcance média de 60% nos quizzes.");
    return;
  }
  const nome = prompt("Digite seu nome para o certificado:", "Estudante");
  if (!nome) return;
  const certHTML = `<!doctype html>
  <html lang="pt-br"><head><meta charset="utf-8"><title>Certificado</title>
  <style>
    body{font-family: Inter, Arial, sans-serif; background:#f8fafc; color:#0b0f14; padding:40px;}
    .cert{border:10px double #1b3b6b; padding:40px; max-width:900px; margin:0 auto; background:white;}
    h1{margin:0 0 16px; font-size:34px;}
    h2{margin:0 0 24px; color:#1b3b6b;}
    p{font-size:18px; line-height:1.6;}
    .small{color:#475569; font-size:14px;}
  </style></head><body>
  <div class="cert">
    <h1>Certificado de Conclusão</h1>
    <h2>Diversidade na Educação, Gestão e Movimentos Sociais</h2>
    <p>Certificamos que <strong>${nome}</strong> concluiu o curso, cumprindo todas as aulas e alcançando média de quizzes de ${res.avgQuiz}%.</p>
    <p class="small">Gerado automaticamente — imprima ou salve como PDF.</p>
  </div>
  </body></html>`;
  const blob = new Blob([certHTML], {type:"text/html"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "certificado.html";
  a.click();
  URL.revokeObjectURL(url);
}

// Inicialização
renderHome();
showView("home");
