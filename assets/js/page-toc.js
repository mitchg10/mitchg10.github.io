(function () {
  var MASTHEAD_HEIGHT = 85; // 70px masthead + 15px buffer

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function headingLevel(el) {
    return parseInt(el.tagName.charAt(1), 10);
  }

  function buildTOC(headings, minLevel) {
    var nav = document.createElement('nav');
    nav.id = 'page-toc';
    nav.className = 'page-toc';

    var title = document.createElement('div');
    title.className = 'page-toc__title';
    title.textContent = 'On this page';
    nav.appendChild(title);

    var list = document.createElement('ul');
    list.className = 'page-toc__list';

    headings.forEach(function (h) {
      var depth = headingLevel(h) - minLevel; // 0 = top, 1 = sub, 2 = sub-sub
      var li = document.createElement('li');
      li.className = 'page-toc__item page-toc__item--depth-' + depth;

      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'page-toc__link';
      a.textContent = h.textContent;

      li.appendChild(a);
      list.appendChild(li);
    });

    nav.appendChild(list);
    return nav;
  }

  function updateActive(headings, toc) {
    var scrollY = window.pageYOffset;
    var atBottom =
      window.innerHeight + scrollY >= document.documentElement.scrollHeight - 10;

    var activeHeading = null;
    headings.forEach(function (h) {
      if (h.getBoundingClientRect().top + scrollY <= scrollY + MASTHEAD_HEIGHT) {
        activeHeading = h;
      }
    });

    if (atBottom) {
      activeHeading = headings[headings.length - 1];
    }

    toc.querySelectorAll('.page-toc__link').forEach(function (link) {
      link.classList.remove('page-toc__link--active');
    });

    if (activeHeading) {
      var active = toc.querySelector('a[href="#' + activeHeading.id + '"]');
      if (active) {
        active.classList.add('page-toc__link--active');
      }
    }
  }

  function init() {
    var contentEl =
      document.querySelector('.page__content') ||
      document.querySelector('.archive');
    if (!contentEl) return;

    var headings = Array.prototype.slice.call(
      contentEl.querySelectorAll('h1, h2, h3')
    );
    if (headings.length < 2) return;

    // Ensure every heading has an id (Kramdown generates these automatically)
    headings.forEach(function (h) {
      if (!h.id) {
        h.id = slugify(h.textContent) || ('section-' + Math.random().toString(36).slice(2));
      }
    });

    var minLevel = Math.min.apply(null, headings.map(headingLevel));
    var toc = buildTOC(headings, minLevel);
    document.body.appendChild(toc);

    updateActive(headings, toc);

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateActive(headings, toc);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Scripts load at bottom of <body>, so DOMContentLoaded may have already fired
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
