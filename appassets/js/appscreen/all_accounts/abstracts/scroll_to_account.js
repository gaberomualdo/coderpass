ipcRenderer.on('menu-show-account', (e, accountID) => {
  console.log(accountID);
  document.querySelector('.tab.all_accounts').scrollTo(0, document.getElementById('accountid_' + accountID).offsetTop - remToPx(4.75));
});
