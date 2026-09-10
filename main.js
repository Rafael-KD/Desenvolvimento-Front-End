import { carregarTarefas } from "./api.js";
import { estado, renderizarEstado } from "./estados.js";


function configurarEventos() {
  const campoBusca = document.getElementById("campo-busca");
  const filtroStatus = document.getElementById("filtro-status");
  const filtroPrioridade = document.getElementById("filtro-prioridade");
  const filtroOrdenacao = document.getElementById("filtro-ordenacao");
  const botaoLimpar = document.getElementById("botao-limpar");
  const formulario = document.querySelector("form");


  if (formulario) {
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
    });
  }


  if (campoBusca) {
    campoBusca.addEventListener("input", (e) => {
      estado.busca = e.target.value;
      renderizarEstado(estado);
    });
  }


  if (filtroStatus) {
    filtroStatus.addEventListener("change", (e) => {
      estado.status = e.target.value;
      renderizarEstado(estado);
    });
  }


  if (filtroPrioridade) {
    filtroPrioridade.addEventListener("change", (e) => {
      estado.prioridade = e.target.value;
      renderizarEstado(estado);
    });
  }


  if (filtroOrdenacao) {
    filtroOrdenacao.addEventListener("change", (e) => {
      estado.ordenacao = e.target.value;
      renderizarEstado(estado);
    });
  }


  if (botaoLimpar) {
    botaoLimpar.addEventListener("click", () => {
      
      estado.busca = "";
      estado.status = "Todos";
      estado.prioridade = "Todas";
      estado.ordenacao = "padrao";

     
      if (campoBusca) campoBusca.value = "";
      if (filtroStatus) filtroStatus.value = "Todos";
      if (filtroPrioridade) filtroPrioridade.value = "Todas";
      if (filtroOrdenacao) filtroOrdenacao.value = "padrao";

      renderizarEstado(estado);
    });
  }
}


async function iniciar() {
  estado.carregamento = true;
  estado.erro = null;
  renderizarEstado(estado);

  try {
    const tarefas = await carregarTarefas();

    estado.tarefas = tarefas;
    estado.carregamento = false;
    renderizarEstado(estado);
    
   
    configurarEventos();

  } catch (erro) {
    estado.carregamento = false;

    if (erro.name === "TypeError") {
      estado.erro = "Erro de rede. Verifique a conexão e se o servidor está disponível.";
    } else if (erro.name === "SyntaxError") {
      estado.erro = "Erro de formato. Verifique o conteúdo do arquivo dados.json.";
    } else if (erro.status) {
      estado.erro = `Erro HTTP ${erro.status}. Não foi possível obter o arquivo de tarefas.`;
    } else {
      estado.erro = "Não foi possível carregar as tarefas.";
    }

    renderizarEstado(estado);
  }
}

iniciar();