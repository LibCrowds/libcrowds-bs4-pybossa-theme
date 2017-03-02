/*
 * Display a notification.
 */
function notify(msg, type) {

    const opts = {
        title: type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Info',
        text: msg,
        type: type || 'info',
        hide : true,
        width: '400px',
        delay: 2500,
        buttons: {
            closer: true,
            sticker: false
        }
    };

    switch (type) {
        case "error":
        case "danger":
            opts.icon = 'fa fa-exclamation-circle fa-2x';
            opts.hide = false;
            break;
        case "warning":
            opts.icon = 'fa fa-exclamation-circle fa-2x';
            break;
        case "success":
            opts.icon = 'fa fa-thumbs-up fa-2x';
            opts.delay = 2000;
            break;
        default:
            opts.icon = 'fa fa-info-circle fa-2x';
            break;
    }

    return new PNotify(opts);
}