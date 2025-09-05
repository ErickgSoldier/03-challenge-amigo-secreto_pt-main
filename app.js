let amigos = [];

function mostrarErro(mensagem) {
    let erroElemento = document.getElementById('error-message');
    if (!erroElemento) { 
        alert(mensagem);
        return;
    }
    erroElemento.textContent = mensagem;
    erroElemento.classList.remove('hidden');
    setTimeout(() => erroElemento.classList.add('hidden'), 3000);
}

function adicionar() {
    let nomeInput = document.getElementById('nome-amigo');
    let nome = nomeInput.value.trim();

    if (nome === "") {
        mostrarErro("Por favor, digite um nome válido.");
        return;
    }

    if (amigos.map(amigo => amigo.toLowerCase()).includes(nome.toLowerCase())) {
        mostrarErro("Este nome já foi adicionado.");
        nomeInput.value = '';
        return;
    }

    amigos.push(nome);
    nomeInput.value = '';
    nomeInput.focus();

    atualizarLista();
}

function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';

    if (amigos.length === 0) {
        lista.innerHTML = '<li class="empty-message">Nenhum amigo adicionado ainda.</li>';
        return;
    }

    amigos.forEach((amigo, index) => {
        let item = document.createElement('li');
        item.textContent = amigo;
        
        let removeButton = document.createElement('button');
        removeButton.textContent = '×';
        removeButton.className = 'remove-button';
        removeButton.title = `Remover ${amigo}`;
        removeButton.addEventListener('click', () => {
            remover(index);
        });

        item.appendChild(removeButton);
        lista.appendChild(item);
    });
}

function remover(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortear() {
    if (amigos.length < 3) {
        mostrarErro("Adicione pelo menos 3 amigos para o sorteio.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const sorteado = amigos[indiceAleatorio];

    const resultadoElemento = document.getElementById('resultado-sorteio');
    resultadoElemento.textContent = sorteado;

    const modal = document.getElementById('modal-resultado');
    modal.classList.remove('hidden');
}

function fecharModal() {
    let modal = document.getElementById('modal-resultado');
    modal.classList.add('hidden');
}

atualizarLista();

const inputNomeAmigo = document.getElementById('nome-amigo');
inputNomeAmigo.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionar();
    }
});