import 'regenerator-runtime/runtime'

import { Elastic, Expo, Power1, Power4, gsap, CSSPlugin } from "gsap";
import { throttle, debounce, isHardwareMobile, isMobile, isPad, cacheSelectOne, listen, isLandscape } from "./uilts";

import Celebration from "./celebration";
import ImpactCampus from "./impactcampus";
import ImpactCluster from "./impactcluster";
import Intro from "./intro";
import SNSShare from "./sns";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Vision from "./vision";
import { blockScrollPropagation, initGlobalScrollProgressBar } from './improvise';

class App {

  //=================================================
  // 타임라인.
  //=================================================
  introTimeline;
  impactClusterTimeline;
  impactCampusTimeline;
  lottieLineTimeline;
  visionTimeline;
  celebrationTimeline;

  //=================================================
  // 엘리먼트.
  //=================================================
  // 네비게이션 루트 
  navbarElem;       // nav 전체.
  progressbarElem;  // progress-bar 전체.

  // * 네비게이션 바 / 메뉴
  menuBtnElem;        // 메뉴 버튼.
  menuBtnArrowElem;   // 메뉴 버튼 화살표.
  menuListElem;       // 메뉴 목록.
  menuIntroElem;          // 메뉴 - Intro.
  menuImpactClusterElem;  // 메뉴 - ImpactCluster.
  menuImpactCampusElem;   // 메뉴 - ImpactCampus.
  menuVisionElem;         // 메뉴 - vision.
  menuCelebrationElem;    // 메뉴 - celebration.

  rootImpactLogo;
  rootImpactLogoReverse;

  // * 세션.
  loadingElem;          // 로딩 루트.
  introElem;            // 세션 루트 - Intro.
  impactClusterElem;    // 세션 루트 - ImpactCluster.
  impactCampusElem;     // 세션 루트 - ImpactCampus.  #3-1 ~
  impactCampus2Elem;     // 세션 루트 - ImpactCampus.  #3-21 ~
  visionElem;           // 세션 루트 - vision.
  celebrationElem;      // 세션 루트 - celebration.

  //=================================================
  // 전역 변수 / 상수
  //=================================================
  dropdownMenuHeight;


  scrollTriggerPinElemHeightRatio = 12;

  isHover = false;
  hoverImgIdxCluster = 0;  // 현재 프리뷰 이미지 인덱스.
  hoverImgIdxCampus = 0;
  hoverImgIdxVision = 0;
  



  //=================================================
  // 씬 별 관리 클래스.
  //=================================================
  impactLoading;
  impactIntro;
  impactCluster;
  impactCampus;
  impactVision;
  impactCelebration;

  //=================================================
  // Video 프리뷰
  //=================================================
  hoverVideoScreenCluster;
  hoverVideoScreenCampus;
  hoverVideoScreenVision;

  hoverImgContainer;

  hoverInterval;


  //=================================================
  // 로딩
  //=================================================
  loadingGuageElem;   // 로딩 게이지 (원형 스케일)
  loadingTextElem;    // 로딩 퍼센트 ( 연도 텍스트 )
  loadingCircleElem;  // 로딩 원 전체.
  loadingTitleElem;   // 로딩 타이틀.


  //=================================================
  // Transition 커튼.
  //=================================================
  transitionHideTimeline;
  transitionRevealTimeline;
  
  transitionRootElem;
  transitionCoverList;
  isTransition = false;


  //=================================================
  // GNB
  //=================================================
  gnbGlobalNavbar;
  gnbDropdown;

  menuBtnIntro;
  menuBtnCluster;
  menuBtnCampus;
  menuBtnVision;
  menuBtnCelebration;


  //=================================================
  // SNS 공유.
  //=================================================
  kakao_url;
  fb_url;
  tw_url;

  isOpenBrowserPopup = false;
  isAnimateMenu = false;

  progressBar;

  playClusterbtnElem;
  playCampusbtnElem;
  playVisionbtnElem;

  constructor() {

      // GSAP 초기화.
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(ScrollToPlugin);
      gsap.registerPlugin(TextPlugin);
      gsap.registerPlugin(CSSPlugin);
      
      gsap.config({
        force3D: true
      });

      
      // 카운팅 효과.
      gsap.registerEffect({
        name:"counter",
        extendTimeline:true,
        defaults:{
          end:0,
          duration:0.5,
          ease:"power1",
          increment:1,
        },
        effect: (targets, config) => {
          let tl = gsap.timeline()
          let num = targets[0].innerText.replace(/\,/g,'')
          targets[0].innerText = num
          
          tl.to(targets, {duration:config.duration, 
                    innerText:config.end, 
                    modifiers:{
                      innerText:function(innerText){
                        return  gsap.utils.snap(config.increment, innerText).toString();
        
                      }
                    },
                    ease:config.ease}, 0)
          
          return tl
        }
      });
  }

