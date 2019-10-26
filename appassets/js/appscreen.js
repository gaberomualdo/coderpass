let vaultContents;
let vaultPassword;

// function for getting the HTML for the block of a given account object
const getHTMLOfAccountBlock = (accountID) => {
    // account obj
    const accountObj = vaultContents.accounts[accountID];

    // create properties HTML
    let propertiesHTML = "";
    Object.keys(accountObj.properties).forEach((propertyName) => {
        const propertyValue = accountObj.properties[propertyName];
        propertiesHTML += "<li><p class='name'>" + propertyName + "</p><p class='value'>" + propertyValue + "</p></li>";
    });

    // return HTML
    return `
    <div class="account" id="accountid_${accountID}">
        <div class="buttons">
            <button class="remove" onclick="eventRemoveBtn('${accountID}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
            </button>
            <button class="edit" onclick="eventEditBtn('${accountID}')">
                <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/></svg>
                <svg class="done_editing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            </button>
        </div>
        <section class="display">
            <h1 class="account_name">${accountObj.name}</h1>
            <ul class="account_properties">
                ${propertiesHTML}
            </ul>
        </section>
        <section class="edit">
            <textarea></textarea>
        </section>
    </div>
    `;
};

// function for refreshing a given account block
const refreshAccountBlock = (accountID) => {
    // variable for account HTML element
    const accountElement = document.querySelector("body > div.container > div.app > ul.accounts > div.account#accountid_" + accountID);

    // refresh HTML of account element
    if(vaultContents.accounts[accountID]) {
        accountElement.outerHTML = getHTMLOfAccountBlock(accountID);
    }else {
        accountElement.outerHTML = "";
    }
}

// function for adding a given account block
const addAccountBlock = (accountID) => {
    // variable for accounts list HTML element
    const accountsListElement = document.querySelector("body > div.container > div.app > ul.accounts");

    // add HTML of account block to accounts list element HTML
    accountsListElement.innerHTML = getHTMLOfAccountBlock(accountID) + accountsListElement.innerHTML;
};

// add account to database
const addAccountToDatabase = (obj) => {
    // generate random ID that is not taken yet
    let randomAccountID;
    do {
        randomAccountID = generateRandomID(32);
    } while(vaultContents.accounts[randomAccountID]);

    // add obj to generated random ID
    vaultContents.accounts[randomAccountID] = obj;

    // return ID of pushed obj
    return randomAccountID;
}

// function for refreshing vault database
const refreshVaultDatabase = () => {
    // refresh database
    encryptJSONToFile("vault/data.txt", vaultPassword, vaultContents);
};

// function when app is opened
const openAppScreen = (passedVaultPassword) => {
    // display app screen and hide auth screen
    document.querySelector("body > div.container > div.auth").style.display = "none";
    document.querySelector("body > div.container > div.app").style.display = "block";

    // put vault password into global variable
    vaultPassword = passedVaultPassword;

    // get vault contents and put in variable
    vaultContents = decryptJSONInFile("vault/data.txt", vaultPassword);

    // loop through each account and display
    Object.keys(vaultContents.accounts).forEach((accountID) => {
        // add current account block
        addAccountBlock(accountID);
    });
};

// btn events

// edit btn on account blocks
const eventEditBtn = (accountID) => {
    // toggle "editing" class on account element of given account ID
    const accountElement = document.querySelector("body > div.container > div.app > ul.accounts > div.account#accountid_" + accountID);
    accountElement.classList.toggle("editing");

    if(accountElement.classList.contains("editing")) {
        // if editing, make sure textarea has correct contents
        accountElement.querySelector("section.edit textarea").value = JSON.stringify(vaultContents.accounts[accountID], null, 4);
    }else {
        // if not editing, save new value of account JSON from textarea
        const newAccountContentInJSON = accountElement.querySelector("section.edit textarea").value;
        if(isValidJSONString(newAccountContentInJSON)) {
            // save new value in vault
            vaultContents.accounts[accountID] = JSON.parse(newAccountContentInJSON);

            // refresh database
            refreshVaultDatabase();
            
            // refresh account block
            refreshAccountBlock(accountID);
        }else {
            // throw error and revert back to editing
            alert("Invalid JSON");
            accountElement.classList.toggle("editing");
        }
    }
}

// remove btn on account blocks
const eventRemoveBtn = (accountID) => {
    if(confirm("Delete account: \"" + vaultContents.accounts[accountID].name + "\"?")) {
        delete vaultContents.accounts[accountID];
        refreshVaultDatabase();
        refreshAccountBlock(accountID);
    }
}

// add account btn
const eventAddAccountBtn = () => {
    // when button is clicked, add semi-empty account
    const newAccountID = addAccountToDatabase({
        name: "Account Name",
        properties: {
            "Username": "undefined",
            "Password": "undefined"
        }
    });

    // refresh database
    refreshVaultDatabase();

    // add block
    addAccountBlock(newAccountID);

    // edit added block
    eventEditBtn(newAccountID);
}

// download password datafile button
const eventDownloadPasswordDatafileBtn = () => {
    // download URI function taken from user owencm from https://stackoverflow.com/questions/3916191/download-data-url-file
    const downloadURI = (uri, name) => {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    }

    // download password datafile
    downloadURI("vault/data.txt", "password_datafile.txt");
}
// map add account button onclick to event function
document.querySelector("body > div.container > div.app > nav:first-child > div.row:nth-child(2) > button.add_account").addEventListener("click", eventAddAccountBtn);

// map download password datafile button onclick to event function
document.querySelector("body > div.container > div.app > nav:first-child > div.row:nth-child(2) > button.download_datafile").addEventListener("click", eventDownloadPasswordDatafileBtn);