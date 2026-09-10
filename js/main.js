import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";

async function iniciar() {
  renderizarEstado("carregando");

  try {
    const tarefas = await carregarTarefas();

    if (tarefas.length === 0) {
      renderizarEstado("vazio");
    } else {
      renderizarEstado("sucesso", tarefas);
    }
  } catch (erro) {
    let mensagem;

    if (erro.name === "TypeError") {
      mensagem =
        "Erro de rede. Verifique a conexão e se o servidor está disponível.";
    } else if (erro.name === "SyntaxError") {
      mensagem = "Erro de formato. Verifique o conteúdo do arquivo dados.json.";
    } else if (erro.status) {
      mensagem = `Erro HTTP ${erro.status}. Não foi possível obter o arquivo de tarefas.`;
    } else {
      mensagem = "Não foi possível carregar as tarefas.";
    }

    renderizarEstado("erro", mensagem);
  }
}

// Busca e filtros ainda não operam nesta entrega.
document.querySelector("form").addEventListener("submit", (evento) => {
  evento.preventDefault();
});

iniciar();
