import { initCloseButtonsHandle, initReviewsHandles } from "./interactions.js";
import { isMobileScreen, isTabletScreen } from "./utils.js";

function getMiddleIndex(items) {
    const container = document.querySelector('.shirts-container');
    const containerRect = container.getBoundingClientRect();
    const middleX = containerRect.left + containerRect.width / 2;

    let minDistance = Infinity;
    let middleIndex = 0;

    items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemX = itemRect.left + itemRect.width / 2;

        const distance = Math.abs(middleX - itemX);

        if (distance < minDistance) {
            minDistance = distance;
            middleIndex = index;
        }
    });

    return middleIndex;
}

function updateActiveShirt(items) {
    const middleIndex = getMiddleIndex(items);
    items.forEach(item => item.classList.remove('active-shirt'));
    items[middleIndex].classList.add('active-shirt');
}

function initializeShirtsSlider() {
    let swiperOptions = {
        slidesPerView: 'auto',
        spaceBetween: 40,
        freeMode: true
    };

    if(!isMobileScreen()) {
        $(document).on('mousemove', function (e) {
            if ($(e.target).closest('.reviews').length) {
                shirtsSwiper.mousewheel.disable();
            } else {
                shirtsSwiper.mousewheel.enable();
            }
        });
    
        swiperOptions.slidesPerView = isTabletScreen() ? 2 : 4;
        swiperOptions.spaceBetween = isTabletScreen() ? 40 : 80;
        swiperOptions.mousewheel = {
            invert: true,
        };
    }

    const shirtsSwiper = new Swiper('.shirts-container', swiperOptions);
    const swiperItems = document.querySelectorAll('.shirts-container .swiper-slide');

    const swiperEvents = ['slideChange', 'touchMove'];
    swiperEvents.forEach(event => {
        shirtsSwiper.on(event, () => updateActiveShirt(swiperItems));
    });

    $(document).on('keydown', function (e) {
        switch(e.key) {
            case 'ArrowRight':
                shirtsSwiper.slideNext();
            case 'ArrowLeft':
                shirtsSwiper.slidePrev();
        }
    });
}   

export function getShirtHtml(shirtData) {
    const { id, brand, price } = shirtData;

    return `
        <div data-id="${id}" class="shirt swiper-slide">
            <div class="content">
                <div class="header">
                    <p class="order-id">${id}.</p> 
                    <p class="brand">${brand}</p>
                </div>
                <div class="body">
                    <svg class="shirt-svg" viewBox="0 0 471 382" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M468.33 103.49L392.14 179.69L367.59 155.14V379.57H104.14V154.27L78.71 179.7L2.51001 103.5L104.13 1.88013H162.24C162.24 16.4501 166.47 30.0201 173.77 41.4501C179.3 50.1201 186.6 57.5401 195.16 63.2301C206.81 70.9801 220.79 75.4801 235.83 75.4801C250.87 75.4801 264.43 71.1101 275.98 63.5701C285.02 57.6801 292.68 49.8501 298.38 40.6801C305.39 29.4201 309.43 16.1301 309.43 1.88013H366.68L367.55 2.75012L468.3 103.5L468.33 103.49Z" fill="white"/>
                            <path d="M369.08 381.06H102.64V157.88L78.72 181.81L0.400024 103.49L103.52 0.370117H163.76V1.87012C163.76 15.6701 167.67 29.0701 175.06 40.6301C180.42 49.0501 187.67 56.4201 196.01 61.9701C207.82 69.8201 221.6 73.9701 235.86 73.9701C250.12 73.9701 263.49 69.9401 275.19 62.3001C284 56.5601 291.59 48.8101 297.14 39.8801C304.22 28.4901 307.96 15.3501 307.97 1.87012V0.370117H309.47H367.34L470.45 103.49L392.13 181.81L369.08 158.76V381.06ZM105.64 378.06H366.08V151.51L392.13 177.56L466.2 103.49L366.09 3.37012H310.95C310.68 16.8801 306.8 30.0301 299.69 41.4701C293.91 50.7701 286.01 58.8501 276.83 64.8201C264.65 72.7701 250.48 76.9801 235.86 76.9801C221.24 76.9801 206.66 72.6601 194.35 64.4701C185.54 58.6101 178.19 51.1401 172.53 42.2501C165.1 30.6301 161.05 17.2201 160.77 3.37012H104.76L4.64002 103.49L78.71 177.56L105.63 150.63V378.05L105.64 378.06Z" fill="#666666"/>
                    </svg>
                    <div class="infos">
                        <p class="price">
                            <span class="symbol">R$</span> 
                            <span class="value">
                                ${Number.isInteger(price) ? price.toString().replace('.', ',') : price.toFixed(2).replace('.', ',')}
                            </span>
                        </p>      
                    </div>  
                    <button class="handle-reviews" type="button">Avaliações</button>
                    <div class="reviews">
                        <div class="content">
                            <div class="close handle-close">
                                <svg viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.94847 0.203143L0.827148 2.32446L35.3835 36.8808L37.5048 34.7595L2.94847 0.203143Z" />
                                    <path d="M35.3835 0.210297L0.827148 34.7666L2.94847 36.8879L37.5048 2.33162L35.3835 0.210297Z" />
                                </svg>
                            </div>
                            <p class="warning">Comente sobre essa marca no nosso vídeo pra aparecer aqui</p>
                            <div class="comments">
                                <div class="notfound">Sem comentários..</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Comment Example
    // <div class="comment">
    //     <p class="username">@phpjsp</p>
    //     <p class="message">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor.</p>
    // </div>
}

export function renderShirts(data) {
    if (!data) return;
    const $shirtsContainer = $('.shirts-container');
    const $shirts = $shirtsContainer.find('.shirts');

    const itemsHtml = data.map(item => getShirtHtml(item)).join('');
    const lastItemHtml = getShirtHtml(data[data.length - 1]);
    const lastItemHiddenHtml = lastItemHtml;
    [itemsHtml,lastItemHiddenHtml,lastItemHiddenHtml].forEach(html => $shirts.append(html));
    
    initializeShirtsSlider();
    initReviewsHandles();
    initCloseButtonsHandle();
}  