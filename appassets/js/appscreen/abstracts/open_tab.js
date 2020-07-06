const openTab = (tabClassname) => {
  const activeTabElm = document.querySelector('.tab.active');
  const newActiveTabElm = document.querySelector('.tab.' + tabClassname);

  if (activeTabElm) {
    activeTabElm.classList.remove('active');
  }

  if (newActiveTabElm) {
    newActiveTabElm.classList.add('active');
  }
};
