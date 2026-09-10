import { renderizarTarefas } from "./renderizacao.js";

export function renderizarEstado(estado, dados) {
  const mensagem = document.getElementById("status-tarefas");

  document.querySelectorAll(".coluna").forEach((coluna) => {
    coluna.hidden = estado !== "sucesso";
  });

  switch (estado) {
    case "carregando":
      mensagem.textContent = "Carregando tarefas...";
      break;
    case "sucesso":
      renderizarTarefas(dados);
      mensagem.textContent = `${dados.length} tarefas carregadas.`;
      break;
    case "vazio":
      mensagem.textContent = "Não há tarefas para exibir.";
      break;
    case "erro":
      mensagem.textContent = dados;
      break;
  }
}
