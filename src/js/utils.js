export function getAjaxOptionsJson(url, method = 'GET', data = null, headers = {}) {
    const defaultMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    const checkMethod = defaultMethods.some(defaultMethod => defaultMethod === method.toUpperCase());

    const options = {
        headers,
        url,
        method : checkMethod ? method : 'GET',
        dataType: 'json'
    };

    if(data && typeof data === 'object') {
        options.data = data;
    }

    return options;
}

export function isDesktopDevice() {
    const userAgent = navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    return !mobileRegex.test(userAgent);
}

export function getCenterRect(elementRect) {
    return (elementRect.left + elementRect.right) / 2
}

export function convertPxToInt(pxString) {
    if(!pxString.includes('px')) return pxString;
    return parseInt(pxString.replace('px',''));
}

export function triggerSplashScreen() {
    const $splashScreen = $('#splash-screen');
    const delayTime = 2000;

    $('#splash-right').animate({
        'left': "-500000px",
    }, delayTime);
    
    $('#splash-left').animate({
        'left': "500000px",
    }, delayTime, function() {
        $splashScreen.remove();
    });

    setTimeout(function() {
        $splashScreen.css('z-index', 'unset');
    }, 800); 
}