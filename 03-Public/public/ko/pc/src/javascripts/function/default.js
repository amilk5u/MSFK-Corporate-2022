"use strict";
var winW;
var winH;
var $window = $(window);
var winSc = $(window).scrollTop();
$window.load(function () {
	var _this = $(this);
	winW = _this.width();
	winH = _this.height();
	winSc = _this.scrollTop();
	$window.on("resize", function () {
		winW = _this.width();
		winH = _this.height();
	});
	_this.trigger("resize");
	$window.scroll(function () {
		winSc = _this.scrollTop();
		// $('.top').text(winSc); 
	});
	$window.scrollTop(0);
	layout();
	main();
});
// scroll Top
$window.on('unload', function () {
	$window.scrollTop(0);
});

/* (start) 변수 정의 */
// section 1 (Intro)
const $intro = $('#intro'),
	// content1
	$introCont1 = $intro.find('.content1'),
	$introCont1Title = $introCont1.find('h1'),
	$introCont1Txt = $introCont1.find('p'),
	$introCont1circleDeco1 = $introCont1.find('.circle_deco1'),
	$introCont1circleDeco2 = $introCont1.find('.circle_deco2'),
	$introCont1circleDeco3 = $introCont1.find('.circle_deco3'),
	$introCont1glitterCont = $introCont1.find('.glitter_cont'),
	$introCont1miniDeco = $introCont1.find('.mini_deco'),
	// content2
	$introCont2 = $intro.find('.content2'),
	$introCont2RoundWrap = $introCont2.find('.round_wrap'),
	$introCont2roundElm1 = $introCont2.find('.round_wrap .round_elm1'),
	$introCont2roundElm2 = $introCont2.find('.round_wrap .round_elm2'),
	$introCont2roundElm3 = $introCont2.find('.round_wrap .round_elm3'),
	$introCont2roundElm4 = $introCont2.find('.round_wrap .round_elm4'),
	$introCont2roundElm5 = $introCont2.find('.round_wrap .round_elm5'),
	$introCont2roundElm6 = $introCont2.find('.round_wrap .round_elm6'),
	$introCont2txt1 = $introCont2.find('.txt_cont1 p'),
	$introCont2txt2 = $introCont2.find('.txt_cont2 p'),
	$introCont2txt3 = $introCont2.find('.txt_cont3 p'),
	$introCont2Cont = $introCont2RoundWrap.find('> div'),
	$introCont2Deco = $introCont2RoundWrap.find('> div span'),
	$introCont2circleDeco1 = $introCont2.find('.deco_wrap .circle_deco1'),
	$introCont2circleDeco2 = $introCont2.find('.deco_wrap .circle_deco2'),
	$introCont2circleDeco3 = $introCont2.find('.deco_wrap .circle_deco3'),
	$introCont2circleDeco4 = $introCont2.find('.deco_wrap .circle_deco4'),
	$introCont2circleDeco5 = $introCont2.find('.deco_wrap .circle_deco5'),
	$introCont2circleDeco6 = $introCont2.find('.deco_wrap .circle_deco6');

// section 2 (Social)
const $social = $('#social');
/* (end) 변수 정의 */