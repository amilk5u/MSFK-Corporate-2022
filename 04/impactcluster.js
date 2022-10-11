import { Back, Power1, Power2, Power3, gsap } from "gsap";
import { circlePhase1, circlePhase2, circlePhase3, circlePhase3_mobile, circlePhase3_mobile_wide } from "./vars";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobile } from "./uilts";
import { createResultCollector } from './improvise';

class ImpactCluster {

   rootImpactLogo;
   rootImpactLogoReverse;

   clusterTimeline;
   clusterSectionElem;

   messsageWrapperElem;    // 메시지 목록 래퍼.
   messageList;    // 메시지 목록.
   mainseed; // 메인 시드.

   seedContainer; // 시드 컨테이너. (회전축)
   seedList; // 시드 리스트. (시드 베이스)


   clusterMapWrapperElem;  // 맵 래퍼.

   // 지도화면 페이드 엘리먼트.
   mapInlineCircleElem;
   mapOutlineCircleElem;

   // 지도 타입 3종.
   mapFullElem;
   mapOutlineElem;
   mapFocusElem;
   mapFocusImgElem;
   mapBuildingWrapperElem; // 건물 1,2 래퍼.
   mapBuildingList;        // 건물 1,2,3
   mapMsgTitleWordList;    // 메시지 - 제목 (49명..)
   mapMsgDescWordList;     // 메시지 - 상세 (체인지메이커가 거쳐간...)


   // 원 그룹.
   circleGroupWrapperElem;
   circlebgGroupElem;          // 배경 원 그룹.
   circlebgList;               // 배경 원 13개. (+아이콘)
   circleTitleElem;            // 타이틀 - '우리가 함꼐 만든 변화' 
   circleInfoTitleElem;        // 타이틀 - '헤이그라운드 맴버들이...'
   circleInfoList;             // 통계 안내 막대기.
   circleInfoList_mobile;      // 통계 안내 막대기. (모바일)


   // 성장그래프 3-17
   clusterGraphWrapperElem;    // 그래프 래퍼.
   graphTitleElem;             // 타이틀 '헤이그라운드 멤버의 성장')

   // 소개 (세로 스크롤)
   clusterVerticalWrapperElem; // 세로스크롤 전체 컨텐츠 래퍼.
   clusterGraphIntroElem;      // 인물 소개 및 마무리 비디오 씬.
   endingRevealWrapperElem;    // 엔딩 타이틀 배경.
   endingTitleElem;            // 엔딩 타이틀.

   videoPlayWrapperElem;           // 비디오 클릭 영역 표시.
   playbtnElem;                    // 클러스터 영상 팝업 띄우기.


   dimmElem;                   // 비디오 백그라운드 배경.
   videoClusterPopupElem;      // 비디오 팝업.
   isOpenClusterVideo;         // 팝업 오픈 여부.


   //===================================================================
   // 트랜지션 커버 제어용
   //===================================================================
   clusterCoverElem;  // 트랜지션용 커버 ( = 마지막 영상 커버 ).


   // GNB
   gnbGlobalNavbar;
   gnbDropdown;

   //Vimeo
   vimeoPlayer;

   totalLengthRate = 4;        // 스크롤 전체 길이 비율. ( 값이 클수록 스크롤 길어짐 = 속도 느려짐. )
   scrollSpeed = 2;       // 씨드 회전 속도. ( 클수록 빨라짐. )

   seedLoadingCount = 0;

   constructor() {
      this.gnbGlobalNavbar = document.querySelector('nav.global-nav');
      this.gnbDropdown = document.querySelector('nav .dropdown-menu');

      this.rootImpactLogo = document.querySelector('.nav-logo-wrapper .logo');
      this.rootImpactLogoReverse = document.querySelector('.nav-logo-wrapper .logo-reverse');

      this.clusterSectionElem = document.getElementById('impact-cluster');
      this.messsageWrapperElem = this.clusterSectionElem.querySelector('.global-message-wrapper');
      this.messageList = gsap.utils.toArray(".cluster-msg");
      this.mainseed = document.querySelector('.seed-wrapper.main-seed');
      this.seedContainer = gsap.utils.toArray(".rotate-container");
      this.seedList = gsap.utils.toArray(".rotate-container .small-wave");

      this.clusterMapWrapperElem = this.clusterSectionElem.querySelector('.cluster-map-wrapper');

      this.mapInlineCircleElem = this.clusterSectionElem.querySelector('#map-inline-circle');
      this.mapOutlineCircleElem = this.clusterSectionElem.querySelector('#map-outline-circle');

      this.mapFullElem = this.clusterSectionElem.querySelector('#map-full');
      this.mapOutlineElem = this.clusterSectionElem.querySelector('#map-outlined');
      this.mapFocusElem = this.clusterSectionElem.querySelector('#map-focused');
      this.mapFocusImgElem = this.clusterSectionElem.querySelector('#map-focused-img');
      this.mapBuildingWrapperElem = this.clusterSectionElem.querySelector('.building-wrapper');
      this.mapBuildingList = gsap.utils.toArray("#building");
      this.mapMsgTitleWordList = gsap.utils.toArray("#slide-title");
      this.mapMsgDescWordList = gsap.utils.toArray("#slide-desc");


      this.circleGroupWrapperElem = this.clusterSectionElem.querySelector('.circle-group-wrapper');
      this.circlebgGroupElem = this.clusterSectionElem.querySelector('.cluster-background.cluster-circle');
      this.circlebgList = gsap.utils.toArray(".map-circle");
      this.circleTitleElem = this.clusterSectionElem.querySelector('.cluster-circle-title');
      this.circleInfoTitleElem = this.clusterSectionElem.querySelector('.cluster-chart-title');
      this.circleInfoList = gsap.utils.toArray('.info-bar-img.desktop');
      this.circleInfoList_mobile = gsap.utils.toArray('.info-bar-img.mobile');

      this.clusterGraphWrapperElem = this.clusterSectionElem.querySelector('.cluster-graph-wrapper');
      this.graphTitleElem = this.clusterSectionElem.querySelector('.cluster-graph-title');


      this.clusterVerticalWrapperElem = this.clusterSectionElem.querySelector('.custer-vertical-wrapper');
      this.clusterGraphIntroElem = document.querySelector('.cluster-graphintro-list');
      this.endingRevealWrapperElem = this.clusterSectionElem.querySelector('.reveal-wrapper');
      this.endingTitleElem = this.clusterSectionElem.querySelector('.cluster-end-title');

      this.videoPlayWrapperElem = this.clusterSectionElem.querySelector('#cluster-playbtn');
      this.dimmElem = document.querySelector('.container .background-dim');
      this.videoClusterPopupElem = document.querySelector('.container #video-cluster');

      this.clusterCoverElem = document.querySelector('.transiton-cover.cluster-page');

      this.vimeoPlayer = new Vimeo.Player(document.querySelector('#iframe-cluster'));

      this.playbtnElem = document.querySelector('#play-cluster-video');
      this.playbtnElem.addEventListener('click', () => {
         if (this.isOpenClusterVideo) return;
         this.isOpenClusterVideo = true;
         this.setVideoPopup('flex');
         this.vimeoPlayer.play();
      });

      document.querySelectorAll('#close-video-cluster').forEach((elem) => {
         elem.addEventListener('click', () => {
            this.vimeoPlayer.pause();
            this.isOpenClusterVideo = false;
            this.setVideoPopup('none');
         })
      });


   }

