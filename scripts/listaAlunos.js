let listaFuncionarios = []

function carregarListaFuncionarios() {
    fetch('https://node-vercel-app-rho.vercel.app/api/funcionarios', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(resp => resp.json())
        .then(dados => {
            listaFuncionarios = dados;
            carrregarDados(listaFuncionarios)
        })
        .catch(err => console.error("Erro na requisição:", err));
}

const containerResultados = document.getElementById('resultados-container');

function carrregarDados(resultados) {
    
    containerResultados.innerHTML = '';

    if (resultados.length === 0) {
        containerResultados.innerHTML = '<p class="text-center text-muted">Nenhum aluno encontrado.</p>';
        return;
    }

   
    resultados.forEach(funcionario => {
        
        // Pega os detalhes do cálculo de VT
        const calculoVT = calcularDescontoVT(funcionario);
        
        // Calcula o salário
        const salarioLiquido = funcionario.salario - calculoVT.desconto;

        // Formata todos os valores como moeda
        const salarioBrutoFmt = formatarMoeda(funcionario.salario);
        const descontoVTFmt = formatarMoeda(calculoVT.desconto);
        const salarioLiquidoFmt = formatarMoeda(salarioLiquido);
        const vtEmpresa = formatarMoeda(calculoVT.empresaVT);
        const fgts = formatarMoeda(calculoFGTS(funcionario));


        const badgeVT = calculoVT.optou
            ? '<span class="badge bg-success ms-2">Optante VT</span>'
            : '<span class="badge bg-secondary ms-2">Não Optante</span>';

               const cardAlunoHTML = `
            <div class="card mb-3 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${funcionario.foto}" alt="Foto de ${funcionario.nome}" class="card-img-aluno me-3">
                        <div>
                            <h5 class="card-title mb-0">
                                ${funcionario.nome}${badgeVT}
                            </h5>
                            <p class="card-text"><small class="text-muted">${funcionario.grauEscolaridade}</small></p>
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
 

function calcularDescontoVT(funcionario, diasUteis = 22) {
  // Verifica se o funcionário optou por receber o Vale-Transporte.
  if (!funcionario.opcaoVT) {
    return {
      optou: false,
      desconto: 0,
      custoTotal: 0,
      limite6porcento: 0,
      empresaVT: 0,
    };
  }

  // Calcula o custo total do transporte para o mês.
  const custoTotalTransporte = funcionario.passagemDiaria * diasUteis;

  // Calcula o limite de desconto, que é 6% do salário base.
  const limiteDesconto = funcionario.salario * 0.06;

  // O desconto real a ser aplicado é o MENOR valor entre o custo total e o limite de 6%.
  const descontoReal = Math.min(custoTotalTransporte, limiteDesconto);

  const vtAdicional = custoTotalTransporte - limiteDesconto;

  if (custoTotalTransporte <= limiteDesconto) {
    // Retorna um objeto com todos os detalhes
    return {
      optou: true,
      // toFixed(2) para formatar o número com 2 casas decimais.
      desconto: parseFloat(descontoReal.toFixed(2)),
      custoTotal: parseFloat(custoTotalTransporte.toFixed(2)),
      limite6porcento: parseFloat(limiteDesconto.toFixed(2)),
      empresaVT: 0 ,
    };
  } else {
    return {
      optou: true,
      desconto: parseFloat(descontoReal.toFixed(2)),
      custoTotal: parseFloat(custoTotalTransporte.toFixed(2)),
      limite6porcento: parseFloat(limiteDesconto.toFixed(2)),
      empresaVT: parseFloat(vtAdicional.toFixed(2)),
    };
  }
}

//formatar números como moeda (R$)  mesma ideia da data tem biblioteca pra isso
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function calculoFGTS(funcionario){
    const fgts = funcionario.salario * 0.08;
    return fgts;
}
