let notificacoes = [
    {
        id: 1,
        titulo: "Metas a cumprir",
        mensagem: "Você ainda não cumpriu todas as metas ... !",
        data: 2023 - 04 - 27
    },
    {
        id: 2,
        titulo: "Educação financeira",
        mensagem: "Você não assistiu todos os podcasts ... !",
        data: 2023 - 04 - 26
    },
    {
        id: 3,
        titulo: "Controle de estoque",
        mensagem: "Você precisa atualizar seu estoque!",
        data: 2023 - 04 - 25
    }
];

function openPopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "block"; // Exibe o pop-up
}

function closePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "none"; // Oculta o pop-up
}

function atualizaNotificacoes() {
    let lista = document.getElementById("notificacoes");
    lista.innerHTML = ""
    for (let notificacao of notificacoes) {
        container = document.createElement("div");
        titulo = document.createElement("h4");
        titulo.innerHTML = notificacao.titulo;
        mensagem = document.createElement("p");
        mensagem.innerHTML = notificacao.mensagem;
        container.appendChild(titulo);
        container.appendChild(mensagem);
        lista.appendChild(container);
    }
}

function limpaNotificacoes() {
    notificacoes = [];
    atualizaNotificacoes();
}
atualizaNotificacoes();