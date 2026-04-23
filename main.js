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