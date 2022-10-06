function main() {
	function sub1() {
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
			console.log(animation)
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

			console.log('animOffset', animOffset)
			console.log('animTriggerHook', animTriggerHook)
			console.log('animDuration', animDuration)

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

				console.log(duration)
			})
		})
	}
	function sub2() {
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
			console.log(animation)
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

			console.log('animOffset', animOffset)
			console.log('animTriggerHook', animTriggerHook)
			console.log('animDuration', animDuration)

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
				console.log(parent.offsetHeight)
				console.log(animation.offsetHeight)
				console.log(animDuration)
			})
		})
	}






	function sub3() {
		LottieScrollTrigger({
			target: "#animationWindow #first",
			path: "https://assets10.lottiefiles.com/packages/lf20_dgb1giim.json",
			// path: "./datafile/test.json",
			speed: "medium",
			start: "top top",
			end: "+=100%",
			pin: '.wrap1',
			pinSpacing: true,
			markers: true,
			scrub: true // seconds it takes for the playhead to "catch up"
		});

		LottieScrollTrigger({
			target: "#animationWindow #second",
			// path: "https://assets6.lottiefiles.com/packages/lf20_k3zb2fto.json",
			path: "./datafile/test.json",
			speed: "medium",
			start: (self) => self.previous().end,
			end: "+=100%",
			pin: '.wrap1',
			pinSpacing: true,
			markers: true,
			scrub: true // seconds it takes for the playhead to "catch up"
		});

		LottieScrollTrigger({
			target: "#animationWindow #third",
			path: "https://assets2.lottiefiles.com/packages/lf20_qne7yq0l.json",
			// path: "./datafile/test2.json",
			speed: "medium",
			start: (self) => self.previous().end,
			end: "+=100%",
			pin: '.wrap1',
			pinSpacing: true,
			markers: true,
			scrub: true // seconds it takes for the playhead to "catch up"
		});




		function LottieScrollTrigger(vars) {
			console.log(vars)

			let playhead = { frame: 0 },
				target = gsap.utils.toArray(vars.target)[0],
				speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
				st = {
					trigger: target,
					pin: true,
					start: "top top",
					end: speeds[vars.speed] || "+=1000",
					scrub: 1
				},
				animation = lottie.loadAnimation({
					container: target,
					renderer: vars.renderer || "svg",
					loop: false,
					autoplay: false,
					path: vars.path
				});
			for (let p in vars) {
				// let users override the ScrollTrigger defaults
				st[p] = vars[p];
			}
			animation.addEventListener("DOMLoaded", function () {
				gsap.to(playhead, {
					frame: animation.totalFrames - 1,
					ease: "none",
					onUpdate: () => animation.goToAndStop(playhead.frame, true),
					scrollTrigger: st
				});
				// in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
				ScrollTrigger.sort();
				ScrollTrigger.refresh();
			});
			return animation;
		}


	}


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
		function smoothScroll(content, viewport, smoothness) {
			console.log(content)
			console.log(viewport)
			console.log(smoothness)

			content = gsap.utils.toArray(content)[0];
			smoothness = smoothness || 1;

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
		// for a horizontal version, see https://codepen.io/GreenSock/pen/rNmQPpa?editors=0010


		LottieScrollTrigger({
			target: "#animationWindow",
			// path: "https://assets.codepen.io/35984/tapered_hello.json",
			path: "./datafile/test2.json",
			speed: "medium",
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
					onUpdate: () => animation.goToAndStop(playhead.frame, true),
					scrollTrigger: st
				});
				// in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
				ScrollTrigger.sort();
				ScrollTrigger.refresh();
			});
			return animation;
		}
	}

	function sub5() {
		gsap.registerPlugin(ScrollTrigger);
		const redLog = document.querySelector(".red-log"),
			redProgress = document.querySelector(".red-progress");

		var animation = gsap.from(".line-1", {
			scaleX: 0,
			transformOrigin: "left center",
			ease: "none"
		});

		ScrollTrigger.create({
			trigger: ".red",
			start: "top 100px",
			end: "bottom bottom-=100px",
			markers: { startColor: "white", endColor: "white" },
			scrub: true,
			animation: animation,
			// onEnter: () => logRed("onEnter"),
			// onLeave: () => logRed("onLeave"),
			// onEnterBack: () => logRed("onEnterBack"),
			// onLeaveBack: () => logRed("onLeaveBack"),
			// onRefresh: () => logRed("onRefresh"),
			onUpdate: function (self) {
				redProgress.innerText = "progress: " + self.progress.toFixed(3)
			},
		});

		// gsap.to(".box", {
		// 	scrollTrigger: ".box", // start the animation when ".box" enters the viewport (once)
		// 	x: 500			
		// });


		let tl = gsap.timeline({
			// yes, we can add it to an entire timeline!
			scrollTrigger: {
				trigger: ".container",
				pin: true,   // pin the trigger element while active
				start: "top top", // when the top of the trigger hits the top of the viewport
				end: "+=500", // end after scrolling 500px beyond the start
				scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
				snap: {
					snapTo: "labels", // snap to the closest label in the timeline
					duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
					delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
					ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
				}
			}
		});

		// add animations and labels to the timeline
		tl.addLabel("start")
			.from(".box p", { scale: 0.3, rotation: 45, autoAlpha: 0 })
			.addLabel("color")
			.from(".box", { backgroundColor: "#28a92b" })
			.addLabel("spin")


		ScrollTrigger.create({
			trigger: ".gray",
			start: "top top",
			endTrigger: "#otherID",
			end: "bottom 50%+=100px",
			scrub: true,
			onToggle: self => console.log("toggled, isActive:", self.isActive),
			onUpdate: self => {
				console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
			}
		});



	}
	function sub6() {
		// gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
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
			console.log(animation)
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

			console.log('animOffset', animOffset)
			console.log('animTriggerHook', animTriggerHook)
			console.log('animDuration', animDuration)

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
				console.log(parent.offsetHeight)
				console.log(animation.offsetHeight)
				console.log(animDuration)
			})
		})
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
	if ($('.container').hasClass('sub4')) {
		sub4()
	}
	if ($('.container').hasClass('sub5')) {
		sub5()
	}
	if ($('.container').hasClass('sub6')) {
		sub6()
	}
}