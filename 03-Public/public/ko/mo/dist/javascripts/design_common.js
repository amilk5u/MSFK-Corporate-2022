"use strict";
var winW;
var winH;
var $window = $(window);
var winSc = $(window).scrollTop();
var $header = $("#header");
var $html = $("html");
var controller = null;
//gnb
var $gnb = $("#gnb"),
    $navBtn = $gnb.find("button");

//배열 순차 더한 값
var triggerScrVar = [];

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
    main();
});
function main() {

    const $header = $("header"),
        $logo = $header.find("h1");

    // sec1 intro image motion
    const $sec1 = $(".sec1"),
        $sec1Txt = $sec1.find("span, h1, p"),
        $personImg1 = $sec1.find(".person_img img:nth-of-type(even)"),
        $personImg2 = $sec1.find(".person_img img:nth-of-type(odd)");

    let introTimeline = gsap.timeline();
    introTimeline
        .to($sec1.find("span"), 1.3, {opacity:1, delay:.2})
        .to($sec1.find("h1"), 2.3, {opacity:1, delay:-.8})
        .to($sec1.find(".video_wrap"), 1.5, {opacity:1, delay:-1.8})
    // 구성원 이미지 순차적으로 fade in
    TweenMax.staggerTo($personImg1, 1.5, {opacity:1, scale:1, delay:1, ease:Circ.easeOut}, .1);
    TweenMax.staggerTo($personImg2, 1.5, {opacity:1, scale:1, delay:1, ease:Circ.easeOut}, .1);

    gsap.to($personImg1, .8, { y:-3.5, repeat:-1, yoyo:true });
    gsap.to($personImg2, .7, { y:-5, repeat:-1, yoyo:true });


    // sec4 window motion
    const $windowImg = $(".window_img img");
    // 이미지 순차적으로 fade In / Out
    let _autoImgTimeline = gsap.timeline().repeat(-1);
    _autoImgTimeline
        .to($windowImg.eq(0), 1.2, {opacity: 0, delay: 2})
        .to($windowImg.eq(1), 1.2, {opacity: 1, delay: -1})
        .to($windowImg.eq(1), 1.2, {opacity: 0, delay: 2})
        .to($windowImg.eq(2), 1.2, {opacity: 1, delay: -1})
        .to($windowImg.eq(2), 1.2, {opacity: 0, delay: 2})
        .to($windowImg.eq(3), 1.2, {opacity: 1, delay: -1})
        .to($windowImg.eq(3), 1.2, {opacity: 0, delay: 2})
        .to($windowImg.eq(0), 1.2, {opacity: 1, delay: -1})

    $(".container").fullpage({
        anchors: ['intro', 'map', 'story', 'changes', 'ending'],
        // autoScrolling: false,
        scrollingSpeed: 900,
        loopHorizontal: false,
        slidesNavigation: true, // 슬라이드 인디게이터
        // scrollHorizontally: true,
        // origin 벗어날때
        // destination 들어올때
        // 마우스를 휠 했을 때 실행되는 이벤트 함수
        onLeave: function (origin, destination, direction) {
            $logo.removeClass("active");
            if (destination === 2) {
                $logo.addClass("active");
            } else if (destination === 4) {
                $logo.addClass("active");
            } else if (destination === 6) {
                // let footerH = $("footer").height();
                // gsap.to($(".donate_wrap"), 1.2, { marginBottom:footerH + "px" });
            }
        },
        afterLoad: function (origin, destination) {
  /*          // 애니메이션 효과
            $logo.removeClass("active");
            if (destination === 2) {
                $logo.addClass("active");
            } else if (destination === 4) {
                $logo.addClass("active");
            } else if (destination === 6) {
                // let footerH = $("footer").height();
                // gsap.to($(".donate_wrap"), 1.2, { marginBottom:footerH + "px" });
            }*/
        },

        //슬라이드
        /*onSlideLeave: function( section, origin, destination, direction){
            var loadedSlide = this;
            // $(".next_btn").removeClass("on");
            if (onSlideLeave === 5 ) {
                console.log("마지막")
                $(".next_btn").addClass("on");
                $(".fp-controlArrow.fp-next").on("click",function(event){
                    console.log("aaaa");
                    event.preventDefault()
                    event.stopPropagation()
                    event.stopImmediatePropagation()
                });
            }

        }*/
    });

    $(document).on('click', '.next', function(){
        $.fn.fullpage.moveSectionDown();
        console.log("다음");
    });
    $(document).on('click', '.prev', function(){
        $.fn.fullpage.moveSectionUp();
        console.log("이전");
    });

}