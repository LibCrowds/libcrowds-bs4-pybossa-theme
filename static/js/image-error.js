$('img').on("error", function () {
    var rand = Math.floor((Math.random() * 10) + 1),
        url  = 'http://placekitten.com/400/400?image=' + rand;
    $(this).attr('src', url);
});