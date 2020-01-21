// get IPC renderer module for communication with main process, and get remote
// module for direct usage of main process functions within render process,
// and get dialog for using dialogs.
import { remote } from "electron";
const { dialog } = remote;