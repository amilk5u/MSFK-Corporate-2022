"use strict";
var winW;
var winH;
var $window = $(window);
var winSc = $(window).scrollTop();
var navAni;

$window.load(function () {
    var _this =  $(this);
    winW = _this.width();
    winH = _this.height();
    winSc = _this.scrollTop();
    $window.on("resize", function () {
        winW = _this.width();
        winH = _this.height();
    });
    _this.trigger("resize");
    $(window).scroll(function () {
        winSc = _this.scrollTop();
    });
    layout();
    main();
});
function layout() {
    var aArray = ['#visual', '#about', '#report', '#impetus', '#history', '#participation','#process', '#impact', '#together'];
    var count = 0;
    var $container = $("#container");
    var $header = $("header");
    var $footer = $("footer");
    var _windowH = $(window).height();
    var _htmlH = $("html,body").height();
    var $nav = $header.find("nav");

    // Up/Down nav
    function navi() {
        var _window = $("html, body");
        var $prev = $nav.find(".prev"),
            $next = $nav.find(".next");
        var _articleL = aArray.length;

        $prev.on("click",function() {
            count <= 0?count=0:count=count-1;
            TweenMax.to(_window,.5,{ scrollTop: $( aArray[count]).offset().top });
        });
        $next.on("click",function() {
            if(count >= _articleL){
                count=_articleL
            }else{
                if(_articleL > count+1){
                    count=count+1;
                }
            }
            TweenMax.to(_window,.5,{ scrollTop: $( aArray[count]).offset().top });
        });
    }
    navi();

    //donate button
    function donateBtn() {
        var $donaBtn = $footer.find(".donate_wrap");
        var _footerH = $footer.height();
        $(window).scroll(function(){
            if(window.scrollY + window.innerHeight >= document.body.clientHeight - _footerH) {
                $donaBtn.addClass("active");
            }else{
                $donaBtn.removeClass("active");
            }
        });
    }
    donateBtn();
}
function main() {
    var swiper_join= new Swiper('.join_swiper', {
        // slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        speed: 500,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}