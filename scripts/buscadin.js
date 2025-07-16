import{exibirResultados} from './logica.js';
import {alunos} from './listaAlunos.js';

const inputBusca = document.getElementById('busca-input');
const containerResultados = document.getElementById('resultados-container');

//esse que é o "truque" da pesquisa dinamica botar o evento no 
// input pra que ele faça uma busca ja na letra
 inputBusca.addEventListener('input', () => {
    const termoBusca = inputBusca.value.trim().toLowerCase();
    
    //limpar a busca caso tenha retirado todas as letras
    if (termoBusca === '') {
        containerResultados.innerHTML = '';
        return;
    }

    //mantém apenas os alunos com o nome na  que retornem "true" para o include
    const resultadosFiltrados = alunos.filter(aluno => {
        return aluno.nome.toLowerCase().includes(termoBusca);
    });

    // exibir os resultados na tela
    exibirResultados(resultadosFiltrados);
});

