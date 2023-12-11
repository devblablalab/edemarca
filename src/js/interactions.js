export function toggleLearnMore(e) {
    e.preventDefault();
    const targetId = this.dataset.targetId;
    if(targetId) {
        $(`${this.dataset.targetId}`).toggleClass('active');
    }
}

export function initLearnMoreHandles() {
    const $modal = $('#saiba-mais');
    const $close = $modal.find('#close');

    $close.on('click',() => {
        $modal.removeClass('active');
    });
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