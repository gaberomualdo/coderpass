// download password datafile button
const deleteVault = () => {
  // if not entered vault, don't delete
  if (!vaultPassword) {
    alert('Please Create/Enter Vault Before Deleting');
    return;
  }

  if (confirm('Permanently delete this vault?')) {
    writeFile('vault/data.txt', '');
    window.location.reload();
  }
};

// map download password datafile button onclick to event function
const deleteVaultBtnElm = document.querySelector('div.tab.settings ul.main li button.delete_vault');
deleteVaultBtnElm.addEventListener('click', deleteVault);

ipcRenderer.on('menu-delete-vault', () => {
  deleteVault();
});
