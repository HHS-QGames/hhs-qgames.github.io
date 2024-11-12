---
layout: page
title: Games
permalink: /games/
---

<ul>
  {% for game in site.data.games %}
    <li>
      <a href="/games/{{ game.name | slugify }}">{{ game.name }}</a>
      <p>{{ game.description }}</p>
      <img src="{{ game.showcase_image }}" alt="{{ game.name }} showcase image">
    </li>
  {% endfor %}
</ul>
