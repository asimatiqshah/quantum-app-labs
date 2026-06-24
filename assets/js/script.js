/**
 * NORI - Education Landing Page JavaScript
 * Standard, Clean, and Beginner-Friendly JS
 */

document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Sticky Navigation Bar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        // If user scrolls past 50px, add solid background style, otherwise keep it transparent
        if (window.scrollY > 50) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('navbar-transparent');
        }
    }
    
    // Run on page load
    checkScroll();
    
    // Run on every scroll event
    window.addEventListener('scroll', checkScroll);

    // 2. Mobile Menu Auto-Collapse on Link Click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuCollapse = document.getElementById('navbarNav');
    
    // Check if Bootstrap is loaded and menu collapse element exists
    if (menuCollapse) {
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                // If it is in mobile view (the hamburger menu is expanded)
                if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
                    // Use Bootstrap's collapse method to close it
                    const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    // 3. Simple Contact Form Submission Feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Stop page reload
            
            // Get values
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const message = document.getElementById('formMessage').value;
            
            // Simple validation check
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill out all fields before sending.');
                return;
            }
            
            // Display success message
            alert(`Thank you, ${name}! Your message has been sent successfully. We will contact you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
});
