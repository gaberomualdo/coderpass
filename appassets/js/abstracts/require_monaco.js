// move AMD require to new variable
const amdRequire = global.require;
global.require = nodeRequire;

// configure AMD loader to monaco editor paths
amdRequire.config({ paths: { vs: 'node_modules/monaco-editor/min/vs' } });
