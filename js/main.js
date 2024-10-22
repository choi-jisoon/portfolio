const sections = document.querySelectorAll("section");
const headerHeight = document.querySelector("header").offsetHeight;
let currentSection = 0;
let isScrolling = false;
let isInProjectSection = false;

// GNB(메뉴)를 클릭할 때 해당 섹션으로 스크롤 이동
document.querySelectorAll('#gnb a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        let targetScrollPosition = targetSection.offsetTop - headerHeight;

        currentSection = Array.from(sections).indexOf(targetSection);
        isScrolling = true;

        gsap.to(window, {
            scrollTo: { y: targetScrollPosition, autoKill: false },
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                isScrolling = false;
            }
        });
    });
});

/* 스크롤 내리면 다음 섹션, 이전 섹션으로 애니메이션으로 이동 */
let scrollTimeout;

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    const delta = event.deltaY;


    if (isInProjectSection) {
        return;
    }

    if (delta > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (delta < 0 && currentSection > 0) {
        currentSection--;
    } else {
        return;
    }

    isScrolling = true;

    let targetScrollPosition = sections[currentSection].offsetTop - headerHeight;
    gsap.to(window, {
        scrollTo: { y: targetScrollPosition, autoKill: true },
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
            isScrolling = false;
        }
    });


    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1000);

    event.preventDefault();
}, { passive: false });


/* 홈 애니메이션 */
const mainText1 = document.querySelector('.main1');
const mainText2 = document.querySelector('.main2');
const mainText3 = document.querySelector('.main3');
const mainText4 = document.querySelector('.main4');

const mainImg = document.querySelector('.main_img');

mainText1.style.opacity = 1;
setTimeout(() => {
mainText1.classList.add('moved');
}, 1500);


setTimeout(() => {
    mainText2.classList.add('visible');
}, 2500);


setTimeout(() => {
    mainText3.classList.add('visible');
    mainText4.classList.add('visible');
}, 3500);

setTimeout(() => {
    mainImg.style.opacity = 1;
}, 4500);



// 프로필 섹션 애니메이션
const profileLeft = document.querySelector('.profile_left');
const profileRight = document.querySelector('.profile_right');

gsap.set(profileLeft, { opacity: 0, x: -200 });
gsap.set(profileRight, { opacity: 0, x: 200 });

ScrollTrigger.create({
    trigger: ".profile",
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => {
        gsap.to(profileLeft, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out"
        });
        gsap.to(profileRight, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out"
        });
    },
    onLeave: () => {
        gsap.to(profileLeft, {
            opacity: 0,
            x: -100,
            duration: 1.5,
            ease: "power2.out"
        });
        gsap.to(profileRight, {
            opacity: 0,
            x: 100,
            duration: 1.5,
            ease: "power2.out"
        });
    },
    onEnterBack: () => {
        gsap.to(profileLeft, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out"
        });
        gsap.to(profileRight, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out"
        });
    },
    onLeaveBack: () => {
        gsap.to(profileLeft, {
            opacity: 0,
            x: -100,
            duration: 1.5,
            ease: "power2.out"
        });
        gsap.to(profileRight, {
            opacity: 0,
            x: 100,
            duration: 1.5,
            ease: "power2.out"
        });
    }
});



// 스킬 섹션 애니메이션
const skillContainer = document.querySelector('.skill_container');
gsap.set(skillContainer, { opacity: 0, y: 200 });

ScrollTrigger.create({
    trigger: ".skill",
    start: "top 100%",
    end: "bottom 100%",
    onEnter: () => {
        gsap.to(skillContainer, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out"
        });
    },
    onLeave: () => {
        gsap.to(skillContainer, {
            opacity: 0,
            y: 100,
            duration: 2,
            ease: "power2.out"
        });
    },
    onEnterBack: () => {
        gsap.to(skillContainer, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out"
        });
    },
    onLeaveBack: () => {
        gsap.to(skillContainer, {
            opacity: 0,
            y: 100,
            duration: 2,
            ease: "power2.out"
        });
    }
});


/* 프로젝트 섹션 애니메이션 */
const projectContainer = document.querySelector('.project_container');
gsap.set(projectContainer, { opacity: 0, y: 100 });

ScrollTrigger.create({
    trigger: ".project",
    start: "top 90%",
    end: "bottom 100%",
    onEnter: () => {
        gsap.to(projectContainer, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out"
        });
    },

});

const projectBoxes = document.querySelectorAll('.project_box');

gsap.set(projectBoxes, {
    x: (i) => (i % 2 === 0 ? -400 : 400),
    y: (i) => (i % 2 === 0 ? -200 : 200),
    scaleX: 0,
    scaleY: 0
});

ScrollTrigger.create({
    trigger: ".project",
    start: "top 100%",
    end: "bottom 100%",
    onEnter: () => {
        document.body.style.overflowX = 'hidden';
        gsap.to(projectBoxes, {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 2.5,
            stagger: 0.15,
            ease: "power1.out",
            onComplete: () => {
                document.body.style.overflowX = '';
            }
        });
    },
    onLeaveBack: () => {
        document.body.style.overflowX = 'hidden';
        gsap.to(projectBoxes, {
            x: (i) => (i % 2 === 0 ? -400 : 400),
            y: (i) => (i % 2 === 0 ? -200 : 200),
            scaleX: 0,
            scaleY: 0,
            duration: 1.5,
            stagger: 0.15,
            ease: "power1.out",
            onComplete: () => {
                document.body.style.overflowX = '';
            }
        });
    }
});





// 모달 박스 처리
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal_title');
const modalImage = document.getElementById('modal_image');
const modalDescription = document.getElementById('modal_description');
const closeModal = document.querySelector('.close');


projectBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const title = box.getAttribute('data-title');
        const description = box.getAttribute('data-description');
        const image = box.getAttribute('data-image');
        const link = box.getAttribute('data-link');

        modalTitle.textContent = title;
        modalImage.src = image;
        modalDescription.innerHTML = description;
        document.getElementById('modal_button').href = link;

        modal.style.display = "block";
    });
});

//x 눌렀을 때 모달 닫기
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

//외부 클릭 시 모달 닫기
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});






