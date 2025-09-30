let listaFuncionarios = []

function carregarListaFuncionarios() {
    fetch('https://node-vercel-app-rho.vercel.app/api/funcionarios', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(resp => resp.json())
        .then(dados => {
            listaFuncionarios = dados;
            carrregarDados(listaFuncionarios)
        })
        .catch(err => console.error("Erro na requisição:", err));
}

const containerResultados = document.getElementById('lista-funcionarios');

function carrregarDados(resultados) {
    console.log(listaFuncionarios)
    containerResultados.innerHTML = '';

    if (resultados.length === 0) {
        containerResultados.innerHTML = '<p class="text-center text-muted">Nenhum aluno encontrado.</p>';
        return;
    }
    resultados.forEach((funcionario) => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML= `
        <div class="card h-100 shadow" id="${funcionario._id}">
            <img src="${funcionario.foto}" class="card-img-top" alt="${funcionario.nome}">
            <div class="card-body link-card">
                <h5 class="card-title">${funcionario.nome} ${funcionario.sobrenome}</h5>
                <p class="card-text"><strong>Data de nascimento:</strong> ${funcionario.dtNascimento}</p>
                <p class="card-text"><strong>Sexo:</strong> ${funcionario.sexo} </p> 
                <p class="card-text"><strong>Escolaridade:</strong> ${funcionario.grauEscolaridade} </p> 
                <p class="card-text"><strong>Endereço:</strong> ${funcionario.endereco} </p> 
            </div>
        </div>    
        `;
        containerResultados.appendChild(card);
    });
}

containerResultados.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    window.location.href = `editarCampo.html?${card.id}`    
});
