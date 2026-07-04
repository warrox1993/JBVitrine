<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notre Stack Technologique - Enhanced</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0e1a;
            color: #ffffff;
            overflow-x: hidden;
        }

        .tech-stack-section {
            position: relative;
            padding: 120px 20px;
            max-width: 1400px;
            margin: 0 auto;
        }

        /* Animated background grid */
        .animated-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.03;
            pointer-events: none;
            background-image: 
                linear-gradient(#ff6b35 1px, transparent 1px),
                linear-gradient(90deg, #ff6b35 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
        }

        /* Floating particles */
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ff6b35;
            border-radius: 50%;
            opacity: 0.3;
            animation: float 8s infinite ease-in-out;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-30px) translateX(20px); }
            50% { transform: translateY(-60px) translateX(-20px); }
            75% { transform: translateY(-30px) translateX(30px); }
        }

        .header-content {
            position: relative;
            z-index: 2;
            margin-bottom: 80px;
            text-align: center;
        }

        h1 {
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            font-weight: 700;
            margin-bottom: 30px;
            background: linear-gradient(135deg, #ffffff 0%, #ff6b35 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: titleGlow 3s ease-in-out infinite;
        }

        @keyframes titleGlow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
        }

        .subtitle {
            font-size: 1.25rem;
            color: #b0b0b0;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .tech-grid {
            position: relative;
            z-index: 2;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }

        .tech-card {
            position: relative;
            background: rgba(20, 25, 40, 0.6);
            border-radius: 20px;
            padding: 60px 50px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 107, 53, 0.1);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            cursor: pointer;
            min-height: 280px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .tech-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        .tech-card::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        .tech-card:hover {
            transform: translateY(-10px) scale(1.02);
            border-color: rgba(255, 107, 53, 0.5);
            box-shadow: 
                0 20px 60px rgba(255, 107, 53, 0.2),
                0 0 40px rgba(255, 107, 53, 0.1),
                inset 0 0 40px rgba(255, 107, 53, 0.05);
        }

        .tech-card:hover::before,
        .tech-card:hover::after {
            opacity: 1;
        }

        .tech-card:hover .card-title {
            color: #ff6b35;
        }

        /* Number badge for visual hierarchy */
        .card-number {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 5rem;
            font-weight: 900;
            color: rgba(255, 107, 53, 0.08);
            line-height: 1;
            transition: all 0.5s ease;
            pointer-events: none;
        }

        .tech-card:hover .card-number {
            color: rgba(255, 107, 53, 0.15);
            transform: scale(1.1);
        }

        .card-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 30px;
            color: #ffffff;
            transition: color 0.3s ease;
            letter-spacing: -0.5px;
        }

        .card-description {
            font-size: 1.15rem;
            line-height: 2;
            color: #b0b0b0;
            letter-spacing: 0.3px;
            position: relative;
        }

        .card-description.paragraph-mode {
            display: block;
        }

        .card-description.list-mode {
            display: none;
        }

        .tech-card:hover .card-description.paragraph-mode {
            display: none;
        }

        .tech-card:hover .card-description.list-mode {
            display: block;
        }

        .tech-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .tech-list li {
            padding-left: 30px;
            margin-bottom: 15px;
            position: relative;
            opacity: 0;
            transform: translateX(-10px);
        }

        .tech-card:hover .tech-list li {
            animation: slideInLeft 0.4s ease-out forwards;
        }

        .tech-card:hover .tech-list li:nth-child(1) { animation-delay: 0.1s; }
        .tech-card:hover .tech-list li:nth-child(2) { animation-delay: 0.3s; }
        .tech-card:hover .tech-list li:nth-child(3) { animation-delay: 0.5s; }
        .tech-card:hover .tech-list li:nth-child(4) { animation-delay: 0.7s; }
        .tech-card:hover .tech-list li:nth-child(5) { animation-delay: 0.9s; }
        .tech-card:hover .tech-list li:nth-child(6) { animation-delay: 1.1s; }

        @keyframes slideInLeft {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .tech-list li::before {
            content: '▸';
            position: absolute;
            left: 0;
            color: #ff6b35;
            font-size: 1.2rem;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .typing-text {
            display: inline-block;
            font-family: monospace;
        }

        .typing-text.decoding {
            color: #ff6b35;
            text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
        }

        /* Visual separator */
        .card-separator {
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #ff6b35, transparent);
            margin: 25px 0 30px 0;
            transition: width 0.5s ease;
        }

        .tech-card:hover .card-separator {
            width: 120px;
        }

        /* Animated accent lines */
        .accent-line {
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff6b35, transparent);
            animation: lineMove 3s linear infinite;
        }

        .accent-line.top {
            top: 0;
            left: 0;
            width: 100%;
        }

        .accent-line.bottom {
            bottom: 0;
            left: 0;
            width: 100%;
            animation-delay: 1.5s;
        }

        @keyframes lineMove {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        /* Glowing orbs */
        .glow-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.15;
            pointer-events: none;
            animation: orbFloat 8s ease-in-out infinite;
        }

        .glow-orb-1 {
            width: 400px;
            height: 400px;
            background: #ff6b35;
            top: 10%;
            left: -10%;
            animation-delay: 0s;
        }

        .glow-orb-2 {
            width: 300px;
            height: 300px;
            background: #ff8c42;
            bottom: 20%;
            right: -5%;
            animation-delay: 2s;
        }

        @keyframes orbFloat {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .tech-stack-section {
                padding: 80px 20px;
            }

            .tech-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .tech-card {
                padding: 30px;
            }

            h1 {
                font-size: 2.5rem;
            }

            .subtitle {
                font-size: 1.1rem;
            }
        }

        /* Hover ripple effect */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 107, 53, 0.3);
            pointer-events: none;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
        }

        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    </style>
