let pybossaAnalyst;

/**
 * Load a count of unverified results from pybossa-analyst.
 */
$('.n-unverified-results').each(function() {
    const projectId = $(this).data('data-project-id');
    $.ajax({
        url: `https://www.libcrowds.com/api/result?project_id=${projectId}&limit=100&info=Unverified&all=1`,
        dataType: 'json'
    }).done(function(results) {
         $('.n-unverified-results').html(results.length === 0 ? '99+' : results.length);
    });
});

export default pybossaAnalyst;