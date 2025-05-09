document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("receitas-container");

  if (container) {
    fetch("http://localhost:3000/receitas")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar receitas");
        }
        return response.json();
      })
      .then(receitas => {
        receitas.forEach(receita => {
          const card = document.createElement("div");
          card.classList.add("col-md-8", "receitas-principais");

          card.innerHTML = `
            <h2><a href="${receita.link || `detalhes.html?id=${receita.id}`}" class="text-light">${receita.titulo.toUpperCase()}</a></h2>
            <p>
              <img src="${receita.imagem}" alt="${receita.titulo}">
              ${receita.descricao}
            </p>
            <a href="${receita.link || `detalhes.html?id=${receita.id}`}" class="btn btn-success mt-2">Ver receita</a>
          `;

          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error("Erro ao carregar as receitas:", error);
        container.innerHTML = "<p class='text-danger'>Erro ao carregar receitas.</p>";
      });
  }
});
