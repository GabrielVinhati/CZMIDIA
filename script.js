document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- GSAP Animations (Hero, Team, Services) ---
    const tlHero = gsap.timeline();
    tlHero.to(".hero-title", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
          .to(".hero-subtitle", { opacity: 1, y: 0, duration: 1, delay: -0.5 })
          .to(".hero-content .btn", { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");

    gsap.utils.toArray('.team-block').forEach((block, i) => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: i % 2 === 0 ? -100 : 100,
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 100%"
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });

    // --- Swiper Carousels ---
    
    const baseConfig = {
        slidesPerView: 1.2,
        spaceBetween: 20,
        loop: true,
        loopedSlides: 4, 
        speed: 8000, 
        allowTouchMove: false, 
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        breakpoints: {
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 }
        }
    };

    // Inicialização
    const swiperCZ = new Swiper('.swiper-cz', { ...baseConfig });
    const swiperGab = new Swiper('.swiper-gabriel', { ...baseConfig, autoplay: { delay: 0, disableOnInteraction: false, reverseDirection: true } });
    const swiperIgor = new Swiper('.swiper-igor', { ...baseConfig });


    // --- Modal Logic (CORRIGIDO AQUI) ---
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Elementos internos do modal
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalLink = document.getElementById('modal-link'); // <-- NOVO: Seleciona o botão do link
    
    function toggleSwipers(play) {
        if(play) {
            swiperCZ.autoplay.start();
            swiperGab.autoplay.start();
            swiperIgor.autoplay.start();
        } else {
            swiperCZ.autoplay.stop();
            swiperGab.autoplay.stop();
            swiperIgor.autoplay.stop();
        }
    }

    // Event Delegation para os botões "Ver Detalhes"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('open-modal')) {
            e.preventDefault();
            const btn = e.target;
            
            // 1. Pega os dados dos atributos do botão clicado
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            const img = btn.getAttribute('data-img');
            const link = btn.getAttribute('data-link'); // <-- NOVO: Pega o link do Instagram

            // 2. Preenche o modal
            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modalImg.src = img;

            // 3. Atualiza o botão do Link (Ver no Instagram)
            if (link) {
                modalLink.href = link;
                modalLink.style.display = 'inline-flex'; // Mostra o botão se tiver link
            } else {
                modalLink.href = '#';
                modalLink.style.display = 'none'; // Esconde o botão se não tiver link (segurança)
            }

            // 4. Exibe o modal
            modal.style.display = 'flex';
            toggleSwipers(false);
        }
    });

    closeBtn.onclick = () => {
        modal.style.display = 'none';
        toggleSwipers(true);
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            toggleSwipers(true);
        }
    }

    // --- Menu Interactions ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if(mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownItem = document.querySelector('.dropdown-item');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownItem.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (dropdownItem && !dropdownItem.contains(e.target)) {
            dropdownItem.classList.remove('active');
        }
    });

});