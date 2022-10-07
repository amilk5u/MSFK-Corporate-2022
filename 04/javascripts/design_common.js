"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var $window = $(window);
var winSc;
var $html = $("html");
var htmlH;

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
    });
    $(this).trigger("resize");
});
main();

function layout(){

}
function main(){
   //  var $loading = $("#intro"),
   //      $loadingVideo = document.getElementById('introVideo');
   //  $loadingVideo.addEventListener("ended", function(){
   //      TweenMax.to($loading, 1, {opacity:0, display:"none"});
   //      $html.removeClass("scroll_no");
   //      $html.scrollTop(0);
   //  });

   //  $(window).bind('wheel', function(event){
   //      if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
   //          TweenMax.to($("html, body"), .4, {scrollTop:"-=200", ease:esStep});
   //      }
   //      else {
   //          TweenMax.to($("html, body"), .4, {scrollTop:"+=200", ease:esStep});
   //      }
   //  });

    var $mainVisual = $("#mainVisual"),
        $visualScrollBtn = $mainVisual.find(".scroll_btn");
    $visualScrollBtn.click(function(){
        TweenMax.to($("html, body"), 1, {scrollTop:winH, ease:esStep});
    });

    gsap.registerPlugin(ScrollTrigger);

    //sec01
    var $sec01 = $("#sec01"),
        $sec01unit03 = $sec01.find(".unit03");
    var $sec01motion = gsap.timeline({
        scrollTrigger: {
            trigger: $sec01,
            start: "top top",
            end: "+=600",
            scrub: 1,
            toggleActions: "play none none none"
        }
    });
    $sec01motion.to($sec01unit03, {x: -380, y:0});

    var $txtUpMotion = $(".txt_up_motion");
    gsap.utils.toArray($txtUpMotion).forEach(function(item) {
        gsap.to(item, {
            y:0, x:0,
            opacity: 1,
            scrollTrigger: {
                trigger: item,
                start:"-800 top",
                toggleActions: "play none none none",
            }
        })
    });

    /*var $topBtn = $(".top_btn");
    $topBtn.click(function(){
        TweenMax.set($html, {scrollTop:0});
        TweenMax.fromTo($(".white_bg"), 1, {display:"block", opacity:1}, {display:"none", opacity:0});
    });*/

    //sec03
    var $sec03 = $("#sec03"),
        $earthWrap = $sec03.find(".earth_wrap"),
        $earthImg = $earthWrap.find("img"),
        $fundraising = $sec03.find(".fundraising"),
        $fundraisingImg = $fundraising.find("img");
    var $sec03motion01 = gsap.timeline({
        scrollTrigger: {
            trigger: $sec03,
            start: "-500 top",
            end: "+=800",
            scrub: 1
        }
    });
    $sec03motion01.to($earthImg, {x: 0, y:0});

    gsap.to($fundraisingImg, {
        y:0, x:0, opacity: 1,
        scrollTrigger: {
            trigger: $fundraising,
            start:"-700",
            toggleActions: "play reverse none none"
        }
    });

    var $sec02 = $("#sec02");
    var $videoBox = $sec01.find(".video_box"),
        $videoCloseBtn = $sec01.find(".video_close_btn");
    $videoCloseBtn.click(function(){
        $videoBoxMotion.kill();
        TweenMax.to($videoCloseBtn, .3, {display:"none", opacity:0});
        $videoBox.css({width:"100%", height:"100%", position:"absolute", left:0, right:"auto", top:0, bottom:"auto"})
    });
    var $videoBoxMotion = gsap.timeline({
        scrollTrigger: {
            trigger: $sec02,
            start: "top",
            end:"200",
            toggleActions: "play complete reverse none",
        }
        /*scrollTrigger: {
            trigger: $sec02,
            start: "top",
            end:"6000",
            toggleActions: "play reverse resume reset"
        }
        //"play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
        */
    });
    $videoBoxMotion.set($videoBox, {width:400, height:225, position:"fixed", right:50, top:"auto", left:"auto", bottom:50})
        .to($videoCloseBtn, {display:"block", opacity:1});



    //sec04
    var $sec04 = $("#sec04"),
        $cardSlide = $sec04.find(".card_slide"),
        $sec04Txt02 = $sec04.find(".txt02");

    gsap.to($cardSlide, {
        x:-2080,
        scrollTrigger: {
            trigger: $sec04,
            pin: true,
            start:"top top",
            end: "+=1040",
            scrub: 1,
            // onUpdate: function(self){
            //     if(self.progress > .45){
            //         TweenMax.to($sec04Txt02, .5, {opacity:1, y:0});
				// 		  console.log('ddd')
            //     }
            // }
        }
    });

    //sec05
    var $sec05 = $("#sec05"),

        $roadMap = $sec05.find(".road_map .unit01"),
        $sec05car = $sec05.find(".road_map .unit02"),

        $sec05topUnit = $sec05.find(".top_unit img"),

        $sec05txtWrap02 = $sec05.find(".txt_wrap02"),
        $sec05txt01 = $sec05txtWrap02.find(".txt01"),
        $sec05txt02 = $sec05txtWrap02.find(".txt02"),

        $sec05bottomUnit = $sec05.find(".bottom_unit"),
        $sec05bottomUnit01 = $sec05bottomUnit.find(".unit01"),
        $sec05bottomUnit02 = $sec05bottomUnit.find(".unit02"),
        $sec05bottomUnit03 = $sec05bottomUnit.find(".unit03"),
        $sec05bottomUnit04 = $sec05bottomUnit.find(".unit04"),
        $sec05bottomUnit05 = $sec05bottomUnit.find(".unit05");

    var sec05roadMotion = gsap.timeline({
        scrollTrigger: {
            trigger: $sec05,
            start: "-700",
            toggleActions: "play none none none",
        }
    });
    sec05roadMotion.to($roadMap, {opacity:1})
        .to($sec05car, {opacity:1, y:0, x:0});

    gsap.to($sec05topUnit, {
        y:0, x:0, rotate:0, opacity: 1, duration:.5,
        scrollTrigger: {
            trigger: $sec05,
            start:"-700 top",
            toggleActions: "play none none none",
        }
    });

    var sec05txtMotion = gsap.timeline({
        scrollTrigger: {
            trigger: $sec05txtWrap02,
            start: "-300",
            toggleActions: "play none none none",
        }
    });
    sec05txtMotion.to($sec05txt01, {y:0, opacity:1})
        .to($sec05txt02, {y:0, opacity:1});

    var sec05bottomMotion = gsap.timeline({
        scrollTrigger: {
            trigger: $sec05,
            start: "0",
            toggleActions: "play none none none",
        }
    });
    sec05bottomMotion.to($sec05bottomUnit01, {y:0, x:0, opacity:1, duration:.3})
        .to($sec05bottomUnit02, {y:0, x:0, opacity:1, duration:.3})
        .to($sec05bottomUnit03, {y:0, x:0, opacity:1, duration:.3})
        .to($sec05bottomUnit04, {y:0, x:0, opacity:1, duration:.3})
        .to($sec05bottomUnit05, {y:0, x:0, opacity:1, duration:.3});

    //sec06
    var $sec06 = $("#sec06");
    var $sec06motion = gsap.timeline({
        scrollTrigger: {
            trigger: $sec06,
            start: -winH,
            end: "+=850",
            scrub: 1,
        }
    });
    $sec06motion.to($sec06, 1, {"background-position-y":-190});

    var $sec06motion02 = gsap.timeline({
        scrollTrigger: {
            trigger: $sec06,
            start: "-300",
            toggleActions: "play none none none",
        }
    });
    $sec06motion02.to($sec06.find(".txt01"), {y:0, opacity:1, duration:.3})
        .to($sec06.find(".txt02"), {y:0, opacity:1, duration:.3})
        .to($sec06.find("h3"), {y:0, opacity:1, duration:.3});
}
