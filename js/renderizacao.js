export function renderizarTarefas(tarefas) {
  document.querySelectorAll(".coluna ul").forEach((lista) => {
    lista.replaceChildren();
  });

  tarefas.forEach((tarefa) => {
    const item = document.createElement("li");
    const cartao = document.createElement("article");
    const titulo = document.createElement("h3");
    const detalhes = [
      `Projeto: ${tarefa.projeto}`,
      `Responsável: ${tarefa.responsavel}`,
      `Prazo: ${tarefa.prazo}`,
      `Prioridade: ${tarefa.prioridade}`,
    ];
    const botao = document.createElement("button");

    titulo.textContent = tarefa.titulo;
    cartao.appendChild(titulo);

    detalhes.forEach((texto) => {
      const paragrafo = document.createElement("p");
      paragrafo.textContent = texto;
      cartao.appendChild(paragrafo);
    });

    botao.type = "button";
    botao.className = "botao-tarefa";
    botao.dataset.id = tarefa.id;
    botao.textContent = "Selecionar tarefa";
    cartao.appendChild(botao);

    item.appendChild(cartao);
    document.getElementById(`lista-${tarefa.status}`).appendChild(item);
  });
}
