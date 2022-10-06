function main() {
    /* Get all Lottie animations on page */
    const animations = document.querySelectorAll('.lottie-animation');

    /* Initialize ScrollMagic */
    const controller = new ScrollMagic.Controller();

    var $timeLineTest = $(".timeline_test");
    var tween = TweenMax.to($timeLineTest, 0.5, {backgroundColor: "black"});

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
                if ( durationIsNumString ) {
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

        // lottieInstance.addEventListener('DOMLoaded', async (e) => {
            /* Waits until the SVGs have loaded to get height of container - prevents breaking of non-fixed height containers. */
            let parent = animation.parentElement;
            let parent2 = animation;

            // console.log(parent2)
            // console.log(typeof parent2)
            // console.log(parent2.attributes)
            // console.log(parent2.attributes[1].textContent)

            if(parent2.attributes[1].textContent == "test11"){
                new ScrollMagic.Scene({
                    /* Animation will be linked to the scroll progress of its container, starting when the top of container is halfway through viewport and ending when bottom of container is halfway through viewport */
                    triggerElement: parent2,
                    triggerHook: animTriggerHook,
                    offset: animOffset,
                    duration: animDuration === "parentHeight" ? parent.offsetHeight : animDuration === "elemHeight" ? animation.offsetHeight : animDuration
                })
                .setTween(tween)
                .addTo(controller)
                .addIndicators()
            }else{
                new ScrollMagic.Scene({
                    /* Animation will be linked to the scroll progress of its container, starting when the top of container is halfway through viewport and ending when bottom of container is halfway through viewport */
                    triggerElement: parent2,
                    triggerHook: animTriggerHook,
                    offset: animOffset,
                    duration: animDuration === "parentHeight" ? parent.offsetHeight : animDuration === "elemHeight" ? animation.offsetHeight : animDuration
                })
                    .addTo(controller)
                    .addIndicators() /* Debugging tool to see where an  d when animations occur */
                    .on("progress", function (e) {
                        const scrollFrame = e.progress * (lottieInstance.totalFrames - 1);
                        lottieInstance.goToAndStop(scrollFrame, true);

                        // console.log(e.progress)
                        // console.log(scrollFrame)
                        /*if(scrollFrame > 120){
                            TweenMax.to($timeLineTest, 1.5, {backgroundColor:"blue", x: 100})
                        }else{
                            TweenMax.to($timeLineTest, 1.5, {backgroundColor:"red", x: 0})
                        }*/
                    });
            }
            /* Build ScrollMagic scene once all SVGs are loaded*/
        });
    // });

    /*const controller2 = new ScrollMagic.Controller();
    var scene2 = new ScrollMagic.Scene({
        triggerElement: $timeLineTest,
        duration: 300
    })
    .addIndicators()
    .addTo(controller2);*/
}