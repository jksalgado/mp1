    document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar');
    const links = Array.from(document.querySelectorAll('.navbar a'));
    const targets = links.map(l => {
        const id = (l.getAttribute('href') || '').replace('#', '') || l.dataset.target;
        return id ? document.getElementById(id) : null;
    });

    function handleShrink() {
        if (!nav) return;
        if (window.scrollY > 50) nav.classList.add('shrink');
        else nav.classList.remove('shrink');
    }

    function highlightMostVisibleSection() {
        if (links.length === 0) return;

        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        let bestIndex = -1;
        let bestRatio = 0;

        for (let i = 0; i < targets.length; i++) {
        const el = targets[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = rect.bottom + window.scrollY;
        const height = bottom - top;
        if (height <= 0) continue;

        const overlap = Math.max(0, Math.min(bottom, viewportBottom) - Math.max(top, viewportTop));
        const ratio = overlap / height;

        if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = i;
        }
        }

        if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 1)) {
        bestIndex = links.length - 1;
        }

        if (bestIndex === -1) bestIndex = 0; // fallback

        links.forEach((l, i) => l.classList.toggle('active', i === bestIndex));
    }

    let ticking = false;
    function onScrollOrResize() {
        if (!ticking) {
        window.requestAnimationFrame(() => {
            handleShrink();
            highlightMostVisibleSection();
            ticking = false;
        });
        ticking = true;
        }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('load', onScrollOrResize);
    onScrollOrResize();

    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const slidesTrack = carousel.querySelector('.slides');
        const slideEls = Array.from(carousel.querySelectorAll('.slide'));
        const prevBtn = carousel.querySelector('.btn.prev');
        const nextBtn = carousel.querySelector('.btn.next');
        let idx = 0;

        slideEls.forEach(el => el.style.flex = '0 0 100%');

        function show(i) {
        idx = (i + slideEls.length) % slideEls.length;
        slidesTrack.style.transform = `translateX(-${idx * 100}%)`;
        }

        prevBtn?.addEventListener('click', () => show(idx - 1));
        nextBtn?.addEventListener('click', () => show(idx + 1));

        document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') show(idx - 1);
        if (e.key === 'ArrowRight') show(idx + 1);
        });

        window.addEventListener('resize', () => show(idx));
        show(0);
    }
});
