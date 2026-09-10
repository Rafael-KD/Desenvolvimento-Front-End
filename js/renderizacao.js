export function renderizarTarefas(tarefas) {
  document.querySelectorAll(".coluna ul").forEach((lista) => {
    lista.replaceChildren();
  });

  tarefas.forEach((tarefa) => {
    const item = document.createElement("li");
    const cartao = document.createElement("article");
    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;
    cartao.appendChild(titulo);

    const detalhes = [
      `Projeto: ${tarefa.projeto}`,
      `Responsável: ${tarefa.responsavel}`,
      `Prazo: ${tarefa.prazo}`,
      `Prioridade: ${tarefa.prioridade}`,
    ];

    detalhes.forEach((texto) => {
      const paragrafo = document.createElement("p");
      paragrafo.textContent = texto;
      cartao.appendChild(paragrafo);
    });

    item.appendChild(cartao);
    document.getElementById(`lista-${tarefa.status}`).appendChild(item);
  });
}
