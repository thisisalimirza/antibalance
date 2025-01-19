document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation
    document.body.classList.add('fade-in');

    const assessmentOptions = document.querySelectorAll('.assessment-option');
    const continueButton = document.querySelector('.continue-button');

    // Handle assessment option selection
    assessmentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            assessmentOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            option.classList.add('selected');
            // Store the selected level
            const level = option.getAttribute('data-level');
            localStorage.setItem('assessmentLevel', level);
            // Show continue button
            continueButton.classList.add('visible');
        });
    });

    // Handle continue button click
    if (continueButton) {
        continueButton.addEventListener('click', () => {
            const selectedLevel = localStorage.getItem('assessmentLevel');
            document.body.classList.add('fade-out');
            
            setTimeout(() => {
                // Direct to different pages based on assessment level
                if (selectedLevel === 'beginner') {
                    window.location.href = 'action.html';
                } else if (selectedLevel === 'intermediate') {
                    window.location.href = 'intermediate.html';
                } else if (selectedLevel === 'advanced') {
                    window.location.href = 'advanced.html';
                } else {
                    // Default to intermediate if something goes wrong
                    window.location.href = 'intermediate.html';
                }
            }, 500);
        });
    }

    // Back button handling
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'pillars.html';
            }, 500);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'pillars.html';
            }, 500);
        } else if (e.key === 'Enter' && !e.shiftKey && continueButton.classList.contains('visible')) {
            continueButton.click();
        }
    });
}); 