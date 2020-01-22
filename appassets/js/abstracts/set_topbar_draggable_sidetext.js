// set the text content of the side text in the draggable topbar
(() => {
    document.querySelector("div.topbar_draggable > p.sidetext").innerHTML = `
    <strong class="title">JSON Password Manager</strong>
    <span class="version">v${remote.getGlobal("APP_VERSION")}</span>
    `;
})();