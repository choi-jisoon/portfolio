window.addEventListener("load", () => {
    const sections = document.querySelectorAll("section");
    const headerHeight = document.querySelector("header").offsetHeight;
    let currentSection = 0;
    let isScrolling = false;
    let animationCompleted = false;
    let homeAnimationFinished = false;

    // 스크롤 비활성화 함수
    function disableScroll() {
        window.addEventListener('wheel', preventScroll, { passive: false });
    }

    // 스크롤 활성화 함수
    function enableScroll() {
        window.removeEventListener('wheel', preventScroll, { passive: false });
    }

    // 스크롤 방지 함수
    function preventScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    // 스크롤 애니메이션 함수 (gsap 없이)
    function smoothScrollTo(targetPosition, duration = 600) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const scrollPosition = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, scrollPosition);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                isScrolling = false;
            }
        }

        // Ease function for smooth scrolling
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // 휠 이벤트로 섹션 이동 (gsap 없이)
    sections.forEach((section, index) => {
        section.addEventListener("wheel", (e) => {
            if (isScrolling || (index === 0 && !homeAnimationFinished)) return; // 애니메이션 중이거나 홈 애니메이션이 끝나지 않았으면 중단

            let delta = e.deltaY;
            let moveTop;

            // 아래로 스크롤
            if (delta > 0) {
                if (index < sections.length - 1) {
                    moveTop = sections[index + 1].offsetTop;
                    currentSection = index + 1;
                } else {
                    return;
                }
            }
            // 위로 스크롤
            else {
                if (index > 0) {
                    moveTop = sections[index - 1].offsetTop;
                    currentSection = index - 1;
                } else {
                    return;
                }
            }

            isScrolling = true;
            smoothScrollTo(moveTop);
        }, { passive: false });
    });

    // 홈 섹션 애니메이션
    function startHomeAnimation() {
        const mainText1 = document.querySelector('.main1');
        const mainImg = document.querySelector('.main_img');
        homeAnimationFinished = false;
        const main2 = document.querySelector('.main2');
        const main3 = document.querySelector('.main3');
        const main4 = document.querySelector('.main4');
        disableScroll();

        setTimeout(() => {
            mainText1.style.opacity = 1;
        }, 500);

        setTimeout(() => {
            mainText1.classList.add('moved');
        }, 1000);

        setTimeout(() => {
            mainImg.style.opacity = 1;
        }, 1500);

        setTimeout(() => {
            homeAnimationFinished = true;
            enableScroll();
        }, 2500);

        const ani3 = gsap.timeline();
        ani3.from(main2, { xPercent: -300, autoAlpha: 0 })
            .from(main3, { xPercent: 300, autoAlpha: 0 })
            .from(main4, { xPercent: -300, autoAlpha: 0 });

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
            }
        });
    }

    function restartHomeAnimation() {
        animationCompleted = false;
        homeAnimationFinished = false;
        disableScroll();
        const mainText1 = document.querySelector('.main1');
        const mainImg = document.querySelector('.main_img');
        mainText1.style.opacity = 0;
        mainText1.classList.remove('moved');
        mainImg.style.opacity = 0;

        setTimeout(() => {
            mainText1.style.opacity = 1;
            mainText1.classList.add('moved');
        }, 1500);

        setTimeout(() => {
            mainImg.style.opacity = 1;
        }, 2000);

        setTimeout(() => {
            homeAnimationFinished = true;
            enableScroll();
        }, 2300);

        ScrollTrigger.refresh();
    }

    startHomeAnimation();

    // 스크롤 애니메이션의 마무리 작업
    const profileImage = document.querySelector('.profile_img');
    const profileTextGroup = document.querySelectorAll('.personal, .education, .certificates, .experience');

    gsap.set(profileImage, { opacity: 0, x: -200 });
    ScrollTrigger.create({
        trigger: profileImage,
        start: "top 80%",
        onEnter: () => {
            gsap.to(profileImage, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out"
            });
        }
    });

    gsap.set(profileTextGroup, { opacity: 0, x: 200 });
    ScrollTrigger.create({
        trigger: profileTextGroup[0],
        start: "top 80%",
        onEnter: () => {
            gsap.to(profileTextGroup, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0
            });
        }
    });
    console.log(document.querySelector('header').clientHeight);

    //스킬 섹션 애니메이션
    const skillContainer = document.querySelector('.skill_container');
    gsap.set(skillContainer, { opacity: 0, y: 100 });

    ScrollTrigger.create({
        trigger: ".skill",
        // start: 'top top',
        /* end: "bottom 100%", */
        markers: true,
        onEnter: () => {
            gsap.to(skillContainer, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        }
    });

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
                duration: 1,
                ease: "power1.out"
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
        const btn1 = box.querySelector('.project_btn1');
        if (btn1) {
            btn1.addEventListener('click', () => {
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
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
