// function for refreshing vault database
const refreshVaultDatabase = () => {
  // refresh database
  encryptJSONToFile("vault/data.txt", vaultPassword, vaultContents);
};
