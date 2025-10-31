<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notre Équipe - Animation Orbitale</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
            color: #fff;
            overflow-x: hidden;
            min-height: 100vh;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 4rem;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 2px solid #ff6b35;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .logo-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
        }

        .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 2px;
        }

        nav {
            display: flex;
            gap: 2.5rem;
        }

        nav a {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
            font-size: 1.1rem;
        }

        nav a:hover {
            color: #ff6b35;
        }

        .hero-section {
            text-align: center;
            padding: 4rem 2rem 2rem;
        }

        .hero-section h1 {
            font-size: 4rem;
            font-weight: 800;
            background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 50%, #ffa36c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1.5rem;
            letter-spacing: 2px;
        }

        .hero-section p {
            font-size: 1.3rem;
            color: #b0b0b0;
            max-width: 900px;
            margin: 0 auto;
            line-height: 1.8;
        }

        .orbital-container {
            position: relative;
            width: 100%;
            height: 900px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 4rem 0;
            perspective: 1000px;
        }

        .center-card {
            position: absolute;
            z-index: 100;
            width: 400px;
            height: 400px;
            background: transparent;
            border: 3px solid #ff6b35;
            border-radius: 50%;
            padding: 3rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 20px 80px rgba(255, 107, 53, 0.5),
                        0 0 100px rgba(255, 107, 53, 0.3);
            transition: transform 0.3s ease;
            cursor: pointer;
            user-select: none;
            background-size: cover;
            background-position: center;
        }

        .center-card:hover {
            transform: scale(1.08);
            box-shadow: 0 30px 120px rgba(255, 107, 53, 0.7),
                        0 0 150px rgba(255, 107, 53, 0.5);
            border-color: #ff8c42;
        }

        .center-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ff6b35;
            margin-bottom: 0.4rem;
            text-align: center;
            position: relative;
            z-index: 1;
        }

        .center-title {
            font-size: 1rem;
            color: #e0e0e0;
            margin-bottom: 0.8rem;
            font-weight: 500;
            text-align: center;
            position: relative;
            z-index: 1;
        }

        .center-description {
            font-size: 0.8rem;
            color: #a0a0a0;
            text-align: center;
            line-height: 1.5;
            position: relative;
            z-index: 1;
        }

        .orbit-circle {
            position: absolute;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background: transparent;
            border: 2px solid rgba(255, 107, 53, 0.4);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: 0 10px 40px rgba(255, 107, 53, 0.2);
            animation: stellarGlow 3s ease-in-out infinite;
            background-size: cover;
            background-position: center;
        }

        @keyframes stellarGlow {
            0%, 100% { 
                box-shadow: 0 10px 40px rgba(255, 107, 53, 0.2),
                            0 0 20px rgba(255, 107, 53, 0.15);
            }
            50% { 
                box-shadow: 0 15px 50px rgba(255, 107, 53, 0.4),
                            0 0 40px rgba(255, 107, 53, 0.3);
            }
        }

        .orbit-circle:hover {
            transform: scale(1.15);
            border-color: #ff6b35;
            box-shadow: 0 15px 60px rgba(255, 107, 53, 0.5);
            z-index: 50;
            animation-play-state: paused;
        }
        
        /* Texte circulaire "NOUS RECRUTONS" */
        .circular-text {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 0;
        }
        
        .circular-text text {
            fill: #ff6b35;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 6px;
            text-transform: uppercase;
        }
        
        .orbit-role {
            font-size: 1.1rem;
            font-weight: 700;
            color: #ff6b35;
            margin-bottom: 0.5rem;
            position: relative;
            z-index: 1;
        }

        .orbit-type {
            font-size: 0.85rem;
            color: #b0b0b0;
            position: relative;
            z-index: 1;
        }

        .orbit-badge {
            display: none;
        }

        /* Positions des cercles - contrôlées par JavaScript */
        .orbit-1, .orbit-2, .orbit-3, .orbit-4, .orbit-5, .orbit-6 {
            transition: none;
        }
        
        .orbit-line {
            display: none;
        }
        
        .orbit-line-1, .orbit-line-2, .orbit-line-3 {
            display: none;
        }

        /* Particules d'ambiance */
        .particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: #ff6b35;
            border-radius: 50%;
            opacity: 0.6;
            animation: float 8s infinite ease-in-out;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
            50% { transform: translateY(-100px) translateX(50px); opacity: 0.3; }
        }

        .orbit-line {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            border: 1px dashed rgba(255, 107, 53, 0.12);
        }
        
        .orbit-line-1 {
            width: 600px;
            height: 600px;
            opacity: 0.6;
        }
        
        .orbit-line-2 {
            width: 820px;
            height: 820px;
            opacity: 0.4;
        }
        
        .orbit-line-3 {
            width: 1040px;
            height: 1040px;
            opacity: 0.25;
        }

        @media (max-width: 1200px) {
            .orbital-container { height: 800px; }
            .orbit-line-1 { width: 500px; height: 500px; }
            .orbit-line-2 { width: 680px; height: 680px; }
            .orbit-line-3 { width: 860px; height: 860px; }
        }

        @media (max-width: 768px) {
            header { padding: 1rem 2rem; }
            .hero-section h1 { font-size: 2.5rem; }
            .center-card { width: 320px; height: 320px; padding: 2rem; }
            .center-avatar { width: 100px; height: 100px; font-size: 3rem; }
            .center-name { font-size: 1.2rem; }
            .center-title { font-size: 0.9rem; }
            .center-description { font-size: 0.75rem; }
            .orbit-circle { width: 180px; height: 180px; padding: 1.5rem; }
            .orbit-line-1 { width: 400px; height: 400px; }
            .orbit-line-2 { width: 550px; height: 550px; }
            .orbit-line-3 { width: 700px; height: 700px; }
        }
    </style>
