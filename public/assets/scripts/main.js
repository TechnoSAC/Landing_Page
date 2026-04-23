document.addEventListener('DOMContentLoaded', () => {

    //  1. NAVBAR SCROLL EFFECT 
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 24) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    //  2. HAMBURGER / DRAWER 
    const hamburger = document.getElementById('hamburger');
    const navDrawer = document.getElementById('navDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');

    const openDrawer = () => {
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        navDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    hamburger?.addEventListener('click', () => {
        hamburger.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    drawerOverlay?.addEventListener('click', closeDrawer);
    drawerClose?.addEventListener('click', closeDrawer);

    // Close drawer on nav link click
    document.querySelectorAll('.drawer-nav-link').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    //  3. SMOOTH SCROLL FOR ANCHOR LINKS 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    //  4. FAQ ACCORDION 
    document.querySelectorAll('.faq-item').forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const body = item.querySelector('.faq-body');

        trigger?.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all others
            document.querySelectorAll('.faq-item.open').forEach(other => {
                other.classList.remove('open');
                other.querySelector('.faq-body')?.classList.remove('open');
                other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
                body?.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    //  5. PRICING TOGGLE 
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const monthPrices = document.querySelectorAll('.price-monthly');
    const yearPrices = document.querySelectorAll('.price-yearly');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const isYearly = btn.dataset.period === 'yearly';
            monthPrices.forEach(p => p.style.display = isYearly ? 'none' : '');
            yearPrices.forEach(p => p.style.display = isYearly ? '' : 'none');
        });
    });

    //  6. INTERSECTION OBSERVER (fade-in) 
    const fadeEls = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => fadeObserver.observe(el));

    //  7. COUNTER ANIMATION 
    const counters = document.querySelectorAll('.metric-number[data-target]');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const duration = 1800;
            const step = 16;
            const steps = duration / step;
            let current = 0;

            const timer = setInterval(() => {
                current += target / steps;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                const display = Number.isInteger(target) ? Math.round(current) : current.toFixed(1);
                el.textContent = prefix + display + suffix;
            }, step);

            countObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));

    //  8. SCROLL TO TOP 
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    //  9. NAVBAR ACTIVE LINK 
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a');

    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => activeObserver.observe(s));

    //  11. LANGUAGE TOGGLE 

    // Dictionary for data-i18n attribute elements (navbar + new sections)
    const I18N = {
        es: {
            'nav.home': 'Inicio',
            'nav.how': 'Cómo funciona',
            'nav.benefits': 'Beneficios',
            'nav.pricing': 'Precios',
            'nav.testimonials': 'Testimonios',
            'nav.about': 'Sobre nosotros',
            'nav.contact': 'Contacto',
            'nav.login': 'Iniciar sesión',
            'nav.cta': 'Comenzar gratis',
            'about.label': 'Nuestra Startup',
            'about.badge': '🎓 Startup UPC · Lima, Perú',
            'about.title': '¿Quiénes somos?',
            'about.description': 'Prime Fuel es un startup innovador dedicado a la gestión de la compraventa de combustible entre empresas solicitantes y proveedores. Fundada por estudiantes de la Universidad Peruana de Ciencias Aplicadas, nuestra propuesta se centra en la digitalización de un sector tradicionalmente dependiente de procesos manuales, brindando una solución tecnológica que garantiza eficiencia, transparencia y un control más riguroso de las operaciones.',
            'about.mission.title': 'Misión',
            'about.mission.text': 'Desarrollar soluciones tecnológicas avanzadas que transformen el mercado de combustible, eliminando los medios informales y reduciendo el margen de error, mediante una plataforma web intuitiva y accesible.',
            'about.vision.title': 'Visión',
            'about.vision.text': 'Posicionarnos como líderes en la digitalización del sector energético, ofreciendo a las empresas una herramienta que facilite una gestión más eficiente, segura y sostenible, contribuyendo al progreso tecnológico y a la mejora de la competitividad del sector.',
            'about.stat1': 'Estudiantes fundadores de la UPC',
            'about.stat2': 'Empresas en lista de espera',
            'about.stat3': 'Plataforma para todo el flujo de combustible',
            'about.upc': '🏫 Universidad Peruana de Ciencias Aplicadas',
            'team.label': 'El Equipo',
            'team.title': 'Conoce a quienes hacen posible TankMaster',
            'team.subtitle': 'Somos 5 estudiantes de Ingeniería de Software de la UPC comprometidos con digitalizar el sector energético.',
        },
        en: {
            'nav.home': 'Home',
            'nav.how': 'How it works',
            'nav.benefits': 'Benefits',
            'nav.pricing': 'Pricing',
            'nav.testimonials': 'Testimonials',
            'nav.about': 'About us',
            'nav.contact': 'Contact',
            'nav.login': 'Log in',
            'nav.cta': 'Get started free',
            'about.label': 'Our Startup',
            'about.badge': '🎓 UPC Startup · Lima, Peru',
            'about.title': 'Who are we?',
            'about.description': 'Prime Fuel is an innovative startup dedicated to managing the buying and selling of fuel between requesting companies and suppliers. Founded by students at the Peruvian University of Applied Sciences (UPC), our proposal focuses on digitalizing a sector traditionally dependent on manual processes, providing a technological solution that ensures efficiency, transparency, and more rigorous operational control.',
            'about.mission.title': 'Mission',
            'about.mission.text': 'To develop advanced technological solutions that transform the fuel market by eliminating informal channels and reducing the margin of error through an intuitive and accessible web platform.',
            'about.vision.title': 'Vision',
            'about.vision.text': 'To position ourselves as leaders in the digitalization of the energy sector, offering companies a tool that enables more efficient, secure, and sustainable management, contributing to technological progress and improving sector competitiveness.',
            'about.stat1': 'UPC founding students',
            'about.stat2': 'Companies on the waiting list',
            'about.stat3': 'Platform for the complete fuel flow',
            'about.upc': '🏫 Peruvian University of Applied Sciences',
            'team.label': 'The Team',
            'team.title': 'Meet the people behind TankMaster',
            'team.subtitle': 'We are 5 Software Engineering students from UPC committed to digitalizing the energy sector.',
        }
    };

    // CSS selector-based translations for existing page elements
    const PAGE_T = {
        es: {
            text: {
                '.social-proof-label': 'Empresas que ya confían en TankMaster',
                '#problema .label': 'El Problema',
                '#problema .section-header > p': 'Así gestiona el combustible la mayoría de empresas hoy en día…',
                '#como-funciona .label': 'Proceso',
                '#como-funciona .section-header > p': 'Desde el pedido hasta la entrega confirmada — todo en una sola plataforma.',
                '#beneficios .label': 'Características',
                '#beneficios .section-header > p': 'Diseñado específicamente para solicitantes y proveedores de combustible industrial.',
                '#metricas .section-header h2': 'Resultados que hablan por sí solos',
                '#testimonios .label': 'Testimonios',
                '#testimonios .section-header h2': 'Lo que dicen quienes ya usan TankMaster',
                '#precios .label': 'Precios',
                '#precios .section-header h2': 'Planes que crecen contigo',
                '#precios .section-header > p': 'Comienza gratis. Escala cuando tu operación lo exija.',
                '#faq .section-header h2': 'Preguntas frecuentes',
                '#contacto .cta-final-subtitle': 'Únete a más de 200 empresas que ya gestionan sus pedidos de combustible con TankMaster. Sin contratos. Sin complicaciones.',
                '#btn-cta-final': 'Empezar gratis ahora →',
                '.footer-brand > p': 'Plataforma B2B para la gestión digital de compraventa y distribución de combustible industrial en Perú.',
            },
            html: {
                '.hero .hero-badge span': '⏱ Gestión de combustible en tiempo real',
                '.hero h1': 'Deja atrás el <span class="hero-strike">caos</span>.<br>Gestiona combustible<br>como un <span class="hero-underline">profesional.</span>',
                '.hero-subtitle': 'TankMaster conecta empresas industriales con sus proveedores de combustible en una plataforma centralizada. Pedidos, pagos, logística y trazabilidad en tiempo real — sin llamadas, sin Excel, sin errores.',
                '#problema .section-header h2': '¿Te suena familiar esta situación?',
                '.problem-transition-arrow': 'TankMaster elimina todo esto →',
                '#como-funciona .section-header h2': 'Gestión de combustible en 4 pasos simples',
                '.how-cta a': 'Empieza a usar TankMaster →',
                '#beneficios .section-header h2': 'Todo lo que necesitas para gestionar<br>combustible B2B sin fricciones',
                '#segmentos .section-header h2': 'Una plataforma. Dos soluciones.',
                '#segmentos .section-header > p': 'TankMaster está diseñado desde cero para las dos partes del proceso.',
                '#contacto h2': '¿Listo para decirle adiós<br>al caos del combustible?',
            }
        },
        en: {
            text: {
                '.social-proof-label': 'Companies that already trust TankMaster',
                '#problema .label': 'The Problem',
                '#problema .section-header > p': 'This is how most companies manage fuel today…',
                '#como-funciona .label': 'Process',
                '#como-funciona .section-header > p': 'From the order to confirmed delivery — all in one platform.',
                '#beneficios .label': 'Features',
                '#beneficios .section-header > p': 'Designed specifically for industrial fuel requesters and suppliers.',
                '#metricas .section-header h2': 'Results that speak for themselves',
                '#testimonios .label': 'Testimonials',
                '#testimonios .section-header h2': 'What those who already use TankMaster say',
                '#precios .label': 'Pricing',
                '#precios .section-header h2': 'Plans that grow with you',
                '#precios .section-header > p': 'Start free. Scale when your operation demands it.',
                '#faq .section-header h2': 'Frequently asked questions',
                '#contacto .cta-final-subtitle': 'Join over 200 companies already managing their fuel orders with TankMaster. No contracts. No complications.',
                '#btn-cta-final': 'Start free now →',
                '.footer-brand > p': 'B2B platform for the digital management of industrial fuel trading and distribution in Peru.',
            },
            html: {
                '.hero .hero-badge span': '⏱ Real-time fuel management',
                '.hero h1': 'Leave the <span class="hero-strike">chaos</span> behind.<br>Manage your fuel<br>like a <span class="hero-underline">professional.</span>',
                '.hero-subtitle': 'TankMaster connects industrial companies with their fuel suppliers on a centralized platform. Orders, payments, logistics, and real-time traceability — no calls, no spreadsheets, no errors.',
                '#problema .section-header h2': 'Does this situation sound familiar?',
                '.problem-transition-arrow': 'TankMaster eliminates all of this →',
                '#como-funciona .section-header h2': 'Fuel management in 4 simple steps',
                '.how-cta a': 'Start using TankMaster →',
                '#beneficios .section-header h2': 'Everything you need to manage<br>B2B fuel without friction',
                '#segmentos .section-header h2': 'One platform. Two solutions.',
                '#segmentos .section-header > p': 'TankMaster is designed from the ground up for both sides of the process.',
                '#contacto h2': 'Ready to say goodbye<br>to fuel management chaos?',
            }
        }
    };

    let currentLang = localStorage.getItem('tm-lang') || 'es';

    const applyLanguage = (lang) => {
        currentLang = lang;

        // Update all language buttons (desktop + mobile drawer)
        document.querySelectorAll('.lang-select').forEach(btn => {
            btn.innerHTML = `🌐 ${lang.toUpperCase()} ▾`;
        });

        // 1. Apply CSS-selector based translations (existing content)
        const { text: textMap, html: htmlMap } = PAGE_T[lang];
        Object.entries(textMap).forEach(([sel, val]) => {
            document.querySelectorAll(sel).forEach(el => { el.textContent = val; });
        });
        Object.entries(htmlMap).forEach(([sel, val]) => {
            document.querySelectorAll(sel).forEach(el => { el.innerHTML = val; });
        });

        // 2. Apply data-i18n attribute translations (new sections + navbar)
        const dict = I18N[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (dict[key] !== undefined) el.textContent = dict[key];
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18nHtml;
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });

        localStorage.setItem('tm-lang', lang);
    };

    // Attach click handlers to all lang buttons
    document.querySelectorAll('.lang-select').forEach(btn => {
        btn.addEventListener('click', () => {
            applyLanguage(currentLang === 'es' ? 'en' : 'es');
        });
    });

    // Initialize: apply stored language preference
    if (currentLang !== 'es') applyLanguage(currentLang);

});