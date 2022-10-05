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
});
function layout() {
}
function main() {
	/*
 * Libraries used:
 * http://airbnb.io/lottie/#/web
 * http://scrollmagic.io/docs/
*/

	/* Get all Lottie animations on page */
	const animations = document.querySelectorAll('.lottie-animation');

	/* Initialize ScrollMagic */
	const controller = new ScrollMagic.Controller();

	/* Initialize each lottie animation */
	animations.forEach(async (animation) => {
		const lottieInstance = lottie.loadAnimation({
			container: animation,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: animation.dataset.animPath
		})

		const animDuration = (() => {
			let duration;

			if (animation.dataset.animDuration) {
				duration = animation.dataset.animDuration;
				const durationIsNumString = /^\d+$/.test(duration);
				if (durationIsNumString) {
					duration = parseInt(duration)
				}
			} else {
				duration = "parentHeight"
			}
			return duration
		})();

		const animTriggerHook = (() => {
			let triggerHook;

			if (animation.dataset.animTriggerHook) {
				triggerHook = animation.dataset.animTriggerHook;
				triggerHook = parseFloat(triggerHook)
			} else {
				triggerHook = 0.5
			}

			return triggerHook
		})();

		const animOffset = (() => {
			let offset;

			if (animation.dataset.animOffset) {
				offset = animation.dataset.animOffset;
				offset = parseInt(offset)
			} else {
				offset = 0
			}

			return offset
		})();


		lottieInstance.addEventListener('DOMLoaded', async (e) => {
			/* Waits until the SVGs have loaded to get height of container - prevents breaking of non-fixed height containers. */
			let parent = animation.parentElement;

			/* Build ScrollMagic scene once all SVGs are loaded*/
			new ScrollMagic.Scene({
				/* Animation will be linked to the scroll progress of its container, starting when the top of container is halfway through viewport and ending when bottom of container is halfway through viewport */
				triggerElement: parent,
				triggerHook: animTriggerHook,
				offset: animOffset,
				duration: animDuration === "parentHeight" ? parent.offsetHeight : animDuration === "elemHeight" ? animation.offsetHeight : animDuration
			})
				.addTo(controller)
				.addIndicators() /* Debugging tool to see where an  d when animations occur */
				.on("progress", function (e) {
					const scrollFrame = e.progress * (lottieInstance.totalFrames - 1);
					lottieInstance.goToAndStop(scrollFrame, true);
				});
		})
	})
}