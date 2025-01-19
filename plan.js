document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation
    document.body.classList.add('fade-in');

    // Get elements
    const options = document.querySelectorAll('.assessment-option');
    const continueButton = document.getElementById('continue');
    let selectedLevel = null;

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selection from other options
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Select clicked option
            option.classList.add('selected');
            selectedLevel = option.getAttribute('data-level');
            
            // Show continue button
            continueButton.classList.add('visible');
        });
    });

    // Handle continue button
    function handleContinue() {
        if (selectedLevel) {
            // Store the assessment level
            localStorage.setItem('assessmentLevel', selectedLevel);
            
            // Transition to next page
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'action.html';
            }, 500);
        }
    }

    if (continueButton) {
        continueButton.addEventListener('click', handleContinue);
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
        } else if (e.key === 'Enter' && selectedLevel) {
            handleContinue();
        }
    });
}); 