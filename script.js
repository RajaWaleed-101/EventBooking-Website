document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const learnMoreBtns = document.querySelectorAll('.learn-more');
    const eventDetail = document.querySelector('.event-detail');
    const closeDetail = document.querySelector('.close-detail');
    const detailContent = document.querySelector('.detail-content');
    const eventTemplates = document.querySelector('.event-templates');
    const contactForm = document.getElementById('contact-form');
    const paymentModal = document.getElementById('payment-modal');
    const closePayment = document.querySelector('.close-payment');
    const selectedEventInfo = document.querySelector('.selected-event-info');
    const paymentForm = document.getElementById('payment-form');
    
    // Event pricing (in a real app, this would come from a database)
    const eventPrices = {
        'event1': 99.00,
        'event2': 129.00,
        'event3': 75.00,
        'event4': 50.00,
        'event5': 199.00,
        'event6': 149.00
    };
    
    // Event names
    const eventNames = {
        'event1': 'TechFest 2025',
        'event2': 'Music Vibes Night',
        'event3': 'Art & Culture Expo',
        'event4': 'Startup Pitch Day',
        'event5': 'Global Health Summit',
        'event6': 'Film Gala Awards'
    };
    
    // Event dates
    const eventDates = {
        'event1': '15th Sept 2025',
        'event2': '25th Sept 2025',
        'event3': '10th Oct 2025',
        'event4': '18th Oct 2025',
        'event5': '1st Nov 2025',
        'event6': '12th Nov 2025'
    };
    
    // Event venues
    const eventVenues = {
        'event1': 'San Francisco Convention Center',
        'event2': 'Madison Square Garden, New York',
        'event3': 'Louvre Museum, Paris',
        'event4': 'London Tech Hub',
        'event5': 'Geneva Convention Center',
        'event6': 'Dolby Theatre, Los Angeles'
    };
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Event detail functionality
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event');
            const eventDetailTemplate = document.getElementById(`${eventId}-detail`);
            
            if (eventDetailTemplate) {
                detailContent.innerHTML = eventDetailTemplate.innerHTML;
                eventDetail.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                
                // Add event listener to the register button in the event detail
                const registerBtn = detailContent.querySelector('.register-btn');
                if (registerBtn) {
                    registerBtn.addEventListener('click', function() {
                        const eventId = this.getAttribute('data-event');
                        openPaymentModal(eventId);
                    });
                }
            }
        });
    });
    
    // Close event detail
    closeDetail.addEventListener('click', function() {
        eventDetail.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close event detail when clicking outside the content
    eventDetail.addEventListener('click', function(e) {
        if (e.target === eventDetail) {
            eventDetail.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Function to open payment modal
    function openPaymentModal(eventId) {
        // Update selected event info
        const eventName = eventNames[eventId];
        const eventDate = eventDates[eventId];
        const eventVenue = eventVenues[eventId];
        const eventPrice = eventPrices[eventId];
        
        // Create event info HTML
        selectedEventInfo.innerHTML = `
            <h3>${eventName}</h3>
            <p><i class="far fa-calendar-alt"></i> ${eventDate}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${eventVenue}</p>
        `;
        
        // Update price in order summary
        document.getElementById('ticket-price').textContent = `$${eventPrice.toFixed(2)}`;
        
        // Calculate and update total price (ticket price + processing fee)
        const processingFee = 5.00;
        const totalPrice = eventPrice + processingFee;
        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
        
        // Generate a unique reference for bank transfer
        document.getElementById('bank-reference').textContent = `EVENT-${eventId.toUpperCase()}-${Math.floor(Math.random() * 10000)}`;        
        
        // Close event detail and open payment modal
        eventDetail.classList.remove('active');
        paymentModal.classList.add('active');
    }
    
    // Close payment modal
    closePayment.addEventListener('click', function() {
        paymentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close payment modal when clicking outside the content
    paymentModal.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Payment form functionality
    if (paymentForm) {
        // Payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method');
        const paymentDetails = document.querySelectorAll('.payment-details');
        
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                // Remove active class from all methods
                paymentMethods.forEach(m => m.classList.remove('active'));
                
                // Add active class to selected method
                this.classList.add('active');
                
                // Hide all payment details
                paymentDetails.forEach(detail => detail.classList.remove('active'));
                
                // Show selected payment details
                const paymentType = this.getAttribute('data-payment');
                document.getElementById(`${paymentType}-details`).classList.add('active');
            });
        });
        
        // Set credit card as default payment method
        document.querySelector('[data-payment="credit-card"]').click();
        
        // Payment form submission
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get personal information
            const fullName = document.getElementById('full-name').value;
            const email = document.getElementById('payment-email').value;
            const phone = document.getElementById('phone').value;
            
            // Basic validation
            if (!fullName || !email || !phone) {
                alert('Please fill in all personal information fields.');
                return;
            }
            
            // Get selected payment method
            const selectedMethod = document.querySelector('.payment-method.active');
            if (!selectedMethod) {
                alert('Please select a payment method.');
                return;
            }
            
            const paymentType = selectedMethod.getAttribute('data-payment');
            let paymentValid = false;
            
            // Validate payment details based on selected method
            switch (paymentType) {
                case 'credit-card':
                    const cardNumber = document.getElementById('card-number').value;
                    const cardName = document.getElementById('card-name').value;
                    const expiry = document.getElementById('expiry').value;
                    const cvv = document.getElementById('cvv').value;
                    
                    if (cardNumber && cardName && expiry && cvv) {
                        // In a real app, you would validate card number format, expiry date, etc.
                        paymentValid = true;
                    } else {
                        alert('Please fill in all credit card details.');
                    }
                    break;
                    
                case 'paypal':
                    const paypalEmail = document.getElementById('paypal-email').value;
                    
                    if (paypalEmail) {
                        paymentValid = true;
                    } else {
                        alert('Please enter your PayPal email.');
                    }
                    break;
                    
                case 'bank-transfer':
                    // Bank transfer doesn't need additional validation as the reference is auto-generated
                    paymentValid = true;
                    break;
            }
            
            if (paymentValid) {
                // In a real application, you would process the payment through a payment gateway
                alert(`Thank you for your registration! Your payment for ${document.getElementById('total-price').textContent} has been processed successfully.`);
                
                // Close payment modal and reset form
                paymentModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                paymentForm.reset();
                
                // Reset payment method selection
                paymentMethods.forEach(m => m.classList.remove('active'));
                paymentDetails.forEach(detail => detail.classList.remove('active'));
            }
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.event-card, .contact-wrapper');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.event-card, .contact-wrapper').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on initial load
    animateOnScroll();
});