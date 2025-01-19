document.addEventListener('DOMContentLoaded', () => {
    // Toggle functionality
    const toggleButton = document.getElementById('toggleValues');
    const backButton = document.getElementById('backToMain');
    const mainMessage = document.getElementById('mainMessage');
    const coreValues = document.getElementById('coreValues');

    function showCoreValues() {
        mainMessage.classList.add('hidden');
        coreValues.classList.add('visible');
        toggleButton.style.opacity = '0';
    }

    function showMainMessage() {
        mainMessage.classList.remove('hidden');
        coreValues.classList.remove('visible');
        toggleButton.style.opacity = '1';
    }

    toggleButton.addEventListener('click', showCoreValues);
    backButton.addEventListener('click', showMainMessage);

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

    // Create More button effect
    const createMoreButton = document.querySelector('.button');
    if (createMoreButton) {
        createMoreButton.addEventListener('click', () => {
            createMoreButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                createMoreButton.style.transform = 'scale(1)';
            }, 150);
        });
    }
}); 