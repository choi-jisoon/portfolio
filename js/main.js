window.addEventListener("load", () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);

    const sections = document.querySelectorAll("section");
    const headerHeight = document.querySelector("header").offsetHeight;
    let currentSection = 0;
    let isScrolling = false;
    let animationCompleted = false;
    let lastScrollTime = 0;
    let homeAnimationFinished = false; // 홈 섹션 애니메이션 완료 여부
    const scrollThreshold = 100;

    // 스크롤 비활성화하는 함수
    function disableScroll() {
        window.addEventListener('wheel', preventScroll, { passive: false });
    }

    // 스크롤 활성화하는 함수
    function enableScroll() {
        window.removeEventListener('wheel', preventScroll, { passive: false });
    }

    // 스크롤을 막는 함수
    function preventScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    // GNB 메뉴 클릭 시 해당 섹션으로 부드럽게 스크롤
    document.querySelectorAll('#gnb a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
                    if (currentSection === 0) {
                        restartHomeAnimation();
                    }
                }
            });
        });
    });

    // 휠 스크롤로 섹션 간 이동
    window.addEventListener("wheel", (event) => {
        if (isScrolling || !animationCompleted || !homeAnimationFinished) return;

        const delta = event.deltaY;

        if (Math.abs(delta) < scrollThreshold) return;

        if (delta > 0 && currentSection < sections.length - 1) {
            currentSection++;
        } else if (delta < 0 && currentSection > 0) {
            currentSection--;
        } else {
            return;
        }

        isScrolling = true;

        let targetScrollPosition = sections[currentSection].offsetTop - headerHeight ;
        gsap.to(window, {
            scrollTo: { y: targetScrollPosition },
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                isScrolling = false;
                if (currentSection === 0) {
                    restartHomeAnimation();
                }
            }
        });

        event.preventDefault();
    }, { passive: false });

    // 홈 섹션 애니메이션 실행
    function startHomeAnimation() {
        const mainText1 = document.querySelector('.main1');
        const mainImg = document.querySelector('.main_img');
        homeAnimationFinished = false;

        disableScroll(); // 애니메이션 시작 시 스크롤 비활성화

        setTimeout(() => {
            mainText1.style.opacity = 1;
        }, 500);

        setTimeout(() => {
            mainText1.classList.add('moved');
        }, 1000);

        setTimeout(() => {
            mainImg.style.opacity = 1;
        }, 1500);

        // 애니메이션 완료 후 스크롤 활성화
        setTimeout(() => {
            homeAnimationFinished = true;
            enableScroll(); // 애니메이션이 끝난 후 스크롤 활성화
        }, 2500);

        const ani3 = gsap.timeline();
        ani3.from('.main_page .main2', { xPercent: -300, autoAlpha: 0 })
            .from('.main_page .main3', { xPercent: 300, autoAlpha: 0 })
            .from('.main_page .main4', { xPercent: -300, autoAlpha: 0 });

        ScrollTrigger.create({
            animation: ani3,
            trigger: '.main_page',
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 1,
            onLeave: () => {
                animationCompleted = true;
            },
            onEnterBack: () => {
                restartHomeAnimation();
            },
            onLeaveBack: () => {
                resetMainAnimation();
            }
        });
    }

    // 홈 섹션 애니메이션 초기화 함수
    function resetMainAnimation() {
        const mainText1 = document.querySelector('.main1');
        mainText1.style.opacity = 0;
        mainText1.classList.remove('moved');
    }

    // 홈 섹션 애니메이션 재실행 함수
    function restartHomeAnimation() {
        animationCompleted = false;
        homeAnimationFinished = false;
        disableScroll(); // 애니메이션 재실행 시 스크롤 비활성화
        const mainText1 = document.querySelector('.main1');
        mainText1.style.opacity = 0;
        mainText1.classList.remove('moved');

        setTimeout(() => {
            mainText1.style.opacity = 1;
            mainText1.classList.add('moved');
        }, 1500);

        setTimeout(() => {
            homeAnimationFinished = true;
            enableScroll(); // 애니메이션이 끝난 후 스크롤 활성화
        }, 2300);

        ScrollTrigger.refresh();
    }

    // 애니메이션 시작
    startHomeAnimation();

    /* 프로필 섹션 애니메이션 */
    const profileLeft = document.querySelector('.profile_left');
    const profileRight = document.querySelector('.profile_right');

    gsap.set(profileLeft, { opacity: 0, x: -100 });
    gsap.set(profileRight, { opacity: 0, x: 100 });

    ScrollTrigger.create({
        trigger: ".profile",
        start: "top 80%",
        end: "bottom 100%",
        onEnter: () => {
            gsap.to(profileLeft, {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power2.out"
            });
            gsap.to(profileRight, {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power2.out"
            });
        }
    });

    /* 스킬 섹션 애니메이션 */
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
                duration: 0.7,
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
        }
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
            gsap.to(projectBoxes, {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                duration: 0.7,
                ease: "power1.out"
            });
        }
    });

    /* 모달 박스 처리 */
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

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // ScrollTrigger 새로고침으로 레이아웃 초기화
    ScrollTrigger.refresh();
});
