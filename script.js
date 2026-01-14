document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- GSAP Animations (Hero, Team, Services) ---
    // (Mantenha seu código GSAP original aqui se quiser, ou use este básico)
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
        // Como agora temos MUITOS slides físicos, podemos deixar o buffer menor
        loopedSlides: 4, 
        // Aumentei a velocidade para 8000 porque agora a "fila" é muito maior
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


    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    
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

    // Como duplicamos o HTML, agora temos VÁRIOS botões iguais.
    // Usamos delegação de evento no documento para garantir que todos funcionem.
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('open-modal')) {
            e.preventDefault();
            const btn = e.target;
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            const img = btn.getAttribute('data-img');

            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modalImg.src = img;

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