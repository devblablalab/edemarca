import { getAjaxOptionsJson } from "./utils.js";

export function ajaxPromiseShirtsData() {
    return $.ajax(getAjaxOptionsJson('../../data/shirts.php'));
}

export function ajaxRenderComments() {
    $.ajax(getAjaxOptionsJson('../../data/comments.php'))
    .done(data => {
        if(!data) return;
        data.forEach(item => {
            const { fk_id_shirts, comment, username } = item; 
            const $currentComments = $(`.shirt[data-id="${fk_id_shirts}"] .comments`);
            const $noComments = $currentComments.find('.no-comments');

            if($currentComments.length === 0) return;

            if($noComments.length) {
                $currentComments.empty();
            }
            
            $currentComments.append(`
                <div class="comment">
                    <p class="username">@${username}</p>
                    <p class="message">${comment}.</p>
                </div>
            `);
        })
    })
}