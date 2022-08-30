const tabList = document.querySelector('[role="tablist"]')
const tabs = tabList.querySelectorAll('[role="tab"]')

tabList.addEventListener('keydown', changeTabFocus)
// tabList.addEventListener('click', (e) => {
//     changeTabFocus(e)
//     changeTabPanel(e)
// })
tabs.forEach(tab => tab.addEventListener('click', changeTabPanel))

function changeTabFocus(e) {
    const keyDownLeft = 37
    const keyDownRight = 39

    if (e.keyCode === keyDownLeft || e.keyCode === keyDownRight) {
        //change current tab attribute
        const currentTab = tabList.querySelector('[role="tab"][aria-selected="true"]')
        const currentTabIndex = Array.from(tabs).indexOf(currentTab)
        setDeselectAttribute(currentTab);

        //change next tab attribute and focus
        const nextTabIndex = e.keyCode === keyDownLeft ? currentTabIndex - 1 : currentTabIndex + 1
        const nextTab = tabs[nextTabIndex < 0 ? tabs.length - 1 : nextTabIndex % tabs.length]
        setSelectAttribute(nextTab);
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls')
    const targetImage = targetTab.getAttribute('data-image')
    const mainContainer = targetTab.parentNode.parentNode;

    //remove focus from previous tabs
    const prevTab = targetTab.parentNode.querySelector('[role="tab"][aria-selected="true"]')
    setDeselectAttribute(prevTab)

    //change current tab attribute and focus
    setSelectAttribute(targetTab)

    //hide all tabs and show only target tab
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, `#${targetPanel}`);

    //hide all images and show target image
    hideContent(mainContainer, 'picture');
    showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
    parent.querySelectorAll(content)
        .forEach(item => item.setAttribute('hidden', 'true'))
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden')
}

function setDeselectAttribute(element) {
    element.setAttribute('aria-selected', 'false')
    element.setAttribute('tabindex', '-1')
}

function setSelectAttribute(element) {
    element.setAttribute('aria-selected', 'true')
    element.setAttribute('tabindex', '0')
    element.focus()
}