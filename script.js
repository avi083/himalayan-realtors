// Himalayan Realtors - Modern JavaScript
class HimalayanRealtors {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupFormHandling();
        this.setupAnimations();
        this.setupSmoothScrolling();
        this.setupHeaderScroll();
        console.log('Himalayan Realtors website initialized successfully!');
    }

    // Mobile Navigation Toggle
    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Enhanced Form Handling
    setupFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.classList.add('loading');
                
                try {
                    // Simulate API call
                    await this.simulateFormSubmit(form);
                    
                    // Show success message
                    this.showSuccessMessage(form, 'Thank you! Your message has been sent successfully.');
                    
                    // Reset form
                    form.reset();
                    
                } catch (error) {
                    this.showErrorMessage(form, 'Sorry, there was an error sending your message. Please try again.');
                } finally {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('loading');
                }
            });
        });
    }

    // Simulate form submission
    async simulateFormSubmit(form) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                Math.random() > 0.1 ? resolve() : reject();
            }, 1500);
        });
    }

    // Show success message
    showSuccessMessage(form, message) {
        const existingMessage = form.querySelector('.success-message');
        if (existingMessage) existingMessage.remove();

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message fade-in';
        successDiv.textContent = message;
        
        form.appendChild(successDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Show error message
    showErrorMessage(form, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'success-message';
        errorDiv.style.background = '#f8d7da';
        errorDiv.style.color = '#721c24';
        errorDiv.style.borderColor = '#f5c6cb';
        errorDiv.textContent = message;
        
        form.appendChild(errorDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Scroll Animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.card, .service-block, .content-section').forEach(el => {
            observer.observe(el);
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Header Scroll Effect
    setupHeaderScroll() {
        const header = document.querySelector('header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
                return;
            }

            if (currentScroll > lastScroll && currentScroll > 80) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = 'var(--shadow)';
            }

            lastScroll = currentScroll;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HimalayanRealtors();
});

// Add loading animation to hero section
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'fadeInUp 0.8s ease-out';
    }
});