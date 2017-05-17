import notify from './notify';

let messages;

window.onload = function() {
    for (let elem of document.getElementsByClassName('flash-message')) {
        notify(elem.innerHTML, elem.getAttribute('data-category'));
    }
}

export default messages;