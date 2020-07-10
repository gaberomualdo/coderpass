(() => {
  const checkboxes = document.querySelectorAll('div.tab.pwd_generator .main .checkboxes li div.checkbox');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      checkbox.classList.toggle('checked');
    });
  });
})();
