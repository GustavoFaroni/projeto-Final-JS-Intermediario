function cadastrarFuncionarios() {
    let nome = document.getElementById('nome').value
    let sobrenome = document.getElementById('sobrenome').value
    let dtNascimento = document.getElementById('dtNascimento').value
    let sexo = document.getElementById('sexo').value
    let grauEscolaridade = document.getElementById('escolaridade').value
    let endereco = document.getElementById('endereco').value
    let cargo = document.getElementById('cargo').value

    const optouVTRadio = document.querySelector('input[name="optouVT"]:checked');
    const optouVT = optouVTRadio ? optouVTRadio.value === 'true' : false;

    const hoje = new Date();
    const dataInicio = hoje.toISOString().split('T')[0];
    let dataDemissao = null;


    //isso aqui é VITAL sem a conversão nao vai
    const salarioStr = document.getElementById('salario').value;
    const passagemStr = document.getElementById('passagemDiaria').value;
    const salario = parseFloat(salarioStr.replace(',', '.'));
    const valorPassagem = parseFloat(passagemStr.replace(',', '.'));


    let foto = document.getElementById('foto').value

        // Objeto para facilitar a verificação dos campos de texto
    const camposParaValidar = {
        "Nome": nome,
        "Sobrenome": sobrenome,
        "Data de Nascimento": dtNascimento,
        "Sexo": sexo,
        "Escolaridade": grauEscolaridade,
        "Endereço": endereco,
        "cargo": cargo,
        "Salário": salarioStr,
        "Valor da Passagem": passagemStr,
        "Foto": foto
    };

    // Loop que verifica cada campo de texto
    for (const [nomeCampo, valorCampo] of Object.entries(camposParaValidar)) {
        if (!valorCampo || valorCampo.trim() === '') {
            alert(`O campo "${nomeCampo}" é obrigatório e não pode estar vazio.`);
            return; 
        }
    }

    
    //checagem das letras
    const regexSoLetras = /^[a-zA-Zà-úÀ-Ú\s]+$/;
    
    if (!regexSoLetras.test(nome)) {
        alert("O campo 'Nome' deve conter apenas letras e espaços.");
        return; 
    }

    if (!regexSoLetras.test(sobrenome)) {
        alert("O campo 'Sobrenome' deve conter apenas letras e espaços.");
        return;
    }
    

    //checagem dos num
     if (isNaN(salario) || isNaN(valorPassagem)) {
        alert("Os campos 'Salário' e 'Valor da Passagem' devem ser números válidos.");
        return;
    }

    // Verificação específica para o botão de rádio
    if (!optouVTRadio) {
        alert("Por favor, selecione uma opção para o Vale Transporte.");
        return;
    }

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
            salario,
            valorPassagem,
            cargo,
            optouVT,
            dataInicio,
            dataDemissao
        }
        )
    })
        .then(resp => resp.json())
        .then(dados => console.log(dados))
        .catch(err => console.error("Erro na requisição:", err));
}
window.cadastrarFuncionarios = cadastrarFuncionarios;
