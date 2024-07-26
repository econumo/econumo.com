document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.querySelectorAll('.open-modal-signup');
    const overlay = document.getElementById('overlay');
    // const modalContent = document.querySelector('.modal');

    openModalButton.forEach(button => {
        button.addEventListener('click', () => {
            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.classList.add('show');
            }, 10);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 400);
        }
    });
});