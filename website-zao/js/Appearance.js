document.addEventListener('DOMContentLoaded', () => {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If the element has a delay in the data attribute, use it
        const delay = entry.target.getAttribute('data-delay') || 0;

        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay);

        revealObserver.unobserve(entry.target); // We animate only once
      }
    });
  }, { threshold: 0.15 });

  // Find all elements with the reveal class
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
