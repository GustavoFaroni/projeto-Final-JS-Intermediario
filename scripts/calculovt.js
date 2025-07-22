export function calcularDescontoVT(alunos, diasUteis = 22) {
  // Verifica se o funcionário optou por receber o Vale-Transporte.
  if (!alunos.opcaoVT) {
    return {
      optou: false,
      desconto: 0,
      custoTotal: 0,
      limite6porcento: 0,
      empresaVT: 0,
    };
  }

  // Calcula o custo total do transporte para o mês.
  const custoTotalTransporte = alunos.passagemDiaria * diasUteis;

  // Calcula o limite de desconto, que é 6% do salário base.
  const limiteDesconto = alunos.salario * 0.06;

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
