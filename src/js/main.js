import { renderShirts } from './shirts.js';
import { ajaxPromiseShirtsData } from './ajax.js';
import { triggerSplashScreen } from './utils.js';

$(document).ready(function() {
    async function initShirts() {
      const data = await ajaxPromiseShirtsData();
      renderShirts(data.reverse());
      triggerSplashScreen();
    }

    initShirts();
});


 
