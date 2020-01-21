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
            document.querySelector("body > div.container > div.auth > div.form.enter_vault > div.input_container:nth-child(2) > input:first-child").focus();
        }
    }
};

document.querySelector("body > div.container > div.auth > div.form.enter_vault > div.input_container:nth-child(2) > input:first-child").addEventListener("keydown", (e) => {
    if(e.keyCode == 13) {
        eventEnterVaultBtn();
    }
});
enterVaultBtnElement.addEventListener("click", eventEnterVaultBtn);