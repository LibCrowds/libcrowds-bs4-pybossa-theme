let s3;

/**
 * Load the contents of an Amazon S3 bucket.
 */
$('#get-s3-bucket').on('click', function() {
    var files      = [],
        bucketName = $('#bucket').val(),
        filesInput = document.getElementById("files");
    filesInput.innerHTML = null;

	$('#objects').empty();

	$.get('/amazon/bucket/' + bucketName).done(function(objects) {

		// Load each object into a new table row
		objects.forEach(function(object) {
            var row = $('<tr class="object" style="cursor:pointer;"><td>' + object + '</td></tr>');
            $('#objects').append(row);
        });

        notify("Click on the rows containing the images you want to import.", 'info');

        $(".object").each(function() {
            var objectDomElement = $(this),
                objectName       = $(this).text();

			// Toggle selection on click
			objectDomElement.off('click').on('click', function(evt) {
				evt.preventDefault();
				objectDomElement.toggleClass('table-success');

				if (objectDomElement.hasClass('table-success')) {
					if (files.indexOf(objectName) === -1) {
						files.push(objectName);
					}
				} else {
					files.splice(files.indexOf(objectName), 1);
				}

				filesInput.innerHTML = null;

				files.forEach(function(file, index) {
					var element = document.createElement("li"),
						content = document.createTextNode(file),
						input   = document.createElement('input');
					input.id = "files-" + index;
					input.type = "hidden";
					input.name = "files-" + index;
					input.value = file;
					element.appendChild(input);
					element.appendChild(content);
					filesInput.appendChild(element);
				});
			});
        });

		$('#objects-container').show();

	}).fail(function(resp) {
        if (resp.status === 403) {
            notify("Oops... it seems that bucket is private.", 'error');
        } else if (resp.status === 404) {
            notify("Oops... we could not find that bucket.", 'error');
        } else if (resp.status === 500) {
            notify("Internal server error, please check that the bucket name is valid.", 'error');
        }
    });
});

export default s3;