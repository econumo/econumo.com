// Screenshots slider
document.addEventListener('DOMContentLoaded', function () {
    const deviceSelector = document.querySelector('.device-selector');
    const devicePreview = document.getElementById('devicePreview');
    const screenshotSelector = document.querySelector('.screenshot-selector');
    let autoSlideInterval;

    // Handle device tab change
    deviceSelector.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            if (e.target.classList.contains('active')) {
                return; // If the clicked tab is already active, do nothing
            }
            const selectedDevice = e.target.getAttribute('data-device');

            // Update active class for devices
            document.querySelector('.device-selector li.active').classList.remove('active');
            e.target.classList.add('active');

            // Hide the current screenshot group
            const currentGroup = document.querySelector('.screenshot-group.active');
            currentGroup.classList.remove('active');

            // Change the device preview size
            devicePreview.className = 'device-preview ' + selectedDevice;

            // Show the new screenshot group after resizing
            setTimeout(() => {
                const newGroup = document.querySelector(`.screenshot-group.screenshot-${selectedDevice}`);
                newGroup.classList.add('active');
                updateScreenshotSelector(selectedDevice);
                showFirstScreenshot();
            }, 500); // Match the transition duration in CSS
        }
    });

    // Handle screenshot change
    screenshotSelector.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            const screenshotIndex = e.target.getAttribute('data-screenshot');
            showScreenshot(screenshotIndex);
            resetAutoSlide();
        }
    });

    function updateScreenshotSelector(device) {
        const screenshotGroup = document.querySelector(`.screenshot-group.screenshot-${device}`);
        const screenshotCount = screenshotGroup.querySelectorAll('img').length;
        const selectorHTML = Array.from({ length: screenshotCount }, (_, i) => 
            `<li ${i === 0 ? 'class="active"' : ''} data-screenshot="${i + 1}"></li>`).join('');
        screenshotSelector.innerHTML = selectorHTML;
    }

    function showFirstScreenshot() {
        const activeGroup = document.querySelector('.screenshot-group.active');
        activeGroup.querySelector('img.active').classList.remove('active');
        activeGroup.querySelector('img:first-child').classList.add('active');
        screenshotSelector.querySelector('li.active').classList.remove('active');
        screenshotSelector.querySelector('li:first-child').classList.add('active');
        resetAutoSlide();
    }

    function showScreenshot(index) {
        const activeGroup = document.querySelector('.screenshot-group.active');
        activeGroup.querySelector('img.active').classList.remove('active');
        activeGroup.querySelector(`img:nth-child(${index})`).classList.add('active');
        screenshotSelector.querySelector('li.active').classList.remove('active');
        screenshotSelector.querySelector(`li[data-screenshot="${index}"]`).classList.add('active');
    }

    function autoSlide() {
        const activeGroup = document.querySelector('.screenshot-group.active');
        let currentIndex = Array.from(activeGroup.querySelectorAll('img')).findIndex(img => img.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % activeGroup.querySelectorAll('img').length + 1;
        showScreenshot(nextIndex);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 5000);
    }

    updateScreenshotSelector('desktop');
    resetAutoSlide();
});