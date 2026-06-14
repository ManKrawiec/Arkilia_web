// Arkilia Linux – main script
document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    initHeroCanvas();
    initParallax();
    initLaptopTabs();
    initStatsCounter();
    initWorldMap();
    initSectionObserver();
    initTerminalTyping();
    initLaptopRotation();
    initAnimationToggle();
});

/* ---------- Internationalization (EN/PL) ---------- */
const translations = {
    pl: {
        heroTitle: "ARKILIA LINUX",
        heroTagline: "Built for those who choose their own path.",
        btnDownload: "Pobierz Arkilia",
        btnDocs: "Dokumentacja",
        btnDemo: "Zobacz Demo",
        whyTitle: "Dlaczego Arkilia?",
        demoTitle: "Demo interfejsu",
        terminalTitle: "Terminal",
        timelineTitle: "Historia projektu",
        galleryTitle: "Screenshoty",
        statsTitle: "Arkilia w liczbach",
        communityTitle: "Społeczność",
        downloadTitle: "Pobierz Arkilia",
        cardFreedomTitle: "Freedom",
        cardFreedomText: "Pełna kontrola nad systemem.",
        cardPerformanceTitle: "Performance",
        cardPerformanceText: "Szybkość bez kompromisów.",
        cardCraftsmanshipTitle: "Craftsmanship",
        cardCraftsmanshipText: "Każdy detal ma znaczenie.",
        cardEvolutionTitle: "Evolution",
        cardEvolutionText: "System rozwijający się wraz z użytkownikiem."
    },
    en: {
        heroTitle: "ARKILIA LINUX",
        heroTagline: "Built for those who choose their own path.",
        btnDownload: "Download Arkilia",
        btnDocs: "Documentation",
        btnDemo: "View Demo",
        whyTitle: "Why Arkilia?",
        demoTitle: "Interface Demo",
        terminalTitle: "Terminal",
        timelineTitle: "Project Timeline",
        galleryTitle: "Screenshots",
        statsTitle: "Arkilia in Numbers",
        communityTitle: "Community",
        downloadTitle: "Download Arkilia",
        cardFreedomTitle: "Freedom",
        cardFreedomText: "Full control over the system.",
        cardPerformanceTitle: "Performance",
        cardPerformanceText: "Speed without compromise.",
        cardCraftsmanshipTitle: "Craftsmanship",
        cardCraftsmanshipText: "Every detail matters.",
        cardEvolutionTitle: "Evolution",
        cardEvolutionText: "The system evolves with the user."
    }
};

let currentLang = 'pl';

function initI18n() {
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'pl' ? 'en' : 'pl';
            applyTranslations();
        });
    }
    applyTranslations();
}

function applyTranslations() {
    const elems = document.querySelectorAll('[data-i18n]');
    elems.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

/* ---------- Section observer for cut effect ---------- */
function initSectionObserver() {
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('entered');
            }
        });
    }, options);
    sections.forEach(sec => observer.observe(sec));
}

/* ---------- Terminal typing effect ---------- */
function initTerminalTyping() {
    const pre = document.querySelector('.terminal-output');
    if (!pre) return;
    const lines = [
        'sudo pacman -S arkilia',
        'Initializing environment...',
        'Loading modules...',
        'Welcome back, explorer.',
        'System ready.'
    ];
    let i = 0;
    function typeLine() {
        if (i >= lines.length) return;
        const line = lines[i];
        const span = document.createElement('span');
        pre.appendChild(span);
        let j = 0;
        const interval = setInterval(() => {
            span.textContent += line[j];
            j++;
            if (j === line.length) {
                clearInterval(interval);
                pre.appendChild(document.createElement('br'));
                i++;
                setTimeout(typeLine, 300);
            }
        }, 30);
    }
    // Clear existing static content
    pre.innerHTML = '';
    typeLine();
}

