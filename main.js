// Main JavaScript utility & helper script

document.addEventListener('DOMContentLoaded', () => {
    // Render dynamic grids on pages if they exist
    const digitalGrid = document.getElementById('digital-services-grid');
    if (digitalGrid && typeof PORTFOLIO_DATA !== 'undefined') {
        digitalGrid.innerHTML = PORTFOLIO_DATA.services.digital.map(service => `
            <div class="service-card fade-in">
                <div class="service-card-icon">⚡</div>
                <h4>${service.title}</h4>
                <p>${service.description}</p>
            </div>
        `).join('');
    }
    
    const educationGrid = document.getElementById('education-services-grid');
    if (educationGrid && typeof PORTFOLIO_DATA !== 'undefined') {
        educationGrid.innerHTML = PORTFOLIO_DATA.services.education.map(service => `
            <div class="service-card fade-in">
                <div class="service-card-icon">📚</div>
                <h4>${service.title}</h4>
                <p>${service.description}</p>
            </div>
        `).join('');
    }

    // Trigger IntersectionObserver for dynamically inserted elements
    const newReveals = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.05 });
    
    newReveals.forEach(el => observer.observe(el));
});