   init() {
      this.clusterTimeline = gsap.timeline({
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

      // // 메인 씨드 드랍.
      // this.clusterTimeline.fromTo(this.mainseed, {y: () => -window.innerHeight / 2}, {y: 0, duration: 28}, "-=30");
      // this.clusterTimeline.fromTo(this.mainseed, {opacity: 0}, {opacity: 1, duration: 10}, "-=28");

      // this.clusterTimeline.fromTo(this.mainseed, {y: -500}, {y: 0, duration: 2}, "-=4");

      // 맵 메시지 숨기기(위치 재조정).
      this.slideUpText(-1, 5);

      // 메시지 표시.
      this.clusterTimeline.fromTo(this.messageList[0], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: this.scrollSpeed });

      // 씨드 이동 및 회전.
      for (let i = 0; i < this.seedContainer.length; i++) {
         const tl = gsap.timeline({
            id: `seed-tl-${i}`
         });
         tl.fromTo(this.seedContainer[i], {
            x: () => -window.innerWidth,
            xPercent: 0,
            y: 0,
            yPercent: 0,
            rotation: 270,
         }, {
            x: 0,
            xPercent: 0,
            y: 0,
            yPercent: 0,
            rotation: 270,
            duration: isMobile() ? 17 : 12,
            transformOrigin: 'center center'
         })
            .to(this.seedContainer[i], {
               rotation: `${((i * 60) - 40)}_ccw`,
               duration: isMobile() ? 33 : 28,
               // ease: Power3.easeOut
            });

         this.clusterTimeline.add(tl, i == 0 ? '+=0' : isMobile() ? `-=45` : `-=36`);
      }

      this.clusterTimeline.fromTo(this.messageList[0], { opacity: 1 }, { opacity: 0, duration: 6 });
      this.clusterTimeline.fromTo(this.messageList[1], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 3 }, `-=3`);

      // 씨드 그룹 전체 일부 회전.
      const groupRotateTl = gsap.timeline();
      groupRotateTl.to(document.getElementsByClassName('seed-group'), {
         rotation: '300_ccw',
         duration: 80
      });
      this.clusterTimeline.add(groupRotateTl, `seed-tl-=20`);

      // 씨드 전체 물결 효과.
      const smallWaveTL = gsap.timeline({
         scrollTrigger: {
            invalidateOnRefresh: true
         }
      });

      const [animations, lottieScrollTrigger] = createResultCollector(this.lottieScrollTrigger.bind(this))

      lottieScrollTrigger({
         timeline: smallWaveTL,
         target: `#svg-seed-main`,
         trigger: `.cluster-seed-wrapper`,
         path: './assets/lottie/Cluster_2_02-03_BigWave.json',
         start: () => isMobile() ? `+=375% top` : `390% top`,
         end: () => isMobile() ? `+=100%` : `+=100%`,
         id: `seed-main`,
         // markers: true,
      });

      // 씨드. 개별 물결 효과.
      this.seedContainer.forEach((seedWave, index) => {
         lottieScrollTrigger({
            timeline: smallWaveTL,
            target: `#svg-seed-${index}`,
            trigger: `.cluster-seed-wrapper`,
            path: './assets/lottie/Cluster_2_03_SmallWave.json',
            start: () => isMobile() ? `+=410% top` : `410% top`,
            end: () => isMobile() ? `+=50%` : `+=50%`,
            id: `seed-${index}`,
            // markers: true,
            // style: isMobile() ? 'transform: scale: (0.5)' : '',
         });
      });

      this.clusterTimeline.add(smallWaveTL);

      // 씨드 가운데로 모으기 및 페이드.
      // 메인시드, 페이드.
      this.clusterTimeline.to(this.mainseed,
         {
            opacity: 0,
            duration: 24
         });

      // 서브시드, 중앙이동 및 페이드.
      for (let i = 0; i < this.seedList.length; i++) {
         this.clusterTimeline.fromTo(this.seedList[i],
            {
               xPercent: -50,
            },
            {
               // css: { width: '0px', opacity: 0 },
               xPercent: 0,
               autoAlpha: 0,
               duration: 30
            },
            i === 0 ? `-=24` : `-=30`);
      }

      // "그래서 우리는 성수동에 모여..." 텍스트 활성화.
      this.clusterTimeline.fromTo(this.messageList[2], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: this.scrollSpeed }, `-=${this.scrollSpeed / 2}`);

