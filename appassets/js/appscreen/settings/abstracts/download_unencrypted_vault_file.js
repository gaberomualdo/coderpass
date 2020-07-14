// download password datafile button
const eventDownloadUnencryptedPasswordDatafileBtn = () => {
  // if not entered vault, don't download
  if (!vaultPassword) {
    alert('Please Create/Enter Vault Before Downloading');
    return;
  }
  downloadUnencryptedPswdDatafileBtnElement.blur();

  // download URI function taken from user owencm from https://stackoverflow.com/questions/3916191/download-data-url-file
  const downloadURI = (uri, name) => {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  };

  // download password datafile
  downloadURI('data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(vaultContents, null, '    ')), 'unencrypted_vault.json');
};

// map download password datafile button onclick to event function
const downloadUnencryptedPswdDatafileBtnElement = document.querySelector('div.tab.settings ul.main li button.download_unencrypted_datafile');
downloadUnencryptedPswdDatafileBtnElement.addEventListener('click', eventDownloadUnencryptedPasswordDatafileBtn);

ipcRenderer.on('menu-download-unencrypted-vault-datafile', () => {
  eventDownloadUnencryptedPasswordDatafileBtn();
});
