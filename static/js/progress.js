// Initialise progress circles.
$('.progress-circle:not(.progress-circle-white)').each(function() {
    var value = parseFloat($(this).data('progress') / 100);
    $(this).circleProgress({
        value: value,
        fill: '#D00000',
        size: 180
    });
});

$('.progress-circle-white').each(function() {
    var value = parseFloat($(this).data('progress') / 100);
    $(this).circleProgress({
        value: value,
        fill: '#FFF',
        size: 180
    });
});