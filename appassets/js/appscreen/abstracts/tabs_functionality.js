(() => {
  const tabSelectBtns = document.querySelectorAll('.tab_select > li');

  const resetActiveElms = () => {
    const activeTabselectBtn = document.querySelector('.tab_select > li.active');
    const activeTab = document.querySelector('.tabs > .tab.active');

    if (activeTabselectBtn) {
      activeTabselectBtn.classList.remove('active');
    }
    if (activeTab) {
      activeTab.classList.remove('active');
    }
  };

  const setActive = (tabIdx) => {
    document.querySelectorAll('.tab_select > li')[tabIdx].classList.add('active');
    document.querySelectorAll('.tabs > .tab')[tabIdx].classList.add('active');
  };

  window.openTab = (tabIdx) => {
    if (!(document.querySelectorAll('.tabs > .tab')[tabIdx] === document.querySelector('.tabs > .tab.active'))) {
      resetActiveElms();
      setActive(tabIdx);
    }
  };

  tabSelectBtns.forEach((btn, btnIdx) => {
    btn.addEventListener('click', () => {
      openTab(btnIdx);
    });
  });

  // default is first tab
  openTab(0);
})();
