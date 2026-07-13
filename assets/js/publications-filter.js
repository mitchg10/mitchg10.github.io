(function () {
  const CATEGORY_LABELS = {
    manuscripts: 'Journal Articles',
    conferences: 'Conference Papers',
  };

  function decodeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  function buildCard(pub) {
    const title = decodeHtml(pub.title);
    const author = decodeHtml(pub.author);
    const venue = decodeHtml(pub.venue);
    const categoryLabel = CATEGORY_LABELS[pub.category] || pub.category || '';
    const tags = Array.isArray(pub.tags) ? pub.tags.filter(Boolean) : [];
    const summary = decodeHtml(pub.plain_language_summary || '');

    const titleHtml = pub.url
      ? `<a href="${pub.url}" rel="permalink">${title}</a>`
      : title;

    const metaLine = `Published in <em>${venue}</em>, ${pub.year}`;

    const tagHtml = [
      categoryLabel ? `<span class="pub-tag pub-tag--category">${categoryLabel}</span>` : '',
    ]
      .concat(tags.map(function (t) {
        const decoded = decodeHtml(t);
        return `<a href="?tag=${encodeURIComponent(t)}" class="pub-tag pub-tag--keyword" data-tag="${t}">${decoded}</a>`;
      }))
      .filter(Boolean)
      .join('');

    return `
      <div class="list__item">
        <article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">
          <h2 class="archive__item-title" itemprop="headline">${titleHtml}</h2>
          <p class="archive__item-excerpt" itemprop="description">
            ${author}<br/>
            ${metaLine}
          </p>
          ${summary ? `<p class="pub-card-summary">${summary}</p>` : ''}
          ${tagHtml ? `<p class="pub-tags">${tagHtml}</p>` : ''}
        </article>
      </div>`;
  }

  function getFilteredSorted(data, search, category, tag, sort) {
    const q = search.trim().toLowerCase();

    let result = data.filter(function (pub) {
      if (category && pub.category !== category) return false;
      if (tag && !(Array.isArray(pub.tags) && pub.tags.indexOf(tag) !== -1)) return false;
      if (q) {
        const haystack = [pub.title, pub.author, pub.venue]
          .map(function (s) { return decodeHtml(s || '').toLowerCase(); })
          .join(' ');
        if (haystack.indexOf(q) === -1) return false;
      }
      return true;
    });

    result = result.slice().sort(function (a, b) {
      if (sort === 'oldest') return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      if (sort === 'title') return decodeHtml(a.title).localeCompare(decodeHtml(b.title));
      return b.date < a.date ? -1 : b.date > a.date ? 1 : 0;
    });

    return result;
  }

  function render(data, search, category, tag, sort) {
    const list = document.getElementById('pub-list');
    const count = document.getElementById('pub-count');
    const results = getFilteredSorted(data, search, category, tag, sort);

    if (results.length === 0) {
      list.innerHTML = '<p>No publications match your filters.</p>';
    } else {
      list.innerHTML = results.map(buildCard).join('');
    }

    const hasFilter = search.trim() || category || tag || sort !== 'newest';
    count.textContent = hasFilter ? results.length + ' of ' + data.length + ' publications' : '';
  }

  function getUniqueTags(data) {
    return Array.from(
      new Set(data.flatMap(function (p) { return Array.isArray(p.tags) ? p.tags.filter(Boolean) : []; }))
    ).sort();
  }

  function populateTopicSelect(tags, select) {
    tags.forEach(function (t) {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      select.appendChild(opt);
    });
    select.style.display = tags.length === 0 ? 'none' : '';
  }

  function getTagFromUrl() {
    return new URLSearchParams(window.location.search).get('tag') || '';
  }

  function setTagInUrl(tag) {
    const url = new URL(window.location.href);
    if (tag) {
      url.searchParams.set('tag', tag);
    } else {
      url.searchParams.delete('tag');
    }
    window.history.replaceState(null, '', url.pathname + url.search);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const data = window.publicationsData;
    if (!data) return;

    document.getElementById('pub-static').style.display = 'none';
    document.getElementById('pub-controls').style.display = 'block';

    const searchEl = document.getElementById('pub-search');
    const categoryEl = document.getElementById('pub-category');
    const topicEl = document.getElementById('pub-topic');
    const sortEl = document.getElementById('pub-sort');

    const uniqueTags = getUniqueTags(data);
    populateTopicSelect(uniqueTags, topicEl);

    let activeTag = getTagFromUrl();
    topicEl.value = activeTag;

    function update() {
      render(data, searchEl.value, categoryEl.value, activeTag, sortEl.value);
    }

    function setActiveTag(tag) {
      activeTag = tag;
      setTagInUrl(tag);
      topicEl.value = tag;
      update();
    }

    searchEl.addEventListener('input', update);
    categoryEl.addEventListener('change', update);
    topicEl.addEventListener('change', function () { setActiveTag(topicEl.value); });
    sortEl.addEventListener('change', update);

    document.addEventListener('click', function (e) {
      const pill = e.target.closest('.pub-tag--keyword');
      if (!pill) return;
      if (!document.getElementById('pub-list').contains(pill)) return;
      e.preventDefault();
      const tag = pill.dataset.tag || '';
      setActiveTag(tag);
    });

    update();
  });
})();
