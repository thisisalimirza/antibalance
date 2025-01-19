document.addEventListener('DOMContentLoaded', () => {
    // Toggle functionality
    const toggleButton = document.getElementById('toggleValues');
    const toggleText = toggleButton.querySelector('.toggle-text');
    const mainMessage = document.getElementById('mainMessage');
    const coreValues = document.getElementById('coreValues');
    const createMoreButton = document.getElementById('createMore');

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
    }

    function handleCreateMore() {
        createMoreButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            createMoreButton.style.transform = 'scale(1)';
            // Add your create more functionality here
            console.log('Create More clicked!');
        }, 150);
    }

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
    const values = document.querySelectorAll('.value');
    
    function handleValueInteraction(value) {
        values.forEach(v => {
            if (v !== value) v.classList.remove('expanded');
        });
        value.classList.toggle('expanded');
    }

    values.forEach(value => {
        value.addEventListener('click', () => handleValueInteraction(value));
        value.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleValueInteraction(value);
            }
        });
    });
}); 