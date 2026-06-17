---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

## Pages

- [About](/)
- [Research](/research/)
- [Publications](/publications/)
- [Talks](/talks/)
- [Teaching](/teaching/)
- [CV](/cv/)

## Publications

{% assign publications_sorted = site.publications | sort: 'date' | reverse %}
{% for post in publications_sorted %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}

## Talks

{% assign talks_sorted = site.talks | sort: 'date' | reverse %}
{% for post in talks_sorted %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}

## Teaching

{% assign teaching_sorted = site.teaching | sort: 'date' | reverse %}
{% for post in teaching_sorted %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
