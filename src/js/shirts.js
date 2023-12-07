import { getCenterRect, convertPxToInt } from "./utils.js";

function shirtsHasInvalidOptions(options) {
    const defaultOptions = ['id','left','zIndex'];
    return !options || typeof options !== 'object' || defaultOptions.every(option => options.hasOwnProperty(option)) === false;
}

function updateContainerPosition($container, deltaX, scrollSpeed) {
    const direction = deltaX > 0 ? '+=' : '-=';
    $container.css('left', `${direction}${scrollSpeed}px`);
}

function activateScrollView($activeItem, $containerStart, $containerSec) {
    $containerSec.removeClass('hide');
    $containerStart.addClass('hide');
    $activeItem[1].scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
}

function centerActiveShirtInfo(id) {
    const $shirtsInfoContainerStart = $('.shirts-info .shirts-container-info.start');
    const $shirtsInfoContainerNotStart = $('.shirts-info .shirts-container-info.not-start');
    const $activeShirtInfo = $(`[data-shirt-info-key="${id}"].active`);
    const shirtsToCheck = [];

    for (let index = 1; index <= 3; index++) {
        shirtsToCheck.push($shirtsInfoContainerStart[0].querySelector(`.shirt-info:nth-child(${index})`));
    }

    $activeShirtInfo.addClass('active');

    if ($.inArray($activeShirtInfo[0],shirtsToCheck) === -1) {
        return activateScrollView($activeShirtInfo,$shirtsInfoContainerStart, $shirtsInfoContainerNotStart);
    }
    $shirtsInfoContainerStart.removeClass('hide');
    return $shirtsInfoContainerNotStart.addClass('hide');

    // if(window.matchMedia("(min-width: 768px)").matches) {
    //     for (let index = 1; index <= 3; index++) {
    //         shirtsToCheck.push($shirtsInfoContainerStart[0].querySelector(`.shirt-info:nth-child(${index})`));
    //     }
    
    //     $activeShirtInfo.addClass('active');
    
    //     if ($.inArray($activeShirtInfo[0],shirtsToCheck) === -1) {
    //         return activateScrollView($activeShirtInfo,$shirtsInfoContainerStart, $shirtsInfoContainerNotStart);
    //     }
    //     $shirtsInfoContainerStart.removeClass('hide');
    //     return $shirtsInfoContainerNotStart.addClass('hide');
    // } else {
    //     activateScrollView($activeShirtInfo,$shirtsInfoContainerStart, $shirtsInfoContainerNotStart);
    // }
}

function activeShirtInfo(id) {
    const $shirtInfoElements = $('[data-shirt-info-key]');
    $shirtInfoElements.removeClass('active active-disabled');

    $(`[data-shirt-info-key="${id}"]`).addClass('active');
    centerActiveShirtInfo(id);
}

function updateShirtsLimitStates($shirtsContainer) {
    const $lastShirt = $shirtsContainer.find('.shirt:last');
    const lastVal = convertPxToInt($lastShirt.css('left'));
    const currentVal = convertPxToInt($shirtsContainer.css('left'));
    const $shirtsInfos = $('.shirts-info .shirts-container-info .shirt-info');
    const $contentToShowFirst = $('.show-first');
    const $contentToShowAfter = $('.show-after');

    $contentToShowFirst.addClass('d-none');
    $contentToShowAfter.removeClass('d-none');
    
    if(currentVal > 0) {
        $shirtsContainer.css('left','0px');
    } else if(currentVal <= 0 && Math.abs(currentVal) < lastVal ) {
        // aqui
    } else if(Math.abs(currentVal) >= lastVal) {
        $shirtsContainer.css('left',`-${lastVal - 5}px`)
    }
}

function selectCurrentShirtAndActiveInfo() {
    const $shirts = $(`.shirts .shirt`);
    const $arrowIcon = $('#arrow-info-icon');

    let minDistance = Number.MAX_SAFE_INTEGER;
    let $closestShirt;

    $shirts.each(function() {
        const shirtRect = this.getBoundingClientRect();
        const arrowIconRect = $arrowIcon[0].getBoundingClientRect();
        
        const shirtCenterX = getCenterRect(shirtRect);
        const arrowIconCenterX = getCenterRect(arrowIconRect);

        const distance = Math.abs(shirtCenterX - arrowIconCenterX);

        if (distance < minDistance) {
            minDistance = distance;
            $closestShirt = $(this);
        }
    });

    if ($closestShirt && $closestShirt.length) {
        activeShirtInfo($closestShirt.data('id'));
    }
}

