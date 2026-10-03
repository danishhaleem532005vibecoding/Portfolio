/**
 * Ahmad's AI Assistant Engine & Interactive Chat Widget
 * Production-ready frontend logic with state management & appointment booking flow
 */

class AhmadAIAssistant {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.currentStep = 'IDLE'; // IDLE, BOOKING_NAME, BOOKING_EMAIL, BOOKING_PHONE, BOOKING_SERVICE, BOOKING_DETAILS, BOOKING_CONFIRM
        this.bookingData = {};
        this.messages = [];
        this.initUI();
    }

    initUI() {
        // Inject floating trigger button & chat modal HTML
        const assistantHTML = `
            <!-- Floating AI Assistant Button -->
            <button id="ai-assistant-btn" class="ai-assistant-btn" aria-label="Open Ahmad's AI Assistant" title="Chat with Ahmad's AI Assistant">
                <div class="ai-btn-icon">✨</div>
                <span class="ai-btn-pulse"></span>
                <span class="ai-badge-dot"></span>
            </button>

            <!-- AI Chat Modal Panel -->
            <div id="ai-chat-panel" class="ai-chat-panel" aria-hidden="true">
                <div class="ai-chat-header">
                    <div class="ai-header-info">
                        <div class="ai-avatar">🤖</div>
                        <div>
                            <h4>Ahmad's AI Assistant</h4>
                            <span class="ai-status">Online • Ready to help</span>
                        </div>
                    </div>
                    <div class="ai-header-controls">
                        <button id="ai-minimize-btn" class="ai-control-btn" title="Minimize">&minus;</button>
                        <button id="ai-close-btn" class="ai-control-btn" title="Close">&times;</button>
                    </div>
                </div>

                <div class="ai-chat-messages" id="ai-chat-messages">
                    <!-- Dynamic Messages Stream -->
                </div>

                <div id="ai-typing-indicator" class="ai-typing-indicator" style="display: none;">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <span>AI Assistant is typing...</span>
                </div>

                <div class="ai-quick-actions" id="ai-quick-actions">
                    <button class="quick-chip" data-action="services">Explore Services</button>
                    <button class="quick-chip" data-action="projects">View Projects</button>
                    <button class="quick-chip" data-action="book">Book an Appointment</button>
                    <button class="quick-chip" data-action="quran">Quran Tutoring</button>
                    <button class="quick-chip" data-action="math">Academic Tutoring</button>
                    <button class="quick-chip" data-action="contact">Contact Ahmad</button>
                </div>

                <div class="ai-chat-input-container">
                    <form id="ai-chat-form" class="ai-chat-form">
                        <input type="text" id="ai-chat-input" placeholder="Ask about services, projects, tutoring..." autocomplete="off">
                        <button type="submit" class="ai-send-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                        </button>
                    </form>
                    <div class="ai-privacy-note">
                        🔒 Your details are used only to respond to your inquiry.
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', assistantHTML);

        // Bind DOM elements
        this.btn = document.getElementById('ai-assistant-btn');
        this.panel = document.getElementById('ai-chat-panel');
        this.closeBtn = document.getElementById('ai-close-btn');
        this.minimizeBtn = document.getElementById('ai-minimize-btn');
        this.messagesContainer = document.getElementById('ai-chat-messages');
        this.typingIndicator = document.getElementById('ai-typing-indicator');
        this.quickActions = document.getElementById('ai-quick-actions');
        this.form = document.getElementById('ai-chat-form');
        this.input = document.getElementById('ai-chat-input');

        // Event listeners
        this.btn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.minimizeBtn.addEventListener('click', () => this.closeChat());

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = this.input.value.trim();
            if (text) {
                this.handleUserInput(text);
                this.input.value = '';
            }
        });

        this.quickActions.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-chip')) {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action, e.target.textContent);
            }
        });

        // Trigger welcome greeting on first open
        this.hasGreeted = false;
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.panel.classList.add('active');
        this.panel.setAttribute('aria-hidden', 'false');
        if (!this.hasGreeted) {
            this.sendAssistantGreeting();
            this.hasGreeted = true;
        }
    }

    closeChat() {
        this.isOpen = false;
        this.panel.classList.remove('active');
        this.panel.setAttribute('aria-hidden', 'true');
    }

    sendAssistantGreeting() {
        const greetingText = "Assalamu Alaikum! Welcome to Ahmad Danish's portfolio. I'm Ahmad's AI assistant. I can help you explore his services, projects, tutoring options, or arrange an appointment. What would you like to discuss?";
        this.addMessage('assistant', greetingText);
    }

    addMessage(sender, text, htmlContent = null) {
        const messageObj = { sender, text, timestamp: new Date() };
        this.messages.push(messageObj);

        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-msg ai-msg-${sender} fade-in`;
        
        if (htmlContent) {
            msgDiv.innerHTML = htmlContent;
        } else {
            msgDiv.textContent = text;
        }

        this.messagesContainer.appendChild(msgDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    showTyping(show = true) {
        this.isTyping = show;
        this.typingIndicator.style.display = show ? 'flex' : 'none';
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    handleQuickAction(action, labelText) {
        this.addMessage('user', labelText);

        if (action === 'services') {
            this.respondWithDelay("Ahmad provides Digital Services (Web Development, Shopify, SEO, Digital Marketing, Graphic Design, Lead Gen, AI & Software) and Education Services (Quran Tutoring, Mathematics Tutoring, Science Tutoring). Which service would you like to learn more about?");
        } else if (action === 'projects') {
            this.respondWithDelay("Selected projects developed by Ahmad include ZLaser & Skin Clinic, Hunger Hub, Institute Management System, Hotel & Restaurant Management Software, Gizmocart, Lumière Cosmetics, Usman Laptop Sales, Tech Mart, and Treehouse School. You can check the Projects page or ask about any of these!");
        } else if (action === 'quran') {
            this.respondWithDelay("Ahmad provides online Quran education including Noorani Qaida, Nazara Quran, Quran Reading, Tajweed, Hifz, Makharij, and Islamic Basics via 1-on-1 Zoom sessions. Would you like to request a trial class?");
        } else if (action === 'math') {
            this.respondWithDelay("Ahmad is a BS Mathematics student and offers patient, step-by-step math and academic science tutoring focused on concepts, problem-solving, and homework support for classes 1 to 8 and higher. Would you like to schedule a session?");
        } else if (action === 'contact') {
            this.respondWithDelay("You can reach Ahmad directly:\n• Email: danishhaleem532005@gmail.com\n• WhatsApp: +92 3119306469\n• Fiverr: @danishahmad1122\n\nOr click the green WhatsApp button at the bottom right!");
        } else if (action === 'book') {
            this.startBookingFlow();
        }
    }

    startBookingFlow() {
        this.currentStep = 'BOOKING_NAME';
        this.bookingData = {};
        this.respondWithDelay("I'd be happy to help you arrange an appointment or project consultation! To get started, please tell me your Full Name:");
    }

    handleUserInput(text) {
        this.addMessage('user', text);

        // Check if user is in appointment booking flow
        if (this.currentStep !== 'IDLE') {
            this.processBookingStep(text);
            return;
        }

        // Check for human handoff request
        if (text.toLowerCase().includes('speak with ahmad') || text.toLowerCase().includes('contact ahmad') || text.toLowerCase().includes('call')) {
            this.respondWithDelay("Of course! You can collect your details here with me, or contact Ahmad directly on WhatsApp (+92 3119306469) or email (danishhaleem532005@gmail.com).", `
                <p>Of course! You can contact Ahmad directly via:</p>
                <div style="margin-top:0.75rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <a href="https://wa.me/923119306469?text=Assalamu%20Alaikum%20Ahmad,%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" class="btn-primary" style="padding:0.4rem 0.8rem; font-size:0.8rem;">WhatsApp Ahmad</a>
                    <a href="mailto:danishhaleem532005@gmail.com" class="btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Email Ahmad</a>
                </div>
            `);
            return;
        }

        // Search knowledge base
        const response = this.queryKnowledgeBase(text);
        this.respondWithDelay(response);
    }

    processBookingStep(text) {
        if (this.currentStep === 'BOOKING_NAME') {
            this.bookingData.name = text;
            this.currentStep = 'BOOKING_EMAIL';
            this.respondWithDelay(`Thank you, ${text}. Please provide your Email Address:`);
        } else if (this.currentStep === 'BOOKING_EMAIL') {
            this.bookingData.email = text;
            this.currentStep = 'BOOKING_PHONE';
            this.respondWithDelay("Got it. What is your WhatsApp or phone number?");
        } else if (this.currentStep === 'BOOKING_PHONE') {
            this.bookingData.phone = text;
            this.currentStep = 'BOOKING_SERVICE';
            this.respondWithDelay("Which service or topic is this regarding? (e.g. Web Development, Shopify, SEO, Quran Tutoring, Math Tutoring, Graphic Design)");
        } else if (this.currentStep === 'BOOKING_SERVICE') {
            this.bookingData.service = text;
            this.currentStep = 'BOOKING_DETAILS';
            this.respondWithDelay("Please provide a short description of your project requirements, preferred date/time, or learning goals:");
        } else if (this.currentStep === 'BOOKING_DETAILS') {
            this.bookingData.details = text;
            this.currentStep = 'BOOKING_CONFIRM';
            
            const summaryHTML = `
                <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:10px; border:1px solid var(--border-color); font-size:0.9rem;">
                    <strong style="color:var(--accent-blue);">Please confirm your appointment request:</strong><br><br>
                    <strong>Name:</strong> ${this.bookingData.name}<br>
                    <strong>Email:</strong> ${this.bookingData.email}<br>
                    <strong>WhatsApp:</strong> ${this.bookingData.phone}<br>
                    <strong>Service:</strong> ${this.bookingData.service}<br>
                    <strong>Requirement:</strong> ${this.bookingData.details}<br><br>
                    <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
                        <button id="ai-confirm-yes" class="btn-primary" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Confirm Request</button>
                        <button id="ai-confirm-no" class="btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Edit Details</button>
                    </div>
                </div>
            `;
            this.addMessage('assistant', '', summaryHTML);

            setTimeout(() => {
                const confirmYes = document.getElementById('ai-confirm-yes');
                const confirmNo = document.getElementById('ai-confirm-no');
                if (confirmYes) {
                    confirmYes.addEventListener('click', () => this.finalizeBooking(true));
                }
                if (confirmNo) {
                    confirmNo.addEventListener('click', () => this.startBookingFlow());
                }
            }, 100);
        }
    }

    finalizeBooking(confirmed) {
        if (confirmed) {
            this.currentStep = 'IDLE';
            
            // Save lead locally to localStorage (backend architecture ready)
            const leadPayload = {
                id: 'LEAD_' + Date.now(),
                timestamp: new Date().toISOString(),
                visitor: this.bookingData,
                transcript: this.messages,
                summary: `Inquiry from ${this.bookingData.name} regarding ${this.bookingData.service}`
            };

            const existingLeads = JSON.parse(localStorage.getItem('nitora_leads') || '[]');
            existingLeads.push(leadPayload);
            localStorage.setItem('nitora_leads', JSON.stringify(existingLeads));

            const finalMsg = "Appointment request received! Ahmad will review your request and contact you directly via WhatsApp or Email to confirm available time slots.";
            this.addMessage('assistant', finalMsg);

            // Direct WhatsApp quick option for visitor
            const waUrl = `https://wa.me/923119306469?text=${encodeURIComponent(`Assalamu Alaikum Ahmad, I submitted an appointment request for ${this.bookingData.service}. Name: ${this.bookingData.name}`)}`;
            
            setTimeout(() => {
                this.addMessage('assistant', '', `
                    <div style="margin-top:0.5rem;">
                        <p style="font-size:0.85rem; color:var(--text-muted);">Would you also like to send this request directly to Ahmad on WhatsApp?</p>
                        <a href="${waUrl}" target="_blank" class="btn-primary" style="padding:0.4rem 0.8rem; font-size:0.8rem; margin-top:0.5rem; display:inline-block;">Send via WhatsApp &rarr;</a>
                    </div>
                `);
            }, 500);
        }
    }

    queryKnowledgeBase(query) {
        const q = query.toLowerCase();

        if (q.includes('who') || q.includes('about') || q.includes('biography') || q.includes('founder')) {
            return "Ahmad Danish is a digital marketer, web developer, Shopify expert, SEO specialist, graphic designer, and online tutor. He is the founder of Nitora Web and Digital based in Mardan, Pakistan.";
        }
        if (q.includes('service') || q.includes('do') || q.includes('offer')) {
            return "Ahmad provides Web Development, Shopify E-Commerce, SEO, Digital Marketing, Graphic Design, Lead Generation, Software Development, as well as Online Quran Tutoring, Mathematics Tutoring, and Science Academic Support.";
        }
        if (q.includes('quran') || q.includes('qaida') || q.includes('tajweed') || q.includes('hifz')) {
            return "Ahmad teaches Noorani Qaida, Nazara Quran, Quran Reading, Tajweed, Hifz, and Islamic basics via 1-on-1 Zoom classes. He completed Tajweed-ul-Quran under Qari Saeed Ahmad Al-Mardaanvi.";
        }
        if (q.includes('math') || q.includes('science') || q.includes('tutor') || q.includes('school')) {
            return "Ahmad is completing his BS in Mathematics (7th Semester) and completed a 6-week teaching internship at Al-Meezan School. He offers step-by-step, concept-focused tutoring for classes 1-8 and academic science support.";
        }
        if (q.includes('shopify') || q.includes('e-commerce') || q.includes('store')) {
            return "Ahmad has 2+ years of experience with Shopify store setup, theme customization, product listing, payment gateways, and conversion optimization.";
        }
        if (q.includes('seo') || q.includes('marketing') || q.includes('rank') || q.includes('google')) {
            return "Ahmad handles keyword research, on-page SEO, local business SEO, Google Business Profile setups, and digital marketing strategies to grow business visibility.";
        }
        if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('zlaser') || q.includes('hunger')) {
            return "Key projects built include ZLaser & Skin Clinic, Hunger Hub, Institute Management System, Hotel & Restaurant Management Software, Gizmocart, Lumière Cosmetics, and Usman Laptop Sales. Check out the Projects page for visual details!";
        }
        if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('rate') || q.includes('discount')) {
            return "Project pricing and tutoring fees depend on your specific scope and schedule. I don't have fixed rate sheets here, but I can arrange an appointment or collect your details so Ahmad can send you a quote!";
        }
        if (q.includes('location') || q.includes('where') || q.includes('address')) {
            return "Ahmad is based in Mardan, Khyber Pakhtunkhwa, Pakistan, and works with clients and students worldwide online.";
        }

        return "I don't have that exact information available right now. I can collect your contact details and ask Ahmad to get back to you personally, or you can message him on WhatsApp at +92 3119306469!";
    }

    respondWithDelay(text, htmlContent = null) {
        this.showTyping(true);
        setTimeout(() => {
            this.showTyping(false);
            this.addMessage('assistant', text, htmlContent);
        }, 600);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.ahmadAI = new AhmadAIAssistant();
});
