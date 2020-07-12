// upload password datafile button functionality
document
  .querySelector('body > div.container > div.auth > div.form.create_vault > p:last-child > a.upload_password_datafile_button')
  .addEventListener('click', () => {
    // open file dialog to get text file
    const filePaths = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{ name: 'Plain Text', extensions: ['txt'] }],
    });
    // if file was found, write file contents to data text file, and reload page
    if (filePaths && filePaths[0]) {
      // get contents of opened file
      const fileContents = readFile(filePaths[0]);

      console.log(fileContents);

      // if file has contents, write file contents to vault file
      if (fileContents.length > 0) {
        writeFile('vault/data.txt', fileContents);
      }

      // reload app
      window.location.reload();
    }
  });
