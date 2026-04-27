// ========================================
// FLYHIGH PAGE - TABS & INTERACTIONS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  
  // Tab Switching Logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = btn.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
      });

      // Add active class to clicked button and target content
      btn.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'grid';
      }
    });
  });

  // Smooth scroll for anchor links with navbar offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Track CTA clicks
  document.querySelectorAll('.flyhigh-cta-group a, .flyhigh-cta a, .tab-cta').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      console.log(`Flyhigh CTA Clicked: ${label}`);
    });
  });
});
