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
    
    idDoUsuarioDisplay.innerText = `ID =${idDoFuncionario}`;

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
        funcionarioParaEditar = dados; 
        preencherDados(dados);
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
    document.getElementById('sobrenome').value = funcionario.sobrenome;
    document.getElementById('sexo').value = funcionario.sexo;
    // A API retorna a data completa, precisamos formatar para 'yyyy-mm-dd'
    document.getElementById('dtNascimento').value = funcionario.dtNascimento.split('T')[0]; 
    document.getElementById('escolaridade').value = funcionario.grauEscolaridade;
    document.getElementById('endereco').value = funcionario.endereco;
    document.getElementById('cargo').value = funcionario.cargo;
    document.getElementById('salario').value = funcionario.salario;
    document.getElementById('passagem').value = funcionario.valorPassagem;
    document.getElementById('foto').value = funcionario.foto;
    document.getElementById('ft').src = funcionario.foto;

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
    funcionarioParaEditar.sobrenome = document.getElementById('sobrenome').value;
    funcionarioParaEditar.sexo = document.getElementById('sexo').value;
    funcionarioParaEditar.dtNascimento = document.getElementById('dtNascimento').value;
    funcionarioParaEditar.escolaridade = document.getElementById('escolaridade').value;
    funcionarioParaEditar.endereco = document.getElementById('endereco').value;
    funcionarioParaEditar.salario = parseFloat(document.getElementById('salario').value);
    funcionarioParaEditar.valorPassagem = parseFloat(document.getElementById('passagem').value);
    funcionarioParaEditar.foto = document.getElementById('foto').value;

    
    const radioSelecionado = document.querySelector('input[name="opcaoVT"]:checked');
    if (radioSelecionado) {
        // Converte o valor do rádio (string "true" ou "false") para booleano
        funcionarioParaEditar.optouVT = (radioSelecionado.value === 'true');
    }

     const camposParaValidar = {
        "Nome": funcionarioParaEditar.nome,
        "Sobrenome": funcionarioParaEditar.sobrenome,
        "Data de Nascimento": funcionarioParaEditar.dtNascimento,
        "Sexo": funcionarioParaEditar.sexo,
        "escolaridade": funcionarioParaEditar.escolaridade,
        "Endereço": funcionarioParaEditar.endereco,
        "Foto": funcionarioParaEditar.foto
    };

    // Loop que verifica cada campo de texto
    for (const [nomeCampo, valorCampo] of Object.entries(camposParaValidar)) {
        if (!valorCampo || valorCampo.trim() === '') {
            alert(`O campo "${nomeCampo}" é obrigatório e não pode estar vazio.`);
            return; 
        }
    }

    
    //checagem das letras
    const regexSoLetras = /^[a-zA-Zà-úÀ-Ú\s]+$/;

    if (!regexSoLetras.test(funcionarioParaEditar.nome)) {
        alert("O campo 'Nome' deve conter apenas letras e espaços.");
        return; 
    }

    if (!regexSoLetras.test(funcionarioParaEditar.sobrenome)) {
        alert("O campo 'Sobrenome' deve conter apenas letras e espaços.");
        return;
    }
    

    //checagem dos num
     if (isNaN(funcionarioParaEditar.salario) || isNaN(funcionarioParaEditar.valorPassagem)) {
        alert("Os campos 'Salário' e 'Valor da Passagem' devem ser números válidos.");
        return;
    }

    // Verificação específica para o botão de rádio
    if (!funcionarioParaEditar.optouVT) {
        alert("Por favor, selecione uma opção para o Vale Transporte.");
        return;
    }

    const idDoFuncionario = window.location.search.slice(1);
    
        
  fetch(`https://node-vercel-app-rho.vercel.app/api/funcionarios/${idDoFuncionario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
   body: JSON.stringify(funcionarioParaEditar)
    })
    .then(resp => {
      if (!resp.ok) throw new Error("Erro ao editar funcionário");
      return resp.json();
    })
    .then(dados => {
      console.log("Funcionário atualizado:", dados);
      
    })
    .catch(err => console.error("Erro na requisição:", err));
});
