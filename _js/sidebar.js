let sidebar;

$('[data-toggle="sidebar-collapse"]').on('click', function(evt) {
    let target = $(this).data('target');
    $(target).toggleClass('active');
    evt.preventDefault();
});

export default sidebar;