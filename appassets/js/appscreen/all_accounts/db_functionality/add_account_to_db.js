// add account to database
const addAccountToDatabase = (obj) => {
  // generate random ID that is not taken yet
  let randomAccountID;
  do {
    randomAccountID = generateRandomID();
  } while (vaultContents.accounts[randomAccountID]);

  // add obj to generated random ID
  vaultContents.accounts[randomAccountID] = obj;

  // return ID of pushed obj
  return randomAccountID;
};
