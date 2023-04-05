const initShowHideText = () => {
  const blocks = document.querySelectorAll('[data-show-block]');

  if (!blocks.length) {
    return;
  }

  blocks.forEach((block) => {
    const toggle = block.querySelector('[data-show-toggle]');
    const text = block.querySelector('[data-show-text]');

    if (text && toggle) {
      const textInner = text.querySelector('.services__text-inner');
      const toggleText = toggle.querySelector('span');

      const showMoreText = toggle.dataset.showMore;
      const showLessText = toggle.dataset.showLess;

      const onToggleClick = () => {
        if (toggle.dataset.showToggle === 'hidden') {
          toggleText.textContent = showLessText;
          block.dataset.showBlock = 'shown';
          toggle.dataset.showToggle = 'shown';
          text.style.height = `${textInner.offsetHeight}px`;
        } else {
          toggleText.textContent = showMoreText;
          block.dataset.showBlock = 'hidden';
          toggle.dataset.showToggle = 'hidden';
          text.style.height = null;
        }
      };

      const onWindowResize = () => {
        toggle.style.display = null;

        if (textInner.offsetHeight <= text.offsetHeight) {
          toggle.style.display = 'none';
        }
      }

      if (textInner.offsetHeight <= text.offsetHeight) {
        toggle.style.display = 'none';
      }

      toggle.addEventListener('click', onToggleClick);

      window.addEventListener('resize', onWindowResize);
    }
  });
};

export {initShowHideText};
