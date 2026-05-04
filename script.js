const navToggle = document.querySelector('.nav-toggle');
const drawer = document.getElementById('mobile-drawer');
const backdrop = document.getElementById('drawer-backdrop');
const drawerClose = document.querySelector('.drawer-close');
const drawerLinks = document.querySelectorAll('.mobile-nav a');

function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');
  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  backdrop.hidden = true;
  document.body.style.overflow = '';
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });
}

if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
if (backdrop) backdrop.addEventListener('click', closeDrawer);
drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDrawer();
});

const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const prevButton = document.querySelector('.arrow.prev');
const nextButton = document.querySelector('.arrow.next');
const slider = document.getElementById('hero-slides');

let currentSlide = 0;
let startX = 0;
let startY = 0;
let deltaX = 0;
let deltaY = 0;
let isTouchDragging = false;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove('active'));
  dots.forEach((dot) => dot.classList.remove('active'));

  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

if (nextButton) nextButton.addEventListener('click', nextSlide);
if (prevButton) prevButton.addEventListener('click', prevSlide);

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const index = Number(dot.dataset.slide);
    showSlide(index);
  });
});

if (slider) {
  slider.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    deltaX = 0;
    deltaY = 0;
    isTouchDragging = true;
  }, { passive: true });

  slider.addEventListener('touchmove', (event) => {
    if (!isTouchDragging) return;
    const touch = event.touches[0];
    deltaX = touch.clientX - startX;
    deltaY = touch.clientY - startY;
  }, { passive: true });

  slider.addEventListener('touchend', (event) => {
    if (!isTouchDragging) return;
    const touch = event.changedTouches[0];
    if (deltaX === 0 && deltaY === 0) {
      deltaX = touch.clientX - startX;
      deltaY = touch.clientY - startY;
    }
    isTouchDragging = false;

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    if (!isHorizontalSwipe || Math.abs(deltaX) < 42) return;

    if (deltaX < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }, { passive: true });

  slider.addEventListener('touchcancel', () => {
    isTouchDragging = false;
  }, { passive: true });
}

showSlide(0);
