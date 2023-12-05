import { renderShirts } from './shirts.js';
import { ajaxPromiseShirtsData } from './ajax.js';
import './interactions.js'

$(document).ready(function() {
    async function initShirts() {
      const data = await ajaxPromiseShirtsData();
      renderShirts(data.reverse());
    }

    initShirts();
});


 
