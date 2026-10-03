import os

pages = {
    'index.html': 'Home',
    'about.html': 'About',
    'services.html': 'Services',
    'projects.html': 'Projects',
    'experience.html': 'Experience',
    'skills.html': 'Skills',
    'education.html': 'Education',
    'ai-software.html': 'AI & Software',
    'design.html': 'Graphic Design',
    'contact.html': 'Contact'
}

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ahmad Danish | Digital Marketer, Web Developer, Shopify Expert & Tutor - {title}</title>
    <meta name="description" content="Ahmad Danish is a digital marketer, web developer, Shopify expert, SEO specialist, graphic designer and online tutor helping businesses and students through digital services and education.">
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/animations.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="custom-cursor"></div>
    <nav id="navbar" class="navbar"></nav>
    <main id="main-content">
        <!-- Content for {title} will be injected here by JS or hardcoded -->
        <section class="hero-section text-center py-20">
            <h1>{title}</h1>
            <p>Welcome to the {title} page.</p>
        </section>
    </main>
    <footer id="footer"></footer>

    <script src="js/data.js"></script>
    <script src="js/components.js"></script>
    <script src="js/animations.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
"""

for file, title in pages.items():
    with open(file, 'w', encoding='utf-8') as f:
        f.write(html_template.format(title=title))

css_content = """
:root {
    --bg-color: #0A0F1C;
    --text-primary: #FFFFFF;
    --text-secondary: #A0ABC0;
    --accent-color: #3B82F6;
    --accent-hover: #60A5FA;
    --card-bg: rgba(17, 24, 39, 0.7);
    --border-color: rgba(255, 255, 255, 0.1);
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background-color: var(--bg-color);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
}
a {
    text-decoration: none;
    color: inherit;
}
ul {
    list-style: none;
}
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 1.5rem 2rem;
    background: rgba(10, 15, 28, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
}
.navbar.scrolled {
    padding: 1rem 2rem;
    background: rgba(10, 15, 28, 0.95);
}
.nav-links {
    display: flex;
    gap: 1.5rem;
}
.nav-links a {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: color 0.3s;
}
.nav-links a:hover, .nav-links a.active {
    color: var(--accent-color);
}
.btn-primary {
    background-color: var(--accent-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.3s, transform 0.2s;
    border: none;
    cursor: pointer;
    display: inline-block;
}
.btn-primary:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
}
.btn-secondary {
    background-color: transparent;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s;
    border: 1px solid var(--border-color);
    cursor: pointer;
    display: inline-block;
}
.btn-secondary:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
}
main {
    padding-top: 80px;
    min-height: calc(100vh - 200px);
}
.py-20 {
    padding-top: 5rem;
    padding-bottom: 5rem;
}
.text-center {
    text-align: center;
}
/* Container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

/* Custom Cursor */
.custom-cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, background-color 0.2s;
}
.custom-cursor.hover {
    width: 40px;
    height: 40px;
    background-color: rgba(59, 130, 246, 0.2);
}

/* Footer */
footer {
    background-color: #050811;
    padding: 4rem 2rem;
    border-top: 1px solid var(--border-color);
    margin-top: 4rem;
}
.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}
.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    margin-top: 2rem;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
}
"""

with open('styles/main.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

anim_content = """
/* Initial states for scroll animations */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
.slide-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.slide-left.visible {
    opacity: 1;
    transform: translateX(0);
}
.slide-right {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.slide-right.visible {
    opacity: 1;
    transform: translateX(0);
}
"""
with open('styles/animations.css', 'w', encoding='utf-8') as f:
    f.write(anim_content)

print("Setup complete")
