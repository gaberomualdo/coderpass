(() => {
  const exitVault = () => {
    window.location.reload();
  };
  document.querySelector('.tab_select > .exit_vault_container > button').addEventListener('click', exitVault);
  ipcRenderer.on('menu-exit-vault', () => {
    exitVault();
  });
})();
