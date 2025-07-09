//obs: fui muito redundante em por duas pesquisas separadas no click e no input. da pra melhorar  aa

import {alunos} from './listaAlunos.js';

//funçao da data bonitinha
function formatarData(dataString) {
    const data = new Date(dataString);
    //Internacionalização = intl ou seja ele escolhe a formatação da data no "pt-br"
    //obs: isso é um recurso nativo do javascript usado para formataçao nesse caso em especifico data
    return new Intl.DateTimeFormat('pt-BR').format(data);
}

const selectElement = document.getElementById("alunos-select");


alunos.forEach((aluno) => {

  const option = document.createElement("option");
  option.value = aluno.nome;
  option.textContent = `${aluno.nome} `;
  selectElement.appendChild(option);
});

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


function exibirResultados(resultados) {
    // limpa tudo
    containerResultados.innerHTML = '';

    if (resultados.length === 0) {
        containerResultados.innerHTML = '<p class="text-center text-muted">Nenhum aluno encontrado.</p>';
        return;
    }

   
    resultados.forEach(aluno => {
        //bota a data bonitinha
        const dataNascFormatada = formatarData(aluno.dtNascimento);
        

        const cardAlunoHTML = `
            <div class="card mb-3 shadow-sm">
                <div class="card-body d-flex align-items-center">
                    
                    <div class="me-4">
                        <img src="${aluno.foto}" alt="Foto de ${aluno.nome}" class="card-img-aluno">
                    </div>

                    <div>
                        <h5 class="card-title mb-1">${aluno.nome}</h5>
                        <p class="card-text mb-1">
                            <strong>Série:</strong> ${aluno.grauEscolaridade}
                        </p>
                        <p class="card-text mb-1">
                            <strong>Nascimento:</strong> ${dataNascFormatada}
                        </p>
                        <p class="card-text mb-1">
                            <strong>Endereço:</strong> ${aluno.endereco}
                        </p>
                    </div>

                </div>
            </div>
        `;
        //adcionar somando no HTML
        containerResultados.innerHTML += cardAlunoHTML;
    });
}