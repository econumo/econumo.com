document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-mail');
    const form = document.getElementById('waiting-list-form');
    if (!sendButton || !form) {
        return;
    }

    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    sendButton.addEventListener('click', function (e) {
        e.preventDefault();

        const errorMessage = form.querySelector('.msg-error');
        if (!validateEmail(form.querySelector('input[name=email]').value)) {
            errorMessage.style.visibility = 'visible';
            return;
        }
        errorMessage.style.visibility = 'hidden';

        fetch(form.getAttribute('action'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(new FormData(form)).toString()
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const div1 = document.getElementById('signup-part-1');
                const div2 = document.getElementById('signup-part-2');
                div1.classList.add('hidden');
                div2.classList.remove('hidden');
                setTimeout(function () {
                    const overlay = document.getElementById('overlay');
                    overlay.classList.remove('show');
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        div1.classList.remove('hidden');
                        div2.classList.add('hidden');
                    }, 400);
                }, 5000);
            })
            .catch(() => {
                alert('An error occurred. Please try again later.');
            });
    });
});
