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

	const $intro = $('#intro');
	const $social = $('#social');

	const $sec1Container = $('.sec1'),
		$sec1Content1 = $sec1Container.find('.content1'),
		$sec1Content1Title = $sec1Content1.find('h1'),
		$sec1Content1Txt = $sec1Content1.find('p'),
		$sec1Cont1circleDeco1 = $sec1Content1.find('.circle_deco1'),
		$sec1Cont1circleDeco2 = $sec1Content1.find('.circle_deco2'),
		$sec1Cont1circleDeco3 = $sec1Content1.find('.circle_deco3'),

		$sec1Content2 = $sec1Container.find('.content2');

	// 가로 스크롤 width 영역
	let _horizontalW = -($('.horizontal_wrap .first').outerWidth() + $('.horizontal_wrap .donation_company').outerWidth() + $('.horizontal_wrap .company_partner').outerWidth()) + window.innerWidth;

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
			onRefresh: killScrub
		});
	}
	/* //smoothScroll -------------------------------------------------------------------- */

	/* intro trigger ------------------------------------------------------------------------*/
	const introTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: $intro,
			start: "top top",
			end: "+=29000", // 전체 스크롤 길이.
			pin: $intro,
			scrub: 1,
			pinSpacing: true,
			// markers: { startColor: "blue", endColor: "blue", },
		}
	});

	function introMotion1() {
		const sec1ContainerTimeLine = gsap.timeline();
		/* content1 *******/
		// 동행기업 국경없는의사회를 움직이는 하나의 힘
		sec1ContainerTimeLine.to($sec1Content1Title, .5, { opacity: 0, yPercent: -20 }, "-=28.5")
		sec1ContainerTimeLine.to($sec1Content1Txt, .4, { opacity: 0, yPercent: -20 }, "-=28.1")
		// 라운드 배경 데코
		sec1ContainerTimeLine.to($sec1Cont1circleDeco1, .2, { opacity: 0 }, "-=27.9")
		sec1ContainerTimeLine.to($sec1Cont1circleDeco2, .2, { opacity: 0 }, "-=27.7")
		sec1ContainerTimeLine.to($sec1Cont1circleDeco3, .2, { opacity: 0 }, "-=27.5")
		sec1ContainerTimeLine.to('#intro .content1 .mini_deco', .2, { opacity: 0 }, "-=27.3")
		sec1ContainerTimeLine.to('#intro .content1 .glitter_cont', .2, { opacity: 0 }, "-=27.1")
		sec1ContainerTimeLine.to($sec1Content1, .5, { display: 'none', opacity: 0 }, "-=26.6")

		/* content2 *******/
		sec1ContainerTimeLine.to($sec1Content2, .01, { display: 'block', opacity: 1 }, "-=26.59")
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont1 p', .5, { opacity: 1, yPercent: -20 }, "-=26.09")
		// 메인 원형 생기기
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm6', .2, { width: 40, height: 40 }, "-=25.89")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm1', .2, { width: 60, height: 60 }, "-=25.69")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm5', .2, { width: 60, height: 60 }, "-=25.49")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm2', .2, { width: 30, height: 30 }, "-=25.29")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm4', .2, { width: 50, height: 50 }, "-=25.09")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm3', .2, { width: 50, height: 50 }, "-=24.89")
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont1 p', .5, { opacity: 0 }, "-=24.39")
		// 텍스트 2
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont2 p', .5, { opacity: 1, yPercent: -20 }, "-=23.89")
		// 메인 원형 커지기
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm1', .2, { width: 330, height: 330 }, "-=23.69")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm6', .2, { width: 160, height: 160 }, "-=23.49")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm3', .2, { width: 200, height: 200 }, "-=23.29")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm4', .2, { width: 220, height: 220 }, "-=23.09")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm2', .2, { width: 160, height: 160 }, "-=22.89")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm5', .2, { width: 240, height: 240 }, "-=22.69")
		// 작은 데코 원형
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco1', .2, { width: 20, height: 20 }, "-=22.49")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco3', .2, { width: 30, height: 30 }, "-=22.29")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco6', .2, { width: 20, height: 20 }, "-=22.09")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco4', .2, { width: 30, height: 30 }, "-=21.89")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco5', .2, { width: 20, height: 20 }, "-=21.69")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco2', .2, { width: 20, height: 20 }, "-=21.49")
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont2 p', .5, { opacity: 0 }, "-=20.99")
		// 텍스트 3
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont3 p', .5, { opacity: 1, yPercent: -20 }, "-=20.49")
		// 사진 이미지 생기기
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm2 img', .3, { bottom: 0 }, "-=20.19")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm6 img', .3, { bottom: 0 }, "-=19.89")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm4 img', .3, { bottom: 0 }, "-=19.59")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm1 img', .3, { bottom: 0 }, "-=19.29")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm5 img', .3, { bottom: 0 }, "-=18.99")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm3 img', .3, { bottom: 0 }, "-=18.69")
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont3 p', .5, { opacity: 0, yPercent: 0 }, "-=18.19")
		// 작은 데코 사라지기 *****
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap span', .0001, { opacity: 0, delay: 2 }, "-=18.1899")
		// 텍스트 4
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont4 p', .5, { opacity: 1, yPercent: -20 }, "-=17.6899")
		sec1ContainerTimeLine.to('#intro .content2', 1, { display: 'none', opacity: 0 }, "-=14.1899")

		sec1ContainerTimeLine.to('#intro .content3', .5, { display: 'flex', opacity: 1 }, "-=13.1899")
		sec1ContainerTimeLine.to('#intro .content3', .5, { display: 'flex', opacity: 1 }, "-=12.6899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .txt_wrap p', .2, { opacity: 1, yPercent: -10 }, "-=12.4899")

		// video
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .video_wrap video', .6, { opacity: 1 }, "-=11.8899")
		// deco 순차적으로 나타나기
		// 원 데코
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco1', .2, { width: 20, height: 20 }, "-=11.6899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco2', .2, { width: 20, height: 20 }, "-=11.4899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco3', .2, { width: 30, height: 30 }, "-=11.2899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco4', .2, { width: 20, height: 20 }, "-=11.0899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco5', .2, { width: 30, height: 30 }, "-=10.8899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco6', .2, { width: 20, height: 20 }, "-=10.6899")
		// 별 데코
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco1', .2, { display: 'block', opacity: 1 }, "-=10.4899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco2', .2, { display: 'block', opacity: 1 }, "-=10.2899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco3', .2, { display: 'block', opacity: 1 }, "-=10.0899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco4', .2, { display: 'block', opacity: 1 }, "-=9.8899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco5', .2, { display: 'block', opacity: 1 }, "-=9.6899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco6', .2, { display: 'block', opacity: 1 }, "-=9.4899")
		// 별 / 원 / 비디오 / 텍스트 지우기
		sec1ContainerTimeLine.to('#intro #earthGraphMotion', .2, { opacity: 1 }, "-=9.2899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .video_wrap video', .5, { opacity: 0 }, "-=8.7899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .txt_wrap p', .2, { opacity: 0, yPercent: 0 }, "-=8.5899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain img', .2, { opacity: 0 }, "-=8.3899")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain span', .2, { opacity: 0 }, "-=8.1899")
		// 지구 그래프
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .txt_wrap p', .5, { opacity: 1, yPercent: -20 }, "-=7.6899")
		// 총 수입
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .income_tit', .5, { display: 'block', opacity: 1, yPercent: -20, }, "-=8")
		// 19억 3500만 유로
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .money_tit', .5, { display: 'block', opacity: 1, yPercent: -20 }, "-=7.5899")
		// 퍼센트
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .txt_elm1', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=6.4899")
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .txt_elm2', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=6.2899")
		// bottom
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .bottom_txt strong', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=6.0899")
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .bottom_txt > span', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.8899")
		sec1ContainerTimeLine.to('#intro .content3', .5, { display: 'none', opacity: 0 }, "-=5.3899")

		// 원형 라인 따라 움직이는 모션의 텍스트 나타나기
		sec1ContainerTimeLine.to('#intro .content4', .5, { display: 'block', opacity: 1 }, "-=4.8899")
		// 700 만명
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', .5, { opacity: 1 }, "-=5")
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', 2, { display: 'block' }, "-=3.3899")
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', .3, { opacity: 0 }, "-=3.0899")
		// 1조 9천억원
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', .5, { opacity: 1 }, "-=2.3899")
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', 2, { display: 'block' }, "-=3.3899")
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', .3, { opacity: 0 }, "-=1.0899")
		// 218 억원
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', .5, { opacity: 1 }, "-=0.3899")
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', 2, { display: 'block' }, "-=3.3899")
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', .3, { opacity: 0 }, "-=3.0899")

		return sec1ContainerTimeLine;
	}

	// function introMotion2() {
	// 	const sec2ContainerTimeLine = gsap.timeline();
	// 	sec2ContainerTimeLine.to('#intro .content3', { display: 'flex', opacity: 1, duration: .5, delay: -1 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .txt_wrap p', { opacity: 1, yPercent: -10, duration: .2, delay: -.5 })
	// 	// video
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .video_wrap video', { opacity: 1, duration: .2, delay: -.2 })
	// 	// deco 순차적으로 나타나기
	// 	// 원 데코
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco1', { width: 20, height: 20, duration: .2, delay: -.11 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco2', { width: 20, height: 20, duration: .2, delay: -.12 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco3', { width: 30, height: 30, duration: .2, delay: -.16 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco4', { width: 20, height: 20, duration: .2, delay: -.14 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco5', { width: 30, height: 30, duration: .2, delay: -.18 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco6', { width: 20, height: 20, duration: .2, delay: -.15 })
	// 	// 별 데코
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco1', { display: 'block', opacity: 1, duration: .2, delay: -.18 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco2', { display: 'block', opacity: 1, duration: .2, delay: -.14 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco3', { display: 'block', opacity: 1, duration: .2, delay: -.16 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco4', { display: 'block', opacity: 1, duration: .2, delay: -.11 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco5', { display: 'block', opacity: 1, duration: .2, delay: -.12 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco6', { display: 'block', opacity: 1, duration: .2, delay: -.17 })
	// 	// 별 / 원 / 비디오 / 텍스트 지우기
	// 	sec2ContainerTimeLine.to('#intro #earthGraphMotion', { opacity: 1, duration: .2, delay: .5 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .video_wrap video', { opacity: 0, duration: .2 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain .txt_wrap p', { opacity: 0, yPercent: 0, duration: .2, delay: -.2 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain img', { opacity: 0, duration: .2, delay: -.1 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .earth_contain span', { opacity: 0, duration: .2, delay: -.1 })
	// 	// 지구 그래프 
	// 	sec2ContainerTimeLine.to('#intro .content3 .graph_contain .txt_wrap p', { opacity: 1, yPercent: -20, duration: .5 })
	// 	// 총 수입
	// 	sec2ContainerTimeLine.to('#intro .content3 .graph_contain .income_tit', { display: 'block', opacity: 1, yPercent: -20, duration: .5, delay: .5 })
	// 	// 19억 3500만 유로
	// 	sec2ContainerTimeLine.to('#intro .content3 .graph_contain .money_tit', { display: 'block', opacity: 1, yPercent: -20, duration: .3 })
	// 	// 퍼센트
	// 	sec2ContainerTimeLine.to('#intro .content3 .graph_contain .txt_elm1', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .graph_contain .txt_elm2', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
	// 	// bottom 
	// 	sec2ContainerTimeLine.to('#intro .content3 .graph_contain .bottom_txt strong', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
	// 	sec2ContainerTimeLine.to('#intro .content3 .graph_contain .bottom_txt > span', { display: 'block', opacity: 1, yPercent: -20, duration: .2 })
	// 	sec2ContainerTimeLine.to('#intro .content3', { display: 'none', opacity: 0, duration: .5, delay: 1 })

	// 	// 원형 라인 따라 움직이는 모션 의 텍스트 나타나기
	// 	sec2ContainerTimeLine.to('#intro .content4', { display: 'block', opacity: 1, duration: .5 })
	// 	// 텍스트 1
	// 	sec2ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', { opacity: 1, duration: .5, delay: -1 })
	// 	sec2ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', { opacity: 0, duration: .3, delay: .5 })
	// 	// 텍스트 2
	// 	sec2ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', { opacity: 1, duration: .8, delay: 2 })
	// 	sec2ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', { opacity: 0, duration: .3 })
	// 	// 텍스트 3
	// 	sec2ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', { opacity: 1, duration: .8 })
	// 	sec2ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', { opacity: 0, duration: .3 })
	// 	return sec2ContainerTimeLine;
	// }
	introTimeline.add(introMotion1());
	// introTimeline.add(introMotion2());
	/* //intro trigger ------------------------------------------------------------------------*/

	/* social contribution trigger ------------------------------------------------------------------------*/
	const socialTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: '#social',
			pin: '#social',
			start: "top top",
			end: "+=10000",
			scrub: 2,
		}
	});
	function socialMotion1() {
		const sec1ContainerTimeLine = gsap.timeline();
		sec1ContainerTimeLine.to('#social .content1 #seedMotion', { opacity: 1, duration: .5 })
		// 로고 색상 변경
		sec1ContainerTimeLine.to('#logo .bk_logo', { display: 'none', opacity: 0, duration: .001 })
		sec1ContainerTimeLine.to('#logo .wh_logo', { display: 'block', opacity: 1, duration: .001, delay: -.001 })
		// 텍스트 1 (기업의 사회 공헌 활동은)
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm1', { display: 'block', opacity: 1, yPercent: -20, duration: 6, delay: 3 })
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm1', { display: 'none', opacity: 0, duration: 6, delay: 18 })
		// 텍스트 2 (종교, 정치적 이익과 관계없이 독립적인 의료지원을 펼치는 )
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm2', { display: 'block', opacity: 1, yPercent: -20, duration: 6 })
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm2', { display: 'none', opacity: 0, duration: 6, delay: 50 })
		// 텍스트 3 (우리의 큰 원동력이 됩니다.)
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm3', { display: 'block', opacity: 1, yPercent: -20, duration: 6, delay: .5 })			// line scale
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm3', { display: 'none', opacity: 0, duration: 6, delay: 30 })
		// 텍스트 4 (우리는 변함없는 관심과 국경없는 나눔을 실천하는 기업과 함께 )
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm4', { display: 'block', opacity: 1, yPercent: -20, duration: 6 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_img1', { scale: 1, duration: 5, delay: -.9 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_img2', { scale: 1, duration: 5, delay: -.8 })
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm4', { display: 'none', opacity: 0, duration: 6, delay: 40 })
		// 텍스트 5 (국제 사회의 지속적인 발전에 기여하고, 글로벌 파트너십을 만들어 갑니다.)
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm5', { display: 'block', opacity: 1, yPercent: -20, duration: 6, delay: 1 })
		// lottie 삭제
		sec1ContainerTimeLine.to('#social #seedMotion', { opacity: 0, duration: 8, delay: -.8 })
		// 지구 영상 생성
		sec1ContainerTimeLine.to('#social .content1 .video_wrap video', { opacity: 1, duration: 8, delay: -.8 })
		// 데코 생성
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco6', { width: 40, height: 40, duration: 3, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco1', { width: 50, height: 50, duration: 3, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco5', { width: 60, height: 60, duration: 3, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco3', { width: 30, height: 30, duration: 3, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco4', { width: 50, height: 50, duration: 3, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco2', { width: 60, height: 60, duration: 3, delay: -.15 })
		return sec1ContainerTimeLine;
	}
	function socialMotion2() {
		const sec2ContainerTimeLine = gsap.timeline();

		sec2ContainerTimeLine.to('#social .content2', { display: 'block', opacity: 1 })
		sec2ContainerTimeLine.to('#social .content2', { 'clip-path': 'circle(75% at 50% 50%)', duration: 20, delay: 30 })
		// 로고 색상 변경
		sec2ContainerTimeLine.to('#logo .wh_logo', { display: 'none', opacity: 0, duration: .001, delay: -.001 })
		sec2ContainerTimeLine.to('#logo .bk_logo', { display: 'block', opacity: 1, duration: .001 })
		//	원 데코 생성
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco3', { width: 20, height: 20, duration: 3, delay: -.2 })
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco1', { width: 30, height: 30, duration: 3, delay: -.2 })
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco2', { width: 20, height: 20, duration: 3, delay: -.2 })
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco4', { width: 40, height: 40, duration: 3, delay: -.2 })
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco5', { width: 20, height: 20, duration: 3, delay: -.2 })
		// 미니 데코 생성
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco1', { opacity: 1, duration: 2, delay: -.15 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco2', { opacity: 1, duration: 2, delay: -.15 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco3', { opacity: 1, duration: 2, delay: -.15 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco4', { opacity: 1, duration: 2, delay: -.15 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco5', { opacity: 1, duration: 2, delay: -.15 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco6', { opacity: 1, duration: 2, delay: -.15 })
		// 원 확대 모션
		// sec2ContainerTimeLine.to('#social .content2 .horizontal_wrap', { backgroundColor: '#fff', duration: 0.001, })
		// sec2ContainerTimeLine.to('#social .content2 .hidden_box', { backgroundColor: 'transparent', duration: 0.001 })
		// 가로 스크롤 실행
		sec2ContainerTimeLine.to('#social .content2 .horizontal_wrap', { x: _horizontalW, duration: 140, delay: 1.5, ease: Power0.easeNone, })
		sec2ContainerTimeLine.to('#social .content2 .partner5', { border: 0, duration: 30 }) // 시간 텀 주기

		// sec2ContainerTimeLine.to('#social', { border: 0, duration: 5})
		// 컨텐츠 순차적으로 나타나기
		sec2ContainerTimeLine.to('#social .content2 .donation_company .elm1', { opacity: 1, duration: 15, x: -60, delay: -175 })
		sec2ContainerTimeLine.to('#social .content2 .donation_company .elm2', { opacity: 1, duration: 15, x: -60, delay: -140 })
		sec2ContainerTimeLine.to('#social .content2 .donation_company .elm3', { opacity: 1, duration: 15, x: -60, delay: -110 })
		return sec2ContainerTimeLine;
	}
	socialTimeline.add(socialMotion1());
	socialTimeline.add(socialMotion2());
	/* //social contribution trigger ------------------------------------------------------------------------*/

	/* corporation trigger ------------------------------------------------------------------------*/
	const corporationTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: '#corporation',
			pin: '#corporation',
			start: "top top",
			end: "+=15000",
			scrub: 2,
		}
	});
	function corporationMotion1() {
		const sec1ContainerTimeLine = gsap.timeline();
		/* 동행기업 참여방법 ----------------------------------------------------------- */
		// 참여방법 1
		sec1ContainerTimeLine.to('#corporation .content1 .scene1 .elm1', { opacity: 1, y: -50, duration: 6, delay: 5 })
		sec1ContainerTimeLine.to('#corporation .content1 .scene1 .elm2', { opacity: 1, y: -50, duration: 6 })
		sec1ContainerTimeLine.to('#corporation .content1 .scene1 .elm3', { opacity: 1, y: -50, duration: 6 })
		sec1ContainerTimeLine.to('#corporation .content1 .scene1', { opacity: 0, duration: 10, delay: 20 })
		// 참여방법 2
		sec1ContainerTimeLine.to('#corporation .content1 .scene2 .elm1', { opacity: 1, y: -50, duration: 6, delay: 15 })
		sec1ContainerTimeLine.to('#corporation .content1 .scene2 .elm2', { opacity: 1, y: -50, duration: 6 })
		sec1ContainerTimeLine.to('#corporation .content1 .scene2 .elm3', { opacity: 1, y: -50, duration: 6 })
		sec1ContainerTimeLine.to('#corporation .content1', { opacity: 0, duration: 10, delay: 10 })

		/* 동행기업 후원절차 --------------------------------------------------------------- */
		sec1ContainerTimeLine.to('#corporation .content2', { display: 'block', opacity: 1, duration: 15 })
		sec1ContainerTimeLine.to('#corporation .content2 .txt_wrap', { y: -300, duration: 8 })
		// 라인 & 컨텐츠 생성
		sec1ContainerTimeLine.to('#corporation .content2 .line_stroke', { width: 420, duration: 4 })
		sec1ContainerTimeLine.to('#corporation .content2 .elm1', { opacity: 1, y: 30, duration: 4 })
		sec1ContainerTimeLine.to('#corporation .content2 .line_stroke', { width: 790, duration: 4, delay: -.12 })
		sec1ContainerTimeLine.to('#corporation .content2 .elm2', { opacity: 1, y: 30, duration: 4, delay: -.12 })
		sec1ContainerTimeLine.to('#corporation .content2 .line_stroke', { width: 1150, duration: 4, delay: -.12 })
		sec1ContainerTimeLine.to('#corporation .content2 .elm3', { opacity: 1, y: 30, duration: 4, delay: -.12 })
		sec1ContainerTimeLine.to('#corporation .content2 .line_stroke', { width: 1480, duration: 4, delay: -.12 })
		sec1ContainerTimeLine.to('#corporation .content2 .elm4', { opacity: 1, y: 30, duration: 4, delay: -.12 })
		sec1ContainerTimeLine.to('#corporation .content2 .line_stroke', { width: 1920, duration: 4 })
		// 버튼
		sec1ContainerTimeLine.to('#corporation .content2 .btn_wrap', { opacity: 1, y: -20, duration: 7, delay: -.5 })
		sec1ContainerTimeLine.to('#corporation .content2 .copyright', { opacity: 1, y: -20, duration: 5, delay: -.3 })
		sec1ContainerTimeLine.to('#corporation .content2', { opacity: 0, duration: 10, delay: 20 })

		/* 동행기업 참여효과 ------------------------------------------------------------------------- */
		sec1ContainerTimeLine.to('#corporation .content3', { display: 'block', opacity: 1, duration: 15 })
		sec1ContainerTimeLine.to('#corporation .content3 .txt_wrap', { y: -300, duration: 8 })
		sec1ContainerTimeLine.to('#corporation .content3 .elm1', { opacity: 1, y: -20, duration: 10, delay: 6 })
		sec1ContainerTimeLine.to('#corporation .content3 .elm2', { opacity: 1, y: -20, duration: 10, delay: -.12 })
		sec1ContainerTimeLine.to('#corporation .content3 .elm3', { opacity: 1, y: -20, duration: 10, delay: -.12 })
		sec1ContainerTimeLine.to('#corporation .content3 .elm4', { opacity: 1, y: -20, duration: 10, delay: -.12 })
		sec1ContainerTimeLine.to('#corporation .content3', { opacity: 0, duration: 10, delay: 20 })

		/* 마지막 섹션 -------------------------------------------------------------------------------- */
		sec1ContainerTimeLine.to('#corporation .content4', { display: 'block', opacity: 1, duration: 10 })
		// 데코 
		sec1ContainerTimeLine.to('#corporation .content4 .circle_deco1', { opacity: 1, duration: 6, delay: -1 })
		sec1ContainerTimeLine.to('#corporation .content4 .circle_deco2', { opacity: 1, duration: 6 })
		sec1ContainerTimeLine.to('#corporation .content4 .circle_deco3', { opacity: 1, duration: 2 })
		sec1ContainerTimeLine.to('#corporation .content4 .circle_deco3', { opacity: 1, duration: 2 })

		// 텍스트 내용
		sec1ContainerTimeLine.to('#corporation .content4 .txt_wrap p', { opacity: 1, duration: 10, delay: -2 })
		sec1ContainerTimeLine.to('#corporation .content4 .txt_wrap strong', { opacity: 1, y: -30, duration: 12, delay: -2 })
		sec1ContainerTimeLine.to('#corporation .content4 .txt_wrap strong span', { opacity: 1, y: -30, duration: 12, delay: -1 })
		// 미니 데코
		sec1ContainerTimeLine.to('#corporation .content4 .glitter_cont img', { opacity: 1, duration: 10, delay: -10 })
		sec1ContainerTimeLine.to('#corporation .content4 .mini_deco span', { opacity: 1, duration: 10, delay: -10 })

		sec1ContainerTimeLine.to('#social .content2 .partner5', { border: 0, duration: 20 }) // 시간 텀 주기
		return sec1ContainerTimeLine;
	}
	corporationTimeline.add(corporationMotion1());
	/* //corporation trigger ------------------------------------------------------------------------*/

	/* LottieScrollTrigger ------------------------------------------ */
	// 원형 라인 
	LottieScrollTrigger({
		target: "#circularLineMotion",
		path: "./datafile/sec05.json",
		pin: true,
		start: 11100,
		end: '+=2850',
		speed: "medium",
		scrub: 2,
	});

	// 그래프 모션
	LottieScrollTrigger({
		target: "#earthGraphMotion",
		path: "./datafile/sec_08.json",
		pin: true,
		start: 19500,
		end: '+=4000',
		speed: "medium",
		scrub: 2,
	});

	// 구호 원형 라인 모션
	LottieScrollTrigger({
		target: "#cricleLineMotion",
		path: "./datafile/sec09-11-2_bg.json",
		// pin: true,
		start: 24950,
		end: '+=4050',
		speed: "medium",
		// markers: { startColor: "blue", endColor: "blue" },
		scrub: 3,
	});

	// 움직이는 원형씨드 국경 로고
	LottieScrollTrigger({
		target: "#seedMotion",
		path: "./datafile/sec12.json",
		pin: true,
		start: 30000,
		end: '+=5200',
		speed: "medium",
		scrub: 2,
	});

	// 가로 스크롤 라인
	LottieScrollTrigger({
		target: "#lineMotion",
		path: "./datafile/line_test.json",
		pin: true,
		start: 36420,
		end: '+=3200',
		speed: "medium",
		scrub: 3,
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
		for (let p in vars) { 
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