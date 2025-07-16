import {alunos} from './listaAlunos.js';

export function calcularDescontoVT(alunos, diasUteis = 22) {
    // 1. Verifica se o funcionário optou por receber o Vale-Transporte.
    if (!alunos.opcaoVT) {
        return {
            optou: false,
            desconto: 0,
            custoTotal: 0,
            limite6porcento: 0
        };
    }

    // 2. Calcula o custo total do transporte para o mês.
    // Ex: R$ 17,80/dia * 22 dias = R$ 391,60
    const custoTotalTransporte = alunos.passagemDiaria * diasUteis;

    // 3. Calcula o limite de desconto, que é 6% do salário base.
    // Ex: 6% de R$ 3500,00 = R$ 210,00
    const limiteDesconto = alunos.salario * 0.06;

    // 4. O desconto real a ser aplicado é o MENOR valor entre o custo total e o limite de 6%.
    //    Isso protege o funcionário de ter um desconto maior que o custo do transporte.
    const descontoReal = Math.min(custoTotalTransporte, limiteDesconto);

    // 5. Retorna um objeto com todos os detalhes para facilitar a exibição na tela.
    return {
        optou: true,
        // toFixed(2) para formatar o número com 2 casas decimais.
        desconto: parseFloat(descontoReal.toFixed(2)), 
        custoTotal: parseFloat(custoTotalTransporte.toFixed(2)),
        limite6porcento: parseFloat(limiteDesconto.toFixed(2))
    };
}