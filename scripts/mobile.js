document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav .menu-link');
    const overlay = document.querySelector('.main-overlay');

    function slideDown(element) {
        element.style.display = 'block';
        const height = element.scrollHeight + 'px';
        element.style.maxHeight = height;
        element.style.visibility = 'visible';
        element.classList.add('active');

        element.addEventListener('transitionend', function handler() {
            element.style.maxHeight = 'none';
            element.removeEventListener('transitionend', handler);
        });
    }

    function slideUp(element) {
        const height = element.scrollHeight + 'px';
        element.style.maxHeight = height;

        // Force reflow to apply the current maxHeight
        element.offsetHeight;

        element.style.maxHeight = '0';
        element.classList.remove('active');

        element.addEventListener('transitionend', function handler() {
            element.style.visibility = 'hidden';
            element.style.display = 'none';
            element.removeEventListener('transitionend', handler);
        });
    }

    menuToggle.addEventListener('click', () => {
        if (mobileNav.classList.contains('active')) {
            slideUp(mobileNav);
            overlay.classList.remove('active');
        } else {
            slideDown(mobileNav);
            overlay.classList.add('active');
        }
    });

    overlay.addEventListener('click', () => {
        slideUp(mobileNav);
        overlay.classList.remove('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            slideUp(mobileNav);
            overlay.classList.remove('active');
        });
    });
});
