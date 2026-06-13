// ===== Wiesnu Hardoyo Portfolio - Interactivity =====
document.addEventListener('DOMContentLoaded', () => {

    /* Footer year */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* Navbar scroll effect */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    /* Mobile menu toggle */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    /* Reveal-on-scroll for sections */
    document.querySelectorAll('.section, .dept-card, .tl-item, .project-card').forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* Animated counters */
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(el) {
        const target = +el.dataset.target;
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(progress * target) + (progress === 1 ? '+' : '');
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    /* Animate skill bars */
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    skillFills.forEach(f => skillObserver.observe(f));

    /* Contact form handling (front-end only) */
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        note.style.color = 'var(--blue)';
        note.textContent = `Terima kasih, ${name}! Pesan Anda telah tercatat. Saya akan segera membalas.`;
        form.reset();
        setTimeout(() => { note.textContent = ''; }, 6000);
    });
});