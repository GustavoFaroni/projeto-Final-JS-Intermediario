
  //vou importar no cadastrar pq ja tem uma funçao la criando um funcionario
export function postar(novoFuncionario) {
  fetch("https://node-vercel-app-rho.vercel.app/api/funcionarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoFuncionario),
  })
    .then((resp) => resp.json())
    .then((dados) => console.log(dados))
    .catch((err) => console.error("Erro na requisição:", err));
}
