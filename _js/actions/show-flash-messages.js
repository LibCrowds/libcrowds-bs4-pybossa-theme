import notify from '../components/notify';

/**
 * Show flash messages.
 */
function showFlashMessages() {
    let messages = document.getElementsByClassName('flash-message');
    for (let elem of messages) {
        notify(elem.innerHTML, elem.getAttribute('data-category'));
    }
}

export default showFlashMessages;
