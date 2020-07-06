// in auth screen, decide whether to show "Create Vault" form or "Enter Vault" form;
// use IIFE to prevent creation of global variables
(() => {
  // variable for contents of vault file
  const vaultEncryptedText = readFile("vault/data.txt");

  // if vault file is empty, show form to create vault; else, show form to enter existing vault
  if (vaultEncryptedText.length > 0) {
    document.querySelector(
      "body > div.container > div.auth > div.form.create_vault"
    ).style.display = "none";
  } else {
    document.querySelector(
      "body > div.container > div.auth > div.form.enter_vault"
    ).style.display = "none";
  }
})();
