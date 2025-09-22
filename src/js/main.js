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
  const carousel = document.getElementById('simpleCarousel');
  if (!carousel) return;
  const track = carousel.querySelector('.track');
  const slides = carousel.querySelectorAll('.slide');
  const prev = carousel.querySelector('.car-btn.prev');
  const next = carousel.querySelector('.car-btn.next');
  let idx = 0;

  function show(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-100 * idx}%)`;
  }

  prev.addEventListener('click', () => show(idx - 1));
  next.addEventListener('click', () => show(idx + 1));

  // keep layout correct on resize (optional)
  window.addEventListener('resize', () => show(idx));
  show(0);
});
