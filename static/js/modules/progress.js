let progress;

/**
 * Initialise progress circles.
 */
$('.progress-circle').each(function() {
    const value = parseFloat($(this).data('progress') / 100);
    $(this).circleProgress({
        value: value,
        fill: '#D00000',
        size: 150
    });
});

export default progress;