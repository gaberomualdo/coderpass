// get IPC renderer module for communication with main process, and get remote
// module for direct usage of main process functions within render process,
// and get dialog for using dialogs.
const { remote } = require("electron");
const { dialog } = remote;

// get used modules and store in vars

// get fs module from remote module to read and write from filesystem
const fs = remote.require("fs");

// get crypto module from remote module for generating random cipher IV
const crypto = remote.require("crypto");

// get aes-js module from remote module for encryption
const aesjs = remote.require("aes-js");

// get pbkdf2 module from remote module for key derivation
const pbkdf2 = remote.require("pbkdf2");

// get uuid module for generating random IDs
const uuid = remote.require("uuid");