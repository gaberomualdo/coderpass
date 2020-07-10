(() => {
  const checkboxIsChecked = (className) => {
    return document.querySelector(`div.tab.pwd_generator .main .checkboxes li div.checkbox.${className}`).classList.contains('checked');
  };

  document.querySelector('div.tab.pwd_generator .main .generate_input button').addEventListener('click', () => {
    let genOptions = {};

    if (checkboxIsChecked('lowercase')) {
      genOptions.lowercase = true;
    }
    if (checkboxIsChecked('uppercase')) {
      genOptions.uppercase = true;
    }
    if (checkboxIsChecked('nums')) {
      genOptions.nums = true;
    }
    if (checkboxIsChecked('special_chars')) {
      genOptions.specialChars = true;
    }

    genOptions.length = document.querySelector('div.tab.pwd_generator .main .password_length > input').value;

    const pwd = generatePwd(genOptions);

    document.querySelector('div.tab.pwd_generator .main .generate_input input').value = pwd;
  });
})();
