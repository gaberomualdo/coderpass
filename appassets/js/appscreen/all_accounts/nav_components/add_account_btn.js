// add account btn
const eventAddAccountBtn = () => {
  addAccountBtnElement.blur();

  // scroll to top
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  // when button is clicked, add semi-empty account
  const newAccountID = addAccountToDatabase({
    name: 'Account Name',
    properties: {
      Username: 'undefined',
      Password: 'undefined',
    },
  });

  // refresh database
  refreshVaultDatabase();

  // add block
  addAccountBlock(newAccountID);

  // edit added block
  eventEditBtn(newAccountID);
};

// map add account button onclick to event function
const addAccountBtnElement = document.querySelector('div.tab.all_accounts > nav > div.row > button.add_account');
addAccountBtnElement.addEventListener('click', eventAddAccountBtn);

ipcRenderer.on('menu-add-account', () => {
  openTab(0);
  eventAddAccountBtn();
});
