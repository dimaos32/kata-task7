import Swiper from 'swiper/swiper-bundle';

const GAP = 4; // px

const breakpoint = window.matchMedia('(max-width: 1023px)');

const initSliderTabs = () => {
  const sliders = document.querySelectorAll('.slider-tabs');

  if (!sliders.length) {
    return;
  }

  sliders.forEach((slider) => {
    const container = slider.querySelector('.slider-tabs__container');
    const wrapper = container.querySelector('.slider-tabs__list');
    const slides = wrapper.querySelectorAll('.slider-tabs__item');

    const checkIfNeedNavigation = () => {
      const slideWidth = slides[0].offsetWidth;
      const slidesLength = slides.length * (slideWidth + GAP) - GAP;

      return slidesLength > slider.offsetWidth;
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
      });
    };

    const reInitSwiper = () => {
      if (swiper) {
        swiper.destroy(true, true);
      }

      if (breakpoint.matches) {
        initSwiper();
      }
    };

    const onWindowResize = () => {
      const checkResult = checkIfNeedNavigation();

      if (isNeedNavigation !== checkResult) {
        isNeedNavigation = checkResult;
        reInitSwiper();
      }
    };

    reInitSwiper();

    breakpoint.addListener(reInitSwiper);

    window.addEventListener('resize', onWindowResize);
  });
};

export {initSliderTabs};
