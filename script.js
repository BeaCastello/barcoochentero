// Slider

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  const offset = index * -100;
  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentIndex = index;
}

function currentSlide(index) {
  showSlide(index);
}

// Auto-slide (optional)
setInterval(() => {
  let next = (currentIndex + 1) % slides.length;
  showSlide(next);
}, 6000);

