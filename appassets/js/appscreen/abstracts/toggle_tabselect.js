document.querySelector('body div.topbar_draggable > button.toggle_tabselect').addEventListener('click', () => {
  document.querySelector('div.app').classList.toggle('tab_select_not_shown');
  document.querySelector('div.topbar_draggable > button.toggle_tabselect').classList.toggle('tab_select_not_shown');
});
