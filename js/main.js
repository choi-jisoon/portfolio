const sections = document.querySelectorAll("section");
const headerHeight = document.querySelector("header").offsetHeight;
let currentSection = 0;
let isScrolling = false;
let isInProjectSection = false;  // 프로젝트 섹션 안에 있는지 여부

/* main page */
const mainText = document.querySelector('.main_text');
mainText.style.opacity = 1;

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

let scrollTimeout; // 타이머 변수 선언

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;  // 스크롤 중이면 무시

    const delta = event.deltaY;

    // 프로젝트 섹션에 있을 때는 별도 스크롤 관리
    if (isInProjectSection) {
        return;  // 프로젝트 섹션은 별도로 처리
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
        scrollTo: { y: targetScrollPosition, autoKill: true }, // autoKill을 true로 설정
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
            isScrolling = false;
        }
    });

    // 디바운스 처리
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1000); // 스크롤이 멈춘 후 1초 뒤에 isScrolling 플래그 해제

    event.preventDefault();
}, { passive: false });


// 스킬 섹션 애니메이션
const skillContainer = document.querySelector('.skill_container');
gsap.set(skillContainer, { opacity: 0, y: 100 });

ScrollTrigger.create({
    trigger: ".skill",
    start: "top 80%",
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


/* project */

const projectContainer = document.querySelector('.project_container');
gsap.set(projectContainer, { opacity: 0, y: 100 });

ScrollTrigger.create({
    trigger: ".project",
    start: "top 80%",
    end: "bottom 100%",
    onEnter: () => {
        gsap.to(projectContainer, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out"
        });
    },
    onLeave: () => {
        gsap.to(projectContainer, {
            opacity: 0,
            y: 100,
            duration: 2,
            ease: "power2.out"
        });
    },
    onEnterBack: () => {
        gsap.to(projectContainer, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out"
        });
    },
    onLeaveBack: () => {
        gsap.to(projectContainer, {
            opacity: 0,
            y: 100,
            duration: 2,
            ease: "power2.out"
        });
    }
});

const projectBoxes = document.querySelectorAll('.project_box');

// 초기 설정: 박스들을 화면 바깥에 배치 (x, y 값을 크게 설정)
gsap.set(projectBoxes, {
    x: (i) => (i % 2 === 0 ? -400 : 400), // 짝수 박스는 왼쪽 바깥으로, 홀수 박스는 오른쪽 바깥으로 설정
    y: (i) => (i % 2 === 0 ? -200 : 200), // Y축도 비슷하게 바깥으로 설정
    scaleX: 0,  // X축 축소 상태로 시작
    scaleY: 0   // Y축 축소 상태로 시작
});

ScrollTrigger.create({
    trigger: ".project",
    start: "top 80%",
    end: "bottom 100%",
    onEnter: () => {
        gsap.to(projectBoxes, {
            x: 0,     // 중앙으로 이동
            y: 0,     // Y축도 중앙으로 이동
            scaleX: 1, // 원래 크기로
            scaleY: 1, // 원래 크기로
            duration: 2.5, // 애니메이션 지속 시간
            stagger: 0.15, // 박스들이 차례로 모이도록 설정
            ease: "power1.out" // 부드럽게 천천히 모이도록 설정
        });
    },
    onLeave: () => {
        gsap.to(projectBoxes, {
            x: (i) => (i % 2 === 0 ? -400 : 400), // 다시 바깥으로 이동
            y: (i) => (i % 2 === 0 ? -200 : 200),
            scaleX: 0, // 다시 축소
            scaleY: 0, // 다시 축소
            duration: 2.5, // 애니메이션 지속 시간
            stagger: 0.15, // 박스들이 차례로 퍼지도록
            ease: "power1.out" // 부드러운 축소 애니메이션
        });
    },
    onEnterBack: () => {
        gsap.to(projectBoxes, {
            x: 0,  // 중앙으로 이동
            y: 0,
            scaleX: 1, // 원래 크기로
            scaleY: 1, // 원래 크기로
            duration: 2.5, // 애니메이션 지속 시간
            stagger: 0.15, // 박스들이 차례로 모이도록 설정
            ease: "power1.out" // 부드럽게 천천히 정렬되도록 설정
        });
    },
    onLeaveBack: () => {
        gsap.to(projectBoxes, {
            x: (i) => (i % 2 === 0 ? -400 : 400), // 바깥으로 이동
            y: (i) => (i % 2 === 0 ? -200 : 200),
            scaleX: 0, // 다시 축소
            scaleY: 0, // 다시 축소
            duration: 2.5, // 애니메이션 지속 시간
            stagger: 0.15, // 박스들이 차례로 퍼지도록
            ease: "power1.out" // 부드럽게 천천히 퍼지도록 설정
        });
    }
});


const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal_title');
const modalImage = document.getElementById('modal_image');
const modalDescription = document.getElementById('modal_description');
const closeModal = document.querySelector('.close');

// 프로젝트 박스를 클릭할 때 모달 열기
projectBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const title = box.getAttribute('data-title');
        const description = box.getAttribute('data-description');
        const image = box.getAttribute('data-image');
        const link = box.getAttribute('data-link'); // 링크 가져오기

        modalTitle.textContent = title;
        modalImage.src = image; // 큰 이미지로 변경
        modalDescription.innerHTML = description; // HTML로 줄바꿈 적용
        document.getElementById('modal_button').href = link; // 버튼 링크 설정

        modal.style.display = "block"; // 모달 열기
    });
});

// 모달 닫기 버튼 클릭 시 모달 닫기
closeModal.addEventListener('click', () => {
    modal.style.display = "none"; // 모달 닫기
});

// 모달 외부 클릭 시 모달 닫기
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none"; // 모달 닫기
    }
});






