// Docs sidebar search — replaces hugo-book's flexsearch integration with a
// small dependency-free lookup over /search-data.json.
(function () {
    const input = document.getElementById('book-search-input');
    const results = document.getElementById('book-search-results');
    if (!input || !results) {
        return;
    }

    const spinner = document.querySelector('.book-search-spinner');
    let pages = null;
    let loading = false;

    input.addEventListener('focus', init);
    input.addEventListener('input', search);

    // Same hotkeys as hugo-book (data-hotkeys="s/")
    document.addEventListener('keydown', (event) => {
        const active = document.activeElement;
        const typing = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
        if (!typing && (event.key === 's' || event.key === '/')) {
            event.preventDefault();
            input.focus();
        }
    });

    function init() {
        if (pages || loading) {
            return;
        }
        loading = true;
        if (spinner) spinner.classList.remove('hidden');
        fetch('/search-data.json')
            .then((response) => response.json())
            .then((data) => {
                pages = data.map((page) => ({
                    ...page,
                    titleLower: page.title.toLowerCase(),
                    contentLower: page.content.toLowerCase(),
                }));
                search();
            })
            .finally(() => {
                loading = false;
                if (spinner) spinner.classList.add('hidden');
            });
    }

    function search() {
        results.replaceChildren();
        const query = input.value.trim().toLowerCase();
        if (!query || !pages) {
            return;
        }

        const terms = query.split(/\s+/);
        const scored = [];
        for (const page of pages) {
            let score = 0;
            for (const term of terms) {
                if (page.titleLower.includes(term)) {
                    score += 10;
                } else if (page.contentLower.includes(term)) {
                    score += 1;
                } else {
                    score = 0;
                    break;
                }
            }
            if (score > 0) {
                scored.push({ page, score });
            }
        }
        scored.sort((a, b) => b.score - a.score);

        for (const { page } of scored.slice(0, 10)) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = page.href;
            a.textContent = page.title;
            const small = document.createElement('small');
            small.textContent = page.section;
            li.appendChild(a);
            li.appendChild(small);
            results.appendChild(li);
        }
    }
})();
