import { getAjaxOptionsJson } from "./utils.js";

export function ajaxPromiseShirtsData() {
    return $.ajax(getAjaxOptionsJson('../../data/shirtsData.php'));
}