  async init() {

    if(isMobile()) {
      ScrollTrigger.normalizeScroll(true);
      ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
        ignoreMobileResize: true
      });
    }

    // * 네비게이션 바 / 메뉴.
    this.menuBtnElem = document.querySelector('.nav-menu-wrapper');
    this.menuBtnArrowElem = this.menuBtnElem.querySelector('.menu-arrow');
    this.menuListElem = document.querySelector('.menu-wrapper');
    this.menuIntroElem = document.querySelector('.dropdown-menu #menu-intro');
    this.menuImpactClusterElem = document.querySelector('.dropdown-menu #menu-impactCluster');
    this.menuImpactCampusElem = document.querySelector('.dropdown-menu #menu-impactCampus');
    this.menuVisionElem = document.querySelector('.dropdown-menu #menu-vision');
    this.menuCelebrationElem = document.querySelector('.dropdown-menu #menu-celebration');

    this.dropdownMenuHeight = this.menuListElem.offsetHeight;

    this.rootImpactLogo = document.querySelector('.nav-logo-wrapper .logo');
    this.rootImpactLogoReverse = document.querySelector('.nav-logo-wrapper .logo-reverse');

    // * 세션.
    this.loadingElem = document.querySelector('#loading');
    this.introElem = document.querySelector('#intro');
    this.impactClusterElem = document.querySelector('#impact-cluster');
    this.impactCampusElem = document.querySelector('#impact-campus');
    this.impactCampus2Elem = document.querySelector('#impact-campus-2');
    this.visionElem = document.querySelector('#vision');
    this.celebrationElem = document.querySelector('#celebration');

    // * 로딩.
    if(this.loadingElem) {
      this.loadingGuageElem = this.loadingElem.querySelector('#loading-guage');
      this.loadingTextElem = this.loadingElem.querySelector('#loading-year');
      this.loadingCircleElem = this.loadingElem.querySelector('#loading-circle');
      this.loadingTitleElem = this.loadingElem.querySelector('#loading-title');
    }

    this.transitionRootElem =  document.querySelector('.transition-cover');
    this.transitionCoverElem = this.transitionRootElem.querySelector('.scene-cover');

    // GNB
    this.gnbGlobalNavbar = document.querySelector('nav.global-nav');
    this.gnbDropdown = document.querySelector('nav .dropdown-menu');
    this.menuBtnIntro = document.querySelector('#menu-intro span');
    this.menuBtnCluster = document.querySelector('#menu-impactCluster span');
    this.menuBtnCampus = document.querySelector('#menu-impactCampus span');
    this.menuBtnVision = document.querySelector('#menu-vision span');
    this.menuBtnCelebration = document.querySelector('#menu-celebration span');

    //========================================================
    // 세션별 클래스 초기화.
    //========================================================
    if(!this.impactIntro) this.impactIntro = new Intro();
    if(!this.impactCluster) this.impactCluster = new ImpactCluster();
    if(!this.impactCampus) this.impactCampus = new ImpactCampus();
    if(!this.impactVision) this.impactVision = new Vision();
    if(!this.impactCelebration) this.impactCelebration = new Celebration();


    this.playClusterbtnElem = document.querySelector('#play-cluster-video');
    this.playCampusbtnElem = document.querySelector('#play-campus-video');
    this.playVisionbtnElem = document.querySelector('#play-vision-video');    

    //==============================================
    // 트랜지션 애니메이션 초기화.
    //==============================================
    this.initTransitionScreen();

    //==============================================
    // 공유기능 초기화.
    //==============================================
    // new SNSShare();

  
    //==============================================
    // 로딩.
    //==============================================  
    if(this.loadingElem) {
      this.initLoading();
    }

    await Promise.all([
      this.impactIntro.init(),
      this.impactCluster.init(),
      this.impactCampus.init(),
      this.impactVision.init(),
      this.impactCelebration.init()
    ]);
    
    //========================================================
    // 네비게이션 버튼 이벤트 초기화.
    //========================================================


    this.isAnimateMenu = false;

    // * 네비게이션 메뉴
    this.menuBtnElem.addEventListener('click', () => {
      if(this.isAnimateMenu) return;
      this.isAnimateMenu = true;
      this.menuBtnArrowElem.classList.contains('close') ? this.setBtnArrowClass(true) : this.setBtnArrowClass(false) 
    });
    if(this.introElem) {
      this.menuIntroElem.addEventListener('click', () => { 
        this.transitionAnimation('intro'); 
      });
    }
    if(this.impactClusterElem)  {
      this.menuImpactClusterElem.addEventListener('click', () => { 
        this.transitionAnimation('cluster');   
      });
    }
    if(this.impactCampusElem) {
      this.menuImpactCampusElem.addEventListener('click', () => { 
        this.transitionAnimation('campus');   
      });
    }
    if(this.visionElem) {
      this.menuVisionElem.addEventListener('click', () => {
        this.transitionAnimation('vision', true);
      });
    }
    if(this.celebrationElem) {
      this.menuCelebrationElem.addEventListener('click', () => {
        this.transitionAnimation('celebration');
      });
    }


    // 카카오 공유하기 이벤트 지정
    document.querySelector('#kakao-contents-btn').addEventListener('click', () => {
      window.parent.postMessage('kakao', location.href);
    });

    // 시작점 이벤트 추가
    this.impactCluster.getTimeline().scrollTrigger.onEnter = ({progress, direction, isActive}) => console.log(progress, direction, isActive);

    this.hoverVideoScreenCluster = document.querySelector('.cluster-page .video-wrapper');
    this.hoverVideoScreenCampus = document.querySelector('.campus-page .video-wrapper');
    this.hoverVideoScreenVision = document.querySelector('.vision-page  .video-wrapper');
    this.hoverImgContainer = document.querySelector('.hover-img-container');


    // 모바일 / 패드가 아닌경우, 호버 효과 안씀.
    if(!isMobile() && !isPad()) {
      this.hoverVideoScreenCluster.addEventListener('pointerenter', () => this.showImage('cluster'));
      this.hoverVideoScreenCluster.addEventListener('pointerleave', () => this.hideImage('cluster'));
    
      this.hoverVideoScreenCampus.addEventListener('pointerenter', () => this.showImage('campus'));
      this.hoverVideoScreenCampus.addEventListener('pointerleave', () => this.hideImage('campus'));
    
      this.hoverVideoScreenVision.addEventListener('pointerenter', () => this.showImage('vision'));
      this.hoverVideoScreenVision.addEventListener('pointerleave', () => this.hideImage('vision'));
    }

    // Windows explorer popup
    // this.dimBackgroundElemBrowser = document.querySelector('.container .background-dim-browser');
    // this.explorerBroswerPopupElem = document.querySelector('.explorer-browser');
    // this.btnExplorerBrowser = document.querySelector('.explorer-browser #copy-popup-close');
    // this.btnExplorerBrowser.addEventListener('click', () => {
    //     this.openBrowserPopup(false);
    // });


    // If Internet explorer
    if (window.document.documentMode) {
      this.openBrowserPopup(true);
    }

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    initialized = true;
  }

  killAll() {
    if(this.impactIntro) this.impactIntro.kill();
    if(this.impactCluster) this.impactCluster.kill();
    if(this.impactCampus) this.impactCampus.kill();
    if(this.impactVision) this.impactVision.kill();
    if(this.impactCelebration) this.impactCelebration.kill();
  }

  initLoading() {
    // GNB 배경 초기화.
    if(!isMobile()) document.querySelector('.svg-navbtn-content g').setAttribute('filter', 'url(#filter0_dd_2_172)');
    else            document.querySelector('.svg-navbtn-content g').setAttribute('filter', '');

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: 0,
      }
    });

    const loadingTL = gsap.timeline();
    loadingTL.to(this.loadingGuageElem, 
      {
        'width': isMobile() ? '33vw' : '16vmin', 
        'height': isMobile() ? '33vw' : '16vmin', 
        duration: 4, 
        ease: Power1.easeIn 
    });

    // console.log(ScrollTrigger.getAll());

    loadingTL.counter(this.loadingTextElem, {end:2022, increment:1, duration:4},'-=4');
    var pendingLoading = setInterval(() => { 
      if(initialized) {
        // initialized = false;
        loadingTL.to(this.loadingTextElem, {yPercent: -500 , duration: 1});
        loadingTL.to(this.loadingTitleElem, {opacity: 0 , duration: 1, onComplete:() => this.setScrollActive(true)}, "-=1");
        loadingTL.to(this.loadingCircleElem, { scale: 0, opacity: 0, duration: 2, ease: Elastic.easeOut });
        // 로딩 최종 완료. 로딩용 엘리먼트 삭제. 인트로 시작.
        loadingTL.to(this.loadingElem, {opacity: 0, duration: 1, onComplete:() => { this.removeElement('loading'); this.playIntro(); /* this.impactCelebration.loadLotties(this.impactVision.getTimeline()); */ }}, "-=2");

        clearInterval(pendingLoading);
      }
    }, 200);


    // loadingTL.counter(this.loadingTextElem, {end:2022, increment:1, duration:4},'-=4');
    // var pendingLoading = setInterval(() => { 
    //   if(initialized) {
    //     // initialized = false;
    //     loadingTL.to(this.loadingTextElem, {yPercent: -500 , duration: 1});
    //     loadingTL.to(this.loadingTitleElem, {opacity: 0 , duration: 1, onComplete:() => this.setScrollActive(true)}, "-=1");
    //     loadingTL.to(this.loadingCircleElem, { scale: 0, opacity: 0, duration: 2, ease: Elastic.easeOut });
    //     // 로딩 최종 완료. 로딩용 엘리먼트 삭제. 인트로 시작.
    //     loadingTL.to(this.loadingElem, {opacity: 0, duration: 1, onComplete:() => { this.removeElement('loading'); this.playIntro(); /* this.impactCelebration.loadLotties(this.impactVision.getTimeline()); */ }}, "-=2");

    //     // 로딩 엘리먼트 제거 후, 스크롤 정보 갱신.
    //     ScrollTrigger.sort();
    //     ScrollTrigger.refresh();

    //     // 갱신된 스크롤정보를 기반으로 프로그레스바 초기화.
    //     this.initProgressBar();

    //     clearInterval(pendingLoading);
    //   }
    // }, 200);

  }

  async refreshInits() {
    if(!this.impactIntro || !this.impactCluster || !this.impactCampus || !this.impactVision || !this.impactCelebration) {
      console.error('not Initialized');
      return; 
    }

    // 모든 타임라인의 정보를 초기화 함.
    this.killAll();

    // GNB (모바일 상단 메뉴) 포지션 초기화.
    if(this.gnbGlobalNavbar.classList.contains('dark')) {
      gsap.set(this.rootImpactLogo, {opacity: 0});
      gsap.set(this.rootImpactLogoReverse, {opacity: 1});
    } else {
      gsap.set(this.rootImpactLogo, {opacity: 1});
      gsap.set(this.rootImpactLogoReverse, {opacity: 0});
    }
    this.updateGNB('light');
    
    document.getElementById("navbar").style.top = "0";
    document.getElementById("progress-bar").style.top = "0";

    refreshCount = 0;

    // 각 세션별 타임라인 재정의.
    await Promise.all([
      this.impactIntro.init(),
      this.impactCluster.init(),
      this.impactCampus.init(),
      this.impactVision.init(),
      this.impactCelebration.init(),
    ]);

    // 모든 타임라인 초기화 이후 ScrollTrigger 갱신.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }

  initTransitionScreen() {
    this.transitionHideTimeline = gsap.timeline({paused: true});
    this.transitionHideTimeline.set(this.transitionRootElem, {css: {'display': 'block'}});
    this.transitionHideTimeline.fromTo(this.transitionCoverElem, {scaleY: 0}, {scaleY: 1, transformOrigin: 'bottom center', duration: 5, ease: Expo.easeOut});
     
    this.transitionRevealTimeline = gsap.timeline({paused: true});
    this.transitionRevealTimeline.fromTo(this.transitionCoverElem, {scaleY: 1}, {scaleY: 0, transformOrigin: 'top center', duration: 5, ease: Expo.easeOut});
    this.transitionRevealTimeline.set(this.transitionRootElem, {css: {'display': 'none'}});
  }

  /**
   * 해당 세션으로 스크롤 이동.
   * @param {'intro' | 'cluster' | 'campus' | 'vision' | 'celebration'} sectionName 이동하고자 할 세션 이름.
   * @param {boolean} isReverseLogo true, 어두운 배경일 경우, 로고색 및 GNB 색상을 반전시킵니다.
   */
  transitionAnimation(sectionName, isReverseLogo) {
    preventScrollEvent = true;

    var timelinePos = 0;

    switch(sectionName) {
      case 'intro':   timelinePos = 0;  break;
      case 'cluster': timelinePos = this.impactCluster.getTimeline().scrollTrigger.start + (this.impactCluster.getTimeline().scrollTrigger.end * 0.006);  break;
      case 'campus': timelinePos = this.impactCampus.getTimeline().scrollTrigger.start + (this.impactCampus.getTimeline().scrollTrigger.end * 0.0048);   break;
      case 'vision': timelinePos = this.impactVision.getTimeline().scrollTrigger.start + (this.impactVision.getTimeline().scrollTrigger.end * 0.01);  break;
      case 'celebration':  timelinePos = this.impactCelebration.getTimeline().scrollTrigger.start + (this.impactCelebration.getTimeline().scrollTrigger.end * 0.009); break;
    }

    if(isMobile()) {
      document.getElementById("navbar").style.top = "0";
      document.getElementById("progress-bar").style.top = "0";
    }
    
    this.setBtnArrowClass(false);
    gsap.set(this.transitionRootElem, { css: { 'display': 'block' } });
    gsap.fromTo(this.transitionCoverElem,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'bottom center',
        duration: 0.6,
        ease: Expo.easeInOut,
        onComplete: () => {
          gsap.to(window, {
            scrollTo: {
              y: () => timelinePos // this.impactVision.getTimeline().scrollTrigger.end - (window.innerWidth * 2),
            },
            duration: 0.1,
            onComplete: () => {
              gsap.fromTo(this.transitionCoverElem,
                  { scaleY: 1 },
                  {
                    scaleY: 0,
                    transformOrigin: 'top center',
                    duration: 1,
                    ease: Expo.easeOut,
                    onEnter: () => {
                      if(isReverseLogo) {
                        // 루트임팩트 로고 색상 초기화
                        gsap.to(this.rootImpactLogo, {opacity: 0, duration: 1});
                        gsap.to(this.rootImpactLogoReverse, {opacity: 1, duration: 1, onComplete: () => {
                          // if(isMobile()) {
                          //   document.getElementById("navbar").style.top = "0";
                          //   document.getElementById("progress-bar").style.top = "0";
                          // }
                          this.updateGNB('dark');
                      }},"-=1");
          
                      } else {
                        // 루트임팩트 로고 색상 초기화
                        gsap.to(this.rootImpactLogo, {opacity: 1, duration: 1});
                        gsap.to(this.rootImpactLogoReverse, {opacity: 0, duration: 1, onComplete: () => {
                          // if(isMobile()) {
                          //   document.getElementById("navbar").style.top = "0";
                          //   document.getElementById("progress-bar").style.top = "0";
                          // }
                          this.updateGNB('light');
                        }},"-=1");
                      }
                    },
                    onComplete: () => {
                      preventScrollEvent = false;
                      gsap.set(this.transitionRootElem, { css: { 'display': 'none' } });
                    }
                  }, "+=0.1");
            }
          });
        }
      });
  }


  transitionCover() {


  }

  // 화면 숨기기.
  hideScreen() {
    this.transitionHideTimeline.restart();
  }

  // 가렸던 스크린 풀기.
  revealScreen() {
    this.transitionRevealTimeline.restart();
  }

  // ScrollTrigger Pin 엘리먼트의 사용자지정 높이 값.
  impactCampusVerticalPinHeight(multiple) {
    if(this.impactCampusElem) {
      return this.impactCampusElem.offsetHeight * multiple;
    } else {
      console.error('Init InpactCampus Element first.');
      return 0;
    }
  }

  /**
   *  Windows explorer popup
   * @param {boolean} state: is popup open
   */
  openBrowserPopup(state) {
    this.isOpenBrowserPopup = state
    // document.querySelector('body').style.overflow = this.isOpenBrowserPopup ? 'hidden' : 'visible';
    this.dimBackgroundElemBrowser.style.display = state? 'flex': 'none';
    this.explorerBroswerPopupElem.style.display = state? 'flex': 'none';
  }

  /**
   * 메뉴 버튼 열림 / 닫힘 상태 체크 후, 속성값 변경. ( 화살표 방향 변경 )
   * @param {boolean} wantToOpen 
   */
  setBtnArrowClass(wantToOpen) {
    if(wantToOpen) {
      isMenuOpen = true;
      this.menuBtnArrowElem.classList.remove('close');
      this.menuBtnArrowElem.classList.add('open');
      this.menuBtnArrowElem.setAttribute('transform', 'rotate(180 73 70)');

      this.updateCurrentPostiion();
      
      gsap.set(this.menuListElem.parentElement, {visibility: 'visible'});
      gsap.to(this.menuListElem, {opacity: 1});
      gsap.to(this.menuListElem, {height: this.dropdownMenuHeight, duration: .1 });
      gsap.to({}, {duration: 0.2, onComplete: () => this.isAnimateMenu = false});

    } else {
      isMenuOpen = false;
      this.menuBtnArrowElem.classList.remove('open');
      this.menuBtnArrowElem.classList.add('close');
      this.menuBtnArrowElem.setAttribute('transform', 'rotate(0 73 70)');

      gsap.to(this.menuListElem, {opacity: 0, duration: 0});
      gsap.to(this.menuListElem, {height: 0, duration: .1});
      gsap.set(this.menuListElem.parentElement, {visibility: 'hidden'});
      gsap.to({}, {duration: 0.2, onComplete: () => this.isAnimateMenu = false});
      
    }
  }

  /**
   * GNB 색상 갱신.
   * @param {'light' | 'dark'} type 타입.
   */
  updateGNB(type) {
    if(!isMobile()) {
      document.querySelector('.svg-navbtn-content g').setAttribute('filter', 'url(#filter0_dd_2_172)');
      return;
    } else {
      document.querySelector('.svg-navbtn-content g').setAttribute('filter', '');
    }
    if(type === 'dark') {
        if(!this.gnbGlobalNavbar.classList.contains('dark')) this.gnbGlobalNavbar.classList.add('dark');
        if(!this.gnbDropdown.classList.contains('dark')) this.gnbDropdown.classList.add('dark');
        document.querySelector('.svg-navbtn-content g circle').setAttribute('fill','#001B24');
    } else {
        this.gnbGlobalNavbar.classList.remove('dark');
        this.gnbDropdown.classList.remove('dark');
        document.querySelector('.svg-navbtn-content g circle').setAttribute('fill','white');
    }
  }


  // 현재 스크롤의 위치 체크. 메뉴에 반영.
  updateCurrentPostiion() {
    const stCluster = this.impactCluster.getTimeline().scrollTrigger;
    const stCampus = this.impactCampus.getTimeline().scrollTrigger;
    const stVision = this.impactVision.getTimeline().scrollTrigger;
    const stCelebrate = this.impactCelebration.getTimeline().scrollTrigger;

    const pos = window.pageYOffset;

    // Intro
    if(pos < stCluster.start ) {
      if(this.menuBtnIntro.classList.contains('current-pos')) return;
      this.menuBtnIntro.classList.add('current-pos');
      this.menuBtnCluster.classList.remove('current-pos');
      this.menuBtnCampus.classList.remove('current-pos');
      this.menuBtnVision.classList.remove('current-pos');
      this.menuBtnCelebration.classList.remove('current-pos');

    // Cluster
    } else if(pos < stCampus.start) {
      if(this.menuBtnCluster.classList.contains('current-pos')) return;
      this.menuBtnIntro.classList.remove('current-pos');
      this.menuBtnCluster.classList.add('current-pos');
      this.menuBtnCampus.classList.remove('current-pos');
      this.menuBtnVision.classList.remove('current-pos');
      this.menuBtnCelebration.classList.remove('current-pos');

    // Campus
    } else if(pos < stVision.start) {
      if(this.menuBtnCampus.classList.contains('current-pos')) return;
      this.menuBtnIntro.classList.remove('current-pos');
      this.menuBtnCluster.classList.remove('current-pos');
      this.menuBtnCampus.classList.add('current-pos');
      this.menuBtnVision.classList.remove('current-pos');
      this.menuBtnCelebration.classList.remove('current-pos');

    // Vision
    } else if(pos < stCelebrate.start) {
      if(this.menuBtnVision.classList.contains('current-pos')) return;
      this.menuBtnIntro.classList.remove('current-pos');
      this.menuBtnCluster.classList.remove('current-pos');
      this.menuBtnCampus.classList.remove('current-pos');
      this.menuBtnVision.classList.add('current-pos');
      this.menuBtnCelebration.classList.remove('current-pos');

    // Celebration
    } else {
      if(this.menuBtnCelebration.classList.contains('current-pos')) return;
      this.menuBtnIntro.classList.remove('current-pos');
      this.menuBtnCluster.classList.remove('current-pos');
      this.menuBtnCampus.classList.remove('current-pos');
      this.menuBtnVision.classList.remove('current-pos');
      this.menuBtnCelebration.classList.add('current-pos');
    }
  }


  // 스크롤 활성화 제어.
  setScrollActive(active) {
    if(active) {
      document.querySelector('body').classList.remove('hidden');
    } else {
      document.querySelector('body').classList.add('hidden');
    }
    // document.querySelector('body').style.overflow = active ? 'auto' : 'hidden';
  }

  // 해당 아이디의 엘리먼트를 삭제한다.
  removeElement(elementId) {
    document.getElementById(elementId).remove();
  }

  playIntro() {
    if(this.impactIntro) {
      this.impactIntro.playIntro();
    }
  }


  initVideoHoverImages(targetElem, showFunc, hideFunc) {
    targetElem.onpointerenter = showFunc;
    targetElem.onpointerleave = hideFunc;

  }

  // 영상 구간, 마우스를 따라다니는 이미지의 좌표값 지정.
  followMouse = (event) => {
    this.hoverImgContainer.style.left = `${event.x + 20}px`;
    this.hoverImgContainer.style.top = `${event.y + 20}px`;
  }

  // 영상 구간, 마우스를 따라다니는 이미지를 표시합니다.
  showImage(type) {
    if (this.isHover === false) {
      this.isHover = true;
      this.hoverImgContainer.style.display = "block";
      document.addEventListener("pointermove", this.followMouse);
      this.hoverImgIdxCampus, this.hoverImgIdxCluster, this.hoverImgIdxVision = 0;
      this.updateImage(type);
      this.hoverInterval = setInterval(() => this.updateImage(type), 2000);
    }
  }
  
  // 영상 구간, 마우스를 따라다니던 이미지를 숨깁니다.
  hideImage(type) {
    this.isHover = false;
    this.hoverImgContainer.style.display = "";
    switch(type) {
      case 'cluster': this.hoverImgContainer.classList.remove(`cluster${this.hoverImgIdxCluster === 0 ? 4 : this.hoverImgIdxCluster-1}`); break;
      case 'campus': this.hoverImgContainer.classList.remove(`campus${this.hoverImgIdxCampus === 0 ? 4 : this.hoverImgIdxCampus-1}`); break;
      case 'vision': this.hoverImgContainer.classList.remove(`vision${this.hoverImgIdxVision === 0 ? 4 : this.hoverImgIdxVision-1}`); break;
    }
    document.removeEventListener("pointermove", this.followMouse);
    clearInterval(this.hoverInterval);
  }

  updateImage(type) {
    if (this.isHover) {
      switch(type) {
        case 'cluster':
          if(this.hoverImgIdxCluster >= 5) this.hoverImgIdxCluster = 0;
          this.hoverImgContainer.classList.remove(`cluster${this.hoverImgIdxCluster === 0 ? 4 : this.hoverImgIdxCluster-1}`);
          this.hoverImgContainer.classList.add(`cluster${this.hoverImgIdxCluster}`);
          this.hoverImgIdxCluster++;
        break;

        case 'campus':
          if(this.hoverImgIdxCampus >= 5) this.hoverImgIdxCampus = 0;
          this.hoverImgContainer.classList.remove(`campus${this.hoverImgIdxCampus === 0 ? 4 : this.hoverImgIdxCampus-1}`);
          this.hoverImgContainer.classList.add(`campus${this.hoverImgIdxCampus}`);
          this.hoverImgIdxCampus++;
        break;

        case 'vision':
          if(this.hoverImgIdxVision >= 5) this.hoverImgIdxVision = 0;
          this.hoverImgContainer.classList.remove(`vision${this.hoverImgIdxVision === 0 ? 4 : this.hoverImgIdxVision-1}`);
          this.hoverImgContainer.classList.add(`vision${this.hoverImgIdxVision}`);
          this.hoverImgIdxVision++;
        break;
      }
    }
  }
}

