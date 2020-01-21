// get IPC renderer module for communication with main process, and get remote
// module for direct usage of main process functions within render process,
// and get dialog for using dialogs.
const { remote } = require("electron");
const { dialog } = remote;