// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Typing effect for the hero section
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        'Full Stack Developer',
        'Problem Solver',
        'DSA Enthusiast',
        'Web Developer'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 1000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
            typeSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start the typing effect
    if (typingElement) {
        setTimeout(typeEffect, 1000);
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link on scroll
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section.getAttribute('id')) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Make header sticky with background color on scroll
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else if (!savedTheme) {
        // Set default theme to dark mode if no preference is saved
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }

    // Toggle theme when clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            } else {

                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Skills Category Tabs
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillContents = document.querySelectorAll('.skills-content');

    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            const target = category.getAttribute('data-category');

            // Remove active class from all tabs and content
            skillCategories.forEach(cat => cat.classList.remove('active'));
            skillContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked tab and corresponding content
            category.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Name cannot be empty');
            } else {
                removeError(nameInput);
            }

            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Email cannot be empty');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email address');
            } else {
                removeError(emailInput);
            }

            if (subjectInput.value.trim() === '') {
                isValid = false;
                showError(subjectInput, 'Subject cannot be empty');
            } else {
                removeError(subjectInput);
            }

            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Message cannot be empty');
            } else {
                removeError(messageInput);
            }


        });
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        if (formGroup.querySelector('.error-message')) {
            return;
        }

        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--danger-color)';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';

        formGroup.appendChild(errorElement);
        input.style.borderColor = 'var(--danger-color)';
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            formGroup.removeChild(errorElement);
        }

        input.style.borderColor = 'var(--primary-color)';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Animate on scroll - simple implementation
    const animateElements = document.querySelectorAll('.skill-item, .timeline-content, .project-card, .achievement-card');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
            }
        });
    }

    // Initial setup for animation
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load

    // Counter animation for achievement numbers
    function animateCounter(element, targetValue) {
        let currentValue = 0;
        const duration = 2000; // ms
        const increment = targetValue / (duration / 16);

        function updateValue() {
            if (currentValue < targetValue) {
                currentValue += increment;
                if (currentValue > targetValue) {
                    currentValue = targetValue;
                }
                element.textContent = Math.floor(currentValue);
                requestAnimationFrame(updateValue);
            }
        }

        updateValue();
    }

    // Update copyright year
    const copyrightYear = document.querySelector('footer p');
    if (copyrightYear) {
        const year = new Date().getFullYear();
        copyrightYear.textContent = `© ${year} Abhishek Mishra. All Rights Reserved.`;
    }

    // Make sure footer is visible by checking document height
    const checkDocumentHeight = () => {
        const body = document.body;
        const html = document.documentElement;
        const height = Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );

        // If document is too short, add min-height to body
        if (height <= window.innerHeight) {
            body.style.minHeight = '100vh';
        }
    };

    // Check document height on load and resize
    checkDocumentHeight();
    window.addEventListener('resize', checkDocumentHeight);
});
function sendEmail(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Construct the mailto link
    const mailtoLink = `mailto:abhisheklpu2714@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open the mailto link
    window.location.href = mailtoLink;
}