import {alunos} from './listaAlunos.js';

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
    const foto = document.getElementById('foto').value;
    const salario = document.getElementById('salario').value;
    const passagem = document.getElementById('passagem').value;
    const opcaoVT = document.querySelector('input[name="opcaoVT"]:checked').value;
    //O ?. funciona como uma pergunta: "O elemento da esquerda existe? Se sim, pegue a 
    // propriedade .value. Se não (se for null ou undefined), não faça nada e apenas retorne undefined sem quebrar o código."
    // no futuro acho q vai ser a solução sem usar required 

    const novoFuncionario = {
        nome: `${nome} ${sobrenome}`,
        dtNascimento: dtNascimento,
        sexo: sexo,
        grauEscolaridade: escolaridade,
        endereco: endereco,
        foto: foto,
        salario: parseFloat(salario),
        passagemDiaria: parseFloat(passagem),
        //ao inves de comparar o retorno , faço uma comparaçao onde o true retorna true e a comparaçao com false retorna false
        opcaoVT: opcaoVT === 'true' 
    };

    alunos.push(novoFuncionario);
    console.log(alunos);


});