import{exibirResultados} from './logica.js';
import {alunos} from './listaAlunos.js';

const selectElement = document.getElementById("alunos-select");
const inputBusca = document.getElementById('busca-input');

selectElement.addEventListener("click", () => {
  inputBusca.value = selectElement.value;

  //aqui onde chama a busca
  const termoBusca = inputBusca.value.trim().toLowerCase();
  const resultadosFiltrados = alunos.filter(aluno => {
        //sem o include aqui a busca n rola (ele verifica se essa string contem a outra string)
        return aluno.nome.toLowerCase().includes(termoBusca);
    });
  exibirResultados(resultadosFiltrados);
});