function applySlideEvents($container) {
    if ($container.length) {
        let scrollSpeed = 40;
        let isDragging = false;
        let startEventX = 0;
        let totalDeltaX = 0;

        $container.on('mousedown touchstart', function (event) {
            event.preventDefault();
            isDragging = true;
            startEventX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
            scrollSpeed = event.type === 'mousedown' ? 40 : 80;
            totalDeltaX = 0;
        });
        
        $container.on('mousemove touchmove', function (event) {
            event.preventDefault();
            if (isDragging) {
                let endEventX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
                let deltaX = endEventX - startEventX;

                totalDeltaX += Math.abs(deltaX);
                updateContainerPosition($container, deltaX, scrollSpeed * (1 + totalDeltaX / 800));
                updateShirtsLimitStates($container);
                startEventX = endEventX;
                selectCurrentShirtAndActiveInfo();
            }
        });
        
        $container.on('mouseup mouseleave touchend', function (event) {
            event.preventDefault();
            isDragging = false;
        });

        $(window).on('wheel', function (event) {
            event.preventDefault();
            let delta = event.originalEvent.deltaY;

            updateContainerPosition($container, delta, scrollSpeed);
            updateShirtsLimitStates($container);
            selectCurrentShirtAndActiveInfo();
        });
    }
}

