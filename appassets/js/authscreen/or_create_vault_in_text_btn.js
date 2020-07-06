// "or create vault" button functionality
document
  .querySelector(
    "body > div.container > div.auth > div.form.enter_vault > p:last-child > a.create_new_vault_button"
  )
  .addEventListener("click", () => {
    // confirm
    if (confirm("Create new vault and remove existing one?")) {
      // remove contents from vault file
      writeFile("vault/data.txt", "");

      // reload app
      window.location.reload();
    }
  });