      this.clusterTimeline.set(this.mainseed, { css: { display: 'none' } });
      this.clusterTimeline.set('#svg-seed-main', { css: { display: 'none' } });
      this.seedContainer.forEach((seedWave, index) => {
         this.clusterTimeline.set(`#svg-seed-${index}`, { css: { display: 'none' } });
      });
      // ====================================================================================================================================================
      // Mobile.
      // ====================================================================================================================================================
      if (isMobile()) {

         // 지도 화면 전환.
         this.clusterTimeline.fromTo(this.mapOutlineCircleElem, { opacity: 0 }, { opacity: 1, duration: 4 }, "-=15");
         this.clusterTimeline.fromTo(this.mapInlineCircleElem, { opacity: 0 }, { opacity: 1, duration: 4 }, "-=4");
         this.clusterTimeline.to(this.mapInlineCircleElem, { "clip-path": 'circle(100% at center)', duration: 50 }, "-=4");
         this.clusterTimeline.to(this.mapOutlineCircleElem, { width: '250%', paddingBottom: '250%', duration: 50, ease: Power3.easeOut }, "-=51");

         this.clusterTimeline.set(this.mapOutlineCircleElem, { opacity: 0 });

         // // 지나간 텍스트 비활성화.
         this.clusterTimeline.fromTo(this.messageList[1], { opacity: 1 }, { opacity: 0, duration: this.scrollSpeed });
         this.clusterTimeline.fromTo(this.messageList[2], { opacity: 1 }, { opacity: 0, duration: this.scrollSpeed }, "+=4");


         // 지도 카메라 줌.
         this.clusterTimeline.fromTo(this.mapFullElem, { x: 0, y: 0, xPercent: -48, yPercent: -50, scale: 0.5 }, { x: 0, y: 0, xPercent: -50, yPercent: -55, scale: 1, duration: 30, ease: Power3.easeOut });
         this.clusterTimeline.fromTo(this.mapFullElem.querySelector('.map-img-width'), { xPercent: 0, yPercent: 0 }, { xPercent: 11, yPercent: 3, duration: 30 }, "-=30"); // 포커싱/건물 위치.

         this.clusterTimeline.fromTo(this.mapOutlineElem, { x: 0, y: 0, xPercent: -48, yPercent: -50, scale: 0.5 }, { x: 0, y: 0, xPercent: -50, yPercent: -55, scale: 1, opacity: 1, duration: 30, ease: Power3.easeOut }, "-=30");
         this.clusterTimeline.fromTo(this.mapOutlineElem.querySelector('.map-img-width'), { xPercent: 0, yPercent: 0 }, { xPercent: 11, yPercent: 3, duration: 30 }, "-=30"); // 포커싱/건물 위치.

         this.clusterTimeline.set(this.mapFocusElem, { x: 0, y: 0, xPercent: -50, yPercent: -55, scale: 1 });
         this.clusterTimeline.fromTo(this.mapFocusElem.querySelector('.map-img-width'), { xPercent: 0, yPercent: 0 }, { xPercent: 11, yPercent: 3, duration: 30 }, "-=30");

         this.clusterTimeline.to(this.mapFocusElem, { "clip-path": `circle(6.5% at 50% 50%)`, duration: 10 });

         this.slideUpText(0, 10);

         // // 2번째 건물 포커싱.
         this.clusterTimeline.fromTo(this.mapOutlineElem.querySelector('.map-img-width'), { xPercent: 11, yPercent: 3 }, { xPercent: -5, yPercent: 8, duration: 20 }, "+=20"); // 포커싱/건물 위치.
         this.clusterTimeline.fromTo(this.mapFocusElem.querySelector('.map-img-width'), { xPercent: 11, yPercent: 3 }, { xPercent: -5, yPercent: 8, duration: 20 }, "-=20");
         this.clusterTimeline.to(this.mapBuildingWrapperElem, { xPercent: -14, yPercent: 7, duration: 20 }, "-=20");

         // // 텍스트...
         this.slideUpText(1, 20);


         // // 1,2번건물 숨김.
         this.clusterTimeline.set(this.mapBuildingList[0], { opacity: 0 });
         this.clusterTimeline.to(this.mapBuildingList[1], { opacity: 0, duration: 10 }, "+=20");

         // // 3번째 건물 포커싱.
         this.clusterTimeline.to(this.mapOutlineElem.querySelector('.map-img-width'), { xPercent: 2, yPercent: 1, duration: 20 }, "-=10"); // 포커싱/건물 위치.
         this.clusterTimeline.to(this.mapFocusElem.querySelector('.map-img-width'), { xPercent: 2, yPercent: 1, duration: 20 }, "-=20");
         this.clusterTimeline.to(this.mapBuildingWrapperElem, { xPercent: -5, yPercent: -5, duration: 20 }, "-=20");

         // // 텍스트...
         this.slideUpText(2, 20);

         // // 3번 건물 페이드 인.
         this.clusterTimeline.fromTo(this.mapBuildingList[2], { opacity: 0, x: 0, y: 0, xPercent: 16, yPercent: -156 }, { opacity: 1, x: 0, y: 0, xPercent: 46, yPercent: -174, duration: 10 }, "-=8");
         this.clusterTimeline.fromTo(this.mapBuildingList[3], { opacity: 0, xPercent: 149, yPercent: -101 }, { opacity: 1, x: 0, y: 0, xPercent: 165, yPercent: -107, duration: 10 }, "-=10");

         // ====================================================================================================================================================
         // Desktop.
         // ====================================================================================================================================================
      } else {

         // 지도 화면 전환.
         this.clusterTimeline.fromTo(this.mapOutlineCircleElem, { opacity: 0 }, { opacity: 1, duration: 4 }, "-=15");
         this.clusterTimeline.fromTo(this.mapInlineCircleElem, { opacity: 0 }, { opacity: 1, duration: 4 }, "-=4");
         this.clusterTimeline.to(this.mapInlineCircleElem, { "clip-path": 'circle(110% at center)', duration: 30 }, "-=4");
         this.clusterTimeline.to(this.mapOutlineCircleElem, { width: '150%', paddingBottom: '150%', duration: 30, ease: Power2.easeOut }, "-=31");
         this.clusterTimeline.set(this.mapOutlineCircleElem, { opacity: 0 });

         // // 지나간 텍스트 비활성화.
         this.clusterTimeline.fromTo(this.messageList[1], { opacity: 1 }, { opacity: 0, duration: this.scrollSpeed });
         this.clusterTimeline.fromTo(this.messageList[2], { opacity: 1 }, { opacity: 0, duration: this.scrollSpeed }, "+=4");


         // 지도 카메라 줌.
         const mapZoomSpeed = 30;
         this.clusterTimeline.fromTo(this.mapFullElem, { x: 0, y: 0, xPercent: -47, yPercent: -52, scale: 0.75 }, { x: 0, y: 0, xPercent: -58, yPercent: -50, scale: 1, duration: mapZoomSpeed, ease: Power3.easeOut });
         this.clusterTimeline.to(this.mapFullElem.querySelector('.map-img-width'), { xPercent: 11, yPercent: 2, duration: mapZoomSpeed }, `-=${mapZoomSpeed}`); // 포커싱/건물 위치.

         this.clusterTimeline.fromTo(this.mapOutlineElem, { x: 0, y: 0, xPercent: -47, yPercent: -52, scale: 0.75 }, { x: 0, y: 0, xPercent: -58, yPercent: -50, scale: 1, opacity: 1, duration: mapZoomSpeed, ease: Power3.easeOut }, `-=${mapZoomSpeed}`);
         this.clusterTimeline.to(this.mapOutlineElem.querySelector('.map-img-width'), { xPercent: 11, yPercent: 2, duration: mapZoomSpeed }, `-=${mapZoomSpeed}`); // 포커싱/건물 위치.

         this.clusterTimeline.set(this.mapFocusElem, { x: 0, xPercent: -58, scale: 1 });
         this.clusterTimeline.to(this.mapFocusElem.querySelector('.map-img-width'), { x: 0, y: 0, xPercent: 11, yPercent: 2, duration: mapZoomSpeed }, `-=${mapZoomSpeed}`);

         this.clusterTimeline.to(this.mapFocusElem, { "clip-path": `circle(9% at 50% 50%)`, duration: 10 });

         this.slideUpText(0, 10);

         // // 2번째 건물 포커싱.
         this.clusterTimeline.to(this.mapOutlineElem.querySelector('.map-img-width'), { xPercent: -5, yPercent: 8, duration: 20 }, "+=20"); // 포커싱/건물 위치.
         this.clusterTimeline.to(this.mapFocusElem.querySelector('.map-img-width'), { xPercent: -5, yPercent: 8, duration: 20 }, "-=20");
         this.clusterTimeline.to(this.mapBuildingWrapperElem, { xPercent: -14, yPercent: 7, duration: 20 }, "-=20");

         // // 텍스트...
         this.slideUpText(1, 20);

         // // 1,2번건물 숨김.
         this.clusterTimeline.set(this.mapBuildingList[0], { opacity: 0 });
         this.clusterTimeline.to(this.mapBuildingList[1], { opacity: 0, duration: 10 }, "+=20");

         // // 3번째 건물 포커싱.
         this.clusterTimeline.to(this.mapOutlineElem.querySelector('.map-img-width'), { xPercent: 3, yPercent: 1, duration: 20 }, "-=10"); // 포커싱/건물 위치.
         this.clusterTimeline.to(this.mapFocusElem.querySelector('.map-img-width'), { xPercent: 3, yPercent: 1, duration: 20 }, "-=20");
         this.clusterTimeline.to(this.mapBuildingWrapperElem, { xPercent: -6, yPercent: 0, duration: 20 }, "-=20");

         // // 텍스트...
         this.slideUpText(2, 20);


         // // 3번 건물 페이드 인.
         this.clusterTimeline.fromTo(this.mapBuildingList[2], { opacity: 0, x: 0, y: 0, xPercent: -29, yPercent: -93 }, { opacity: 1, x: 0, y: 0, xPercent: -21, yPercent: -100, duration: 10 }, "-=10");
         this.clusterTimeline.fromTo(this.mapBuildingList[3], { opacity: 0, x: 0, y: 0, xPercent: 134, yPercent: -37 }, { opacity: 1, x: 0, y: 0, xPercent: 142, yPercent: -44, duration: 10 }, "-=9");
         this.clusterTimeline.fromTo(this.mapBuildingList[4], { opacity: 0, x: 0, y: 0, xPercent: -103, yPercent: 37 }, { opacity: 1, x: 0, y: 0, xPercent: -95, yPercent: 30, duration: 10 }, "-=10"); // 핀

      }

