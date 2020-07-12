let initialNavPixelsFromTop;
/* add "not_top" class to nav if scrolled */
document.querySelector('div.tab.all_accounts').addEventListener('scroll', () => {
  const scrollPixelsFromTop = document.querySelector('div.tab.all_accounts').scrollTop;
  const navHasNotTopClass = document.querySelector('div.tab.all_accounts > nav').classList.contains('not_top');
  if (scrollPixelsFromTop > 0) {
    if (!navHasNotTopClass) {
      document.querySelector('div.tab.all_accounts > nav').classList.add('not_top');
    }
  } else if (navHasNotTopClass) {
    document.querySelector('div.tab.all_accounts > nav').classList.remove('not_top');
  }
});
window.addEventListener('load', () => {
  document.querySelector('div.tab.all_accounts').dispatchEvent(new Event('scroll'));
});