const app = new App();
var prevScrollpos = window.pageYOffset;
var resizeTimeout;
var isMenuOpen = false;
let isMenuCollapsed = false;

let savedLastProgress = null;
var progress = 0;
let getValue = true;
let triggerProgress = 0;
var initialized = false;
var refreshCount = 0; // 누적 scrollTriggger Refresh Count;
var targetRefreshCnt = 27;  // 로딩 완료 판단 카운트. // 27 === Lottie 데이터 로딩 후 ScrollTrigger.refresh() 되는 구간 및 초기화시 발생하는 refresh 갯수. ScrollTrigger Event - "refresh" 가 호출되는데 누적된 호출값을 임의 체크 후 지정했음.
var checkedNoneBarSize = false;

let isRotateEvent = false;
let hasRestoredFromLandscape = null;
let prevMaxScroll = 0;

var pageST = ScrollTrigger.create({ 
  start: 0,
  end: "max",
  onUpdate: function(self) {
    // Only for AOS.
    if(savedLastProgress === null && window.screen?.orientation && window.screen.orientation.type !== 'portrait-primary' ) {
      savedLastProgress = triggerProgress;
      // console.log(`AOS - savedLastProgress: ${savedLastProgress}`);
    }
    triggerProgress = self.progress;
    // console.log('triggerProgress : ', triggerProgress);
  }
});

