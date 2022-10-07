"use strict";
var winW;
var winH;
var $window = $(window);
var winSc = $(window).scrollTop();
var $header = $("#header");

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
	$(window).scroll(function () {
		winSc = _this.scrollTop();
	});
	layout();
	main();

// 	$(window).bind('wheel', function(event){
// 		if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
// 			 TweenMax.to($("html, body"), .2, {scrollTop:"-=200", ease:"Expo.ease"});
// 		}
// 		else {
// 			 TweenMax.to($("html, body"), .2, {scrollTop:"+=200", ease:"Expo.ease"});
// 		}
//   });
});