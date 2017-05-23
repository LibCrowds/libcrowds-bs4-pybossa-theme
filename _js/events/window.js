import styleNavbar from '../actions/style-navbar';
import fadeJumbotrons from '../actions/fade-jumbotrons';
import showFlashMessages from '../actions/show-flash-messages';

let windowEvents;

// Handle window resize events.
window.addEventListener("resize", function() {
    styleNavbar();
    fadeJumbotrons();
});

// Handle window scroll events.
window.addEventListener("scroll", function() {
    styleNavbar();
    fadeJumbotrons();
});

// Handle window load events.
window.addEventListener("load", function() {
    styleNavbar();
    fadeJumbotrons();
});

export default windowEvents;
