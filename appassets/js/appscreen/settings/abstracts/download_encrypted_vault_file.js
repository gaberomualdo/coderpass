// download password datafile button
const eventDownloadPasswordDatafileBtn = () => {
  // if not entered vault, don't download
  if (!vaultPassword) {
    alert('Please Create/Enter Vault Before Downloading');
    return;
  }

  downloadPswdDatafileBtnElement.blur();

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
  downloadURI('vault/data.txt', 'encrypted_vault.txt');
};

// map download password datafile button onclick to event function
const downloadPswdDatafileBtnElement = document.querySelector('div.tab.settings ul.main li button.download_encrypted_datafile');
downloadPswdDatafileBtnElement.addEventListener('click', eventDownloadPasswordDatafileBtn);

ipcRenderer.on('menu-download-vault-datafile', () => {
  eventDownloadPasswordDatafileBtn();
});
