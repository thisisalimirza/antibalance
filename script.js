document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    
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

    // Immersive Experience Elements
    const immersiveContainer = document.getElementById('immersiveExperience');
    const sections = document.querySelectorAll('.immersive-section');
    const prevButton = document.getElementById('prevStep');
    const nextButton = document.getElementById('nextStep');
    const currentStepDisplay = document.querySelector('.current-step');
    let currentStep = 0;

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

    function startImmersiveExperience() {
        immersiveContainer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        updateStep(0);
    }

    function updateStep(step) {
        if (step < 0 || step >= sections.length) return;
        
        currentStep = step;
        sections.forEach((section, index) => {
            if (index === step) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        
        currentStepDisplay.textContent = (step + 1).toString();
        prevButton.disabled = step === 0;
        nextButton.disabled = step === sections.length - 1;
    }

    function handleCreateMore(event) {
        createMoreButton.style.transform = 'scale(0.95)';
        
        const rect = createMoreButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        createConfetti(x, y);
        
        setTimeout(() => {
            createMoreButton.style.transform = 'scale(1)';
            startImmersiveExperience();
        }, 1000);
    }

    function handleValueInteraction(value) {
        values.forEach(v => {
            if (v !== value) v.classList.remove('expanded');
        });
        value.classList.toggle('expanded');
    }

    // Navigation event listeners
    prevButton.addEventListener('click', () => updateStep(currentStep - 1));
    nextButton.addEventListener('click', () => updateStep(currentStep + 1));

    // Creation options event listeners
    const creationOptions = document.querySelectorAll('.creation-option');
    console.log('Found creation options:', creationOptions.length);

    creationOptions.forEach((option, index) => {
        console.log('Setting up listener for option:', index);
        
        option.addEventListener('click', function() {
            console.log('Option clicked:', this.getAttribute('data-type'));
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            
            // Store the user's choice
            const creationType = this.getAttribute('data-type');
            localStorage.setItem('selectedCreationType', creationType);
            
            // Hide current section and show philosophy section
            const currentSection = document.getElementById('creationQuestion');
            const philosophySection = document.getElementById('philosophyOverview');
            
            if (currentSection && philosophySection) {
                currentSection.classList.add('hidden');
                philosophySection.classList.remove('hidden');
                
                // Start the pillar sequence
                startPillarSequence();
                
                // Update step counter
                currentStep = 1;
                currentStepDisplay.textContent = '2';
                prevButton.disabled = false;
                nextButton.disabled = false;
            }
            
            // Reset transform after animation
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    function startPillarSequence() {
        const pillars = document.querySelectorAll('.pillar-reveal');
        const finalQuestion = document.querySelector('.final-question');
        let currentIndex = 0;
        
        // Hide all pillars initially
        pillars.forEach(pillar => {
            pillar.style.opacity = '0';
            pillar.style.transform = 'translateY(20px)';
            pillar.classList.remove('visible');
        });
        
        // Hide final question
        if (finalQuestion) {
            finalQuestion.classList.remove('visible');
            finalQuestion.style.display = 'none';
        }
        
        function showNextPillar() {
            if (currentIndex > 0) {
                // Hide previous pillar
                const prevPillar = pillars[currentIndex - 1];
                prevPillar.style.opacity = '0';
                prevPillar.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    prevPillar.classList.remove('visible');
                }, 500);
            }
            
            if (currentIndex < pillars.length) {
                // Show current pillar
                const currentPillar = pillars[currentIndex];
                currentPillar.classList.add('visible');
                setTimeout(() => {
                    currentPillar.style.opacity = '1';
                    currentPillar.style.transform = 'translateY(0)';
                }, 50);
                
                currentIndex++;
                setTimeout(showNextPillar, 2000);
            } else {
                // Show final question
                if (finalQuestion) {
                    finalQuestion.style.display = 'block';
                    setTimeout(() => {
                        finalQuestion.classList.add('visible');
                    }, 50);
                }
            }
        }
        
        // Start sequence
        setTimeout(showNextPillar, 500);
    }

    // Handle continue button in final question
    document.querySelector('.continue-button').addEventListener('click', () => {
        const purposeText = document.querySelector('#creationPurpose').value.trim();
        if (purposeText) {
            localStorage.setItem('creationPurpose', purposeText);
            updateStep(currentStep + 1);
        } else {
            alert('Please share your intention before continuing.');
        }
    });

    // Form submissions
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Handle newsletter signup
        alert('Thanks for subscribing! We\'ll be in touch soon.');
    });

    document.querySelector('.join-challenge').addEventListener('click', () => {
        // Handle challenge signup
        alert('Welcome to the challenge! Check your email for next steps.');
    });

    // Generate plan functionality
    document.querySelector('.generate-plan').addEventListener('click', () => {
        const planSteps = document.querySelectorAll('.plan-step textarea');
        let isValid = true;
        planSteps.forEach(step => {
            if (!step.value.trim()) {
                isValid = false;
                step.style.border = '1px solid #e74c3c';
            } else {
                step.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            }
        });

        if (isValid) {
            alert('Your personalized Anti-Balance plan has been generated!');
            updateStep(currentStep + 1);
        } else {
            alert('Please fill in all plan steps to continue.');
        }
    });

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
                if (!immersiveContainer.classList.contains('hidden')) {
                    immersiveContainer.classList.add('hidden');
                    document.body.style.overflow = '';
                } else {
                    showMainMessage();
                }
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