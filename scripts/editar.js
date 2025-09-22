// Função IIFE para iniciar o carregamento dos dados ao carregar a página
(function() {
    carregarDetalhesFuncionario();
})();

// Variável para armazenar os dados do funcionário que serão editados
let funcionarioParaEditar = {};


function carregarDetalhesFuncionario() {
    // Pega o ID diretamente da URL
    const idDoFuncionario = window.location.search.slice(1);
    const idDoUsuarioDisplay = document.getElementById('id-user');

    // Verifica se um ID foi encontrado na URL
    if (!idDoFuncionario) {
        console.error("Nenhum ID de funcionário encontrado na URL.");
        alert("ID inválido!");
        return; // Para a execução se não houver ID
    }
    
    idDoUsuarioDisplay.innerText = `ID = ${idDoFuncionario}`;

    //Faz a requisição para a API usando o ID obtido
    fetch(`https://node-vercel-app-rho.vercel.app/api/funcionarios/${idDoFuncionario}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    .then(resp => {
        if (!resp.ok) {
            // Se a resposta não for bem-sucedida (ex: 404), lança um erro
            throw new Error('Funcionário não encontrado na API.');
        }
        return resp.json();
    })
    .then(dados => {
        // Guarda os dados recebidos e chama a função para preencher o formulário
        funcionarioParaEditar = dados.funcionario; 
        preencherDados(dados.funcionario);
    })
    .catch(err => {
        // Captura qualquer erro, seja de rede ou da resposta da API
        console.error("Erro na requisição:", err);
        alert('Erro ao buscar funcionário. Verifique o ID e tente novamente.');
        document.getElementById('form-edicao').style.display = 'none';
    });
}

// Função responsável por colocar os dados nos campos do formulário
function preencherDados(funcionario) {
    document.getElementById('nome').value = funcionario.nome;
    document.getElementById('sexo').value = funcionario.sexo;
    // A API retorna a data completa, precisamos formatar para 'yyyy-mm-dd'
    document.getElementById('dtNascimento').value = funcionario.dtNascimento.split('T')[0]; 
    document.getElementById('escolaridade').value = funcionario.grauEscolaridade;
    document.getElementById('endereco').value = funcionario.endereco;
    document.getElementById('salario').value = funcionario.salarioAtual;
    document.getElementById('passagem').value = funcionario.valorPassagem;
    document.getElementById('foto').value = funcionario.foto;

    const radioVT = document.querySelector(`input[name="opcaoVT"][value="${funcionario.optouVT}"]`);
    if (radioVT) {
        radioVT.checked = true;
    }
}


const form = document.getElementById('form-edicao');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Atualiza o objeto 'funcionarioParaEditar' com os novos valores do formulário
    funcionarioParaEditar.nome = document.getElementById('nome').value;
    funcionarioParaEditar.sexo = document.getElementById('sexo').value;
    funcionarioParaEditar.dtNascimento = document.getElementById('dtNascimento').value;
    funcionarioParaEditar.grauEscolaridade = document.getElementById('escolaridade').value;
    funcionarioParaEditar.endereco = document.getElementById('endereco').value;
    funcionarioParaEditar.salarioAtual = parseFloat(document.getElementById('salario').value);
    funcionarioParaEditar.valorPassagem = parseFloat(document.getElementById('passagem').value);
    funcionarioParaEditar.foto = document.getElementById('foto').value;
    
    const radioSelecionado = document.querySelector('input[name="opcaoVT"]:checked');
    if (radioSelecionado) {
        // Converte o valor do rádio (string "true" ou "false") para booleano
        funcionarioParaEditar.optouVT = (radioSelecionado.value === 'true');
    }

    console.log("Dados prontos para enviar:", funcionarioParaEditar);
    alert('Funcionalidade de salvar ainda não implementada.');

});