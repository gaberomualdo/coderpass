setInterval(() => {
    const windowFocused = ipcRenderer.sendSync("is-window-focused");
    if(windowFocused) {
        document.body.classList.add("window_focused");
    }else {
        document.body.classList.remove("window_focused");
    }
}, 16);