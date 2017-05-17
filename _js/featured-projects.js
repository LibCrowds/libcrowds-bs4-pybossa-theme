import notify from './notify';

let featuredProjects;

$('.toggle-featured').on('click', function() {
    var projectId = $(this).data("project-id"),
        featured  = $(this).text() === "Remove",
        method    =  featured ? "DELETE" : "POST",
		_this     = $(this);
    
	
	$.ajax({
          type: method,
          url: '/admin/featured/' + projectId,
          dataType: 'json'
    }).done(function() {
        _this.html(featured ? "Add" : "Remove");
    }).fail(function(jqXHR) {
        notify(jqXHR.responseText, 'error');
    });
});

export default featuredProjects;