window.addEventListener('load', () => {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  lastestHeight = window.innerHeight;

  let vw = (window.innerWidth * 0.01);
  let vh = (window.innerHeight * 0.01);
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  if (vw > vh) {
    document.documentElement.style.setProperty('--vmax', `${vw}px`);
    document.documentElement.style.setProperty('--vmin', `${vh}px`);
  } else {
    document.documentElement.style.setProperty('--vmax', `${vh}px`);
    document.documentElement.style.setProperty('--vmin', `${vw}px`);
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------
  // 가로모드 이슈 예상 구간. #1

  // 스크롤로 제어되는 로티 애니메이션들이 리사이징시 간헐적으로 타이밍을 벗어나 먼저 열려있거나, 열려있지 않은 상태가 발생하는 구간은 스타일을 저장해두면 해결.
  // 모든 로티가 저장되는 구간을 다 해야되는지 특정구간만 해야되는지는 아직 확인중.

  const lottieElements = "#lottie-cluster-graph-1, #lottie-cluster-graph-2, #cluster-bg-line, #cluster-bg-line2, #lottie-bg-yellow-1, #lottie-bg-yellow-1-1, #lottie-bg-yellow-2, #lottie-impact-130, #lottie-impact-1500, #lottie-graph-floor-line, #lottie-graph, #lottie-bg-green-1, #lottie-bg-green-2, #lottie-bg-green-3, #lottie-bg-green-4, #lottie-bg-green-5, #lottie-bg-green-5-reverse, #lottie-bg-celebrate-line, #lottie-bg-celebrate-line-reverse";
  const introElements = ".seed-wrapper.main-seed"
  const clusterElements = ".cluster-graph-wrapper, .cluster-map-wrapper, .custer-vertical-wrapper, .cluster-background.cluster-circle, .cluster-background.bar-mobile";
  const campusElements = "";
  const visionElements = "";
  const celebrateElements = "";

  ScrollTrigger.saveStyles(`${introElements},${lottieElements},${clusterElements}`); // ,${campusElements},${visionElements},${celebrateElements}


  /**
   * 해상도 변경시 GSAP 내부에서 mediaquery 구간에 맞게 호출 되는 부분.
   * @작성의도 
   * - 모바일을 가로로 돌렸을땐 이벤트를 무시하고, 세로로 복구 했을때, 모든 세션의 timeline들을 killAll() 에서 초기화 하고, 각각의 init()을 재호출하여, 스크롤 이벤트를 재정의. 디바이스 해상도(isMobile()) 에 따른 애니메이션을 초기화 하고자 함.
   * @현재동작 (22.07.03)
   * - PC : 각 세션별 타임라인 애니메이션 구간에 디바이스를 분리하는 기준(isMobile())에 따라, 해당 해상도에 맞는 애니메이션이 실행되어야 하나, 리사이징으로 PC <-> 모바일 간 전환시 각각 반대로 동작하고 있음.
   * - Mobile : 가로모드에서 세로로 복구시 지정된 포지션을 찾지 못함.
   * @해결 ( 22.07.04 )
   * - 최적화 작업을 위해 진행한 utils.js 내 함수 조건 동작 오류.
   * 
   */
  ScrollTrigger.matchMedia({
    // 모바일.
    "(max-width: 768px) and (orientation: portrait)": function() {
      // console.log('mobile');

      // 타임라인에 저장된 데이터 삭제.
      gsap.globalTimeline.getChildren().forEach((child) => child.kill());
      gsap.globalTimeline.clear();

      // 이벤트 콜백은 제거되지 않으므로 수동 삭제.
      // https://greensock.com/docs/v3/GSAP/Timeline/clear()
      gsap.globalTimeline.eventCallback("onEnter", null);
      gsap.globalTimeline.eventCallback("onEnterBack", null);
      gsap.globalTimeline.eventCallback("onLeave", null);

      if(initialized) {
        app.refreshInits();
      } else {
        app.init();
      }
    },


    // 데스크탑.
    "(min-width: 769px)": function() {
      // 모바일 가로모드시 해상도가 넘어가는 경우 있음. 무시.
      if(isHardwareMobile() && window.matchMedia('(orientation: landscape)').matches) {
        // console.log(`mobile - landscape / height : ${window.innerHeight}`);
        return;
      }
      // console.log('desktop');

      // 타임라인에 저장된 데이터 삭제.
      gsap.globalTimeline.getChildren().forEach((child) => child.kill());
      gsap.globalTimeline.clear();

      // 이벤트 콜백은 제거되지 않으므로 수동 삭제.
      // https://greensock.com/docs/v3/GSAP/Timeline/clear()
      gsap.globalTimeline.eventCallback("onEnter", null);
      gsap.globalTimeline.eventCallback("onEnterBack", null);
      gsap.globalTimeline.eventCallback("onLeave", null);

      if(initialized) {
        app.refreshInits();
      } else {
        app.init();
      }
    },
  });

  // ScrollTrigger.matchMedia({
  //   // Mobile.
  //   "(max-width: 768px) and (orientation: portrait)": function() {
  //       console.log('mobile');
  //       gsap.globalTimeline.getChildren().forEach((child) => child.kill());
  //       gsap.globalTimeline.clear();

  //       gsap.globalTimeline.eventCallback("onEnter", null);
  //       gsap.globalTimeline.eventCallback("onEnterBack", null);
  //       gsap.globalTimeline.eventCallback("onLeave", null);

  //       if(initialized) {
  //         app.refreshInits();
  //       } else {
  //         app.init();
  //       }
  //       // ScrollTrigger.sort();
  //       // ScrollTrigger.refresh();
  //   },

  //   // Desktop
  //   "(min-width: 769px)": function() {
  //     if(isHardwareMobile()) {
  //       console.log('mobile - landscape');
  //       return;
  //     }
  //     console.log('desktop');
  //     gsap.globalTimeline.getChildren().forEach((child) => child.kill());
  //     gsap.globalTimeline.clear();

  //     gsap.globalTimeline.eventCallback("onEnter", null);
  //     gsap.globalTimeline.eventCallback("onEnterBack", null);
  //     gsap.globalTimeline.eventCallback("onLeave", null);

  //     if(initialized) {
  //       app.refreshInits();
  //     } else {
  //       app.init();
  //     }
  //     // ScrollTrigger.sort();
  //     // ScrollTrigger.refresh();
  //   },
  // });

  blockScrollPropagation(cacheSelectOne('.prevent-horizontal'));
  isHardwareMobile() && initDisableLandscapeView();
  initGlobalScrollProgressBar('#progress-bar .guage');
});

// ScrollTrigger.matchMedia END ------------------------------------------------------------------------------------------------------------------------------------------------


var lastestHeight = 0;

window.addEventListener("resize",() => {
  // 최신 스크롤 상태 값 저장.
  // 현재 딜레이 간격이 조금 길어 정확한 마지막 위치가 지정되지 않는것으로 추정.
  if(getValue) { 
    progress = triggerProgress;
    // console.log('progress : ', progress);
  }
  getValue = false;

  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (isMobile()) {
      if(window.matchMedia("(orientation: portrait)").matches) {
        getValue = true;

        // console.log(`${window.innerHeight} / ${lastestHeight}`);

        // 모바일 스크롤시 리사이징 이벤트가 발생하고, 뷰포트 최대값 ( 상하단 바가 모두 사라진 상태 ) 를 기준으로 갱신 해주고자 작성 했던 구간.
        if (lastestHeight !== window.innerHeight) {

          // console.log('Change height');
          lastestHeight = window.innerHeight;
          
          // --------------------------------------------------------------------------------------
          // 모바일 100vh 이슈로 인해 css 내 calc 를 이용한 재계산용으로 작성하였으나, 현재는 디버깅시 수치 확인용.

          document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);

          let vw = (window.innerWidth * 0.01);
          let vh = (window.innerHeight * 0.01);
          document.documentElement.style.setProperty('--vh', `${vh}px`);

          if (vw > vh) {
            document.documentElement.style.setProperty('--vmax', `${vw}px`);
            document.documentElement.style.setProperty('--vmin', `${vh}px`);
          } else {
            document.documentElement.style.setProperty('--vmax', `${vh}px`);
            document.documentElement.style.setProperty('--vmin', `${vw}px`);
          }
          // --------------------------------------------------------------------------------------

          // 모바일 스크롤로 상하단바가 사라지며, 뷰포트가 커졌다면, 리프래쉬 이벤트 호출 후 애니메이션 갱신.
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }
      }
    }

    // Desktop resize event.
    else {
      getValue = true;

      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);

      let vw = window.innerWidth * 0.01;
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      if (vw > vh) {
        document.documentElement.style.setProperty('--vmax', `${vw}px`);
        document.documentElement.style.setProperty('--vmin', `${vh}px`);
      } else {
        document.documentElement.style.setProperty('--vmax', `${vh}px`);
        document.documentElement.style.setProperty('--vmin', `${vw}px`);
      }

      // DOM 변동사항이 재대로 적용되지 않는 경우가 발생할 경우, ScrollTrigger.refresh() 호출시 safe Parameter 값 true 적용.
      // https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.refresh()
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
    }

  }, 200);

});

