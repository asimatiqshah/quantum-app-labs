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

    // 3. Formspree AJAX Integration with Modern Feedback Alerts
    const contactForm = document.getElementById('contactForm');
    const formStatusContainer = document.getElementById('formStatusContainer');
    const formStatus = document.getElementById('formStatus');
    const formSubmitBtn = document.getElementById('formSubmitBtn');

    if (contactForm && formStatusContainer && formStatus && formSubmitBtn) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Stop default browser form submit/reload
            
            // Get values for client-side validation
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const subject = document.getElementById('formSubject').value.trim();
            const message = document.getElementById('formMessage').value.trim();
            
            // Reset status alerts
            formStatusContainer.classList.add('d-none');
            formStatus.className = 'alert mb-0';
            formStatus.innerHTML = '';
            
            // Client-side validation check
            if (name === '' || email === '' || subject === '' || message === '') {
                formStatusContainer.classList.remove('d-none');
                formStatus.classList.add('alert-danger');
                formStatus.textContent = 'Please fill out all fields before sending.';
                return;
            }
            
            // Disable submit button and show loading state
            formSubmitBtn.disabled = true;
            const originalBtnText = formSubmitBtn.innerHTML;
            formSubmitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
            
            // Create form data object to send to Formspree
            const formData = new FormData(contactForm);
            
            // Send request to Formspree using fetch
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function (response) {
                if (response.ok) {
                    formStatus.classList.add('alert-success');
                    formStatus.innerHTML = `<strong>Success!</strong> Thank you, ${name}! Your message has been sent successfully. We will get back to you soon.`;
                    contactForm.reset();
                } else {
                    return response.json().then(function (data) {
                        if (data && data.errors) {
                            formStatus.classList.add('alert-danger');
                            formStatus.innerHTML = `<strong>Error:</strong> ` + data.errors.map(err => err.message).join(', ');
                        } else {
                            throw new Error('Form submission failed.');
                        }
                    });
                }
            })
            .catch(function (error) {
                formStatus.classList.add('alert-danger');
                formStatus.innerHTML = '<strong>Error!</strong> Oops! There was a problem submitting your form. Please try again later.';
            })
            .finally(function () {
                // Re-enable button and restore text
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = originalBtnText;
                
                // Show the response status alert and scroll into view smoothly
                formStatusContainer.classList.remove('d-none');
                formStatusContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });
    }
});
