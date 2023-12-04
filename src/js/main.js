import { renderShirts } from './shirts.js';
import { ajaxPromiseShirtsData } from './ajax.js';




$(document).ready(function() {
    async function initShirts() {
      const data = await ajaxPromiseShirtsData();
      renderShirts(data.reverse());

      $('#splash-right').animate({
        'left': "-500000px",
    }, 3000);
    
    $('#splash-left').animate({
        'left': "500000px",
    }, 3000, function() {
        $('#splash-screen').remove();
    });
    }

    initShirts();
});


 
