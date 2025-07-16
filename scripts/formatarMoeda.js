//formatar números como moeda (R$)  mesma ideia da data tem biblioteca pra isso
export function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}