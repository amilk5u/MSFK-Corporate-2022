function main() {

    // container
    const $container = $(".container");

    // section
    const $sec = $("section"),
        $secLength = $sec.length,
        $secH = $sec.outerHeight();

    // header
    const $header = $("header"),
        $logo = $header.find("#logo"),
        $nav = $header.find("nav"),
        $navBtn = $nav.find("button");

    const _hashTag = ["#intro","#video","#map","#story","#changes","#ending"];

    // sec1 intro image motion
    const $sec1 = $(".sec1"),
        $sec1Txt = $sec1.find("span, h1, p"),
        $personImgK = $sec1.find(".person_img .korean"),
        $personImgF = $sec1.find(".person_img .foreign"),
        $personImg1 = $sec1.find(".person_img img:nth-of-type(n+6)"),
        $personImg2 = $sec1.find(".person_img img:nth-of-type(1), .person_img img:nth-of-type(2), .person_img img:nth-of-type(4)"),
        $personImg3 = $sec1.find(".person_img img:nth-of-type(3), .person_img img:nth-of-type(5), .person_img img:nth-of-type(6)");

    // sec2 grow fade
    const $grow = $(".grow_wrap span"),
        $instaImg = $(".insta_img ul"),
        _instaH = $instaImg.height() / 3;

    // sec4 window motion
    const $windowImg = $(".window_img img");

    let _page = 0,
        sec4Ani = true,
        action = true,
        motion = true,
        instaM = true;

    if(location.hash) {
        _page = _hashTag.indexOf(location.hash);
        scrollMove(_page);
    } else {
        _page = 0;
        location.hash = "#intro";
    }

    const $scrollWrap = $(".scroll_wrap");

    // scroll top
    gsap.to($html, .01, {scrollTop:0});

    // mause wheel
    window.addEventListener("wheel", function (e) {
        const data = e.deltaY;
        if (motion === true) {
            motion = false;
            // 아래로 스크롤
            if (!gsap.isTweening(".wrap")) {
                if (data > 0) {
                    if (_page >= $secLength - 1) {
                    } else {
                        _page++;
                    }
                } else {
                    // 위로
                    if (_page <= 0) {

                    } else {
                        _page--;
                    }
                }
                scrollMove(_page);
            }
        }
    });

    let introTimeline = gsap.timeline();
    introTimeline
        .to($sec1.find("span"), 1.3, {opacity:1, delay:.2})
        .to($sec1.find("h1"), 2.3, {opacity:1, delay:-.8})
        .to($sec1.find("p"), 1.5, {opacity:1, delay:-1.8})
    // 구성원 이미지 순차적으로 fade in
    TweenMax.staggerTo($personImgK, 1, {opacity:.75, scale:1, delay:1, ease:Circ.easeOut}, .1);
    TweenMax.staggerTo($personImgF, 1, {opacity:.6, scale:1, delay:1, ease:Circ.easeOut}, .1);

    gsap.to($personImg1, .8, { y:-3.5, repeat:-1, yoyo:true });
    gsap.to($personImg2, .7, { y:-5, repeat:-1, yoyo:true });
    gsap.to($personImg3, .9, { y:-4.5, repeat:-1, yoyo:true });

    // nav button 클릭시 실행
    $navBtn.on("click", function () {
        if (!gsap.isTweening(".wrap")) {
            let _this = $(this),
                _index = _this.index();
            _page = _index;
            scrollMove(_page);
        }
    });

    // intro mouse click
    $scrollWrap.on("click", function () {
        if (motion === true) {
            motion = false;
            gsap.to($container, .75, {y: -winH, ease: Power1.easeInOut, onComplete: () => motion = true});
            $navBtn.removeClass("active");
            $navBtn.eq(1).addClass("active");
            _page = 1;
        }
    });

    function scrollMove(page) {
        let secTop = winH * page;
        $navBtn.removeClass("active");
        $navBtn.eq(page).addClass("active");
        gsap.to($container, .75, {y: -secTop, ease: Power1.easeInOut, onComplete: () => motion = true});
        $nav.removeClass("active");
        $logo.removeClass("active");
        objAry[0].pauseVideo();
        location.hash = _hashTag[page];
         if (page === 2) {
            $nav.addClass("active");
            $logo.addClass("active");
            TweenMax.staggerTo($(".sec3 .ani"), 1.8, {opacity:1, delay:.75}, .2);
            growMotion();
        } else if (page === 3) {
            let svgTimeline = gsap.timeline();
            svgTimeline
                .to($(".mapline_svg"), .8, {"width": "662px", delay:.75})
                .to($(".mapline_wrap .more_btn"), .8, {"opacity": 1, delay: -.1, onComplete: function () {
                        $(".activist_cont").eq(0).find(".svg_map").addClass("active");
                    }
                })
            TweenMax.staggerTo($(".swiper-slide-active").find(".deco_wrap img"), .8, {opacity: 1, delay:1.5}, .5)

        } else if (page === 4) {
            TweenMax.staggerTo($(".sec5 .ani"), 1.8, {opacity:1, delay:.75}, .2);
            $nav.addClass("active");
            $logo.addClass("active");

        } else if (page === 5) {
            TweenMax.staggerTo($(".sec6 .ani"), 1.8, {opacity:1, delay:.75}, .2);
            if (instaM === true) {
                instaM = false;
            /*    let instaTimeline = gsap.timeline();
                instaTimeline
                    .to($instaImg, 1.5, {y: -_instaH, delay:.8})
                    .to($instaImg, 1.5, {y: -_instaH * 2, delay:.5})*/
            }
        }
    }

    function windowMotion() {
        // 이미지 순차적으로 fade In / Out
        let num = 0;
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
    }

    function growMotion() {
        // sec2 grow fade In
        const $grow = $(".grow_wrap span");
        let growFade = gsap.timeline();
        let randomNums = [];
        let ramdom = Math.floor(Math.random() * 5);

        $grow.each(function (i) {
            let _this = $(this);
            randomNums.push(_this);
        });
        const shuffleArray = array => {
            for (let i = 0; i < array.length; i++) {
                let j = Math.floor(Math.random() * (i + 1));
                const x = array[i];
                array[i] = array[j];
                array[j] = x;
            }
            return array;
        };
        shuffleArray(randomNums);
        growFade.staggerTo(randomNums, 1.3, {opacity: 1, delay: .6, scale:1}, .02);
    }

    function slideSection () {
        let swiper = new Swiper("#activistSlider", {
            slidesPerView: "auto",
            centeredSlides: true,
            speed: 900,
            // loop:true,
            navigation: {
                nextEl: '.next_btn',
                prevEl: '.prev_btn',
            },
            simulateTouch: false,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            on: {
                slideChangeTransitionEnd: function () {
                    gsap.to($(".swiper-slide").find(".deco_wrap img"), .2, {opacity: 0}, .5)
                    TweenMax.staggerTo($(".swiper-slide-active").find(".deco_wrap img"), .8, {opacity: 1}, .5)
                    $(".swiper-slide").find(".svg_map").removeClass("active");
                    $(".swiper-slide-active").find(".svg_map").addClass("active");
                    $(".mapline_wrap").css("zIndex","5");
                },
                slideChange: function () {
                    popupBtn(this.activeIndex);
                    $(".mapline_wrap").css("zIndex","10");
                }
            }
        });
    }

    // 현재슬라이드의 map 을 클릭시
    // 현재슬라이드와 동일한 popup 창을 실행시킨다.
    function popupBtn(i) {
        $(".activist_cont").eq(i).find(".popup_btn").on("click",function(){
            gsap.to($nav, .5, {opacity: .1})
            gsap.to($(".popup_wrap"), .5, {opacity: 1, display:"block"})
            gsap.to($(".popup_box").eq(i), .5, {opacity: 1, display:"block"})
        });
    }
    $(".activist_cont").eq(0).find(".popup_btn").on("click",function(){
        gsap.to($nav, .5, {opacity: .1})
        gsap.to($(".popup_wrap"), .5, {opacity: 1, display:"block"})
        gsap.to($(".popup_box").eq(0), .5, {opacity: 1, display:"block"})
    });
    $(".dim").on("click",function(){
        gsap.to($nav, .5, {opacity: 1})
        gsap.to($(".popup_box"), .5, {opacity: 0, display:"none"})
        gsap.to($(".popup_wrap"), .5, {opacity: 0, display:"none"})
    });

    var swiper = new Swiper(".insta-slide", {
        loop:true,
        slidesPerView: "auto",
        touchRatio: 0,//드래그 금지
        speed:1300,
        autoplay: {delay: 1600,},
    });

    function init() {
        windowMotion();
        slideSection();
        if(location.hash){
            scrollMove(_hashTag.indexOf(location.hash));
        }
    }
    init();
}