// const debounceResize = debounce(resize, 600);
// window.addEventListener("resize", debounceResize);


var lastScrollTop = 0;
var delta = 50;
var didScroll = false;
var preventScrollEvent = false;

// 스크롤 이벤트 추가.
window.addEventListener('scroll', function(e) {
  if(preventScrollEvent) return;

  if(isMenuOpen) {
    app.setBtnArrowClass(false);
  }

  // 모바일에서 스크롤 이벤트 호출 상태 체크.
  if(isMobile()) {
    didScroll = true;
  }
}, false);

// 스크롤 상태 지속 체크하여...
setInterval(function() {
  if (didScroll) {
      hasScrolled();
      didScroll = false;
  }
}, 250);

// 일정 구간 스크롤을 하였을 경우, GNB 표시 여부 동작.
function hasScrolled() {
  const currentSt = window.pageYOffset;
  
  if(Math.abs(lastScrollTop - currentSt) <= delta) return;

  if (currentSt > lastScrollTop && currentSt > 80 ) {
    document.getElementById("navbar").style.top = "-7.5vh";
    document.getElementById("progress-bar").style.top = "-7.5vh";
  } else {
      document.getElementById("navbar").style.top = "0";
      document.getElementById("progress-bar").style.top = "0";
  }
  lastScrollTop = currentSt;
}


