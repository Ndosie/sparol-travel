const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const destinationSelect = document.getElementById('destination-select');
const tripForm = document.getElementById('trip-form');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { threshold: 0.45 });
sections.forEach(section => observer.observe(section));
document.querySelectorAll('.enquiry-link').forEach(link => link.addEventListener('click', () => {
  if (link.dataset.destination) destinationSelect.value = link.dataset.destination;
}));
tripForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(tripForm);
  const name = String(data.get('name') || '').trim();
  const destination = String(data.get('destination') || '').trim();
  const message = String(data.get('message') || '').trim();
  const whatsappNumber = '255798891010';
  const text = `Hello Sparol Travel & Tour!\n\nMy name is ${name}.\nI am interested in: ${destination}.\nMessage: ${message || 'Please share more information and prices.'}`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
});
document.getElementById('year').textContent = new Date().getFullYear();
