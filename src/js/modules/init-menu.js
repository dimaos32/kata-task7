const breakpoint = window.matchMedia('(min-width: 1024px)');

const menu = document.querySelector('.menu');
const header = document.querySelector('.header');

const initMenu = () => {
  if (!menu || !header) {
    return;
  }

  const overlay = menu.querySelector('.menu__overlay');
  const openMenuBtn = header.querySelector('.header__open-menu-btn');
  const closeMenuBtn = menu.querySelector('.menu__close-menu-btn');

  if (!menu) {
    return;
  }

  const onOverlayClick = () => {
    closeMenu();
  };

  const onEscPress = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      closeMenu();
    }
  };

  const openMenu = () => {
    menu.classList.add('is-opened');

    window.focusLock.lock('.main-nav', false);
    window.scrollLock.disableScrolling();

    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onEscPress);
  };

  const closeMenu = () => {
    menu.classList.remove('is-opened');

    window.focusLock.unlock(false);
    window.scrollLock.enableScrolling();

    overlay.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onEscPress);
  };

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      if (menu.classList.contains('is-opened')) {
        closeMenu();
      }
    } else {
      menu.style.transition = 'none';

      setTimeout(() => {
        menu.style.transition = null;
      }, 10);
    }
  };

  breakpointChecker();
  breakpoint.addListener(breakpointChecker);

  openMenuBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
};

export {initMenu};
