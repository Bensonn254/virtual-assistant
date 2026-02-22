
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


const toggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

function openMenu() {
  navLinks.classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent scroll behind overlay
  const spans = toggle.querySelectorAll('span');
  spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
  spans[1].style.opacity   = '0';
  spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
}

function closeMenu() {
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
  const spans = toggle.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity   = '1';
  spans[2].style.transform = '';
}

toggle.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

// close on any link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

// close on backdrop click (clicking outside links)
navLinks.addEventListener('click', (e) => {
  if (e.target === navLinks) closeMenu();
});


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Send data to Web3Forms
    const formData = new FormData(form);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      if (response.status == 200) {
        form.reset();
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 5000);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    })
    .finally(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    });
  });
}


const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


const yearEl = document.getElementById('currentYear');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
