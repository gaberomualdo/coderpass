ipcRenderer.on('window-focus-change', (e, windowFocused) => {
  if (windowFocused) {
    document.body.classList.add('window_focused');
  } else {
    document.body.classList.remove('window_focused');
  }
});

window.addEventListener('load', () => {
  ipcRenderer.send('update-window-focus', '');
});
