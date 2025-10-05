function cadastrarFuncionarios() {
    let nome = document.getElementById('nome').value
    let sobrenome = document.getElementById('sobrenome').value
    let dtNascimento = document.getElementById('dtNascimento').value
    let sexo = document.getElementById('sexo').value
    let grauEscolaridade = document.getElementById('escolaridade').value
    let endereco = document.getElementById('endereco').value

    const optouVTRadio = document.querySelector('input[name="opcaoVT"]:checked');
    const optouVT = optouVTRadio ? optouVTRadio.value === 'true' : false;


    //isso aqui é VITAL sem a conversão nao vai
    const salarioStr = document.getElementById('salario').value;
    const passagemStr = document.getElementById('passagem').value;
    const salarioAtual = parseFloat(salarioStr.replace(',', '.'));
    const valorPassagem = parseFloat(passagemStr.replace(',', '.'));


    let foto = document.getElementById('foto').value

    fetch('https://node-vercel-app-rho.vercel.app/api/funcionarios', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome,
            sobrenome,
            sexo,
            dtNascimento,
            grauEscolaridade,
            endereco,
            foto,
            salarioAtual,
            valorPassagem,
            optouVT,
            historicoCargosESalarios: [
                {
                    cargo: "Desenvolvedora Senior",
                    salario: 5000,
                    dataInicio: "2021-01-01",
                    dataFim: null
                }

            ]

        }
        )
    })
        .then(resp => resp.json())
        .then(dados => console.log(dados))
        .catch(err => console.error("Erro na requisição:", err));
}
window.cadastrarFuncionarios = cadastrarFuncionarios;
