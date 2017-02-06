// Анимация выпадающего меню (или блока, состоящего из нескольких выпадающих меню)
function severalMenuToggleClick(selectorWrapMenu, selectorButton,
                                selectorMenu, classToggle, hiddenOnClick) {

    var thisButton;

    $(selectorButton).click(function () {
        if (this == thisButton) {
            $(this).nextAll(selectorMenu).eq(0).toggleClass(classToggle);
        }
        else {
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
        }
        else if (show_btn && scr < scrollValueToggle) {
            btn.fadeOut(timeFadeButton);
            show_btn = false;
        }
    });

    btn.on('click', function () {
        $('html,body').animate({scrollTop: 0}, timeScroll);
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
        $("<li></li>").appendTo(cloneUl)
            .addClass('clone-option')
            .text($(element).text())
            .attr('data-value', $(element).val());
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