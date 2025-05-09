// slider.js (versão corrigida)
document.addEventListener('DOMContentLoaded', function() {
    // Dados das receitas relacionadas (pode ser o mesmo array do app.js)
    const receitasRelacionadas = [
        {
            titulo: "Macarrão com Carne",
            imagem: "macarrao2.jpg",
            link: "macarraocarne.html"
        },
        {
            titulo: "Brigadeiro",
            imagem: "brigadeiro.jpg",
            link: "brigadeiro.html"
        },
        {
            titulo: "Pão de Queijo",
            imagem: "pao.webp",
            link: "paoqueijo.html"
        },
        {
            titulo: "Torta de Frango",
            imagem: "torta-frango (1).jpg",
            link: "torta-frango.html"
        },
        {
            titulo: "Caprese de Berinjela",
            imagem: "caprese (1).jpg",
            link: "caprese-berinjela.html"
        }
    ];

    const sliderContainer = document.getElementById('slider-relacionadas');
    
    if (sliderContainer) {
        // 1. Preenche o slider com as receitas
        receitasRelacionadas.forEach(receita => {
            const slide = document.createElement('div');
            slide.className = 'receita-slide';
            slide.innerHTML = `
                <a href="${receita.link}">
                    <img src="${receita.imagem}" alt="${receita.titulo}">
                    <h4 class="text-center text-light mt-2">${receita.titulo}</h4>
                </a>
            `;
            sliderContainer.appendChild(slide);
        });

        // 2. Configura o slider automático
        let currentIndex = 0;
        const slides = document.querySelectorAll('.receita-slide');
        const totalSlides = slides.length;

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }

        function updateSlider() {
            const scrollPosition = currentIndex * (slides[0].offsetWidth + 25); // 25 é o gap
            sliderContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }

        // 3. Inicia o slider automático (só se tiver mais de 1 slide)
        if (totalSlides > 1) {
            setInterval(nextSlide, 3000);
        }
    }
});