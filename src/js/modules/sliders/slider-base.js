const GAP = 20; // px

const breakpoint1239 = window.matchMedia('(max-width: 1239px)');
const breakpoint1023 = window.matchMedia('(max-width: 1023px)');

const calculateSlidesPerView = () => {
  if (document.documentElement.clientWidth > 1239) {
    return 4;
  } else if (document.documentElement.clientWidth > 1023) {
    return 3;
  } else {
    return 1;
  }
};

const initSliderBase = () => {
  const sliders = document.querySelectorAll('.slider-base');

  if (!sliders.length) {
    return;
  }

  sliders.forEach((slider) => {
    const container = slider.querySelector('.slider-base__container');
    const wrapper = container.querySelector('.slider-base__wrapper');
    const slides = container.querySelectorAll('.slider-base__slide');
    const prevBtn = slider.querySelector('.slider-btn--prev');
    const nextBtn = slider.querySelector('.slider-btn--next');
    const navigation = {
      prevEl: prevBtn,
      nextEl: nextBtn,
    };

    const checkIfNeedNavigation = () => {
      if (breakpoint1023.matches) {
        const slideWidth = slides[0].offsetWidth;
        const slidesLength = slides.length * (slideWidth + GAP) - GAP;

        return slidesLength > slider.offsetWidth;
      }

      return slides.length > slidesPerView;
    };


    let swiper;
    let slidesPerView = calculateSlidesPerView();
    let isNeedNavigation = checkIfNeedNavigation();

    const initSwiper = () => {
      // eslint-disable-next-line no-undef
      swiper = new Swiper(container, {
        slidesPerView: 'auto',
        spaceBetween: GAP,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        threshold: 10,
        navigation,
        breakpoints: {
          1024: {
            slidesPerView,
          },
        },
      });

      if (isNeedNavigation) {
        wrapper.classList.remove('is-centered');
      } else {
        wrapper.classList.add('is-centered');
      }
    };

    const reInitSwiper = () => {
      slidesPerView = calculateSlidesPerView();

      if (swiper) {
        swiper.destroy(true, true);
      }

      initSwiper();
    };

    const onWindowResize = () => {
      if (breakpoint1239.matches) {
        const checkResult = checkIfNeedNavigation();

        if (isNeedNavigation !== checkResult) {
          isNeedNavigation = checkResult;
          reInitSwiper();
        }
      }
    };

    initSwiper();

    breakpoint1239.addListener(reInitSwiper);
    breakpoint1023.addListener(reInitSwiper);

    window.addEventListener('resize', onWindowResize);
  });
};

export {initSliderBase};
