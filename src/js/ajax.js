import { getAjaxOptionsJson } from "./utils.js";

export function ajaxPromiseShirtsData() {
    return $.ajax(getAjaxOptionsJson('/public/data.json'));
}