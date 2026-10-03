const renderNavbar = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    // Extract page file name from window.location.pathname
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    navbar.innerHTML = `
        <div class="nav-brand">
            <a href="index.html">
                <span class="brand-title">AHMAD DANISH</span>
                <span class="brand-subtitle">Nitora Web & Digital</span>
            </a>
        </div>
        
        <button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <div class="nav-links" id="nav-menu">
            <a href="index.html" class="${page === 'index.html' || page === '' ? 'active' : ''}">Home</a>
            <a href="about.html" class="${page === 'about.html' ? 'active' : ''}">About</a>
            <a href="services.html" class="${page === 'services.html' ? 'active' : ''}">Services</a>
            <a href="projects.html" class="${page === 'projects.html' ? 'active' : ''}">Projects</a>
            <a href="experience.html" class="${page === 'experience.html' ? 'active' : ''}">Experience</a>
            <a href="skills.html" class="${page === 'skills.html' ? 'active' : ''}">Skills</a>
            <a href="education.html" class="${page === 'education.html' ? 'active' : ''}">Education</a>
            <a href="ai-software.html" class="${page === 'ai-software.html' ? 'active' : ''}">AI & Software</a>
            <a href="design.html" class="${page === 'design.html' ? 'active' : ''}">Design</a>
            <a href="contact.html" class="${page === 'contact.html' ? 'active' : ''}">Contact</a>
            <a href="contact.html" class="btn-primary" style="padding: 0.5rem 1.25rem;">Let's Work Together</a>
        </div>
    `;

    // Mobile menu click toggle
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
};

const renderFooter = () => {
    const footer = document.getElementById('footer');
    if (!footer) return;
    
    footer.innerHTML = `
        <div class="footer-grid">
            <div class="footer-col">
                <h3>AHMAD DANISH</h3>
                <p style="color: var(--accent-blue); font-weight:600; margin-bottom:0.75rem;">Founder — Nitora Web & Digital</p>
                <p style="font-size:0.9rem;">"Building digital experiences, business solutions and learning opportunities."</p>
            </div>
            <div class="footer-col">
                <h4>DIGITAL SERVICES</h4>
                <ul>
                    <li>Web Development</li>
                    <li>Shopify & E-Commerce</li>
                    <li>SEO & Local SEO</li>
                    <li>Digital Marketing</li>
                    <li>Graphic Design</li>
                    <li>Lead Generation</li>
                    <li>Software Development</li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>EDUCATION</h4>
                <ul>
                    <li>Quran Tutoring</li>
                    <li>Mathematics Tutoring</li>
                    <li>Science & Academic Support</li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>GET IN TOUCH</h4>
                <ul>
                    <li><strong>Email:</strong> <a href="mailto:${PORTFOLIO_DATA.personalInfo.email}">${PORTFOLIO_DATA.personalInfo.email}</a></li>
                    <li><strong>WhatsApp:</strong> <a href="https://wa.me/923119306469" target="_blank">${PORTFOLIO_DATA.personalInfo.whatsapp}</a></li>
                    <li><strong>Fiverr:</strong> <a href="https://fiverr.com/danishahmad1122" target="_blank">${PORTFOLIO_DATA.personalInfo.fiverr}</a></li>
                    <li><strong>Location:</strong> ${PORTFOLIO_DATA.personalInfo.location}</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2026 Ahmad Danish. All Rights Reserved. | Founder of Nitora Web and Digital</p>
        </div>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
});
