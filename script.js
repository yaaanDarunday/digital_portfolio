document.addEventListener('DOMContentLoaded', function() {
    console.log("Hi");
    console.log(document.scrollingElement);

    // Desktop sticky navigation
    const stickyNav = document.getElementById('stickyNav');
    const heroSection = document.querySelector('.hero');
    const sections = document.querySelectorAll('#first-day, #second-day, #third-day, #fourth-day, #fifth-sixth-day');
    const navLinks = document.querySelectorAll('.nav-link:not(.portfolio-link)');

    // Mobile navigation
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Desktop sticky nav functionality
    if (stickyNav && heroSection) {
        function checkNavVisibility() {
            const heroHeight = heroSection.offsetHeight;
            const scrollPosition = window.scrollY;

            // Debug scroll info
            console.log(`Scroll: ${scrollPosition}, Hero Height: ${heroHeight}`);

            // Toggle visibility
            if (scrollPosition > heroHeight - 100) {
                stickyNav.classList.add('visible');
            } else {
                stickyNav.classList.remove('visible');
            }

            // Highlight active nav link
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLinks[index]) {
                        navLinks[index].classList.add('active');
                    }
                }
            });
        }

        // Check initial state
        checkNavVisibility();
        window.addEventListener('scroll', checkNavVisibility);

        // Smooth scroll for desktop nav
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Mobile navigation functionality
    if (burgerMenu && mobileNavOverlay) {
        // Open mobile nav
        burgerMenu.addEventListener('click', function() {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close mobile nav
        function closeMobileNav() {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }

        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', closeMobileNav);
        }

        // Close nav when clicking outside content
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay) {
                closeMobileNav();
            }
        });

        // Close nav when clicking on links (except portfolio)
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (!this.classList.contains('portfolio-link')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        closeMobileNav();
                        setTimeout(() => {
                            targetSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 300); // Wait for nav to close
                    }
                } else {
                    // For portfolio link, just close the nav and let it navigate
                    closeMobileNav();
                }
            });
        });

        // Close nav on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
                closeMobileNav();
            }
        });
    }
});