import styleNavbar from '../actions/style-navbar';
import fadeJumbotrons from '../actions/fade-jumbotrons';

let windowResize;

// Handle window resize events.
window.addEventListener("resize", function() {
    styleNavbar();
    fadeJumbotrons();
}).trigger('resize');

export default windowResize;
