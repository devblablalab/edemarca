import { getAjaxOptionsJson } from "./utils.js";

export function ajaxPromiseShirtsData() {
    return $.ajax(getAjaxOptionsJson(`${window.location.origin}/public/data.json`));
}