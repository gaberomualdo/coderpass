const { update } = require('lodash');

document.querySelectorAll('div.auth > div.form input').forEach((input) => {
  const updateInput = (input) => {
    if (input.value.length <= 0) {
      input.parentElement.querySelector('button').setAttribute('click-disabled', 'true');
    } else {
      input.parentElement.querySelector('button').removeAttribute('click-disabled');
    }
  };

  input.addEventListener('input', () => {
    updateInput(input);
  });

  updateInput(input);
});
