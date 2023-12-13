function handleCloseClosestActive() {
    $(this).closest('.active').removeClass('active');
}

function handleReviews() {
    $(this).parent().find('.reviews').toggleClass('active');
}

export function toggleLearnMore(e) {
    e.preventDefault();
    const targetId = this.dataset.targetId;
    if(targetId) {
        $(`${this.dataset.targetId}`).toggleClass('active');
    }
}

export function initLearnMoreHandle() {
    const $modal = $('#saiba-mais');
    $modal.on('click',(e) => {
        if(e.target === e.currentTarget) {
            $(e.currentTarget).removeClass('active');
        }
    });
}

export function initCloseButtonsHandle() {
    const $closeBtns = $('.handle-close');
    $closeBtns.click(handleCloseClosestActive);
}

export function initReviewsHandles() {
    const $handleReviewsBtns = $('.handle-reviews');
    $handleReviewsBtns.click(handleReviews);
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
    }, 1100); 
}