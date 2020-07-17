// create functions that utilize fs module for ease of use

// get path of filename (prepend appdata directory to filename and return)
const getPathOfAppDataFile = (filename) => {
  const appDataPath = ipcRenderer.sendSync('get-appdata-dir', '');
  return path.join(appDataPath, filename);
};

// read file
const readFile = (filename) => {
  const filePath = getPathOfAppDataFile(filename);
  // read file using Node.js fs module
  try {
    return fs.readFileSync(filePath, 'UTF-8', (err, data) => {
      // log error if error exists
      if (err) return '';

      // return read file data
      return data;
    });
  } catch (err) {
    return '';
  }
};

// write file
const writeFile = (filename, filedata) => {
  const filePath = getPathOfAppDataFile(filename);

  if (!fs.existsSync()) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // write file using Node.js fs module
  fs.writeFile(filePath, filedata, 'UTF-8', (err) => {
    // log error if error exists
    if (err) console.error(err);
  });
};
