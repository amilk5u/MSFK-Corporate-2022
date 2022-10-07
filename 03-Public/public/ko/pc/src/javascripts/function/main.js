function main() {


	/* main ------------------------------------------------------------------------------ */
	function index() {
		console.log('메인')
	}
	/* //main ------------------------------------------------------------------------------ */



















	function sub4() {
		gsap.defaults({ ease: "none" });
		const pulses = gsap.timeline({
			defaults: {
				duration: 0.7,
				autoAlpha: 0.9, //불투명도 
				scale: 2,
				markers: { startColor: "red", endColor: "red" },
				transformOrigin: 'center',
				ease: "elastic(2.5, 1)"
			}
		})
			.to(".ball02, .text01", {}, 0.2)
			.to(".ball03, .text02", {}, 0.33)
			.to(".ball04, .text03", {}, 0.46)

		const main = gsap.timeline({
			defaults: { duration: 2 },
			scrollTrigger: {
				trigger: "#line",
				scrub: true,
				markers: { startColor: "black", endColor: "black" },
				start: "top center",
				end: "bottom center"
			}
		})
			.to(".ball01", { duration: 0.01, autoAlpha: 1 })
			.from(".theLine", { drawSVG: 0 }, 0)
			.to(".ball01", {
				motionPath: {
					path: ".theLine",
					align: ".theLine",
					alignOrigin: [0.5, 0.5],
				}
			}, 0)
			.add(pulses, 0);
		smoothScroll("#content");

		// pin each box for 300px when they hit the top
		gsap.utils.toArray(".box").forEach(box => {
			ScrollTrigger.create({
				trigger: box,
				pin: true,
				start: "top top",
				end: "+=300"
			});
		});

		// this is the helper function that sets it all up. Pass in the content <div> and then the wrapping viewport <div> (can be the elements or selector text). It also sets the default "scroller" to the content so you don't have to do that on all your ScrollTriggers.
		/* smoothScroll -------------------------------------------------------------------- */
		function smoothScroll(content, viewport, smoothness) {
			content = gsap.utils.toArray(content)[0];
			smoothness = smoothness || 1;
			smoothness = 0.7;
			console.log(smoothness)
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
			speed: "medium",
			markers: { startColor: "green", endColor: "green" },
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

		/* 예시 연습용 */
		// gsap.to(".min", {
		// 	scrollTrigger: ".min", // start the animation when ".box" enters the viewport (once)
		// 	x: 500
		//  });
		/* //예시 연습용 */

		/* 가로 스크롤 ------------------------------------------------------ */
		gsap.to($(".sec04"), {
			x: - $('.line_wrap').outerWidth() + $(window).outerWidth(),
			scrollTrigger: {
				trigger: $(".sec04"),
				pin: true,
				start: "top top",
				end: "+=1000",
				scrub: true,
				onUpdate: function (self) {
					// gsap.to($(".over_box"), .5, { "width": 0 });
				}
			}
		});


		// gsap.to($(".over_box"), {
		// 	width: 0,
		// 	scrollTrigger: {
		// 		trigger: $(".sec04"),
		// 		// pin: true,
		// 		start: "top top",
		// 		end: "+=1000",
		// 		scrub: true,
		// 	}
		// });

		// const tl = gsap.timeline();
		// tl.to('.elm1', { x: 500, duration: 2 })
		// 	.to('.elm2', { y: 200, duration: 3 })

		const tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: '.elm2',
				start: 'top 20%',
				end: 'top 80%'
			}
		})

		tl2.to($(".elm2"), {
			x: 500,
			scrollTrigger: {
				trigger: $(".sec04"),
				pin: true,
				start: "top top",
				end: "+=1000",
				scrub: true,
			}
		});


		// const tl3 = gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: '.main',
		// 		start: 'top 20%',
		// 		end: 'top 80%'
		// 	}
		// })

		// tl2.to('.elm3', { x: 500, duration: 2 })
		// 	.to('.elm4', { y: 200, duration: 3 })
		/* //가로 스크롤 ------------------------------------------------------ */


		/* ScrollMagic ------------------------------------------------------ */
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
		/* ScrollMagic ------------------------------------------------------ */
	}























	function sub5() {
		var $doc = $(document),
			$win = $(window),
			$svg = $('.latter').drawsvg(),
			max = $doc.height() - $win.height();
		$win.on('scroll', function () {
			var p = $win.scrollTop() / max;
			$svg.drawsvg('progress', p);
			console.log(p)
		});
	}


	function sub6() {
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

	if ($('.container').hasClass('sub4')) {
		sub4()
	}
	if ($('.container').hasClass('sub5')) {
		sub5()
	}
	if ($('.container').hasClass('sub6')) {
		sub6()
	}
	if ($('.container').hasClass('index')) {
		index()
	}


}