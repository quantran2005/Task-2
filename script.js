const menu = document.querySelector('.nav-menu');
const menuToggle = document.querySelector('.nav-menu-toggle');

if (menu && menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.carousel-dot')];

if (slides.length && dots.length) {
  let currentSlide = 0;
  let carouselTimer;
  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === currentSlide));
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentSlide;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };
  const restartCarousel = () => {
    window.clearInterval(carouselTimer);
    carouselTimer = window.setInterval(() => showSlide(currentSlide + 1), 6000);
  };

  document.querySelector('.carousel-prev')?.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    restartCarousel();
  });
  document.querySelector('.carousel-next')?.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    restartCarousel();
  });
  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    showSlide(index);
    restartCarousel();
  }));
  restartCarousel();
}

const courseDetails = {
  html: {
    title: 'HTML',
    description: 'HTML stands for HyperText Markup Language. It creates the structure of a web page using headings, paragraphs, images, and links.',
  },
  css: {
    title: 'CSS',
    description: 'CSS stands for Cascading Style Sheets. It controls the appearance of web pages, including colors, fonts, spacing, and layouts.',
  },
  bootstrap: {
    title: 'Bootstrap',
    description: 'Bootstrap is a front-end framework. It provides ready-made components and a responsive grid system to build websites quickly.',
  },
  javascript: {
    title: 'JavaScript',
    description: 'JavaScript is a programming language that makes web pages interactive. It can handle button clicks, form validation, popups, and dynamic content.',
  },
};

const modal = document.querySelector('#course-modal');
if (modal) {
  const modalTitle = document.querySelector('#modal-title');
  const modalDescription = document.querySelector('#modal-description');
  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-course]').forEach((button) => {
    button.addEventListener('click', () => {
      const details = courseDetails[button.dataset.course];
      if (!details || !modalTitle || !modalDescription) return;
      modalTitle.textContent = details.title;
      modalDescription.textContent = details.description;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      modal.querySelector('.modal-x')?.focus();
    });
  });
  modal.querySelector('.modal-x')?.addEventListener('click', closeModal);
  modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
}

const loginForm = document.querySelector('#login-form');
if (loginForm) {
  const emailInput = document.querySelector('#login-email');
  const passwordInput = document.querySelector('#login-password');
  const rememberCheckbox = document.querySelector('#remember-me');
  const loginAlert = document.querySelector('#login-alert');
  const rememberedEmail = localStorage.getItem('management-remembered-email');

  if (rememberedEmail && emailInput && rememberCheckbox) {
    emailInput.value = rememberedEmail;
    rememberCheckbox.checked = true;
  }

  document.querySelector('.show-password')?.addEventListener('click', (event) => {
    if (!(event.currentTarget instanceof HTMLButtonElement) || !(passwordInput instanceof HTMLInputElement)) return;
    const show = passwordInput.type === 'password';
    passwordInput.type = show ? 'text' : 'password';
    event.currentTarget.textContent = show ? 'Hide' : 'Show';
    event.currentTarget.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    event.currentTarget.setAttribute('aria-pressed', String(show));
  });

  document.querySelector('#forgot-password')?.addEventListener('click', (event) => {
    event.preventDefault();
    window.alert('Please contact your administrator to reset your password.');
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!(emailInput instanceof HTMLInputElement) || !(passwordInput instanceof HTMLInputElement) || !(rememberCheckbox instanceof HTMLInputElement) || !(loginAlert instanceof HTMLElement)) return;
    if (rememberCheckbox.checked) localStorage.setItem('management-remembered-email', emailInput.value);
    else localStorage.removeItem('management-remembered-email');
    loginAlert.hidden = false;
    loginAlert.querySelector('.page-alert-ok')?.focus();
  });

  loginAlert?.querySelector('.page-alert-ok')?.addEventListener('click', () => {
    window.location.href = 'home.html';
  });
}

const signupForm = document.querySelector('#signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(signupForm);
    localStorage.setItem('management-account', JSON.stringify({
      name: data.get('name'),
      email: data.get('email'),
    }));
    window.alert('Account created successfully!');
    window.location.href = 'login.html';
  });
}
