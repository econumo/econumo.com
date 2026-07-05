// Ported from hugo-book theme inline scripts:
// sidebar scroll position persistence + click-to-copy for code blocks.
(function () {
    const menu = document.querySelector('aside .book-menu-content');
    if (menu) {
        addEventListener('beforeunload', function () {
            localStorage.setItem('menu.scrollTop', menu.scrollTop);
        });
        menu.scrollTop = localStorage.getItem('menu.scrollTop');
    }

    function select(element) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    document.querySelectorAll('pre code').forEach((code) => {
        code.addEventListener('click', function () {
            if (window.getSelection().toString()) {
                return;
            }
            select(code.parentElement);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code.parentElement.textContent);
            }
        });
    });
})();
