---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

# Welcome to QGames - Hub

This is the website for showcasing Quantum Games related the The Hague University of Applied Sciences.

## Games

{% for game in site.games %}
  - [{{ game.title }}]({{ game.url }})
{% endfor %}
