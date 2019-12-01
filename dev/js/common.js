document.addEventListener('DOMContentLoaded', function(){
  animateElements();
});

function animateElements() {
  const elementObserver = new IntersectionObserver((entries, elObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        elObserver.unobserve(entry.target);
      }
    })
  });
  let arr = document.querySelectorAll('.greeting__title, .greeting__item, .lightpaper__title, .lightpaper__text, .lightpaper__button-wrapper, .lightpaper__book, .search__title');
  arr.forEach((v) => {
      elementObserver.observe(v);
  })
}