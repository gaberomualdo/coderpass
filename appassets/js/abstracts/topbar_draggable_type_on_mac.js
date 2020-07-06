// function to add class to draggable topbar element if on macOS/darwin
const toggleTopbarDraggableType = () => {
  if (process.platform == "darwin") {
    document.querySelector("div.topbar_draggable").classList.add("on_darwin");
  }
};
