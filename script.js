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

// Property Listings Functionality
class PropertyListings {
    constructor() {
        this.init();
    }

    init() {
        this.setupFiltering();
        this.setupPropertyInteractions();
        this.setupInquiryForms();
    }

    setupFiltering() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const propertyCards = document.querySelectorAll('.property-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                propertyCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    setupPropertyInteractions() {
        // Favorite functionality
        document.querySelectorAll('.action-btn.favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.classList.toggle('active');
                if (btn.classList.contains('active')) {
                    btn.innerHTML = '❤️';
                    this.showNotification('Property added to favorites!');
                } else {
                    btn.innerHTML = '🤍';
                    this.showNotification('Property removed from favorites!');
                }
            });
        });

        // Share functionality
        document.querySelectorAll('.action-btn.share').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.shareProperty(btn.closest('.property-card'));
            });
        });

        // Property card click
        document.querySelectorAll('.property-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.action-btn') && !e.target.closest('.inquire-btn')) {
                    this.viewPropertyDetails(card);
                }
            });
        });
    }

    setupInquiryForms() {
        document.querySelectorAll('.inquire-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const propertyCard = btn.closest('.property-card');
                this.openInquiryModal(propertyCard);
            });
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification fade-in';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-blue);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-hover);
            z-index: 10000;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    shareProperty(propertyCard) {
        const title = propertyCard.querySelector('.property-title').textContent;
        const price = propertyCard.querySelector('.property-price').textContent;
        const shareText = `Check out this property: ${title} - ${price}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Himalayan Realtors Property',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText);
            this.showNotification('Property link copied to clipboard!');
        }
    }

    viewPropertyDetails(propertyCard) {
        const title = propertyCard.querySelector('.property-title').textContent;
        const price = propertyCard.querySelector('.property-price').textContent;
        const address = propertyCard.querySelector('.property-address').textContent;
        
        alert(`Property Details:\n\n${title}\n${price}\n${address}\n\nFull details page coming soon!`);
    }

    openInquiryModal(propertyCard) {
    const title = propertyCard.querySelector('.property-title').textContent;
    const price = propertyCard.querySelector('.property-price').textContent;
    const address = propertyCard.querySelector('.property-address').textContent;
    const image = propertyCard.querySelector('.property-image img').src;
    
    const modalHtml = `
        <div class="inquiry-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="modal-close" aria-label="Close modal">×</button>
                    <div class="modal-property-info">
                        <h3 class="modal-property-title">${title}</h3>
                        <div class="modal-property-price">${price}</div>
                        <div class="modal-property-address">📍 ${address} </div>
                        <br><br>
                         <p class="modal-property-phone"><strong>Contact Number:</strong> 9851186087</p>
                       

                    </div>
                </div>
                
                <div class="modal-body">
                    <h3 class="modal-title">Schedule a Viewing</h3>
                    <p class="modal-subtitle">Fill out the form below and our agent will contact you shortly</p>
                    
                    <form class="inquiry-form" id="inquiryForm">
                        <div class="modal-form-group">
                            <label for="inquiry-name">Full Name *</label>
                            <div class="modal-input-wrapper">
                                <i>👤</i>
                                <input type="text" id="inquiry-name" name="name" placeholder="Enter your full name" required>
                            </div>
                            <div class="error-message">Please enter your name</div>
                        </div>
                        
                        <div class="modal-form-group">
                            <label for="inquiry-email">Email Address *</label>
                            <div class="modal-input-wrapper">
                                <i>📧</i>
                                <input type="email" id="inquiry-email" name="email" placeholder="Enter your email address" required>
                            </div>
                            <div class="error-message">Please enter a valid email address</div>
                        </div>
                        
                        <div class="modal-form-group">
                            <label for="inquiry-phone">Phone Number *</label>
                            <div class="modal-input-wrapper">
                                <i>📱</i>
                                <input type="tel" id="inquiry-phone" name="phone" placeholder="Enter your phone number" required>
                            </div>
                            <div class="error-message">Please enter your phone number</div>
                        </div>
                        
                        <div class="modal-form-group">
                            <label for="inquiry-purpose">Purpose of Inquiry</label>
                            <div class="modal-input-wrapper">
                                <i>🎯</i>
                                <select id="inquiry-purpose" name="purpose">
                                    <option value="">Select purpose</option>
                                    <option value="buying">I want to buy</option>
                                    <option value="renting">I want to rent</option>
                                    <option value="viewing">Schedule a viewing</option>
                                    <option value="information">More information</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="modal-form-group">
                            <label for="inquiry-message">Your Message *</label>
                            <textarea id="inquiry-message" name="message" placeholder="Tell us about your requirements, preferred timing for viewing, or any specific questions..." required></textarea>
                            <div class="error-message">Please enter your message</div>
                        </div>
                        
                        <div class="modal-form-actions">
                            <button type="submit" class="modal-submit-btn">
                                <span class="btn-text">Send Inquiry</span>
                            </button>
                            <button type="button" class="modal-cancel-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = document.querySelector('.inquiry-modal');
    const form = modal.querySelector('#inquiryForm');
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.modal-cancel-btn');
    
    // Add focus management
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            this.closeModal(modal);
        }
    });
    
    // Trap focus inside modal
    this.trapFocus(modal);
    
    // Form validation
    this.setupModalFormValidation(form);
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.validateModalForm(form)) {
            this.submitInquiryForm(form, propertyCard);
        }
    });
    
    // Close events
    closeBtn.addEventListener('click', () => this.closeModal(modal));
    cancelBtn.addEventListener('click', () => this.closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            this.closeModal(modal);
        }
    });
}

setupModalFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        const formGroup = input.closest('.modal-form-group');
        
        input.addEventListener('focus', () => {
            formGroup.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                formGroup.classList.remove('focused');
            }
            this.validateModalField(input);
        });
        
        input.addEventListener('input', () => {
            this.validateModalField(input);
        });
    });
}

validateModalField(field) {
    const formGroup = field.closest('.modal-form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('success', 'error');
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        formGroup.classList.add('error');
        return false;
    }
    
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
        if (!phoneRegex.test(field.value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    if (field.value) {
        formGroup.classList.add('success');
    }
    
    return true;
}

validateModalForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!this.validateModalField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

submitInquiryForm(form, propertyCard) {
    const submitBtn = form.querySelector('.modal-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // Show loading state
    btnText.textContent = 'Sending...';
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        this.showSuccessState(form, propertyCard);
    }, 2000);
}

showSuccessState(form, propertyCard) {
    const modalBody = form.closest('.modal-body');
    const propertyTitle = document.querySelector('.modal-property-title').textContent;
    
    modalBody.innerHTML = `
        <div class="modal-success">
            <div class="modal-success-icon">✓</div>
            <h3>Inquiry Sent Successfully!</h3>
            <p>Thank you for your interest in <strong>${propertyTitle}</strong>. Our real estate agent will contact you within 24 hours to schedule a viewing and answer any questions.</p>
            <button class="modal-submit-btn" onclick="this.closest('.inquiry-modal').remove()">
                Close
            </button>
        </div>
    `;
}

closeModal(modal) {
    modal.classList.add('closing');
    setTimeout(() => {
        modal.remove();
    }, 200);
}

trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
    
    // Focus first element
    firstElement.focus();
}

    submitInquiry(form, propertyCard) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.showNotification('Inquiry sent successfully! We will contact you soon.');
            form.closest('.inquiry-modal').remove();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
}

// Initialize property listings
document.addEventListener('DOMContentLoaded', () => {
    new PropertyListings();
});
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