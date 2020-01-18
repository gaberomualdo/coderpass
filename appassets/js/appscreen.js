let vaultContents;
let vaultPassword;

// ACE object of editors
const aceeditors = {};

// function for getting properties HTML for a given properties object
const getHTMLOfPropertiesSection = (properties) => {
    let propertiesHTML = "";

    const addPropertyToPropertiesHTML = (propertyName, propertyValue) => {
        propertiesHTML += "<li><p class='name'>" + propertyName + ":</p><p class='value default_style_code'><span class='password'>" + propertyValue + "</span><span class='hidden'>" + "&bull;".repeat(propertyValue.length) +  "</span></p><button class='copy_property_btn' onclick='eventCopyPropertyValueBtn(this);' aria-label='Copied!' data-balloon-pos='right'>" + copyClipboardSVG + "</button></li>";
    }

    let copyClipboardSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 2h-19v19h-2v-21h21v2zm3 2v20h-20v-20h20zm-2 2h-1.93c-.669 0-1.293.334-1.664.891l-1.406 2.109h-6l-1.406-2.109c-.371-.557-.995-.891-1.664-.891h-1.93v16h16v-16zm-3 6h-10v1h10v-1zm0 3h-10v1h10v-1zm0 3h-10v1h10v-1z"/></svg>';
    Object.keys(properties).forEach((propertyName) => {
        const propertyValue = properties[propertyName];
        if(typeof propertyValue == "object") {
            propertiesHTML += "<li class='subobj_label' onclick='this.classList.toggle(\"open\"); this.nextSibling.classList.toggle(\"open\");'><p class='name'>" + propertyName + ":</p></li>";
            propertiesHTML += "<ul>";
            propertiesHTML += getHTMLOfPropertiesSection(propertyValue);
            propertiesHTML += "</ul>";
        }else {
            addPropertyToPropertiesHTML(propertyName, propertyValue);
        }
    });

    return propertiesHTML;
}

// function for getting the HTML for the block of a given account object
const getHTMLOfAccountBlock = (accountID, justDisplayHTML) => {
    // account obj
    const accountObj = vaultContents.accounts[accountID];

    // display HTML
    const displayHTML = `
    <section class="display">
        <h1 class="account_name open" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open');">${accountObj.name}</h1>
        <ul class="account_properties open">
            ${getHTMLOfPropertiesSection(accountObj.properties)}
        </ul>
    </section>
    `;

    // if just display HTML, return just display HTML
    if(justDisplayHTML) {
        return displayHTML;
    }

    // return HTML
    return `
    <div class="account" id="accountid_${accountID}">
        <div class="buttons">
            <button class="edit default_style_button with_icon" onclick="eventEditBtn('${accountID}')">
                <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/></svg>
                <svg class="done_editing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            </button>
            <button class="remove default_style_button with_hover with_icon" onclick="eventRemoveBtn('${accountID}', this)" aria-label="Delete Account" data-balloon-pos="down">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
            </button>
        </div>
        ${displayHTML}
        <section class="edit">
            <div class="editor_container">
                <div class="editor" id='aceeditor__${accountID}'></div>
            </div>
        </section>
    </div>
    `;
};

// function for refreshing Ace Editor
const refreshAceEditor = (accountID, value) => {
    // set value of editor to given value
    const editorElement = document.getElementById("aceeditor__" + accountID);
    if(editorElement.classList.contains("ace_editor")) {
        aceeditors[accountID].setValue(value, -1);
        aceeditors[accountID].setValue(value, 1);
    }else {
        // set value of editor to given value (passed as argument)
        editorElement.innerHTML = value;

        // initialize ace editor within that element
        aceeditors[accountID] = ace.edit("aceeditor__" + accountID);
        aceeditors[accountID].setTheme("ace/theme/chrome");
        aceeditors[accountID].session.setMode("ace/mode/javascript");
        aceeditors[accountID].setOptions({
            fontSize: "12pt"
        });
    }
}

