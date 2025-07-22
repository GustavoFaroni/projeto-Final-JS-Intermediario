import {alunos} from './listaAlunos.js';
import {formatarData} from './formatarData.js';
import { calcularDescontoVT } from './calculovt.js';
import { formatarMoeda } from './formatarMoeda.js';
import { calculoFGTS } from './fgts.js';

const selectElement = document.getElementById("alunos-select");
const inputBusca = document.getElementById('busca-input');
const containerResultados = document.getElementById('resultados-container');


alunos.forEach((aluno) => {

  const option = document.createElement("option");
  option.value = aluno.nome;
  option.textContent = `${aluno.nome} `;
  selectElement.appendChild(option);
});


export function exibirResultados(resultados) {
    // limpa tudo
    containerResultados.innerHTML = '';

    if (resultados.length === 0) {
        containerResultados.innerHTML = '<p class="text-center text-muted">Nenhum aluno encontrado.</p>';
        return;
    }

   
    resultados.forEach(alunos => {
        //bota a data bonitinha
        const dataNascFormatada = formatarData(alunos.dtNascimento);
       
        // Pega os detalhes do cálculo de VT
        const calculoVT = calcularDescontoVT(alunos);
        
        // Calcula o salário
        const salarioLiquido = alunos.salario - calculoVT.desconto;

        // Formata todos os valores como moeda
        const salarioBrutoFmt = formatarMoeda(alunos.salario);
        const descontoVTFmt = formatarMoeda(calculoVT.desconto);
        const salarioLiquidoFmt = formatarMoeda(salarioLiquido);
        const vtEmpresa = formatarMoeda(calculoVT.empresaVT);
        const fgts = formatarMoeda(calculoFGTS(alunos));


        const badgeVT = calculoVT.optou
            ? '<span class="badge bg-success ms-2">Optante VT</span>'
            : '<span class="badge bg-secondary ms-2">Não Optante</span>';

               const cardAlunoHTML = `
            <div class="card mb-3 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${alunos.foto}" alt="Foto de ${alunos.nome}" class="card-img-aluno me-3">
                        <div>
                            <h5 class="card-title mb-0">
                                ${alunos.nome}${badgeVT}
                            </h5>
                            <p class="card-text"><small class="text-muted">${alunos.grauEscolaridade}</small></p>
                        </div>
                    </div>

                    <h6 class="card-subtitle mb-2 text-muted">Detalhes Financeiros:</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Salário Bruto
                            <span>${salarioBrutoFmt}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Desconto VT
                            <span class="text-danger">-${descontoVTFmt}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Salário Líquido (aprox.)</strong>
                            <strong>${salarioLiquidoFmt}</strong>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            valor VT a pagar pela empresa
                            <span class="text-danger">-${vtEmpresa}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            FGTS
                            <span class="text-danger">${fgts}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        //adcionar somando no HTML
        containerResultados.innerHTML += cardAlunoHTML;
    });
}