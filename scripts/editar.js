import {alunos} from './listaAlunos.js'; 

const selectFuncionario = document.getElementById('alunos-select');
const formEdicao = document.getElementById('form-edicao');
// Pega todos os inputs do formulário para facilitar o preenchimento
const nomeInput = document.getElementById('nome');
const sobrenomeInput = document.getElementById('sobrenome');
const dtNascimentoInput = document.getElementById('dtNascimento');
const sexoInput = document.getElementById('sexo');
const escolaridadeInput = document.getElementById('escolaridade');
const enderecoInput = document.getElementById('endereco');
const fotoInput = document.getElementById('foto');
const salarioInput = document.getElementById('salario');
const passagemInput = document.getElementById('passagem');



alunos.forEach(func => {
    const option = document.createElement('option');
    option.value = func.id; 
    option.textContent = func.nome; 
    selectFuncionario.appendChild(option);
});


function preencherFormulario(idFuncionario) {
    
    const func = funcionarios.find(f => f.id === idFuncionario);

    if (!func) {
        formEdicao.reset();
        return;
    }

    nomeInput.value = func.nome;
    sobrenomeInput.value = func.sobrenome;
    dtNascimentoInput.value = func.dtNascimento;
    sexoInput.value = func.sexo;
    escolaridadeInput.value = func.grauEscolaridade;
    enderecoInput.value = func.endereco;
    fotoInput.value = func.foto;
    salarioInput.value = func.salario;
    passagemInput.value = func.passagemDiaria;


    const radioVT = document.querySelector(`input[name="opcaoVT"][value="${func.opcaoVT}"]`);
    if (radioVT) {
        radioVT.checked = true;
    }
}


selectFuncionario.addEventListener('change', (event) => {
    const idSelecionado = event.target.value;
    preencherFormulario(idSelecionado);
});


formEdicao.addEventListener('submit', (event) => {
    event.preventDefault();

    const idFuncionarioEditado = selectFuncionario.value;
    if (!idFuncionarioEditado) {
        alert('Por favor, selecione um funcionário da lista primeiro!');
        return;
    }

    // A lógica de salvar as alterações, criar histórico, etc., iria aqui.
    // Você usaria o 'idFuncionarioEditado' para saber quem atualizar no array principal.
    
    alert(`As alterações para o funcionário com ID ${idFuncionarioEditado} seriam salvas aqui!`);
    
    // Limpa a seleção e o formulário
    selectFuncionario.value = "";
    formEdicao.reset();
});