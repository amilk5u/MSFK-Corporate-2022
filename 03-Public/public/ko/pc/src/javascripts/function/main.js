function main() {

	/* 	setTimeout(function () {
			TweenMax.to($('.loading'), 1.2, { display:'none', opacity:0 })
		}, 1200);
		setTimeout(function () {
			$('body').removeClass('scroll_bar');
			// $('header').addClass('scroll_p');
			$(window).scrollTop(0);
		}, 2300); */

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
			end: "+=10000", // 전체 스크롤 길이.
			pin: $intro,
			scrub: 2,
			pinSpacing: true,
			// markers: { startColor: "blue", endColor: "blue", },
		}
	});

	function introMotion1() {
		const sec1ContainerTimeLine = gsap.timeline();
		/* content1 *******/
		// 동행기업 국경없는의사회를 움직이는 하나의 힘
		sec1ContainerTimeLine.to($sec1Content1Title, .25, { opacity: 0, yPercent: -20 }, "-=9.795")
		sec1ContainerTimeLine.to($sec1Content1Txt, .25, { opacity: 0, yPercent: -20 }, "-=9.79")
		// 라운드 배경 데코
		sec1ContainerTimeLine.to($sec1Cont1circleDeco1, .3, { opacity: 0 }, "-=9.785")
		sec1ContainerTimeLine.to('#intro .content1 .glitter_cont', .2, { opacity: 0 }, "-=9.78")
		sec1ContainerTimeLine.to($sec1Cont1circleDeco2, .3, { opacity: 0 }, "-=9.775")
		sec1ContainerTimeLine.to('#intro .content1 .mini_deco', .2, { opacity: 0 }, "-=9.77")
		sec1ContainerTimeLine.to($sec1Cont1circleDeco3, .3, { opacity: 0 }, "-=9.765")
		sec1ContainerTimeLine.to($sec1Content1, .3, { display: 'none', opacity: 0 }, "-=9.76")

		// /* content2 *******/
		sec1ContainerTimeLine.to($sec1Content2, .01, { display: 'block', opacity: 1 }, "-=9.75")
		// // 메인 원형 생기기
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm2', .3, { 'clip-path': 'circle(30px at 50% 50%)' }, "-=9.74")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm5', .2, { 'clip-path': 'circle(60px at 50% 50%)' }, "-=9.535")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm1', .2, { 'clip-path': 'circle(60px at 50% 50%)' }, "-=9.73")
		// 텍스트 1 (국경없는의사회의 가치와 원칙을 함께하는 동행기업이 되어주세요.)
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont1 p', .2, { opacity: 1, yPercent: -20 }, "-=9.65")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm4', .3, { 'clip-path': 'circle(50px at 50% 50%)' }, "-=9.65")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm3', .3, { 'clip-path': 'circle(50px at 50% 50%)' }, "-=9.645")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm6', .2, { 'clip-path': 'circle(40px at 50% 50%)' }, "-=9.64")


		sec1ContainerTimeLine.to('#intro .content2 .txt_cont1 p', .3, { opacity: 0 }, "-=9")
		// 텍스트 2 (동행기업은 국경없는의사회가 보다 많은 분쟁지역과 의료 사각지대에서 안정적인 의료 구호 활동을 펼칠 수 있도록)
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont2 p', .3, { opacity: 1, yPercent: -20 }, "-=8.9")
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont3 p', .2, { opacity: 1, yPercent: -20 }, "-=8.859")
		// 메인 원형 커지기
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap > div span', .3, { opacity: 1 }, "-=8.85")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm1', .7, { 'clip-path': 'circle(330px at 50% 50%)' }, "-=8.85")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm2', .7, { 'clip-path': 'circle(160px at 50% 50%)' }, "-=8.845")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm3', .7, { 'clip-path': 'circle(200px at 50% 50%)' }, "-=8.84")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm4', .8, { 'clip-path': 'circle(220px at 50% 50%)' }, "-=8.835")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm5', .8, { 'clip-path': 'circle(240px at 50% 50%)' }, "-=8.83")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm6', .7, { 'clip-path': 'circle(160px at 50% 50%)' }, "-=8.825")
		sec1ContainerTimeLine.to('#intro .content2 .round_wrap > div', .3, { 'backgroundColor': 'transparent' }, "-=8.825")
		// 작은 데코 원형
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco1', .2, { width: 20, height: 20 }, "-=8.83")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco3', .2, { width: 30, height: 30 }, "-=8.83")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco6', .2, { width: 20, height: 20 }, "-=8.83")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco4', .2, { width: 30, height: 30 }, "-=8.83")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco5', .2, { width: 20, height: 20 }, "-=8.83")
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco2', .2, { width: 20, height: 20 }, "-=8.83")

		sec1ContainerTimeLine.to('#intro .content2 .txt_cont3 p', .2, { opacity: 0 }, "-=8.2")
		// 텍스트 4 (기업의 이름으로 국경없는의사회의 활동을 후원하며,전세계의 긴급 구호 상황에 놓인 사람들을 위해 <br> 관심과 지원을 지속하는 파트너십입니다. )
		sec1ContainerTimeLine.to('#intro .content2 .txt_cont4 p', .3, { opacity: 1, yPercent: -20 }, "-=8.1")

		// 작은 데코 사라지기 *****
		sec1ContainerTimeLine.to('#intro .content2 .deco_wrap span', .0001, { opacity: 0 }, "-=7.9")
		// 사라지기 
		sec1ContainerTimeLine.to('#intro .content2', .15, { display: 'none', opacity: 0 }, "-=7")
		sec1ContainerTimeLine.to('#intro .content3', .3, { display: 'flex', opacity: 1 }, "-=7")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .txt_wrap p', .3, { opacity: 1, yPercent: -30 }, "-=7")

		// video
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .video_wrap video', .3, { opacity: 1 }, "-=7")
		// deco 순차적으로 나타나기
		// 원 데코
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco1', .2, { width: 20, height: 20 }, "-=6.95")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco2', .2, { width: 20, height: 20 }, "-=6.9")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco3', .2, { width: 30, height: 30 }, "-=6.85")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco4', .2, { width: 20, height: 20 }, "-=6.8")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco5', .2, { width: 30, height: 30 }, "-=6.75")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco6', .2, { width: 20, height: 20 }, "-=6.7")
		// 별 데코
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco1', .2, { display: 'block', opacity: 1 }, "-=6.95")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco2', .2, { display: 'block', opacity: 1 }, "-=6.9")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco3', .2, { display: 'block', opacity: 1 }, "-=6.85")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco4', .2, { display: 'block', opacity: 1 }, "-=6.8")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco5', .2, { display: 'block', opacity: 1 }, "-=6.75")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco6', .2, { display: 'block', opacity: 1 }, "-=6.7")
		// 별 / 원 / 비디오 / 텍스트 지우기
		sec1ContainerTimeLine.to('#intro #earthGraphMotion', .2, { opacity: 1 }, "-=6.3")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .video_wrap video', .2, { opacity: 0 }, "-=6.3")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain .txt_wrap p', .2, { opacity: 0, yPercent: -20 }, "-=6.3")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain img', .2, { opacity: 0 }, "-=6.3")
		sec1ContainerTimeLine.to('#intro .content3 .earth_contain span', .2, { opacity: 0 }, "-=6.3")
		// 지구 그래프
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .txt_wrap p', .3, { opacity: 1, yPercent: -20 }, "-=6.3")
		// 총 수입
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .income_tit', .5, { display: 'block', opacity: 1, yPercent: -20, }, "-=5.85")
		// 19억 3500만 유로
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .money_tit', .5, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.845")
		// 퍼센트
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .txt_elm1', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.65")
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .txt_elm2', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.6")
		// bottom
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .bottom_txt strong', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.5")
		sec1ContainerTimeLine.to('#intro .content3 .graph_contain .bottom_txt > span', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=5.45")
		sec1ContainerTimeLine.to('#intro .content3', .5, { display: 'none', opacity: 0 }, "-=4.8")

		// 원형 라인 따라 움직이는 모션의 텍스트 나타나기
		sec1ContainerTimeLine.to('#intro .content4', .5, { display: 'block', opacity: 1 }, "-=4.8")
		// 700 만명
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', .3, { opacity: 1 }, "-=4.8")
		// sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', 2, { display: 'block' }, "-=3.3899")
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', .3, { opacity: 0 }, "-=3.45")
		// 1조 9천억원
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', .3, { opacity: 1 }, "-=3.15")
		// sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', 2, { display: 'block' }, "-=3.3899")
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', .3, { opacity: 0 }, "-=1.95")
		// 218 억원
		sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', .3, { opacity: 1 }, "-=1.65")
		// sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', 2, { display: 'block' }, "-=3.3899")
		// sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', .15, { opacity: 0 }, "-=0")

		return sec1ContainerTimeLine;
	}


	// const introTimeline = gsap.timeline({
	// 	scrollTrigger: {
	// 		trigger: $intro,
	// 		start: "top top",
	// 		end: "+=29000", // 전체 스크롤 길이.
	// 		pin: $intro,
	// 		scrub: 2,
	// 		pinSpacing: true,
	// 		// markers: { startColor: "blue", endColor: "blue", },
	// 	}
	// });

	// function introMotion1() {
	// 	const sec1ContainerTimeLine = gsap.timeline();
	// 	/* content1 *******/
	// 	// 동행기업 국경없는의사회를 움직이는 하나의 힘
	// 	sec1ContainerTimeLine.to($sec1Content1Title, .25, { opacity: 0, yPercent: -20 }, "-=28.795")
	// 	sec1ContainerTimeLine.to($sec1Content1Txt, .25, { opacity: 0, yPercent: -20 }, "-=28.79")
	// 	// 라운드 배경 데코
	// 	sec1ContainerTimeLine.to($sec1Cont1circleDeco1, .3, { opacity: 0 }, "-=28.785")
	// 	sec1ContainerTimeLine.to('#intro .content1 .glitter_cont', .2, { opacity: 0 }, "-=28.78")
	// 	sec1ContainerTimeLine.to($sec1Cont1circleDeco2, .3, { opacity: 0 }, "-=28.775")
	// 	sec1ContainerTimeLine.to('#intro .content1 .mini_deco', .2, { opacity: 0 }, "-=28.77")
	// 	sec1ContainerTimeLine.to($sec1Cont1circleDeco3, .3, { opacity: 0 }, "-=28.765")
	// 	sec1ContainerTimeLine.to($sec1Content1, .3, { display: 'none', opacity: 0 }, "-=28.76")

	// 	/* content2 *******/
	// 	sec1ContainerTimeLine.to($sec1Content2, .01, { display: 'block', opacity: 1 }, "-=28.75")
	// 	// 메인 원형 생기기
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm2', .3, { 'clip-path': 'circle(30px at 50% 50%)' }, "-=28.74")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm5', .2, { 'clip-path': 'circle(60px at 50% 50%)' }, "-=28.535")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm1', .2, { 'clip-path': 'circle(60px at 50% 50%)' }, "-=28.73")
	// 	// 텍스트 1 (국경없는의사회의 가치와 원칙을 함께하는 동행기업이 되어주세요.)
	// 	sec1ContainerTimeLine.to('#intro .content2 .txt_cont1 p', .2, { opacity: 1, yPercent: -20 }, "-=28.65")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm4', .3, { 'clip-path': 'circle(50px at 50% 50%)' }, "-=28.65")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm3', .3, { 'clip-path': 'circle(50px at 50% 50%)' }, "-=28.645")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm6', .2, { 'clip-path': 'circle(40px at 50% 50%)' }, "-=28.64")


	// 	sec1ContainerTimeLine.to('#intro .content2 .txt_cont1 p', .3, { opacity: 0 }, "-=28")
	// 	// 텍스트 2 (동행기업은 국경없는의사회가 보다 많은 분쟁지역과 의료 사각지대에서 안정적인 의료 구호 활동을 펼칠 수 있도록)
	// 	// sec1ContainerTimeLine.to('#intro .content2 .txt_cont2 p', .3, { opacity: 1, yPercent: -20 }, "-=27.9")
	// 	sec1ContainerTimeLine.to('#intro .content2 .txt_cont3 p', .2, { opacity: 1, yPercent: -20 }, "-=27.859")
	// 	// 메인 원형 커지기
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap > div span', .3, { opacity: 1 }, "-=27.85")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm1', .7, { 'clip-path': 'circle(330px at 50% 50%)' }, "-=27.85")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm2', .7, { 'clip-path': 'circle(160px at 50% 50%)' }, "-=27.845")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm3', .7, { 'clip-path': 'circle(200px at 50% 50%)' }, "-=27.84")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm4', .8, { 'clip-path': 'circle(220px at 50% 50%)' }, "-=27.835")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm5', .8, { 'clip-path': 'circle(240px at 50% 50%)' }, "-=27.83")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap .round_elm6', .7, { 'clip-path': 'circle(160px at 50% 50%)' }, "-=27.825")
	// 	sec1ContainerTimeLine.to('#intro .content2 .round_wrap > div', .3, { 'backgroundColor': 'transparent' }, "-=27.825")
	// 	// 작은 데코 원형
	// 	sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco1', .2, { width: 20, height: 20 }, "-=27.83")
	// 	sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco3', .2, { width: 30, height: 30 }, "-=27.83")
	// 	sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco6', .2, { width: 20, height: 20 }, "-=27.83")
	// 	sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco4', .2, { width: 30, height: 30 }, "-=27.83")
	// 	sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco5', .2, { width: 20, height: 20 }, "-=27.83")
	// 	sec1ContainerTimeLine.to('#intro .content2 .deco_wrap .circle_deco2', .2, { width: 20, height: 20 }, "-=27.83")


	// 	sec1ContainerTimeLine.to('#intro .content2 .txt_cont3 p', .2, { opacity: 0 }, "-=27.2")
	// 	// 텍스트 4 (기업의 이름으로 국경없는의사회의 활동을 후원하며,전세계의 긴급 구호 상황에 놓인 사람들을 위해 <br> 관심과 지원을 지속하는 파트너십입니다. )
	// 	sec1ContainerTimeLine.to('#intro .content2 .txt_cont4 p', .3, { opacity: 1, yPercent: -20 }, "-=27.1")

	// 	// 작은 데코 사라지기 *****
	// 	sec1ContainerTimeLine.to('#intro .content2 .deco_wrap span', .0001, { opacity: 0 }, "-=26.9")
	// 	// 사라지기 
	// 	sec1ContainerTimeLine.to('#intro .content2', .15, { display: 'none', opacity: 0 }, "-=26")
	// 	sec1ContainerTimeLine.to('#intro .content3', .3, { display: 'flex', opacity: 1 }, "-=26")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .txt_wrap p', .3, { opacity: 1, yPercent: -30 }, "-=26")

	// 	// video
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .video_wrap video', .3, { opacity: 1 }, "-=26")
	// 	// deco 순차적으로 나타나기
	// 	// 원 데코
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco1', .2, { width: 20, height: 20 }, "-=25.95")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco2', .2, { width: 20, height: 20 }, "-=25.9")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco3', .2, { width: 30, height: 30 }, "-=25.85")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco4', .2, { width: 20, height: 20 }, "-=25.8")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco5', .2, { width: 30, height: 30 }, "-=25.75")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .circle_deco6', .2, { width: 20, height: 20 }, "-=25.7")
	// 	// 별 데코
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco1', .2, { display: 'block', opacity: 1 }, "-=25.95")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco2', .2, { display: 'block', opacity: 1 }, "-=25.9")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco3', .2, { display: 'block', opacity: 1 }, "-=25.85")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco4', .2, { display: 'block', opacity: 1 }, "-=25.8")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco5', .2, { display: 'block', opacity: 1 }, "-=25.75")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .glitter_deco6', .2, { display: 'block', opacity: 1 }, "-=25.7")
	// 	// 별 / 원 / 비디오 / 텍스트 지우기
	// 	sec1ContainerTimeLine.to('#intro #earthGraphMotion', .2, { opacity: 1 }, "-=25.3")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .video_wrap video', .2, { opacity: 0 }, "-=25.3")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain .txt_wrap p', .2, { opacity: 0, yPercent: -20 }, "-=25.3")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain img', .2, { opacity: 0 }, "-=25.3")
	// 	sec1ContainerTimeLine.to('#intro .content3 .earth_contain span', .2, { opacity: 0 }, "-=25.3")
	// 	// 지구 그래프
	// 	sec1ContainerTimeLine.to('#intro .content3 .graph_contain .txt_wrap p', .3, { opacity: 1, yPercent: -20 }, "-=25.3")
	// 	// 총 수입
	// 	sec1ContainerTimeLine.to('#intro .content3 .graph_contain .income_tit', .5, { display: 'block', opacity: 1, yPercent: -20, }, "-=24.85")
	// 	// 19억 3500만 유로
	// 	sec1ContainerTimeLine.to('#intro .content3 .graph_contain .money_tit', .5, { display: 'block', opacity: 1, yPercent: -20 }, "-=24.845")
	// 	// 퍼센트
	// 	sec1ContainerTimeLine.to('#intro .content3 .graph_contain .txt_elm1', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=24.65")
	// 	sec1ContainerTimeLine.to('#intro .content3 .graph_contain .txt_elm2', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=24.6")
	// 	// bottom
	// 	sec1ContainerTimeLine.to('#intro .content3 .graph_contain .bottom_txt strong', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=24.5")
	// 	sec1ContainerTimeLine.to('#intro .content3 .graph_contain .bottom_txt > span', .2, { display: 'block', opacity: 1, yPercent: -20 }, "-=24.45")
	// 	sec1ContainerTimeLine.to('#intro .content3', .5, { display: 'none', opacity: 0 }, "-=23.8")

	// 	// 원형 라인 따라 움직이는 모션의 텍스트 나타나기
	// 	sec1ContainerTimeLine.to('#intro .content4', .5, { display: 'block', opacity: 1 }, "-=23.8")
	// 	// 700 만명
	// 	sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', .15, { opacity: 1 }, "-=23.8")
	// 	// sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', 2, { display: 'block' }, "-=3.3899")
	// 	sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm1', .15, { opacity: 0 }, "-=22.5")
	// 	// 1조 9천억원
	// 	sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', .15, { opacity: 1 }, "-=21.9")
	// 	// sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', 2, { display: 'block' }, "-=3.3899")
	// 	sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm2', .15, { opacity: 0 }, "-=20.8")
	// 	// 218 억원
	// 	sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', .15, { opacity: 1 }, "-=20.3")
	// 	// sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', 2, { display: 'block' }, "-=3.3899")
	// 	sec1ContainerTimeLine.to('#intro .content4 .txt_wrap .elm3', .15, { opacity: 0 }, "-=19")

	// 	return sec1ContainerTimeLine;
	// }

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
			// end: "+=21000",
			end: "+=15000",
			scrub: 2,
		}
	});
	function socialMotion1() {
		const sec1ContainerTimeLine = gsap.timeline();
		// sec1ContainerTimeLine.to('#social .content1 #seedMotion', { opacity: 1, duration: .5 })
		// 로고 색상 변경
		sec1ContainerTimeLine.to('#logo .bk_logo', { display: 'none', opacity: 0, duration: .5 })
		sec1ContainerTimeLine.to('#logo .wh_logo', { display: 'block', opacity: 1, duration: .5, delay: -.001 })
		// 텍스트 1 (기업의 사회 공헌 활동은)
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm1', { display: 'block', opacity: 1, yPercent: -20, duration: 6, delay: 3 })
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm1', { display: 'none', opacity: 0, duration: 6, delay: 18 })
		// 텍스트 2 (종교, 정치적 이익과 관계없이 독립적인 의료지원을 펼치는 )
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm2', { display: 'block', opacity: 1, yPercent: -20, duration: 6 })
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm2', { display: 'none', opacity: 0, duration: 6, delay: 8 })
		// 텍스트 3 (우리의 큰 원동력이 됩니다.)
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm3', { display: 'block', opacity: 1, yPercent: -20, duration: 6, delay: .5 })			// line scale
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm3', { display: 'none', opacity: 0, duration: 6, delay: 30 })
		// 텍스트 4 (우리는 변함없는 관심과 국경없는 나눔을 실천하는 기업과 함께 )
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm4', { display: 'block', opacity: 1, yPercent: -20, duration: 6 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_img1', { scale: 1, duration: 5, delay: -.9 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_img2', { scale: 1, duration: 5, delay: -.8 })
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm4', { display: 'none', opacity: 0, duration: 6, delay: 10 })
		// 텍스트 5 (국제 사회의 지속적인 발전에 기여하고, 글로벌 파트너십을 만들어 갑니다.)
		sec1ContainerTimeLine.to('#social .content1 .txt_wrap .txt_elm5', { display: 'block', opacity: 1, yPercent: -20, duration: 6, delay: 1 })
		// lottie 삭제
		sec1ContainerTimeLine.to('#social #seedMotion', { opacity: 0, duration: 3, delay: -8 })
		// 지구 영상 생성
		sec1ContainerTimeLine.to('#social .content1 .video_wrap video', { opacity: 1, duration: 8, delay: -5 })
		// 데코 생성
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco6', { width: 40, height: 40, duration: 2, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco1', { width: 50, height: 50, duration: 2, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco5', { width: 60, height: 60, duration: 2, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco3', { width: 30, height: 30, duration: 2, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco4', { width: 50, height: 50, duration: 2, delay: -.15 })
		sec1ContainerTimeLine.to('#social .content1 .circle_line .circle_deco2', { width: 60, height: 60, duration: 2, delay: -.15 })
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
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco3', { width: 20, height: 20, duration: 2, delay: -.05 })
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco1', { width: 30, height: 30, duration: 2, delay: -.05 })
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco2', { width: 20, height: 20, duration: 2, delay: -.05 })
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco4', { width: 40, height: 40, duration: 2, delay: -.05 })
		sec2ContainerTimeLine.to('#social .content2 .deco_wrap .circle_deco5', { width: 20, height: 20, duration: 2, delay: -.05 })
		// 미니 데코 생성
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco1', { opacity: 1, duration: 1.5, delay: -.1 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco2', { opacity: 1, duration: 1.5, delay: -.1 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco3', { opacity: 1, duration: 1.5, delay: -.1 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco4', { opacity: 1, duration: 1.5, delay: -.1 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco5', { opacity: 1, duration: 1.5, delay: -.1 })
		sec2ContainerTimeLine.to('#social .content2 .mini_deco .deco6', { opacity: 1, duration: 1.5, delay: -.1 })
		// 원 확대 모션
		// sec2ContainerTimeLine.to('#social .content2 .horizontal_wrap', { backgroundColor: '#fff', duration: 0.001, })
		// sec2ContainerTimeLine.to('#social .content2 .hidden_box', { backgroundColor: 'transparent', duration: 0.001 })
		// 가로 스크롤 실행
		sec2ContainerTimeLine.to('#social .content2 .horizontal_wrap', { x: _horizontalW, duration: 60, delay: 1.5, ease: Power0.easeNone, })
		sec2ContainerTimeLine.to('#social .content2 .partner5', { border: 0, duration: 5 }) // 시간 텀 주기


		// 컨텐츠 순차적으로 나타나기
		sec2ContainerTimeLine.to('#social .content2 .donation_company .elm1', { opacity: 1, duration: 15, x: -60, delay: -60 })
		sec2ContainerTimeLine.to('#social .content2 .donation_company .elm2', { opacity: 1, duration: 15, x: -60, delay: -60 })
		sec2ContainerTimeLine.to('#social .content2 .donation_company .elm3', { opacity: 1, duration: 15, x: -60, delay: -60 })

		// 파트너로고
		sec2ContainerTimeLine.to('#social .content2 .company_partner .partner6', { opacity: 1, duration: 8, delay: -60 })
		sec2ContainerTimeLine.to('#social .content2 .company_partner .partner3', { opacity: 1, duration: 8, delay: -65 })
		sec2ContainerTimeLine.to('#social .content2 .company_partner .partner5', { opacity: 1, duration: 8, delay: -60 })
		sec2ContainerTimeLine.to('#social .content2 .company_partner .partner4', { opacity: 1, duration: 8, delay: -55 })
		sec2ContainerTimeLine.to('#social .content2 .company_partner .partner7', { opacity: 1, duration: 8, delay: -50 })
		sec2ContainerTimeLine.to('#social .content2 .company_partner .partner2', { opacity: 1, duration: 8, delay: -45 })
		sec2ContainerTimeLine.to('#social .content2 .company_partner .partner1', { opacity: 1, duration: 8, delay: -40 })
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
			// end: "+=15000",
			end: "+=7000",
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
		sec1ContainerTimeLine.to('#corporation .content1 .scene2 .elm1', { opacity: 1, y: -50, duration: 6, delay: 10 })
		sec1ContainerTimeLine.to('#corporation .content1 .scene2 .elm2', { opacity: 1, y: -50, duration: 6 })
		sec1ContainerTimeLine.to('#corporation .content1 .scene2 .elm3', { opacity: 1, y: -50, duration: 6 })
		sec1ContainerTimeLine.to('#corporation .content1', { opacity: 0, duration: 10, delay: 10 })

		/* 동행기업 후원절차 --------------------------------------------------------------- */
		sec1ContainerTimeLine.to('#corporation .content2', { display: 'block', opacity: 1, duration: 15 })
		sec1ContainerTimeLine.to('#corporation .content2 .txt_wrap', { y: -300, duration: 8 })
		// 라인 & 컨텐츠 생성
		sec1ContainerTimeLine.to('#corporation .content2 .line_stroke', { width: 420, duration: 4 })
		sec1ContainerTimeLine.to('#corporation .content2 .elm1', { opacity: 1, y: 30, duration: 4 })
		sec1ContainerTimeLine.to('#corporation .content2 .line_stroke', { width: 790, duration: 4, delay: -.5 })
		sec1ContainerTimeLine.to('#corporation .content2 .elm2', { opacity: 1, y: 30, duration: 4, delay: -.5 })
		sec1ContainerTimeLine.to('#corporation .content2 .line_stroke', { width: 1150, duration: 4, delay: -.5 })
		sec1ContainerTimeLine.to('#corporation .content2 .elm3', { opacity: 1, y: 30, duration: 4, delay: -.5 })
		sec1ContainerTimeLine.to('#corporation .content2 .line_stroke', { width: 1480, duration: 4, delay: -.5 })
		sec1ContainerTimeLine.to('#corporation .content2 .elm4', { opacity: 1, y: 30, duration: 4, delay: -.5 })
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
		sec1ContainerTimeLine.to('#corporation .content4 .txt_wrap strong span', { opacity: 1, y: -30, duration: 12 })
		// 미니 데코
		sec1ContainerTimeLine.to('#corporation .content4 .glitter_cont img', { opacity: 1, duration: 10, delay: -10 })
		sec1ContainerTimeLine.to('#corporation .content4 .mini_deco span', { opacity: 1, duration: 10, delay: -10 })

		sec1ContainerTimeLine.to('#social .content2 .partner5', { border: 0, duration: 20 }) // 시간 텀 주기
		return sec1ContainerTimeLine;
	}
	corporationTimeline.add(corporationMotion1());
	/* //corporation trigger ------------------------------------------------------------------------*/

	/* LottieScrollTrigger ------------------------------------------ */
	// 점선원형 라인 모션 
	LottieScrollTrigger({
		target: "#circularLineMotion",
		path: "./datafile/sec05.json",
		pin: true,
		start: 1500,
		end: '+=1000',
		// speed: "medium",
		scrub: 2,
	});

	// 지구 그래프 모션
	LottieScrollTrigger({
		target: "#earthGraphMotion",
		path: "./datafile/sec_08.json",
		pin: true,
		start: 3400,
		end: '+=1500',
		// speed: "medium",
		scrub: 2,
	});

	// 3개 구호 원형 라인 모션
	LottieScrollTrigger({
		target: "#cricleLineMotion",
		path: "./datafile/sec09-11-2_bg.json",
		// pin: true,
		start: 5700,
		end: '+=2800',
		// speed: "medium",
		// markers: { startColor: "blue", endColor: "blue" },
		scrub: 3,
	});

	// 움직이는 원형씨드 국경로고 모션
	LottieScrollTrigger({
		target: "#seedMotion",
		path: "./datafile/sec12.json",
		pin: true,
		start: 11000,
		end: '+=5000',
		// speed: "medium",
		scrub: 2,
	});

	// 가로 스크롤 라인
	LottieScrollTrigger({
		target: "#lineMotion",
		path: "./datafile/line_test.json",
		pin: true,
		start: 42390,
		end: '+=10000',
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