</head>
<body>
    <section class="tech-stack-section">
        <!-- Animated background -->
        <div class="animated-bg"></div>

        <!-- Glowing orbs -->
        <div class="glow-orb glow-orb-1"></div>
        <div class="glow-orb glow-orb-2"></div>

        <!-- Header -->
        <div class="header-content">
            <h1>Notre stack technologique</h1>
            <p class="subtitle">
                Nos choix techniques reposent sur la stabilité, la sécurité et la performance. 
                Chaque stack est sélectionnée pour garantir rapidité, maintenabilité et évolutivité.
            </p>
        </div>

        <!-- Tech Grid -->
        <div class="tech-grid">
            <div class="tech-card" data-category="frontend">
                <div class="accent-line top"></div>
                <div class="card-number">01</div>
                <h3 class="card-title">Frontend</h3>
                <div class="card-separator"></div>
                <p class="card-description paragraph-mode">
                    React, Next.js, TypeScript, Tailwind CSS, state managers modernes et animations optimisées.
                </p>
                <div class="card-description list-mode">
                    <ul class="tech-list">
                        <li><span class="typing-text">React & Next.js</span></li>
                        <li><span class="typing-text">TypeScript</span></li>
                        <li><span class="typing-text">Tailwind CSS</span></li>
                        <li><span class="typing-text">State managers modernes</span></li>
                        <li><span class="typing-text">Animations optimisées</span></li>
                    </ul>
                </div>
                <div class="accent-line bottom"></div>
            </div>

            <div class="tech-card" data-category="backend">
                <div class="accent-line top"></div>
                <div class="card-number">02</div>
                <h3 class="card-title">Backend & API</h3>
                <div class="card-separator"></div>
                <p class="card-description paragraph-mode">
                    Node.js, Python (Django/FastAPI), GraphQL, PostgreSQL, Redis. API sécurisées et scalables.
                </p>
                <div class="card-description list-mode">
                    <ul class="tech-list">
                        <li><span class="typing-text">Node.js & Python</span></li>
                        <li><span class="typing-text">Django / FastAPI</span></li>
                        <li><span class="typing-text">GraphQL</span></li>
                        <li><span class="typing-text">PostgreSQL & Redis</span></li>
                        <li><span class="typing-text">API sécurisées et scalables</span></li>
                    </ul>
                </div>
                <div class="accent-line bottom"></div>
            </div>

            <div class="tech-card" data-category="cloud">
                <div class="accent-line top"></div>
                <div class="card-number">03</div>
                <h3 class="card-title">Cloud & DevOps</h3>
                <div class="card-separator"></div>
                <p class="card-description paragraph-mode">
                    Infrastructure AWS/Azure, Docker, Kubernetes, Terraform, GitHub Actions, Nginx.
                </p>
                <div class="card-description list-mode">
                    <ul class="tech-list">
                        <li><span class="typing-text">AWS / Azure</span></li>
                        <li><span class="typing-text">Docker & Kubernetes</span></li>
                        <li><span class="typing-text">Terraform</span></li>
                        <li><span class="typing-text">GitHub Actions</span></li>
                        <li><span class="typing-text">Nginx</span></li>
                    </ul>
                </div>
                <div class="accent-line bottom"></div>
            </div>

            <div class="tech-card" data-category="security">
                <div class="accent-line top"></div>
                <div class="card-number">04</div>
                <h3 class="card-title">Sécurité</h3>
                <div class="card-separator"></div>
                <p class="card-description paragraph-mode">
                    OWASP, authentification forte, gestion centralisée des secrets, scans SAST/DAST, WAF.
                </p>
                <div class="card-description list-mode">
                    <ul class="tech-list">
                        <li><span class="typing-text">Standards OWASP</span></li>
                        <li><span class="typing-text">Authentification forte</span></li>
                        <li><span class="typing-text">Gestion des secrets</span></li>
                        <li><span class="typing-text">Scans SAST/DAST</span></li>
                        <li><span class="typing-text">WAF (Web Application Firewall)</span></li>
                    </ul>
                </div>
                <div class="accent-line bottom"></div>
            </div>

            <div class="tech-card" data-category="automation">
                <div class="accent-line top"></div>
                <div class="card-number">05</div>
                <h3 class="card-title">Automatisation & IA</h3>
                <div class="card-separator"></div>
                <p class="card-description paragraph-mode">
                    n8n, webhooks sécurisés, intégration OpenAI/Anthropic, orchestration de tâches et reporting automatisé.
                </p>
                <div class="card-description list-mode">
                    <ul class="tech-list">
                        <li><span class="typing-text">n8n automation</span></li>
                        <li><span class="typing-text">Webhooks sécurisés</span></li>
                        <li><span class="typing-text">OpenAI / Anthropic</span></li>
                        <li><span class="typing-text">Orchestration de tâches</span></li>
                        <li><span class="typing-text">Reporting automatisé</span></li>
                    </ul>
                </div>
                <div class="accent-line bottom"></div>
            </div>

            <div class="tech-card" data-category="analytics">
                <div class="accent-line top"></div>
                <div class="card-number">06</div>
                <h3 class="card-title">Analytics</h3>
                <div class="card-separator"></div>
                <p class="card-description paragraph-mode">
                    Mixpanel, DataDog, Sentry, Grafana et pipelines de données pour piloter le ROI.
                </p>
                <div class="card-description list-mode">
                    <ul class="tech-list">
                        <li><span class="typing-text">Mixpanel</span></li>
                        <li><span class="typing-text">DataDog</span></li>
                        <li><span class="typing-text">Sentry</span></li>
                        <li><span class="typing-text">Grafana</span></li>
                        <li><span class="typing-text">Pipelines de données</span></li>
                    </ul>
                </div>
                <div class="accent-line bottom"></div>
            </div>
        </div>
    </section>

    <script>
        // Create floating particles
        function createParticles() {
            const section = document.querySelector('.tech-stack-section');
            const particleCount = 20;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
                section.appendChild(particle);
            }
        }

        // Ripple effect on card click
        function createRipple(e) {
            const card = e.currentTarget;
            const ripple = document.createElement('span');
            const rect = card.getBoundingClientRect();
            
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }

        // 3D tilt effect
        function handleMouseMove(e) {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                translateY(-10px) 
                scale(1.02) 
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        }

        function handleMouseLeave(e) {
            const card = e.currentTarget;
            card.style.transform = '';
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            
            const cards = document.querySelectorAll('.tech-card');
            cards.forEach(card => {
                card.addEventListener('click', createRipple);
                card.addEventListener('mousemove', handleMouseMove);
                card.addEventListener('mouseleave', handleMouseLeave);
                
                // Initialize all typing texts with Martian characters
                const typingElements = card.querySelectorAll('.typing-text');
                typingElements.forEach(el => {
                    const originalText = el.textContent;
                    el.setAttribute('data-original', originalText);
                    el.textContent = generateMartianText(originalText.length);
                });
                
                // Typing animation on hover
                card.addEventListener('mouseenter', function() {
                    const typingElements = this.querySelectorAll('.typing-text');
                    typingElements.forEach((el, index) => {
                        setTimeout(() => {
                            decodeText(el);
                        }, index * 200); // Stagger the start of each decode
                    });
                });
                
                // Reset to Martian on mouse leave
                card.addEventListener('mouseleave', function() {
                    const typingElements = this.querySelectorAll('.typing-text');
                    typingElements.forEach(el => {
                        const originalText = el.getAttribute('data-original');
                        el.textContent = generateMartianText(originalText.length);
                        el.classList.remove('decoding');
                    });
                });
            });
        });

        // Generate random Martian-like characters
        function generateMartianText(length) {
            const martianChars = '◊◈◇◆◉◎●◐◑◒◓◔◕✦✧✨✩✪✫✬✭✮✯✰⬟⬠⬡⬢⬣⬤⬥⬦⬧⬨';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += martianChars[Math.floor(Math.random() * martianChars.length)];
            }
            return result;
        }

        // Decode text letter by letter
        function decodeText(element) {
            const originalText = element.getAttribute('data-original');
            const length = originalText.length;
            let currentIndex = 0;
            
            element.classList.add('decoding');
            
            const interval = setInterval(() => {
                if (currentIndex <= length) {
                    // Build the decoded part + martian remainder
                    const decoded = originalText.substring(0, currentIndex);
                    const martian = generateMartianText(length - currentIndex);
                    element.textContent = decoded + martian;
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    element.textContent = originalText;
                    element.classList.remove('decoding');
                }
            }, 50); // Speed of decoding (50ms per character)
        }

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.tech-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Add fadeInUp animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>