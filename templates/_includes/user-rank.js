<script>
const getUserRankAndScore = function() {
    const currentUserName = '{{ current_user.name }}' || null;
    let def = $.Deferred();
    $.ajax({
        url: '/leaderboard/',
        dataType: 'json',
        contentType: 'application/json',
        data: '{}'
    }).done(function(data) {
        for (let user of data.top_users) {
            if (user.name == currentUserName) {
                def.resolve([user.rank, user.score]);
            }
        }
        def.resolve(null);
    });
    return def;
}
</script>