/**
 * Show report dialog for SentryIO.
 */
function logError(err, showReportDialog=true) {
    notify('Error: ' + err.message, 'error');
    if (typeof Raven !== 'undefined' && Raven.isSetup()) {
        event_id = Raven.captureException(err);
        if (showReportDialog) {
            Raven.showReportDialog();
        }
    }
    throw err;
}