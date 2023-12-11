import { isMobileScreen, isTabletScreen, isElementInViewport } from "./utils.js";

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

function handleItemSpaceVisibility(swiper, itemSpace) {
    const firstSlide = swiper.slides[0];
    const { x, width } = firstSlide.getBoundingClientRect();
    const isItemSpaceVisible = x + (width / 2) >= 0;

    if (isItemSpaceVisible) {
        return itemSpace.classList.remove('on-hide');
    }

    itemSpace.classList.add('on-hide');
}

function initializeShirtsSlider() {
    let swiperOptions = {
        slidesPerView: 'auto',
        spaceBetween: 40,
        freeMode: true
    };

    if(!isMobileScreen()) {
        swiperOptions.slidesPerView = isTabletScreen() ? 3 : 4;
        swiperOptions.spaceBetween = isTabletScreen() ? 40 : 80;
        swiperOptions.mousewheel = {
            invert: true,
        }
    }

    const shirtsSwiper = new Swiper('.shirts-container', swiperOptions);
    const swiperItems = document.querySelectorAll('.shirts-container .swiper-slide');
    const itemSpace = document.querySelector('.shirts-container .item-space');

    const swiperEvents = ['slideChange','touchMove'];
    swiperEvents.forEach(event => {
        shirtsSwiper.on(event, () => {
            updateActiveShirt(swiperItems)
            handleItemSpaceVisibility(shirtsSwiper, itemSpace);
        });
    });
}

export function getShirtHtml(shirtData) {
    const { id, brand, price } = shirtData;

    return `
        <div data-id="${id}" class="shirt swiper-slide">
            <div class="content">
                <div class="header">
                    <p>${id}.</p>
                    <button type="button">Avaliações</button>
                </div>
                <svg class="shirt-svg" viewBox="0 0 471 382" xmlns="http://www.w3.org/2000/svg">
                    <path d="M369.16 381.33H102.72V158.15L78.79 182.08L0.469971 103.76L103.59 0.640137H163.82V2.14014C163.82 15.9401 167.73 29.3401 175.12 40.9001C180.48 49.3201 187.73 56.6901 196.07 62.2401C207.88 70.0901 221.66 74.2401 235.91 74.2401C250.16 74.2401 263.54 70.2101 275.24 62.5701C284.05 56.8301 291.64 49.0801 297.19 40.1501C304.27 28.7601 308.01 15.6201 308.01 2.14014V0.640137H309.51H367.38L368.69 1.95013L470.5 103.76L392.18 182.08L369.13 159.03V381.33H369.16ZM105.72 378.33H366.16V151.78L392.21 177.83L466.28 103.76L366.17 3.64014H311.03C310.76 17.1501 306.88 30.3001 299.77 41.7401C293.99 51.0401 286.09 59.1101 276.91 65.0901C264.73 73.0401 250.56 77.2501 235.94 77.2501C221.32 77.2501 206.74 72.9301 194.43 64.7401C185.62 58.8901 178.27 51.4101 172.61 42.5201C165.18 30.9001 161.13 17.4901 160.85 3.64014H104.84L4.71997 103.76L78.79 177.83L105.72 150.9V378.32V378.33Z" fill="#666666"/>
                </svg> 
            </div>
            <div class="infos">
                <p class="brand">${brand}</p>
                <p class="price">R$ 
                    <span>
                        ${Number.isInteger(price) ? price.toString().replace('.', ',') : price.toFixed(2).replace('.', ',')}
                    </span>
                </p>
            </div>     
        </div>
    `;
}

export function renderShirts(data) {
    if(!data) return;
    const $shirtsContainer = $('.shirts-container');
    const $shirts = $shirtsContainer.find('.shirts');

    $shirts.append(data.map(item => getShirtHtml(item)).join(''));
    
    initializeShirtsSlider();
}  