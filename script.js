document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab elements to animate
    const cards = document.querySelectorAll('.service-card, .product-card');
    
    // Add base CSS for animation via JS to keep it clean
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add a class for elements that become visible
    document.head.insertAdjacentHTML('beforeend', `<style>
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>`);

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '1rem 0';
        }
    });

    // Lightbox Functionality
    const createLightbox = () => {
        const lightboxTemplate = `
            <div class="lightbox" id="lightbox">
                <span class="lightbox-close">&times;</span>
                <img src="" alt="Ampliada" class="lightbox-img" id="lightbox-img">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxTemplate);
        
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');

        // Close on click close button
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => { lightbox.style.display = 'none'; }, 300);
        });

        // Close on click outside element
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                setTimeout(() => { lightbox.style.display = 'none'; }, 300);
            }
        });

        return { lightbox, lightboxImg };
    };

    const isCatalogPage = window.location.pathname.includes('catalogo.html');
    
    if (isCatalogPage) {
        // Initialize Swipers
        const swipers = new Swiper('.product-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // When window width is >= 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // When window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });

        const { lightbox, lightboxImg } = createLightbox();
        
        // Add click events to all catalog product images, including duplicated swiper slides
        document.body.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                e.preventDefault();
                const imgSource = card.querySelector('img').src;
                lightboxImg.src = imgSource;
                lightbox.style.display = 'flex';
                setTimeout(() => { lightbox.classList.add('active'); }, 10);
            }
        });
    }

    // Chatbot functionality (Injected via JS so it appears on all pages)
    const initChatbot = () => {
        const chatbotHTML = `
            <div class="floating-chat-btn" id="chat-btn">💬</div>
            <div class="chatbot-window" id="chat-window">
                <div class="chatbot-header">
                    <span>🧙‍♀️ Asistente LaserWitch</span>
                    <span class="chatbot-close" id="chat-close">&times;</span>
                </div>
                <div class="chatbot-body" id="chat-body">
                    <div class="chat-msg bot">¡Hola! Soy el asistente mágico de LaserWitch3d. ¿En qué te puedo ayudar hoy?</div>
                    <div class="chat-options" id="chat-options">
                        <button class="chat-opt-btn" data-reply="Nuestros precios varían según el tamaño, material y tiempo de máquina. ¡Ve a la sección de Contacto para una cotización exacta!">1. 💰 Precios de corte/impresión</button>
                        <button class="chat-opt-btn" data-reply="Sí, hacemos envíos a coordinar. Aseguramos que tus piezas lleguen protegidas.">2. 📦 ¿Hacen envíos?</button>
                        <button class="chat-opt-btn" data-reply="¡Claro! Solo envíanos tu idea, vector o modelo STL y nosotros nos encargamos de materializarlo.">3. 🛠️ Tengo un diseño propio</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        const chatBtn = document.getElementById('chat-btn');
        const chatWindow = document.getElementById('chat-window');
        const chatClose = document.getElementById('chat-close');
        const chatOptions = document.getElementById('chat-options');
        const chatBody = document.getElementById('chat-body');

        chatBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        // Handle option clicks
        chatOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('chat-opt-btn')) {
                const userText = e.target.innerText.replace(/^\d+\.\s*/, '');
                const botReply = e.target.getAttribute('data-reply');
                
                // Add user msg
                chatBody.insertAdjacentHTML('beforeend', `<div class="chat-msg user">${userText}</div>`);
                
                // Hide options temporarily
                chatOptions.style.display = 'none';

                // Simulate typing delay
                setTimeout(() => {
                    chatBody.insertAdjacentHTML('beforeend', `<div class="chat-msg bot">${botReply}</div>`);
                    chatBody.appendChild(chatOptions); // move options to bottom
                    chatOptions.style.display = 'flex';
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 600);
            }
        });
    };

    // Initialize chatbot
    initChatbot();

});
