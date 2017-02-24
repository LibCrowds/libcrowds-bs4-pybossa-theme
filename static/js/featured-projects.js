$('.project-toggle-featured').on('click', function() {
    const projectId = $(this).data("project-id"),
          method    = "DELETE" ? $(this).data("featured") : "POST",
          featured  = $(this).data("featured");
    $.ajax({
          type: method,
          url: `/admin/featured/${projectId}`,
          dataType: 'json'
    }).done(function(results) {
        $(`.project-toggle-featured[data-project-id="${projectId}"]`).hide();
    });
})