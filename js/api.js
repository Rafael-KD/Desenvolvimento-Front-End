export async function carregarTarefas() {
  const resposta = await fetch("./dados.json");

  if (!resposta.ok) {
    const erro = new Error(`Falha HTTP: ${resposta.status}`);
    erro.status = resposta.status;
    throw erro;
  }

  const dados = await resposta.json();

  if (!dados || !Array.isArray(dados.tarefas)) {
    throw new SyntaxError('O JSON deve conter um array chamado "tarefas".');
  }

  return dados.tarefas;
}
