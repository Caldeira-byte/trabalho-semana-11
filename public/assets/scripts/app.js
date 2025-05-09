document.addEventListener("DOMContentLoaded", () => {
  const receitas = [
      {
          titulo: "Pão de Queijo",
          imagem: "pao.webp",
          descricao: "Delicioso, quentinho e irresistível! Agora ainda mais crocante por fora e macio por dentro!",
          link: "paoqueijo.html"
      },
      {
          titulo: "Macarrão com Carne Moída",
          imagem: "macarrao2.jpg",
          descricao: "Uma receita clássica e saborosa, perfeita para qualquer ocasião!",
          link: "macarraocarne.html"
      },
      {
          titulo: "Brigadeiro",
          imagem: "brigadeiro.jpg",
          descricao: "O doce brasileiro mais amado! Simples de fazer e perfeito para qualquer momento.",
          link: "brigadeiro.html"
      }
  ];

  const container = document.getElementById("receitas-container");

  if (container) {
      receitas.forEach(receita => {
          const card = document.createElement("div");
          card.classList.add("col-md-8", "receitas-principais");

          card.innerHTML = `
              <h2><a href="${receita.link}" class="text-light">${receita.titulo.toUpperCase()}</a></h2>
              <p>
                  <img src="${receita.imagem}" alt="${receita.titulo}">
                  ${receita.descricao}
              </p>
              <a href="${receita.link}" class="btn btn-success mt-2">Ver receita</a>
          `;

          container.appendChild(card);
      });
  }
});