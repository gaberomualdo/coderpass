// edit btn on account blocks
const eventEditBtn = (accountID) => {
  // toggle "editing" class on account element of given account ID
  const accountElement = document.querySelector('div.tab.all_accounts > ul.accounts > div.account#accountid_' + accountID);
  accountElement.classList.toggle('editing');

  if (accountElement.classList.contains('editing')) {
    const JSONAsString = JSON.stringify(vaultContents.accounts[accountID], null, '    ');
    refreshAceEditor(accountID, JSONAsString);

    //autoResizeTextarea(accountElement.querySelector("section.edit textarea"));
  } else {
    // if not editing, save new value of account JSON from textarea
    const newAccountContentInJSON = aceeditors[accountID].getValue();
    if (isValidJSONString(newAccountContentInJSON)) {
      // new value
      const newAccountContent = JSON.parse(newAccountContentInJSON);

      if (
        newAccountContent.name != undefined &&
        newAccountContent.properties != undefined &&
        typeof newAccountContent.name == 'string' &&
        typeof newAccountContent.properties == 'object'
      ) {
        // save new value in vault
        vaultContents.accounts[accountID] = newAccountContent;

        // refresh database
        refreshVaultDatabase();

        // refresh account block
        refreshAccountBlock(accountID);
      } else {
        // throw error, and revert back to editing
        if (newAccountContent.name == undefined) {
          alert('Include property "name" in JSON');
        } else if (!newAccountContent.properties == undefined) {
          alert('Include property "properties" in JSON');
        } else if (!(typeof newAccountContent.name == 'string')) {
          alert('Property "name" must be of type String');
        } else if (!(typeof newAccountContent.properties == 'object')) {
          alert('Property "properties" must be of type Object');
        }
        accountElement.classList.toggle('editing');
      }
    } else {
      // throw error and revert back to editing
      alert('Invalid JSON');
      accountElement.classList.toggle('editing');
    }
  }
};
