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
        if (menuCloseBtn) {
            menuCloseBtn.addEventListener('click', closeMenu);
        }

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

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe news cards and featured news
        document.querySelectorAll('.news-card, .featured-news').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Scroll featured button target to viewport center
        const featuredBtn = document.querySelector('.featured-btn');
        if (featuredBtn) {
            featuredBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector('#news-grid');
                if (!target) return;

                const rect = target.getBoundingClientRect();
                const targetCenter = window.pageYOffset + rect.top + (rect.height / 2);
                const viewportCenterOffset = window.innerHeight / 2;
                const top = Math.max(0, targetCenter - viewportCenterOffset);

                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            });
        }
