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

// map download password datafile button onclick to event function
const downloadPswdDatafileBtnElement = document.querySelector("div.tab.all_accounts > nav > div.row > button.download_datafile");
downloadPswdDatafileBtnElement.addEventListener("click", eventDownloadPasswordDatafileBtn);