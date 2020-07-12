const generatePwd = (options) => {
  const chooseRandomFromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)] || '';
  };

  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const specialChars = "!@#$%^&*()_+-=[]{}|';:,.<>/?".split('');
  const nums = '1234567890'.split('');

  let availableChars = [];

  if (options.lowercase) {
    availableChars = availableChars.concat(lowercaseLetters);
  }
  if (options.uppercase) {
    availableChars = availableChars.concat(uppercaseLetters);
  }
  if (options.specialChars) {
    availableChars = availableChars.concat(specialChars);
  }
  if (options.nums) {
    availableChars = availableChars.concat(nums);
  }

  const length = options.length || 16;

  let pwd = '';

  for (let idx = 0; idx < length; idx++) {
    pwd += chooseRandomFromArr(availableChars);
  }

  return pwd;
};
