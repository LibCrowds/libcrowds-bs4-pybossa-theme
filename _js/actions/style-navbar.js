/**
 * Handle styling of the navbar.
 */
function styleNavbar() {
    let styles       = [],
        ieScrollTop  = document.documentElement.scrollTop,
        scrollTop    = document.body.scrollTop === 0 ? ieScrollTop : document.body.scrollTop,
        styleElems   = document.getElementsByClassName('style-navbar'),
        navbarElem   = document.getElementById('main-navbar'),
        addedCls     = navbarElem.getAttribute('data-added-class'),
        originalCls  = navbarElem.getAttribute('data-original-class');

    // Get bounds where navbar styles are changed
    for (let elem of styleElems) {
        styles.push({
            class: elem.getAttribute('data-navbar-class'),
            bounds: [
                elem.offsetTop,
                elem.offsetTop + elem.offsetHeight
            ]
        });
    }

    // Apply styles depending on the bounds the navbar is within
    for (let style of styles) {
        if (scrollTop >= style['bounds'][0] - 50 && scrollTop <= style['bounds'][1] + 25) {
            navbarElem.classList.remove(addedCls);
            navbarElem.classList.add(style['class']);
            navbarElem.setAttribute('added-class', style['class']);
            return;
        }
    }

    // Return to original style
    navbarElem.classList.remove(addedCls);
    navbarElem.classList.add(originalCls);
}

export default styleNavbar;
