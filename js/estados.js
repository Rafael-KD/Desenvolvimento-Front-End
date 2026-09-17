import { renderizarTarefas } from "./renderizacao.js";

export const estado = {
  tarefas: [],
  busca: "",
  status: "Todos",
  prioridade: "Todas",
  ordenacao: "padrao",
  carregamento: false,
  erro: null,
};

export function obterTarefasFiltradas(estadoAtual) {
  let resultado = [...estadoAtual.tarefas];

  if (estadoAtual.busca.trim() !== "") {
    const termo = estadoAtual.busca.toLowerCase();
    resultado = resultado.filter((t) => t.titulo.toLowerCase().includes(termo));
  }

  if (estadoAtual.status !== "Todos") {
    resultado = resultado.filter((t) => t.status === estadoAtual.status);
  }

  if (estadoAtual.prioridade !== "Todas") {
    resultado = resultado.filter(
      (t) => t.prioridade === estadoAtual.prioridade,
    );
  }

  if (estadoAtual.ordenacao === "prazo") {
    resultado.sort((a, b) => new Date(a.prazo) - new Date(b.prazo));
  }

  return resultado;
}

export function renderizarEstado(estadoAtual) {
  const mensagem = document.getElementById("status-tarefas");
  const tarefasFiltradas = obterTarefasFiltradas(estadoAtual);

  const totalOrigem = estadoAtual.tarefas.length;
  const totalFiltrado = tarefasFiltradas.length;

  const deveExibirColunas =
    !estadoAtual.carregamento && !estadoAtual.erro && totalOrigem > 0;

  document.querySelectorAll(".coluna").forEach((coluna) => {
    coluna.hidden = !deveExibirColunas;
  });

  if (estadoAtual.carregamento) {
    mensagem.textContent = "Carregando tarefas...";
  } else if (estadoAtual.erro) {
    mensagem.textContent = `Erro ao carregar tarefas: ${estadoAtual.erro}`;
  } else if (totalOrigem === 0) {
    mensagem.textContent = "Não há nenhuma tarefa cadastrada na origem.";
  } else if (totalFiltrado === 0) {
    mensagem.textContent =
      "Nenhuma tarefa encontrada para os filtros selecionados.";
    renderizarTarefas([]);
  } else {
    renderizarTarefas(tarefasFiltradas);
    mensagem.textContent = `${totalFiltrado} de ${totalOrigem} tarefas exibiadas.`;
  }
}
