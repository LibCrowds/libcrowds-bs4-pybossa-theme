{%- with messages = get_flashed_messages(with_categories=True) %}
    {%- if messages %}
        {% for category, message in messages %}
            <script>
               notify({{ message|tojson }}, "{{ category }}");
            </script>
        {% endfor %}
    {% endif %}
{% endwith %}