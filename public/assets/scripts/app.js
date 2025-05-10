// Configuração da API (substitui as variáveis locais)
const API_URL = "http://localhost:3000";

// Funções para buscar dados no JSONServer
async function fetchReceitas() {
  try {
    const response = await fetch(`${API_URL}/receitas`);
    if (!response.ok) throw new Error("Erro ao carregar receitas");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    return []; // Retorna array vazio em caso de erro
  }
}

async function fetchFamosas() {
  try {
    const response = await fetch(`${API_URL}/famosas`);
    if (!response.ok) throw new Error("Erro ao carregar receitas famosas");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar receitas famosas:", error);
    return [];
  }
}

async function fetchReceitaPorId(id) {
  try {
    // Tenta buscar nas receitas comuns
    let response = await fetch(`${API_URL}/receitas?id=${id}`);
    let data = await response.json();
    
    // Se não encontrar, busca nas famosas
    if (data.length === 0) {
      response = await fetch(`${API_URL}/famosas?id=${id}`);
      data = await response.json();
    }
    
    return data[0] || null;
  } catch (error) {
    console.error("Erro ao buscar receita:", error);
    return null;
  }
}

// Função para gerar os cards (agora assíncrona)
async function criarCards() {
  const container = document.getElementById("container-cards");
  if (!container) return;

  try {
    const [receitas, famosas] = await Promise.all([fetchReceitas(), fetchFamosas()]);

    // Renderiza receitas do dia
    container.innerHTML = receitas.map(receita => `
      <div class="col-sm-6 col-lg-4 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <img src="${receita.imagem}" class="card-img-top img-fluid" alt="${receita.titulo}">
          <div class="card-body">
            <h5 class="card-title">${receita.titulo}</h5>
            <p class="card-text">${receita.descricao}</p>
            <a href="detalhes.html?id=${receita.id}" class="btn btn-primary">Ver Receita</a>
          </div>
        </div>
      </div>
    `).join('');

    // Renderiza receitas famosas (se houver um container específico)
    const containerFamosas = document.getElementById("container-famosas");
    if (containerFamosas) {
      containerFamosas.innerHTML = famosas.map(receita => `
        <div class="col-sm-6 col-lg-4 mb-4">
          <div class="card h-100 border-0 shadow-sm">
            <img src="${receita.imagem}" class="card-img-top img-fluid" alt="${receita.titulo}">
            <div class="card-body">
              <h5 class="card-title">${receita.titulo}</h5>
              <p class="card-text">${receita.descricao}</p>
              <a href="detalhes.html?id=${receita.id}" class="btn btn-primary">Ver Receita</a>
            </div>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    container.innerHTML = `
      <div class="col-12 text-center text-danger">
        <p>Erro ao carregar receitas. Verifique o servidor.</p>
      </div>
    `;
  }
}

// Função para carregar detalhes (agora assíncrona)
async function carregarDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const container = document.getElementById("detalhes-container");
  
  if (!container) return;

  try {
    const receita = await fetchReceitaPorId(id);
    
    if (!receita) {
      container.innerHTML = "<p>Receita não encontrada</p>";
      return;
    }

    // Renderização mantida igual (só muda a origem dos dados)
    let html = `
      <h2>${receita.titulo}</h2>
      <img src="${receita.imagem}" class="img-principal">
      <p><strong>Descrição:</strong> ${receita.descricao}</p>
    `;

    if (receita.ingredientes) {
      html += `
        <h4>Ingredientes:</h4>
        <ul>${receita.ingredientes.map(i => `<li>${i}</li>`).join('')}</ul>
      `;
    }

    if (receita.preparo) {
      const preparoHTML = Array.isArray(receita.preparo) ? 
        receita.preparo.map(p => `<p>${p}</p>`).join('') : 
        `<p>${receita.preparo}</p>`;
      
      html += `
        <h4>Modo de Preparo:</h4>
        ${preparoHTML}
      `;
    }

    if (receita.fotos) {
      html += `
        <h4>Fotos:</h4>
        <div class="fotos-vinculadas">
          ${receita.fotos.map(f => `
            <div>
              <img src="${f.src}" alt="${f.titulo}">
              <p>${f.titulo}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = html;
  } catch (error) {
    container.innerHTML = `
      <p class="text-danger">Erro ao carregar detalhes da receita.</p>
    `;
  }
}

// Função de filtro (assíncrona)
async function filtrarPorCategoria(categoria) {
  const container = document.getElementById("container-cards");
  if (!container) return;

  try {
    const receitas = await fetchReceitas();
    const receitasFiltradas = categoria ? 
      receitas.filter(r => r.categoria === categoria) : 
      receitas;

    container.innerHTML = receitasFiltradas.map(receita => `
      <div class="col-sm-6 col-lg-4 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <img src="${receita.imagem}" class="card-img-top img-fluid" alt="${receita.titulo}">
          <div class="card-body">
            <h5 class="card-title">${receita.titulo}</h5>
            <p class="card-text">${receita.descricao}</p>
            <a href="detalhes.html?id=${receita.id}" class="btn btn-primary">Ver Receita</a>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    container.innerHTML = `
      <div class="col-12 text-center text-danger">
        <p>Erro ao filtrar receitas.</p>
      </div>
    `;
  }
}

// Inicialização (mantida igual)
document.addEventListener("DOMContentLoaded", () => {
  criarCards();
  if (window.location.pathname.includes("detalhes.html")) {
    carregarDetalhes();
  }
});











