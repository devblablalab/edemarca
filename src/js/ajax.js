import { getAjaxOptionsJson } from "./utils.js";

export function ajaxPromiseShirtsData() {
    return $.ajax(getAjaxOptionsJson('../../public/data.json'));
    // return $.ajax(getAjaxOptionsJson('https://devblablalab.github.io/edemarca/public/data.json'));
}