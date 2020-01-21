// hide/show passwords button
const eventHideShowPasswordBtn = () => {
    hideShowPasswordBtnElement.blur();
    hideShowPasswordBtnElement.classList.toggle("hidden");
    document.querySelector("div.tab.all_accounts").classList.toggle("passwords_hidden");
    
    if(hideShowPasswordBtnElement.classList.contains("hidden")) {
        hideShowPasswordBtnElement.setAttribute("aria-label", "Show Passwords");
    }else {
        hideShowPasswordBtnElement.setAttribute("aria-label", "Hide Passwords");
    }
}

// map hide/show password button onclick to event function
const hideShowPasswordBtnElement = document.querySelector("div.tab.all_accounts > nav > div.row > button.hide_show_pwds");
hideShowPasswordBtnElement.addEventListener("click", eventHideShowPasswordBtn);