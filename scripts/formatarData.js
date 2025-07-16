//funçao da data bonitinha
export function formatarData(dataString) {
    const data = new Date(dataString);
    //Internacionalização = intl ou seja ele escolhe a formatação da data no "pt-br"
    //obs: isso é um recurso nativo do javascript usado para formataçao nesse caso em especifico data
    return new Intl.DateTimeFormat('pt-BR').format(data);
}
