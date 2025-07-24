// reparar dps

const form = document.getElementById('form-cadastro');
const resultadoDiv = document.getElementById('resultado-cadastro');

form.addEventListener('submit', (event) => {
    // event.preventDefault() ele impede que a página recarregue ao enviar o formulário.
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const dtNascimento = document.getElementById('dtNascimento').value;
    const sexo = document.getElementById('sexo').value;
    const escolaridade = document.getElementById('escolaridade').value;
    const endereco = document.getElementById('endereco').value;
    const salario = document.getElementById('salario').value;
    const passagem = document.getElementById('passagem').value;


    const novoFuncionario = {
        nomeCompleto: `${nome} ${sobrenome}`,
        dataNascimento: dtNascimento,
        sexo: sexo,
        escolaridade: escolaridade,
        endereco: endereco,
        salario: parseFloat(salario),
        passagemDiaria: parseFloat(passagem),
        //ao inves de comparar o retorno , faço uma comparaçao onde o true retorna true e a comparaçao com false retorna false
        optouPeloVT: opcaoVT === 'true' 
    };

    console.log('--- Dados do Novo Funcionário ---');
    console.log(novoFuncionario);


});