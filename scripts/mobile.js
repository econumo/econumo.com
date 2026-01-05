document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu-link');
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

    if (menuToggle && mobileNav && overlay) {
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
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || href.indexOf('#') === -1) {
                return;
            }

            const [basePath, hash] = href.split('#');
            const currentPath = window.location.pathname.replace(/\/$/, '');
            const targetPath = (basePath || '').replace(/\/$/, '');
            const shouldScrollHere = !basePath || targetPath === currentPath;
            if (!shouldScrollHere) {
                return;
            }

            event.preventDefault();

            const targetSection = document.getElementById(hash);
            if (!targetSection) {
                return;
            }

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            slideUp(mobileNav);
            overlay.classList.remove('active');
        });
    });
});
