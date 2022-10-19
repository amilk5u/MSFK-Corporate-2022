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
function layout() {
}
function main() {

	/* section 2 가로 스크롤 컨텐츠 (horizontal_wrap) 영역 width값 */
	let _horizontalW = -($('.horizontal_wrap .first').outerWidth() + $('.horizontal_wrap .donation_company').outerWidth() + $('.horizontal_wrap .company_partner').outerWidth()) + window.innerWidth;

	/* (start) smoothScroll	*/
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
		ScrollTrigger.prototype.update = p => p;

		ScrollTrigger.scrollerProxy(content, {
			scrollTop(value) {
				if (arguments.length) {
					isProxyScrolling = true;
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
	/* (end) smoothScroll	*/

	/* (start) section 1 Intro TimeLine ScrollTrigger */
	const introTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: $intro,
			start: "top top",
			end: "+=10000", // 전체 스크롤 길이.
			pin: $intro,
			scrub: 2,
			pinSpacing: true,
			// markers: { startColor: "blue", endColor: "blue", },
		}
	});

	// Intro 모션 1
	function introMotion1() {
		const sec1ContainerTimeLine = gsap.timeline();
		// Main Title (동행기업 국경없는의사회를 움직이는 하나의 힘)
		sec1ContainerTimeLine.to($introCont1Title, .25, { opacity: 0, yPercent: -20 }, "-=9.795")
		.to($introCont1Txt, .25, { opacity: 0, yPercent: -20 }, "-=9.79")
		// 배경 별&데코 생성
		.to($introCont1circleDeco1, .3, { opacity: 0 }, "-=9.785")
		.to($introCont1glitterCont, .2, { opacity: 0 }, "-=9.78")
		.to($introCont1circleDeco2, .3, { opacity: 0 }, "-=9.775")
		.to($introCont1miniDeco, .2, { opacity: 0 }, "-=9.77")
		.to($introCont1circleDeco3, .3, { opacity: 0 }, "-=9.765")
		.to($introCont1, .3, { display: 'none', opacity: 0 }, "-=9.76")
		.to($introCont2, .01, { display: 'block', opacity: 1 }, "-=9.75")
		// 메인 원형 생성
		.to($introCont2roundElm2, .3, { 'clip-path': 'circle(30px at 50% 50%)' }, "-=9.74")
		.to($introCont2roundElm5, .2, { 'clip-path': 'circle(60px at 50% 50%)' }, "-=9.535")
		.to($introCont2roundElm1, .2, { 'clip-path': 'circle(60px at 50% 50%)' }, "-=9.73")
		// Text 1 (국경없는의사회의 가치와 원칙을 함께하는 동행기업이 되어주세요.)
		.to($introCont2txt1, .2, { opacity: 1, yPercent: -20 }, "-=9.65")
		.to($introCont2roundElm4, .3, { 'clip-path': 'circle(50px at 50% 50%)' }, "-=9.65")
		.to($introCont2roundElm3, .3, { 'clip-path': 'circle(50px at 50% 50%)' }, "-=9.645")
		.to($introCont2roundElm6, .2, { 'clip-path': 'circle(40px at 50% 50%)' }, "-=9.64")
		.to($introCont2txt1, .3, { opacity: 0 }, "-=9")
		// Text 2 (동행기업은 국경없는의사회가 보다 많은 분쟁지역과 의료 사각지대에서 안정적인 의료 구호 활동을 펼칠 수 있도록)
		.to($introCont2txt2, .3, { opacity: 1, yPercent: -20 }, "-=8.9")
		.to($introCont2txt3, .2, { opacity: 1, yPercent: -20 }, "-=8.859")
		// 메인 원형 커지기 & 이미지 생성
		.to($introCont2Deco, .3, { opacity: 1 }, "-=8.85")
		.to($introCont2roundElm1, .7, { 'clip-path': 'circle(330px at 50% 50%)' }, "-=8.85")
		.to($introCont2roundElm2, .7, { 'clip-path': 'circle(160px at 50% 50%)' }, "-=8.845")
		.to($introCont2roundElm3, .7, { 'clip-path': 'circle(200px at 50% 50%)' }, "-=8.84")
		.to($introCont2roundElm4, .8, { 'clip-path': 'circle(220px at 50% 50%)' }, "-=8.835") 
		.to($introCont2roundElm5, .8, { 'clip-path': 'circle(240px at 50% 50%)' }, "-=8.83")
		.to($introCont2roundElm6, .7, { 'clip-path': 'circle(160px at 50% 50%)' }, "-=8.825")
		.to($introCont2Cont, .3, { 'backgroundColor': 'transparent' }, "-=8.825")
		// 작은 데코 원형 생성
		.to($introCont2circleDeco1, .2, { width: 20, height: 20 }, "-=8.83")
		.to($introCont2circleDeco3, .2, { width: 30, height: 30 }, "-=8.83")
		.to($introCont2circleDeco6, .2, { width: 20, height: 20 }, "-=8.83")
		.to($introCont2circleDeco4, .2, { width: 30, height: 30 }, "-=8.83")
		.to($introCont2circleDeco5, .2, { width: 20, height: 20 }, "-=8.83")
		.to($introCont2circleDeco2, .2, { width: 20, height: 20 }, "-=8.83")
		.to('#intro .content2 .txt_cont3 p', .2, { opacity: 0 }, "-=8.2")
		// Text 3 (기업의 이름으로 국경없는의사회의 활동을 후원하며,전세계의 긴급 구호 상황에 놓인 사람들을 위해 <br> 관심과 지원을 지속하는 파트너십입니다. )
		.to('#intro .content2 .txt_cont4 p', .3, { opacity: 1, yPercent: -20 }, "-=8.1")
		// 작은 데코 사라지기 
		.to('#intro .content2 .deco_wrap span', .0001, { opacity: 0 }, "-=7.9")
		.to('#intro .content2', .15, { display: 'none', opacity: 0 }, "-=7")
		.to('#intro .content3', .3, { display: 'flex', opacity: 1 }, "-=7")
		.to('#intro .content3 .earth_contain .txt_wrap p', .3, { opacity: 1, yPercent: -30 }, "-=7")
		// 자동차 & 지구 Video 생성
		.to('#intro .content3 .earth_contain .video_wrap video', .3, { opacity: 1 }, "-=7")
		// 별&데코 순차적으로 생성
		.to('#intro .content3 .earth_contain .circle_deco1', .2, { width: 20, height: 20 }, "-=6.95")
		.to('#intro .content3 .earth_contain .circle_deco2', .2, { width: 20, height: 20 }, "-=6.95")
		.to('#intro .content3 .earth_contain .circle_deco3', .2, { width: 30, height: 30 }, "-=6.95")
		.to('#intro .content3 .earth_contain .circle_deco4', .2, { width: 20, height: 20 }, "-=6.95")
		.to('#intro .content3 .earth_contain .circle_deco5', .2, { width: 30, height: 30 }, "-=6.95")
		.to('#intro .content3 .earth_contain .circle_deco6', .2, { width: 20, height: 20 }, "-=6.95")
		.to('#intro .content3 .earth_contain .glitter_deco1', .2, { display: 'block', opacity: 1 }, "-=6.95")
		.to('#intro .content3 .earth_contain .glitter_deco2', .2, { display: 'block', opacity: 1 }, "-=6.95")
		.to('#intro .content3 .earth_contain .glitter_deco3', .2, { display: 'block', opacity: 1 }, "-=6.95")
		.to('#intro .content3 .earth_contain .glitter_deco4', .2, { display: 'block', opacity: 1 }, "-=6.95")
		.to('#intro .content3 .earth_contain .glitter_deco5', .2, { display: 'block', opacity: 1 }, "-=6.95")
		.to('#intro .content3 .earth_contain .glitter_deco6', .2, { display: 'block', opacity: 1 }, "-=6.95")
		// 별 / 데코 / Video / Text 삭제
		.to('#intro #earthGraphMotion', .2, { opacity: 1 }, "-=6.3")
		.to('#intro .content3 .earth_contain .video_wrap video', .2, { opacity: 0 }, "-=6.3")
		.to('#intro .content3 .earth_contain .txt_wrap p', .2, { opacity: 0, yPercent: -20 }, "-=6.3")
		.to('#intro .content3 .earth_contain img', .2, { opacity: 0 }, "-=6.3")
		.to('#intro .content3 .earth_contain span', .2, { opacity: 0 }, "-=6.3")
		// 지구 그래프 json 생성
		.to('#intro .content3 .graph_contain .txt_wrap p', .3, { opacity: 1, yPercent: -20 }, "-=6.3")
		// Text 1 (총 수입)
		.to('#intro .content3 .graph_contain .income_tit', .5, { display: 'block', opacity: 1, yPercent: -20, }, "-=5.85")
		// Text 2 (19억 3500만 유로)
		.to('#intro .content3 .graph_contain .money_tit', .5, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.845")
		// Text 3 (1.5%,1.4%)
		.to('#intro .content3 .graph_contain .txt_elm1', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.65")
		.to('#intro .content3 .graph_contain .txt_elm2', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.6")
		// Text 4 (97.1% & 민간후원금)
		.to('#intro .content3 .graph_contain .bottom_txt strong', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.55")
		.to('#intro .content3 .graph_contain .bottom_txt > span', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.545")
		.to('#intro .content3', .2, { display: 'none', opacity: 0 }, "-=4.82")
		// 3개 구호 원형 라인 모션 json Text 생성
		.to('#intro .content4', .5, { display: 'block', opacity: 1 }, "-=4.8")
		// Text 1 (700 만명)
		.to('#intro .content4 .txt_wrap .elm1', .2, { opacity: 1 }, "-=4.8")
		.to('#intro .content4 .txt_wrap .elm1', .2, { opacity: 0 }, "-=3.6")
		// Text 2 (1조 9천억원)
		.to('#intro .content4 .txt_wrap .elm2', .2, { opacity: 1 }, "-=3.1")
		.to('#intro .content4 .txt_wrap .elm2', .2, { opacity: 0 }, "-=2.2")
		// Text 3 (218 억원)
		.to('#intro .content4 .txt_wrap .elm3', .2, { opacity: 1 }, "-=1.75")
		return sec1ContainerTimeLine;
	}
	introTimeline.add(introMotion1());
	/* (end) section 1 Intro TimeLine ScrollTrigger */

	/* (start) section 2 Social TimeLine ScrollTrigger */
	const socialTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: '#social',
			pin: '#social',
			start: "top top",
			// end: "+=21000",
			end: "+=15000",
			scrub: 2,
		}
	});
	// Social 모션 1
	function socialMotion1() {
		const sec1ContainerTimeLine = gsap.timeline();
		// sec1ContainerTimeLine.to('#social .content1 #seedMotion', { opacity: 1, duration: .5 })
		// 로고 색상 변경
		sec1ContainerTimeLine.to('#logo .bk_logo', { display: 'none', opacity: 0, duration: .5 })
		.to('#logo .wh_logo', { display: 'block', opacity: 1, duration: .5, delay: -.001 })
		// 텍스트 1 (기업의 사회 공헌 활동은)
		.to('#social .content1 .txt_wrap .txt_elm1', { display: 'block', opacity: 1, yPercent: -20, duration: 6, delay: 3 })
		.to('#social .content1 .txt_wrap .txt_elm1', { display: 'none', opacity: 0, duration: 6, delay: 10 })
		// 텍스트 2 (종교, 정치적 이익과 관계없이 독립적인 의료지원을 펼치는 )
		.to('#social .content1 .txt_wrap .txt_elm2', { display: 'block', opacity: 1, yPercent: -20, duration: 6 })
		.to('#social .content1 .txt_wrap .txt_elm2', { display: 'none', opacity: 0, duration: 6, delay: 5 })
		// 텍스트 3 (우리의 큰 원동력이 됩니다.)
		.to('#social .content1 .txt_wrap .txt_elm3', { display: 'block', opacity: 1, yPercent: -20, duration: 6, delay: .5 })			// line scale
		.to('#social .content1 .txt_wrap .txt_elm3', { display: 'none', opacity: 0, duration: 6, delay: 6 })
		// 텍스트 4 (우리는 변함없는 관심과 국경없는 나눔을 실천하는 기업과 함께 )
		.to('#social .content1 .txt_wrap .txt_elm4', { display: 'block', opacity: 1, yPercent: -20, duration: 6 })
		.to('#social .content1 .circle_line .circle_img1', { scale: 1, duration: 5, delay: -.9 })
		.to('#social .content1 .circle_line .circle_img2', { scale: 1, duration: 5, delay: -.8 })
		.to('#social .content1 .txt_wrap .txt_elm4', { display: 'none', opacity: 0, duration: 6, delay: 10 })
		// 텍스트 5 (국제 사회의 지속적인 발전에 기여하고, 글로벌 파트너십을 만들어 갑니다.)
		.to('#social .content1 .txt_wrap .txt_elm5', { display: 'block', opacity: 1, yPercent: -20, duration: 6, delay: 1 })
		// lottie 삭제
		.to('#social #seedMotion', { opacity: 0, duration: 3, delay: -8 })
		// 지구 영상 생성
		.to('#social .content1 .video_wrap video', { opacity: 1, duration: 8, delay: -5 })
		// 데코 생성
		.to('#social .content1 .circle_line .circle_deco6', { width: 40, height: 40, duration: 1, delay: -5.2 })
		.to('#social .content1 .circle_line .circle_deco1', { width: 50, height: 50, duration: 1, delay: -5.15 })
		.to('#social .content1 .circle_line .circle_deco5', { width: 60, height: 60, duration: 1, delay: -5.05 })
		.to('#social .content1 .circle_line .circle_deco3', { width: 30, height: 30, duration: 1, delay: -5 })
		.to('#social .content1 .circle_line .circle_deco4', { width: 50, height: 50, duration: 1, delay: -4.95 })
		.to('#social .content1 .circle_line .circle_deco2', { width: 60, height: 60, duration: 1, delay: -4.9 })
		return sec1ContainerTimeLine;
	}
	// Social 모션 2
	function socialMotion2() {
		const sec2ContainerTimeLine = gsap.timeline();

		sec2ContainerTimeLine.to('#social .content2', { display: 'block', opacity: 1 })
		.to('#social .content2', { 'clip-path': 'circle(75% at 50% 50%)', duration: 20, delay: 5 })
		.to('#social .content1', { display: 'none', opacity: 0, delay: -5 })
		// 로고 색상 변경
		.to('#logo .wh_logo', { display: 'none', opacity: 0, duration: .001, delay: -6 })
		.to('#logo .bk_logo', { display: 'block', opacity: 1, duration: .001, delay: -6 })
		//	원 데코 생성
		.to('#social .content2 .deco_wrap .circle_deco3', { width: 20, height: 20, duration: .5, delay: -.05 })
		.to('#social .content2 .deco_wrap .circle_deco1', { width: 30, height: 30, duration: .5, delay: -.05 })
		.to('#social .content2 .deco_wrap .circle_deco2', { width: 20, height: 20, duration: .5, delay: -.05 })
		.to('#social .content2 .deco_wrap .circle_deco4', { width: 40, height: 40, duration: .5, delay: -.05 })
		.to('#social .content2 .deco_wrap .circle_deco5', { width: 20, height: 20, duration: .5, delay: -.05 })
		// 미니 데코 생성
		.to('#social .content2 .mini_deco .deco1', { opacity: 1, duration: .5, delay: -.05 })
		.to('#social .content2 .mini_deco .deco2', { opacity: 1, duration: .5, delay: -.05 })
		.to('#social .content2 .mini_deco .deco3', { opacity: 1, duration: .5, delay: -.05 })
		.to('#social .content2 .mini_deco .deco4', { opacity: 1, duration: .5, delay: -.05 })
		.to('#social .content2 .mini_deco .deco5', { opacity: 1, duration: .5, delay: -.05 })
		.to('#social .content2 .mini_deco .deco6', { opacity: 1, duration: .5, delay: -.05 })
		// 원 확대 모션
		// 가로 스크롤 실행
		.to('#social .content2 .horizontal_wrap', { x: _horizontalW, duration: 60, delay: 1.5, ease: Power0.easeNone, })
		.to('#social .content2 .partner5', { border: 0, duration: 5 }) // 시간 텀 주기
		// 컨텐츠 순차적으로 나타나기
		.to('#social .content2 .donation_company .elm1', { opacity: 1, duration: 15, x: -60, delay: -68 })
		.to('#social .content2 .donation_company .elm2', { opacity: 1, duration: 15, x: -60, delay: -53 })
		.to('#social .content2 .donation_company .elm3', { opacity: 1, duration: 15, x: -60, delay: -43 })
		// 파트너로고
		.to('#social .content2 .company_partner .partner6', { opacity: 1, duration: 8, delay: -60 })
		.to('#social .content2 .company_partner .partner3', { opacity: 1, duration: 8, delay: -65 })
		.to('#social .content2 .company_partner .partner5', { opacity: 1, duration: 8, delay: -60 })
		.to('#social .content2 .company_partner .partner4', { opacity: 1, duration: 8, delay: -55 })
		.to('#social .content2 .company_partner .partner7', { opacity: 1, duration: 8, delay: -50 })
		.to('#social .content2 .company_partner .partner2', { opacity: 1, duration: 8, delay: -45 })
		.to('#social .content2 .company_partner .partner1', { opacity: 1, duration: 8, delay: -40 })
		return sec2ContainerTimeLine;
	}
	socialTimeline.add(socialMotion1());
	socialTimeline.add(socialMotion2());
	/* (end) section 2 Social TimeLine ScrollTrigger */

	/* (start) section 3 Corporation TimeLine ScrollTrigger */
	const corporationTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: '#corporation',
			pin: '#corporation',
			start: "top top",
			// end: "+=15000",
			end: "+=8500",
			scrub: 2,
		}
	});
	// Corporation 모션 1
	function corporationMotion1() {
		const sec1ContainerTimeLine = gsap.timeline();
		/* 동행기업 참여방법 ------------------- */
		// 참여방법 1
		sec1ContainerTimeLine.to('#corporation .content1 .scene1 .elm1', { opacity: 1, y: -50, duration: 6, delay: 5 })
		.to('#corporation .content1 .scene1 .elm2', { opacity: 1, y: -50, duration: 6, delay: -5 })
		.to('#corporation .content1 .scene1 .elm3', { opacity: 1, y: -50, duration: 6, delay: -5 })
		.to('#corporation .content1 .scene1', { opacity: 0, duration: 10, delay: 10 })
		// 참여방법 2
		.to('#corporation .content1 .scene2 .elm1', { opacity: 1, y: -50, duration: 6, delay: 5 })
		.to('#corporation .content1 .scene2 .elm2', { opacity: 1, y: -50, duration: 6, delay: -5 })
		.to('#corporation .content1 .scene2 .elm3', { opacity: 1, y: -50, duration: 6, delay: -5 })
		.to('#corporation .content1', { opacity: 0, duration: 10, delay: 10 })
		/* 동행기업 후원절차 ------------------- */
		.to('#corporation .content2', { display: 'block', opacity: 1, duration: 15 })
		.to('#corporation .content2 .txt_wrap', { y: -300, duration: 8 })
		// 라인 & 컨텐츠 생성
		.to('#corporation .content2 .line_stroke', { width: 420, duration: 4 })
		.to('#corporation .content2 .elm1', { opacity: 1, y: 30, duration: 4, delay: -3.5 })
		.to('#corporation .content2 .line_stroke', { width: 790, duration: 4, delay: -3.5 })
		.to('#corporation .content2 .elm2', { opacity: 1, y: 30, duration: 4, delay: -3.5 })
		.to('#corporation .content2 .line_stroke', { width: 1150, duration: 4, delay: -3.5 })
		.to('#corporation .content2 .elm3', { opacity: 1, y: 30, duration: 4, delay: -3.5 })
		.to('#corporation .content2 .line_stroke', { width: 1480, duration: 4, delay: -3.5 })
		.to('#corporation .content2 .elm4', { opacity: 1, y: 30, duration: 4, delay: -3.5 })
		.to('#corporation .content2 .line_stroke', { width: 1920, duration: 4 })
		// 동행기업 후원절차 버튼
		.to('#corporation .content2 .btn_wrap', { opacity: 1, y: -20, duration: 7, delay: -2.5 })
		.to('#corporation .content2 .copyright', { opacity: 1, y: -20, duration: 5, delay: -2.5 })
		.to('#corporation .content2', { opacity: 0, duration: 10, delay: 10 })
		/* 동행기업 참여효과 ------------------- */
		.to('#corporation .content3', { display: 'block', opacity: 1, duration: 15 })
		.to('#corporation .content3 .txt_wrap', { y: -300, duration: 8 })
		.to('#corporation .content3 .elm1', { opacity: 1, y: -20, duration: 10, delay: 6 })
		.to('#corporation .content3 .elm2', { opacity: 1, y: -20, duration: 10, delay: -10 })
		.to('#corporation .content3 .elm3', { opacity: 1, y: -20, duration: 10, delay: -10 })
		.to('#corporation .content3 .elm4', { opacity: 1, y: -20, duration: 10, delay: -10 })
		.to('#corporation .content3', { opacity: 0, duration: 10, delay: 10 })
		/* 파이널 섹션 ------------------------- */
		.to('#corporation .content4', { display: 'block', opacity: 1, duration: 3 })
		// 원형 빅 데코 3개 
		.to('#corporation .content4 .circle_deco1', { opacity: 1, duration: 6, delay: -1 })
		.to('#corporation .content4 .circle_deco2', { opacity: 1, duration: 6, delay: -1 })
		.to('#corporation .content4 .circle_deco3', { opacity: 1, duration: 2, delay: -1 })
		.to('#corporation .content4 .circle_deco3', { opacity: 1, duration: 2, delay: -1 })
		// Text 1 (우리의 동행은 보다 많은 환자를 살릴 수 있습니다.)
		.to('#corporation .content4 .txt_wrap p', { opacity: 1, duration: 10, delay: -10 })
		// Text 2 (국경없는의사회를 움직이는 하나의 힘 지금, 동행기업이 되어주세요.)
		.to('#corporation .content4 .txt_wrap strong', { opacity: 1, y: -30, duration: 12, delay: -10 })
		.to('#corporation .content4 .txt_wrap strong span', { opacity: 1, y: -30, duration: 12, delay: -10 })
		// 별&데코 생성
		.to('#corporation .content4 .glitter_cont img', { opacity: 1, duration: 10, delay: -10 })
		.to('#corporation .content4 .mini_deco span', { opacity: 1, duration: 10, delay: -10 })
		.to('#social .content2 .partner5', { border: 0, duration: 8 }) // 시간 텀 주기
		return sec1ContainerTimeLine;
	}
	corporationTimeline.add(corporationMotion1());
	/* (end) section 3 Corporation TimeLine ScrollTrigger */

	/* (start) LottieScrollTrigger */	
	// 점선원형 라인 모션 
	LottieScrollTrigger({
		target: "#circularLineMotion",
		path: "./datafile/circularLineMotion.json",
		pin: true,
		start: 1500,
		end: '+=1000',
		// speed: "medium",
		scrub: 2,
	});

	// 지구 그래프 모션
	LottieScrollTrigger({
		target: "#earthGraphMotion",
		path: "./datafile/earthGraphMotion.json",
		pin: true,
		start: 3400,
		end: '+=1500',
		// speed: "medium",
		scrub: 2,
	});

	// 3개 구호 원형 라인 모션
	LottieScrollTrigger({
		target: "#cricleLineMotion",
		path: "./datafile/cricleLineMotion.json",
		// pin: true, 
		start: 5700,
		end: '+=3300',
		// speed: "medium",
		scrub: 3,
	});

	// 움직이는 원형씨드 국경로고 모션
	LottieScrollTrigger({
		target: "#seedMotion",
		path: "./datafile/seedMotion.json",
		pin: true,
		start: 11000,
		end: '+=5000',
		// speed: "medium",
		scrub: 2,
	});

	// 가로 스크롤 라인
	LottieScrollTrigger({
		target: "#lineMotion",
		path: "./datafile/lineMotion.json",
		pin: true,
		start: 21190,
		end: '+=5100',
		// speed: "medium",
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
				},
				scrollTrigger: st,
			});
			ScrollTrigger.sort();
			ScrollTrigger.refresh();
		});
		return animation;
	}
	/* (end) LottieScrollTrigger */

	/* (start) MSFK LOGO Intro Motion (국경로고 인트로 모션) */
	setTimeout(function () {
		TweenMax.to($('.loading .img_wrap'), .5, { display: 'none', opacity: 0 })
		$(window).scrollTop(0);
	}, 1000);
	setTimeout(function () {
		TweenMax.to($('.loading'), .8, { display: 'none', opacity: 0 })
		$('body').removeClass('scroll_bar');
		$('header').addClass('scroll_p');
	}, 1500);
	/* (end) MSFK LOGO Intro Motion (국경로고 인트로 모션) */
}