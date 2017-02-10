let s3;

/**
 * Load the contents of an Amazon S3 bucket.
 */
$('#get-s3-bucket').on('click', function() {
    let files      = [],
        bucketName = $('#bucket').val(),
        filesInput = document.getElementById("files");
    filesInput.innerHTML = null;
    $('#objects').empty();
    $.get('/amazon/bucket/'+ bucketName).done(function(objects) {
        objects.forEach(function(object) {
            objectElement = $('<tr class="object" style="cursor:pointer;"><td>' + object + '</td></tr>');
            $('#objects').append(objectElement);
        });
            
        $(".object").each(function(){
            let objectDomElement = $(this),
                objectName       = $(this).text();
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
            files.forEach(function(file, index){
                let element = document.createElement("li"),
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