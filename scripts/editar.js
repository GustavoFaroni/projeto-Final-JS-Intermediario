const idDoUsuarioDisplay = document.getElementById('id-user');
const form = document.getElementById('form-edicao');

let arrayP = JSON.parse(localStorage.getItem('arrayP'));


const nomeInput = document.getElementById('nome');
const sexoInput = document.getElementById('sexo');
const dtNascimentoInput = document.getElementById('dtNascimento');
const escolaridadeInput = document.getElementById('escolaridade');
const enderecoInput = document.getElementById('endereco');
const salarioInput = document.getElementById('salario');
const passagemInput = document.getElementById('passagem');
const fotoInput = document.getElementById('foto');


const urlString = window.document.location.search; // Pega a string completa
idDoUsuarioDisplay.innerText += urlString.slice(1); // Mostra "id=f001" na tela


const stringSemInterrogacao = urlString.slice(1); 


// Divide a string no caractere "=" e pega a segunda parte, que é o valor do ID
const idDoFuncionario =parseInt(stringSemInterrogacao.split('?')); 


// Usa a variável com o ID limpo para buscar o usuário
const funcionarioParaEditar = arrayP.find(func => func.id === idDoFuncionario);


if (funcionarioParaEditar) {
    // Preenche cada campo do formulário com os dados do funcionário encontrado
    nomeInput.value = funcionarioParaEditar.nome;
    sexoInput.value = funcionarioParaEditar.sexo;
    dtNascimentoInput.value = funcionarioParaEditar.dtNascimento;
    salarioInput.value = funcionarioParaEditar.salario;
    escolaridadeInput.value = funcionarioParaEditar.grauEscolaridade;
    enderecoInput.value = funcionarioParaEditar.endereco;
    passagemInput.value = funcionarioParaEditar.passagemDiaria;
    fotoInput.value = funcionarioParaEditar.foto;


    const radioVT = document.querySelector(`input[name="opcaoVT"][value="${funcionarioParaEditar.opcaoVT}"]`);
    if (radioVT) {
        radioVT.checked = true;
    }
} else {
    alert('Funcionário com o ID especificado não foi encontrado.');
    form.style.display = 'none'; // Esconde o formulário se o ID for inválido
    idDoUsuarioDisplay.innerText = `ID "${idDoFuncionario}" inválido!`;
}

// --- LÓGICA DE SUBMIT DO FORMULÁRIOS ---
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Atualiza os dados do funcionário com os valores do formulário
    funcionarioParaEditar.nome = nomeInput.value;
    funcionarioParaEditar.sexo = sexoInput.value;
    funcionarioParaEditar.dtNascimento = dtNascimentoInput.value;
    funcionarioParaEditar.salario = salarioInput.value;
    funcionarioParaEditar.grauEscolaridade = escolaridadeInput.value;
    funcionarioParaEditar.endereco = enderecoInput.value;
    funcionarioParaEditar.passagemDiaria = passagemInput.value;
    funcionarioParaEditar.foto = fotoInput.value;

    const radioSelecionado = document.querySelector('input[name="opcaoVT"]:checked');
    if (radioSelecionado) {
        funcionarioParaEditar.opcaoVT = radioSelecionado.value;
    }

    // Atualiza o array no localStorage
    localStorage.setItem('arrayP', JSON.stringify(arrayP));

    // Redireciona ou mostra uma mensagem de sucesso
    alert('Funcionário atualizado com sucesso!');
    window.location.href = 'editar.html';
});