      // 지도 투명하게 & 커튼 올리기.
      this.clusterTimeline.to({}, { duration: 30 });
      this.clusterTimeline.set(this.circleGroupWrapperElem, { css: { visibility: 'visible' } });
      this.clusterTimeline.fromTo(this.circleGroupWrapperElem, { y: () => window.innerHeight }, { y: () => 0, duration: 30 });
      this.clusterTimeline.fromTo(this.circlebgGroupElem, { y: () => -window.innerHeight }, { y: 0, duration: 30 }, "-=30");
      this.clusterTimeline.to(this.mapFullElem, { autoAlpha: 0 });
      this.clusterTimeline.to(this.mapOutlineElem, { autoAlpha: 0 });

      // 포커싱된 지도 올리기. 20대기후 10동안 재생.
      this.clusterTimeline.to(this.mapFocusElem, { y: () => `-=${window.innerHeight}`, duration: 30 }, "+=20");
      this.clusterTimeline.to(this.mapBuildingList[2], { y: () => `-=${window.innerHeight}`, duration: 30 }, "-=30");
      this.clusterTimeline.to(this.mapBuildingList[3], { y: () => `-=${window.innerHeight}`, duration: 30 }, "-=30");
      this.clusterTimeline.to(this.mapBuildingList[4], { y: () => `-=${window.innerHeight}`, duration: 30 }, "-=30");

      for (let i = 0; i < this.circlebgList.length; i++) {
         this.clusterTimeline.fromTo(this.circlebgList[i], {
            'left': circlePhase1[i.toString()].left,
            'top': circlePhase1[i.toString()].top,
            // yPercent: '0',
         },
            {
               'left': circlePhase2[i.toString()].left,
               'top': circlePhase2[i.toString()].top,
               // yPercent: '-50',
               duration: 20
            }, i === 0 ? '-=15' : `-=20`);
      }

      // 파티클 플로팅 애니메이션 종료.
      for (let i = 0; i < this.circlebgList.length; i++) {
         this.clusterTimeline.set(this.circlebgList[i], { css: { 'animation': 'none' } });
      }

      // this.clusterTimeline.to({},{duration: 10});

