//imports
import LocomotiveScroll from 'locomotive-scroll';
// typical import
import gsap from "gsap";

// get other plugins:
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); 


//Locomotive

const locoScroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true,
    smartphone: {
        smooth: true, // Enable smooth scroll on mobile
        touchMultiplier: 2, // Adjust touch sensitivity
      },
      tablet: {
        smooth: true, // Enable smooth scroll on tablets
        touchMultiplier: 2, // Adjust for better responsiveness
      }
});




locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) :    locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


//gsap

gsap.to("#page1", {
    scrollTrigger: {
        trigger: "#page1",
        // markers: true,
        start: "10% bottom",
        end: "10% 25%",
        scrub: true,
        scroller: ".main",
    },
    width: "88vw",
    marginLeft: "6vw",
})


gsap.to(".text-display", {
    scrollTrigger: {
        trigger: ".text-display",
        start: "-120% top",
        end: "800% bottom",
        scrub: true,
        scroller: ".main",

    },
    width: "84vw",
    ease: "power1.inOut",
    duration: 4,
    filter: "blur(20px)",
    
})

gsap.to([".pages", "#background", ".text-display"], {
    scrollTrigger: {
        trigger: ".pages",
        start: "5% top",
        end: "30% 65%",
        toggleActions: "play none reverse none",
        scroller: ".main",
       
     
    },
    backgroundColor: "#F0F2F2",
    
})


gsap.to(["body", ".navbar .link"], {
    scrollTrigger: {
        trigger: ".pages",
        start: "5% top",
        end: "30% 25%",
        scrub: true,
        scroller: ".main",
     
    },
    color: "#0F0D0D",
    borderColor: "#0F0D0D",
    
})

gsap.to([".credits", ".logo"], {
    scrollTrigger: {
        trigger: ".pages",
        start: "5% top",
        end: "30% 25%",
        scrub: true,
        scroller: ".main",
     
    },
    filter: "invert()",
    
})



gsap.to("#page2 .image > img", {
    scrollTrigger: {
        trigger: "#page2 .image > img",
        scrub: true,
        start: "50% bottom",
        end: "200% top",
        scroller: ".main",
     
    },
    transform: "translate(-25%, 0%)",
    
    
})
gsap.to("#page3 .grid-part-1 .wrapper1 > img", {
    scrollTrigger: {
        trigger: "#page3 .grid-part-1 .wrapper1 > img",
        scrub: true,
        start: "70% bottom",
        end: "150% top",
        scroller: ".main",
     
    },
    transform: "translate(0, 15%)",
    ease: "none",
    
    
})
gsap.from("#page3 .grid-part-1 .el2", {
    scrollTrigger: {
        trigger: "#page3 .el2",
        scrub: true,
        start: "70% bottom",
        end: "70% top",
        scroller: ".main",
     
    },
    transform: "translate(0, 30%)",
    ease: "none",
    
    
})
gsap.from("#page3 .grid-part-2 .el1", {
    scrollTrigger: {
        trigger: "#page3 .grid-part-2 .el1",
        scrub: true,
        start: "70% bottom",
        end: "70% top",
        scroller: ".main",
     
    },
    marginTop: "25vw",
    
    
})

gsap.to("#page3 .grid-part-2 .el2  img", {
    scrollTrigger: {
        trigger: "#page3 .grid-part-2 .el2  img",
        scrub: true,
        start: "70% bottom",
        end: "150% top",
        scroller: ".main",
     
    },
    transform: "translate(0, 15%)",
    ease: "none",
    
    
})

gsap.to(".main", {
    scrollTrigger: {
        trigger: ".pages",
        start: "180% 90%",
        end: "200%, top",
        toggleActions: "play none none reverse ",
        scroller: ".main",
       
     
    },
    backgroundColor: "#0F0D0D",
    duration: 0.2,
    
})


gsap.to(["#page3", "#page4", ".navbar .link"], {
    scrollTrigger: {
        trigger: ".pages",
        start: "180% 90%",
        end: "200%, top",
        toggleActions: "play none none reverse ",
        scroller: ".main",
       
     
    },
    color: "#F0F2F2",
    borderColor: "#F0F2F2",
    duration: 0.2,
    
})


gsap.to(".scroller", {
    scrollTrigger:{
        trigger: "#page4",
        start: "125% 50%",
        end: "1000% bottom",
        scrub: true,
        pin: true,
        scroller: ".main"
    },
    transform: "translate(-80%)",
    ease: "none"
})

const followDiv = document.querySelector('.follow-div');
let offSet = 16/2
        // Set up initial position
        gsap.set(followDiv, { x: 0, y: 0 });

        // Add mousemove event listener
        document.addEventListener('mousemove', (e) => {
            // Animate the div to follow the cursor with smooth motion
            gsap.to(followDiv, {
                x: e.pageX - offSet,
                y: e.pageY -offSet,
                duration: 0.3,
                delay: 0.05, // Controls the smoothness of the follow effect
                ease: 'power3.out' // Optional easing for smoother motion
            });
        });


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