export function getShirtHtml(options) {
    if(shirtsHasInvalidOptions(options)) return '';

    const { id,left, zIndex } = options;

    return `
        <div data-id="${id}" class="shirt" style="left: ${left}; z-index: ${zIndex}">
            <svg viewBox="0 0 864 842" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M858.19 331.27L725.12 464.34C722.98 466.48 719.51 466.48 717.37 464.34L685.22 432.19C681.77 428.74 675.87 431.18 675.87 436.06V832.11C675.87 835.14 673.42 837.59 670.39 837.59H194.51C191.48 837.59 189.03 835.14 189.03 832.11V434.44C189.03 429.56 183.13 427.12 179.68 430.57L145.92 464.33C143.78 466.47 140.31 466.47 138.17 464.33L5.1 331.27C2.96 329.13 2.96 325.66 5.1 323.52L187.42 141.2C188.45 140.17 189.84 139.6 191.29 139.6H291.06C294.02 139.6 296.42 141.95 296.53 144.91C297.48 169.82 305.13 193.01 317.75 212.73C327.96 228.75 341.46 242.47 357.28 252.98C378.81 267.29 404.65 275.63 432.45 275.63C460.25 275.63 485.31 267.55 506.65 253.62C523.35 242.74 537.52 228.27 548.05 211.32C560.12 191.91 567.44 169.24 568.37 144.92C568.48 141.96 570.88 139.61 573.84 139.61H672C673.45 139.61 674.85 140.19 675.87 141.21L858.18 323.53C860.32 325.67 860.32 329.14 858.18 331.28L858.19 331.27Z" fill="white"/>
                <path d="M670.4 841.09H194.51C189.56 841.09 185.53 837.06 185.53 832.11V434.44C185.53 433.25 184.68 432.77 184.31 432.61C183.94 432.46 183 432.19 182.15 433.04L148.39 466.8C146.7 468.5 144.44 469.43 142.04 469.43C139.64 469.43 137.39 468.5 135.69 466.8L2.62 333.74C-0.880005 330.24 -0.880005 324.54 2.62 321.04L184.95 138.72C186.65 137.02 188.9 136.09 191.3 136.09H291.07C295.91 136.09 299.85 139.9 300.04 144.77C300.94 168.26 308.09 191.11 320.71 210.84C330.57 226.31 343.89 239.87 359.22 250.06C380.93 264.49 406.25 272.12 432.45 272.12C458.65 272.12 483.24 264.7 504.74 250.68C520.94 240.13 534.89 225.88 545.08 209.46C557.15 190.05 564 167.68 564.88 144.77C565.07 139.9 569.01 136.09 573.85 136.09H672.01C674.41 136.09 676.66 137.02 678.36 138.72L860.67 321.04C864.17 324.54 864.17 330.24 860.67 333.74L727.6 466.81C725.9 468.51 723.65 469.44 721.25 469.44C718.85 469.44 716.6 468.51 714.9 466.81L682.75 434.66C681.91 433.82 680.96 434.08 680.59 434.23C680.22 434.38 679.37 434.86 679.37 436.06V832.11C679.37 837.06 675.34 841.09 670.39 841.09H670.4ZM183.54 425.46C184.7 425.46 185.87 425.69 186.99 426.15C190.36 427.54 192.53 430.8 192.53 434.44V832.11C192.53 833.2 193.42 834.09 194.51 834.09H670.41C671.5 834.09 672.39 833.2 672.39 832.11V436.06C672.39 432.42 674.56 429.16 677.93 427.77C681.3 426.37 685.14 427.14 687.71 429.71L719.86 461.86C720.61 462.61 721.91 462.61 722.66 461.86L855.73 328.79C856.5 328.02 856.5 326.76 855.73 325.99L673.42 143.67C673.05 143.3 672.55 143.09 672.02 143.09H573.86C572.79 143.09 571.93 143.94 571.88 145.04C570.95 169.16 563.75 192.72 551.03 213.16C540.3 230.43 525.61 245.44 508.57 256.54C485.94 271.31 459.62 279.12 432.46 279.12C405.3 279.12 378.21 271.09 355.35 255.89C338.98 245.01 325.34 231.12 314.81 214.61C301.52 193.83 294 169.78 293.05 145.04C293.01 143.95 292.14 143.1 291.08 143.1H191.31C190.79 143.1 190.28 143.31 189.91 143.68L7.57 326C6.8 326.77 6.8 328.03 7.57 328.8L140.64 461.87C141.39 462.62 142.69 462.62 143.44 461.87L177.2 428.11C178.92 426.39 181.21 425.48 183.54 425.48V425.46Z" fill="#666666"/>
                <path d="M568.47 136.09H296.43V143.09H568.47V136.09Z" fill="#666666"/>
                <path d="M435.95 141.2H428.95V106.1C428.95 96.68 436.62 89.01 446.04 89.01C463.27 89.01 477.29 74.99 477.29 57.76V35.76C477.29 19.94 464.42 7.07999 448.61 7.07999C432.8 7.07999 419.93 19.95 419.93 35.76V36.68H412.93V35.76C412.93 16.09 428.94 0.0799866 448.61 0.0799866C468.28 0.0799866 484.29 16.09 484.29 35.76V57.76C484.29 78.85 467.13 96.01 446.04 96.01C440.48 96.01 435.95 100.54 435.95 106.1V141.2Z" fill="#666666"/>
            </svg>
        </div>
    `;
}

export function renderShirts(data) {
    if(!data) return;

    const $shirtsContainer = $('.shirts-container');
    const $shirts = $shirtsContainer.find('.shirts');
    const $shirtsInfo = $('.shirts-info');
    const $shirtsInfoContainer = $shirtsInfo.find('.container');

    const shirtOptions = {
        left: '0px',
        zIndex: 999
    };

    $shirts.append(data.map((item,index) => {
        shirtOptions.id = item.id;

        if(index > 0) {
            shirtOptions.left = convertPxToInt(shirtOptions.left) + 40 + 'px';
            shirtOptions.zIndex = shirtOptions.zIndex - 1;
        }
        return getShirtHtml(shirtOptions);
    }).join(''));

    $shirtsInfoContainer.append(data.map((item,index) => {
        return `
            <a href="${item.link}" target="_blank"
            data-shirt-info-key="${item.id}" class="shirt-info ${index == 0 ? 'active' : ''}">
                <p class="id-info">${item.id}.</p>
                <p>${item.brand.trim()}</p>
                <strong>${item.price.trim()}</strong>        
            </a>
        `
    }).join(''));
    
    applySlideEvents($shirts);
}  
