/**
 * Fade .jumbotron-fade when scrolling past it.
 */
function fadeJumbotrons() {
    let jumbotrons  = document.getElementsByClassName('jumbotron-fade'),
        ieScrollTop = document.documentElement.scrollTop,
        scrollTop   = document.body.scrollTop === 0 ? ieScrollTop : document.body.scrollTop;

    for (let jt of jumbotrons) {
        let visiblePixels  = jt.offsetHeight - scrollTop - jt.offsetTop,
            visiblePercent = Math.round(visiblePixels * 100 / jt.offsetHeight),
            brightness     = visiblePercent < 100 ? visiblePercent / 2 : 100,
            opacity        = visiblePercent < 100 ? visiblePercent / 10 : 1;

        jt.style.filter = `brightness(${brightness}%)`;
        jt.children.style.opacity = opacity;
    }
}

export default fadeJumbotrons;
