/**
 * Set the CSRF token for all AJAX requests.
 */
function setCSRFToken() {
    const csrfToken = document.getElementsByName('csrf_token')[0];
    if (typeof csrfToken !== 'undefined') {
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrfToken);
                }
            }
        });
    }
}

export default setCSRFToken;