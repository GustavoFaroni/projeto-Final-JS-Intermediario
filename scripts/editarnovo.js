import {alunos} from './listaAlunos.js'

// ver o html certo
const container = document.getElementById('listaFuncionarios');

alunos.forEach((funcionario, index) => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML= `
    <div class="card h-100 shadow" id="${index + 1}">
        <img src="${funcionario.foto}" class="card-img-top" alt="${funcionario.nome}">
        <div class="card-body link-card">
            <h5 class="card-title">${funcionario.nome}</h5>
            <p class="card-text"><strong>Data de nascimento:</strong> ${new Date(funcionario.dtNascimento)}</p>
            <p class="card-text"><strong>Sexo:</strong> ${funcionario.sexo} </p> 
            <p class="card-text"><strong>Escolaridade:</strong> ${funcionario.grauEscolaridade} </p> 
            <p class="card-text"><strong>Endereço:</strong> ${funcionario.endereco} </p> 
        </div>
    </div>    
    `;
    container.appendChild(card);
});

container.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    window.location.href = `editarCampo.html?${card.id}`    
});