import { getAjaxOptionsJson } from "./utils.js";

export function ajaxPromiseShirtsData() {
    return $.ajax(getAjaxOptionsJson('https://devblablalab.github.io/edemarca/public/data.json'));
}