// var prevScrollPosition = window.pageYOffset;
// const throttleMenuCheck = throttle(menuCheck, 100);
// const navBar = document.getElementById("navbar");
// const progressBar = document.getElementById("progress-bar");

// // 로딩이 끝난다음 스크롤 이벤트 추가.
// window.addEventListener("scroll", throttleMenuCheck, false);

// function menuCheck() {
//   var currentScrollPos = window.pageYOffset;

//   if (isMenuOpen) {
//     app.setBtnArrowClass(false);
//   }

//   if (isMobile()) {
//     if (prevScrollPosition > currentScrollPos) {
//       if (isMenuCollapsed) {
//         navBar.style.top = "0";
//         progressBar.style.top = "0";
//         isMenuCollapsed = false;
//       }
//     } else {
//       if (!isMenuCollapsed) {
//         navBar.style.top = "-65px";
//         progressBar.style.top = "-56px";
//         isMenuCollapsed = true;
//       }
//     }
//     prevScrollPosition = currentScrollPos;
//   }
// }


let restoredFromLandscapeTimeout;
let checkScrollStateInterval;
ScrollTrigger.addEventListener("refresh", function() {
  ScrollTrigger.sort();

  refreshCount++;

  const maxScroll = ScrollTrigger.maxScroll(window);

  if(initialized) {
    if (isRotateEvent) {
      if (!hasRestoredFromLandscape) {
        return;
      }

      clearTimeout(restoredFromLandscapeTimeout);
      restoredFromLandscapeTimeout = setTimeout(() => {
        // console.log(`savedLastProgress : ${savedLastProgress} / prevMaxScroll: ${prevMaxScroll}`);
        // console.log(`scrollTo : ${savedLastProgress * prevMaxScroll}`);
        // console.log(pageST);
        pageST.scroll(savedLastProgress * prevMaxScroll);
        savedLastProgress = null;
        hasRestoredFromLandscape = false;
        var delayCover = setTimeout(() => { cacheSelectOne('.prevent-horizontal').style.setProperty('display', 'none'); clearTimeout(delayCover); }, 500);
      }, 800);      
    }
    
    else {
      if (progress > 0.01 && (progress * maxScroll) > window.innerHeight) {
        pageST.scroll(progress * maxScroll);
      }
    }
  }

  prevMaxScroll = maxScroll;
});