      // 타이틀 등장.
      this.clusterTimeline.fromTo(this.circleTitleElem, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 5 }, "-=5");

      // 타이틀 위로 사라짐.
      this.clusterTimeline.to(this.circleTitleElem, { y: () => -(window.innerHeight), duration: 30 }, isMobile() ? '+=40' : '+=40');
      // for(let i = 0 ; i < this.circlebgList.length ; i++) {
      //         this.clusterTimeline.to(this.circlebgList[i], {
      //             'left': `${circlePhase2[i.toString()].left.substring(circlePhase2[i.toString()].left.length) + 10}%`,
      //             'top': `${circlePhase2[i.toString()].top.substring(circlePhase2[i.toString()].top.length) + 10}%`,
      //             duration: 10}, '-=10');
      // }


      // ====================================================================================================================================================
      // Mobile.
      // ====================================================================================================================================================
      if (isMobile()) {

         // 원형 파티클 중앙으로 재정렬.
         for (let i = 0; i < this.circlebgList.length; i++) {
            if (window.innerWidth / window.innerHeight < 0.5) {

               this.clusterTimeline.to(this.circlebgList[i], {
                  'width': circlePhase3_mobile_wide[i.toString()].width,
                  'paddingBottom': circlePhase3_mobile_wide[i.toString()].paddingbottom,
                  'left': circlePhase3_mobile_wide[i.toString()].left,
                  'top': circlePhase3_mobile_wide[i.toString()].top,
                  scaleX: 0.85,
                  scaleY: 0.85,
                  yPercent: '-50',
                  opacity: 0.85,
                  duration: 20
               }, i === 0 ? `-=0` : `-=20`);

            } else {

               this.clusterTimeline.to(this.circlebgList[i], {
                  'width': circlePhase3_mobile[i.toString()].width,
                  'paddingBottom': circlePhase3_mobile[i.toString()].paddingbottom,
                  'left': circlePhase3_mobile[i.toString()].left,
                  'top': circlePhase3_mobile[i.toString()].top,
                  scaleX: 0.85,
                  scaleY: 0.85,
                  yPercent: '-50',
                  opacity: 0.85,
                  duration: 20
               }, i === 0 ? `-=0` : `-=20`);

            }

            // const iconElem = this.circlebgList[i].querySelector('.circle-icon');
            // if(iconElem) {
            //     this.clusterTimeline.to(iconElem, {
            //         opacity: 1,
            //         duration: 20}, `-=20`);
            // }
         }

         // 넓은 화면일때 기존 비율 사용.
         const infobarlist = gsap.utils.toArray('.cluster-background.bar-mobile .circle-info');
         infobarlist.forEach((elem, index) => {
            if (window.innerWidth / window.innerHeight < 0.5) {
               elem.classList.remove(`mobile-bar-0${index + 1}`);
               elem.classList.add(`mobile-bar-wide-0${index + 1}`);
            }
         });


         // 정렬 직전 스케일 바운스 효과.
         for (let i = 0; i < this.circlebgList.length; i++) {
            this.clusterTimeline.to(this.circlebgList[i], {
               scaleX: 1,
               scaleY: 1,
               ease: Back.easeOut,
               duration: 20
            }, i === 0 ? '+=0' : `-=${10 + this.getRandomInt(0, 20)}`);

            const iconElem = this.circlebgList[i].querySelector('.circle-icon');
            if (iconElem) {
               this.clusterTimeline.to(iconElem, {
                  opacity: 1,
                  duration: 20
               }, `-=20`);
            }
         };

         // 타이틀 등장.
         this.clusterTimeline.fromTo(this.circleInfoTitleElem, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 5 });

         // 차트 설명 라인 표시.
         for (let i = 0; i < this.circleInfoList_mobile.length; i++) {
            if (i % 2 == 0) {
               this.clusterTimeline.fromTo(this.circleInfoList_mobile[i], { x: 20 }, { x: 0, opacity: 1, duration: 10 });
            } else {
               this.clusterTimeline.fromTo(this.circleInfoList_mobile[i],
                  { x: 20 }, { x: 0, opacity: 1, duration: 10 },
                  i === 0 ? '+=0' : `-=${this.getRandomInt(0, 20)}`);
            }
         }



         // 로티 - 그래프 등장.
         const graphtimeline = gsap.timeline({
            scrollTrigger: {
               invalidateOnRefresh: true
            }
         });
         lottieScrollTrigger({
            target: `#lottie-cluster-graph-1`,
            path: './assets/lottie/MO_Cluster_2_17-18_BarGraph.json',
            start: () => `${(window.innerHeight * 23) - 400} center`,
            end: () => `+=400`,
            id: `graph-left-mobile`,
            // markers: true,
            onLeave: () => {
               // gsap.to(document.querySelector('#lottie-cluster-graph-1'), {opacity: 0, duration: 0.5});
               // document.querySelector('#lottie-cluster-graph-1').style.display = 'none';
            },
            onEnterBack: () => {
               gsap.to(document.querySelector('#lottie-cluster-graph-1'), { opacity: 1, duration: 0.5 });
               // document.querySelector('#lottie-cluster-graph-1').style.display = 'block';
            }

         });

         lottieScrollTrigger({
            target: `#lottie-cluster-graph-2`,
            path: './assets/lottie/MO_Cluster_2_19-20_CircleGraph.json',
            start: () => `${(window.innerHeight * 23) + 1250} center`,
            end: () => `+=400`,
            id: `graph-right-mobile`,
            // markers: true,
            onEnter: () => {
               gsap.to(document.querySelector('#lottie-cluster-graph-1'), { opacity: 0, duration: 0.5 });
            }
         });

         this.clusterTimeline.add(graphtimeline);

         // 타이틀 / 원 목록 / 설명 라인 3개의 그룹만 자체 스크롤.
         const titleGroup = document.querySelector('.cluster-title-wrapper .cluster-chart-title');
         const circleGroup = document.querySelector('.cluster-background.cluster-circle');
         const barGroup = document.querySelector('.cluster-background.bar-mobile');
         this.clusterTimeline.fromTo(titleGroup, { y: () => 0 }, { y: () => -(window.innerHeight / 2) - 20, duration: 10 });
         this.clusterTimeline.fromTo(circleGroup, { y: () => 0 }, { y: () => -(window.innerHeight / 2) - 20, duration: 10 }, "-=10");
         this.clusterTimeline.fromTo(barGroup, { y: () => 0 }, { y: () => -(window.innerHeight / 2) - 20, duration: 10 }, "-=10");

         // 딜레이.
         this.clusterTimeline.to({}, { duration: 5 });


         // 정렬된 원 위로 스크롤..
         this.clusterTimeline.to(this.clusterMapWrapperElem, { y: () => -window.innerHeight, duration: 40 }, "+=40");
         this.clusterTimeline.fromTo(this.clusterGraphWrapperElem, { y: () => window.innerHeight }, { y: () => 0, duration: 40 }, "-=40");

         // 타이틀 등장.
         this.clusterTimeline.fromTo(this.graphTitleElem, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 10 }, "-=2");

         // 세로 스크롤 라인 .
         lottieScrollTrigger({
            timeline: graphtimeline,
            // trigger: `.cluster-graph-wrapper`,
            target: `#cluster-bg-line`,
            path: './assets/lottie/MO_Cluster_2_20-24_Line_Appear.json',
            // start: () => `${(window.innerHeight * 16) - (window.innerHeight / 2)} center`,
            start: () => `${(window.innerHeight * 27)} center`,
            end: () => `+=650%`,
            id: `cluster-bg-line`,
            preserveAspectRatio: 'none',
            // markers: true,
            onLeave: () => {
               document.querySelector('#cluster-bg-line').style.display = 'none';
               document.querySelector('#cluster-bg-line2').style.display = 'block';
            },
            onEnterBack: () => {
               document.querySelector('#cluster-bg-line').style.display = 'block';
               document.querySelector('#cluster-bg-line2').style.display = 'none';
            }
         });
         lottieScrollTrigger({
            timeline: graphtimeline,
            // trigger: `.cluster-graph-wrapper`,
            target: `#cluster-bg-line2`,
            path: './assets/lottie/MO_Cluster_2_20-24_Line_Disappear.json',
            start: () => `${(window.innerHeight * 34)} bottom`,
            end: () => `+=400%`,
            id: `cluster-bg-line2`,
            preserveAspectRatio: 'none',
            // markers: true
         });

         // 딜레이.
         this.clusterTimeline.to({}, { duration: 1 }, "+=90");
         this.clusterTimeline.to(this.clusterGraphIntroElem, { autoAlpha: 1 });

         // 세로 스크롤 이동.(all)
         // this.clusterTimeline.to(this.clusterVerticalWrapperElem, {y: () => -window.innerHeight * 4, duration: 90},"+=20");
         // 세로 스크롤 이동.
         this.clusterTimeline.to(this.clusterVerticalWrapperElem, { y: () => -window.innerHeight, duration: 30 }, "+=80");
         this.clusterTimeline.to(this.clusterVerticalWrapperElem, { y: () => -window.innerHeight * 2, duration: 30 }, "+=50");
         this.clusterTimeline.to(this.clusterVerticalWrapperElem, { y: () => -window.innerHeight * 3, duration: 30 }, "+=50");
         this.clusterTimeline.to(this.clusterVerticalWrapperElem, { y: () => -window.innerHeight * 4, duration: 30 }, "+=50");



         // ====================================================================================================================================================
         // Desktop.
         // ====================================================================================================================================================
      } else {
         // 원형 파티클 중앙으로 재정렬.
         for (let i = 0; i < this.circlebgList.length; i++) {
            this.clusterTimeline.to(this.circlebgList[i], {
               'width': circlePhase3[i.toString()].width,
               'paddingBottom': circlePhase3[i.toString()].paddingbottom,
               'left': circlePhase3[i.toString()].left,
               'top': circlePhase3[i.toString()].top,
               x: 0,
               y: 0,
               scaleX: 0.85,
               scaleY: 0.85,
               yPercent: '-50',
               opacity: 0.85,
               duration: 30
            }, `-=30`);

            // const iconElem = this.circlebgList[i].querySelector('.circle-icon');
            // if(iconElem) {
            //     this.clusterTimeline.to(iconElem, {
            //         opacity: 1,
            //         duration: 20}, `-=20`);
            // }
         }

         // 타이틀 등장.
         this.clusterTimeline.fromTo(this.circleInfoTitleElem, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 5 });

         // 정렬 직전 스케일 바운스 효과.
         for (let i = 0; i < this.circlebgList.length; i++) {
            this.clusterTimeline.to(this.circlebgList[i], {
               scaleX: 1,
               scaleY: 1,
               ease: Back.easeOut,
               duration: 10
            }, i === 0 ? '-=5' : `-=${10 + this.getRandomInt(0, 10)}`);

            const iconElem = this.circlebgList[i].querySelector('.circle-icon');
            if (iconElem) {
               this.clusterTimeline.to(iconElem, {
                  opacity: 1,
                  duration: 10
               }, `-=10`);
            }
         };

         // 차트 설명 라인 표시.
         for (let i = 0; i < this.circleInfoList.length; i++) {
            if (i % 2 == 0) {
               this.clusterTimeline.fromTo(this.circleInfoList[i],
                  { y: -20 }, { y: 0, opacity: 1, duration: 10 },
                  i === 0 ? '+=0' : `-=${this.getRandomInt(0, 10)}`);
            } else {
               this.clusterTimeline.fromTo(this.circleInfoList[i],
                  { y: 20 }, { y: 0, opacity: 1, duration: 10 },
                  i === 0 ? '+=0' : `-=${this.getRandomInt(0, 10)}`);
            }
         }

         // 정렬된 원 좌측으로 스크롤..
         this.clusterTimeline.to(this.clusterMapWrapperElem, { x: () => -window.innerWidth, duration: 40 }, "+=30");
         this.clusterTimeline.to(this.clusterGraphWrapperElem, { x: () => 0, duration: 40 }, "-=40");

         // 로티 - 그래프 등장.
         const graphtimeline = gsap.timeline({
            scrollTrigger: {
               invalidateOnRefresh: true
            }
         });
         lottieScrollTrigger({
            trigger: `.cluster-graph-wrapper`,
            target: `#lottie-cluster-graph-1`,
            path: './assets/lottie/Cluster_2_17_1_BarGraph.json',
            // start: () => `${(window.innerHeight * 16) - (window.innerHeight)} bottom`,
            start: () => `2400% top`,
            end: () => `+=110%`,
            id: `graph-left-PC`,
            // markers: true,
         });

         lottieScrollTrigger({
            trigger: `.cluster-graph-wrapper`,
            target: `#lottie-cluster-graph-2`,
            path: './assets/lottie/Cluster_2_17_2_CircleGraph.json',
            // start: () => `${(window.innerHeight * 16) - (window.innerHeight)} bottom`,
            start: () => `2400% top`,
            end: () => `+=110%`,
            id: `graph-right-PC`,
            // markers: true,
         });

         this.clusterTimeline.set('#cluster-bg-line', { css: { display: 'block' } });
         this.clusterTimeline.set('#cluster-bg-line2', { css: { display: 'none' } });

         // 타이틀 등장.
         this.clusterTimeline.fromTo(this.graphTitleElem, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 10 }, "-=10");


         // 세로 라인 스크롤 드로잉.
         const verticaltL = gsap.timeline({
            scrollTrigger: {
               invalidateOnRefresh: true
            }
         });
         lottieScrollTrigger({
            timeline: verticaltL,
            trigger: `.cluster-graph-wrapper`,
            target: `#cluster-bg-line`,
            path: './assets/lottie/Cluster_2_18-22_Line_Appear.json',
            // start: () => `+=350% center`, //`${(window.innerHeight * 16) - (window.innerHeight / 2)} bottom`,
            // start: () => `${(window.innerHeight * 16) - (window.innerHeight / 2)} bottom`,
            start: () => `2550% center`,
            end: () => `+=900%`,
            id: `background-line`,
            preserveAspectRatio: 'none',
            // markers: true,

            // onLeave: () => {
            //     console.log('onLeave');
            //     document.querySelector('#cluster-bg-line').style.display = 'none';
            //     document.querySelector('#cluster-bg-line2').style.display = 'block';

            // },
            // onEnterBack: () => {
            //     console.log('onEnterBack');
            //     document.querySelector('#cluster-bg-line').style.display = 'block';
            //     document.querySelector('#cluster-bg-line2').style.display = 'none';

            // }
         });
         lottieScrollTrigger({
            timeline: verticaltL,
            trigger: `.cluster-graph-wrapper`,
            target: `#cluster-bg-line2`,
            path: './assets/lottie/Cluster_2_18-22_Line_Diappear.json',
            // start: () => `+=350% top`, //`${(window.innerHeight * 16) - (window.innerHeight / 4)} bottom`, // += 아니면 리사이징시 반응없음. 주의
            // start: () => `${(window.innerHeight * 16) - (window.innerHeight / 4)} bottom`, // += 아니면 리사이징시 반응없음. 주의
            start: () => `3300% top`,
            end: () => `+=300%`,
            id: `background-line2`,
            preserveAspectRatio: 'none',
            // markers: true
         });

         this.clusterTimeline.to(this.clusterGraphIntroElem, { autoAlpha: 1 });


         // 세로 스크롤 이동.
         this.clusterTimeline.to(this.clusterVerticalWrapperElem, { y: () => -window.innerHeight, duration: 30 }, "+=90");
         this.clusterTimeline.to(this.clusterVerticalWrapperElem, { y: () => -window.innerHeight * 2, duration: 30 }, "+=40");
         this.clusterTimeline.to(this.clusterVerticalWrapperElem, { y: () => -window.innerHeight * 3, duration: 30 }, "+=40");
         this.clusterTimeline.to(this.clusterVerticalWrapperElem, { y: () => -window.innerHeight * 4, duration: 30 }, "+=40");


         // this.clusterTimeline.to('#cluster-bg-line', {autoAlpha: 0}, '-=15' );
         // this.clusterTimeline.to('#cluster-bg-line2', {autoAlpha: 1}, '-=15' );
         this.clusterTimeline.set('#cluster-bg-line', { css: { display: 'none' } }, '-=15');
         this.clusterTimeline.set('#cluster-bg-line2', { css: { display: 'block' } }, '-=15');

      }

      // 타이틀 화면 전환. (리버스 스크롤시 팝업 열림여부 체크.)
      this.clusterTimeline.to(this.endingRevealWrapperElem, {
         "clip-path": `circle(100% at center)`,
         duration: 40
      });

      // 루트임팩트 로고 색상 반전.
      // if(!isMobile()) {
      this.clusterTimeline.fromTo(this.rootImpactLogoReverse, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=30");
      this.clusterTimeline.fromTo(this.rootImpactLogo, { opacity: 1 }, {
         opacity: 0, duration: 1,
         onComplete: () => this.updateGNB('dark'),
         onReverseComplete: () => this.updateGNB('light')
      }, "-=30");
      // }

      // 메시지 표시 영역 z 인덱스 제거.
      this.clusterTimeline.set(this.messsageWrapperElem, { "z-index": 0 });

      // Scroll To Next 버튼 애니메이션.
      if (document.querySelector('.scroll-down-wrapper.cluster .scroll-contents').childElementCount === 0) {
         bodymovin.loadAnimation({
            container: document.querySelector('.scroll-down-wrapper.cluster .scroll-contents'),
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: './assets/lottie/PC_ScrollToNext_Dark.json'
         });
      }

      // 비디오 재생 버튼 표시.
      this.clusterTimeline.fromTo(this.videoPlayWrapperElem, { opacity: 0 }, { opacity: 1, duration: 5 });

      // 트랜지션 커버용 페이지 오버랩.
      this.clusterTimeline.set(this.clusterCoverElem, { css: { display: 'block' } });
      this.clusterTimeline.to({}, { duration: 1 }, "+=30");

      // 메인시드 오퍼시티 재설정.
      this.clusterTimeline.set(this.mainseed, { opacity: 0 });

      return Promise.all(animations)
   }

   kill() {
      if (this.clusterTimeline) {
         this.clusterTimeline.eventCallback("onEnter", null);
         this.clusterTimeline.eventCallback("onEnterBack", null);
         this.clusterTimeline.eventCallback("onLeave", null);

         this.clusterTimeline.getChildren().forEach(child => {
            // gsap.set(child, {clearProps: "all"});
            child.kill();
         });

         this.clusterTimeline.clear().kill();
         this.clusterTimeline = null;
      }
   }

   /**
    * GNB 색상 갱신.
    * @param {'light' | 'dark'} type 타입.
    */
   updateGNB(type) {
      if (!isMobile()) return;
      if (type === 'dark') {
         if (!this.gnbGlobalNavbar.classList.contains('dark')) this.gnbGlobalNavbar.classList.add('dark');
         if (!this.gnbDropdown.classList.contains('dark')) this.gnbDropdown.classList.add('dark');
         document.querySelector('.svg-navbtn-content g circle').setAttribute('fill', '#001B24');
      } else {
         this.gnbGlobalNavbar.classList.remove('dark');
         this.gnbDropdown.classList.remove('dark');
         document.querySelector('.svg-navbtn-content g circle').setAttribute('fill', 'white');
      }
   }


   // window resize 이벤트 호출시 동작.
   refresh() {
      this.clusterTimeline.invalidate();
   }

   // 무작위 정수.
   getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   /**
    * 타이틀 슬라이드 업 애니메이션.
    * @param {*} idx: 표시할 텍스트 순서.
    */
   slideUpText(idx, duration, startDelay) {
      let delayAnim = '+=0';
      if (startDelay) {
         delayAnim = startDelay;
      }

      if (this.mapMsgTitleWordList && this.mapMsgTitleWordList.length > 0) {
         this.mapMsgTitleWordList.forEach((elem, index) => {
            this.clusterTimeline.to(elem, { yPercent: () => -(idx * 100), duration: duration }, `-=${duration}`);
         });
      }

      if (this.mapMsgDescWordList && this.mapMsgDescWordList.length > 0) {
         this.mapMsgDescWordList.forEach((elem, index) => {
            this.clusterTimeline.to(elem, { yPercent: () => -(idx * 100), duration: duration }, `-=${duration}`);
         });
      }
   }

   /**
    * 클러스터 메시지 표시.
    * @param {elem} vars.timeline 타임라인.
    * @param {*} vars.elem 엘리먼트.
    * @param {*} vars.index 인덱스.
    * @param {*} vars.isFadeIn 페이드상태.
    * @param {*} vars.duration 애니메이션 타임.
    * @param {*} vars.gsapdelay 타임라인 딜레이(Ex. +=10 ).
    */
   displayMessage(vars) {
      var timeline = vars.timeline ?? gsap;
      var targetElem = Array.isArray(vars.elem) && vars.elem.length > 0 ? vars.elem[vars.index] : vars.elem;
      timeline.fromTo(targetElem, { opacity: vars.isFadeIn ? 0 : 1 }, { opacity: vars.isFadeIn ? 1 : 0, duration: vars.duration }, vars.gsapdelay ?? '+=0');
      if (vars.isFadeIn) timeline.fromTo(targetElem, { y: () => 30 }, { y: () => 0, duration: vars.duration, ease: 'Power4.easeIn' }, `-=${vars.duration}`);
   }


   // 스크린 가로 세로 크기중 더 긴 값을 가져옴.
   getLargerScreenLength() {
      return window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
   }


   /**
    * 비디오 팝업 제어.
    * @param {'flex' | 'none'} state : 팝업 열림 / 닫힘.
    */
   setVideoPopup(state) {
      this.isOpenClusterVideo = (state === 'flex');
      document.querySelector('body').style.overflow = this.isOpenClusterVideo ? 'hidden' : 'visible';
      this.dimmElem.style.display = state;
      this.videoClusterPopupElem.style.display = state;
   }


   lottieScrollTrigger(vars) {
      const targetElem = document.querySelector(`${vars.target}`);
      if (targetElem.hasChildNodes()) {
         targetElem.innerHTML = '';
      }
      let playhead = { frame: 0 },
         target = targetElem,
         st = {
            trigger: vars.trigger ? document.querySelector(vars.trigger) : target,
            scrub: 1,
            // markers: true,
            // invalidateOnRefresh: true,
            onEnter: () => {
               // targetElem.style.display = "block";
            },
            onEnterBack: () => vars.onEnterBack,
            onLeave: () => vars.onLeave,
         },
         animation = bodymovin.loadAnimation({
            container: target,
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: vars.path,
            // initialSegment: vars.segment, // [0, 70] // totalFrames == 180
            rendererSettings: {
               preserveAspectRatio: vars.preserveAspectRatio ?? 'xMidYMid meet'
            }
         });
      // console.log(180 / (targetElem.offsetWidth / window.innerWidth) );

      for (let p in vars) { // let users override the ScrollTrigger defaults
         st[p] = vars[p];
      }

      return new Promise((resolve) => {
         animation.addEventListener("DOMLoaded", function () {
            // console.log(`${vars.target} - ${playhead.frame}`);
            if (vars.timeline) {
               vars.timeline.to(playhead, {
                  frame: animation.totalFrames - 1,
                  ease: "none",
                  onEnter: () => {
                     playhead.frame = 0;
                     animation.goToAndStop(0, true);
                  },
                  onUpdate: () => {
                     // console.log(`${vars.target} - ${playhead.frame}`);
                     animation.goToAndStop(playhead.frame, true);
                  },
                  onComplete: () => {
                     // targetElem.style.display = "none";
                  },
                  scrollTrigger: st
               });
            } else {
               gsap.to(playhead, {
                  frame: animation.totalFrames - 1,
                  ease: "none",
                  onEnter: () => {
                     playhead.frame = 0;
                     animation.goToAndStop(0, true);
                  },
                  onUpdate: () => {
                     // console.log(`${vars.target} - ${playhead.frame}`);
                     animation.goToAndStop(playhead.frame, true);
                  },
                  onComplete: () => {
                     // targetElem.style.display = "none";
                  },
                  scrollTrigger: st
               });
            }

            resolve(animation);
         });
      })
   }

   getTimeline() {
      return this.clusterTimeline;
   }
   getScrollTrigger() {
      return this.clusterTimeline.scrollTrigger;
   }

}

export default ImpactCluster;