document.addEventListener('DOMContentLoaded', function () {
    const deviceSelector = document.querySelector('.device-selector');
    const devicePreview = document.getElementById('devicePreview');
    const screenshotSelector = document.querySelector('.screenshot-selector');
    const screenshotGroups = document.querySelectorAll('.screenshot-group');
    let autoSlideInterval;

    function getDeviceType() {
        const width = window.innerWidth;
        if (width <= 768) {
            return 'mobile';
        } else if (width <= 1024) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    function setActiveScreenshotGroup(deviceType) {
        document.querySelectorAll('.device-selector-item').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-device') === deviceType);
        });

        screenshotGroups.forEach(group => {
            group.classList.toggle('active', group.classList.contains(`screenshot-${deviceType}`));
            // group.querySelectorAll('img').forEach(img => {
            //     img.addEventListener('click', function () {
            //         if (img.requestFullscreen) {
            //             img.requestFullscreen();
            //         } else if (img.mozRequestFullScreen) { // Firefox
            //             img.mozRequestFullScreen();
            //         } else if (img.webkitRequestFullscreen) { // Chrome, Safari and Opera
            //             img.webkitRequestFullscreen();
            //         } else if (img.msRequestFullscreen) { // IE/Edge
            //             img.msRequestFullscreen();
            //         }
            //     });
            // });
        });

        document.querySelectorAll('.screenshot-selector-item').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-device') === deviceType);
        });

        devicePreview.className = `device-preview ${deviceType}`;

        document.querySelector('.screenshot-selector li').remove();
        screenshotGroups.forEach(group => {
            if (!group.classList.contains(`screenshot-${deviceType}`)) {
                return;
            }
            const screenshotCount = group.querySelectorAll('img').length;
            const selectorHTML = Array.from({ length: screenshotCount }, (_, i) =>
                `<li ${i === 0 ? 'class="active"' : ''} data-screenshot="${i + 1}"></li>`).join('');
            screenshotSelector.innerHTML = selectorHTML;
        });
        resetAutoSlide();
    }

    deviceSelector.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            if (e.target.classList.contains('active')) {
                return;
            }
            const selectedDevice = e.target.getAttribute('data-device');
            setActiveScreenshotGroup(selectedDevice);
        }
    });

    screenshotSelector.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            const screenshotIndex = e.target.getAttribute('data-screenshot');
            showScreenshot(screenshotIndex);
            resetAutoSlide();
        }
    });

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

    const deviceType = getDeviceType();
    setActiveScreenshotGroup(deviceType);
    resetAutoSlide();
});