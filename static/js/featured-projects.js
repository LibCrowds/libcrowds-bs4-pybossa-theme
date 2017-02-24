$('.project-toggle-featured').on('click', function() {
    const projectId = $(this).data("project-id"),
          featured  = $(this).data("featured") === "True";
          method    =  featured ? "DELETE" : "POST";
    $.ajax({
          type: method,
          url: `/admin/featured/${projectId}`,
          dataType: 'json'
    }).done(() => {
        const newStatus = featured ? "False" : "True";
        $(this).data('featured', newStatus);
        $(this).html(newStatus);
    });
})