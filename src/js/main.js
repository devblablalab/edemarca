import { renderShirts } from './shirts.js';
import { ajaxPromiseShirtsData } from './ajax.js';
import { toggleLearnMore } from './interactions.js';
import { triggerSplashScreen } from './utils.js';

$(document).ready(function() {
    const $ctaLearnMore = $('.cta');

    async function initShirts() {
      const data = await ajaxPromiseShirtsData();
      renderShirts(data.reverse());
      triggerSplashScreen();
    }
    initShirts();

    $ctaLearnMore.on('click',toggleLearnMore);
});


 
