import { renderShirts } from './shirts.js';
import { ajaxPromiseShirtsData } from './ajax.js';
import { toggleLearnMore, triggerSplashScreen, initLearnMoreHandles } from './interactions.js';

$(document).ready(function() {
    const $menuItems = $('.menu-item');

    async function initShirts() {
      const data = await ajaxPromiseShirtsData();
      renderShirts(data.reverse());
      triggerSplashScreen();
    }
    initShirts();

    initLearnMoreHandles();
    $menuItems.on('click',toggleLearnMore);
});


 
