(() => {
  const exitVault = () => {
    window.location.reload();
  };
  document.querySelector('.exit_vault_container button.exit_vault').addEventListener('click', exitVault);
  ipcRenderer.on('menu-exit-vault', () => {
    exitVault();
  });
})();
