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