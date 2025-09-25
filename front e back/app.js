// Verificar login
const token = localStorage.getItem("curso_token");
if (!token) {
  alert("Você precisa estar logado.");
  window.location.href = "login.html";
}

// Função salvar progresso no backend
async function salvarProgresso(modulo, aulas, quiz) {
  try {
    await fetch("http://localhost:4000/api/progresso", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ modulo, aulas, quiz })
    });
  } catch (err) {
    console.error("Erro ao salvar progresso:", err);
  }
}

// Função carregar progresso
async function carregarProgresso() {
  try {
    const res = await fetch("http://localhost:4000/api/progresso", {
      headers: { "Authorization": "Bearer " + token }
    });
    const progresso = await res.json();
    document.getElementById("progressoResumo").innerHTML = `
      <h3>Resumo</h3>
      <ul>
        ${progresso.map(p => `<li>${p.modulo}: ${p.aulas} aulas, Quiz: ${p.quiz}%</li>`).join("")}
      </ul>
    `;
  } catch (err) {
    console.error(err);
  }
}

// Logout
document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
