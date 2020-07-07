// search bar functionality
const searchBarInputInputEvent = () => {
  const appContainerElement = document.querySelector('div.tab.all_accounts');
  // element vars

  // search query
  const searchQuery = (event.target || event.srcElement).value;

  if (searchQuery.split(' ').join('').length <= 0) {
    // if search is just whitespace, then go back to all accounts
    appContainerElement.classList.remove('searching');
  } else {
    // add search class to app and only show accounts that match search query
    appContainerElement.classList.add('searching');

    Object.keys(vaultContents.accounts).forEach((accountID) => {
      // element vars
      const accountElement = document.querySelector('div.tab.all_accounts > ul.accounts > div.account#accountid_' + accountID);

      const val = vaultContents.accounts[accountID];
      let isSearchResult = false;

      if (val.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
        isSearchResult = true;
      } else {
        getListOfObjValsRecursively(val.properties).forEach((propObj) => {
          const propName = propObj.key;
          const propVal = propObj.value;
          if (propName.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
            isSearchResult = true;
          } else if (propVal.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
            isSearchResult = true;
          }
        });
      }

      if (isSearchResult) {
        accountElement.classList.add('displayed');
      } else {
        accountElement.classList.remove('displayed');
      }
    });

    if (document.querySelectorAll('div.tab.all_accounts > ul.accounts > div.account.displayed').length <= 0) {
      document.querySelector('div.tab.all_accounts').classList.add('no_results');
    } else {
      document.querySelector('div.tab.all_accounts').classList.remove('no_results');
    }
  }
};

// search bar element
const searchBarInputElement = document.querySelector('div.tab.all_accounts > nav > div.row > input[type=text]');

// map search bar element to input event, and add minor functionality
searchBarInputElement.addEventListener('input', searchBarInputInputEvent);
searchBarInputElement.addEventListener('focus', searchBarInputInputEvent);
searchBarInputElement.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    (event.target || event.srcElement).blur();
  }
});
