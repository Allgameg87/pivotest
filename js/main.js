// Scroll to top on page load/refresh
        window.addEventListener('beforeunload', () => {
            window.scrollTo(0, 0);
        });

        // Ensure page starts at top
        window.addEventListener('load', () => {
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, 100);
        });

        // Alternative method for scroll to top
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }

        // Additional scroll to top on page refresh
        window.addEventListener('DOMContentLoaded', () => {
            window.scrollTo(0, 0);
        });

        // Force scroll to top immediately
        if (window.pageYOffset > 0) {
            window.scrollTo(0, 0);
        }

        // Prevent any unwanted animations on page load
        document.addEventListener('DOMContentLoaded', () => {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'transform 0.4s, box-shadow 0.4s';
            });
        });

        // Mobile Menu Toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const menuCloseBtn = document.querySelector('.menu-close-btn');

        function openMenu() {
            mobileMenuToggle.classList.add('active');
            mobileMenu.classList.add('active');
            
            // Блокируем прокрутку только на ПК (769px и больше)
            if (window.innerWidth >= 769) {
                document.body.classList.add('mobile-menu-open');
            }
        }

        function closeMenu() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Разблокируем прокрутку только на ПК
            if (window.innerWidth >= 769) {
                document.body.classList.remove('mobile-menu-open');
            }
        }

        mobileMenuToggle.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking close button
        menuCloseBtn.addEventListener('click', closeMenu);

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMenu();
            }
        });

        // Close mobile menu when clicking on overlay
        // mobileMenuOverlay.addEventListener('click', closeMenu); // Убираем overlay

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
            
            // Убираем блокировку прокрутки при переходе на мобильную версию
            if (window.innerWidth < 769) {
                document.body.classList.remove('mobile-menu-open');
            }
        });

        // Enhanced Smooth Scroll function
        function smoothScrollTo(targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Smooth Scroll for desktop navigation - удалено, так как теперь используется только мобильное меню

        // Smooth Scroll only for internal anchors inside menu
        document.querySelectorAll('.mobile-menu a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    smoothScrollTo(targetElement);
                }
            });
        });


        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // GSAP Animations
        // Hero Section
        gsap.from('.hero-content h1', {
            opacity: 0,
            y: 100,
            duration: 1.5,
            ease: 'power4.out'
        });

        gsap.from('.hero-content p', {
            opacity: 0,
            y: 50,
            duration: 1.5,
            delay: 0.3,
            ease: 'power4.out'
        });

        gsap.from('.cta-button', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: 0.6,
            ease: 'back.out(1.7)'
        });

        // Parallax Effect
        gsap.to('.parallax-bg', {
            scrollTrigger: {
                trigger: '.hero',
                scrub: true,
                start: 'top top',
                end: 'bottom top'
            },
            yPercent: 20,
            ease: 'none'
        });

        // About Section
        gsap.from('.about h2', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%'
            },
            opacity: 0,
            x: -100,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.about p', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%'
            },
            opacity: 0,
            x: 100,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });

        // Footer Animation
        gsap.from('footer p', {
            scrollTrigger: {
                trigger: 'footer',
                start: 'top 90%'
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out'
        });

        // Logo Animation on Load
        gsap.from('.logo img', {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power3.out'
        });
