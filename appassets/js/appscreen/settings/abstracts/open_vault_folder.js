// download password datafile button
const eventOpenEncryptedVaultBtn = () => {
  writeFile('replaced-vaults/.placeholder_file', '');
  shell.openItem(getPathOfAppDataFile('replaced-vaults/'));
};

// map download password datafile button onclick to event function
const openEncryptedVaultBtnElement = document.querySelector('div.tab.settings ul.main li button.open_encrypted_vault_folder');
openEncryptedVaultBtnElement.addEventListener('click', eventOpenEncryptedVaultBtn);

ipcRenderer.on('menu-open-encrypted-vault-folder', () => {
  eventOpenEncryptedVaultBtn();
});