// function for refreshing a given account block
const refreshAccountBlock = (accountID) => {
    // variable for account HTML element
    const accountElement = document.querySelector("body > div.container > div.app > ul.accounts > div.account#accountid_" + accountID);

    // refresh HTML of account element
    if(vaultContents.accounts[accountID]) {
        accountElement.querySelector("section.display").outerHTML = getHTMLOfAccountBlock(accountID, true);
    } else {
        delete aceeditors[accountID];
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
        const JSONAsString = JSON.stringify(vaultContents.accounts[accountID], null, "\t");
        refreshAceEditor(accountID, JSONAsString);
        
        //autoResizeTextarea(accountElement.querySelector("section.edit textarea"));
    }else {
        // if not editing, save new value of account JSON from textarea
        const newAccountContentInJSON = aceeditors[accountID].getValue();
        if(isValidJSONString(newAccountContentInJSON)) {
            // new value
            const newAccountContent = JSON.parse(newAccountContentInJSON);

            if(newAccountContent.name != undefined && newAccountContent.properties != undefined && typeof newAccountContent.name == "string" && typeof newAccountContent.properties == "object") {
                // save new value in vault
                vaultContents.accounts[accountID] = newAccountContent;

                // refresh database
                refreshVaultDatabase();
                
                // refresh account block
                refreshAccountBlock(accountID);
            }else {
                // throw error, and revert back to editing
                if(newAccountContent.name == undefined) {
                    alert("Include property \"name\" of type String in JSON");
                }else if(!newAccountContent.properties == undefined) {
                    alert("Include property \"properties\" of type Object in JSON");
                }else if(!(typeof newAccountContent.name == "string")) {
                    alert("Property \"name\" must be of type String");
                }else if(!(typeof newAccountContent.properties == "object")) {
                    alert("Property \"properties\" must be of type Object");
                }
                accountElement.classList.toggle("editing");
            }
        }else {
            // throw error and revert back to editing
            alert("Invalid JSON");
            accountElement.classList.toggle("editing");
        }
    }
}

// remove btn on account blocks
const eventRemoveBtn = (accountID, button) => {
    if(confirm("Delete account: \"" + vaultContents.accounts[accountID].name + "\"?")) {
        delete vaultContents.accounts[accountID];
        refreshVaultDatabase();
        refreshAccountBlock(accountID);
    }
    button.blur();
}

// add account btn
const eventAddAccountBtn = () => {
    addAccountBtnElement.blur();

    // only allow adding accounts if nothing is being edited
    let accountsBeingEdited = false;
    Array.from(document.querySelectorAll("body > div.container > div.app > ul.accounts > div.account")).forEach(accountEl => {
        if(accountEl.classList.contains("editing")) {
            accountsBeingEdited = true;
        }
    });

    if(!accountsBeingEdited) {
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
    }else {
        alert("Please Finish Editing Accounts Before Adding New Ones")
    }
}

// hide/show passwords button
const eventHideShowPasswordBtn = () => {
    hideShowPasswordBtnElement.blur();
    hideShowPasswordBtnElement.classList.toggle("hidden");
    document.querySelector("div.app").classList.toggle("passwords_hidden");
    
    if(hideShowPasswordBtnElement.classList.contains("hidden")) {
        hideShowPasswordBtnElement.setAttribute("aria-label", "Show Passwords");
    }else {
        hideShowPasswordBtnElement.setAttribute("aria-label", "Hide Passwords");
    }


}

