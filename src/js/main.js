import { renderShirts } from './shirts.js';
import { ajaxPromiseShirtsData } from './ajax.js';

$(document).ready(function() {
    async function initShirts() {
      const data = await ajaxPromiseShirtsData();
      renderShirts(data);
    }
    
    initShirts();
});


 
