document.addEventListener('DOMContentLoaded', () => {
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
        // Close all expanded values when returning to main
        values.forEach(v => v.classList.remove('expanded'));
    }

    function handleCreateMore() {
        createMoreButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            createMoreButton.style.transform = 'scale(1)';
            // Add your create more functionality here
            console.log('Create More clicked!');
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
    const swipeThreshold = 50; // minimum distance for a swipe

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        touchEndX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        const swipeDistance = touchEndX - touchStartX;
        
        // Only handle horizontal swipes
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go back to main
                if (coreValues.classList.contains('visible')) {
                    showMainMessage();
                }
            } else {
                // Swipe left - show values
                if (!coreValues.classList.contains('visible')) {
                    showCoreValues();
                }
            }
        }
    }

    // Add touch event listeners
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
        // Only handle keyboard shortcuts if no input is focused
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
        
        // Only add number hints on desktop
        if (window.innerWidth > 768) {
            const hint = document.createElement('span');
            hint.className = 'shortcut-hint value-shortcut';
            hint.textContent = (index + 1).toString();
            value.appendChild(hint);
        }
    });
}); 