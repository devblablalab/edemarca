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