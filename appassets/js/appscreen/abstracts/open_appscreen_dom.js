// function when app is opened
const openAppScreen = (passedVaultPassword) => {
    // display app screen and hide auth screen
    document.querySelector("body > div.container > div.auth").style.display = "none";
    document.querySelector("body > div.container > div.app").style.display = "block";

    // put vault password into global variable
    vaultPassword = passedVaultPassword;

    // get vault contents and put in variable
    vaultContents = decryptJSONInFile("vault/data.txt", vaultPassword);

    // open all accounts (default) tab
    //allAccounts__openTab();
};
openAppScreen("test");