document.addEventListener('DOMContentLoaded', function() {
    setupImageLazyLoad();
    
    setTimeout(() => {
        preloadVisibleImages();
    }, 300);
    
    window.addEventListener('scroll', debounce(function() {
        preloadVisibleImages();
    }, 100));
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function setupImageLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const src = image.getAttribute('data-src');
                    if (src) {
                        loadImage(image, src);
                    }
                    observer.unobserve(image);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        lazyImages.forEach(image => {
            const src = image.getAttribute('data-src');
            if (src) {
                loadImage(image, src);
            }
        });
    }
}

function loadImage(img, src) {
    const imgPlaceholder = document.createElement('div');
    imgPlaceholder.className = 'img-placeholder';
    imgPlaceholder.style.width = img.offsetWidth + 'px';
    imgPlaceholder.style.height = img.offsetHeight + 'px';
    img.parentNode.insertBefore(imgPlaceholder, img);
    
    const tempImg = new Image();
    tempImg.onload = function() {
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.remove('lazy');
        img.classList.add('loaded');
        
        setTimeout(() => {
            if (imgPlaceholder.parentNode) {
                imgPlaceholder.parentNode.removeChild(imgPlaceholder);
            }
        }, 300);
    };
    
    tempImg.onerror = function() {
        img.classList.add('lazy-error');
        if (imgPlaceholder.parentNode) {
            imgPlaceholder.parentNode.removeChild(imgPlaceholder);
        }
    };
    
    tempImg.src = src;
}

function applyLazyLoad() {
    const images = document.querySelectorAll('.gallery-image, .content-image, img[src*="assets/images"]');
    
    images.forEach(img => {
        if (!img.getAttribute('data-src') && img.src) {
            const src = img.src;
            img.setAttribute('data-src', src);
            img.src = '';
            img.classList.add('lazy');
        }
    });
    
    setupImageLazyLoad();
}

function preloadVisibleImages() {
    const visibleImages = document.querySelectorAll('img[data-src]:not(.loaded)');
    const windowHeight = window.innerHeight;
    
    visibleImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < windowHeight + 100 && rect.bottom > -100) {
            const src = img.getAttribute('data-src');
            if (src) {
                loadImage(img, src);
            }
        }
    });
}

window.applyLazyLoad = applyLazyLoad;
window.preloadVisibleImages = preloadVisibleImages;