var docElem = document.documentElement,
    elemExpand = document.querySelector('header');

elemExpand.classList.add("expand");


window.onload = function () {
    // marginTop();

    var elemHidden = document.querySelector('.top-line'),
        elemBottom = document.querySelector('.slider'),
        expandHeigth = elemExpand.clientHeight,
        hiddenHeigth = elemHidden.clientHeight;

    var changeHeaderOn = parseInt(hiddenHeigth) + parseInt(expandHeigth);

    elemBottom.style.marginTop = changeHeaderOn + 'px';

    function init() {
        window.addEventListener('scroll', scrollPage)
    }

    function scrollPage() {
        var scr = scrollY();
        if (scr >= changeHeaderOn) {
            elemExpand.classList.add("hidden");
            elemHidden.classList.add("hidden");
            elemExpand.classList.remove("expand");
        }
        else {
            elemExpand.classList.remove("hidden");
            elemHidden.classList.remove("hidden");
            elemExpand.classList.add("expand");
        }
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

    window.onresize = marginTop;

    // window.onresize = function () {
    //     if (scrollY() < changeHeaderOn) {
    //         marginTop;
    //     }
    // }


    function marginTop() {

        var docElem = document.documentElement,
            elemExpand = document.querySelector('header');

        elemExpand.classList.add("expand");

        var timeID = setTimeout(function () {
            var elemHidden = document.querySelector('.top-line'),
                elemBottom = document.querySelector('.slider'),
                expandHeigth = elemExpand.clientHeight,
                hiddenHeigth = elemHidden.clientHeight;

            var changeHeaderOn = parseInt(hiddenHeigth) + parseInt(expandHeigth);

            document.querySelector('.slider').style.marginTop = changeHeaderOn + 'px';
        }, 300);
    }
};





