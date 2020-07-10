const validatePwdLengthInput = (input) => {
  const min = 0;
  const max = 9999;

  const rawVal = input.value.toString();

  if (rawVal.includes('e')) {
    return (input.value = min);
  }

  const val = parseInt(rawVal);

  if (val < min) {
    return (input.value = min);
  }
  if (val > max) {
    return (input.value = max);
  }
};
