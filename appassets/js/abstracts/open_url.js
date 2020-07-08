const openURL = (btn) => {
  const url = btn.getAttribute('data-url');
  if (url) {
    shell.openExternal(url);
  }
};
