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
        gsap.registerPlugin(ScrollTrigger);

        // Hero animations
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

        // Section animations
        gsap.utils.toArray('.section h2').forEach(heading => {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 80%'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // History section — плавное появление текста и изображения
        const historyContent = document.querySelector('.history-content');
        if (historyContent) {
            const historyScroll = {
                trigger: historyContent,
                start: 'top 85%',
                toggleActions: 'play none none none'
            };

            gsap.fromTo('.history-text',
                { opacity: 0, x: -48, y: 24 },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1.4,
                    ease: 'power2.out',
                    scrollTrigger: historyScroll
                }
            );

            gsap.fromTo('.history-image',
                { opacity: 0, x: 48, y: 24, scale: 0.96 },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1.4,
                    delay: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: historyScroll
                }
            );
        }

        // Values cards
        gsap.from('.value-card', {
            scrollTrigger: {
                trigger: '.values-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        });

        // CTA section
        gsap.from('.cta-section h2', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.cta-button', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 80%'
            },
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: 0.3,
            ease: 'back.out(1.7)'
        });

        // Footer animation
        gsap.from('footer p', {
            scrollTrigger: {
                trigger: 'footer',
                start: 'top 90%'
            },
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out'
        });
