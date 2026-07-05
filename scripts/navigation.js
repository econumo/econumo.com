document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.menu-link');
    const sections = document.querySelectorAll('section');
    const reflex = document.querySelector('.reflex');

    const initialReflexState = () => {
        if (!reflex) return;
        reflex.style.width = '100%';
        reflex.style.left = '0';
    };

    const setActiveLink = (link) => {
        links.forEach(l => l.classList.remove('active'));
        if (link && reflex) {
            link.classList.add('active');

            // Calculate the position and width of the active link
            const linkRect = link.getBoundingClientRect();
            const topBarRect = document.querySelector('.top-bar').getBoundingClientRect();
            const reflexWidth = 200;

            reflex.style.width = `${reflexWidth}px`;
            reflex.style.left = `${linkRect.left - topBarRect.left + (linkRect.width / 2) - (reflexWidth / 2)}px`;
        } else {
            initialReflexState();
        }
    };

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').indexOf('#') === -1) {
                return;
            }
            const href = link.getAttribute('href').split('#')[0];
            if (href === window.location.pathname) {
                e.preventDefault();
                const targetId = link.getAttribute('href').split('#')[1];
                const targetSection = document.getElementById(targetId);
                if (!targetSection) {
                    return;
                }

                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });

                setActiveLink(link);
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 960) {
            return;
        }

        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3 && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        if (currentSection) {
            const activeLink = document.querySelector(`.main-nav a[href="#${currentSection}"]`);
            setActiveLink(activeLink);
        } else {
            setActiveLink(null);
        }
    });

    initialReflexState();

    document.querySelectorAll('.navigate-top').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const menuControl = document.getElementById('menu-control');
            if (menuControl) {
                menuControl.checked = !menuControl.checked;
            }
        });
    }
});
