/**
 * Load global stats.
 */
(function () {
    if ($('.global-stat').length) {
        $.ajax({
            url: '/api/globalstats',
            dataType: 'json'
        }).done(function(results) {
             $('#n-volunteers').html(results.n_users);
             $('#n-contributions').html(results.n_task_runs);
             $('#n-projects').html(results.n_projects);
        });
    }
}());