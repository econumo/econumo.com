document.getElementById('send-mail').addEventListener('click', function (e) {
    e.preventDefault();

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    let $form = $("#waiting-list-form");
    if (!validateEmail($form.find('input[name=email]').val())) {
        $form.find('.msg-error').css('visibility', 'visible');
        return;
    } else {
        $form.find('.msg-error').attr('visibility', 'hidden');
    }

    $.post($form.attr('action'), $form.serialize())
        .done(function () {
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
        .fail(function () {
            alert('An error occurred. Please try again later.');
        });
});