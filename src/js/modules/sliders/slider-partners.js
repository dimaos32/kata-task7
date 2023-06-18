import Swiper from 'swiper/swiper-bundle';

const GAP = 16; // px

const breakpoint = window.matchMedia('(max-width: 767px)');

const initSliderPartners = () => {
  const sliders = document.querySelectorAll('.slider-partners');

  if (!sliders.length) {
    return;
  }

  sliders.forEach((slider) => {
    const container = slider.querySelector('.slider-partners__container');
    const slides = container.querySelectorAll('.slider-partners__slide');

    const checkIfNeedNavigation = () => {
      if (breakpoint.matches) {
        const slideWidth = slides[0].offsetWidth;
        const slidesLength = slides.length * (slideWidth + GAP) - GAP;

        return slidesLength > slider.offsetWidth;
      }

      return false;
    };


    let swiper;
    let isNeedNavigation = checkIfNeedNavigation();

    const initSwiper = () => {
      swiper = new Swiper(container, {
        slidesPerView: 'auto',
        spaceBetween: GAP,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        threshold: 10,
        pagination: {
          el: '.slider-partners__pagination',
          bulletClass: 'slider-partners__bullet',
          bulletActiveClass: 'is-active',
          clickable: true,
        },
        breakpoints: {
          768: {
            enabled: false,
          },
        },
      });
    };

    const reInitSwiper = () => {
      if (swiper) {
        swiper.destroy(true, true);
      }

      initSwiper();
    };

    const onWindowResize = () => {
      if (breakpoint.matches) {
        const checkResult = checkIfNeedNavigation();

        if (isNeedNavigation !== checkResult) {
          isNeedNavigation = checkResult;
          reInitSwiper();
        }
      }
    };

    initSwiper();

    breakpoint.addListener(reInitSwiper);

    window.addEventListener('resize', onWindowResize);
  });
};

export {initSliderPartners};
