// functionality for create vault button
const createVaultBtnElement = document.querySelector(
  "body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > button:nth-child(2)"
);

const eventCreateVaultBtn = () => {
  if (!createVaultBtnElement.disabled) {
    // value of password input
    const password = document.querySelector(
      "body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > input:first-child"
    ).value;

    // encrypt empty JSON object into vault file
    encryptJSONToFile("vault/data.txt", password, { accounts: {} });

    // simulate enter vault with password

    // set enter vault password input value to password
    document.querySelector(
      "body > div.container > div.auth > div.form.enter_vault > div.input_container:nth-child(2) > input:first-child"
    ).value = password;

    // trigger enter vault button event
    (() => {
      const clickEvent = new CustomEvent("click");
      document
        .querySelector(
          "body > div.container > div.auth > div.form.enter_vault > div.input_container:nth-child(2) > button:nth-child(2)"
        )
        .dispatchEvent(clickEvent);
    })();
  }
};

document
  .querySelector(
    "body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > input"
  )
  .addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      eventCreateVaultBtn();
    }
  });
createVaultBtnElement.addEventListener("click", eventCreateVaultBtn);
