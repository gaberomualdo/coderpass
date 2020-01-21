let initialNavPixelsFromTop;
/* add "not_top" class to nav if scrolled */
window.addEventListener("scroll", () => {
    const scrollPixelsFromTop = window.pageYOffset;
    const navHasNotTopClass = document.querySelector("div.tab.all_accounts > nav").classList.contains("not_top");
    if(scrollPixelsFromTop > initialNavPixelsFromTop) {
        if(!navHasNotTopClass) {
            document.querySelector("div.tab.all_accounts > nav").classList.add("not_top");
        }
    } else if (navHasNotTopClass) {
        document.querySelector("div.tab.all_accounts > nav").classList.remove("not_top");
    }
});
window.addEventListener("load", () => {
    initialNavPixelsFromTop = document.querySelector("nav").getBoundingClientRect().top;
    window.dispatchEvent(new Event("scroll"));
});