</head>
<body>
    <header>
        <div class="logo">
            <div class="logo-icon">🔥</div>
            <div class="logo-text">SMIDJAN</div>
        </div>
        <nav>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <div class="hero-section">
        <h1>Notre Équipe</h1>
        <p>Une équipe en construction, avec l'excellence au cœur de notre ADN et l'ambition de créer des expériences digitales mesurables.</p>
    </div>

    <div class="orbital-container">
        <!-- Lignes d'orbite - 3 niveaux -->
        <div class="orbit-line orbit-line-1"></div>
        <div class="orbit-line orbit-line-2"></div>
        <div class="orbit-line orbit-line-3"></div>

        <!-- Carte centrale -->
        <div class="center-card">
            <div class="center-name">Jean-Baptiste D.</div>
            <div class="center-title">CEO & Designer Produit</div>
            <div class="center-description">
                Conçoit des systèmes clairs où chaque détail sert le parcours. Esthétique utile, mesurable, durable.
            </div>
        </div>

        <!-- Cercles en orbite -->
        <div class="orbit-circle orbit-1">
            <svg class="circular-text" viewBox="0 0 220 220">
                <defs>
                    <path id="circle-1" d="M 110, 110 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" />
                </defs>
                <text>
                    <textPath href="#circle-1" startOffset="0%">
                        NOUS RECRUTONS • NOUS RECRUTONS • 
                    </textPath>
                </text>
            </svg>
            <div class="orbit-badge">Nous recrutons</div>
            <div class="orbit-role">Frontend Developer</div>
            <div class="orbit-type">React/Next.js</div>
        </div>

        <div class="orbit-circle orbit-2">
            <svg class="circular-text" viewBox="0 0 220 220">
                <defs>
                    <path id="circle-2" d="M 110, 110 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" />
                </defs>
                <text>
                    <textPath href="#circle-2" startOffset="0%">
                        NOUS RECRUTONS • NOUS RECRUTONS • 
                    </textPath>
                </text>
            </svg>
            <div class="orbit-badge">Nous recrutons</div>
            <div class="orbit-role">Backend Developer</div>
            <div class="orbit-type">Node.js/Python</div>
        </div>

        <div class="orbit-circle orbit-3">
            <svg class="circular-text" viewBox="0 0 220 220">
                <defs>
                    <path id="circle-3" d="M 110, 110 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" />
                </defs>
                <text>
                    <textPath href="#circle-3" startOffset="0%">
                        NOUS RECRUTONS • NOUS RECRUTONS • 
                    </textPath>
                </text>
            </svg>
            <div class="orbit-badge">Nous recrutons</div>
            <div class="orbit-role">UI/UX Designer</div>
            <div class="orbit-type">Product Design</div>
        </div>

        <div class="orbit-circle orbit-4">
            <svg class="circular-text" viewBox="0 0 220 220">
                <defs>
                    <path id="circle-4" d="M 110, 110 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" />
                </defs>
                <text>
                    <textPath href="#circle-4" startOffset="0%">
                        NOUS RECRUTONS • NOUS RECRUTONS • 
                    </textPath>
                </text>
            </svg>
            <div class="orbit-badge">Nous recrutons</div>
            <div class="orbit-role">DevOps Engineer</div>
            <div class="orbit-type">Cloud/CI-CD</div>
        </div>

        <div class="orbit-circle orbit-5">
            <svg class="circular-text" viewBox="0 0 220 220">
                <defs>
                    <path id="circle-5" d="M 110, 110 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" />
                </defs>
                <text>
                    <textPath href="#circle-5" startOffset="0%">
                        NOUS RECRUTONS • NOUS RECRUTONS • 
                    </textPath>
                </text>
            </svg>
            <div class="orbit-badge">Nous recrutons</div>
            <div class="orbit-role">Data Analyst</div>
            <div class="orbit-type">Analytics/BI</div>
        </div>

        <div class="orbit-circle orbit-6">
            <svg class="circular-text" viewBox="0 0 220 220">
                <defs>
                    <path id="circle-6" d="M 110, 110 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" />
                </defs>
                <text>
                    <textPath href="#circle-6" startOffset="0%">
                        NOUS RECRUTONS • NOUS RECRUTONS • 
                    </textPath>
                </text>
            </svg>
            <div class="orbit-badge">Nous recrutons</div>
            <div class="orbit-role">Product Manager</div>
            <div class="orbit-type">Strategy/Vision</div>
        </div>

        <!-- Particules décoratives -->
        <div class="particle" style="top: 10%; left: 15%; animation-delay: 0s;"></div>
        <div class="particle" style="top: 80%; left: 20%; animation-delay: 2s;"></div>
        <div class="particle" style="top: 20%; right: 15%; animation-delay: 4s;"></div>
        <div class="particle" style="bottom: 15%; right: 25%; animation-delay: 6s;"></div>
        <div class="particle" style="top: 50%; left: 5%; animation-delay: 1s;"></div>
        <div class="particle" style="top: 40%; right: 8%; animation-delay: 3s;"></div>
        <div class="particle" style="top: 60%; left: 10%; animation-delay: 3.5s;"></div>
        <div class="particle" style="bottom: 30%; right: 15%; animation-delay: 5s;"></div>
    </div>

    <script>
        // Système de physique pour les boules flottantes
        class Sphere {
            constructor(element, container, isCenter = false) {
                this.element = element;
                this.container = container;
                this.isCenter = isCenter;
                
                // Rayon basé sur le type de cercle
                this.radius = isCenter ? 200 : 110; // Centre: 400px/2, Autres: 220px/2
                
                // Position initiale aléatoire dans le conteneur
                const containerRect = container.getBoundingClientRect();
                const maxX = containerRect.width - this.radius * 2;
                const maxY = containerRect.height - this.radius * 2;
                
                this.x = Math.random() * maxX;
                this.y = Math.random() * maxY;
                
                // Vélocité rapide pour tous
                const speed = 1.5 + Math.random() * 1.5;
                const angle = Math.random() * Math.PI * 2;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                
                this.updatePosition();
            }
            
            updatePosition() {
                this.element.style.left = this.x + 'px';
                this.element.style.top = this.y + 'px';
            }
            
            update() {
                // Mise à jour de la position pour tous les cercles
                this.x += this.vx;
                this.y += this.vy;
                
                // Récupération des dimensions du conteneur
                const containerRect = this.container.getBoundingClientRect();
                const maxX = containerRect.width - this.radius * 2;
                const maxY = containerRect.height - this.radius * 2;
                
                // Collision avec les bords (avec effet de rebond doux)
                if (this.x <= 0) {
                    this.x = 0;
                    this.vx = Math.abs(this.vx) * 0.95;
                } else if (this.x >= maxX) {
                    this.x = maxX;
                    this.vx = -Math.abs(this.vx) * 0.95;
                }
                
                if (this.y <= 0) {
                    this.y = 0;
                    this.vy = Math.abs(this.vy) * 0.95;
                } else if (this.y >= maxY) {
                    this.y = maxY;
                    this.vy = -Math.abs(this.vy) * 0.95;
                }
                
                this.updatePosition();
            }
            
            checkCollision(other) {
                // Calcul de la distance entre les centres des deux sphères
                const dx = (this.x + this.radius) - (other.x + other.radius);
                const dy = (this.y + this.radius) - (other.y + other.radius);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Distance minimale = somme des rayons
                const minDistance = this.radius + other.radius;
                
                // Si les sphères se touchent
                if (distance < minDistance) {
                    // Calcul de l'angle de collision
                    const angle = Math.atan2(dy, dx);
                    
                    // Séparation des sphères pour éviter qu'elles restent collées
                    const overlap = minDistance - distance;
                    const separationX = Math.cos(angle) * overlap * 0.5;
                    const separationY = Math.sin(angle) * overlap * 0.5;
                    
                    this.x += separationX;
                    this.y += separationY;
                    other.x -= separationX;
                    other.y -= separationY;
                    
                    // Calcul des nouvelles vélocités basées sur la collision
                    const sin = Math.sin(angle);
                    const cos = Math.cos(angle);
                    
                    // Rotation des vélocités dans le référentiel de la collision
                    const v1x = this.vx * cos + this.vy * sin;
                    const v1y = this.vy * cos - this.vx * sin;
                    const v2x = other.vx * cos + other.vy * sin;
                    const v2y = other.vy * cos - other.vx * sin;
                    
                    // Échange avec damping pour un effet fluide
                    const damping = 0.85;
                    this.vx = (v2x * cos - v1y * sin) * damping;
                    this.vy = (v1y * cos + v2x * sin) * damping;
                    other.vx = (v1x * cos - v2y * sin) * damping;
                    other.vy = (v2y * cos + v1x * sin) * damping;
                    
                    return true;
                }
                return false;
            }
        }
        
        // Initialisation
        const container = document.querySelector('.orbital-container');
        const centerCard = document.querySelector('.center-card');
        const orbitCircles = document.querySelectorAll('.orbit-circle');
        const spheres = [];
        
        // Création du cercle central (il bouge aussi maintenant)
        const centerSphere = new Sphere(centerCard, container, true);
        spheres.push(centerSphere);
        
        // Création des sphères orbitales
        orbitCircles.forEach(circle => {
            spheres.push(new Sphere(circle, container, false));
        });
        
        // Effet hover pour tous les cercles
        const allCircles = [centerCard, ...orbitCircles];
        allCircles.forEach(circle => {
            circle.addEventListener('mouseenter', () => {
                circle.style.zIndex = '50';
            });
            
            circle.addEventListener('mouseleave', () => {
                circle.style.zIndex = circle === centerCard ? '100' : '1';
            });
        });
        
        // Boucle d'animation
        function animate() {
            // Mise à jour de toutes les sphères
            spheres.forEach(sphere => {
                sphere.update();
            });
            
            // Vérification des collisions entre toutes les paires
            for (let i = 0; i < spheres.length; i++) {
                for (let j = i + 1; j < spheres.length; j++) {
                    spheres[i].checkCollision(spheres[j]);
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // Démarrage de l'animation
        animate();

        // Effet de particules interactif
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (Math.random() > 0.95) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.width = '2px';
                particle.style.height = '2px';
                particle.style.background = '#ff6b35';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.animation = 'particleFade 1s ease-out forwards';
                
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(3); }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>