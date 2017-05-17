let favourites;

/**
 * Return the main and thumbnail images for a task in the favourites gallery.
 */
function getGalleryImages(task) {
    if (task.info.image_ark) {  // BL IIIF
        let baseUrl = 'http://api.bl.uk/image/iiif';
        return [`${baseUrl}/${task.info.image_ark}/full/full/0/default.jpg`,
                `${baseUrl}/${task.info.image_ark}/full/300,/0/default.jpg`];
    } else if (task.info.url_m) {  // Flickr
        return [task.info.url, task.info.url_m];
    }
    return null;
}


/**
 * Return an item for the favourites gallery.
 */
function getGalleryItem(task) {
    let images = getGalleryImages(task);
    return `<a href="${images[0]}"
           data-task-id="${task.id}"
           data-sub-html="Task ${task.id}"
           data-pinterest-text="Look what I found"
           data-tweet-text="Look what I found"
           data-facebook-share-url="${window.location.origin}"
           data-twitter-share-url="${window.location.origin}"
           data-googleplus-share-url="${window.location.origin}"
           data-pinterest-share-url="${window.location.origin}">
           <img src="${images[1]}"
                class="img-responsive img-thumbnail" />
           </a>`;
}


/**
 * Load the current user's favourites gallery.
 */
function loadFavouritesGallery(selector) {
    getFavourites().then(function(favourites) {
        if (!favourites.length) {
            $(selector).html("<p>You haven't added any favourite tasks</p>");
        } else {
            let galleryItems = favourites.map(function(task) {
                return getGalleryItem(task);
            }).join("");
            $(selector).html(galleryItems);
            $(selector).lightGallery();
            $(selector).justifiedGallery();
        }
    });
}


/**
 * Return the current user's favourites.
 */
function getFavourites() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "/api/favorites",
            contentType: "application/json",
            dataType: "json",
            type: "GET"
        }).done(function(results) {
            resolve(results);
        }).fail(function(xhr, status, error) {
            reject(new Error(`Failed to add favourite task: status`));
        });
    });
}


/**
 * Add a task to the current user's favourites.
 */
function addFavourite(taskId) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/api/favorites',
            contentType: "application/json",
            data: JSON.stringify({ task_id: taskId }),
            dataType: 'json',
            type: 'POST'
        }).done(function() {
            resolve(true);
        }).fail(function(xhr, status, error) {
            reject(new Error(`Failed to add favourite task: status`));
        });
    });
}


/**
 * Remove a task from the current user's favourites.
 */
function removeFavourite(taskId) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `/api/favorites/${taskId}`,
            contentType: "application/json",
            dataType: 'json',
            type: 'DELETE'
        }).done(function() {
            resolve(false);
        }).fail(function(xhr, status, error) {
            reject(new Error(`Failed to remove favourite task: status`));
        });
    });
}


/**
 * Check if a task is one of the current user's favourites.
 */
function isFavourite(taskId) {
    return new Promise(function(resolve, reject) {
        getFavourites(taskId).then(function(favourites) {
           for (let i = 0; i < favourites.length; i++) {
                if (favourites[i].id == taskId) {
                    resolve(true);
                }
            }
            resolve(false);
        }).catch(function(error) {
            reject(error);
        });
    });
}


/**
 * Update contents of the favourites button.
 */
function updateFavouritesButton(btn, isFavourite) {
    let text = isFavourite ? "Remove from Favourites" : "Add to Favourites",
        icon = isFavourite ? "fa-thumbs-down" : "fa-thumbs-up",
        html = `<span class="fa ${icon} mr-1"></span>${text}`;
    btn.html(html);
}


/**
 * Toggle a favourite task.
 */
function toggleFavouriteTask(taskId) {
    return new Promise(function(resolve, reject) {
        isFavourite(taskId).then(function(isFav) {
            if (isFav) {
                return removeFavourite(taskId);
            }
            return addFavourite(taskId);
        }).then(function(isFav) {
            resolve(isFav);
        });
    });
}


/**
 * Return a favourites button.
 */
function getFavouritesButton(taskId) {
    return new Promise(function(resolve, reject) {
        isFavourite(taskId).then(function(isFav) {
            let btn = $(`<button class="btn btn-info btn-favourites" type="button"
                                 role="button" data-task-id="${taskId}" />`);
            updateFavouritesButton(btn, isFav);
            resolve(btn);
        });
    });
}


// Toggle a favourite task when button clicked.
$('body').on('click', '.btn-favourites', function() {
    let btn    = $(this),
        taskId = btn.data('task-id');

    toggleFavouriteTask(taskId).then(function(result) {
        updateFavouritesButton(btn, result);
        if(result) {
            notify(`Task added to your favourites.`, 'success');
        } else {
            notify(`Task removed from your favourites.`, 'success');
        }
    }).catch(function(err) {
        throw err;
    });
});


// Load the current user's favourites gallery.
if ($('.favourites-gallery').length) {
    loadFavouritesGallery('.favourites-gallery');
}

export default favourites;
