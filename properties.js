// Properties Page Functionality
class PropertiesPage {
    constructor() {
        this.properties = Array.from(document.querySelectorAll('.property-card'));
        this.visibleCount = 9; // Show first 9 properties initially
        this.currentFilters = {
            type: 'all',
            price: 'all',
            status: 'all',
            search: ''
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupInitialView();
        this.applyFilters(); // Apply initial filters
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('propertySearch');
        const searchBtn = document.querySelector('.search-btn');
        
        searchInput.addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        searchBtn.addEventListener('click', () => {
            this.currentFilters.search = searchInput.value.toLowerCase();
            this.applyFilters();
        });

        // Filter functionality
        document.getElementById('typeFilter').addEventListener('change', (e) => {
            this.currentFilters.type = e.target.value;
            this.applyFilters();
        });

        document.getElementById('priceFilter').addEventListener('change', (e) => {
            this.currentFilters.price = e.target.value;
            this.applyFilters();
        });

        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.applyFilters();
        });

        // Reset filters
        document.getElementById('resetFilters').addEventListener('click', () => {
            this.resetFilters();
        });

        document.getElementById('clearAllFilters').addEventListener('click', () => {
            this.resetFilters();
        });

        // Load more functionality
        document.getElementById('loadMore').addEventListener('click', () => {
            this.loadMoreProperties();
        });

        // Initialize property interactions
        this.setupPropertyInteractions();
    }

    setupInitialView() {
        // Show only initial count of properties
        this.properties.forEach((property, index) => {
            if (index >= this.visibleCount) {
                property.style.display = 'none';
            }
        });
    }

    applyFilters() {
        let visibleProperties = 0;
        let matchesFilters = 0;

        this.properties.forEach((property, index) => {
            const type = property.dataset.type;
            const price = parseInt(property.dataset.price);
            const status = property.dataset.status;
            const location = property.dataset.location;
            const title = property.querySelector('.property-title').textContent.toLowerCase();
            const description = property.querySelector('.property-description').textContent.toLowerCase();

            // Check if property matches all current filters
            const matchesType = this.currentFilters.type === 'all' || type === this.currentFilters.type;
            const matchesStatus = this.currentFilters.status === 'all' || status === this.currentFilters.status;
            const matchesPrice = this.checkPriceFilter(price);
            const matchesSearch = this.currentFilters.search === '' || 
                                title.includes(this.currentFilters.search) ||
                                description.includes(this.currentFilters.search) ||
                                location.includes(this.currentFilters.search);

            const shouldShow = matchesType && matchesStatus && matchesPrice && matchesSearch && index < this.visibleCount;

            if (shouldShow) {
                property.style.display = 'block';
                visibleProperties++;
                matchesFilters++;
            } else {
                property.style.display = 'none';
            }

            // Count all properties that match filters (regardless of visible count)
            if (matchesType && matchesStatus && matchesPrice && matchesSearch) {
                matchesFilters++;
            }
        });

        // Show/hide no results message
        const noResults = document.getElementById('noResults');
        if (matchesFilters === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMore');
        if (matchesFilters > this.visibleCount) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

   checkPriceFilter(price) {
    if (this.currentFilters.price === 'all') return true;
    
    const priceRange = this.currentFilters.price;
    
    if (priceRange === '50000000+') {
        return price >= 50000000;
    }
    
    // For other ranges, split by hyphen
    const [min, max] = priceRange.split('-');
    
    if (min === '0') {
        return price <= parseInt(max);
    } else {
        return price >= parseInt(min) && price <= parseInt(max);
    }
}

    resetFilters() {
        // Reset filter values
        document.getElementById('typeFilter').value = 'all';
        document.getElementById('priceFilter').value = 'all';
        document.getElementById('statusFilter').value = 'all';
        document.getElementById('propertySearch').value = '';

        // Reset current filters
        this.currentFilters = {
            type: 'all',
            price: 'all',
            status: 'all',
            search: ''
        };

        // Reset visible count
        this.visibleCount = 9;

        // Reapply filters
        this.applyFilters();
    }

    loadMoreProperties() {
        this.visibleCount += 6; // Load 6 more properties
        this.applyFilters();
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

        // Inquiry functionality
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
            navigator.clipboard.writeText(shareText);
            this.showNotification('Property link copied to clipboard!');
        }
    }

    openInquiryModal(propertyCard) {
        // Use the same modal functionality from your main script
        if (window.PropertyListings) {
            window.PropertyListings.openInquiryModal(propertyCard);
        }
    }
}

// Initialize properties page
document.addEventListener('DOMContentLoaded', () => {
    new PropertiesPage();
});