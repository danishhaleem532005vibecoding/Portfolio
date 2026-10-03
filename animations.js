document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor logic
    const cursor = document.getElementById('custom-cursor');
    
    if (window.innerWidth > 768 && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.querySelectorAll('a, button, input, select, textarea, .service-card, .btn-primary, .btn-secondary, .project-image-box').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }

    // Scroll reveal observer
    const revealElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-up');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });
    
    revealElements.forEach(el => observer.observe(el));

    // Navbar background blur & size adjustment on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});
