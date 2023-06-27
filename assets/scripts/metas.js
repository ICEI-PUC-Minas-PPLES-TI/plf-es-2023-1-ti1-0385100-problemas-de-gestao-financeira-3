const metas = JSON.parse(localStorage.getItem('metas')) || [
  {
    id: 1,
    nome: 'Comprar um carro',
    valorMonetario: 25000,
    descricao: 'Economizar para comprar um carro novo',
    categoria: 'medio',
    dataVencimento: '2024-12-31',
  },
];

function exibirResultados(metas) {
  const corpoTabela = document.getElementById('resultados').getElementsByTagName('tbody')[0];
  corpoTabela.innerHTML = '';

  metas.forEach(meta => {
    const linha = corpoTabela.insertRow();

    const celulaId = linha.insertCell();
    celulaId.textContent = meta.id;

    const celulaNome = linha.insertCell();
    celulaNome.textContent = meta.nome;

    const celulaValorMonetario = linha.insertCell();
    celulaValorMonetario.textContent = meta.valorMonetario;

    const celulaDescricao = linha.insertCell();
    celulaDescricao.textContent = meta.descricao;

    const celulaCategoria = linha.insertCell();
    celulaCategoria.textContent = meta.categoria;

    const celulaDataVencimento = linha.insertCell();
    celulaDataVencimento.textContent = meta.dataVencimento;

    const celulaAcoes = linha.insertCell();
    const botaoAlterar = document.createElement('button');
    botaoAlterar.textContent = 'Alterar';
    botaoAlterar.addEventListener('click', () => alterarMeta(meta.id));
    celulaAcoes.appendChild(botaoAlterar);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.addEventListener('click', () => excluirMeta(meta.id));
    celulaAcoes.appendChild(botaoExcluir);
  });
}

function alterarMeta(id) {
  const meta = metas.find(meta => meta.id === id);
  if (meta) {
    const novoNome = prompt('Digite o novo nome da meta:', meta.nome);
    const novoValorMonetario = prompt('Digite o novo valor monetário:', meta.valorMonetario);
    const novaDescricao = prompt('Digite a nova descrição:', meta.descricao);
    const novaCategoria = prompt('Digite a nova categoria:', meta.categoria);
    const novaDataVencimento = prompt('Digite a nova data de vencimento:', meta.dataVencimento);
    meta.nome = novoNome;
    meta.valorMonetario = novoValorMonetario;
    meta.descricao = novaDescricao;
    meta.categoria = novaCategoria;
    meta.dataVencimento = novaDataVencimento;
    localStorage.setItem('metas', JSON.stringify(metas));
    exibirResultados(metas);
  }
}

function excluirMeta(id) {
  const index = metas.findIndex(meta => meta.id === id);
  if (index > -1) {
    metas.splice(index, 1);
    localStorage.setItem('metas', JSON.stringify(metas));
    exibirResultados(metas);
  }
}

function iniciarAplicativoMeta() {
  document.getElementById('formularioPesquisa').addEventListener('submit', function (evento) {
    evento.preventDefault();
    const filtroNome = document.getElementById('nome').value.toLowerCase();
    const filtroCategoria = document.getElementById('categoria').value;
    const metasFiltradas = metas.filter(meta => (filtroNome === '' || meta.nome.toLowerCase().includes(filtroNome)) && (filtroCategoria === '' || meta.categoria === filtroCategoria));
    exibirResultados(metasFiltradas);
  });

  document.getElementById('formularioNovaMeta').addEventListener('submit', function (evento) {
    evento.preventDefault();
    const novoNome = document.getElementById('novoNome').value;
    const novoValorMonetario = document.getElementById('novoValorMonetario').value;
    const novaDescricao = document.getElementById('novaDescricao').value;
    const novaCategoria = document.getElementById('novaCategoria').value;
    const novaDataVencimento = document.getElementById('novaDataVencimento').value;
    const novaMeta = {
      id: metas.length + 1,
      nome: novoNome,
      valorMonetario: novoValorMonetario,
      descricao: novaDescricao,
      categoria: novaCategoria,
      dataVencimento: novaDataVencimento
    };
    metas.push(novaMeta);
    localStorage.setItem('metas', JSON.stringify(metas));
    document.getElementById('formularioNovaMeta').reset();
    exibirResultados(metas);
  });

  exibirResultados(metas);
}

iniciarAplicativoMeta();
