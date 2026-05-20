// PRELOADER
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => { preloader.classList.add('hidden'); }, 1500);
    setTimeout(() => { preloader.remove(); }, 2200);
  }
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const s = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('open')) {
      s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      s[1].style.opacity = '0';
      s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      s[0].style.transform = ''; s[1].style.opacity = '1'; s[2].style.transform = '';
    }
  });
  document.querySelectorAll('.nav-menu a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    });
  });
}

// NAV SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(5,5,5,.97)';
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,.5)';
  } else {
    nav.style.background = 'rgba(5,5,5,.9)';
    nav.style.boxShadow = 'none';
  }
});

// REVEAL
const revealEls = document.querySelectorAll('.reveal');
const doReveal = () => {
  const wh = window.innerHeight;
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < wh - 60) el.classList.add('active');
  });
};
window.addEventListener('scroll', doReveal);
window.addEventListener('load', doReveal);

// DATA-ANIMATE OBSERVER
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => entry.target.classList.add('is-visible'), Number(delay));
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('[data-animate]').forEach(el => animateObserver.observe(el));

// BOOKING -> WHATSAPP
function handleBooking(e) {
  e.preventDefault();
  const f = id => document.getElementById(id).value;
  const msg = `🚗 *NEW BOOKING — NEXUS AUTO SHIELD*\n━━━━━━━━━━━━━━\n👤 *Name:* ${f('fname')}\n📞 *Phone:* ${f('fphone')}\n🚘 *Vehicle:* ${f('fcar')}\n🔧 *Service:* ${f('fservice')}\n📅 *Date:* ${f('fdate')}\n🕐 *Time:* ${f('ftime')}\n📝 *Notes:* ${f('fnotes') || 'None'}\n━━━━━━━━━━━━━━`;
  window.open('https://wa.me/919114919919?text=' + encodeURIComponent(msg), '_blank');
}

// MIN DATE
const dateIn = document.getElementById('fdate');
if (dateIn) dateIn.setAttribute('min', new Date().toISOString().split('T')[0]);

// COUNTER ANIMATION
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.textContent.replace(/\d+/, '');
    let cur = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = cur + '+';
    }, 30);
  });
}
const statsEl = document.querySelector('.stats');
let countersDone = false;
if (statsEl) {
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !countersDone) { countersDone = true; animateCounters(); }
    });
  }, { threshold: 0.3 }).observe(statsEl);
}

// TESTIMONIALS DRAG-TO-SCROLL
const trackWrapper = document.querySelector('.testimonials-track-wrapper');
if (trackWrapper) {
  let isDown = false, startX, scrollLeft;
  trackWrapper.addEventListener('mousedown', e => {
    isDown = true;
    trackWrapper.style.cursor = 'grabbing';
    startX = e.pageX - trackWrapper.offsetLeft;
    scrollLeft = trackWrapper.scrollLeft;
  });
  trackWrapper.addEventListener('mouseleave', () => { isDown = false; trackWrapper.style.cursor = 'grab'; });
  trackWrapper.addEventListener('mouseup', () => { isDown = false; trackWrapper.style.cursor = 'grab'; });
  trackWrapper.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trackWrapper.offsetLeft;
    trackWrapper.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
}

// FLOATING BUTTON HOVER
document.querySelectorAll('.insta-float, .whatsapp-float').forEach(btn => {
  btn.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.12)'; });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'scale(1)'; });
});
