let initialNavPixelsFromTop;
/* add "not_top" class to nav if scrolled */
document.querySelector('div.tab.all_accounts').addEventListener('scroll', () => {
  const scrollPixelsFromTop = window.pageYOffset;
  const navHasNotTopClass = document.querySelector('div.tab.all_accounts > nav').classList.contains('not_top');
  if (scrollPixelsFromTop > initialNavPixelsFromTop) {
    if (!navHasNotTopClass) {
      document.querySelector('div.tab.all_accounts > nav').classList.add('not_top');
    }
  } else if (navHasNotTopClass) {
    document.querySelector('div.tab.all_accounts > nav').classList.remove('not_top');
  }
});
window.addEventListener('', () => {
  initialNavPixelsFromTop = document.querySelector('nav').getBoundingClientRect().top;
  document.querySelector('div.tab.all_accounts').dispatchEvent(new Event('scroll'));
});
