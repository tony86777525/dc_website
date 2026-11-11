// Keep the static page readable without JavaScript. Once enhanced, reveal only
// visible targets after scrolling (including CSS snap) has settled.
const targets = document.querySelectorAll<HTMLElement>(
  '#home .hero-avatar, #home .eyebrow, #home h1, #home .hero-bottom, #services .section-top, #services article, #work .section-top, #work .deck, #about > div, #process > .eyebrow, #process > h2, #process .process > div, #contact > *',
);
const loader = document.getElementById('scroll-loader');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && !motion.matches) {
  const visible = new Set<HTMLElement>();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastScroll = 0;
  const quietPeriod = 180;

  const reveal = () => {
    clearTimeout(timer);
    const remaining = quietPeriod - (performance.now() - lastScroll);
    if (remaining > 0) {
      timer = setTimeout(reveal, remaining);
      return;
    }
    for (const element of visible) {
      element.classList.remove('scroll-pending');
      element.classList.add('scroll-revealed');
      observer.unobserve(element);
    }
    visible.clear();
    if (loader) loader.hidden = true;
  };
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(reveal, quietPeriod);
  };
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (entry.isIntersecting) visible.add(element);
      else visible.delete(element);
    }
    schedule();
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  targets.forEach((target) => { target.classList.add('scroll-pending'); observer.observe(target); });
  window.addEventListener('scroll', () => {
    lastScroll = performance.now();
    // Only show a loader when unrevealed content is approaching the viewport.
    const pendingNearby = Array.from(targets).some((target) => {
      if (!target.classList.contains('scroll-pending')) return false;
      const rect = target.getBoundingClientRect();
      return rect.bottom > -window.innerHeight * .25 && rect.top < window.innerHeight * 1.25;
    });
    if (loader) loader.hidden = !pendingNearby;
    schedule();
  }, { passive: true });
  window.addEventListener('scrollend', reveal, { passive: true });
  motion.addEventListener('change', (event) => {
    if (!event.matches) return;
    clearTimeout(timer);
    observer.disconnect();
    if (loader) loader.hidden = true;
    targets.forEach((target) => target.classList.remove('scroll-pending', 'scroll-revealed'));
    visible.clear();
  });
}
