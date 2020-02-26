let vaultContents;
let vaultPassword;

// function when all accounts tab is opened
const allAccounts__openTab = () => {
    // loop through each account and display
    Object.keys(vaultContents.accounts).forEach((accountID) => {
        // add current account block
        addAccountBlock(accountID);
    });
};