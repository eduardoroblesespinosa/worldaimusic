document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (link.hash !== "") {
                event.preventDefault();
                const hash = link.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Also handle smooth scroll for other links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('nav-link')) { // avoid double-binding nav links
             anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    const onScroll = () => {
        const scrollPos = window.pageYOffset + window.innerHeight / 2;

        // Scrollspy for active nav link
        pageSections.forEach(section => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (section.id === link.hash.substring(1)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call
    onScroll();

    // Logo Animation
    const logo = document.querySelector('.navbar-brand');
    if (logo && typeof anime !== 'undefined') {
        const logoPath = document.getElementById('logo-path');
        const textPath = `M 10 18 L 16 6 L 19 12 L 22 6 L 28 18 M 22 12 L 19 12 M 32 18 L 32 6 M 32 6 C 36 6 38 8 38 12 C 38 16 36 18 32 18 M 42 6 L 42 18 M 46 18 L 46 6 L 54 18 L 54 6 M 58 18 L 58 6 M 66 18 L 66 6 M 62 6 L 62 18 M 72 18 L 72 6 M 72 12 L 80 12 M 80 18 L 80 6 M 88 18 L 88 6 M 92 6 L 90 12 L 94 12 M 90 18 L 94 18 M 98 12 C 98 8 100 6 104 6 C 108 6 110 8 110 12 C 110 16 108 18 104 18 C 100 18 98 16 98 12 Z M 116 18 L 116 6 M 122 18 L 118 6 L 126 6 L 122 18 Z M 130 18 L 130 6 M 132 12 C 134 10 136 10 138 12 C 136 14 134 14 132 12 M 142 18 L 142 6 M 146 18 L 146 10 C 146 8 148 6 150 6 C 152 6 154 8 154 10 L 154 18 M 158 18 L 158 6 L 166 6 M 158 12 L 164 12 M 162 18 L 162 6 M 170 18 L 170 10 C 170 8 172 6 174 6 C 176 6 178 8 178 10 L 178 18 M 182 12 C 182 8 184 6 188 6 C 192 6 194 8 194 12 C 194 16 192 18 188 18 C 184 18 182 16 182 12 Z`;
        const notePath = `M 80 17 C 80 14, 84 14, 85 15 C 80 13, 80 8, 90 6 L 90 20 L 89 20 L 89 8 C 82 10, 81 14, 80 17 Z M 100 16 C 100 12, 105 12, 105 14 C 100 11, 100 7, 110 5 L 110 19 L 109 19 L 109 7 C 102 9, 101 13, 100 16 Z M 90 6 L 110 5 M 90 9 L 110 8 M 90 20 L 110 19`;

        let isAnimating = false;

        logo.addEventListener('mouseenter', () => {
            if (isAnimating) return;
            isAnimating = true;
            anime({
                targets: logoPath,
                d: notePath,
                duration: 800,
                easing: 'easeInOutQuad',
                complete: () => { isAnimating = false; }
            });
        });

        logo.addEventListener('mouseleave', () => {
            if (isAnimating) return;
            isAnimating = true;
            anime({
                targets: logoPath,
                d: textPath,
                duration: 800,
                easing: 'easeInOutQuad',
                complete: () => { isAnimating = false; }
            });
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formStatus = document.getElementById('form-status');
            const submitButton = contactForm.querySelector('button[type="submit"]');

            // Simulate sending
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formStatus.innerHTML = '';

            setTimeout(() => {
                // On success
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
                formStatus.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent successfully.</div>';
                contactForm.reset();

                // Clear the status message after a few seconds
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.innerHTML = '';
                    }
                }, 5000);

            }, 2000); // 2 second delay to simulate network
        });
    }
});