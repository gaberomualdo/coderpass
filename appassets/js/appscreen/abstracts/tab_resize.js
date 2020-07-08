(() => {
  const tabResizeElm = document.querySelector('.tab_resize');
  const containerElm = document.querySelector('body > div.container');

  let isResizing = false;
  tabResizeElm.addEventListener('mousedown', () => {
    isResizing = true;
    containerElm.classList.add('resizing');
  });
  document.addEventListener('mouseup', () => {
    isResizing = false;
    containerElm.classList.remove('resizing');
    document.documentElement.style.cursor = null;
  });

  const maxTabselectWidth = remToPx(25);
  const minTabselectWidth = remToPx(5);
  document.addEventListener('mousemove', (e) => {
    if (isResizing) {
      document.documentElement.style.cursor = 'ew-resize';

      let newTabselectWidth = e.clientX;

      if (newTabselectWidth >= maxTabselectWidth) {
        newTabselectWidth = maxTabselectWidth;
        document.documentElement.style.cursor = 'w-resize';
      }

      if (newTabselectWidth <= minTabselectWidth) {
        newTabselectWidth = minTabselectWidth;
        document.documentElement.style.cursor = 'e-resize';
      }

      containerElm.setAttribute('style', `--tabselect-width: ${newTabselectWidth}px`);
    }
  });
})();
