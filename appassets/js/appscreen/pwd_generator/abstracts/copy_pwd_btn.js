(() => {
  const copyBtn = document.querySelector('div.tab.pwd_generator .main .copy_pwd_btn');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(document.querySelector('div.tab.pwd_generator .main .generate_input input').value);

    // show tooltip
    copyBtn.classList.add('active_tooltip');
    copyBtn.setAttribute('data-balloon-visible', 'true');

    // add random ID to copy copyBtn, so that active tooltip can be turned off if that ID is the same in 600 ms
    const copyBtnID = generateRandomID();

    copyBtn.setAttribute('active_tooltip_id', copyBtnID);
    setTimeout(() => {
      if (copyBtn.getAttribute('active_tooltip_id') == copyBtnID) {
        copyBtn.classList.remove('active_tooltip');
        copyBtn.removeAttribute('data-balloon-visible');
      }
    }, 600);
  });
})();
