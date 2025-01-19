document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation
    document.body.classList.add('fade-in');

    // Get stored data
    const userIntention = localStorage.getItem('userIntention');
    const creationType = localStorage.getItem('selectedCreationType');
    const assessmentLevel = localStorage.getItem('assessmentLevel');

    // Display user's intention
    const intentionText = document.getElementById('userIntention');
    if (intentionText && userIntention) {
        intentionText.textContent = userIntention;
    }

    // Set level badge
    const levelBadge = document.getElementById('levelBadge');
    if (levelBadge && assessmentLevel) {
        levelBadge.setAttribute('data-level', assessmentLevel);
        levelBadge.textContent = assessmentLevel.charAt(0).toUpperCase() + assessmentLevel.slice(1);
    }

    // Content customization based on creation type and level
    const contentMap = {
        art: {
            beginner: {
                daily: {
                    text: "Build your creative foundation with these daily practices:",
                    tasks: [
                        "Sketch or create for 30 minutes",
                        "Study one piece of inspiring work",
                        "Document your progress"
                    ]
                },
                weekly: "Complete 3 small artistic experiments this week",
                monthly: "Create and share your first cohesive art piece"
            },
            intermediate: {
                daily: {
                    text: "Deepen your artistic practice with focused work:",
                    tasks: [
                        "Create for 1-2 hours",
                        "Research techniques and materials",
                        "Engage with art community",
                        "Document your process"
                    ]
                },
                weekly: "Complete one refined artwork and get feedback",
                monthly: "Develop a series of related works and share online"
            },
            advanced: {
                daily: {
                    text: "Push your boundaries and inspire others:",
                    tasks: [
                        "Dedicated studio time (3+ hours)",
                        "Mentor or teach others",
                        "Write about your process",
                        "Network with other artists"
                    ]
                },
                weekly: "Start a challenging new piece and document progress",
                monthly: "Plan and execute an exhibition or collaborative project"
            }
        },
        business: {
            beginner: {
                daily: {
                    text: "Start building your entrepreneurial foundation:",
                    tasks: [
                        "Research market needs",
                        "Learn one business concept",
                        "Network with entrepreneurs",
                        "Document insights"
                    ]
                },
                weekly: "Validate one business idea with potential customers",
                monthly: "Create your first minimum viable product"
            },
            intermediate: {
                daily: {
                    text: "Grow your business systematically:",
                    tasks: [
                        "Review metrics and adjust",
                        "Connect with customers",
                        "Optimize one process",
                        "Plan next steps"
                    ]
                },
                weekly: "Implement one growth experiment",
                monthly: "Launch a new product feature or service"
            },
            advanced: {
                daily: {
                    text: "Scale your impact and empower others:",
                    tasks: [
                        "Strategic planning",
                        "Team development",
                        "Innovation research",
                        "Industry leadership"
                    ]
                },
                weekly: "Implement one scaling initiative",
                monthly: "Expand into a new market or vertical"
            }
        },
        content: {
            beginner: {
                daily: {
                    text: "Build your content creation habits:",
                    tasks: [
                        "Write for 30 minutes",
                        "Study successful content",
                        "Brainstorm ideas",
                        "Engage with audience"
                    ]
                },
                weekly: "Publish two pieces of content",
                monthly: "Build a content calendar and publishing system"
            },
            intermediate: {
                daily: {
                    text: "Enhance your content quality and reach:",
                    tasks: [
                        "Create for 2 hours",
                        "Analyze performance",
                        "Engage with community",
                        "Plan collaborations"
                    ]
                },
                weekly: "Publish three high-quality pieces",
                monthly: "Launch a new content series or format"
            },
            advanced: {
                daily: {
                    text: "Scale your content empire:",
                    tasks: [
                        "Content strategy",
                        "Team coordination",
                        "Cross-platform planning",
                        "Community building"
                    ]
                },
                weekly: "Launch one major content initiative",
                monthly: "Develop a new content brand or channel"
            }
        },
        impact: {
            beginner: {
                daily: {
                    text: "Start making a difference:",
                    tasks: [
                        "Research social issues",
                        "Connect with community",
                        "Document opportunities",
                        "Learn from others"
                    ]
                },
                weekly: "Complete one small community project",
                monthly: "Launch your first impact initiative"
            },
            intermediate: {
                daily: {
                    text: "Expand your social impact:",
                    tasks: [
                        "Project management",
                        "Stakeholder engagement",
                        "Impact measurement",
                        "Resource planning"
                    ]
                },
                weekly: "Implement one impact improvement",
                monthly: "Scale one successful initiative"
            },
            advanced: {
                daily: {
                    text: "Lead systemic change:",
                    tasks: [
                        "Strategic partnerships",
                        "Policy advocacy",
                        "Movement building",
                        "Impact innovation"
                    ]
                },
                weekly: "Launch one scaling initiative",
                monthly: "Develop a new impact model or partnership"
            }
        }
    };

    // Set content based on type and level
    if (creationType && assessmentLevel && contentMap[creationType]?.[assessmentLevel]) {
        const content = contentMap[creationType][assessmentLevel];
        
        // Set daily actions
        const dailyActionText = document.getElementById('dailyActionText');
        const dailyChecklist = document.getElementById('dailyChecklist');
        if (dailyActionText && dailyChecklist && content.daily) {
            dailyActionText.textContent = content.daily.text;
            content.daily.tasks.forEach(task => {
                const item = document.createElement('div');
                item.className = 'checkbox-item';
                item.innerHTML = `
                    <input type="checkbox" id="${task.replace(/\s+/g, '-')}">
                    <label for="${task.replace(/\s+/g, '-')}">${task}</label>
                `;
                dailyChecklist.appendChild(item);
            });
        }

        // Set weekly goal
        const weeklyGoalText = document.getElementById('weeklyGoalText');
        if (weeklyGoalText && content.weekly) {
            weeklyGoalText.textContent = content.weekly;
        }

        // Set monthly milestone
        const monthlyMilestoneText = document.getElementById('monthlyMilestoneText');
        if (monthlyMilestoneText && content.monthly) {
            monthlyMilestoneText.textContent = content.monthly;
        }
    }

    // Handle checkbox interactions
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });

    // Update progress bar based on completed tasks
    function updateProgress() {
        const total = checkboxes.length;
        const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = (completed / total) * 100;
        
        const progressBar = document.querySelector('.progress');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar && progressText) {
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `${Math.round(percentage)}%`;
        }

        // Update milestone status
        updateMilestones(percentage);
    }

    // Update milestone status based on progress
    function updateMilestones(percentage) {
        const milestones = document.querySelectorAll('.milestone');
        milestones.forEach((milestone, index) => {
            const threshold = (index + 1) * 25;
            if (percentage >= threshold) {
                milestone.setAttribute('data-status', 'completed');
            } else if (percentage >= threshold - 25) {
                milestone.setAttribute('data-status', 'current');
            } else {
                milestone.setAttribute('data-status', 'pending');
            }
        });
    }

    // Handle email form submission
    const emailForm = document.querySelector('.email-form');
    const emailInput = document.getElementById('userEmail');
    const downloadButton = document.getElementById('downloadPlan');

    if (downloadButton && emailInput) {
        downloadButton.addEventListener('click', () => {
            if (!emailInput.value) {
                emailInput.classList.add('shake');
                setTimeout(() => emailInput.classList.remove('shake'), 300);
                return;
            }

            // Here you would typically send the email to your backend
            // For now, we'll just show a success message
            const getDetailedPlan = document.querySelector('.get-detailed-plan');
            if (getDetailedPlan) {
                getDetailedPlan.innerHTML = `
                    <h3>Thank you!</h3>
                    <p>Your detailed action plan will be sent to ${emailInput.value}</p>
                    <p>Check your inbox in the next few minutes.</p>
                `;
            }

            // Store email for future use
            localStorage.setItem('userEmail', emailInput.value);
        });
    }

    // Back button handling
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'plan.html';
            }, 500);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'plan.html';
            }, 500);
        } else if (e.key === 'Enter' && !e.shiftKey) {
            const activeElement = document.activeElement;
            if (activeElement === emailInput) {
                downloadButton.click();
            }
        }
    });
}); 