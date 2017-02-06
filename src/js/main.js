//= myfunc.js

window.onload = function () {

//= slick-carousel_script.js

    scrollToTopButton('.footer__scroll-button', 800, 500, 300);

    severalMenuToggleClick('.top-line__account-block', '.top-line__button',
        '.top-line__account-list', 'menu-show', false);
    severalMenuToggleClick('.nav-bottom__wrap', '.nav-bottom__title',
        '.nav-bottom__list', 'menu-show', false);
    
    cloneSelect({
        selectorForm: '.header__form',
        selectorSelect: '.header__currency',
        classNameCloneSelect: 'clone-select',
        classNameCloneSelected: 'clone-selected',
        classNameCloneButton: 'clone-button',
        classNameCloneOption: 'clone-option',
        htmlImageButton:
            '<svg class="clone-button-img arrow-down" viewBox="0 0 128 128">' +
            '<use xlink:href="assets/img/svg/svg-symbols.svg#arrow-down"></use>' +
            '</svg>'
    });

    severalMenuToggleClick('.header__form', '.header__form .clone-selected, .header__form .clone-button',
        '.header__form .clone-ul', 'menu-show', true);





    var docElem = document.documentElement,
        headerElem = document.querySelector('header'),
        topElem = document.querySelector('.top-line'),
        sliderElem = document.querySelector('.slider');


    setSliderMarginTopDelay();
    window.onresize = setSliderMarginTopDelay;

    hiddenFromScroll();

    addClassHidden('hidden-small');

    headerElem.onmouseover = function () {
        removeClassHidden('hidden-small');
        if (scrollY() > sliderMarginTop()) {
            removeClassHidden('hidden');
        };
        setSliderMarginTopDelay();
    };
    topElem.onmouseover = function () {
        removeClassHidden('hidden-small');
        if (scrollY() > sliderMarginTop()) {
            removeClassHidden('hidden');
        };
        setSliderMarginTopDelay();
    };
    headerElem.onmouseout = function () {
        addClassHidden('hidden-small');
        if (scrollY() > sliderMarginTop()) {
            addClassHidden('hidden');
        };
        setSliderMarginTopDelay();
    };
    topElem.onmouseout = function () {
        addClassHidden('hidden-small');
        if (scrollY() > sliderMarginTop()) {
            addClassHidden('hidden');
        };
        setSliderMarginTopDelay();
    };



    function sliderMarginTop() {
        var top = topElem.getBoundingClientRect().top ;
        return top + headerElem.clientHeight + topElem.clientHeight;
    }
    function setSliderMarginTop() {
        sliderElem.style.marginTop = sliderMarginTop() + 'px';
    }
    function setSliderMarginTopDelay() {
        setSliderMarginTop();
        var timerId = setInterval(function () {
            setSliderMarginTop();
        }, 50);
        setTimeout(function() {
            clearInterval(timerId);
        }, 2000);
    }


    function hiddenFromScroll() {
        window.addEventListener('scroll', function () {
            setSliderMarginTopDelay();
            var scr = scrollY();
            if (scr < sliderMarginTop()) {
                removeClassHidden('hidden');
            }
            else {
                addClassHidden('hidden');
            }
        })
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    function addClassHidden(classHidden) {
        headerElem.classList.add(classHidden);
        topElem.classList.add(classHidden);
    }

    function removeClassHidden(classHidden) {
        headerElem.classList.remove(classHidden);
        topElem.classList.remove(classHidden);
    }
};



