function checkScroll() {
    const header = document.getElementById('topBarWrapper');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

window.addEventListener('scroll', checkScroll);