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

function screenMaxMatches(size) {
    return window.matchMedia(`(max-width:${size}px)`).matches;
}

export function isTabletScreen() {
    return screenMaxMatches(1024);
}

export function isMobileScreen() {
    return screenMaxMatches(767);
}

export function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
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