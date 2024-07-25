document.querySelector('.lang-select-wrapper').addEventListener('click', function() {
    this.querySelector('.lang-select').classList.toggle('open');
});

// for (const option of document.querySelectorAll(".lang-option")) {
//     option.addEventListener('click', function() {
//         if (!this.classList.contains('selected')) {
//             this.parentNode.querySelector('.lang-option.selected')?.classList.remove('selected');
//             this.classList.add('selected');
//             this.closest('.lang-select').querySelector('.lang-select-trigger').textContent = this.textContent;
//             document.getElementById("page-lang").value = this.getAttribute('data-value');
//         }
//     })
// }

window.addEventListener('click', function(e) {
    const select = document.querySelector('.lang-select');
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});