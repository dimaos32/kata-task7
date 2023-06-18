const initShowHideSlides = () => {
  const blocks = document.querySelectorAll('[data-show-slides-block]');

  if (!blocks.length) {
    return;
  }

  blocks.forEach((block) => {
    const toggle = block.querySelector('[data-show-toggle]');
    const slides = block.querySelector('[data-show-slides]');

    if (slides && toggle) {
      const toggleText = toggle.querySelector('span');
      const slidesInner = slides.querySelector('[data-show-slides-container');

      const showMoreText = toggle.dataset.showMore;
      const showLessText = toggle.dataset.showLess;

      const height = Number(slides.dataset.showSlides);

      slides.style.height = `${height}px`;

      const onToggleClick = () => {
        if (toggle.dataset.showToggle === 'hidden') {
          toggleText.textContent = showLessText;
          block.dataset.showBlock = 'shown';
          toggle.dataset.showToggle = 'shown';
          slides.style.height = `${slidesInner.offsetHeight}px`;
        } else {
          toggleText.textContent = showMoreText;
          block.dataset.showBlock = 'hidden';
          toggle.dataset.showToggle = 'hidden';
          slides.style.height = `${height}px`;
        }
      };

      const onWindowResize = () => {
        toggle.style.display = null;

        if (slidesInner.offsetHeight <= height) {
          toggle.style.display = 'none';
        }
      }

      if (slidesInner.offsetHeight <= height) {
        toggle.style.display = 'none';
      }

      toggle.addEventListener('click', onToggleClick);

      window.addEventListener('resize', onWindowResize);
    }
  });
};

export {initShowHideSlides};
