$('.portfolio-button').mousedown(function(){
    timeout = setInterval(function(){
        window.scrollBy(0,-1); // May need to be -1 to go down
    }, 0); // Play around with this number. May go too fast

    return false;
});


// Put this in script.js or before </body>
(function(){
  // only run this for touch-capable devices (avoids interfering with desktop hover)
  if (!('ontouchstart' in window)) return;

  const cards = document.querySelectorAll('.portfolio-card');

  function closeAll() {
    cards.forEach(c => c.classList.remove('open'));
  }

  document.addEventListener('touchstart', (e) => {
    // if user touches outside any card, close all
    const insideCard = e.target.closest('.portfolio-card');
    if (!insideCard) closeAll();
  }, {passive: true});

  cards.forEach(card => {
    // Listen for click; on touch devices click event fires after touch
    card.addEventListener('click', function (ev) {
      // If the card already has .open, allow the link to proceed (do nothing)
      if (card.classList.contains('open')) {
        // let link proceed normally
        return;
      }
      // Otherwise prevent navigation and open overlay
      ev.preventDefault();
      closeAll();
      card.classList.add('open');

      // Optional: auto-close after X ms (uncomment if you want)
      // setTimeout(() => card.classList.remove('open'), 5000);
    });
  });

  // Also support keyboard users: toggle .open when focused + Enter pressed
  cards.forEach(card => {
    card.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        if (card.classList.contains('open')) {
          // follow link if already open
          const a = card.closest('a') || card;
          if (a && a.href) window.location.href = a.href;
        } else {
          closeAll();
          card.classList.add('open');
        }
      }
    });
  });

})();

// Mobile: first tap opens overlay, second tap follows link
(function(){
  if (!('ontouchstart' in window)) return; // only run on touch devices

  const cards = document.querySelectorAll('.portfolio-card');

  function closeAll() {
    cards.forEach(c => c.classList.remove('open'));
  }

  document.addEventListener('touchstart', (e) => {
    const insideCard = e.target.closest('.portfolio-card');
    if (!insideCard) closeAll();
  }, {passive: true});

  cards.forEach(card => {
    card.addEventListener('click', function (ev) {
      if (card.classList.contains('open')) {
        // allow navigation to proceed
        return;
      }
      // prevent first navigation, open overlay instead
      ev.preventDefault();
      closeAll();
      card.classList.add('open');
    });

    // keyboard accessibility: Enter/Space toggles open or follows
    card.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        if (card.classList.contains('open')) {
          const a = card.closest('a') || card;
          if (a && a.href) window.location.href = a.href;
        } else {
          closeAll();
          card.classList.add('open');
        }
      }
    });
  });
})();