// 디바이스 가로 disable
function initDisableLandscapeView() {
  let isPrevLandscape;
  const preventEl = cacheSelectOne('.prevent-horizontal');

  const enable = () => {
    if (hasRestoredFromLandscape === false) {
      hasRestoredFromLandscape = true;
    }

    isRotateEvent = true;
    pageST.enable(false, false);

    if (!hasRestoredFromLandscape) {
      preventEl?.style.setProperty('display', 'none');
    }
  }

  const disable = () => {
    // AOS : 회전 이후의 값이 오는 경우가 있음. pageST Update에서 rotation이 변경될때 곧바로 변경전 값 체크.
    // Check For iOS.
    if (savedLastProgress === null) {
      savedLastProgress = triggerProgress; 
      console.log(`iOS - savedLastProgress - ${savedLastProgress}`);
    }

    pageST.disable();
    hasRestoredFromLandscape = false;
    isRotateEvent = true;
    preventEl?.style.removeProperty('display');
  }

  const disableLandscapeView = () => {
    const landscape = isLandscape();
    
    if (isPrevLandscape === landscape) {
        // document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
      return;
    }

    landscape ? disable() : enable();
    isPrevLandscape = landscape
  }

  listen(window, 'resize', disableLandscapeView);
  disableLandscapeView();

  preventEl?.style.setProperty('visibility', 'visible');
}

function tickGSAPWhileHidden(value) {
	if (value === false) {
		document.removeEventListener("visibilitychange", tickGSAPWhileHidden.fn);
		return clearInterval(tickGSAPWhileHidden.id);
	}
	const onChange = () => {
		clearInterval(tickGSAPWhileHidden.id);
		if (document.hidden) {
			gsap.ticker.lagSmoothing(0); // keep the time moving forward (don't adjust for lag)
			tickGSAPWhileHidden.id = setInterval(gsap.ticker.tick, 500);
		} else {
			gsap.ticker.lagSmoothing(500, 33); // restore lag smoothing
		}
	};
	document.addEventListener("visibilitychange", onChange);
	tickGSAPWhileHidden.fn = onChange;
	onChange(); // in case the document is currently hidden.
}

tickGSAPWhileHidden(true);
