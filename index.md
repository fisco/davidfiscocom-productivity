---
layout: default
title: 'David Fisco: Productivity'
---
<div>
{% for post in site.posts %}
<a href="{{ post.url }}" class="list-group-item">
 <h4 class='list-group-item-title'>{{ post.title }}</h4>
</a>
{% endfor %}

</div>
