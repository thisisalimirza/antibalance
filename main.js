document.addEventListener('DOMContentLoaded', () => {
    // Confetti setup
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Confetti particles
    const particles = [];
    const particleCount = 150;
    const gravity = 0.5;
    const colors = ['#2c3e50', '#3498db', '#e74c3c', '#f1c40f', '#2ecc71'];
    const spread = 100;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 4;
            this.speedX = Math.random() * spread - spread/2;
            this.speedY = Math.random() * -spread * 1.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
            this.gravity = gravity;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += this.gravity;
            this.rotation += this.rotationSpeed;
            this.alpha -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            ctx.restore();
        }
    }

    function createConfetti(x, y) {
        particles.length = 0;
        for(let i = 0; i < particleCount; i++) {
            particles.push(new Particle(x, y));
        }
        animate();
    }

    function animate() {
        if (particles.length === 0) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].alpha <= 0 || 
                particles[i].y > canvas.height || 
                particles[i].x < 0 || 
                particles[i].x > canvas.width) {
                particles.splice(i, 1);
            }
        }
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    // Window resize handling
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Toggle functionality
    const toggleButton = document.getElementById('toggleValues');
    const toggleText = toggleButton.querySelector('.toggle-text');
    const mainMessage = document.getElementById('mainMessage');
    const coreValues = document.getElementById('coreValues');
    const createMoreButton = document.getElementById('createMore');
    const values = document.querySelectorAll('.value');

    function showCoreValues() {
        mainMessage.classList.add('hidden');
        coreValues.classList.add('visible');
        toggleText.textContent = 'Make a Choice';
        toggleButton.title = 'Press ESC to go back';
        toggleButton.querySelector('.shortcut-hint').textContent = 'ESC';
    }

    function showMainMessage() {
        mainMessage.classList.remove('hidden');
        coreValues.classList.remove('visible');
        toggleText.textContent = 'Read Our Values';
        toggleButton.title = 'Press V to toggle';
        toggleButton.querySelector('.shortcut-hint').textContent = 'V';
        values.forEach(v => v.classList.remove('expanded'));
    }

    function handleCreateMore(event) {
        createMoreButton.style.transform = 'scale(0.95)';
        
        const rect = createMoreButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        createConfetti(x, y);
        
        setTimeout(() => {
            createMoreButton.style.transform = 'scale(1)';
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'create.html';
            }, 500);
        }, 1000);
    }

    // Event Listeners
    toggleButton.addEventListener('click', () => {
        if (coreValues.classList.contains('visible')) {
            showMainMessage();
        } else {
            showCoreValues();
        }
    });
    
    createMoreButton.addEventListener('click', handleCreateMore);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT' || 
            document.activeElement.tagName === 'TEXTAREA') {
            return;
        }

        switch(e.key.toLowerCase()) {
            case 'escape':
                showMainMessage();
                break;
            case 'v':
                showCoreValues();
                break;
            case 'c':
                if (!coreValues.classList.contains('visible')) {
                    handleCreateMore();
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const valueIndex = parseInt(e.key) - 1;
                if (valueIndex >= 0 && valueIndex < values.length) {
                    if (coreValues.classList.contains('visible')) {
                        values[valueIndex].classList.toggle('expanded');
                    } else {
                        showCoreValues();
                        setTimeout(() => values[valueIndex].classList.add('expanded'), 400);
                    }
                }
                break;
        }
    });

    // Add page entrance animation
    document.body.classList.add('fade-in');
}); 