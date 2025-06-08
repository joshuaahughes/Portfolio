// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Interactive elements with cursor
const links = document.querySelectorAll('a, button, .filter-btn, .portfolio-item');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Sticky Header
const header = document.querySelector('header');
let scrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentPosition = window.pageYOffset;
    
    if (currentPosition > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    
    // Show/hide header on scroll
    if (currentPosition > scrollPosition) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    scrollPosition = currentPosition;
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
    
    if (hamburger.classList.contains('active')) {
        hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 6px)';
        hamburger.querySelector('span:nth-child(2)').style.opacity = '0';
        hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        hamburger.querySelector('span:nth-child(1)').style.transform = 'none';
        hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
        hamburger.querySelector('span:nth-child(3)').style.transform = 'none';
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        
        hamburger.querySelector('span:nth-child(1)').style.transform = 'none';
        hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
        hamburger.querySelector('span:nth-child(3)').style.transform = 'none';
    });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop;
        
        window.scrollTo({
            top: offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
        });
    }
}

// Add event listener to all navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const sectionId = link.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// Form submission and validation with EmailJS
const contactForm = document.getElementById('contact-form');

// Initialize EmailJS (you'll need to replace these with your actual values)
// Get these from your EmailJS dashboard after creating an account
const EMAILJS_PUBLIC_KEY = 'gsjEM8BrpS8C9Yxws'; // Replace with your public key
const EMAILJS_SERVICE_ID = 'service_0xatlml'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'template_0ikzfn4'; // Replace with your template ID

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name === '' || email === '' || subject === '' || message === '') {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // If validation passes, send email via EmailJS
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'josh@datagainz.com'
    };
    
    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then((response) => {
            console.log('Email sent successfully:', response);
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#28a745';
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Thank you! Your message has been sent successfully.');
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Show error message
            alert('Sorry, there was an error sending your message. Please try again or contact me directly at josh@datagainz.com');
        });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.about-content, .portfolio-item, .contact-content, .section-header');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('reveal-text');
        }
    });
}

// Initial check
revealOnScroll();

// Add event listener
window.addEventListener('scroll', revealOnScroll);

// Add CSS class for no-scroll when mobile menu is active
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .no-scroll {
            overflow: hidden;
        }
        
        @media (max-width: 992px) {
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 6px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -6px);
            }
        }
    </style>
`);