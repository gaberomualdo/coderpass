// small function to toggle a list (next sibling, typically a <ul>) given a button element
const toggleListExpansion = (button) => {
  console.log(button, button.nextElementSibling);
  button.classList.toggle('open');
  button.nextElementSibling.classList.toggle('open');
};
