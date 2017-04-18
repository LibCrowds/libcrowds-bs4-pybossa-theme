/**
 * Load favourite tasks gallery for the current user.
 */
(function() {
    if ($('.favourites-gallery').length) {
        $.ajax({
            url: '/api/favorites',
            contentType: "application/json",
            dataType: 'json'
        }).done(function(results) {
            if (!results.length) {
                $('.favourites-gallery').html("You haven't added any favourite tasks")
            } else {
                $('.favourites-gallery').html('');
            }
            
            for (var i = 0; i < results.length; i++) {
                
                // Add an image to the gallery
                function appendImg(link, thumbnail) {
                    $('.favourites-gallery').append(
                        '<a href="' + link + '" class="col-xs-6 col-sm-4 col-md-3 mb-2"' + 
                        'data-sub-html="Task ' + results[i].id + '"' +
                        'data-pinterest-text="Look what I found"' + 
                        'data-tweet-text="Look what I found"' +
                        'data-facebook-share-url="' + window.location.origin + '"' + 
                        'data-twitter-share-url="' + window.location.origin + '"' + 
                        'data-googleplus-share-url="' + window.location.origin + '"' + 
                        'data-pinterest-share-url="' + window.location.origin + '">' +
                        '<img src="' + thumbnail + '" class="img-responsive img-thumbnail" /></a>'
                    );
                }
                
                if (results[i].info.image_ark) {  // BL IIIF images
                    appendImg(
                        'http://api.bl.uk/image/iiif/' + results[i].info.image_ark + '/full/full/0/default.jpg', 
                        'http://api.bl.uk/image/iiif/' + results[i].info.image_ark + '/full/300,/0/default.jpg'
                    );
                } else if (results[i].info.url_b) {  // Flickr images
                    appendImg(results[i].info.url, results[i].info.url_b);
                } else {
                    notify('No image loaded for task ' + results[i].id, 'error')
                }
            }
            
            $('.favourites-gallery').lightGallery({
                thumbnail:true
            });
        });
    }
}());


/**
 * Add a favourites button to the given element.
 */
function addFavouritesButton(task_id, elem, cls) {
    $.ajax({
        url: "/api/favorites",
        contentType: "application/json",
        data: JSON.stringify({ task_id: task_id }),
        dataType: "json",
        type: "GET"
    }).done(function(results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].id == task_id) {
                elem.append('<button class="btn btn-favourite ' + cls + 
                            '" type="button" role="button" data-task-id="' + task_id + 
                            '">Remove from Favourites</button>');
                return;
            }
        }
        elem.append('<button class="btn btn-favourite ' + cls + 
                    '" type="button" role="button" data-task-id="' + task_id + 
                    '">Add to Favourites</button>')
    });
}
