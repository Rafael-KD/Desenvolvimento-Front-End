import { renderizarTarefas } from "./renderizacao.js";

// ETAPA 1: Objeto de estado único da aplicação
export const estado = {
  tarefas: [],         // Array canônico vindo do dados.json
  busca: '',           // Texto da busca por título
  status: 'Todos',     // Filtro de status
  prioridade: 'Todas', // Filtro de prioridade
  ordenacao: 'padrao', // Critério de ordenação
  carregamento: false, // Booleano para estado de carregamento
  erro: null           // Mensagem de erro ou null
};

// ETAPA 2: Função de derivação (não altera o array original nem o DOM)
export function obterTarefasFiltradas(estadoAtual) {
  let resultado = [...estadoAtual.tarefas];

  // A. Filtro por Busca (título, case-insensitive)
  if (estadoAtual.busca.trim() !== '') {
    const termo = estadoAtual.busca.toLowerCase();
    resultado = resultado.filter(t => t.titulo.toLowerCase().includes(termo));
  }

  // B. Filtro por Status
  if (estadoAtual.status !== 'Todos') {
    resultado = resultado.filter(t => t.status === estadoAtual.status);
  }

  // C. Filtro por Prioridade
  if (estadoAtual.prioridade !== 'Todas') {
    resultado = resultado.filter(t => t.prioridade === estadoAtual.prioridade);
  }

  // D. Ordenação por Prazo
  if (estadoAtual.ordenacao === 'prazo') {
    resultado.sort((a, b) => new Date(a.prazo) - new Date(b.prazo));
  }

  return resultado;
}

// ETAPA 3 e 5: Ponto único de renderização adaptado para o objeto de estado
export function renderizarEstado(estadoAtual) {
  const mensagem = document.getElementById("status-tarefas");
  const tarefasFiltradas = obterTarefasFiltradas(estadoAtual);

  const totalOrigem = estadoAtual.tarefas.length;
  const totalFiltrado = tarefasFiltradas.length;

  // Controla a visibilidade dos containers/colunas
  const deveExibirColunas = !estadoAtual.carregamento && !estadoAtual.erro && totalOrigem > 0;
  
  document.querySelectorAll(".coluna").forEach((coluna) => {
    coluna.hidden = !deveExibirColunas;
  });

  // Trata os estados de exibição
  if (estadoAtual.carregamento) {
    mensagem.textContent = "Carregando tarefas...";
  } else if (estadoAtual.erro) {
    mensagem.textContent = `Erro ao carregar tarefas: ${estadoAtual.erro}`;
  } else if (totalOrigem === 0) {
    mensagem.textContent = "Não há nenhuma tarefa cadastrada na origem.";
  } else if (totalFiltrado === 0) {
    mensagem.textContent = "Nenhuma tarefa encontrada para os filtros selecionados.";
    renderizarTarefas([]); // Limpa os cartões da tela
  } else {
    renderizarTarefas(tarefasFiltradas);
    mensagem.textContent = `${totalFiltrado} de ${totalOrigem} tarefas exibiadas.`;
  }
}