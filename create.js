document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation
    document.body.classList.add('fade-in');

    // Handle option selection
    const options = document.querySelectorAll('.creation-option');
    
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Store the selected option
            const selectedType = option.getAttribute('data-type');
            localStorage.setItem('selectedCreationType', selectedType);
            
            // Visual feedback
            option.style.transform = 'scale(0.95)';
            
            // Transition to next page
            setTimeout(() => {
                option.style.transform = 'scale(1)';
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'pillars.html';
                }, 500);
            }, 200);
        });
    });

    // Back button handling
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        }
    });
}); 