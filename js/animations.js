/**
 * Animations for Lunar Vibes website
 * Handles scroll animations, transitions, and interactive effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize header scroll effect
    initHeaderScroll();
});

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in, .fade-in-delay, .fade-in-delay-2, .scroll-watch, .stagger');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animation classes when element is in view
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('slide-in-left')) {
                    entry.target.style.animation = 'slideInLeft 1s forwards';
                } else if (entry.target.classList.contains('slide-in-right')) {
                    entry.target.style.animation = 'slideInRight 1s forwards';
                } else if (entry.target.classList.contains('scroll-watch')) {
                    entry.target.classList.add('in-view');
                } else if (entry.target.classList.contains('stagger')) {
                    entry.target.classList.add('in-view');
                }
                
                // Unobserve after animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize hover effects for interactive elements
 */
function initHoverEffects() {
    // Add hover effects to quote container
    const quoteContainer = document.querySelector('.quote-container');
    if (quoteContainer) {
        quoteContainer.classList.add('hover-glow');
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn:not(.pulse)');
    buttons.forEach(button => {
        button.classList.add('hover-lift');
    });
    
    // Add hover effects to navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'color 0.3s ease';
        });
    });
    
    // Add hover effects to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.classList.add('hover-lift');
    });
}

/**
 * Initialize header scroll effect (shrink on scroll)
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce padding when scrolling down
        if (scrollTop > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '20px 0';
        }
        
        // Update last scroll position
        lastScrollTop = scrollTop;
    });
}

/**
 * Apply animation to quote change
 * @param {HTMLElement} quoteElement - The quote element to animate
 * @param {HTMLElement} authorElement - The author element to animate
 * @param {Object} newQuote - The new quote object with text and author
 */
function animateQuoteChange(quoteElement, authorElement, newQuote) {
    // Add animation class
    quoteElement.classList.add('quote-change');
    authorElement.classList.add('quote-change');
    
    // Update text halfway through the animation
    setTimeout(() => {
        quoteElement.textContent = newQuote.text;
        authorElement.textContent = `- ${newQuote.author}`;
    }, 750);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        quoteElement.classList.remove('quote-change');
        authorElement.classList.remove('quote-change');
    }, 1500);
}

/**
 * Float animation for moon illustration
 */
function initMoonAnimation() {
    const moonIllustration = document.querySelector('.moon-illustration');
    if (moonIllustration) {
        moonIllustration.classList.add('float');
    }
}

// Initialize moon animation after DOM is loaded
document.addEventListener('DOMContentLoaded', initMoonAnimation);