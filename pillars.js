document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation
    document.body.classList.add('fade-in');

    // Get the selected creation type
    const creationType = localStorage.getItem('selectedCreationType');
    
    // Elements
    const pillars = document.querySelectorAll('.pillar-reveal');
    const finalQuestion = document.getElementById('finalQuestion');
    const intentionInput = document.getElementById('intention');
    const continueButton = document.getElementById('continue');
    
    // Customize pillar text based on creation type
    const customizations = {
        art: {
            pillar1: "Channel your artistic vision into work that challenges and inspires.",
            pillar2: "Dedicate yourself to mastering your craft through consistent practice.",
            pillar3: "Create art that adds beauty and meaning to the world.",
            pillar4: "Use your art to amplify important voices and messages."
        },
        business: {
            pillar1: "Build ventures that prioritize positive impact alongside profit.",
            pillar2: "Embrace the challenges of entrepreneurship with determination.",
            pillar3: "Innovate solutions that address real needs in the world.",
            pillar4: "Create opportunities that empower others to succeed."
        },
        content: {
            pillar1: "Create content that educates, inspires, and drives positive change.",
            pillar2: "Consistently produce high-quality work that serves your audience.",
            pillar3: "Share authentic stories that resonate and build connections.",
            pillar4: "Use your platform to amplify important messages and causes."
        },
        impact: {
            pillar1: "Focus on initiatives that create lasting positive change.",
            pillar2: "Persist in the face of challenges to achieve meaningful goals.",
            pillar3: "Build solutions that address real community needs.",
            pillar4: "Empower others to become agents of positive change."
        }
    };

    // Update pillar text if we have customizations
    if (creationType && customizations[creationType]) {
        pillars.forEach((pillar, index) => {
            const paragraph = pillar.querySelector('p');
            paragraph.textContent = customizations[creationType][`pillar${index + 1}`];
        });
    }

    // Sequential reveal
    let currentPillar = 0;
    const revealDelay = 2000; // Time between reveals

    function revealNextPillar() {
        if (currentPillar < pillars.length) {
            pillars[currentPillar].classList.add('visible');
            currentPillar++;
            setTimeout(revealNextPillar, revealDelay);
        } else {
            // Show final question after all pillars
            setTimeout(() => {
                finalQuestion.classList.add('visible');
                intentionInput.focus();
            }, 1000);
        }
    }

    // Start the sequence after a short delay
    setTimeout(revealNextPillar, 500);

    // Handle continue button
    continueButton.addEventListener('click', handleContinue);

    function handleContinue() {
        const intention = intentionInput.value.trim();
        if (intention) {
            // Store the intention
            localStorage.setItem('userIntention', intention);
            
            // Transition to next page
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'plan.html';
            }, 500);
        } else {
            intentionInput.classList.add('shake');
            setTimeout(() => intentionInput.classList.remove('shake'), 500);
            intentionInput.focus();
        }
    }

    // Back button handling
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'create.html';
            }, 500);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'create.html';
            }, 500);
        } else if (e.key === 'Enter' && !e.shiftKey) {
            if (document.activeElement === intentionInput) {
                handleContinue();
            }
        }
    });
}); 