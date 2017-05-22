import styleNavbar from '../actions/style-navbar';
import fadeJumbotrons from '../actions/fade-jumbotrons';

let windowScroll;

// Handle window scroll events.
window.addEventListener("scroll", function() {
    styleNavbar();
    fadeJumbotrons();
}).trigger('scroll');

export default windowScroll;
