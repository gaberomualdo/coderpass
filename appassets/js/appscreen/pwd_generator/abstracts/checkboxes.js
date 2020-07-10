(() => {
  const checkboxes = Array.from(document.querySelectorAll('div.tab.pwd_generator .main .checkboxes li div.checkbox'));
  const checkboxLabels = Array.from(document.querySelectorAll('div.tab.pwd_generator .main .checkboxes li div.checkbox + span'));

  checkboxes.concat(checkboxLabels).forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelector('.checkbox').classList.toggle('checked');
    });
  });
})();
