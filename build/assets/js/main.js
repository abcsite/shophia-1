'use strict';

// Анимация выпадающего меню (или блока, состоящего из нескольких выпадающих меню)
function severalMenuToggleClick(selectorWrapMenu, selectorButton, selectorMenu, classToggle, hiddenOnClick) {

    var thisButton;

    $(selectorButton).click(function () {
        if (this == thisButton) {
            $(this).nextAll(selectorMenu).eq(0).toggleClass(classToggle);
        } else {
            $(selectorMenu).removeClass(classToggle);
            thisButton = this;
            $(this).nextAll(selectorMenu).eq(0).addClass(classToggle);
        }
    });

    $(selectorWrapMenu).on('mouseleave', function () {
        $(selectorMenu).removeClass(classToggle);
    });

    $(selectorMenu).click(function () {
        if (hiddenOnClick) {
            $(this).removeClass(classToggle);
        }
    });
}

// Кнопка плавного скрола в начало страницы.
function scrollToTopButton(selectorButton, scrollValueToggle, timeScroll, timeFadeButton) {
    var show_btn = false;
    var btn = $(selectorButton);

    $(document).on('scroll', function () {
        var scr = $(this).scrollTop();
        if (!show_btn && scr > scrollValueToggle) {
            btn.fadeIn(timeFadeButton);
            show_btn = true;
        } else if (show_btn && scr < scrollValueToggle) {
            btn.fadeOut(timeFadeButton);
            show_btn = false;
        }
    });

    btn.on('click', function () {
        $('html,body').animate({ scrollTop: 0 }, timeScroll);
    });
}

// Создание копии элемента формы "select" с помощью других тегов
// (для их последующей стилизации вместо элемента "select")
function cloneSelect(optionsCloneSelect) {

    var selectorForm = optionsCloneSelect.selectorForm || 'form',
        selectorSelect = optionsCloneSelect.selectorSelect || 'select',
        classNameCloneSelect = optionsCloneSelect.classNameCloneSelect || 'clone-select',
        classNameCloneSelected = optionsCloneSelect.classNameCloneSelected || 'clone-selected',
        classNameCloneButton = optionsCloneSelect.classNameCloneButton || 'clone-button',
        classNameCloneOption = optionsCloneSelect.classNameCloneOption || 'clone-option',
        htmlImageButton = optionsCloneSelect.htmlImageButton || '&#9660;';

    var form = $(selectorForm),
        select = $(selectorSelect),
        options = $(selectorSelect + ' option');

    var cloneSelect = $("<div></div>").appendTo(form).addClass(classNameCloneSelect),
        cloneSelected = $("<div></div>").appendTo(cloneSelect).addClass(classNameCloneSelected),
        cloneButton = $("<div></div>").appendTo(cloneSelect).addClass(classNameCloneButton),
        cloneButtonImg = $(cloneButton).html(htmlImageButton),
        cloneUl = $("<ul></ul>").appendTo(cloneSelect).addClass('clone-ul');

    select.css('display', 'none');

    var startValue = select.val();
    var startText = select.find('option[value=' + startValue + ']').text();

    cloneSelected.text(startText);

    options.each(function (index, element) {
        $("<li></li>").appendTo(cloneUl).addClass('clone-option').text($(element).text()).attr('data-value', $(element).val());
    });

    $('.clone-option').on('click', function () {
        $(select).val($(this).attr('data-value'));
        $(cloneSelected).text($(this).text());

        select.trigger('change');
    });
}

// function severalMenuToggleClick(selectorButton, selectorMenu, className) {
//     var thisButton;
//     var thisMenu;
//
//     // $(selectorMenu).toggleClass(className);
//
//     $(selectorButton).click(function () {
//         $(this).next(selectorMenu).toggleClass(className);
//         // $(this).next(selectorMenu).slideUp(500);
//     });
//     $(selectorMenu).on('mouseleave', function (event) {
//         thisButton = $(this).prev(selectorButton);
//         if (event.relatedTarget != thisButton) {
//             $(this).removeClass(className);
//         }
//     });
//     $(selectorButton).on('mouseleave', function (event) {
//         console.log($(this).next(selectorMenu));
//         thisMenu = $(this).next(selectorMenu);
//         if (event.relatedTarget.find(selectorMenu) != thisMenu) {
//             thisMenu.removeClass(className);
//         }
//     });
// }


