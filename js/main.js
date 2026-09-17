import { carregarTarefas } from "./api.js";
import { estado, renderizarEstado } from "./estados.js";

function configurarEventos() {
  const campoBusca = document.getElementById("campo-busca");
  const filtroStatus = document.getElementById("filtro-status");
  const filtroPrioridade = document.getElementById("filtro-prioridade");
  const filtroOrdenacao = document.getElementById("filtro-ordenacao");
  const botaoLimpar = document.getElementById("botao-limpar");
  const formulario = document.getElementById("filtros");
  const areaTarefas = document.querySelector("main");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });

  campoBusca.addEventListener("input", (evento) => {
    estado.busca = evento.target.value;
    renderizarEstado(estado);
  });

  filtroStatus.addEventListener("change", (evento) => {
    estado.status = evento.target.value;
    renderizarEstado(estado);
  });

  filtroPrioridade.addEventListener("change", (evento) => {
    estado.prioridade = evento.target.value;
    renderizarEstado(estado);
  });

  filtroOrdenacao.addEventListener("change", (evento) => {
    estado.ordenacao = evento.target.value;
    renderizarEstado(estado);
  });

  botaoLimpar.addEventListener("click", () => {
    estado.busca = "";
    estado.status = "Todos";
    estado.prioridade = "Todas";
    estado.ordenacao = "padrao";
    estado.tarefaSelecionada = null;

    campoBusca.value = "";
    filtroStatus.value = "Todos";
    filtroPrioridade.value = "Todas";
    filtroOrdenacao.value = "padrao";

    renderizarEstado(estado);
  });

  areaTarefas.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".botao-tarefa");

    if (!botao) {
      return;
    }

    const tarefa = estado.tarefas.find(
      (item) => item.id === Number(botao.dataset.id)
    );

    if (tarefa) {
      estado.tarefaSelecionada = tarefa.id;
      renderizarEstado(estado);
    }
  });
}

async function iniciar() {
  estado.carregamento = true;
  estado.erro = null;
  renderizarEstado(estado);

  try {
    estado.tarefas = await carregarTarefas();
    estado.carregamento = false;
    renderizarEstado(estado);
    configurarEventos();
  } catch (erro) {
    estado.carregamento = false;

    if (erro.name === "TypeError") {
      estado.erro =
        "Erro de rede. Verifique a conexão e se o servidor está disponível.";
    } else if (erro.name === "SyntaxError") {
      estado.erro =
        "Erro de formato. Verifique o conteúdo do arquivo dados.json.";
    } else if (erro.status) {
      estado.erro =
        `Erro HTTP ${erro.status}. Não foi possível obter o arquivo de tarefas.`;
    } else {
      estado.erro = "Não foi possível carregar as tarefas.";
    }

    renderizarEstado(estado);
  }
}

iniciar();
