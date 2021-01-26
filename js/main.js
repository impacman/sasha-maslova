// function isInternetExplorer() {
//     return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
// }
// if (!isInternetExplorer() === false) {
//     const app = document.querySelector('.app');
//     const textIE = 'Этот сайт <span>не</span> работает в браузере IE';

//     app.innerHTML = '';
//     app.insertAdjacentHTML(`beforeend`, `
//         <div class="app-ie">
//             <div class="app-ie__title">${textIE}</div>
//             <div class="app-ie__img">
//                 <span><img src="icons/smiling-face-with-sunglasses.png" alt="Smiling"></span>
//                 <span><img src="icons/alien.png" alt="Alien"></span>
//                 <span><img src="icons/exploding-head.png" alt="Exploding-head"></span>
//             </div>
//         </div>
//     `);
// }

const progressBar = document.querySelector('.progress-bar');
const section = document.querySelector('.section');
const body = document.querySelector('body');

const imgSrc = [
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'img/11.jpg',
    'img/12.jpg',
    'img/13.jpg',
    'img/14.jpg',
    'img/15.jpg',
    'img/16.jpg',
    'img/17.jpg',
    'img/18.jpg',
    'img/19.jpg',
    'img/20.jpg',
    'img/21.jpg',
    'img/22.jpg',
    'img/23.jpg',
    'img/24.jpg',
    'img/25.jpg',
    'img/26.jpg',
    'img/27.jpg',
    'img/28.jpg',
    'img/29.jpg',
    'img/30.jpg',
    'img/31.jpg',
    'img/32.jpg',
    'img/33.jpg',
    'img/34.jpg',
];

//--------------------- создаем столько элементов, сколько картинок в массиве
const functionImgSrc = (lezyload) => {
    let code = '';
    imgSrc.forEach(function (element) {
        code += `<div class="section__item item-lazyload item-open btn-pointer" data-bg="${element}" style="background-color: #f2f2f2";"></div>`;
    });

    section.insertAdjacentHTML(`beforeend`, code);

    lezyload();
};

//--------------------- progress bar
const functionProgressBar = () => {
    // отслеживаем кол. PX сверху у Body или DocumentElement
    let pxScrollTop = document.body.scrollTop || document.documentElement.scrollTop; 

    // отслеживаем высоту страницы
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // превращаем все в %
    let progress = pxScrollTop / windowHeight * 100;

    progressBar.style.height = progress + '%';
};

//--------------------- ленивая загрузка изрбражений
const lezyload = () => {
    const itemLazyLoad = document.querySelectorAll('.item-lazyload');

    itemLazyLoad.forEach((element) => {
        if (element.offsetTop > 0) {
            let elTop = element.offsetTop - 800;
            var stop = document.body.scrollTop || document.documentElement.scrollTop; 

            if (stop > elTop) {
                let bg = element.dataset.bg;
                if (bg && bg !== '') {
                    element.style = '';
                    element.style.backgroundImage = `url('${element.dataset.bg}')`;
                    // element.removeAttribute('data-bg');
                    element.classList.remove('item-lazyload');
                }
            }
        }
    })
}


functionImgSrc(lezyload);

window.addEventListener('scroll', function() {
    functionProgressBar();
    lezyload();
});

//--------------------- открыть | закрыть картинку
const bo = () => {
    const sectionItem = document.querySelectorAll('.section__item');
    const viewImg = document.querySelector('.view-img');
    const viewImgWrapImg = document.querySelector('.view-img__wrap-img');
    const next = document.querySelector('.view-img__btn_next');
    const prev = document.querySelector('.view-img__btn_prev');
    const close = document.querySelector('.view-img__close');

    let imgArr = [];
    
    sectionItem.forEach(function(p) {
        let url = p.getAttribute('data-bg');
        imgArr.push(url)

        p.addEventListener('click', function() {
            viewImg.classList.add('view-img_active');
            // body.style.overflow = 'hidden';

            let indexImg = imgArr.indexOf(url);
            let lengthImgArr = imgArr.length;

            console.log('indexImg: ' + (indexImg + 1));

            // if (indexImg >= 0 && lengthImgArr > 0) {                
            //     if (indexImg == 0 && lengthImgArr > 1) next.classList.add('view-img__btn_next-active');
            //     else if (indexImg == (lengthImgArr - 1) && lengthImgArr > 1) prev.classList.add('view-img__btn_prev-active');
            //     else {
            //         next.classList.add('view-img__btn_next-active');
            //         prev.classList.add('view-img__btn_prev-active');
            //     }
            // }

            let code = '';
            imgArr.forEach(function (element) {
                if (element === url) code += `<div class="view-img__img view-img__img_active"><img src="${element}"></div>`;
                else code += `<div class="view-img__img"></div>`;
            });
            viewImgWrapImg.insertAdjacentHTML(`beforeend`, code);
        })
    })

    close.addEventListener('click', function() {
        viewImg.classList.remove('view-img_active');
        // body.style.overflow = '';
    });
};
bo();