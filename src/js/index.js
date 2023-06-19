import 'swiper/swiper.scss';
import 'swiper/modules/mousewheel/mousewheel.scss';
import '../scss/style.scss';


import './vendor/focus-visible-polyfill';

import {iosVhFix} from './utils/ios-vh-fix';
import {focusLock} from './utils/focus-lock';
import {scrollLock} from './utils/scroll-lock';

import {initSliderTabs} from './modules/sliders/slider-tabs';
import {initSliderBase} from './modules/sliders/slider-base';
import {initSliderPrice} from './modules/sliders/slider-price';

import {initTabs} from './modules/init-tabs';
import {initShowHideText} from './modules/init-show-hide-text';
import {initShowHideSlides} from './modules/init-show-hide-slides';

import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  initSliderTabs();
  initSliderBase();
  initSliderPrice();

  initTabs();
  initShowHideText();
  initShowHideSlides();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана

  window.addEventListener('load', () => {
    initModals();
  });
});

