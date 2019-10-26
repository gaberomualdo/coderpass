// in auth screen, decide whether to show "Create Vault" form or "Enter Vault" form;
// use IIFE to prevent creation of global variables
(() => {
    // variable for contents of vault file
    const vaultEncryptedText = readFile("vault/data.txt");

    // if vault file is empty, show form to create vault; else, show form to enter existing vault
    if(vaultEncryptedText.length > 0) {
        document.querySelector("body > div.container > div.auth > div.form.create_vault").style.display = "none";
    }else{
        document.querySelector("body > div.container > div.auth > div.form.enter_vault").style.display = "none";
    }
})();

// upload password datafile button functionality
document.querySelector("body > div.container > div.auth > div.form.create_vault > p:last-child > a.upload_password_datafile_button").addEventListener("click", () => {
    // open file dialog to get text file
    const openFileDialog = dialog.showOpenDialog({ properties: ['openFile'], filters: [ { name: 'Plain Text', extensions: ['txt'] } ] }, (filePaths) => {
        // if file was found, write file contents to data text file, and reload page
        if(filePaths && filePaths[0]) {
            // get contents of opened file
            const fileContents = readFile(filePaths[0]);

            // if file has contents, write file contents to vault file
            if(fileContents.length > 0) {
                writeFile("vault/data.txt", fileContents);
            }

            // reload app
            window.location.reload();
        }
    });
});

// "or create vault" button functionality
document.querySelector("body > div.container > div.auth > div.form.enter_vault > p:last-child > a.create_new_vault_button").addEventListener("click", () => {
    // confirm
    if(confirm("Create new vault and remove existing one?")) {
        // remove contents from vault file
        writeFile("vault/data.txt", "");

        // reload app
        window.location.reload();
    }
});

// check if passwords match within create vault form (check each time either
// input is changed), and change input button icon accordingly in real-time
(() => {
    // var for list of password input HTML elements
    const passwordInputElements = [document.querySelector("body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > input"), document.querySelector("body > div.container > div.auth > div.form.create_vault > input:nth-child(2)")];
    
    // loop through each, and add oninput event to check if input values match whenever
    passwordInputElements.forEach((inputBox) => {
        inputBox.addEventListener("input", (event) => {
            // variable for HTML element of button that includes the icons that are to be changed
            const buttonIconContainerHTML = document.querySelector("body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > button");
            
            // check if two inputted passwords match and change icon accordingly
            buttonIconContainerHTML.disabled = !(passwordInputElements[0].value == passwordInputElements[1].value);
        });
    });
})();

// functionality for create vault button
const createVaultBtnElement = document.querySelector("body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > button:nth-child(2)");

const eventCreateVaultBtn = () => {
    if(!createVaultBtnElement.disabled){
        // value of password input
        const password = document.querySelector("body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > input:first-child").value;

        // encrypt empty JSON object into vault file
        encryptJSONToFile("vault/data.txt", password, { accounts: {} });

        // simulate enter vault with password
        
        // set enter vault password input value to password
        document.querySelector("body > div.container > div.auth > div.form.enter_vault > div.input_container:nth-child(2) > input:first-child").value = password;
        
        // trigger enter vault button event
        (() => {
            const clickEvent = new CustomEvent("click");
            document.querySelector("body > div.container > div.auth > div.form.enter_vault > div.input_container:nth-child(2) > button:nth-child(2)").dispatchEvent(clickEvent);
        })();
    }
};

document.querySelector("body > div.container > div.auth > div.form.create_vault > input:nth-child(2)").addEventListener("keydown", (e) => {
    if(e.keyCode == 13) {
        eventEnterVaultBtn();
    }
});
createVaultBtnElement.addEventListener("click", eventCreateVaultBtn);

// functionality for enter vault button
const enterVaultBtnElement = document.querySelector("body > div.container > div.auth > div.form.enter_vault > div.input_container:nth-child(2) > button:nth-child(2)");

const eventEnterVaultBtn = () => {
    if(!enterVaultBtnElement.disabled){
        // value of password input
        const password = document.querySelector("body > div.container > div.auth > div.form.enter_vault > div.input_container:nth-child(2) > input:first-child").value;

        // try to decrypt vault, if doesn't work, then password is incorrect or data is malformed
        try {
            decryptJSONInFile("vault/data.txt", password);
            
            // trigger opening of app screen
            openAppScreen(password);
        } catch (err) {
            alert("Incorrect Password or Malformed Data");
        }
    }
};

document.querySelector("body > div.container > div.auth > div.form.enter_vault > div.input_container:nth-child(2) > input:first-child").addEventListener("keydown", (e) => {
    if(e.keyCode == 13) {
        eventEnterVaultBtn();
    }
});
enterVaultBtnElement.addEventListener("click", eventEnterVaultBtn);
