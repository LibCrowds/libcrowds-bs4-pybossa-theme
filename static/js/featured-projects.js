$('.project-toggle-featured').on('click', function() {
    const projectId = $(this).data("project-id"),
          featured  = $(this).val() === "Remove";
          method    =  featured ? "DELETE" : "POST";
    $.ajax({
          type: method,
          url: `/admin/featured/${projectId}`,
          dataType: 'json'
    }).done(() => {
        const newStatus = featured ? "Add" : "Remove";
        $(this).html(newStatus);
    });
})