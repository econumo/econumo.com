document.getElementById('send-mail').addEventListener('click', function (e) {
    e.preventDefault();

    let $form = $("#waiting-list-form");
    $.post($form.attr('action'), $form.serialize())
        .done(function () {
            const div1 = document.getElementById('signup-part-1');
            const div2 = document.getElementById('signup-part-2');
            div1.classList.add('hidden');
            div2.classList.remove('hidden');
        })
        .fail(function () {
            alert('An error occurred. Please try again later.');
        });
});