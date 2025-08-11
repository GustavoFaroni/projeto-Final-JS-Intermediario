import { alunos } from "./listaAlunos.js";

const containerCards = document.getElementById('lista-funcionarios-editar');
const containerFormulario = document.getElementById('formulario-edicao-container');
const formEdicao = document.getElementById('form-edicao');
const nomeFuncionarioEditando = document.getElementById('nome-funcionario-editando');

// --- Pega todos os inputs do formulário para facilitar o preenchimento ---
const nomeInput = document.getElementById('nome');
const sobrenomeInput = document.getElementById('sobrenome');


// --- 1. FUNÇÃO PARA EXIBIR TODOS OS CARDS NA TELA ---
function exibirCards() {
    containerCards.innerHTML = ''; // Limpa a área antes de adicionar
    alunos.forEach(func => {
        // A classe "card-selecionavel" é para o efeito de hover do CSS
        // O ID do card é o ID do funcionário, essencial para a lógica de clique
        const cardHTML = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 card-selecionavel" id="${func.id}">
                    <div class="card-body text-center">
                        <img src="${func.foto || 'https://via.placeholder.com/100'}" alt="Foto de ${func.nome}" class="rounded-circle mb-2" width="100" height="100">
                        <h5 class="card-title">${func.nome}</h5>
                        <p class="card-text text-muted">${func.sexo}</p>
                        <p class="card-text text-muted">${func.grauEscolaridade}</p>
                    </div>
                </div>
            </div>
        `;
        containerCards.innerHTML += cardHTML;
    });
}


function preencherFormulario(funcionario) {
    if (!funcionario) return;

    // Preenche cada campo com os dados do funcionário
    nomeInput.value = funcionario.nome;
    sobrenomeInput.value = funcionario.sobrenome;

    // Mostra o nome do funcionário que está sendo editado no título
    nomeFuncionarioEditando.textContent = `Editando: ${funcionario.nome} ${funcionario.sobrenome}`;
}


//LÓGICA PRINCIPAL
exibirCards();

// Adiciona um "escutador de eventos" no container dos cards
containerCards.addEventListener('click', (event) => {
    // Descobre qual card foi clicado
    const cardClicado = event.target.closest('.card');
    
    // Se o clique não foi em um card, não faz nada
    if (!cardClicado) return;

    const funcionarioId = cardClicado.id;
    const funcionarioParaEditar = alunos.find(f => f.id === funcionarioId);

    // Preenche o formulário (que está escondido) com os dados do funcionário
    preencherFormulario(funcionarioParaEditar);

    // **A MÁGICA ACONTECE AQUI:** Remove a classe que esconde o formulário
    containerFormulario.classList.remove('d-none');
});


// Lógica para quando o formulário de edição for enviado
formEdicao.addEventListener('submit', (event) => {
    event.preventDefault();
    // A lógica de salvar as alterações, criar histórico, etc., iria aqui
    alert('As alterações seriam salvas agora!');
});