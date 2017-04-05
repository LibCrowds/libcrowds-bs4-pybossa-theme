/**
 * Initialise progress circles.
 */
$('.progress-circle').each(function() {
    var value = parseFloat($(this).data('progress') / 100);
    $(this).circleProgress({
        value: value,
        fill: '#D00000',
        size: 180
    });
});