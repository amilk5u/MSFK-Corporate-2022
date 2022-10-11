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
		$('.top').text(winSc);
	});
	layout();
	main();
	$(window).scrollTop(0);
	$(window).on('unload', function () {
		$(window).scrollTop(0);
	});
});
function layout() {
}
function main() {

	const $warp = $('#warp');
	const $intro = $('#intro');

	const $sec1Container = $('.sec1-container'),
		$sec1Content1 = $sec1Container.find('.content1'),
		$sec1Content1Title = $sec1Container.find('h1'),
		$sec1Content1Txt = $sec1Container.find('p'),
		$sec1Cont1circleDeco1 = $sec1Container.find('.circle_deco1'),
		$sec1Cont1circleDeco2 = $sec1Container.find('.circle_deco2'),
		$sec1Cont1circleDeco3 = $sec1Container.find('.circle_deco3'),

		$sec1Content2 = $sec1Container.find('.content2');

	/* main ------------------------------------------------------------------------------ */
	function index() {
		/* smoothScroll -------------------------------------------------------------------- */
		smoothScroll(".container");
		function smoothScroll(content, viewport, smoothness) {
			content = gsap.utils.toArray(content)[0];
			smoothness = smoothness || 0;
			gsap.set(viewport || content.parentNode, { overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0 });
			gsap.set(content, { overflow: "visible", width: "100%" });

			let getProp = gsap.getProperty(content),
				setProp = gsap.quickSetter(content, "y", "px"),
				setScroll = ScrollTrigger.getScrollFunc(window),
				removeScroll = () => content.style.overflow = "visible",
				killScrub = trigger => {
					let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
					scrub && scrub.pause();
					trigger.animation.progress(trigger.progress);
				},
				height, isProxyScrolling;

			function refreshHeight() {
				height = content.clientHeight;
				content.style.overflow = "visible"
				document.body.style.height = height + "px";
				return height - document.documentElement.clientHeight;
			}

			ScrollTrigger.addEventListener("refresh", () => {
				removeScroll();
				requestAnimationFrame(removeScroll);
			})
			ScrollTrigger.defaults({ scroller: content });
			ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

			ScrollTrigger.scrollerProxy(content, {
				scrollTop(value) {
					if (arguments.length) {
						isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
						setProp(-value);
						setScroll(value);
						return;
					}
					return -getProp("y");
				},
				scrollHeight: () => document.body.scrollHeight,
				getBoundingClientRect() {
					return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
				}
			});

			return ScrollTrigger.create({
				animation: gsap.fromTo(content, { y: 0 }, {
					y: () => document.documentElement.clientHeight - height,
					ease: "none",
					onUpdate: ScrollTrigger.update
				}),
				scroller: window,
				invalidateOnRefresh: true,
				start: 0,
				end: refreshHeight,
				refreshPriority: -999,
				scrub: smoothness,
				onUpdate: self => {
					if (isProxyScrolling) {
						killScrub(self);
						isProxyScrolling = false;
					}
				},
				onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
			});
		}
		/* //smoothScroll -------------------------------------------------------------------- */

		/* intro trigger ------------------------------------------------------------------------*/
		const introTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: $warp,
				start: () => "top top",
				// end: () => `+=4000% bottom`, // 전체 스크롤 길이.
				end: () => "+=20000", // 전체 스크롤 길이.
				pin: $intro,
				scrub: 2,
				pinSpacing: true,
				markers: {
					startColor: "blue",
					endColor: "blue",
				},
				endonLeave: () => {
					console.log('onLeave')
					// TweenMax.to($('#animationWindow'), .5, { opacity: 0 })
				},
				onEnterBack: () => {
					// console.log('onEnterBack')
					// TweenMax.to($('#animationWindow'), .5, { opacity: 1 })
				}
				// invalidateOnRefresh: true,
				// id: 'impact-cluster',
				// fastScrollEnd: true,
				// preventOverlaps: true
			}
		});

		function motionBy1() {
			const sec1ContainerTimeLine = gsap.timeline();
			/* content1 */
			sec1ContainerTimeLine.to($sec1Content1Title, { opacity: 0, yPercent: -20, duration: .2, delay: .5 })
			sec1ContainerTimeLine.to($sec1Content1Txt, { opacity: 0, yPercent: -20, duration: .2 })
			sec1ContainerTimeLine.to($sec1Cont1circleDeco1, { opacity: 0, duration: .2 })
			sec1ContainerTimeLine.to($sec1Cont1circleDeco2, { opacity: 0, duration: .2 })
			sec1ContainerTimeLine.to($sec1Cont1circleDeco3, { opacity: 0, duration: .2 })
			sec1ContainerTimeLine.to($sec1Content1, { display: 'none', opacity: 0, duration: .5 })
			sec1ContainerTimeLine.to($sec1Content2, { display: 'block', opacity: 1, duration: .5, delay: -.5 })

			/* content2 */
			// 텍스트 1
			sec1ContainerTimeLine.to('.content2 .txt_cont1 p', { opacity: 1, yPercent: -20, duration: .2 })
			// 메인 원형 생기기
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm1', { width: 60, height: 60, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm2', { width: 30, height: 30, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm3', { width: 50, height: 50, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm4', { width: 50, height: 50, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm5', { width: 60, height: 60, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm6', { width: 40, height: 40, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .txt_cont1 p', { opacity: 0, yPercent: 0, duration: .2 })

			// 텍스트 2
			sec1ContainerTimeLine.to('.content2 .txt_cont2 p', { opacity: 1, yPercent: -20, duration: .2 })
			// 메인 원형 커지기
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm1', { width: 330, height: 330, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm2', { width: 160, height: 160, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm3', { width: 200, height: 200, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm4', { width: 220, height: 220, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm5', { width: 240, height: 240, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm6', { width: 160, height: 160, duration: .2 })

			// 작은 데코 원형
			sec1ContainerTimeLine.to('.content2 .deco_wrap .circle_deco1', { width: 20, height: 20, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .deco_wrap .circle_deco2', { width: 20, height: 20, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .deco_wrap .circle_deco3', { width: 30, height: 30, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .deco_wrap .circle_deco4', { width: 30, height: 30, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .deco_wrap .circle_deco5', { width: 20, height: 20, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .deco_wrap .circle_deco6', { width: 20, height: 20, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .txt_cont2 p', { opacity: 0, yPercent: 0, duration: .2 })

			// 텍스트 3
			sec1ContainerTimeLine.to('.content2 .txt_cont3 p', { opacity: 1, yPercent: -20, duration: .2 })

			// 사진 이미지 생기기
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm1 img', { bottom: 0, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm2 img', { bottom: 0, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm3 img', { bottom: 0, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm4 img', { bottom: 0, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm5 img', { bottom: 0, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .round_wrap .round_elm6 img', { bottom: 0, duration: .2 })
			sec1ContainerTimeLine.to('.content2 .txt_cont3 p', { opacity: 0, yPercent: 0, duration: .2 })

			// 작은 데코 사라지기
			sec1ContainerTimeLine.to('.content2 .deco_elm span', { width: 0, height: 0, duration: .2 })

			// 텍스트 4
			sec1ContainerTimeLine.to('.content2 .txt_cont4 p', { opacity: 1, yPercent: -20, duration: .2 })
			sec1ContainerTimeLine.to('.content2', { display: 'none', opacity: 0, duration: .5, delay: 1 })
			return sec1ContainerTimeLine;
		}

		function motionBy2() {
			const sec2ContainerTimeLine = gsap.timeline();
			sec2ContainerTimeLine.to('.content3', { display: 'block', opacity: 1, duration: .5, delay: -1 })
			sec2ContainerTimeLine.to('.content3 .txt_wrap p', { display: 'block', opacity: 1, yPercent: -10, duration: .2, delay: -.5 })
			// video
			sec2ContainerTimeLine.to('.content3 .video_wrap', { display: 'block', opacity: 1, duration: .2, delay: -.2 })
			// deco 순차적으로 나타나기
			// 원 데코
			sec2ContainerTimeLine.to('.content3 .circle_deco1', { width: 20, height: 20, duration: .2, delay: -.11 })
			sec2ContainerTimeLine.to('.content3 .circle_deco2', { width: 20, height: 20, duration: .2, delay: -.12 })
			sec2ContainerTimeLine.to('.content3 .circle_deco3', { width: 30, height: 30, duration: .2, delay: -.16 })
			sec2ContainerTimeLine.to('.content3 .circle_deco4', { width: 20, height: 20, duration: .2, delay: -.14 })
			sec2ContainerTimeLine.to('.content3 .circle_deco5', { width: 30, height: 30, duration: .2, delay: -.18 })
			sec2ContainerTimeLine.to('.content3 .circle_deco6', { width: 20, height: 20, duration: .2, delay: -.15 })
			// 별 데코
			sec2ContainerTimeLine.to('.content3 .glitter_deco1', { display: 'block', opacity: 1, duration: .2, delay: -.18 })
			sec2ContainerTimeLine.to('.content3 .glitter_deco2', { display: 'block', opacity: 1, duration: .2, delay: -.14 })
			sec2ContainerTimeLine.to('.content3 .glitter_deco3', { display: 'block', opacity: 1, duration: .2, delay: -.16 })
			sec2ContainerTimeLine.to('.content3 .glitter_deco4', { display: 'block', opacity: 1, duration: .2, delay: -.11 })
			sec2ContainerTimeLine.to('.content3 .glitter_deco5', { display: 'block', opacity: 1, duration: .2, delay: -.12 })
			sec2ContainerTimeLine.to('.content3 .glitter_deco6', { display: 'block', opacity: 1, duration: .2, delay: -.17 })
			sec2ContainerTimeLine.to('.content3', { display: 'none', opacity: 0, duration: .5, delay: 1 })
			return sec2ContainerTimeLine;
		}

		function motionBy3() {
			const sec3ContainerTimeLine = gsap.timeline();
			// 지구 그래프 나타나기
			sec3ContainerTimeLine.to('.content4', { display: 'block', opacity: 1, duration: .5 })
			sec3ContainerTimeLine.to('.content4 .txt_wrap p', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
			sec3ContainerTimeLine.to('.content4 .earth_img', { opacity: 1, duration: .2 })
			sec3ContainerTimeLine.to('.content4 .txt_elm1', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
			sec3ContainerTimeLine.to('.content4 .txt_elm2', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
			sec3ContainerTimeLine.to('.content4 .income_tit', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
			sec3ContainerTimeLine.to('.content4 .money_tit', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
			sec3ContainerTimeLine.to('.content4 .bottom_txt strong', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
			sec3ContainerTimeLine.to('.content4 .bottom_txt > span', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })

			sec3ContainerTimeLine.to('.content4', { display: 'none', opacity: 0, duration: .5, delay: 1 })
			sec3ContainerTimeLine.to('.content5', { opacity: 1, duration: .5 })
			return sec3ContainerTimeLine;
		}

		introTimeline.add(motionBy1());
		introTimeline.add(motionBy2());
		introTimeline.add(motionBy3());
		/* //intro trigger ------------------------------------------------------------------------*/


		/* social contribution trigger ------------------------------------------------------------------------*/
		const socialTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: $warp,
				start: () => "top top",
				// end: () => `+=4000% bottom`, // 전체 스크롤 길이.
				end: () => "+=20000", // 전체 스크롤 길이.
				pin: $intro,
				scrub: 2,
				pinSpacing: true,
				markers: {
					startColor: "blue",
					endColor: "blue",
				},
				endonLeave: () => {
					console.log('onLeave')
					// TweenMax.to($('#animationWindow'), .5, { opacity: 0 })
				},
				onEnterBack: () => {
					// console.log('onEnterBack')
					// TweenMax.to($('#animationWindow'), .5, { opacity: 1 })
				}
				// invalidateOnRefresh: true,
				// id: 'impact-cluster',
				// fastScrollEnd: true,
				// preventOverlaps: true
			}
		});

		function socialmotionBy1() {
			const sec1ContainerTimeLine = gsap.timeline();
			

			return sec1ContainerTimeLine;
		}
		socialTimeline.add(socialmotionBy1());

		/* //social contribution trigger ------------------------------------------------------------------------*/





		// /* 움직이는 원 트리거 */
		// const tl2 = gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: '.one',
		// 		pin: '.sec05',
		// 		// pin: true,
		// 		// toggleClass: {targets: 'nav', className: 'active'} // start 시점에서 class가 추가되고 end에서 class가 삭제된다.
		// 		start: "top 20%",
		// 		end: "+=6000",
		// 		// markers: {
		// 		// 	startColor: "#555",
		// 		// 	endColor: "#555",
		// 		// 	// fontSize: '1rem',
		// 		// 	// indent: 200
		// 		// },
		// 		scrub: true,
		// 	}
		// });

		// tl2.to('.one', { x: 800, duration: .5, delay: .1 })
		// 	.to('.one', { x: 0, duration: .5, delay: .1 })
		// /* //움직이는 원 트리거 */




		/* LottieScrollTrigger ------------------------------------------ */
		LottieScrollTrigger({
			target: "#circularLineMotion",
			// path: "https://assets.codepen.io/35984/tapered_hello.json",
			path: "./datafile/sec05.json",
			pin: true,
			start: 7900,
			end: '+=1100',
			speed: "medium",
			markers: { startColor: "green", endColor: "green" },
			scrub: true,
			// onLeave: () => {
			// 	console.log('onLeave')
			// 	TweenMax.to($('#animationWindow'), .5, { opacity: 0 })
			// },
			// onEnterBack: () => {
			// 	console.log('onEnterBack')
			// 	TweenMax.to($('#animationWindow'), .5, { opacity: 1 })
			// }
		});

		LottieScrollTrigger({
			target: "#seedMotion",
			// path: "https://assets.codepen.io/35984/tapered_hello.json",
			path: "./datafile/sec12.json",
			pin: true,
			start: 20000,
			end: '+=1100',
			speed: "medium",
			markers: { startColor: "green", endColor: "green" },
			scrub: true,
			// onLeave: () => {
			// 	console.log('onLeave')
			// 	TweenMax.to($('#animationWindow'), .5, { opacity: 0 })
			// },
			// onEnterBack: () => {
			// 	console.log('onEnterBack')
			// 	TweenMax.to($('#animationWindow'), .5, { opacity: 1 })
			// }
		});

		function LottieScrollTrigger(vars) {
			let playhead = { frame: 0 },
				target = gsap.utils.toArray(vars.target)[0],
				speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
				st = { trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: true },
				animation = lottie.loadAnimation({
					container: target,
					renderer: vars.renderer || "svg",
					loop: false,
					autoplay: false,
					path: vars.path
				});
			for (let p in vars) { // let users override the ScrollTrigger defaults
				st[p] = vars[p];
			}
			animation.addEventListener("DOMLoaded", function () {
				gsap.to(playhead, {
					frame: animation.totalFrames - 1,
					ease: "none",
					// onUpdate: () => animation.goToAndStop(playhead.frame, true),
					onUpdate: function () {
						animation.goToAndStop(playhead.frame, true);
						// console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
						// console.log('안녕');
					},
					/* onUpdate: self => {
						console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
					}, */
					scrollTrigger: st,
				});
				// }).set($("#animationWindow2"), {fill:'#2cc52c'}) ;
				// in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
				ScrollTrigger.sort();
				ScrollTrigger.refresh();
				// ScrollTrigger.set($("#animationWindow2"), {fill:'#2cc52c'})();
			});
			return animation;
		}
		/* //LottieScrollTrigger ------------------------------------------ */











	}
	/* //main ------------------------------------------------------------------------------ */





	function sub1() {
		/* smoothScroll -------------------------------------------------------------------- */
		smoothScroll("#content");
		function smoothScroll(content, viewport, smoothness) {
			content = gsap.utils.toArray(content)[0];
			smoothness = smoothness || 0;
			smoothness = 0.5;
			gsap.set(viewport || content.parentNode, { overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0 });
			gsap.set(content, { overflow: "visible", width: "100%" });

			let getProp = gsap.getProperty(content),
				setProp = gsap.quickSetter(content, "y", "px"),
				setScroll = ScrollTrigger.getScrollFunc(window),
				removeScroll = () => content.style.overflow = "visible",
				killScrub = trigger => {
					let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
					scrub && scrub.pause();
					trigger.animation.progress(trigger.progress);
				},
				height, isProxyScrolling;

			function refreshHeight() {
				height = content.clientHeight;
				content.style.overflow = "visible"
				document.body.style.height = height + "px";
				return height - document.documentElement.clientHeight;
			}

			ScrollTrigger.addEventListener("refresh", () => {
				removeScroll();
				requestAnimationFrame(removeScroll);
			})
			ScrollTrigger.defaults({ scroller: content });
			ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

			ScrollTrigger.scrollerProxy(content, {
				scrollTop(value) {
					if (arguments.length) {
						isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
						setProp(-value);
						setScroll(value);
						return;
					}
					return -getProp("y");
				},
				scrollHeight: () => document.body.scrollHeight,
				getBoundingClientRect() {
					return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
				}
			});

			return ScrollTrigger.create({
				animation: gsap.fromTo(content, { y: 0 }, {
					y: () => document.documentElement.clientHeight - height,
					ease: "none",
					onUpdate: ScrollTrigger.update
				}),
				scroller: window,
				invalidateOnRefresh: true,
				start: 0,
				end: refreshHeight,
				refreshPriority: -999,
				scrub: smoothness,
				onUpdate: self => {
					if (isProxyScrolling) {
						killScrub(self);
						isProxyScrolling = false;
					}
				},
				onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
			});
		}
		/* //smoothScroll -------------------------------------------------------------------- */


		/* LottieScrollTrigger ------------------------------------------ */
		LottieScrollTrigger({
			target: "#animationWindow",
			// path: "https://assets.codepen.io/35984/tapered_hello.json",
			path: "./datafile/sec05.json",
			pin: '.cont_ani',
			speed: "medium",
			// markers: { startColor: "green", endColor: "green" },
			scrub: true,
			onLeave: () => {
				console.log('onLeave')
				TweenMax.to($('#animationWindow'), .5, { opacity: 0 })
			},
			onEnterBack: () => {
				console.log('onEnterBack')
				TweenMax.to($('#animationWindow'), .5, { opacity: 1 })
			}
		});
		LottieScrollTrigger({
			target: "#animationWindow2",
			// path: "https://assets.codepen.io/35984/tapered_hello.json",
			path: "./datafile/test.json",
			speed: "medium",
			// markers: { startColor: "green", endColor: "green" },
			scrub: true // seconds it takes for the playhead to "catch up"
			// you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
		});
		LottieScrollTrigger({
			target: "#animationWindow3",
			path: "https://assets.codepen.io/35984/tapered_hello.json",
			// path: "./datafile/sec05.json",
			speed: "medium",
			// markers: { startColor: "green", endColor: "green" },
			scrub: true // seconds it takes for the playhead to "catch up"
			// you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
		});

		function LottieScrollTrigger(vars) {
			let playhead = { frame: 0 },
				target = gsap.utils.toArray(vars.target)[0],
				speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
				st = { trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: true },
				animation = lottie.loadAnimation({
					container: target,
					renderer: vars.renderer || "svg",
					loop: false,
					autoplay: false,
					path: vars.path
				});
			for (let p in vars) { // let users override the ScrollTrigger defaults
				st[p] = vars[p];
			}
			animation.addEventListener("DOMLoaded", function () {
				gsap.to(playhead, {
					frame: animation.totalFrames - 1,
					ease: "none",
					// onUpdate: () => animation.goToAndStop(playhead.frame, true),
					onUpdate: function () {
						animation.goToAndStop(playhead.frame, true);
						// console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
						// console.log('안녕');
					},
					/* onUpdate: self => {
						console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
					}, */
					scrollTrigger: st,
				});
				// }).set($("#animationWindow2"), {fill:'#2cc52c'}) ;
				// in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
				ScrollTrigger.sort();
				ScrollTrigger.refresh();
				// ScrollTrigger.set($("#animationWindow2"), {fill:'#2cc52c'})();
			});
			return animation;
		}
		/* //LottieScrollTrigger ------------------------------------------ */

		/* 가로 스크롤 ------------------------------------------------------ */
		let bol = true;
		gsap.to($(".sec04"), {
			x: - $('.min_wrap').outerWidth() + $(window).outerWidth(),
			scrollTrigger: {
				trigger: $(".sec04"),
				pin: true,
				start: "top top",
				end: "+=4000",
				scrub: true,
				toggleClass: { targets: 'nav', className: 'active' }, // start 시점에서 class가 추가되고 end에서 class가 삭제된다.
				// duration : 100,
				// snap : {
				// 	duration : 2
				// },
				onUpdate: function (self) {
					let w = $('.sec04').css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4];
					console.log(w)
					if (w < -200) {
						TweenMax.to($('.line svg'), 1, { 'stroke-dashoffset': 7700 })
					} else {
						TweenMax.to($('.line svg'), .5, { 'stroke-dashoffset': 8520 })
					}
					if (w < -1420) {
						TweenMax.to($('.line svg'), 2, { 'stroke-dashoffset': 5000 })
					} else {
						TweenMax.to($('.line svg'), .5, { 'stroke-dashoffset': 7700 })
					}
					if (w < -2500) {
						TweenMax.to($('.line svg'), 1.5, { 'stroke-dashoffset': 3000 })
					} else {
						TweenMax.to($('.line svg'), .5, { 'stroke-dashoffset': 5000 })
					}
					if (w < -4450) {
						TweenMax.to($('.line svg'), 1.5, { 'stroke-dashoffset': 0 })
					} else {
						TweenMax.to($('.line svg'), 1, { 'stroke-dashoffset': 3000 })
					}
				}
			}
		});

		/* //가로 스크롤 ------------------------------------------------------ */


		/* 스크롤 연결 노출 -------------------------------------------------------------------------------- */
		/* 연결되는 트리거 */
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.box1',
				// pin: true,
				start: "top 80%",
				end: "top 30%",
				// markers: {
				// 	startColor: "yellow",
				// 	endColor: "yellow",
				// },
				scrub: true,
			}
		});

		tl.to('.box1', { x: 500, duration: 1 })
			.to('.box2', { x: 500, duration: 1 })
			.to('.box3', { x: 800, duration: 1 })
		/* //연결되는 트리거 */

		/* json과 결합되는 트리거 */
		// const tl4 = gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: '.elm1',
		// 		pin: '.cont_ani',
		// 		start: "top 80%",
		// 		end: "top 30%",
		// 		markers: {
		// 			startColor: "yellow",
		// 			endColor: "yellow",
		// 		},
		// 		scrub: true,
		// 	}
		// });
		// tl4.to('.elm2', { x: 500, duration: 1 })
		/* //json과 결합되는 트리거 */

		/* 움직이는 원 트리거 */
		const tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: '.one',
				pin: '.sec05',
				// pin: true,
				// toggleClass: {targets: 'nav', className: 'active'} // start 시점에서 class가 추가되고 end에서 class가 삭제된다.
				start: "top 20%",
				end: "+=6000",
				// markers: {
				// 	startColor: "#555",
				// 	endColor: "#555",
				// 	// fontSize: '1rem',
				// 	// indent: 200
				// },
				scrub: true,
			}
		});

		tl2.to('.one', { x: 800, duration: .5, delay: .1 })
			.to('.one', { x: 0, duration: .5, delay: .1 })
		/* //움직이는 원 트리거 */


		/* 움직이는 텍스트 */
		const tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: '.txt1',
				start: "top 20%",
				end: "+=6000",
				scrub: true,
			}
		});

		tl3.fromTo('.txt2', { opacity: 0 }, { opacity: 1, duration: .5 })
			.fromTo('.txt3', { opacity: 0 }, { opacity: 1, duration: .5 })
		/* //움직이는 텍스트 */

		/* 기타 연결 트리거 모션 */
		let sections = gsap.utils.toArray(".section");

		sections.forEach((section) => {
			let title = section.querySelector(".title");
			let text = section.querySelector(".text");
			gsap
				.timeline({
					scrollTrigger: {
						trigger: section,
						start: "top center",
						end: "+=400",
						scrub: true,
						// markers: true
					}
				})

				.from(title, {
					opacity: 0,
					x: 500,
					// delay: 1
				})

				.from(text, {
					xPercent: -120
				});
		});
		/* //기타 연결 트리거 모션 */
		/* //스크롤 연결 노출 -------------------------------------------------------------------------------- */
	}
	function sub2() {
		var controller = new ScrollMagic.Controller();

		function pathPrepare($el) {
			var lineLength = $el[0].getTotalLength();
			$el.css("stroke-dasharray", lineLength);
			$el.css("stroke-dashoffset", lineLength);
			console.log(lineLength)
		}

		var $1 = $("path#1");
		var $2 = $("path#2");
		var $3 = $("path#3");
		var $4 = $("path#4");
		var $5 = $("path#5");
		pathPrepare($1);
		pathPrepare($2);
		pathPrepare($3);
		pathPrepare($4);
		pathPrepare($5);
		var tween = new TimelineMax()
			.add(TweenMax.to($1, 4, { strokeDashoffset: 0, ease: Linear.easeNone }))
			.add(TweenMax.to($5, 3, { strokeDashoffset: 0, ease: Linear.easeNone }))
		var scene = new ScrollMagic.Scene({
			triggerElement: "#trigger", triggerHook: 0.3, duration: 1000
		})
			.setTween(tween)
			.addTo(controller);
	}
	function sub3() {
		let clusterTimeline;

		clusterTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: this.clusterSectionElem,
				start: () => "top top",
				end: () => `+=4000% bottom`, // 전체 스크롤 길이.
				scrub: 1,
				pin: true,
				pinSpacing: true,
				// markers: true,
				invalidateOnRefresh: true,
				id: 'impact-cluster',
				fastScrollEnd: true,
				preventOverlaps: true
			},
		});
		clusterTimeline.to(this.clusterVerticalWrapperElem, { y: () => -window.innerHeight, duration: 30 }, "+=90");
	}










	if ($('.container').hasClass('sub1')) {
		sub1()
	}
	if ($('.container').hasClass('sub2')) {
		sub2()
	}
	if ($('.container').hasClass('sub3')) {
		sub3()
	}
	if ($('.container').hasClass('index')) {
		index()
	}



















}