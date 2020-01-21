// remove btn on account blocks
const eventRemoveBtn = (accountID, button) => {
    if(confirm("Delete account: \"" + vaultContents.accounts[accountID].name + "\"?")) {
        delete vaultContents.accounts[accountID];
        refreshVaultDatabase();
        refreshAccountBlock(accountID);
    }
    button.blur();
}