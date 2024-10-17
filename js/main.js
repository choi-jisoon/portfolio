/* 일반 js */
const mainText = document.querySelector('.main_text');
mainText.style.opacity = 1;



/* scrollTrigger */
gsap.registerPlugin(ScrollTrigger);

/* profile 섹션 */
gsap.to(".profile_title", {
  scrollTrigger: {
    trigger: ".profile",
    start: "top-=120 top",
    pin: true,
    end: () => "+=" + document.querySelector(".profile").offsetHeight,
  }
});

/* skill 섹션 */
gsap.from(".skill_container", {
  scrollTrigger: {
    trigger: ".skill",
    start: "top-=120 top",
    pin: true,
    end: () => "+=" + document.querySelector(".profile").offsetHeight,
    toggleActions: "play reverse play reverse"
  },
  y: 100,
  opacity: 0,
  duration: 2,
  ease: "power2.out"
});

/* project 섹션 */

let sections = gsap.utils.toArray('.project_container');

gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".project",
        pin: true,
        scrub: 1,
        start: "top-=120 top",
    }
});