// function menuToggleClick(selectorButton, selectorMenu, className) {
//
//
//
//     $(selectorButton).click(function () {
//         $(selectorMenu).removeClass("selected");
//         $(this).find(' + ' + selectorMenu).addClass("selected");
//         $(selectorMenu + ':not(.selected)').removeClass("menu-show");
//         $(this).parent().find('.nav-menu__list.selected').toggleClass("menu-show");
//     });
// }

window.onload = function () {

    $(document).ready(function () {
        $('.slick-slider').slick({
            arrows: false,
            dots: true,
            pauseOnDotsHover: true,
            // dotsClass: 'banner__slick-dots-indicators' ,
            fade: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            zIndex: 1000,
            waitForAnimate: false,
            // appendArrows: '.banner__arrow-left',
            // appendDots: '.banner__slick-dots',
            // prevArrow: '.banner__arrow-left',
            // nextArrow: '.banner__arrow-right',
            // swipe: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 1000,
            responsive: [{
                breakpoint: 900,
                settings: {}
            }, {
                breakpoint: 600,
                settings: {}
            }]
        });
    });

    scrollToTopButton('.footer__scroll-button', 800, 500, 300);

    severalMenuToggleClick('.top-line__account-block', '.top-line__button', '.top-line__account-list', 'menu-show', false);
    severalMenuToggleClick('.nav-bottom__wrap', '.nav-bottom__title', '.nav-bottom__list', 'menu-show', false);

    cloneSelect({
        selectorForm: '.header__form',
        selectorSelect: '.header__currency',
        classNameCloneSelect: 'clone-select',
        classNameCloneSelected: 'clone-selected',
        classNameCloneButton: 'clone-button',
        classNameCloneOption: 'clone-option',
        htmlImageButton: '<svg class="clone-button-img arrow-down" viewBox="0 0 128 128">' + '<use xlink:href="assets/img/svg/svg-symbols.svg#arrow-down"></use>' + '</svg>'
    });

    severalMenuToggleClick('.header__form', '.header__form .clone-selected, .header__form .clone-button', '.header__form .clone-ul', 'menu-show', true);

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
        var top = topElem.getBoundingClientRect().top;
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
        setTimeout(function () {
            clearInterval(timerId);
        }, 2000);
    }

    function hiddenFromScroll() {
        window.addEventListener('scroll', function () {
            setSliderMarginTopDelay();
            var scr = scrollY();
            if (scr < sliderMarginTop()) {
                removeClassHidden('hidden');
            } else {
                addClassHidden('hidden');
            }
        });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic2V2ZXJhbE1lbnVUb2dnbGVDbGljayIsInNlbGVjdG9yV3JhcE1lbnUiLCJzZWxlY3RvckJ1dHRvbiIsInNlbGVjdG9yTWVudSIsImNsYXNzVG9nZ2xlIiwiaGlkZGVuT25DbGljayIsInRoaXNCdXR0b24iLCIkIiwiY2xpY2siLCJuZXh0QWxsIiwiZXEiLCJ0b2dnbGVDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJvbiIsInNjcm9sbFRvVG9wQnV0dG9uIiwic2Nyb2xsVmFsdWVUb2dnbGUiLCJ0aW1lU2Nyb2xsIiwidGltZUZhZGVCdXR0b24iLCJzaG93X2J0biIsImJ0biIsImRvY3VtZW50Iiwic2NyIiwic2Nyb2xsVG9wIiwiZmFkZUluIiwiZmFkZU91dCIsImFuaW1hdGUiLCJjbG9uZVNlbGVjdCIsIm9wdGlvbnNDbG9uZVNlbGVjdCIsInNlbGVjdG9yRm9ybSIsInNlbGVjdG9yU2VsZWN0IiwiY2xhc3NOYW1lQ2xvbmVTZWxlY3QiLCJjbGFzc05hbWVDbG9uZVNlbGVjdGVkIiwiY2xhc3NOYW1lQ2xvbmVCdXR0b24iLCJjbGFzc05hbWVDbG9uZU9wdGlvbiIsImh0bWxJbWFnZUJ1dHRvbiIsImZvcm0iLCJzZWxlY3QiLCJvcHRpb25zIiwiYXBwZW5kVG8iLCJjbG9uZVNlbGVjdGVkIiwiY2xvbmVCdXR0b24iLCJjbG9uZUJ1dHRvbkltZyIsImh0bWwiLCJjbG9uZVVsIiwiY3NzIiwic3RhcnRWYWx1ZSIsInZhbCIsInN0YXJ0VGV4dCIsImZpbmQiLCJ0ZXh0IiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsImF0dHIiLCJ0cmlnZ2VyIiwid2luZG93Iiwib25sb2FkIiwicmVhZHkiLCJzbGljayIsImFycm93cyIsImRvdHMiLCJwYXVzZU9uRG90c0hvdmVyIiwiZmFkZSIsInBhdXNlT25Gb2N1cyIsInBhdXNlT25Ib3ZlciIsInpJbmRleCIsIndhaXRGb3JBbmltYXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzcGVlZCIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJkb2NFbGVtIiwiZG9jdW1lbnRFbGVtZW50IiwiaGVhZGVyRWxlbSIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BFbGVtIiwic2xpZGVyRWxlbSIsInNldFNsaWRlck1hcmdpblRvcERlbGF5Iiwib25yZXNpemUiLCJoaWRkZW5Gcm9tU2Nyb2xsIiwiYWRkQ2xhc3NIaWRkZW4iLCJvbm1vdXNlb3ZlciIsInJlbW92ZUNsYXNzSGlkZGVuIiwic2Nyb2xsWSIsInNsaWRlck1hcmdpblRvcCIsIm9ubW91c2VvdXQiLCJ0b3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRIZWlnaHQiLCJzZXRTbGlkZXJNYXJnaW5Ub3AiLCJzdHlsZSIsIm1hcmdpblRvcCIsInRpbWVySWQiLCJzZXRJbnRlcnZhbCIsInNldFRpbWVvdXQiLCJjbGVhckludGVydmFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhZ2VZT2Zmc2V0IiwiY2xhc3NIaWRkZW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxTQUFTQSxzQkFBVCxDQUFnQ0MsZ0JBQWhDLEVBQWtEQyxjQUFsRCxFQUNnQ0MsWUFEaEMsRUFDOENDLFdBRDlDLEVBQzJEQyxhQUQzRCxFQUMwRTs7QUFFdEUsUUFBSUMsVUFBSjs7QUFFQUMsTUFBRUwsY0FBRixFQUFrQk0sS0FBbEIsQ0FBd0IsWUFBWTtBQUNoQyxZQUFJLFFBQVFGLFVBQVosRUFBd0I7QUFDcEJDLGNBQUUsSUFBRixFQUFRRSxPQUFSLENBQWdCTixZQUFoQixFQUE4Qk8sRUFBOUIsQ0FBaUMsQ0FBakMsRUFBb0NDLFdBQXBDLENBQWdEUCxXQUFoRDtBQUNILFNBRkQsTUFHSztBQUNERyxjQUFFSixZQUFGLEVBQWdCUyxXQUFoQixDQUE0QlIsV0FBNUI7QUFDQUUseUJBQWEsSUFBYjtBQUNBQyxj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L0JZO0FBQ0EsWUFBSUcsVUFBVUMsWUFBWSxZQUFZO0FBQ2xDSjtBQUNILFNBRmEsRUFFWCxFQUZXLENBQWQ7QUFHQUssbUJBQVcsWUFBVztBQUNsQkMsMEJBQWNILE9BQWQ7QUFDSCxTQUZELEVBRUcsSUFGSDtBQUdIOztBQUdELGFBQVNiLGdCQUFULEdBQTRCO0FBQ3hCNUIsZUFBTzZDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQVk7QUFDMUNuQjtBQUNBLGdCQUFJNUQsTUFBTWtFLFNBQVY7QUFDQSxnQkFBSWxFLE1BQU1tRSxpQkFBVixFQUE2QjtBQUN6QkYsa0NBQWtCLFFBQWxCO0FBQ0gsYUFGRCxNQUdLO0FBQ0RGLCtCQUFlLFFBQWY7QUFDSDtBQUNKLFNBVEQ7QUFVSDs7QUFFRCxhQUFTRyxPQUFULEdBQW1CO0FBQ2YsZUFBT2hDLE9BQU84QyxXQUFQLElBQXNCMUIsUUFBUXJELFNBQXJDO0FBQ0g7O0FBRUQsYUFBUzhELGNBQVQsQ0FBd0JrQixXQUF4QixFQUFxQztBQUNqQ3pCLG1CQUFXMEIsU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUJGLFdBQXpCO0FBQ0F2QixnQkFBUXdCLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCRixXQUF0QjtBQUNIOztBQUVELGFBQVNoQixpQkFBVCxDQUEyQmdCLFdBQTNCLEVBQXdDO0FBQ3BDekIsbUJBQVcwQixTQUFYLENBQXFCRSxNQUFyQixDQUE0QkgsV0FBNUI7QUFDQXZCLGdCQUFRd0IsU0FBUixDQUFrQkUsTUFBbEIsQ0FBeUJILFdBQXpCO0FBQ0g7QUFDSixDQTNKRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g0JDQvdC40LzQsNGG0LjRjyDQstGL0L/QsNC00LDRjtGJ0LXQs9C+INC80LXQvdGOICjQuNC70Lgg0LHQu9C+0LrQsCwg0YHQvtGB0YLQvtGP0YnQtdCz0L4g0LjQtyDQvdC10YHQutC+0LvRjNC60LjRhSDQstGL0L/QsNC00LDRjtGJ0LjRhSDQvNC10L3RjilcclxuZnVuY3Rpb24gc2V2ZXJhbE1lbnVUb2dnbGVDbGljayhzZWxlY3RvcldyYXBNZW51LCBzZWxlY3RvckJ1dHRvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvck1lbnUsIGNsYXNzVG9nZ2xlLCBoaWRkZW5PbkNsaWNrKSB7XHJcblxyXG4gICAgdmFyIHRoaXNCdXR0b247XHJcblxyXG4gICAgJChzZWxlY3RvckJ1dHRvbikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzID09IHRoaXNCdXR0b24pIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5uZXh0QWxsKHNlbGVjdG9yTWVudSkuZXEoMCkudG9nZ2xlQ2xhc3MoY2xhc3NUb2dnbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJChzZWxlY3Rvck1lbnUpLnJlbW92ZUNsYXNzKGNsYXNzVG9nZ2xlKTtcclxuICAgICAgICAgICAgdGhpc0J1dHRvbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQodGhpcykubmV4dEFsbChzZWxlY3Rvck1lbnUpLmVxKDApLmFkZENsYXNzKGNsYXNzVG9nZ2xlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHNlbGVjdG9yV3JhcE1lbnUpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoc2VsZWN0b3JNZW51KS5yZW1vdmVDbGFzcyhjbGFzc1RvZ2dsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHNlbGVjdG9yTWVudSkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChoaWRkZW5PbkNsaWNrKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoY2xhc3NUb2dnbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy8g0JrQvdC+0L/QutCwINC/0LvQsNCy0L3QvtCz0L4g0YHQutGA0L7Qu9CwINCyINC90LDRh9Cw0LvQviDRgdGC0YDQsNC90LjRhtGLLlxyXG5mdW5jdGlvbiBzY3JvbGxUb1RvcEJ1dHRvbihzZWxlY3RvckJ1dHRvbiwgc2Nyb2xsVmFsdWVUb2dnbGUsIHRpbWVTY3JvbGwsIHRpbWVGYWRlQnV0dG9uKSB7XHJcbiAgICB2YXIgc2hvd19idG4gPSBmYWxzZTtcclxuICAgIHZhciBidG4gPSAkKHNlbGVjdG9yQnV0dG9uKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzY3IgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmICghc2hvd19idG4gJiYgc2NyID4gc2Nyb2xsVmFsdWVUb2dnbGUpIHtcclxuICAgICAgICAgICAgYnRuLmZhZGVJbih0aW1lRmFkZUJ1dHRvbik7XHJcbiAgICAgICAgICAgIHNob3dfYnRuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2hvd19idG4gJiYgc2NyIDwgc2Nyb2xsVmFsdWVUb2dnbGUpIHtcclxuICAgICAgICAgICAgYnRuLmZhZGVPdXQodGltZUZhZGVCdXR0b24pO1xyXG4gICAgICAgICAgICBzaG93X2J0biA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJ0bi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgdGltZVNjcm9sbCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbi8vINCh0L7Qt9C00LDQvdC40LUg0LrQvtC/0LjQuCDRjdC70LXQvNC10L3RgtCwINGE0L7RgNC80YsgXCJzZWxlY3RcIiDRgSDQv9C+0LzQvtGJ0YzRjiDQtNGA0YPQs9C40YUg0YLQtdCz0L7QslxyXG4vLyAo0LTQu9GPINC40YUg0L/QvtGB0LvQtdC00YPRjtGJ0LXQuSDRgdGC0LjQu9C40LfQsNGG0LjQuCDQstC80LXRgdGC0L4g0Y3Qu9C10LzQtdC90YLQsCBcInNlbGVjdFwiKVxyXG5mdW5jdGlvbiBjbG9uZVNlbGVjdChvcHRpb25zQ2xvbmVTZWxlY3QpIHtcclxuXHJcbiAgICB2YXIgc2VsZWN0b3JGb3JtID0gb3B0aW9uc0Nsb25lU2VsZWN0LnNlbGVjdG9yRm9ybSB8fCAnZm9ybScsXHJcbiAgICAgICAgc2VsZWN0b3JTZWxlY3QgPSBvcHRpb25zQ2xvbmVTZWxlY3Quc2VsZWN0b3JTZWxlY3QgfHwgJ3NlbGVjdCcsXHJcbiAgICAgICAgY2xhc3NOYW1lQ2xvbmVTZWxlY3QgPSBvcHRpb25zQ2xvbmVTZWxlY3QuY2xhc3NOYW1lQ2xvbmVTZWxlY3QgfHwgJ2Nsb25lLXNlbGVjdCcsXHJcbiAgICAgICAgY2xhc3NOYW1lQ2xvbmVTZWxlY3RlZCA9IG9wdGlvbnNDbG9uZVNlbGVjdC5jbGFzc05hbWVDbG9uZVNlbGVjdGVkIHx8ICdjbG9uZS1zZWxlY3RlZCcsXHJcbiAgICAgICAgY2xhc3NOYW1lQ2xvbmVCdXR0b24gPSBvcHRpb25zQ2xvbmVTZWxlY3QuY2xhc3NOYW1lQ2xvbmVCdXR0b24gfHwgJ2Nsb25lLWJ1dHRvbicsXHJcbiAgICAgICAgY2xhc3NOYW1lQ2xvbmVPcHRpb24gPSBvcHRpb25zQ2xvbmVTZWxlY3QuY2xhc3NOYW1lQ2xvbmVPcHRpb24gfHwgJ2Nsb25lLW9wdGlvbicsXHJcbiAgICAgICAgaHRtbEltYWdlQnV0dG9uID0gb3B0aW9uc0Nsb25lU2VsZWN0Lmh0bWxJbWFnZUJ1dHRvbiB8fCAnJiM5NjYwOyc7XHJcblxyXG4gICAgdmFyIGZvcm0gPSAkKHNlbGVjdG9yRm9ybSksXHJcbiAgICAgICAgc2VsZWN0ID0gJChzZWxlY3RvclNlbGVjdCksXHJcbiAgICAgICAgb3B0aW9ucyA9ICQoc2VsZWN0b3JTZWxlY3QgKyAnIG9wdGlvbicpO1xyXG5cclxuICAgIHZhciBjbG9uZVNlbGVjdCA9ICQoXCI8ZGl2PjwvZGl2PlwiKS5hcHBlbmRUbyhmb3JtKS5hZGRDbGFzcyhjbGFzc05hbWVDbG9uZVNlbGVjdCksXHJcbiAgICAgICAgY2xvbmVTZWxlY3RlZCA9ICQoXCI8ZGl2PjwvZGl2PlwiKS5hcHBlbmRUbyhjbG9uZVNlbGVjdCkuYWRkQ2xhc3MoY2xhc3NOYW1lQ2xvbmVTZWxlY3RlZCksXHJcbiAgICAgICAgY2xvbmVCdXR0b24gPSAkKFwiPGRpdj48L2Rpdj5cIikuYXBwZW5kVG8oY2xvbmVTZWxlY3QpLmFkZENsYXNzKGNsYXNzTmFtZUNsb25lQnV0dG9uKSxcclxuICAgICAgICBjbG9uZUJ1dHRvbkltZyA9ICQoY2xvbmVCdXR0b24pLmh0bWwoaHRtbEltYWdlQnV0dG9uKSxcclxuICAgICAgICBjbG9uZVVsID0gJChcIjx1bD48L3VsPlwiKS5hcHBlbmRUbyhjbG9uZVNlbGVjdCkuYWRkQ2xhc3MoJ2Nsb25lLXVsJyk7XHJcblxyXG4gICAgc2VsZWN0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgdmFyIHN0YXJ0VmFsdWUgPSBzZWxlY3QudmFsKCk7XHJcbiAgICB2YXIgc3RhcnRUZXh0ID0gc2VsZWN0LmZpbmQoJ29wdGlvblt2YWx1ZT0nICsgc3RhcnRWYWx1ZSArICddJykudGV4dCgpO1xyXG5cclxuICAgIGNsb25lU2VsZWN0ZWQudGV4dChzdGFydFRleHQpO1xyXG5cclxuICAgIG9wdGlvbnMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAkKFwiPGxpPjwvbGk+XCIpLmFwcGVuZFRvKGNsb25lVWwpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY2xvbmUtb3B0aW9uJylcclxuICAgICAgICAgICAgLnRleHQoJChlbGVtZW50KS50ZXh0KCkpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXZhbHVlJywgJChlbGVtZW50KS52YWwoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuY2xvbmUtb3B0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoc2VsZWN0KS52YWwoJCh0aGlzKS5hdHRyKCdkYXRhLXZhbHVlJykpO1xyXG4gICAgICAgICQoY2xvbmVTZWxlY3RlZCkudGV4dCgkKHRoaXMpLnRleHQoKSk7XHJcblxyXG4gICAgICAgIHNlbGVjdC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8vIGZ1bmN0aW9uIHNldmVyYWxNZW51VG9nZ2xlQ2xpY2soc2VsZWN0b3JCdXR0b24sIHNlbGVjdG9yTWVudSwgY2xhc3NOYW1lKSB7XHJcbi8vICAgICB2YXIgdGhpc0J1dHRvbjtcclxuLy8gICAgIHZhciB0aGlzTWVudTtcclxuLy9cclxuLy8gICAgIC8vICQoc2VsZWN0b3JNZW51KS50b2dnbGVDbGFzcyhjbGFzc05hbWUpO1xyXG4vL1xyXG4vLyAgICAgJChzZWxlY3RvckJ1dHRvbikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICQodGhpcykubmV4dChzZWxlY3Rvck1lbnUpLnRvZ2dsZUNsYXNzKGNsYXNzTmFtZSk7XHJcbi8vICAgICAgICAgLy8gJCh0aGlzKS5uZXh0KHNlbGVjdG9yTWVudSkuc2xpZGVVcCg1MDApO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgICAkKHNlbGVjdG9yTWVudSkub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuLy8gICAgICAgICB0aGlzQnV0dG9uID0gJCh0aGlzKS5wcmV2KHNlbGVjdG9yQnV0dG9uKTtcclxuLy8gICAgICAgICBpZiAoZXZlbnQucmVsYXRlZFRhcmdldCAhPSB0aGlzQnV0dG9uKSB7XHJcbi8vICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KTtcclxuLy8gICAgICQoc2VsZWN0b3JCdXR0b24pLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coJCh0aGlzKS5uZXh0KHNlbGVjdG9yTWVudSkpO1xyXG4vLyAgICAgICAgIHRoaXNNZW51ID0gJCh0aGlzKS5uZXh0KHNlbGVjdG9yTWVudSk7XHJcbi8vICAgICAgICAgaWYgKGV2ZW50LnJlbGF0ZWRUYXJnZXQuZmluZChzZWxlY3Rvck1lbnUpICE9IHRoaXNNZW51KSB7XHJcbi8vICAgICAgICAgICAgIHRoaXNNZW51LnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSk7XHJcbi8vIH1cclxuXHJcblxyXG4vLyBmdW5jdGlvbiBtZW51VG9nZ2xlQ2xpY2soc2VsZWN0b3JCdXR0b24sIHNlbGVjdG9yTWVudSwgY2xhc3NOYW1lKSB7XHJcbi8vXHJcbi8vXHJcbi8vXHJcbi8vICAgICAkKHNlbGVjdG9yQnV0dG9uKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgJChzZWxlY3Rvck1lbnUpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbi8vICAgICAgICAgJCh0aGlzKS5maW5kKCcgKyAnICsgc2VsZWN0b3JNZW51KS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4vLyAgICAgICAgICQoc2VsZWN0b3JNZW51ICsgJzpub3QoLnNlbGVjdGVkKScpLnJlbW92ZUNsYXNzKFwibWVudS1zaG93XCIpO1xyXG4vLyAgICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLm5hdi1tZW51X19saXN0LnNlbGVjdGVkJykudG9nZ2xlQ2xhc3MoXCJtZW51LXNob3dcIik7XHJcbi8vICAgICB9KTtcclxuLy8gfVxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5zbGljay1zbGlkZXInKS5zbGljayh7XHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgIHBhdXNlT25Eb3RzSG92ZXI6IHRydWUsXHJcbiAgICAgICAgLy8gZG90c0NsYXNzOiAnYmFubmVyX19zbGljay1kb3RzLWluZGljYXRvcnMnICxcclxuICAgICAgICBmYWRlOiBmYWxzZSxcclxuICAgICAgICBwYXVzZU9uRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgIHBhdXNlT25Ib3ZlcjogZmFsc2UsXHJcbiAgICAgICAgekluZGV4OiAxMDAwLFxyXG4gICAgICAgIHdhaXRGb3JBbmltYXRlOiBmYWxzZSxcclxuICAgICAgICAvLyBhcHBlbmRBcnJvd3M6ICcuYmFubmVyX19hcnJvdy1sZWZ0JyxcclxuICAgICAgICAvLyBhcHBlbmREb3RzOiAnLmJhbm5lcl9fc2xpY2stZG90cycsXHJcbiAgICAgICAgLy8gcHJldkFycm93OiAnLmJhbm5lcl9fYXJyb3ctbGVmdCcsXHJcbiAgICAgICAgLy8gbmV4dEFycm93OiAnLmJhbm5lcl9fYXJyb3ctcmlnaHQnLFxyXG4gICAgICAgIC8vIHN3aXBlOiBmYWxzZSxcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcclxuICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDkwMCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOntcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDYwMCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOntcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuICAgIHNjcm9sbFRvVG9wQnV0dG9uKCcuZm9vdGVyX19zY3JvbGwtYnV0dG9uJywgODAwLCA1MDAsIDMwMCk7XHJcblxyXG4gICAgc2V2ZXJhbE1lbnVUb2dnbGVDbGljaygnLnRvcC1saW5lX19hY2NvdW50LWJsb2NrJywgJy50b3AtbGluZV9fYnV0dG9uJyxcclxuICAgICAgICAnLnRvcC1saW5lX19hY2NvdW50LWxpc3QnLCAnbWVudS1zaG93JywgZmFsc2UpO1xyXG4gICAgc2V2ZXJhbE1lbnVUb2dnbGVDbGljaygnLm5hdi1ib3R0b21fX3dyYXAnLCAnLm5hdi1ib3R0b21fX3RpdGxlJyxcclxuICAgICAgICAnLm5hdi1ib3R0b21fX2xpc3QnLCAnbWVudS1zaG93JywgZmFsc2UpO1xyXG4gICAgXHJcbiAgICBjbG9uZVNlbGVjdCh7XHJcbiAgICAgICAgc2VsZWN0b3JGb3JtOiAnLmhlYWRlcl9fZm9ybScsXHJcbiAgICAgICAgc2VsZWN0b3JTZWxlY3Q6ICcuaGVhZGVyX19jdXJyZW5jeScsXHJcbiAgICAgICAgY2xhc3NOYW1lQ2xvbmVTZWxlY3Q6ICdjbG9uZS1zZWxlY3QnLFxyXG4gICAgICAgIGNsYXNzTmFtZUNsb25lU2VsZWN0ZWQ6ICdjbG9uZS1zZWxlY3RlZCcsXHJcbiAgICAgICAgY2xhc3NOYW1lQ2xvbmVCdXR0b246ICdjbG9uZS1idXR0b24nLFxyXG4gICAgICAgIGNsYXNzTmFtZUNsb25lT3B0aW9uOiAnY2xvbmUtb3B0aW9uJyxcclxuICAgICAgICBodG1sSW1hZ2VCdXR0b246XHJcbiAgICAgICAgICAgICc8c3ZnIGNsYXNzPVwiY2xvbmUtYnV0dG9uLWltZyBhcnJvdy1kb3duXCIgdmlld0JveD1cIjAgMCAxMjggMTI4XCI+JyArXHJcbiAgICAgICAgICAgICc8dXNlIHhsaW5rOmhyZWY9XCJhc3NldHMvaW1nL3N2Zy9zdmctc3ltYm9scy5zdmcjYXJyb3ctZG93blwiPjwvdXNlPicgK1xyXG4gICAgICAgICAgICAnPC9zdmc+J1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V2ZXJhbE1lbnVUb2dnbGVDbGljaygnLmhlYWRlcl9fZm9ybScsICcuaGVhZGVyX19mb3JtIC5jbG9uZS1zZWxlY3RlZCwgLmhlYWRlcl9fZm9ybSAuY2xvbmUtYnV0dG9uJyxcclxuICAgICAgICAnLmhlYWRlcl9fZm9ybSAuY2xvbmUtdWwnLCAnbWVudS1zaG93JywgdHJ1ZSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIHZhciBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG4gICAgICAgIGhlYWRlckVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKSxcclxuICAgICAgICB0b3BFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvcC1saW5lJyksXHJcbiAgICAgICAgc2xpZGVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKTtcclxuXHJcblxyXG4gICAgc2V0U2xpZGVyTWFyZ2luVG9wRGVsYXkoKTtcclxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IHNldFNsaWRlck1hcmdpblRvcERlbGF5O1xyXG5cclxuICAgIGhpZGRlbkZyb21TY3JvbGwoKTtcclxuXHJcbiAgICBhZGRDbGFzc0hpZGRlbignaGlkZGVuLXNtYWxsJyk7XHJcblxyXG4gICAgaGVhZGVyRWxlbS5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZW1vdmVDbGFzc0hpZGRlbignaGlkZGVuLXNtYWxsJyk7XHJcbiAgICAgICAgaWYgKHNjcm9sbFkoKSA+IHNsaWRlck1hcmdpblRvcCgpKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzSGlkZGVuKCdoaWRkZW4nKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldFNsaWRlck1hcmdpblRvcERlbGF5KCk7XHJcbiAgICB9O1xyXG4gICAgdG9wRWxlbS5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZW1vdmVDbGFzc0hpZGRlbignaGlkZGVuLXNtYWxsJyk7XHJcbiAgICAgICAgaWYgKHNjcm9sbFkoKSA+IHNsaWRlck1hcmdpblRvcCgpKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzSGlkZGVuKCdoaWRkZW4nKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldFNsaWRlck1hcmdpblRvcERlbGF5KCk7XHJcbiAgICB9O1xyXG4gICAgaGVhZGVyRWxlbS5vbm1vdXNlb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFkZENsYXNzSGlkZGVuKCdoaWRkZW4tc21hbGwnKTtcclxuICAgICAgICBpZiAoc2Nyb2xsWSgpID4gc2xpZGVyTWFyZ2luVG9wKCkpIHtcclxuICAgICAgICAgICAgYWRkQ2xhc3NIaWRkZW4oJ2hpZGRlbicpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2V0U2xpZGVyTWFyZ2luVG9wRGVsYXkoKTtcclxuICAgIH07XHJcbiAgICB0b3BFbGVtLm9ubW91c2VvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWRkQ2xhc3NIaWRkZW4oJ2hpZGRlbi1zbWFsbCcpO1xyXG4gICAgICAgIGlmIChzY3JvbGxZKCkgPiBzbGlkZXJNYXJnaW5Ub3AoKSkge1xyXG4gICAgICAgICAgICBhZGRDbGFzc0hpZGRlbignaGlkZGVuJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXRTbGlkZXJNYXJnaW5Ub3BEZWxheSgpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHNsaWRlck1hcmdpblRvcCgpIHtcclxuICAgICAgICB2YXIgdG9wID0gdG9wRWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgO1xyXG4gICAgICAgIHJldHVybiB0b3AgKyBoZWFkZXJFbGVtLmNsaWVudEhlaWdodCArIHRvcEVsZW0uY2xpZW50SGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0U2xpZGVyTWFyZ2luVG9wKCkge1xyXG4gICAgICAgIHNsaWRlckVsZW0uc3R5bGUubWFyZ2luVG9wID0gc2xpZGVyTWFyZ2luVG9wKCkgKyAncHgnO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0U2xpZGVyTWFyZ2luVG9wRGVsYXkoKSB7XHJcbiAgICAgICAgc2V0U2xpZGVyTWFyZ2luVG9wKCk7XHJcbiAgICAgICAgdmFyIHRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlck1hcmdpblRvcCgpO1xyXG4gICAgICAgIH0sIDUwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySWQpO1xyXG4gICAgICAgIH0sIDIwMDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRkZW5Gcm9tU2Nyb2xsKCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlck1hcmdpblRvcERlbGF5KCk7XHJcbiAgICAgICAgICAgIHZhciBzY3IgPSBzY3JvbGxZKCk7XHJcbiAgICAgICAgICAgIGlmIChzY3IgPCBzbGlkZXJNYXJnaW5Ub3AoKSkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NIaWRkZW4oJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NIaWRkZW4oJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzY3JvbGxZKCkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3A7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ2xhc3NIaWRkZW4oY2xhc3NIaWRkZW4pIHtcclxuICAgICAgICBoZWFkZXJFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NIaWRkZW4pO1xyXG4gICAgICAgIHRvcEVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc0hpZGRlbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3NIaWRkZW4oY2xhc3NIaWRkZW4pIHtcclxuICAgICAgICBoZWFkZXJFbGVtLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NIaWRkZW4pO1xyXG4gICAgICAgIHRvcEVsZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc0hpZGRlbik7XHJcbiAgICB9XHJcbn07Il19
