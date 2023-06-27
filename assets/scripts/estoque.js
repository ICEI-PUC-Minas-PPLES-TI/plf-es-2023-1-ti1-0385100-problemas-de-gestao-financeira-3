function leDados() {
    let strDados = localStorage.getItem('estoque');
    let objDados = {};
    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = {
            produtos: [
                {
                    "Id": 1,
                    "Nome": "Pulseira de couro",
                    "Quantidade": 20,
                    "Compra": 500,
                    "Venda": 800
                },
                {
                    "Id": 2,
                    "Nome": "Anel de namoro",
                    "Quantidade": 10,
                    "Compra": 200,
                    "Venda": 300
                },
                {
                    "Id": 3,
                    "Nome": "Colar masculino",
                    "Quantidade": 30,
                    "Compra": 500,
                    "Venda": 800
                }, {
                    "Id": 4,
                    "Nome": "Aliança casamento",
                    "Quantidade": 20,
                    "Compra": 150,
                    "Venda": 280
                }
            ]
        }
    }
    return objDados;
}
function salvaDados(dados) {
    localStorage.setItem('estoque', JSON.stringify(dados));
}

function incluirProduto() {
    let objDados = leDados();

    let strId = document.getElementById('campoID').valueAsNumber;
    let strNome = document.getElementById('campoNome').value;
    let strQtde = document.getElementById('campoQtde').valueAsNumber;
    let strCompra = document.getElementById('campoCompra').valueAsNumber;
    let strVenda = document.getElementById('campoVenda').valueAsNumber;

    if (strId == "" || strNome == "" || strQtde == "" || strCompra == "" || strVenda == "") {
        window.alert("Insira as informações corretamente");
        return;
    } else {
        let novoProduto = {
            Id: strId,
            Nome: strNome,
            Quantidade: strQtde,
            Compra: strCompra,
            Venda: strVenda
        };

        objDados.produtos.push(novoProduto);

        salvaDados(objDados);
        window.alert("Produto inserido com sucesso");
        imprimeDados();
        limparFormulario();
    }
}
function imprimeDados() {
    let tela = document.getElementById('tela');
    let strHTML = '';
    let objDados = leDados();
    for (i = 0; i < objDados.produtos.length; i++) {
        strHTML += `<tr id="produto: ${objDados.produtos[i].Id}">
        <td id="${objDados.produtos[i].Id}">${objDados.produtos[i].Id}</td> 
        <td id="${objDados.produtos[i].Id}">${objDados.produtos[i].Nome}</td> 
        <td id="${objDados.produtos[i].Id}">${objDados.produtos[i].Quantidade}</td> 
        <td id="${objDados.produtos[i].Id}">${objDados.produtos[i].Compra}</td> 
        <td id="${objDados.produtos[i].Id}">${objDados.produtos[i].Venda}</td>
        <td id="${objDados.produtos[i].Id}"><button class="btnAlterarProduto btn btn-info" onclick="alterarProduto(this)" id="${objDados.produtos[i].Id}">Alterar</button>
        <td id="${objDados.produtos[i].Id}"><button class="btnExcluirProduto btn btn-info" onclick="excluirProduto(this)" id="${objDados.produtos[i].Id}">Excluir</button></td>
        </tr>`
    }
    tela.innerHTML = strHTML;
}

document.getElementById('btnCadastrarProduto').addEventListener('click', incluirProduto);
document.getElementById('btnCarregaDados').addEventListener('click', imprimeDados);
document.getElementById('btnLimparForms').addEventListener('click', limparFormulario);
//document.getElementById('btnExcluirProduto').addEventListener('click', excluirProduto);

function limparFormulario() {
    const formulario = document.querySelectorAll("input[type=text], input[type=number], textarea");
    for (let j = 0; j < formulario.length; j++) {
        formulario[j].value = "";
    }
}

function excluirProduto(botao) {
    leDados();
    // Encontra a linha da tabela correspondente ao botão clicado
    var linha = botao.parentNode.parentNode;

    // Encontra o ID do produto na primeira coluna da linha
    var idProduto = linha.cells[0].innerText;

    // Obtém o valor atual do Local Storage
    var estoque = JSON.parse(localStorage.getItem("estoque"));

    // Procura o índice do produto a ser removido no array
    var index = estoque.produtos.findIndex(function (produto) {
        return produto.Id === idProduto;
    });

    // Remove o produto do array
    estoque.produtos.splice(index, 1);

    // Atualiza o valor do Local Storage
    localStorage.setItem("estoque", JSON.stringify(estoque));

    // Remove a linha da tabela
    linha.parentNode.removeChild(linha);

    window.alert("Produto excluído com sucesso");
}

function alterarProduto(botao) {
    leDados();
    // Encontra a linha da tabela correspondente ao botão clicado
    var linha = botao.parentNode.parentNode;

    // Encontra o ID do produto na primeira coluna da linha
    var idProduto = linha.cells[0].innerText;

    // Obtém o valor atual do Local Storage
    var estoque = JSON.parse(localStorage.getItem("estoque"));

    // Procura o índice do produto a ser atualizado no array
    var index = estoque.produtos.findIndex(function (produto) {
        return produto.Id.toString() === idProduto;
    });

    if (index === -1) {
        window.alert("Produto não encontrado");
        return;
    }

    // Preenche os campos com os valores atuais do produto
    document.getElementById("campoID").value = estoque.produtos[index].Id;
    document.getElementById("campoNome").value = estoque.produtos[index].Nome;
    document.getElementById("campoQtde").value = estoque.produtos[index].Quantidade;
    document.getElementById("campoCompra").value = estoque.produtos[index].Compra;
    document.getElementById("campoVenda").value = estoque.produtos[index].Venda;

    var btnSalvar = document.getElementById("btnSalvar");
    if (btnSalvar) {
        btnSalvar.onclick = function () {
            // Resto do seu código...

            // Verifica se o elemento com ID "campoID" existe antes de atualizar os dados
            var campoID = document.getElementById("campoID");
            if (campoID) {
                estoque.produtos[index].Id = campoID.valueAsNumber;
                estoque.produtos[index].Nome = document.getElementById("campoNome").value;
                estoque.produtos[index].Quantidade = document.getElementById("campoQtde").valueAsNumber;
                estoque.produtos[index].Compra = document.getElementById("campoCompra").valueAsNumber;
                estoque.produtos[index].Venda = document.getElementById("campoVenda").valueAsNumber;
                localStorage.setItem("estoque", JSON.stringify(estoque));
            }
            window.alert("Produto alterado com sucesso");
            // Atualiza a linha da tabela correspondente ao produto
            linha.cells[0].innerText = document.getElementById("campoID").value;
            linha.cells[1].innerText = document.getElementById("campoNome").value;
            linha.cells[2].innerText = document.getElementById("campoQtde").value;
            linha.cells[3].innerText = document.getElementById("campoCompra").value;
            linha.cells[4].innerText = document.getElementById("campoVenda").value;
            limparFormulario();
        }
    };

}

