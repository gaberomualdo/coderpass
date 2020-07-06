window.addEventListener("load", (event) => {
  // add class to topbar if on macOS/darwin
  toggleTopbarDraggableType();

  // display app container once window is fully loaded
  document.querySelector("body > div.container").removeAttribute("style");
});
