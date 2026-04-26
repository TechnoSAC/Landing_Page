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
            'team.title': 'Conoce a quienes hacen posible FullTank',
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
            'team.title': 'Meet the people behind FullTank',
            'team.subtitle': 'We are 5 Software Engineering students from UPC committed to digitalizing the energy sector.',
        }
    };

    // CSS selector-based translations for existing page elements
    const PAGE_T = {
        es: {
            text: {
                '.social-proof-label': 'Empresas que ya confían en FullTank',
                '#problema .label': 'El Problema',
                '#problema .section-header > p': 'Así gestiona el combustible la mayoría de empresas hoy en día…',
                '#como-funciona .label': 'Proceso',
                '#como-funciona .section-header > p': 'Desde el pedido hasta la entrega confirmada — todo en una sola plataforma.',
                '#beneficios .label': 'Características',
                '#beneficios .section-header > p': 'Diseñado específicamente para solicitantes y proveedores de combustible industrial.',
                '#metricas .section-header h2': 'Resultados que hablan por sí solos',
                '#testimonios .label': 'Testimonios',
                '#testimonios .section-header h2': 'Lo que dicen quienes ya usan FullTank',
                '#precios .label': 'Precios',
                '#precios .section-header h2': 'Planes que crecen contigo',
                '#precios .section-header > p': 'Comienza gratis. Escala cuando tu operación lo exija.',
                '#faq .section-header h2': 'Preguntas frecuentes',
                '#contacto .cta-final-subtitle': 'Únete a más de 200 empresas que ya gestionan sus pedidos de combustible con FullTank. Sin contratos. Sin complicaciones.',
                '#btn-cta-final': 'Empezar gratis ahora →',
                '.footer-brand > p': 'Plataforma B2B para la gestión digital de compraventa y distribución de combustible industrial en Perú.',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(1) h3': 'Registra tu pedido',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(1) p': 'El solicitante crea un pedido en menos de 3 minutos: tipo de combustible, cantidad, fecha y dirección. Sube el comprobante de pago directo en la plataforma.',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(3) h3': 'El proveedor aprueba',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(3) p': 'El proveedor recibe el pedido, valida el pago y lo aprueba con un clic. Sin llamadas, sin correos. El estado se actualiza automáticamente.',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(5) h3': 'Despacho y trazabilidad',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(5) p': 'El proveedor asigna vehículo y conductor. El solicitante recibe notificación de que su pedido está en camino, en tiempo real.',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(7) h3': 'Confirmación y cierre',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(7) p': 'El solicitante confirma la entrega. El proveedor cierra el pedido. El historial queda guardado para auditoría y reportes futuros.',
                '#segmentos .segment-card:nth-of-type(1) .badge': 'Empresas Solicitantes',
                '#segmentos .segment-card:nth-of-type(1) .persona-role': '"El Operador Crítico"',
                '#segmentos .segment-card:nth-of-type(1) .persona-quote': '"Necesito saber exactamente dónde está mi pedido sin tener que llamar todo el día."',
                '#segmentos .segment-card:nth-of-type(1) p': 'Empresas de construcción, minería, agroindustria y logística que requieren combustible constante para sus operaciones y no pueden permitirse interrupciones.',
                '#segmentos .segment-card:nth-of-type(1) a': 'Soy solicitante →',
                '#segmentos .segment-card:nth-of-type(2) .badge': 'Proveedores de Combustible',
                '#segmentos .segment-card:nth-of-type(2) .persona-role': '"La Gestora Saturada"',
                '#segmentos .segment-card:nth-of-type(2) .persona-quote': '"Si pudiera ver todos los pedidos organizados automáticamente, ahorraría horas de trabajo cada día."',
                '#segmentos .segment-card:nth-of-type(2) p': 'Distribuidoras de combustible que atienden múltiples clientes corporativos y buscan escalar operaciones sin aumentar personal ni errores.',
                '#segmentos .segment-card:nth-of-type(2) a': 'Soy proveedor →',
                '#metricas .metric-cell:nth-of-type(1) .metric-label': 'Reducción en tiempo de gestión',
                '#metricas .metric-cell:nth-of-type(2) .metric-label': 'Pedidos sin correcciones posteriores',
                '#metricas .metric-cell:nth-of-type(3) .metric-label': 'Tiempo para registrar un pedido',
                '#metricas .metric-cell:nth-of-type(4) .metric-label': 'Menos errores logísticos reportados',
            },
            html: {
                '.hero .hero-badge span': '⏱ Gestión de combustible en tiempo real',
                '.hero h1': 'Deja atrás el <span class="hero-strike">caos</span>.<br>Gestiona combustible<br>como un <span class="hero-underline">profesional.</span>',
                '.hero-subtitle': 'FullTank conecta empresas industriales con sus proveedores de combustible en una plataforma centralizada. Pedidos, pagos, logística y trazabilidad en tiempo real — sin llamadas, sin Excel, sin errores.',
                '#problema .section-header h2': '¿Te suena familiar esta situación?',
                '.problem-transition-arrow': 'FullTank elimina todo esto →',
                '#como-funciona .section-header h2': 'Gestión de combustible en 4 pasos simples',
                '.how-cta a': 'Empieza a usar FullTank →',
                '#beneficios .section-header h2': 'Todo lo que necesitas para gestionar<br>combustible B2B sin fricciones',
                '#segmentos .section-header h2': 'Una plataforma. Dos soluciones.',
                '#segmentos .section-header > p': 'FullTank está diseñado desde cero para las dos partes del proceso.',
                '#contacto h2': '¿Listo para decirle adiós<br>al caos del combustible?',
                '.hero-checks li:nth-child(1)': '<span class="check-emoji">✓</span> Sin tarjeta de crédito requerida',
                '.hero-checks li:nth-child(2)': '<span class="check-emoji">✓</span> Configuración en menos de 10 minutos',
                '.hero-checks li:nth-child(3)': '<span class="check-emoji">✓</span> Soporte en español incluido',
                '#btn-hero-demo': 'Conviértete en un Starter',
                '#problema .pain-card:nth-of-type(1) h3': 'Pedidos perdidos en WhatsApp',
                '#problema .pain-card:nth-of-type(1) p': 'Mensajes enterrados entre conversaciones. Sin confirmación formal ni trazabilidad de qué se pidió, cuándo y a quién.',
                '#problema .pain-card:nth-of-type(2) h3': 'Excel interminable y desconectado',
                '#problema .pain-card:nth-of-type(2) p': 'Planillas duplicadas, datos desactualizados y errores de digitación que nadie detecta hasta que ya es demasiado tarde.',
                '#problema .pain-card:nth-of-type(3) h3': 'Llamadas para preguntar "¿dónde está mi pedido?"',
                '#problema .pain-card:nth-of-type(3) p': 'Horas perdidas en seguimiento manual. Ninguna visibilidad real del estado de la entrega.',
                '#problema .pain-card:nth-of-type(4) h3': 'Errores que paralizan operaciones',
                '#problema .pain-card:nth-of-type(4) p': 'Un error en el pedido puede detener una obra entera. Las consecuencias económicas son devastadoras.',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(1)': '<span class="icon-check">✓</span> Registra pedidos en menos de 3 minutos',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(2)': '<span class="icon-check">✓</span> Estado de pedido en tiempo real',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(3)': '<span class="icon-check">✓</span> Historial completo de consumo y gastos',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(4)': '<span class="icon-check">✓</span> Notificaciones de aprobación y entrega',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(5)': '<span class="icon-check">✓</span> Descarga reportes de consumo en PDF',

                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(1)': '<span class="icon-check">✓</span> Centraliza todos los pedidos entrantes',
                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(2)': '<span class="icon-check">✓</span> Valida pagos y aprueba con un clic',
                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(3)': '<span class="icon-check">✓</span> Asigna vehículos y conductores sin conflictos',
                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(4)': '<span class="icon-check">✓</span> Reportes de ventas por cliente y periodo',
                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(5)': '<span class="icon-check">✓</span> Reduce errores logísticos en un 60%',
            }
        },
        en: {
            text: {
                '.social-proof-label': 'Companies that already trust FullTank',
                '#problema .label': 'The Problem',
                '#problema .section-header > p': 'This is how most companies manage fuel today…',
                '#como-funciona .label': 'Process',
                '#como-funciona .section-header > p': 'From the order to confirmed delivery — all in one platform.',
                '#beneficios .label': 'Features',
                '#beneficios .section-header > p': 'Designed specifically for industrial fuel requesters and suppliers.',
                '#metricas .section-header h2': 'Results that speak for themselves',
                '#testimonios .label': 'Testimonials',
                '#testimonios .section-header h2': 'What those who already use FullTank say',
                '#precios .label': 'Pricing',
                '#precios .section-header h2': 'Plans that grow with you',
                '#precios .section-header > p': 'Start free. Scale when your operation demands it.',
                '#faq .section-header h2': 'Frequently asked questions',
                '#contacto .cta-final-subtitle': 'Join over 200 companies already managing their fuel orders with FullTank. No contracts. No complications.',
                '#btn-cta-final': 'Start free now →',
                '.footer-brand > p': 'B2B platform for the digital management of industrial fuel trading and distribution in Peru.',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(1) h3': 'Create your order',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(1) p': 'The requester creates an order in under 3 minutes: fuel type, quantity, date, and address. Upload the payment proof directly on the platform.',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(3) h3': 'Supplier approves',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(3) p': 'The supplier receives the order, validates the payment, and approves it with one click. No calls, no emails. The status updates automatically.',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(5) h3': 'Dispatch & tracking',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(5) p': 'The supplier assigns a vehicle and driver. The requester gets notified that the order is on its way, in real time.',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(7) h3': 'Confirmation & closure',
                '#como-funciona .how-steps-wrapper > .step-block:nth-child(7) p': 'The requester confirms delivery. The supplier closes the order. The history is stored for audits and future reports.',
                '#beneficios .feature-card:nth-of-type(1) h3': 'Trazabilidad en tiempo real',
                '#beneficios .feature-card:nth-of-type(1) p': 'Monitorea cada pedido en tiempo real. Sabe exactamente en qué estado está tu combustible, desde la aprobación hasta la entrega en obra.',
                '#beneficios .feature-card:nth-of-type(2) h3': 'Aprobaciones automáticas',
                '#beneficios .feature-card:nth-of-type(2) p': 'Valida pagos y aprueba pedidos sin intermediarios. Reduce el tiempo de confirmación de horas a minutos con flujos automatizados.',
                '#beneficios .feature-card:nth-of-type(3) h3': 'Dashboard inteligente',
                '#beneficios .feature-card:nth-of-type(3) p': 'KPIs de pedidos, consumo mensual por proveedor y métricas de rendimiento en un panel visual y centralizado. Sin hojas de cálculo.',
                '#beneficios .feature-card:nth-of-type(4) h3': 'Notificaciones automáticas',
                '#beneficios .feature-card:nth-of-type(4) p': 'Alertas instantáneas en cada cambio de estado. Aprobado, despachado, entregado — tu equipo siempre informado sin hacer una sola llamada.',
                '#beneficios .feature-card:nth-of-type(5) h3': 'Reportes y exportación PDF',
                '#beneficios .feature-card:nth-of-type(5) p': 'Genera reportes de ventas o consumo filtrando por fecha, cliente o tipo de combustible. Descárgalos en PDF con un solo clic.',
                '#beneficios .feature-card:nth-of-type(6) h3': 'Gestión logística integrada',
                '#beneficios .feature-card:nth-of-type(6) p': 'Asigna vehículos disponibles y conductores a cada pedido aprobado. Evita conflictos de agenda con validación automática de disponibilidad.',
                '#segmentos .segment-card:nth-of-type(1) .badge': 'Requesting Companies',
                '#segmentos .segment-card:nth-of-type(1) .persona-role': '"The Critical Operator"',
                '#segmentos .segment-card:nth-of-type(1) .persona-quote': '"I need to know exactly where my order is without having to call all day."',
                '#segmentos .segment-card:nth-of-type(1) p': 'Construction, mining, agro-industrial, and logistics companies that require constant fuel for their operations and cannot afford interruptions.',
                '#segmentos .segment-card:nth-of-type(1) a': 'I am a requester →',
                '#segmentos .segment-card:nth-of-type(2) .badge': 'Fuel Suppliers',
                '#segmentos .segment-card:nth-of-type(2) .persona-role': '"The Overloaded Manager"',
                '#segmentos .segment-card:nth-of-type(2) .persona-quote': '"If I could see all orders automatically organized, I would save hours of work every day."',
                '#segmentos .segment-card:nth-of-type(2) p': 'Fuel distributors serving multiple corporate clients who want to scale operations without increasing staff or errors.',
                '#segmentos .segment-card:nth-of-type(2) a': 'I am a supplier →',
                '#metricas .metric-cell:nth-of-type(1) .metric-label': 'Reduction in management time',
                '#metricas .metric-cell:nth-of-type(2) .metric-label': 'Orders without post-order corrections',
                '#metricas .metric-cell:nth-of-type(3) .metric-label': 'Time to create an order',
                '#metricas .metric-cell:nth-of-type(4) .metric-label': 'Fewer reported logistics errors',
            },
            html: {
                '.hero .hero-badge span': '⏱ Real-time fuel management',
                '.hero h1': 'Leave the <span class="hero-strike">chaos</span> behind.<br>Manage your fuel<br>like a <span class="hero-underline">professional.</span>',
                '.hero-subtitle': 'FullTank connects industrial companies with their fuel suppliers on a centralized platform. Orders, payments, logistics, and real-time traceability — no calls, no spreadsheets, no errors.',
                '#problema .section-header h2': 'Does this situation sound familiar?',
                '.problem-transition-arrow': 'FullTank eliminates all of this →',
                '#como-funciona .section-header h2': 'Fuel management in 4 simple steps',
                '.how-cta a': 'Start using FullTank →',
                '#beneficios .section-header h2': 'Everything you need to manage<br>B2B fuel without friction',
                '#segmentos .section-header h2': 'One platform. Two solutions.',
                '#segmentos .section-header > p': 'FullTank is designed from the ground up for both sides of the process.',
                '#contacto h2': 'Ready to say goodbye<br>to fuel management chaos?',
                '.hero-checks li:nth-child(1)': '<span class="check-emoji">✓</span> No credit card required',
                '.hero-checks li:nth-child(2)': '<span class="check-emoji">✓</span> Setup in under 10 minutes',
                '.hero-checks li:nth-child(3)': '<span class="check-emoji">✓</span> Spanish support included',
                '#btn-hero-demo': 'Become a Starter',
                '#problema .pain-card:nth-of-type(1) h3': 'Lost orders in WhatsApp',
                '#problema .pain-card:nth-of-type(1) p': 'Messages buried in conversations. No formal confirmation or traceability of what was ordered, when, and by whom.',
                '#problema .pain-card:nth-of-type(2) h3': 'Endless and disconnected spreadsheets',
                '#problema .pain-card:nth-of-type(2) p': 'Duplicate sheets, outdated data, and input errors that go unnoticed until it’s too late.',
                '#problema .pain-card:nth-of-type(3) h3': 'Calls asking "Where is my order?"',
                '#problema .pain-card:nth-of-type(3) p': 'Hours wasted on manual tracking. No real visibility into delivery status.',
                '#problema .pain-card:nth-of-type(4) h3': 'Errors that halt operations',
                '#problema .pain-card:nth-of-type(4) p': 'A single mistake can stop an entire project. The financial consequences are severe.',
                '#beneficios .feature-card:nth-of-type(1) h3': 'Real-time tracking',
                '#beneficios .feature-card:nth-of-type(1) p': 'Monitor every order in real time. Know exactly the status of your fuel, from approval to on-site delivery.',
                '#beneficios .feature-card:nth-of-type(2) h3': 'Automated approvals',
                '#beneficios .feature-card:nth-of-type(2) p': 'Validate payments and approve orders without intermediaries. Reduce confirmation time from hours to minutes with automated workflows.',
                '#beneficios .feature-card:nth-of-type(3) h3': 'Smart dashboard',
                '#beneficios .feature-card:nth-of-type(3) p': 'Order KPIs, monthly consumption per supplier, and performance metrics in a centralized visual dashboard. No spreadsheets needed.',
                '#beneficios .feature-card:nth-of-type(4) h3': 'Automated notifications',
                '#beneficios .feature-card:nth-of-type(4) p': 'Instant alerts for every status change. Approved, dispatched, delivered — your team always informed without making a single call.',
                '#beneficios .feature-card:nth-of-type(5) h3': 'Reports & PDF export',
                '#beneficios .feature-card:nth-of-type(5) p': 'Generate sales or consumption reports filtered by date, client, or fuel type. Download them as PDF with a single click.',
                '#beneficios .feature-card:nth-of-type(6) h3': 'Integrated logistics management',
                '#beneficios .feature-card:nth-of-type(6) p': 'Assign available vehicles and drivers to each approved order. Avoid scheduling conflicts with automatic availability validation.',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(1)': '<span class="icon-check">✓</span> Create orders in under 3 minutes',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(2)': '<span class="icon-check">✓</span> Real-time order status',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(3)': '<span class="icon-check">✓</span> Complete consumption and expense history',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(4)': '<span class="icon-check">✓</span> Approval and delivery notifications',
                '#segmentos .segment-card:nth-of-type(1) .check-list li:nth-child(5)': '<span class="icon-check">✓</span> Download consumption reports in PDF',
                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(1)': '<span class="icon-check">✓</span> Centralize all incoming orders',
                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(2)': '<span class="icon-check">✓</span> Validate payments and approve with one click',
                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(3)': '<span class="icon-check">✓</span> Assign vehicles and drivers without conflicts',
                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(4)': '<span class="icon-check">✓</span> Sales reports by client and period',
                '#segmentos .segment-card:nth-of-type(2) .check-list li:nth-child(5)': '<span class="icon-check">✓</span> Reduce logistics errors by 60%',
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