/**
 * Main JavaScript for Lunar Vibes website
 * Handles quote display, user interactions, and general functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize quote functionality
    initQuotes();
    
    // Initialize form submission
    initContactForm();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize active navigation highlighting
    initActiveNavHighlighting();
});

/**
 * Initialize quote display and interaction
 */
function initQuotes() {
    const quoteText = document.getElementById('quote');
    const quoteAuthor = document.getElementById('author');
    const newQuoteBtn = document.getElementById('new-quote');
    const shareQuoteBtn = document.getElementById('share-quote');
    
    // Set initial quote (if not already set in HTML)
    if (quoteText && quoteText.textContent.trim() === '') {
        const randomQuote = getRandomQuote();
        quoteText.textContent = randomQuote.text;
        quoteAuthor.textContent = `- ${randomQuote.author}`;
    }
    
    // New quote button click handler
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', () => {
            const randomQuote = getRandomQuote();
            
            // Animate quote change
            animateQuoteChange(quoteText, quoteAuthor, randomQuote);
        });
    }
    
    // Share quote button click handler
    if (shareQuoteBtn) {
        shareQuoteBtn.addEventListener('click', () => {
            shareQuote(quoteText.textContent, quoteAuthor.textContent.replace('- ', ''));
        });
    }
}

/**
 * Get a random quote from the quotes array
 * @returns {Object} A random quote object with text and author
 */
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

/**
 * Share a quote using the Web Share API or fallback to copying to clipboard
 * @param {string} text - The quote text
 * @param {string} author - The quote author
 */
function shareQuote(text, author) {
    const shareData = {
        title: 'Lunar Vibes Quote',
        text: `"${text}" - ${author}`,
        url: window.location.href
    };
    
    // Use Web Share API if available
    if (navigator.share && navigator.canShare(shareData)) {
        navigator.share(shareData)
            .catch(err => {
                console.error('Error sharing:', err);
                copyToClipboard(shareData.text);
            });
    } else {
        // Fallback to clipboard
        copyToClipboard(shareData.text);
    }
}

/**
 * Copy text to clipboard and show feedback
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        // Copy text
        document.execCommand('copy');
        alert('Quote copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy quote. Please try again.');
    } finally {
        // Remove temporary textarea
        document.body.removeChild(textarea);
    }
}

/**
 * Initialize contact form submission
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Initialize active navigation highlighting based on scroll position
 */
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        // Find current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            } else if (current === '' && link.getAttribute('href') === '#') {
                // Home link when at the top
                link.classList.add('active');
            }
        });
    });
}