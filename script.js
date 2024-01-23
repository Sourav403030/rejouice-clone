function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
  
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

locoScroll();

function cursorEffect(){
    let page1Content = document.querySelector('#page1-content');
let cursor = document.querySelector('#cursor');

page1Content.addEventListener('mousemove', function(event){
    gsap.to(cursor,{
        x: event.x,
        y: event.y

    })
})

page1Content.addEventListener("mouseenter", function(event){
    gsap.to(cursor, {
        scale: 1,
        opacity: 1
    })
})

page1Content.addEventListener("mouseleave", function(event){
    gsap.to(cursor, {
        scale: 0,
        opacity: 0
    })
})
}

cursorEffect();

function page2Animation(){
    gsap.from(["#page2  h2", "#page2 h3", "#page2 hr"],{
        y:120,
        stagger:0.2,
        duration:1,
        scrollTrigger:{
            trigger: "#page2",
            scroller: "#main", 
            start: "top 65%",
            end: "top 46%",
            // markers: true,
            scrub: 3
        }
    });
}

page2Animation();


function page3Animation(){
    gsap.from(["#page3  h2", "#page2 h4"],{
        y:120,
        stagger:0.2,
        duration:1,
        scrollTrigger:{
            trigger: "#page3",
            scroller: "#main", 
            start: "top 65%",
            end: "top 46%",
            // markers: true,
            scrub: 3
        }
    });
}

page3Animation();

function loopCursorEffect(){
    let page4 = document.querySelector('#page4');
    let cursorLoop = document.querySelector('#take-one-loop');

    page4.addEventListener('mousemove',function(event){
       gsap.to(cursorLoop,{
        x: event.x, 
        y:event.y
       })
    })
    page4.addEventListener("mouseenter", function(event){
        gsap.to(cursorLoop, {
            scale: 1,
            opacity: 1
        })
    })
    
    page4.addEventListener("mouseleave", function(event){
        gsap.to(cursorLoop, {
            scale: 0,
            opacity: 0
        })
    })
  
 }

loopCursorEffect();

function sliderAnimation(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
          },
      });
}

sliderAnimation();

function loaderAnimation(){
    let tl = gsap.timeline()

tl.from("#loader h2",{
    x: 70,
    opacity: 0,
    duration: 1,
    stagger: 0.1
})

tl.to("#loader h2",{
    x: -40,
    opacity: 0,
    stagger:0.1
})

tl.to("#loader",{
    opacity: 0
})

tl.from("#page1-content h1 span",{
    y:100,
    opacity: 0,
    duration:0.5, 
    stagger: 0.1
})

tl.to("#loader",{
    display: "none"
})
}

loaderAnimation();


function footerAnimation(){
    let gtl = gsap.timeline()

gtl.from(["#footer #top-left", "#footer #top-right", "#footer #bottom-left", "#footer  #bottom-right"],{
    y: -120,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger:{
        trigger: "#footer",
        scroller: "#main", 
        start: "top 80%",
        end: "top 46%",
        // markers: true,
        scrub: 3
    }
})

gtl.from("#rejouice-footer h1 span",{
    y: 120,
    opacity: 0,
    duration: 5,
    stagger: 2,
    scrollTrigger:{
        trigger: "#rejouice-footer",
        scroller: "#main", 
        start: "top 70%",
        end: "top 60%",
        // markers: true,
        scrub: 3
    }
})
}

footerAnimation();