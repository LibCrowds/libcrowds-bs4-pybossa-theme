Weekly update of your project: {{ project.name }}

Hello {{ project.owner.fullname }},

Here are some insights about how your project has been running over the last week.

Number of completed tasks: {{ n_completed_tasks }}.

Most active day of the week: {{ active_day[0] }} with {{ active_day[1] }} answers submitted.

Top 5 registered users
{% for u in users_stats.auth.top5 %}
    * {{u.fullname}}
{% endfor %}

[View all statistics]({{ url_for('project.show_stats', short_name=project.short_name, _external=True) }})

{% block body %}

{% endblock %}

***
[Update your notification preferences]({{ url_for('account.update_profile', name=user['name'], _external=True) }})
{% if config.get('CONTACT_TWITTER') %}
[Follow us on Twitter](http://twitter.com/{{ config['CONTACT_TWITTER'] }})
{% endif %}