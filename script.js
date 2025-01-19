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

    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 4;
            this.speedX = Math.random() * spread - spread/2;
            this.speedY = Math.random() * -spread * 1.5; // Increased upward velocity
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
            this.gravity = gravity;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01; // Fade out rate
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
        // Get button position relative to viewport
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
            
            // Remove particles that are off screen or fully faded
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
        
        // Get button position
        const rect = createMoreButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        createConfetti(x, y);
        
        setTimeout(() => {
            createMoreButton.style.transform = 'scale(1)';
        }, 150);
    }

    function handleValueInteraction(value) {
        values.forEach(v => {
            if (v !== value) v.classList.remove('expanded');
        });
        value.classList.toggle('expanded');
    }

    // Swipe handling
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        touchEndX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                if (coreValues.classList.contains('visible')) {
                    showMainMessage();
                }
            } else {
                if (!coreValues.classList.contains('visible')) {
                    showCoreValues();
                }
            }
        }
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

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
                    const rect = createMoreButton.getBoundingClientRect();
                    handleCreateMore({
                        clientX: rect.left + rect.width / 2,
                        clientY: rect.top + rect.height / 2
                    });
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const valueIndex = parseInt(e.key) - 1;
                if (coreValues.classList.contains('visible')) {
                    handleValueInteraction(values[valueIndex]);
                } else {
                    showCoreValues();
                    setTimeout(() => handleValueInteraction(values[valueIndex]), 400);
                }
                break;
        }
    });

    // Choice hover effects
    const choices = document.querySelectorAll('.choice');
    
    choices.forEach(choice => {
        choice.addEventListener('mouseenter', () => {
            if (choice.classList.contains('faded')) {
                choice.style.transform = 'scale(1)';
                choice.style.color = '#95a5a6';
            } else {
                choice.style.transform = 'scale(1.15)';
            }
        });
        
        choice.addEventListener('mouseleave', () => {
            if (choice.classList.contains('faded')) {
                choice.style.transform = 'scale(0.9)';
                choice.style.color = '#cbd5e1';
            } else {
                choice.style.transform = 'scale(1.1)';
            }
        });
    });

    // Value card expansion
    values.forEach((value, index) => {
        value.addEventListener('click', () => handleValueInteraction(value));
        value.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleValueInteraction(value);
            }
        });
        
        if (window.innerWidth > 768) {
            const hint = document.createElement('span');
            hint.className = 'shortcut-hint value-shortcut';
            hint.textContent = (index + 1).toString();
            value.appendChild(hint);
        }
    });
}); 