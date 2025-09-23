/* Your JS here. */

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const nav = document.querySelector(".navbar");
  const navBottomY = (nav.getBoundingClientRect().bottom + window.scrollY);

  const sections = document.querySelectorAll("section");
  sections.forEach((sec, i) => {
    const topY = sec.getBoundingClientRect().top + window.scrollY;
    const bottomY = topY + sec.offsetHeight;
    const link = document.querySelector(`.navbar a[href="#${sec.id}"]`);
    if (!link) return;
    if (navBottomY >= topY + 1 && navBottomY < bottomY - 1) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if ((window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 1)) {
    const allLinks = Array.from(document.querySelectorAll(".navbar a"));
    allLinks.forEach((l, idx) => l.classList.toggle("active", idx === allLinks.length - 1));
  }
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.classList.add("shrink");
  } else {
    nav.classList.remove("shrink");
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = carousel.querySelector('.slides');
  const imgs = slides.querySelectorAll('img');
  const prev = carousel.querySelector('.btn.prev');
  const next = carousel.querySelector('.btn.next');
  let idx = 0;

  imgs.forEach(img => {
    img.style.flex = '0 0 100%';
  });

  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    slides.style.transform = `translateX(-${idx * 100}%)`;
  }

  prev.addEventListener('click', () => show(idx - 1));
  next.addEventListener('click', () => show(idx + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  show(0);
});
