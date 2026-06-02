document.addEventListener('DOMContentLoaded', function() {
    setupImageLazyLoad();
});

function setupImageLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const src = image.getAttribute('data-src');
                    if (src) {
                        image.src = src;
                        image.removeAttribute('data-src');
                        image.classList.remove('lazy');
                        image.classList.add('loaded');
                    }
                    observer.unobserve(image);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        lazyImages.forEach(image => {
            const src = image.getAttribute('data-src');
            if (src) {
                image.src = src;
                image.removeAttribute('data-src');
                image.classList.remove('lazy');
                image.classList.add('loaded');
            }
        });
    }
}

function applyLazyLoad() {
    const images = document.querySelectorAll('.gallery-image, .content-image');
    
    images.forEach(img => {
        if (!img.getAttribute('data-src')) {
            const src = img.src;
            img.setAttribute('data-src', src);
            img.src = '';
            img.classList.add('lazy');
        }
    });
    
    setupImageLazyLoad();
}

window.applyLazyLoad = applyLazyLoad;