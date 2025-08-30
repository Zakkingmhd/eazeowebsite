document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Form Submission Handling
    const form = document.getElementById('waitlist-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = document.getElementById('submit-button');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                // IMPORTANT: Replace this with your Formspree endpoint!
                const response = await fetch('YOUR_FORMSPREE_ENDPOINT_HERE', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    if (formStatus) formStatus.textContent = "Thank you! You're on the list. We'll be in touch soon!";
                    if (formStatus) formStatus.style.color = 'var(--primary)';
                    form.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                if (formStatus) formStatus.textContent = 'Something went wrong. Please try again.';
                if (formStatus) formStatus.style.color = '#e74c3c';
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Join the Revolution';
                }
            }
        });
    }
    
    // Scroll-triggered fade-in animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

});