// download password datafile button
const eventDownloadPasswordDatafileBtn = () => {
    downloadPswdDatafileBtnElement.blur();

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

// copy property btn
const eventCopyPropertyValueBtn = (btn) => {
    // copy to clipboard
    navigator.clipboard.writeText(btn.previousElementSibling.querySelector("span.password").innerText);

    // show tooltip
    btn.classList.add("active_tooltip");
    btn.setAttribute("data-balloon-visible", "true");
    
    // add random ID to copy btn, so that active tooltip can be turned off if that ID is the same in 600 ms
    const btnID = generateRandomID(32);
    
    btn.setAttribute("active_tooltip_id", btnID);
    setTimeout(() => {
        if(btn.getAttribute("active_tooltip_id") == btnID) {
            btn.classList.remove("active_tooltip");
            btn.removeAttribute("data-balloon-visible");
        }
    }, 600);
}

// map add account button onclick to event function
const addAccountBtnElement = document.querySelector("body > div.container > div.app > nav > div.row > button.add_account");
addAccountBtnElement.addEventListener("click", eventAddAccountBtn);

// map hide/show password button onclick to event function
const hideShowPasswordBtnElement = document.querySelector("body > div.container > div.app > nav > div.row > button.hide_show_pwds");
hideShowPasswordBtnElement.addEventListener("click", eventHideShowPasswordBtn);

// map download password datafile button onclick to event function
const downloadPswdDatafileBtnElement = document.querySelector("body > div.container > div.app > nav > div.row > button.download_datafile");
downloadPswdDatafileBtnElement.addEventListener("click", eventDownloadPasswordDatafileBtn);

// search bar functionality
const searchBarInputElement = document.querySelector("body > div.container > div.app > nav > div.row > input[type=text]");
const searchBarInputInputEvent = () => {
    // element vars
    const appContainerElement = document.querySelector("body > div.container > div.app");

    // search query
    const searchQuery = (event.target || event.srcElement).value;
    
    if(searchQuery.split(" ").join("").length <= 0) {
        // if search is just whitespace, then go back to all accounts
        appContainerElement.classList.remove("searching");
    } else {
        // add search class to app and only show accounts that match search query
        appContainerElement.classList.add("searching");

        Object.keys(vaultContents.accounts).forEach((accountID) => {
            // element vars
            const accountElement = document.querySelector("body > div.container > div.app > ul.accounts > div.account#accountid_" + accountID);

            const val = vaultContents.accounts[accountID];
            let isSearchResult = false;


            if(val.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
                isSearchResult = true;
            }else {
                getListOfObjValsRecursive(val.properties).forEach((propObj) => {
                    const propName = propObj.key;
                    const propVal = propObj.value;
                    if(propName.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
                        isSearchResult = true;
                    }else if(propVal.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
                        isSearchResult = true;
                    }
                });
            }

            if(isSearchResult) {
                accountElement.classList.add("displayed");
            }else {
                accountElement.classList.remove("displayed");
            }
        });

        if((document.querySelectorAll("body > div.container > div.app > ul.accounts > div.account.displayed")).length <= 0) {
            document.querySelector("body > div.container > div.app").classList.add("no_results");
        }else {
            document.querySelector("body > div.container > div.app").classList.remove("no_results");
        }
    }
};
searchBarInputElement.addEventListener("input", searchBarInputInputEvent);
searchBarInputElement.addEventListener("focus", searchBarInputInputEvent);
searchBarInputElement.addEventListener("keydown", (e) => {
    if(e.keyCode == 27) {
        (event.target || event.srcElement).blur();
    }
});
searchBarInputElement.addEventListener("blur", () => {
    document.querySelector("body > div.container > div.app").classList.remove("searching");
});

/* add "not_top" class to nav if scrolled */
window.addEventListener("scroll", () => {
    const scrollPixelsFromTop = window.pageYOffset;
    const navPixelsFromTop = document.querySelector("nav").getBoundingClientRect().top;
    const navHasNotTopClass = document.querySelector("body > div.container > div.app > nav").classList.contains("not_top");
    if(scrollPixelsFromTop > navPixelsFromTop) {
        if(!navHasNotTopClass) {
            document.querySelector("body > div.container > div.app > nav").classList.add("not_top");
        }
    } else if (navHasNotTopClass) {
        document.querySelector("body > div.container > div.app > nav").classList.remove("not_top");
    }
});
window.addEventListener("load", () => {
    window.dispatchEvent(new Event("scroll"));
});

// every 16ms, check if editors are focused and add/remove focused attribute accordingly
setInterval(() => {
    Object.keys(aceeditors).forEach((accountID, editor) => {
        if(aceeditors[accountID].isFocused()) {
            document.getElementById("accountid_" + accountID).querySelector("section.edit > div.editor_container").classList.add("focused");
        }else {
            document.getElementById("accountid_" + accountID).querySelector("section.edit > div.editor_container").classList.remove("focused");
        }
    });
}, 16);

openAppScreen("test");