import { renderShirts } from './shirts.js';
import { ajaxPromiseShirtsData } from './ajax.js';
import { toggleLearnMore, triggerSplashScreen, initLearnMoreHandle, initCloseButtonsHandle } from './interactions.js';

$(document).ready(function() {
    const $menuItems = $('.menu-item');

    async function initShirts() {
      const data = await ajaxPromiseShirtsData();
      renderShirts(data.reverse());
      triggerSplashScreen();
    }

    initShirts();
    initLearnMoreHandle();
    initCloseButtonsHandle();

    $menuItems.on('click',toggleLearnMore);
});


 
