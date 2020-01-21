// get fs module from remote module to read and write from filesystem
const fs = remote.require("fs");

// create functions that utilize fs module for ease of use

// read file
const readFile = (filename) => {
    // read file using Node.js fs module
    return fs.readFileSync(filename, "UTF-8", (err, data) => {
        // log error if error exists
        if(err) console.error(err);

        // return read file data
        return data;
    });
};

// write file
const writeFile = (filename, filedata) => {
    // write file using Node.js fs module
    fs.writeFile(filename, filedata, "UTF-8", (err) => {
        // log error if error exists
        if(err) console.error(err);
    });
};