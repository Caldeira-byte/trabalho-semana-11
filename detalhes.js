document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("detalhes-container");

  const urlParams = new URLSearchParams(window.location.search);
  const receitaId = urlParams.get("id");

  if (receitaId) {
    fetch(`http://localhost:3000/receitas/${receitaId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Receita não encontrada");
        }
        return response.json();
      })
      .then(receita => {
        container.innerHTML = `
          <h2>${receita.titulo}</h2>
          <img src="${receita.imagem}" alt="${receita.titulo}" class="img-fluid mb-3">
          <p>${receita.descricao}</p>
          <a href="index.html" class="btn btn-secondary mt-3">Voltar</a>
        `;
      })
      .catch(error => {
        console.error("Erro ao carregar a receita:", error);
        container.innerHTML = `<p class="text-danger">Erro ao carregar detalhes da receita.</p>`;
      });
  } else {
    container.innerHTML = "<p class='text-warning'>Nenhuma receita selecionada.</p>";
  }
});
