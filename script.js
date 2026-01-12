// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- GSAP Animations ---

    // Hero Entrance
   // Hero Entrance
   const tlHero = gsap.timeline();
   tlHero.to(".hero-title", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
         .to(".hero-subtitle", { opacity: 1, y: 0, duration: 1, delay: -0.5 })
         // Correção aqui: Usamos .to() e um seletor mais específico
         .to(".hero-content .btn", { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");

    // Team Blocks Sliding
    gsap.utils.toArray('.team-block').forEach((block, i) => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: i % 2 === 0 ? -100 : 100, // Alternate directions
            duration: 1,
            ease: "power3.out"
        });
    });

    // Services Stagger
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
    
    // Config for continuous linear movement
    const baseConfig = {
        slidesPerView: 1.2,
        spaceBetween: 20,
        loop: true,
        speed: 5000, // Slow constant speed
        allowTouchMove: false, // User can't swipe manually, pure ticker effect
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 }
        }
    };

    // Carousel 1: Left to Right (CZ)
    const swiperCZ = new Swiper('.swiper-cz', baseConfig);

    // Carousel 2: Right to Left (Gabriel) - Reverse
    const swiperGab = new Swiper('.swiper-gabriel', {
        ...baseConfig,
        autoplay: { delay: 0, disableOnInteraction: false, reverseDirection: true }
    });

    // Carousel 3: Left to Right (Igor)
    const swiperIgor = new Swiper('.swiper-igor', baseConfig);


    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    
    // Pause swipers on modal open logic
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

    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            const img = btn.getAttribute('data-img');

            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modalImg.src = img;

            modal.style.display = 'flex';
            toggleSwipers(false); // Pause animations
        });
    });

    // Close Modal Actions
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        toggleSwipers(true); // Resume animations
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            toggleSwipers(true);
        }
    }

    // --- Menu Interactions (Mobile & Dropdown) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // 1. Mobile Hamburger Toggle
    if(mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active'); // Anima o ícone (se houver CSS)
            navMenu.classList.toggle('active');    // Mostra/Esconde o menu
        });
    }

    // 2. Dropdown Logic (Serviços)
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownItem = document.querySelector('.dropdown-item');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            // Previne que a página pule para o ID #services imediatamente
            // para permitir que o usuário veja o submenu primeiro
            e.preventDefault();
            dropdownItem.classList.toggle('active');
        });
    }

    // 3. Fechar Dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        // Se o clique NÃO foi dentro do item dropdown, remove a classe active
        if (dropdownItem && !dropdownItem.contains(e.target)) {
            dropdownItem.classList.remove('active');
        }
    });

});