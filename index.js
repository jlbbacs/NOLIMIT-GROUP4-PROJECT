const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
   if (window.scrollY >= 100) {
      nav.classList.add('active-nav');
   } else {
      nav.classList.remove('active-nav');
   }
})