/* ---------- Laptop 3D rotation on mouse move ---------- */
function initLaptopRotation() {
    const canvas = document.getElementById('laptop-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.clientWidth;
    const h = canvas.height = canvas.clientHeight;

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);
        // Simple placeholder rectangle representing laptop
        ctx.fillStyle = '#555';
        ctx.fillRect(w*0.1, h*0.2, w*0.8, h*0.6);
    }
    draw();

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / w - 0.5;
        const y = (e.clientY - rect.top) / h - 0.5;
        const rotateX = y * 10;
        const rotateY = -x * 10;
        canvas.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    canvas.addEventListener('mouseleave', () => {
        canvas.style.transform = '';
    });
}

/* ---------- Animation toggle button ---------- */
function initAnimationToggle() {
    const btn = document.createElement('button');
    btn.id = 'anim-toggle';
    btn.textContent = 'Wyłącz animacje';
    document.body.appendChild(btn);
    let disabled = false;
    btn.addEventListener('click', () => {
        disabled = !disabled;
        if (disabled) {
            document.body.classList.add('no-anim');
            btn.textContent = 'Włącz animacje';
        } else {
            document.body.classList.remove('no-anim');
            btn.textContent = 'Wyłącz animacje';
        }
    });
}

/* ---------- Hero Canvas (simple particle animation) ---------- */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const maxParticles = 120;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticle() {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.7;
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 1 + Math.random() * 2,
            life: 0,
            maxLife: 80 + Math.random() * 120
        });
    }

    function update() {
        if (particles.length < maxParticles) createParticle();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(30,94,255,0.8)';

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life++;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            if (p.life > p.maxLife) particles.splice(i, 1);
        }
        requestAnimationFrame(update);
    }
    update();
}

/* ---------- Parallax background (mouse move) ---------- */
function initParallax() {
    const body = document.body;
    body.classList.add('parallax');
    body.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        const moveX = x * 10;
        const moveY = y * 10;
        body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
    });
}

/* ---------- Laptop demo tab switching ---------- */
function initLaptopTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    const screen = document.getElementById('laptop-screen');
    if (!screen) return;

    const contentMap = {
        desktop: '<div style="color:#fff; padding:2rem;">Desktop mockup – tutaj będzie pulpit Arkilii.</div>',
        terminal: '<div style="color:#0f0; background:#111; padding:2rem; font-family:monospace;">$ sudo pacman -S arkilia<br>Initializing…<br>Done.</div>',
        pkg: '<div style="color:#fff; padding:2rem;">Menedżer pakietów – lista przykładowych pakietów.</div>',
        settings: '<div style="color:#fff; padding:2rem;">Ustawienia – suwak, przełączniki itp.</div>',
        themes: '<div style="color:#fff; padding:2rem;">Motywy – podgląd kilku schematów kolorów.</div>'
    };

    function activate(target) {
        buttons.forEach(b => b.classList.toggle('active', b.dataset.target === target));
        screen.innerHTML = contentMap[target] || '';
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => activate(btn.dataset.target));
    });

    // default view
    activate('desktop');
}

/* ---------- Stats counter animation ---------- */
function initStatsCounter() {
    const numbers = document.querySelectorAll('.stat .number');
    numbers.forEach(el => {
        const target = el.dataset.target;
        if (!target) return;
        let count = 0;
        const isInfinity = target === '∞';
        const end = isInfinity ? 1000 : parseInt(target, 10);
        const step = Math.max(1, Math.floor(end / 120));

        const interval = setInterval(() => {
            if (isInfinity) {
                count += step;
                el.textContent = count + '+';
                if (count >= 1000) clearInterval(interval);
            } else {
                count += step;
                if (count >= end) {
                    el.textContent = target;
                    clearInterval(interval);
                } else {
                    el.textContent = count;
                }
            }
        }, 16);
    });
}

/* ---------- World map dots (random points) ---------- */
function initWorldMap() {
    const svg = document.querySelector('#community svg');
    if (!svg) return;
    const width = svg.viewBox.baseVal.width || 800;
    const height = svg.viewBox.baseVal.height || 400;

    for (let i = 0; i < 30; i++) {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', 2);
        circle.setAttribute('fill', '#1E5EFF');
        svg.appendChild(circle);
    }
}